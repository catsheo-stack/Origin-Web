Deno.serve(async (req) => {
  try {
    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    if (!apiKey) {
      return Response.json({ error: "Google Maps API key not configured" }, { status: 500 });
    }
    // The key is HTTP-referer-restricted (browser-only), so it is safe to expose to the frontend.
    // It is used to load the client-side Maps JavaScript API + Places library.
    return Response.json({ apiKey });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});