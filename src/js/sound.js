let isSound = true;

const toggleSound = () => {
  isSound = !isSound;
};

const initAudio = (soundPath) => {
  const timeOverAudio = soundPath;
  const audioPlayer = new Audio(timeOverAudio);
  return audioPlayer;
};

const playTimeOverAudio = (audioPlayer) => {
  audioPlayer.play();
};

const stopTimeOverAudio = (audioPlayer) => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
};

// init mainTimer over Audio player
let mainAudioPlayer = initAudio('../src/assets/time_over_audio.wav');

export { toggleSound, mainAudioPlayer, playTimeOverAudio, stopTimeOverAudio };
