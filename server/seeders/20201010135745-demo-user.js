const argon = require("argon2");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert("user", [
      {
        email: "pswindley0@so-net.ne.jp",
        username: "sjaegar0",
        password: "zW7pTqYf0T1t",
        phoneNUmber: "8157994447",
      },
      {
        email: "greiling1@timesonline.co.uk",
        username: "kburnell1",
        password: "1rJjXl1vaPo",
        phoneNUmber: "8658383969",
      },
      {
        email: "esewell2@domainmarket.com",
        username: "pvedeniktov2",
        password: "akvAuz5qvIt",
        phoneNUmber: "5563381584",
      },
      {
        email: "fpidwell3@miitbeian.gov.cn",
        username: "lstorry3",
        password: "pzGcUyld4dx",
        phoneNUmber: "3131028601",
      },
      {
        email: "csate4@goo.gl",
        username: "abransdon4",
        password: "ATnB8x",
        phoneNUmber: "4241436400",
      },
      {
        email: "pfoye5@networkadvertising.org",
        username: "ethay5",
        password: "S5uhv3F",
        phoneNUmber: "7584366645",
      },
      {
        email: "ckemitt6@webs.com",
        username: "vmasserel6",
        password: "RB5XmBLj5h",
        phoneNUmber: "4082105649",
      },
      {
        email: "sdambrosi7@un.org",
        username: "aodaly7",
        password: "2hHiEpg",
        phoneNUmber: "4069217821",
      },
      {
        email: "abrodeur8@scientificamerican.com",
        username: "cizsak8",
        password: "od82b9",
        phoneNUmber: "9068920687",
      },
      {
        email: "aplaister9@whitehouse.gov",
        username: "hlilloe9",
        password: "luko30u",
        phoneNUmber: "4804419175",
      },
      {
        email: "lsundina@nih.gov",
        username: "hbarbrooka",
        password: "iC3VBHd",
        phoneNUmber: "2601551715",
      },
      {
        email: "kbythewayb@myspace.com",
        username: "sassenderb",
        password: "DCXw3X6",
        phoneNUmber: "6706260359",
      },
      {
        email: "wfairbeardc@wired.com",
        username: "mfearnsidec",
        password: "LqTIYeYzWN",
        phoneNUmber: "1697461857",
      },
      {
        email: "tmenichinid@lycos.com",
        username: "svogtd",
        password: "GGDvS3",
        phoneNUmber: "8486266528",
      },
      {
        email: "tmarkinge@marriott.com",
        username: "tbembridgee",
        password: "CWzu86",
        phoneNUmber: "4144235749",
      },
      {
        email: "dcodronf@europa.eu",
        username: "gpalmbyf",
        password: "8b3qALx",
        phoneNUmber: "6711415313",
      },
      {
        email: "tjanatag@alexa.com",
        username: "bdymickg",
        password: "wmf7AWld",
        phoneNUmber: "1903901523",
      },
      {
        email: "mmibourneh@dedecms.com",
        username: "sbarrowcliffeh",
        password: "YxzSk2kEE",
        phoneNUmber: "7205090896",
      },
      {
        email: "dtetti@si.edu",
        username: "laaronsi",
        password: "p1ecDpEZhTV",
        phoneNUmber: "4479866032",
      },
      {
        email: "kfairebrotherj@yahoo.com",
        username: "wmorsleyj",
        password: "ou6Fz8",
        phoneNUmber: "3632549867",
      },
      {
        email: "dbetancourtk@ycombinator.com",
        username: "tnurseyk",
        password: "PW6iTxTB",
        phoneNUmber: "4514188190",
      },
      {
        email: "berikssonl@microsoft.com",
        username: "cdybelll",
        password: "4CrXzxhgI75p",
        phoneNUmber: "2929956088",
      },
      {
        email: "jsirem@artisteer.com",
        username: "aiveaghm",
        password: "xbBkn10WP",
        phoneNUmber: "7458389053",
      },
      {
        email: "sbrun@fema.gov",
        username: "pmcgettigann",
        password: "YR5SUlfXCmLd",
        phoneNUmber: "6007420814",
      },
      {
        email: "swaliszewskio@jugem.jp",
        username: "cdraysayo",
        password: "UuVkbjOt",
        phoneNUmber: "8672058181",
      },
      {
        email: "csellimanp@baidu.com",
        username: "lsinnettp",
        password: "12PE2UYfZe",
        phoneNUmber: "9775787175",
      },
      {
        email: "afrankenq@prweb.com",
        username: "fbalharryq",
        password: "H1DHB9",
        phoneNUmber: "5737433804",
      },
      {
        email: "ddulanyr@examiner.com",
        username: "jmindenhallr",
        password: "JhmVZn",
        phoneNUmber: "7083957719",
      },
      {
        email: "psheafs@hud.gov",
        username: "cweerdenburgs",
        password: "gZdqIqWG",
        phoneNUmber: "8562440371",
      },
      {
        email: "abassillt@paginegialle.it",
        username: "jmacartet",
        password: "ZTlseKF47bPc",
        phoneNUmber: "3363283429",
      },
      {
        email: "alestrangeu@mac.com",
        username: "etwyfordu",
        password: "Uc32PC1O",
        phoneNUmber: "2646144639",
      },
      {
        email: "bbluettv@webs.com",
        username: "lcullivanv",
        password: "8FdHoSsu",
        phoneNUmber: "5207087233",
      },
      {
        email: "candraudw@tmall.com",
        username: "cgliddonw",
        password: "66oZt3",
        phoneNUmber: "3326075243",
      },
      {
        email: "mbaslerx@spotify.com",
        username: "daryx",
        password: "DwJq9Tp",
        phoneNUmber: "4689659886",
      },
      {
        email: "bcareny@time.com",
        username: "cflowithy",
        password: "ukAlL07Z",
        phoneNUmber: "3352637732",
      },
      {
        email: "itettherz@vimeo.com",
        username: "twolfarthz",
        password: "3N7G4F6Pg",
        phoneNUmber: "9361855257",
      },
      {
        email: "whenzer10@cbslocal.com",
        username: "bwardale10",
        password: "YRCuvWMm",
        phoneNUmber: "3826793128",
      },
      {
        email: "rpymer11@cornell.edu",
        username: "tfawbert11",
        password: "h2Yufy",
        phoneNUmber: "7089748875",
      },
      {
        email: "aburne12@comcast.net",
        username: "abrazel12",
        password: "vECB0Rt28Vpu",
        phoneNUmber: "4085060421",
      },
      {
        email: "mgehringer13@fema.gov",
        username: "egillebert13",
        password: "cBmJML2u3R",
        phoneNUmber: "5148128475",
      },
      {
        email: "cohingerty14@state.gov",
        username: "awinckle14",
        password: "uzoDbKdnWnv",
        phoneNUmber: "1118696595",
      },
      {
        email: "cshewry15@stanford.edu",
        username: "sklaus15",
        password: "xvMLwee",
        phoneNUmber: "3354360808",
      },
      {
        email: "mmatthensen16@exblog.jp",
        username: "bcourtney16",
        password: "OYmNpJmzsP",
        phoneNUmber: "4509514336",
      },
      {
        email: "vdacosta17@mapquest.com",
        username: "rdavidde17",
        password: "SNWIIFcRW47k",
        phoneNUmber: "8454495154",
      },
      {
        email: "kblowen18@reuters.com",
        username: "ttapson18",
        password: "1ATfSc9",
        phoneNUmber: "7677647194",
      },
      {
        email: "smedwell19@soundcloud.com",
        username: "hlangman19",
        password: "sNCy1u",
        phoneNUmber: "5336681153",
      },
      {
        email: "raspinall1a@gravatar.com",
        username: "mcraigmile1a",
        password: "NiFXH7m5iz",
        phoneNUmber: "7263120857",
      },
      {
        email: "gdicks1b@hhs.gov",
        username: "kverdon1b",
        password: "KHUJ1XR93bhm",
        phoneNUmber: "5509510984",
      },
      {
        email: "bslarke1c@hao123.com",
        username: "ashrimpling1c",
        password: "aT2sqV",
        phoneNUmber: "2056872526",
      },
      {
        email: "cdallimare1d@dailymotion.com",
        username: "gtewes1d",
        password: "U767jRG",
        phoneNUmber: "2029841781",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *;
     */

    return await queryInterface.bulkDelete("user", null, {});
  },
};
