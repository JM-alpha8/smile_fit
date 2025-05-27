export function init() {
  const TOTAL_ROUNDS = 25;
  let currentRound = 1;

  const referenceImg = document.getElementById("referenceImg");
  const video = document.getElementById("video");
  const canvas = document.getElementById("guideCanvas");
  const ctx = canvas.getContext("2d");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const captureBtn = document.getElementById("captureBtn");

  navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
  });

  function nextRound() {
    if (currentRound > TOTAL_ROUNDS) {
      sessionStorage.setItem("totalScore", totalScore);
      navigate("game_feedback");
      return;
    }
    referenceImg.src = `static/images/f_game/${currentRound}.png`;
    scoreDisplay.innerText = `점수: -`;
  }

  let totalScore = 0;

  captureBtn.onclick = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const score = Math.floor(Math.random() * 100); // 예시 점수
    totalScore += score;
    scoreDisplay.innerText = `점수: ${score}`;
    currentRound++;
    setTimeout(nextRound, 1000);
  };

  nextRound();
}
