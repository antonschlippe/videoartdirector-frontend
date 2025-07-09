
document.getElementById("prompt-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("image");
  const imageFile = fileInput.files[0];
  const scene = document.querySelector("input[name='scene']").value;
  const lens = document.querySelector("input[name='lens']").value;
  const style = document.querySelector("input[name='style']").value;

  const promptText = `${scene}, shot with ${lens}, styled as ${style}`;

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("promptText", promptText);

  const response = await fetch("https://videoartdirector-backend.vercel.app/api/generate", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  const container = document.getElementById("video-container");

  if (response.ok && data.output && data.output[0]) {
    container.innerHTML = `
      <p>Video generated:</p>
      <video controls width="480">
        <source src="${data.output[0]}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `;
  } else {
    container.innerHTML = `<p style="color:red;">Error: ${data.error || "Something went wrong"}</p>`;
  }
});
