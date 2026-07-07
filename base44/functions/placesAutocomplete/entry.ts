Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");

    if (!apiKey) {
      return Response.json({ error: "Google Maps API key not configured", status: "NO_API_KEY" }, { status: 500 });
    }

    if (body.place_id) {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(body.place_id)}&key=${apiKey}&fields=formatted_address,address_components,geometry,place_id`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "OK") {
        return Response.json({
          error: data.error_message || "Failed to fetch place details",
          status: data.status,
        }, { status: 400 });
      }

      const components = data.result.address_components || [];
      let street_number = "";
      let street_name = "";
      let suburb = "";
      let postcode = "";
      let state = "";

      for (const comp of components) {
        if (comp.types.includes("street_number")) street_number = comp.long_name;
        if (comp.types.includes("route")) street_name = comp.long_name;
        if (comp.types.includes("locality") || comp.types.includes("sublocality_level_1") || comp.types.includes("sublocality")) {
          if (!suburb) suburb = comp.long_name;
        }
        if (comp.types.includes("postal_code")) postcode = comp.long_name;
        if (comp.types.includes("administrative_area_level_1")) state = comp.short_name;
      }

      const location = data.result.geometry?.location || {};

      return Response.json({
        details: {
          formatted_address: data.result.formatted_address,
          street_number,
          street_name,
          suburb,
          postcode,
          state,
          country: "Australia",
          latitude: location.lat ?? null,
          longitude: location.lng ?? null,
          place_id: data.result.place_id || body.place_id,
        }
      });
    } else {
      const input = encodeURIComponent(body.input || "");
      if (input.length < 3) {
        return Response.json({ suggestions: [], status: "INPUT_TOO_SHORT" });
      }

      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:au&types=address&key=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();

      // Surface Google's status so the frontend can distinguish "no results" from "API not enabled"
      if (data.status && data.status !== "OK") {
        return Response.json({
          suggestions: [],
          status: data.status,
          error: data.error_message || `Google Places API returned status: ${data.status}`,
        });
      }

      const suggestions = (data.predictions || []).map((p) => ({
        place_id: p.place_id,
        description: p.description,
      }));

      return Response.json({ suggestions, status: "OK" });
    }
  } catch (error) {
    return Response.json({ error: error.message, status: "EXCEPTION" }, { status: 500 });
  }
});