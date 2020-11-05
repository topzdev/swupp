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

export const CONDITIONS = [
  {
    id: "nw",
    value: "new"
  },
  {
    id: "ln",
    value: "like new"
  },
  {
    id: "ex",
    value: "excellent"
  },
  {
    id: "gd",
    value: "good"
  },
  {
    id: "fr",
    value: "fair"
  },
  {
    id: "sv",
    value: "salvage"
  }
];

export const CATEGORIES = [
  { id: "cr", value: "Car" },
  { id: "dm", value: "Dummy" },
  { id: "d3", value: "DUMMY 3" },
  { id: "d4", value: "DUMMY 4" }
];
