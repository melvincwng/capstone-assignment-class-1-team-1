export const CSS_OVERRIDE_FOR_LOADER_COMPONENT = {
  position: "static",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const NAVBAR_OPTIONS = {
  RETRIEVE_MOVIE: "Retrieve Movie",
  CREATE_MOVIE: "Create Movie",
  DELETE_MOVIE: "Delete Movie",
  UPDATE_MOVIES: "Update Movies",
  PINNED_MOVIES: "Pinned Movies",
  ABOUT_US: "About Us",
};

export const API_HOST = "http://localhost:8081";
export const YES = "Y";
export const NO = "N";
export const SORT_BY_A_TO_Z = "A-Z ↓";
export const SORT_BY_Z_TO_A = "Z-A ↑";
export const HIDE_PAST_MOVIES = "Hide Past Movies";
export const SHOW_PAST_MOVIES = "Show Past Movies";
export const SHOW_ALL_MOVIES = "Show All Movies";
export const FILTER_MOVIES_BY_GENRE = "Filter Movies By Genre";
export const ADD_NEW_MOVIE = "Add New Movie";
export const DELETE_ONE_MOVIE = "Delete One Movie";
export const DELETE_MULTIPLE_MOVIES = "Delete Multiple Movies";
export const SEARCH_MOVIES_BY_NAME = "Search Movies By Name";
export const UPDATE_MOVIES = "Update Movies";
export const UPDATE_PINNED_MOVIES = "Update Pinned Movies";

export const TOGGLE_MOVIES_OPTIONS = [
  SORT_BY_A_TO_Z,
  SORT_BY_Z_TO_A,
  HIDE_PAST_MOVIES,
  SHOW_PAST_MOVIES,
  SHOW_ALL_MOVIES,
];

export const GENRES = [
  {
    genreID: 1,
    name: "Action",
    description: "Action movies are listed here",
  },
  {
    genreID: 2,
    name: "Anime",
    description: "Anime movies are listed here",
  },
  {
    genreID: 3,
    name: "Fantasy",
    description: "Fantasy movies are listed here",
  },
  {
    genreID: 4,
    name: "Sci-fi",
    description: "Sci-fi movies are listed here",
  },
  {
    genreID: 5,
    name: "Romance",
    description: "Romance movies are listed here",
  },
];

export const INITIAL_MOVIES = [
  {
    movieID: 1,
    name: "Black Adam",
    description:
      "Black Adam is a 2021 American superhero film based on the DC Comics character of the same name. It is the seventh installment overall in the DC Extended Universe film series.",
    releaseDate: "2022-10-20 10:00:00",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg",
    genreID: 1,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 2,
    name: "Spider-Man: No Way Home",
    description:
      "Spider-Man seeks the help of Doctor Strange to forget his exposed secret identity as Peter Parker. However, Strange's spell goes horribly wrong, leading to unwanted guests entering their universe",
    releaseDate: "2021-12-17 10:00:00",
    imageURL:
      "https://images.fandango.com/ImageRenderer/820/0/redesign/static/img/default_poster.png/0/images/masterrepository/fandango/225415/SMRR_935x1381_Digital_1Sheet.jpg",
    genreID: 1,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 3,
    name: "Disenchanted",
    description:
      "Years after her happily ever after, Giselle, Robert and Morgan move to a new community and Andalasia and the real world are thrown off-balance.",
    releaseDate: "2022-11-16 10:00:00",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BNDVhYjU1ZjUtNzI3Ni00Mzg5LWJhNGYtMjE3Y2FlZWY2Y2Y2XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg",
    genreID: 3,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 4,
    name: "The Secrets of Dumbledore",
    description:
      "Years after her happily ever after, Giselle, Robert and Morgan move to a new community and Andalasia and the real world are thrown off-balance.",
    releaseDate: "2022-04-08 10:00:00",
    imageURL:
      "https://m.media-amazon.com/images/M/MV5BZGQ1NjQyNDMtNzFlZS00ZGIzLTliMWUtNGJkMGMzNTBjNDg0XkEyXkFqcGdeQXVyMTE1NDI5MDQx._V1_FMjpg_UX1000_.jpg",
    genreID: 1,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 5,
    name: "Thor: Love and Thunder",
    description:
      "Thor embarks on a journey unlike anything he's ever faced -- a quest for inner peace. However, his retirement gets interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods.",
    releaseDate: "2022-07-06 10:00:00",
    imageURL:
      "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F06%2Fthor-love-and-thunder-character-posters-first-look-info-001.jpg?q=75&w=800&cbr=1&fit=max",
    genreID: 1,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 6,
    name: "Free Guy",
    description:
      "When a bank teller discovers he's actually a background player in an open-world video game, he decides to become the hero of his own story -- one that he can rewrite himself.",
    releaseDate: "2021-08-13 10:00:00",
    imageURL:
      "https://fictionmachine.files.wordpress.com/2021/08/freeguy_poster.jpg",
    genreID: 1,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 7,
    name: "Suzume no Tojimari",
    description:
      "Seventeen-year-old Suzume discovers a mysterious door in the mountains, and soon other doors begin appearing across Japan. As the doors open, they release disasters and destruction, and it's up to Suzume to close them again.",
    releaseDate: "2022-11-11 10:00:00",
    imageURL: "https://pbs.twimg.com/media/Fdxq0gMXEAcb-nW.jpg:large",
    genreID: 2,
    active: "Y",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 8,
    name: "Shang-Chi",
    description:
      "Shang-Chi, a martial artist, lives a quiet life after he leaves his father and the shadowy Ten Rings organisation behind. Years later, he is forced to confront his past when the Ten Rings attack him.",
    releaseDate: "2021-09-02 10:00:00",
    imageURL:
      "https://lumiere-a.akamaihd.net/v1/images/shang-chi-poster_660fcb9f.jpeg",
    genreID: 1,
    active: "N",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 9,
    name: "Zack Snyder's Justice League",
    description:
      "Bruce Wayne and Diana Prince try to bring the metahumans of Earth together after the death of Clark Kent. Meanwhile, Darkseid sends Steppenwolf to Earth with a vast army to subjugate humans.",
    releaseDate: "2021-03-18 10:00:00",
    imageURL:
      "https://cosmicbook.news/images1/gal-gadot-wonder-woman-poster-zack-snyder-justice-league-hr.jpg",
    genreID: 1,
    active: "N",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 10,
    name: "The Suicide Squad",
    description:
      "A government agent manipulates supervillains to become a part of a dangerous team in exchange for reduced sentences. They get sent to Corto Maltese, where they must destroy a laboratory.",
    releaseDate: "2021-07-30 10:00:00",
    imageURL:
      "https://images.radiox.co.uk/images/228803?crop=16_9&width=660&relax=1&signature=CqRAFK4gVaEeewgBOmxYqxT0Amw=",
    genreID: 1,
    active: "N",
    dateInserted: "2022-12-25 10:00:00",
  },
  {
    movieID: 11,
    name: "Guardians of the Galaxy 2023",
    description:
      "Guardians of the Galaxy Vol. 3 is an upcoming American superhero film based on the Marvel Comics superhero team Guardians of the Galaxy, produced by Marvel Studios.",
    releaseDate: "2023-05-04 10:00:00",
    imageURL:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6508d53d-9f08-4740-a8a1-d26e4506f78a/detgxzi-6277fddb-9d41-4d09-8854-5f3407b3efa6.jpg/v1/fill/w_1280,h_1811,q_75,strp/guardians_of_the_galaxy_vol_3_poster_by_marvelmango_detgxzi-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTgxMSIsInBhdGgiOiJcL2ZcLzY1MDhkNTNkLTlmMDgtNDc0MC1hOGExLWQyNmU0NTA2Zjc4YVwvZGV0Z3h6aS02Mjc3ZmRkYi05ZDQxLTRkMDktODg1NC01ZjM0MDdiM2VmYTYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.yeJTCLtpExnAbGlzWCsXBcOgXzj1yYVXZeNOwDE-nc8",
    genreID: 4,
    active: "N",
    dateInserted: "2022-12-25 10:00:00",
  },
];

export const ABOUT_US_DATA = [
  {
    imageURL: "https://avatars.githubusercontent.com/u/77479885?v=4",
    frontCardName: "Melvin Ng",
    frontCardTextOne:
      "Melvin is a software developer & the technical lead for this Full-stack Capstone Project (FCP). As the project's leader, he is responsible for creating this full-stack web app - both the basic & advanced features. He enjoys tinkering with new frameworks & languages in his free time to build software apps.",
    frontCardTextTwo: "👉 Hover over the card to find out more",
    backCardTextOne: "Additional Details:",
    backCardTextTwoArray: [
      "Set up the core code repository for the team to work on.",
      "Implemented this full-stack web app basic features.",
      "Implemented numerous advanced/additional features.",
      "Reviewed incoming PRs, fixed bugs & provided tech support to the team.",
    ],
    githubText: "GitHub Profile:",
    githubURL: "https://github.com/melvincwng",
    clickHereText: "Click here",
  },
  {
    imageURL: "https://avatars.githubusercontent.com/u/120546181?v=4",
    frontCardName: "Member 2",
    frontCardTextOne:
      "Placeholder text for member 2 (Max ~300 chars) dolor sit ame Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor Lorem ipsum Lorem ipsum dolor sit dolor sit Lorem ipsum dolor sit dolor sit Lorem ipsum dolor sit dolor sit Lorem ipsum dolor sit dolor sit ipsum dolor sit dolor sit.",
    frontCardTextTwo: "👉 Hover over the card to find out more",
    backCardTextOne: "Additional Details:",
    backCardTextTwoArray: [
      "Placeholder text 1",
      "Placeholder text 2",
      "Placeholder text 3",
      "Placeholder text 4",
    ],
    githubText: "GitHub Profile:",
    githubURL: "https://github.com/placeholder",
    clickHereText: "Click here",
  },
  {
    imageURL: "https://avatars.githubusercontent.com/u/120546181?v=4",
    frontCardName: "Sean Ng",
    frontCardTextOne:
      "Sean brings more than 20 years of experience in IT project management and creative leadership—along with a passion for teaching and community-building—to his work as a consultant and coach. For this project he has develop a feature that gets the movie sorted in A to Z ",
    frontCardTextTwo: "👉 Hover over the card to find out more",
    backCardTextOne: "Additional Details:",
    backCardTextTwoArray: [
      "Solve project objectives",
      "Complete tasks in areas of expertise",
      "Deliver project responsibilities within deadlines",
      "Communicate with project lead on roadblocks",
      "Document progress, setbacks, and new processes",

    ],
    githubText: "GitHub Profile:",
    githubURL: "https://github.com/P7461085",
    clickHereText: "Click here",
  },
];
