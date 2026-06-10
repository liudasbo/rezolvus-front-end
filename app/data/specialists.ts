export interface AvailableDate {
  day: number;
  dayName: string;
  available: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  specializations: string[];
  bio: string;
  yearsExperience: string;
  rating: string;
  reviewsCount: string;
  languages: string[];
  sessionTypes: ("In person" | "Online")[];
  photo: string;
  priceFrom: number;
  sessionDuration: number;
  nextAvailable: {
    weekLabel: string;
    dates: AvailableDate[];
    times: string[][];
  };
}

export const specialists: Specialist[] = [
  {
    id: "1",
    name: "Dr. Emma Williams",
    specializations: ["Psychologist", "Physiotherapist", "Therapist", "Wellness Coach"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    yearsExperience: "8+ years",
    rating: "5.0",
    reviewsCount: "60+",
    languages: ["Lithuanian", "English", "German"],
    sessionTypes: ["In person"],
    photo: "/images/specialist-1.jpg",
    priceFrom: 50,
    sessionDuration: 45,
    nextAvailable: {
      weekLabel: "May 13-19, 2026",
      dates: [
        { day: 13, dayName: "Wed", available: true },
        { day: 14, dayName: "Thu", available: true },
        { day: 15, dayName: "Fri", available: true },
        { day: 16, dayName: "Sat", available: true },
        { day: 17, dayName: "Sun", available: false },
        { day: 18, dayName: "Mon", available: false },
        { day: 19, dayName: "Tue", available: true },
      ],
      times: [
        ["08:00", "09:00", "10:00", "11:00"],
        ["12:00", "14:00", "15:00", "16:00"],
        ["17:00", "18:00", "19:00", "View All"],
      ],
    },
  },
  {
    id: "2",
    name: "Maureen Schimmel-Torp",
    specializations: ["Psychologist", "Therapist", "Wellness Coach"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    yearsExperience: "12+ years",
    rating: "4.9",
    reviewsCount: "124+",
    languages: ["Lithuanian", "English"],
    sessionTypes: ["Online"],
    photo: "/images/specialist-2.jpg",
    priceFrom: 65,
    sessionDuration: 60,
    nextAvailable: {
      weekLabel: "May 13-19, 2026",
      dates: [
        { day: 13, dayName: "Wed", available: false },
        { day: 14, dayName: "Thu", available: true },
        { day: 15, dayName: "Fri", available: true },
        { day: 16, dayName: "Sat", available: false },
        { day: 17, dayName: "Sun", available: false },
        { day: 18, dayName: "Mon", available: true },
        { day: 19, dayName: "Tue", available: true },
      ],
      times: [
        ["10:00", "11:00", "13:00", "14:00"],
        ["15:00", "16:00", "17:00", "18:00"],
        ["19:00", "20:00", "21:00", "View All"],
      ],
    },
  },
  {
    id: "3",
    name: "Stephanie Morar",
    specializations: ["Physiotherapist", "Wellness Coach"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    yearsExperience: "6+ years",
    rating: "4.8",
    reviewsCount: "45+",
    languages: ["English", "French"],
    sessionTypes: ["In person", "Online"],
    photo: "/images/specialist-3.jpg",
    priceFrom: 45,
    sessionDuration: 50,
    nextAvailable: {
      weekLabel: "May 13-19, 2026",
      dates: [
        { day: 13, dayName: "Wed", available: true },
        { day: 14, dayName: "Thu", available: true },
        { day: 15, dayName: "Fri", available: false },
        { day: 16, dayName: "Sat", available: true },
        { day: 17, dayName: "Sun", available: false },
        { day: 18, dayName: "Mon", available: false },
        { day: 19, dayName: "Tue", available: true },
      ],
      times: [
        ["09:00", "10:00", "11:00", "12:00"],
        ["14:00", "15:00", "16:00", "17:00"],
        ["18:00", "19:00", "20:00", "View All"],
      ],
    },
  },
  {
    id: "4",
    name: "Lamar Mohr",
    specializations: ["Psychologist", "Therapist"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    yearsExperience: "10+ years",
    rating: "5.0",
    reviewsCount: "89+",
    languages: ["Lithuanian", "English", "Russian"],
    sessionTypes: ["Online"],
    photo: "/images/specialist-4.jpg",
    priceFrom: 55,
    sessionDuration: 45,
    nextAvailable: {
      weekLabel: "May 13-19, 2026",
      dates: [
        { day: 13, dayName: "Wed", available: false },
        { day: 14, dayName: "Thu", available: false },
        { day: 15, dayName: "Fri", available: true },
        { day: 16, dayName: "Sat", available: true },
        { day: 17, dayName: "Sun", available: false },
        { day: 18, dayName: "Mon", available: true },
        { day: 19, dayName: "Tue", available: true },
      ],
      times: [
        ["11:00", "12:00", "14:00", "15:00"],
        ["16:00", "17:00", "18:00", "19:00"],
        ["20:00", "21:00", "22:00", "View All"],
      ],
    },
  },
  {
    id: "5",
    name: "Dr. Emma Williams",
    specializations: ["Psychologist", "Physiotherapist", "Therapist"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    yearsExperience: "8+ years",
    rating: "4.7",
    reviewsCount: "38+",
    languages: ["Lithuanian", "English"],
    sessionTypes: ["In person"],
    photo: "/images/specialist-1.jpg",
    priceFrom: 50,
    sessionDuration: 45,
    nextAvailable: {
      weekLabel: "May 13-19, 2026",
      dates: [
        { day: 13, dayName: "Wed", available: true },
        { day: 14, dayName: "Thu", available: true },
        { day: 15, dayName: "Fri", available: true },
        { day: 16, dayName: "Sat", available: false },
        { day: 17, dayName: "Sun", available: false },
        { day: 18, dayName: "Mon", available: true },
        { day: 19, dayName: "Tue", available: false },
      ],
      times: [
        ["08:00", "09:00", "10:00", "11:00"],
        ["13:00", "14:00", "15:00", "16:00"],
        ["17:00", "18:00", "19:00", "View All"],
      ],
    },
  },
];
