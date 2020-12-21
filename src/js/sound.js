let isPlayMainSound = true;
let isPlayIndividualSound = false;

const toggleMainSound = () => {
  isPlayMainSound = !isPlayMainSound;
};

const toggleIndividualSound = () => {
  isPlayIndividualSound = !isPlayIndividualSound;
};

/* -------------------------------------------------------------------------- */
/*                                audio player                                */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                             init Audio player                              */
/* -------------------------------------------------------------------------- */

let mainAudioPlayer = initAudio(
  'https://raw.githubusercontent.com/JooYoo/js-dailySpinner/master/src/assets/main_time_over_sound.mp3'
);
let individualAudioPlayer = initAudio(
  'https://raw.githubusercontent.com/JooYoo/js-dailySpinner/master/src/assets/individual_time_over_sound.mp3'
);

export {
  isPlayMainSound,
  isPlayIndividualSound,
  toggleMainSound,
  toggleIndividualSound,
  mainAudioPlayer,
  individualAudioPlayer,
  playTimeOverAudio,
  stopTimeOverAudio,
};
