export default {
  async fetch(request) {
    try {
      const webhookURL =
        "https://api.junkie-development.de/api/v1/webhooks/execute/735a735d-dc5a-4e55-8fd3-0a56ec159413";

      const res = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: "{}"
      });

      let text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "worker-error",
          detail: error.message
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
