import {
  ADAM_EMAIL,
  detailsHtml,
  detailsText,
  emailIsValid,
  escapeHtml,
  type FieldError,
  jsonResponse,
  persistSubmission,
  readStringFormData,
  sendEmail,
  type RuntimeEnv
} from "../_utils/submissions";

type HirePayload = {
  company: string;
  email: string;
  notes: string;
  role: string;
  source: string;
  target_start: string;
};

const EXPECTED_SOURCE = "tenx-website-hire";
const TARGET_STARTS = new Set(["June 2026", "July 2026", "Q3 2026", "Exploring only"]);

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
  const validated = validateHirePayload(payload);

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
    ["Company", submission.company],
    ["Work email", submission.email],
    ["Hiring need", submission.role],
    ["Target start", submission.target_start],
    ["Notes", submission.notes],
    ["Source", submission.source],
    ["Submitted at", submittedAt]
  ];

  try {
    await Promise.all([
      sendEmail(env, {
        to: [ADAM_EMAIL],
        reply_to: submission.email,
        subject: `New tenX employer waitlist: ${submission.company}`,
        text: `New employer waitlist request\n\n${detailsText(fields)}`,
        html: `<h1 style="font-family:Arial,sans-serif;font-size:20px;">New employer waitlist request</h1>${detailsHtml(fields)}`
      }),
      sendEmail(env, {
        to: [submission.email],
        reply_to: ADAM_EMAIL,
        subject: "tenX employer waitlist received",
        text: `Your tenX employer waitlist request has been received.\n\nCompany: ${submission.company}\nHiring need: ${submission.role}\nTarget start: ${submission.target_start}\n\nAdam`,
        html: `<p>Your tenX employer waitlist request has been received.</p><p><strong>Company:</strong> ${escapeHtml(submission.company)}<br><strong>Hiring need:</strong> ${escapeHtml(submission.role)}<br><strong>Target start:</strong> ${escapeHtml(submission.target_start)}</p><p>Adam</p>`
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
    const persistence = await persistSubmission(env, "hire", { ...submission, submittedAt });
    console.info("tenx.hire.received", JSON.stringify({ email: submission.email, persistence }));
  } catch (error) {
    console.error("tenx.hire.persistence_error", error);
  }

  return jsonResponse({
    ok: true,
    message: "Employer waitlist request received.",
    redirect: new URL("/hire/thanks", request.url).toString()
  });
};

function validateHirePayload(payload: Record<string, string>): { data: HirePayload; errors: FieldError[] } {
  const errors: FieldError[] = [];
  const data: HirePayload = {
    company: payload.company ?? "",
    email: payload.email ?? "",
    notes: payload.notes ?? "",
    role: payload.role ?? "",
    source: payload.source ?? "",
    target_start: payload.target_start ?? ""
  };

  if (!emailIsValid(data.email)) {
    errors.push({ field: "email", message: "Enter a valid work email address." });
  }

  if (!data.company || data.company.length > 140) {
    errors.push({ field: "company", message: "Enter your company name." });
  }

  if (!/^[a-z0-9-]+$/.test(data.role)) {
    errors.push({ field: "role", message: "Select a hiring need." });
  }

  if (!TARGET_STARTS.has(data.target_start)) {
    errors.push({ field: "target_start", message: "Select a target start." });
  }

  if (data.notes.length > 2000) {
    errors.push({ field: "notes", message: "Keep notes under 2,000 characters." });
  }

  if (data.source !== EXPECTED_SOURCE) {
    errors.push({ field: "source", message: "Form source is invalid." });
  }

  return { data, errors };
}
