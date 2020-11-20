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
let mainAudioPlayer = initAudio('../src/assets/main_time_over_sound.mp3');

export { toggleSound, mainAudioPlayer, playTimeOverAudio, stopTimeOverAudio };
