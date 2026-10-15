// functions/api/proxy.js
export async function onRequest({request}){
  const url = new URL(request.url);
  const target = url.searchParams.get("url");
  if(!target) return new Response("missing url",{status:400});
  const res = await fetch(target,{headers:request.headers});
  return new Response(res.body,res);
}
