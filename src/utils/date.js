export const convertDateToString = (date) => {
  if (!date) { return "" }
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`
}

export const convertMilliecondToPrettyTime = millis => {
  if (isNaN(millis)) {
    return 'N/A'
  }
  let seconds = Math.floor(millis / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  const week = Math.floor(days / 7);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;
  days = days % 7;

  return `${week > 0 ? `${week}w ` : ''}${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s`;
}
