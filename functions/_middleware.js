// functions/_middleware.js
export async function onRequest({ request, next, env }) {
  const PASSWORD = env.PASSWORD;
  const url = new URL(request.url);
  if (url.pathname.startsWith("/api")) {
    return next();
  }
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes(`libretv_token=${btoa(PASSWORD)}`)) {
    return next();
  }
  const response = await next();
  let html = await response.text();
  html = html.replace(`window.__ENV__.PASSWORD = "";`,`window.__ENV__.PASSWORD = "${btoa(PASSWORD)}";`);
  return new Response(html, response);
}
