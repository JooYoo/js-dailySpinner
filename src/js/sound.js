let isSound = true;

const toggleSound = () => {
  isSound = !isSound;
};

const initAudio = (soundPath) => {
  const timeOverAudio = soundPath;
  const audio = new Audio(timeOverAudio);
  return audio;
};

const playTimeOverAudio = (audioPlayer) => {
  audioPlayer.play();
};

//TODO: stop timeOverAudio

// init mainTimer over Audio player
let mainAudioPlayer = initAudio('../src/assets/time_over_audio.wav');

export { toggleSound, mainAudioPlayer, playTimeOverAudio };
