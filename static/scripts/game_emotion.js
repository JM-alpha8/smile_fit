export function init() {
  const TOTAL_ROUNDS = 25;
  let currentRound = 1;

  const referenceImg = document.getElementById("referenceImg");
  const video = document.getElementById("video");
  const overlay = document.getElementById("overlay");
  const expectedEmotion = document.getElementById("expectedEmotion");
  const predictedEmotion = document.getElementById("predictedEmotion");
  const scoreDisplay = document.getElementById("scoreDisplay");

  async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  }

  function getEmotionFromImage(num) {
    const emotions = ["행복", "슬픔", "놀람", "화남"];
    return emotions[num % emotions.length];
  }

  function nextRound() {
    if (currentRound > TOTAL_ROUNDS) {
      navigate("game_feedback");
      return;
    }

    referenceImg.src = `static/images/e_game/e${currentRound}.png`;
    const emo = getEmotionFromImage(currentRound);
    expectedEmotion.innerText = emo;
    predictedEmotion.innerText = emo; // 실제 예측 대신 동일값 사용
    scoreDisplay.innerText = Math.floor(Math.random() * 100);

    currentRound++;
  }

  setupCamera();
  nextRound();
}
