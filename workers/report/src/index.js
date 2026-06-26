/**
 * Katselin Lokikirja → GitHub Issues
 *
 * Deploy: npx wrangler deploy
 * Secrets: wrangler secret put GITHUB_TOKEN
 * Vars: GITHUB_REPO = Mikko-Huuskonen-Pro/Katselin.fi
 */

const REPO = "Mikko-Huuskonen-Pro/Katselin.fi";

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (!env.GITHUB_TOKEN) {
      return json({ error: "GITHUB_TOKEN not configured" }, 503);
    }

    let report;
    try {
      report = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const domain = String(report.domain || "").trim();
    if (!domain || domain.length > 253) {
      return json({ error: "domain is required" }, 400);
    }

    const kind = report.kind === "suggest_site" ? "suggest_site" : "site_broken";
    const title =
      kind === "suggest_site"
        ? `[Ehdotus] ${domain}`
        : `[Selain] ${domain}`;

    let body = `## Verkkotunnus\n${domain}\n`;
    const message = String(report.message || "").trim();
    if (message) {
      body += `\n## Kuvaus\n${message.slice(0, 4000)}\n`;
    }
    const contextUrl = String(report.context_url || "").trim();
    if (contextUrl) {
      body += `\n## Konteksti\n\`${contextUrl.slice(0, 500)}\`\n`;
    }
    body += "\n---\n*Anonyymi ilmoitus Katselimen Lokikirjasta (report worker).*\n";

    const labels =
      kind === "suggest_site"
        ? ["palaute", "whitelist", "lokikirja"]
        : ["bug", "selain", "lokikirja"];

    const repo = env.GITHUB_REPO || REPO;
    const gh = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
        "User-Agent": "katselin-report-worker",
      },
      body: JSON.stringify({ title, body, labels }),
    });

    const payload = await gh.json();
    if (!gh.ok) {
      return json(
        { error: payload.message || "GitHub API error", status: gh.status },
        gh.status
      );
    }

    return json(
      { ok: true, issue_number: payload.number, html_url: payload.html_url },
      201,
      corsHeaders()
    );
  },
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
      ...extraHeaders,
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
