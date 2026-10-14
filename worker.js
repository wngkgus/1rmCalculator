
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (
      url.hostname ===
      "1rmcalculator.wngkgus.workers.dev"
    ) {
      url.hostname = "1rmcalculator.kr";
      url.protocol = "https:";

      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
