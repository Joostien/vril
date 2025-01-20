// JavaScript for the loading screen
let progress = 0;
const totalTime = 3500; // 3.5 seconds
const intervalTime = 50; // Update interval
const increment = (100 / (totalTime / intervalTime)); // Increment percentage

function loadScreen() {
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");
  const continueButton = document.getElementById("continueButton");
  const video = document.getElementById("backgroundVideo");

  const loadingInterval = setInterval(() => {
    progress += increment;
    loadingBar.style.width = `${progress}%`;

    if (progress < 100) {
      loadingText.textContent = "Scanning For Whiteness...";
    } else {
      clearInterval(loadingInterval);
      loadingText.textContent = "100% White VRIL Detected.";
      continueButton.classList.remove("hidden"); // Show button after load
    }
  }, intervalTime);

  // Pause the video at the last frame when it ends
  video.onended = () => {
    video.currentTime = video.duration; // Set playback to the last frame
    video.pause(); // Pause at the last frame
  };
}

function goToHomePage() {
  window.location.href = "homepage.html"; // Redirect to homepage
}

window.onload = loadScreen;
