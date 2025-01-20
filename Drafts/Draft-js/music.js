document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('background-music');
  const musicToggleButton = document.getElementById('music-toggle');
  const backgroundVideo = document.getElementById('backgroundVideo'); // Select the background video element
  const canvas = document.getElementById('visualizer');
  const canvasCtx = canvas.getContext('2d');

  let isPlaying = false;

  // Web Audio API setup
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(music);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  canvas.width = 300;
  canvas.height = 50;

  function drawVisualizer() {
    if (!isPlaying) return;

    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / bufferLength) * 1.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * canvas.height * 0.6;

      canvasCtx.fillStyle = 'white';
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

  musicToggleButton.addEventListener('click', () => {
    if (isPlaying) {
      // Pause music
      music.pause();
      musicToggleButton.innerHTML = '&#9654;'; // Change to Play icon
      isPlaying = false;

      // Change back to the original background video
      backgroundVideo.setAttribute('src', 'assets/mainbackground.mp4');
      backgroundVideo.load(); // Reload the video
      backgroundVideo.play();
    } else {
      // Play music
      audioCtx.resume(); // Resume audio context
      music.play();
      musicToggleButton.innerHTML = '&#10073;&#10073;'; // Change to Pause icon
      isPlaying = true;

      // Change to the new background video (Background 1)
      backgroundVideo.setAttribute('src', 'assets/Background 1.mp4'); // Change to your video path
      backgroundVideo.load(); // Reload the video
      backgroundVideo.play();
      drawVisualizer();
    }
  });
});
