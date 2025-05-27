export function init() {
  const gallery = document.getElementById("feedbackGallery");
  const images = JSON.parse(sessionStorage.getItem("capturedImages") || "[]");

  images.forEach(dataUrl => {
    const img = document.createElement("img");
    img.src = dataUrl;
    img.className = "w-full rounded-lg border border-gray-300";
    gallery.appendChild(img);
  });

  sessionStorage.clear();
}
