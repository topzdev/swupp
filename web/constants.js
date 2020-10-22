export const YEARS = (function() {
  let years = [];
  for (let i = new Date().getUTCFullYear(); i >= 1900; i--) {
    years.push(i);
  }
  return years;
})();

export const DAYS = (function() {
  let days = [];
  for (let i = 1; i <= 30; i++) {
    days.push(i);
  }
  return days;
})();

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const CURRENT_DATE = (function() {
  const date = new Date();

  return {
    year: date.getFullYear(),
    day: date.getDate(),
    month: MONTHS[date.getMonth()]
  };
})();
