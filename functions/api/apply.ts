import {
  ADAM_EMAIL,
  detailsHtml,
  detailsText,
  emailIsValid,
  escapeHtml,
  type FieldError,
  httpUrlIsValid,
  jsonResponse,
  persistSubmission,
  readStringFormData,
  sendEmail,
  type RuntimeEnv
} from "../_utils/submissions";

type ApplyPayload = {
  current_role: string;
  email: string;
  linkedin: string;
  name: string;
  phone: string;
  primary_ai_skill: string;
  source: string;
};

const ASSESSMENT_URL = "https://tenxtalent.ai";
const EXPECTED_SOURCE = "tenx-website-apply";
const PRIMARY_AI_SKILLS = new Set([
  "Claude fluency",
  "OpenAI fluency",
  "Google fluency",
  "Prompt engineering",
  "RAG",
  "Agent design",
  "Evals",
  "MLOps",
  "Code-with-AI"
]);

export const onRequest: PagesFunction<RuntimeEnv> = async ({ request, env }) => {
  if (request.method !== "POST") {
    return jsonResponse(
      { ok: false, message: "Method not allowed." },
      {
        status: 405,
        headers: { Allow: "POST" }
      }
    );
  }

  const payload = await readStringFormData(request);
  const validated = validateApplyPayload(payload);

  if (validated.errors.length > 0) {
    return jsonResponse(
      {
        ok: false,
        message: "Check the fields and try again.",
        errors: validated.errors
      },
      { status: 400 }
    );
  }

  const submission = validated.data;
  const submittedAt = new Date().toISOString();
  const fields: Array<[string, string]> = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["LinkedIn", submission.linkedin],
    ["Phone", submission.phone],
    ["Current role", submission.current_role],
    ["Primary AI skill", submission.primary_ai_skill],
    ["Source", submission.source],
    ["Submitted at", submittedAt]
  ];

  try {
    await Promise.all([
      sendEmail(env, {
        to: [ADAM_EMAIL],
        reply_to: submission.email,
        subject: `New tenX candidate application: ${submission.name}`,
        text: `New candidate application\n\n${detailsText(fields)}\n\nAssessment: ${ASSESSMENT_URL}`,
        html: `<h1 style="font-family:Arial,sans-serif;font-size:20px;">New candidate application</h1>${detailsHtml(fields)}<p style="font-family:Arial,sans-serif;font-size:14px;">Assessment: <a href="${ASSESSMENT_URL}">${ASSESSMENT_URL}</a></p>`
      }),
      sendEmail(env, {
        to: [submission.email],
        reply_to: ADAM_EMAIL,
        subject: "tenX application received",
        text: `Hi ${submission.name},\n\nYour tenX application has been received.\n\nNext step: take the practical skills assessment at ${ASSESSMENT_URL}.\n\nAdam`,
        html: `<p>Hi ${escapeHtml(submission.name)},</p><p>Your tenX application has been received.</p><p>Next step: take the practical skills assessment at <a href="${ASSESSMENT_URL}">${ASSESSMENT_URL}</a>.</p><p>Adam</p>`
      })
    ]);
  } catch (error) {
    return jsonResponse(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Email delivery failed. Please email mail@adamholt.co.nz directly."
      },
      { status: 502 }
    );
  }

  try {
    const persistence = await persistSubmission(env, "apply", { ...submission, submittedAt });
    console.info("tenx.apply.received", JSON.stringify({ email: submission.email, persistence }));
  } catch (error) {
    console.error("tenx.apply.persistence_error", error);
  }

  return jsonResponse({
    ok: true,
    message: "Application received. Redirecting to the assessment step.",
    redirect: new URL("/apply/success", request.url).toString()
  });
};

function validateApplyPayload(payload: Record<string, string>): { data: ApplyPayload; errors: FieldError[] } {
  const errors: FieldError[] = [];
  const data: ApplyPayload = {
    current_role: payload.current_role ?? "",
    email: payload.email ?? "",
    linkedin: payload.linkedin ?? "",
    name: payload.name ?? "",
    phone: payload.phone ?? "",
    primary_ai_skill: payload.primary_ai_skill ?? "",
    source: payload.source ?? ""
  };

  if (!data.name || data.name.length > 120) {
    errors.push({ field: "name", message: "Enter your full name." });
  }

  if (!emailIsValid(data.email)) {
    errors.push({ field: "email", message: "Enter a valid email address." });
  }

  if (!httpUrlIsValid(data.linkedin) || !isLinkedInUrl(data.linkedin)) {
    errors.push({ field: "linkedin", message: "Enter a valid LinkedIn URL." });
  }

  if (data.phone.replace(/[^\d+]/g, "").length < 7 || data.phone.length > 40) {
    errors.push({ field: "phone", message: "Enter a valid phone number." });
  }

  if (!data.current_role || data.current_role.length > 140) {
    errors.push({ field: "current_role", message: "Enter your current role." });
  }

  if (!PRIMARY_AI_SKILLS.has(data.primary_ai_skill)) {
    errors.push({ field: "primary_ai_skill", message: "Select your primary AI skill." });
  }

  if (data.source !== EXPECTED_SOURCE) {
    errors.push({ field: "source", message: "Form source is invalid." });
  }

  return { data, errors };
}

function isLinkedInUrl(value: string) {
  const hostname = new URL(value).hostname.toLowerCase();
  return hostname === "linkedin.com" || hostname.endsWith(".linkedin.com");
}
