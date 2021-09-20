export const YEARS = (function () {
  let years = [];
  for (let i = new Date().getUTCFullYear(); i >= 1900; i--) {
    years.push(i);
  }
  return years;
})();

export const DAYS = (function () {
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
  "December",
];

export const CURRENT_DATE = (function () {
  const date = new Date();

  return {
    year: date.getFullYear(),
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
  };
})();

export const LIMIT = [10, 20, 40, 60, 100];

export const CONDITIONS = [
  {
    id: "nw",
    text: "new",
  },
  {
    id: "ln",
    text: "like new",
  },
  {
    id: "ex",
    text: "excellent",
  },
  {
    id: "gd",
    text: "good",
  },
  {
    id: "fr",
    text: "fair",
  },
  {
    id: "sv",
    text: "salvage",
  },
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
  // { id: "btr", text: "barter" },
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
  { id: "wtd", text: "wanted" },
];

export const initPost = {
  title: "",
  price: 0,
  categoryId: "",
  conditionId: "",
  body: "",
  prefered: "",
  photos: [],
  postLocation: {
    name: "",
    lat: 0,
    lng: 0,
  },
  isPriceHidden: false,
  isDraft: false,
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
  newPhotos: [],
  postLocation: {
    name: "",
    lat: 0,
    lng: 0,
  },
};

export const initProfile = {
  firstname: "",
  lastname: "",
  postCount: 0,
  profilePhoto: {
    url: "",
    securedUrl: "",
    publicId: "",
  },
  coverPhoto: {
    url: "",
    securedUrl: "",
    publicId: "",
  },
  username: "",

  about: {
    overview: {
      phoneNumber: "",
      email: "",
      address: "",
      birthday: "",
    },
    socials: {
      fbUrl: "",
      instaUrl: "",
      websiteUrl: "",
      twitterUrl: "",
      birthdate: "",
    },
    addresses: [{}],
  },
};

export const SAMPLE_POST_PHOTS = [
  {
    publicId: "2",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257367/swupp-dev/1_noppru.jpg",
    caption:
      "Brooklyn green juice XOXO PBR&B lomo freegan salvia polaroid seitan. Authentic skateboard semiotics sustainable green juice XOXO unicorn vice shabby chic fanny pack. Vice selvage YOLO asymmetrical, celiac pug thundercats ethical. Synth normcore PBR&B letterpress, selvage fam listicle blog plaid gochujang ugh chambray fixie pug air plant. Yr art party occupy hella pug la croix godard, locavore austin butcher man braid.",
  },
  {
    publicId: "3",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257367/swupp-dev/g_bq9mni.jpg",
    caption: "",
  },
  {
    publicId: "4",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257366/swupp-dev/r_fkzopp.jpg",
    caption:
      "Jean shorts vape shaman taiyaki coloring book art party scenester poke schlitz freegan aesthetic artisan. Microdosing beard drinking vinegar green juice art party banh mi pickled. Hella occupy gochujang, you probably haven't heard of them church-key selvage freegan vaporware pour-over helvetica waistcoat air plant. Etsy messenger bag fanny pack ennui YOLO direct trade tote bag cliche synth. Vaporware snackwave lomo, seitan af wayfarers chambray marfa yuccie. Literally keffiyeh helvetica, single-origin coffee asymmetrical iceland hoodie shaman lo-fi adaptogen. Ennui everyday carry iceland hella kale chips master cleanse intelligentsia post-ironic.",
  },
  {
    publicId: "1",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257367/swupp-dev/i_vsvnng.jpg",
    isCover: true,
    caption:
      "I'm baby shoreditch meh helvetica gluten-free vexillologist. 8-bit marfa YOLO jianbing tbh synth, thundercats scenester enamel pin. Put a bird on it tacos before they sold out, 3 wolf moon ramps tumeric tote bag tousled heirloom air plant lomo YOLO whatever fixie vape. Franzen microdosing schlitz poke four dollar toast narwhal. Literally vape dreamcatcher PBR&B, intelligentsia adaptogen art party. Street art vaporware vegan beard",
  },
  {
    publicId: "5",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257365/swupp-dev/u_s0dfzs.jpg",
    caption: "I'm baby roof party raw denim four dollar toast non.",
  },
  {
    publicId: "6",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257365/swupp-dev/gs_wa3e4n.jpg",
    caption:
      "Actually offal enamel pin tousled forage, dolore commodo aesthetic. Everyday carry thundercats YOLO tattooed. Locavore drinking vinegar pariatur swag mlkshk consectetur ipsum. ",
  },
  {
    publicId: "7",
    url: "https://res.cloudinary.com/topzdev/image/upload/v1610257365/swupp-dev/l_nzk3k4.jpg",
    caption:
      "Small batch food truck proident quinoa, hell of farm-to-table meh XOXO readymade franzen vegan tbh green juice twee. Ethical letterpress palo santo crucifix +1 cold-pressed copper mug lo-fi neutra commodo. ",
  },
];
