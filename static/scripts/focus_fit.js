export function init() {
  const urlParams = new URLSearchParams(location.search);
  const type = urlParams.get("type") || "smile";

  const referenceImg = document.getElementById("referenceImg");
  const video = document.getElementById("video");
  const canvas = document.getElementById("guideCanvas");
  const ctx = canvas.getContext("2d");
  const submitBtn = document.getElementById("submitBtn");

  let currentRound = 1;
  const capturedImages = [];

  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
  });

  function nextRound() {
    if (currentRound > 10) {
      sessionStorage.setItem("capturedImages", JSON.stringify(capturedImages));
      sessionStorage.setItem("mode", "focus");
      sessionStorage.setItem("focusType", type);
      navigate("feedback");
      return;
    }
    referenceImg.src = `static/images/expression/${type}/${currentRound}.png`;
  }

  submitBtn.onclick = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL("image/png");
    capturedImages.push(imgData);
    currentRound++;
    nextRound();
  };

  nextRound();
}
