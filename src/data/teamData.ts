const directors = [
  {
    name: "Yee Loong Tang",
    pronouns: "he/him",
    position: "Executive director",
    stroke: "about/team-yeeloong.png",
    fill: "about/team-yeeloong-fill.svg",
    description:
      " designer at Reap, previously at Live Nation and Ticketmaster.",
  },
  // {
  //   name: "Josh Ralla",
  //   pronouns: "he/him",
  //   position: "Executive director",
  //   stroke: "about/team-josh.png",
  //   fill: "about/team-josh-fill.svg",
  //   description:
  //     " coordinator at Vancouver Ultimate League, design and production editor at The Peak.",
  // },
  {
    name: "Kayla You",
    pronouns: "she/her",
    position: "Executive operations director",
    stroke: "/about/team-kayla.png",
    fill: "about/team-kayla-fill.svg",
    description:
      " risk analyst at Deloitte, previously at Canadian International Arts & Music Society.",
  },
  {
    name: "Paul Falkowski",
    pronouns: "he/him",
    position: "Executive producer",
    stroke: "/about/team-paul.png",
    fill: "about/team-paul-fill.svg",
    description: " drama educator and entertainer, previously at Bell Media.",
  },
  {
    name: "Robin Yang",
    pronouns: "he/him",
    position: "Marketing director",
    stroke: "/about/team-robin.png",
    fill: "about/team-robin-fill.svg",
    description:
      " previously a Field Organizer in the Liberal Party of Canada.",
  },
  {
    name: "Alvin Leung",
    pronouns: "he/him",
    position: "Creative director",
    stroke: "/about/team-alvin.png",
    fill: "about/team-alvin-fill.svg",
    description:
      " previously a designer at Daybreak Studio and Dossier Creative.",
  },
  {
    name: "Nathan Lew",
    pronouns: "he/him",
    position: "Creative director",
    stroke: "/about/team-nathan.png",
    fill: "about/team-nathan-fill.svg",
    description:
      " designer at Invoke Digital, previously at Touchpoint IxD Conference and Guusto.",
  },
];

const teams = [
  {
    name: "Events",
    members: [
      // {
      //   name: "Josh Ralla",
      //   position: "Event director",
      //   linkedin: "https://linkedin.com/in/joshralla",
      //   image: "profilePictures/joshrProfile.jpeg",
      // },
      {
        name: "Andrea Choi",
        position: "Event coordinator",
        linkedin: "https://linkedin.com/in/choiandrea",
        image: "profilePictures/andreacProfile.jpeg",
      },
      {
        name: "Merry Chowdhury",
        position: "Event coordinator",
        linkedin: "https://linkedin.com/in/merrychowdhury",
        image: "TEDxSFU_logo_black.svg",
      },
    ],
  },
  {
    name: "Operations",
    members: [
      {
        name: "Kayla You",
        position: "Executive operations director",
        linkedin: "https://linkedin.com/in/kayla-you",
        image: "profilePictures/kaylayProfile.jpeg",
      },
      {
        name: "Jessica Kan",
        position: "Internal coordinator",
        linkedin: "https://linkedin.com/in/jessicataokan",
        image: "profilePictures/jessicakProfile.jpeg",
      },
      {
        name: "Vanshita Sethi",
        position: "Internal coordinator",
        linkedin: "https://linkedin.com/in/vanshita-sethi-5072271a9",
        image: "profilePictures/vanshitasProfile.jpeg",
      },
      {
        name: "Matthias Ting",
        position: "Accountant",
        linkedin: "https://linkedin.com/in/matthiasting",
        image: "TEDxSFU_logo_black.svg",
      },
    ],
  },
  {
    name: "Creative",
    members: [
      {
        name: "Alvin Leung",
        position: "Creative director",
        linkedin: "https://linkedin.com/in/1234alvin",
        image: "profilePictures/alvinlProfile.jpeg",
      },
      {
        name: "Nathan Lew",
        position: "Creative director",
        linkedin: "https://linkedin.com/in/nlew",
        image: "profilePictures/nathanlProfile.jpeg",
      },
      {
        name: "Kelly Hady",
        position: "Visual designer",
        linkedin: "https://linkedin.com/in/kelly-hady",
        image: "profilePictures/kellyhProfile.jpeg",
      },
      {
        name: "Emily Xu",
        position: "Visual designer",
        linkedin: "https://linkedin.com/in/emily-xu-89a3661a7",
        image: "profilePictures/emilyxProfile.jpeg",
      },
      {
        name: "Abbey Perley",
        position: "Motion designer",
        linkedin: "https://linkedin.com/in/abbey-perley-141063255/",
        image: "profilePictures/abbeypProfile.jpeg",
      },
      {
        name: "Chris Thomas",
        position: "Motion designer",
        linkedin: "https://linkedin.com/in/chrisvthomas/",
        image: "profilePictures/christProfile.jpeg",
      },
    ],
  },
  {
    name: "Partners Relations",
    members: [
      {
        name: "Kazuki Clark",
        position: "PR coordinator",
        linkedin: "https://linkedin.com/in/kazuki-clark-0a10611b1",
        image: "profilePictures/kazukicProfile.jpeg",
      },
      {
        name: "Jasleen Kaur",
        position: "PR coordinator",
        linkedin: "https://linkedin.com/in/jasleen-k-s-rai",
        image: "profilePictures/jasleenkProfile.jpeg",
      },
    ],
  },
  {
    name: "Content",
    members: [
      {
        name: "Paul Falkowski",
        position: "Executive producer",
        linkedin: "https://linkedin.com/in/paulfa",
        image: "profilePictures/paulfProfile.jpeg",
      },
      {
        name: "Jerrica Zabala",
        position: "Content dev. producer",
        linkedin: "https://linkedin.com/in/jerricazabala",
        image: "profilePictures/jerricazProfile.jpeg",
      },
      {
        name: "Elizabeth Phan",
        position: "Content dev. producer",
        linkedin: "https://linkedin.com/in/elizabeth-phan-01828a277",
        image: "profilePictures/lizziepProfile.jpeg",
      },
    ],
  },
  {
    name: "Marketing",
    members: [
      {
        name: "Robin Yang",
        position: "Marketing director",
        linkedin: "https://www.linkedin.com/in/robin-yang-641b5228a/",
        image: "profilePictures/robinyProfile.jpeg",
      },
      {
        name: "Youngin Cho",
        position: "Marketing coordinator",
        linkedin: "https://linkedin.com/in/young-in-cho",
        image: "TEDxSFU_logo_black.svg",
      },
      {
        name: "Andrea Li",
        position: "Marketing coordinator",
        linkedin: "https://www.linkedin.com/in/andrea-li-343474213/",
        image: "TEDxSFU_logo_black.svg",
      },
    ],
  },
  {
    name: "License Holder",
    members: [
      {
        name: "Bernhard Riecke",
        position: "TEDxSFU license holder",
        linkedin: "https://www.linkedin.com/in/bernhard-riecke-6745042b/",
        image: "profilePictures/bernhardRiecke.jpeg",
      },
    ],
  },
];
export { directors, teams };
