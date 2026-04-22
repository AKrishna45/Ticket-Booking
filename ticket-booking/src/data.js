export const EVENTS = [
  {
    id: 1,
    title: "TechFest 2025",
    subtitle: "Annual Technical Festival",
    date: "May 15, 2025",
    time: "9:00 AM – 6:00 PM",
    venue: "Main Auditorium, Block A",
    category: "Tech Fest",
    color: "#FF6B35",
    accent: "#FFD166",
    description:
      "Experience cutting-edge innovations, hackathons, workshops, and competitions across AI, robotics, web development, and more. Join 500+ students and industry experts for a full day of learning and excitement.",
    tags: ["Hackathon", "Workshops", "Competitions", "Networking"],
    capacity: 500,
    booked: 312,
    ticketTypes: [
      {
        id: "gen",
        label: "General Pass",
        price: 199,
        perks: ["All sessions access", "Lunch included", "Goody bag"],
      },
      {
        id: "pro",
        label: "Pro Pass",
        price: 499,
        perks: ["All sessions access", "Lunch + dinner", "Goody bag", "Workshop kit", "Certificate"],
      },
      {
        id: "vip",
        label: "VIP Pass",
        price: 999,
        perks: ["All sessions access", "All meals", "Premium goody bag", "Workshop kit", "Certificate", "Meet & Greet"],
      },
    ],
  },
  {
    id: 2,
    title: "DevSummit",
    subtitle: "National Seminar on Emerging Tech",
    date: "June 3, 2025",
    time: "10:00 AM – 5:00 PM",
    venue: "Seminar Hall, Block C",
    category: "Seminar",
    color: "#4361EE",
    accent: "#4CC9F0",
    description:
      "A one-day seminar featuring keynote speakers from top MNCs, research paper presentations, and panel discussions on cloud computing, cybersecurity, blockchain, and the future of AI-driven software.",
    tags: ["Keynotes", "Research Papers", "Panel Discussion"],
    capacity: 300,
    booked: 189,
    ticketTypes: [
      {
        id: "std",
        label: "Standard",
        price: 149,
        perks: ["Keynote access", "Refreshments", "E-certificate"],
      },
      {
        id: "pres",
        label: "Presenter Pass",
        price: 299,
        perks: ["Keynote access", "Paper presentation slot", "Lunch", "Certificate", "Journal publication"],
      },
    ],
  },
  {
    id: 3,
    title: "CodeSprint",
    subtitle: "48-Hour Hackathon",
    date: "July 12–13, 2025",
    time: "Starts 8:00 AM",
    venue: "CS Lab Complex, Block B",
    category: "Hackathon",
    color: "#06D6A0",
    accent: "#FFD166",
    description:
      "48 hours. 1 problem statement. Unlimited coffee. Build something that matters with your team and compete for prizes worth ₹1,50,000. Mentors from top tech companies will guide you throughout.",
    tags: ["Team Event", "₹1.5L Prize Pool", "Mentors", "Open to All"],
    capacity: 200,
    booked: 178,
    ticketTypes: [
      {
        id: "solo",
        label: "Solo Hacker",
        price: 99,
        perks: ["Full 48hr access", "All meals included", "Mentor sessions", "Certificate"],
      },
      {
        id: "team",
        label: "Team of 4",
        price: 299,
        perks: ["Full 48hr access", "All meals included", "Mentor sessions", "Priority review", "Certificate"],
      },
    ],
  },
];

export const DEPARTMENTS = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Biotechnology",
];

export const YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "PG / M.Tech",
  "PhD",
  "Faculty / Staff",
];
