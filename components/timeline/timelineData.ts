export interface TimelineEvent {
  /** Clé i18n : messages/<lang>.json → timeline.events.<key> */
  key: string
  date: string
  image: string
}

export const timelineEvents: TimelineEvent[] = [
  { key: "coup1944",             date: "9-IX-1944",    image: "/assets/history/9-IX-1944.jpg" },
  { key: "peoplesCourt",         date: "XII-1944",     image: "/assets/history/XII-1944.jpg" },
  { key: "referendum",           date: "15-IX-1946",   image: "/assets/history/15-IX-1946.jpg" },
  { key: "dimitrovConstitution", date: "6-XII-1947",   image: "/assets/history/6-XII-1947.jpg" },
  { key: "dimitrovDeath",        date: "2-VII-1949",   image: "/assets/history/2-VII-1949.jpg" },
  { key: "chervenkov",           date: "20-XII-1949",  image: "/assets/history/20-XII-1949.jpg" },
  { key: "zhivkovPower",         date: "4-III-1954",   image: "/assets/history/4-III-1954.jpg" },
  { key: "warsawPact",           date: "14-V-1955",    image: "/assets/history/14-V-1955.webp" },
  { key: "aprilConspiracy",      date: "28-III-1965",  image: "/assets/history/28-III-1965.jpg" },
  { key: "czechoslovakia",       date: "21-VIII-1968", image: "/assets/history/21-VIII-1968.jpg" },
  { key: "zhivkovConstitution",  date: "8-V-1971",     image: "/assets/history/8-V-1971.jpg" },
  { key: "markov",               date: "7-IX-1978",    image: "/assets/history/7-IX-1978.jpg" },
  { key: "cosmonaut",            date: "10-IV-1979",   image: "/assets/history/10-IV-1979.jpg" },
  { key: "years1300",            date: "6-V-1981",     image: "/assets/history/6-V-1981.jpg" },
  { key: "buzludzha",            date: "23-VIII-1981", image: "/assets/history/23-VIII-1981.jpg" },
  { key: "revivalProcess",       date: "XII-1984",     image: "/assets/history/XII-1984.jpg" },
  { key: "greatExcursion",       date: "V-1989",       image: "/assets/history/V-1989.jpg" },
  { key: "regimeFall",           date: "10-XI-1989",   image: "/assets/history/10-XI-1989.jpg" },
  { key: "endOfEra",             date: "15-XI-1990",   image: "/assets/history/15-XI-1990.jpg" },
]