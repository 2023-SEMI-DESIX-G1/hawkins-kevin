module.exports = {
    async get(url) {
      const rawResponse = await fetch(url);
      return rawResponse.json();
    },
    async post(url, data) {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return rawResponse.json();
    },
  };