export default function robots() {
  // Explicit allow rules for AI crawlers so LLM answer engines
  // (ChatGPT, Claude, Perplexity, Gemini, Google SGE, etc.) can cite
  // JR One content. Default-allow covers it, but explicit is safer ,
  // some AI crawlers respect per-UA blocks that a blanket "*" wouldn't catch.
  const AI_CRAWLERS = [
    "GPTBot",            // OpenAI / ChatGPT training + browsing
    "ChatGPT-User",      // ChatGPT browse mode
    "OAI-SearchBot",     // OpenAI search
    "ClaudeBot",         // Anthropic / Claude training
    "Claude-Web",        // Anthropic / Claude browsing
    "anthropic-ai",      // Anthropic legacy UA
    "PerplexityBot",     // Perplexity AI
    "Perplexity-User",   // Perplexity browse mode
    "Google-Extended",   // Google Gemini / Bard training opt-in
    "GoogleOther",       // Google research + product
    "CCBot",             // Common Crawl (feeds most LLM training)
    "Applebot-Extended", // Apple Intelligence training
    "Amazonbot",         // Amazon Alexa / LLM
    "YouBot",            // You.com
    "Meta-ExternalAgent",// Meta AI
    "cohere-ai",         // Cohere
    "DuckAssistBot",     // DuckDuckGo Assist
    "Diffbot",           // Structured web extraction (feeds LLMs)
  ];

  const aiAllowRules = AI_CRAWLERS.map((ua) => ({
    userAgent: ua,
    allow: "/",
    disallow: ["/api/", "/contractors/"],
  }));

  return {
    rules: [
      // Default, all standard search engines + anything not explicitly listed
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/contractors/"],
      },
      // AI engines, explicitly allowed so they can fetch /llms.txt + knowledge MDs
      ...aiAllowRules,
    ],
    sitemap: "https://www.jronegutters.com/sitemap.xml",
  };
}
