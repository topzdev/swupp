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

export const LIMIT = [10, 20, 40, 60, 100];

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
  { id: "atq", text: "antiques" },
  { id: "app", text: "appliances" },
  { id: "art", text: "arts crafts " },
  { id: "atv", text: "atvs utvs snowmobiles" },
  { id: "apt", text: "auto parts" },
  { id: "whl", text: "auto wheels tires" },
  { id: "avn", text: "aviation" },
  { id: "kid", text: "baby kid stuff" },
  { id: "btr", text: "barter" },
  { id: "bcp", text: "bicycle parts" },
  { id: "bcl", text: "bicycles" },
  { id: "btp", text: "boat parts" },
  { id: "bot", text: "boats" },
  { id: "bks", text: "books magazines" },
  { id: "bns", text: "business commercial" },
  { id: "car", text: "cars trucks" },
  { id: "dvd", text: "cds dvds vhs" },
  { id: "cps", text: "cell phones" },
  { id: "cac", text: "clothing accessories" },
  { id: "col", text: "collectibles" },
  { id: "cmp", text: "computer parts" },
  { id: "com", text: "computer" },
  { id: "elc", text: "electronics" },
  { id: "frm", text: "farm garden" },
  { id: "fre", text: "free stuff" },
  { id: "fnt", text: "furniture" },
  { id: "grg", text: "garage moving sales" },
  { id: "gen", text: "general for sale" },
  { id: "hlt", text: "health beauty" },
  { id: "hev", text: "heavy equipment" },
  { id: "hhi", text: "households items" },
  { id: "jwl", text: "jewelry" },
  { id: "mtl", text: "materials" },
  { id: "mpt", text: "motorcycle parts" },
  { id: "sco", text: "motorcycles scooters" },
  { id: "ins", text: "musical instruments" },
  { id: "pvd", text: "photo video" },
  { id: "rvs", text: "rvs" },
  { id: "spt", text: "sporting goods" },
  { id: "tkt", text: "tickets" },
  { id: "tol", text: "tools" },
  { id: "toy", text: "toys games" },
  { id: "trl", text: "trailers" },
  { id: "vgm", text: "video gaming" },
  { id: "wtd", text: "wanted" }
];

export const initPost = {
  title: "",
  price: 0,
  categoryId: "",
  conditionId: "",
  body: "",
  prefered: "",
  photos: [],
  isPriceHidden: false,
  isDraft: false
};

export const initUpdatePost = {
  title: "",
  price: 0,
  categoryId: "",
  conditionId: "",
  body: "",
  prefered: "",
  photos: [],
  isPriceHidden: false,
  isDraft: false,
  deletetedPhotoIds: [],
  newPhotos: []
};
