export const onRequest: PagesFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "POST" }
    });
  }

  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());
  console.log("tenx.hire", JSON.stringify(payload));

  return Response.redirect(new URL("/hire/thanks", request.url).toString(), 303);
};
