export type RuntimeEnv = Record<string, unknown> & {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  RESEND_FROM_EMAIL?: string;
};

export type FieldError = {
  field: string;
  message: string;
};

type EmailMessage = {
  html: string;
  reply_to?: string;
  subject: string;
  text: string;
  to: string[];
};

type StoredSubmission = {
  kind: string;
  payload: Record<string, string>;
  submittedAt: string;
};

const DEFAULT_FROM = "tenX <mail@adamholt.co.nz>";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

export const ADAM_EMAIL = "mail@adamholt.co.nz";

export function jsonResponse(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");

  return new Response(JSON.stringify(body), {
    ...init,
    headers
  });
}

export async function readStringFormData(request: Request) {
  const formData = await request.formData();
  const payload: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      payload[key] = value.trim();
    }
  }

  return payload;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function emailIsValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function httpUrlIsValid(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function detailsText(fields: Array<[string, string]>) {
  return fields.map(([label, value]) => `${label}: ${value || "-"}`).join("\n");
}

export function detailsHtml(fields: Array<[string, string]>) {
  const rows = fields
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">${escapeHtml(label)}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(value || "-")}</td>
        </tr>`
    )
    .join("");

  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;">${rows}</table>`;
}

export async function sendEmail(env: RuntimeEnv, message: EmailMessage) {
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("tenx.resend_missing_api_key");
    throw new Error("Email is not configured. Please email mail@adamholt.co.nz directly.");
  }

  const from =
    typeof env.RESEND_FROM_EMAIL === "string" && env.RESEND_FROM_EMAIL.trim()
      ? env.RESEND_FROM_EMAIL.trim()
      : typeof env.RESEND_FROM === "string" && env.RESEND_FROM.trim()
        ? env.RESEND_FROM.trim()
        : DEFAULT_FROM;

  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from,
      ...message
    })
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("tenx.resend_error", response.status, body.slice(0, 500));
    throw new Error("Email delivery failed. Please email mail@adamholt.co.nz directly.");
  }
}

export async function persistSubmission(env: RuntimeEnv, kind: string, payload: Record<string, string>) {
  const submittedAt = new Date().toISOString();
  const record: StoredSubmission = { kind, payload, submittedAt };

  for (const [bindingName, binding] of Object.entries(env)) {
    if (isKvNamespace(binding)) {
      const key = `tenx:${kind}:${submittedAt}:${crypto.randomUUID()}`;
      await binding.put(key, JSON.stringify(record));
      return { binding: bindingName, type: "kv" };
    }
  }

  for (const [bindingName, binding] of Object.entries(env)) {
    if (isD1Database(binding)) {
      await binding
        .prepare(
          `CREATE TABLE IF NOT EXISTS tenx_form_submissions (
            id TEXT PRIMARY KEY,
            kind TEXT NOT NULL,
            submitted_at TEXT NOT NULL,
            payload TEXT NOT NULL
          )`
        )
        .run();

      await binding
        .prepare("INSERT INTO tenx_form_submissions (id, kind, submitted_at, payload) VALUES (?, ?, ?, ?)")
        .bind(crypto.randomUUID(), kind, submittedAt, JSON.stringify(payload))
        .run();

      return { binding: bindingName, type: "d1" };
    }
  }

  return { type: "skipped" };
}

function isKvNamespace(binding: unknown): binding is KVNamespace {
  return Boolean(
    binding &&
      typeof binding === "object" &&
      "put" in binding &&
      typeof (binding as { put?: unknown }).put === "function"
  );
}

function isD1Database(binding: unknown): binding is D1Database {
  return Boolean(
    binding &&
      typeof binding === "object" &&
      "prepare" in binding &&
      typeof (binding as { prepare?: unknown }).prepare === "function"
  );
}
