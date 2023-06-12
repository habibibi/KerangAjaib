function getDayOfWeek(dateString) {
  const dateParts = dateString.split("/");
  const daysOfWeek = ["Hari Minggu", "Hari Senin", "Hari Selasa", "Hari Rabu", "Hari Kamis", "Hari Jumat", "Hari Sabtu"];

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  let year = parseInt(dateParts[2], 10);

  if (month <= 2) {
    year--;
    month += 12;
  }

  let gregorian = false;
  if (year < 1582 || (year === 1582 && (month < 10 || (month === 10 && day < 15)))) {
    gregorian = false;
  } else {
    gregorian = true;
  }

  const A = Math.floor(year / 100);
  let B = 0;
  if (gregorian) {
    B = 2 - A + Math.floor(A / 4);
  }

  const julianDay = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;

  const dayOfWeekIndex = (Math.floor(julianDay + 1.5) % 7);
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

  return dayOfWeek;
}

module.exports = getDayOfWeek
