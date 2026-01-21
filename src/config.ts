const getCurrentSite = () => {
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.pkcarreno.com";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://127.0.0.1:4200";
};

export const config = {
  site: getCurrentSite(),
  iaBotAgents: [
    "AI2Bot",
    "Ai2Bot-Dolma",
    "Amazonbot",
    "anthropic-ai",
    "Applebot",
    "Applebot-Extended",
    "Brightbot 1.0",
    "Bytespider",
    "CCBot",
    "ChatGPT-User",
    "Claude-Web",
    "ClaudeBot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "Crawlspace",
    "Diffbot",
    "DuckAssistBot",
    "FacebookBot",
    "FriendlyCrawler",
    "Google-Extended",
    "GoogleOther",
    "GoogleOther-Image",
    "GoogleOther-Video",
    "GPTBot",
    "iaskspider/2.0",
    "ICC-Crawler",
    "ImagesiftBot",
    "img2dataset",
    "ISSCyberRiskCrawler",
    "Kangaroo Bot",
    "Meta-ExternalAgent",
    "Meta-ExternalFetcher",
    "OAI-SearchBot",
    "omgili",
    "omgilibot",
    "PanguBot",
    "PerplexityBot",
    "Perplexity‑User",
    "PetalBot",
    "Scrapy",
    "SemrushBot-OCOB",
    "SemrushBot-SWA",
    "Sidetrade indexer bot",
    "Timpibot",
    "VelenPublicWebCrawler",
    "Webzio-Extended",
    "YouBot",
  ],
};
