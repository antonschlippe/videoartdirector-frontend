document.getElementById("prompt-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const form = e.target;
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((val, key) => (payload[key] = val));
  
    const container = document.getElementById("video-container");
    container.innerText = "Generating video...";
  
    try {
      const response = await fetch("https://videoartdirectorai-backend.vercel.app/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      if (data.video) {
        container.innerHTML = `
          <video controls autoplay muted loop width="100%">
            <source src="${data.video}" type="video/mp4" />
          </video>
        `;
      } else {
        container.innerText = "No video returned.";
      }
    } catch (err) {
      console.error(err);
      container.innerText = "Error generating video.";
    }
  });