// Get audio and canvas elements
const audio = document.getElementById('background-music');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const canvas = document.getElementById('visualizer');
const canvasCtx = canvas.getContext('2d');

// Resize canvas to fit the window
canvas.width = window.innerWidth;
canvas.height = 200;

// Web Audio API setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 256;

// Data array for frequency data
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Visualizer settings
function drawVisualizer() {
  requestAnimationFrame(drawVisualizer);

  // Get frequency data
  analyser.getByteFrequencyData(dataArray);

  // Clear canvas
  canvasCtx.fillStyle = 'black';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  // Set bar properties
  const barWidth = (canvas.width / bufferLength) * 1.5;
  let barHeight;
  let x = 0;

  // Draw bars
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];

    // Set color gradient
    const r = barHeight + 25;
    const g = 50;
    const b = 200 - barHeight / 2;

    canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
    canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

// Play music and start visualizer
playButton.addEventListener('click', () => {
  audioCtx.resume(); // Resume AudioContext (required for autoplay restrictions)
  audio.play();
  drawVisualizer();
});

// Pause music
pauseButton.addEventListener('click', () => {
  audio.pause();
});
