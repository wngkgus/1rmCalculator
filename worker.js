export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const legacyPaths = new Set([
      "/1rm.html", "/bench-press-1rm.html", "/squat-1rm.html",
      "/deadlift-1rm.html", "/shoulder-press-1rm.html",
      "/overhead-press-1rm.html", "/strength-level.html", "/rpe.html",
    ]);

    if (legacyPaths.has(url.pathname)) {
      url.hostname = "1rmcalculator.kr";
      url.protocol = "https:";
      url.pathname = "/";
      return Response.redirect(url.toString(), 301);
    }

    if (url.hostname === "1rmcalculator.wngkgus.workers.dev" || url.hostname === "www.1rmcalculator.kr") {
      url.hostname = "1rmcalculator.kr";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
