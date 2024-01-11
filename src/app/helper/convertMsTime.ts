const convertMsTime = (msTime: number) => {
  const seconds = `0${Math.floor(msTime / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(msTime / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(msTime / 3600000)}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
}

export default convertMsTime;