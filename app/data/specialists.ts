// app/data/specialists.ts

export interface AvailableDate {
  day: number;
  dayName: string;
  available: boolean;
}

export interface SessionOption {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export interface Qualification {
  id: string;
  type: "education" | "experience" | "approach";
  title: string;
  institution: string;
  year: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Specialist {
  id: string;
  slug: string;
  name: string;
  location: string;
  specializations: string[];
  ageGroups: string;
  specializationTags: string[];
  bio: string;
  aboutFull: string;
  yearsExperience: string;
  rating: string;
  reviewsCount: string;
  languages: string[];
  sessionTypes: ("In person" | "Online")[];
  photo: string;
  priceFrom: number;
  sessionDuration: number;
  sessions: SessionOption[];
  qualifications: Qualification[];
  faq: FaqItem[];
  nextAvailable: {
    weekLabel: string;
    dates: AvailableDate[];
    times: string[][];
  };
}

export const specialists: Specialist[] = [
  {
    id: "1",
    slug: "dr-emma-williams",
    name: "Dr. Emma Williams",
    location: "Vilnius, Lithuania",
    specializations: ["Psychologist", "Physiotherapist", "Therapist", "Wellness Coach"],
    ageGroups: "Work with Adults & Seniors",
    specializationTags: ["Anxiety", "Stress", "Burnout", "Depression", "Self-esteem", "Relationship", "Grief", "Trauma"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    aboutFull: "Lorem ipsum dolor sit amet consectetur. Aliquam scelerisque faucibus leo vestibulum. Lorem sapien tristique quisque condimentum aliquam. Morbi in eu quisque a ipsum pulvinar gravida fermentum dapibus. Adipiscing ut egestas aliquam tristique porta turpis risus nunc. Platea porta elit scelerisque sit semper. Pharetra sed gravida rutrum porttitor enim aliquam felis. Imperdiet elit congue cursus sit gravida eleifend senectus gravida.",
    yearsExperience: "8+ years",
    rating: "5.0",
    reviewsCount: "60+",
    languages: ["Lithuanian", "English", "German"],
    sessionTypes: ["In person"],
    photo: "/images/specialist-1.jpg",
    priceFrom: 50,
    sessionDuration: 45,
    sessions: [
      {
        id: "s1",
        name: "Free Consultation",
        description: "A brief introductory session to understand your needs and explore how we can work together effectively.",
        price: "Free",
        duration: "10 min",
      },
      {
        id: "s2",
        name: "Individual Therapy Session",
        description: "One-on-one therapy focused on your personal goals. We use evidence-based approaches tailored to your unique situation and progress.",
        price: "€50 / €90",
        duration: "45 min / 90 min",
      },
      {
        id: "s3",
        name: "Extended Deep Work Session",
        description: "A longer session for intensive work on complex issues. Suitable for trauma processing, major life transitions, and deep psychological exploration.",
        price: "€90 / €150",
        duration: "45 min / 90 min",
      },
    ],
    qualifications: [
      {
        id: "q1",
        type: "education",
        title: "Master's Degree in Clinical Psychology",
        institution: "Vilnius University, Vilnius, Lithuania",
        year: "2013 — 2018",
        description: "Specialized in clinical and counselling psychology with a focus on cognitive-behavioral methods and psychopathology research.",
      },
      {
        id: "q2",
        type: "education",
        title: "Certified CBT Practitioner",
        institution: "Lithuanian Association of Psychotherapy",
        year: "2019",
        description: "Completed advanced certification in Cognitive Behavioral Therapy, accredited by the European Association for Behavioural and Cognitive Therapies.",
      },
      {
        id: "q3",
        type: "experience",
        title: "Senior Psychologist",
        institution: "Vilnius Mental Health Centre",
        year: "2019 — present",
        description: "Providing individual and group therapy to adults and seniors, specializing in mood disorders, anxiety, and life transitions.",
      },
      {
        id: "q4",
        type: "approach",
        title: "Cognitive Behavioral Therapy (CBT)",
        institution: "Primary approach",
        year: "",
        description: "CBT is a structured, goal-oriented therapy that helps identify and change negative thought patterns. It is highly effective for anxiety, depression, and stress.",
      },
    ],
    faq: [
      {
        id: "f1",
        question: "What can I expect from the first session?",
        answer: "The first session is primarily an assessment. We will discuss your current situation, what brings you to therapy, and your goals. I will explain how I work and we will decide together if we are a good fit.",
      },
      {
        id: "f2",
        question: "How long does therapy usually take?",
        answer: "This varies greatly depending on the individual and their goals. Some people benefit from 6–8 sessions focused on a specific issue, while others prefer longer-term support. We will review progress regularly.",
      },
      {
        id: "f3",
        question: "Are sessions confidential?",
        answer: "Yes, everything discussed in sessions is strictly confidential. Exceptions apply only in cases of serious risk to your safety or others, as required by law.",
      },
      {
        id: "f4",
        question: "Do you offer online sessions?",
        answer: "Currently I offer in-person sessions only. Online sessions may be available in special circumstances — please reach out to discuss your situation.",
      },
    ],
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
    slug: "maureen-schimmel-torp",
    name: "Maureen Schimmel-Torp",
    location: "Kaunas, Lithuania",
    specializations: ["Psychologist", "Therapist", "Wellness Coach"],
    ageGroups: "Work with Teens & Adults",
    specializationTags: ["Anxiety", "Depression", "Relationship", "Parenting", "Work-life balance", "Procrastination"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    aboutFull: "Lorem ipsum dolor sit amet consectetur. Aliquam scelerisque faucibus leo vestibulum. Lorem sapien tristique quisque condimentum aliquam. Morbi in eu quisque a ipsum pulvinar gravida fermentum dapibus. Adipiscing ut egestas aliquam tristique porta turpis risus nunc. Platea porta elit scelerisque sit semper. Pharetra sed gravida rutrum porttitor enim aliquam felis. Imperdiet elit congue cursus sit gravida eleifend senectus gravida.",
    yearsExperience: "12+ years",
    rating: "4.9",
    reviewsCount: "124+",
    languages: ["Lithuanian", "English"],
    sessionTypes: ["Online"],
    photo: "/images/specialist-2.jpg",
    priceFrom: 65,
    sessionDuration: 60,
    sessions: [
      {
        id: "s1",
        name: "Free Consultation",
        description: "A brief introductory session to understand your needs and explore how we can work together effectively.",
        price: "Free",
        duration: "10 min",
      },
      {
        id: "s2",
        name: "Online Therapy Session",
        description: "Flexible online sessions via secure video call. Ideal for those with busy schedules or who prefer the comfort of their own space.",
        price: "€65 / €115",
        duration: "45 min / 90 min",
      },
      {
        id: "s3",
        name: "Couples Counselling",
        description: "Joint sessions for couples navigating relationship challenges, communication issues, or major life transitions together.",
        price: "€110 / €180",
        duration: "60 min / 90 min",
      },
    ],
    qualifications: [
      {
        id: "q1",
        type: "education",
        title: "Master's Degree in Counselling Psychology",
        institution: "Kaunas University of Technology",
        year: "2010 — 2015",
        description: "Focused on counselling theory, group dynamics, and therapeutic relationships across diverse client populations.",
      },
      {
        id: "q2",
        type: "education",
        title: "Certified Mindfulness-Based Cognitive Therapy (MBCT)",
        institution: "Oxford Mindfulness Centre",
        year: "2017",
        description: "Completed the Oxford MBCT teacher training programme, now integrated as a core component of her therapeutic practice.",
      },
      {
        id: "q3",
        type: "experience",
        title: "Lead Therapist & Supervisor",
        institution: "Kaunas Wellness Clinic",
        year: "2016 — present",
        description: "Leads individual and group therapy programmes while supervising junior therapists in evidence-based practice.",
      },
      {
        id: "q4",
        type: "approach",
        title: "Mindfulness-Based Cognitive Therapy (MBCT)",
        institution: "Primary approach",
        year: "",
        description: "MBCT combines cognitive therapy techniques with mindfulness practices. It is especially effective for preventing depression relapse and managing chronic stress.",
      },
    ],
    faq: [
      {
        id: "f1",
        question: "What platform do you use for online sessions?",
        answer: "I use a secure, GDPR-compliant video platform. You will receive a private link before each session. No downloads are required — it works directly in your browser.",
      },
      {
        id: "f2",
        question: "Can I switch from online to in-person sessions?",
        answer: "I currently offer online sessions only. This allows me to work with clients across Lithuania and internationally without geographic limitations.",
      },
      {
        id: "f3",
        question: "How do I know if therapy is working?",
        answer: "We will set clear goals at the start and review progress every 4–6 sessions. Most clients notice improvements in mood, clarity, and day-to-day functioning within the first few weeks.",
      },
      {
        id: "f4",
        question: "Do you work with couples?",
        answer: "Yes, couples counselling is one of my specialisations. Sessions are held jointly and focus on communication, conflict resolution, and rebuilding connection.",
      },
    ],
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
    slug: "stephanie-morar",
    name: "Stephanie Morar",
    location: "Vilnius, Lithuania",
    specializations: ["Nutriologist", "Physiotherapist", "Psychologist"],
    ageGroups: "Work with Infants, Kids & Adults",
    specializationTags: ["Anxiety", "Burnout", "Relationship", "Stress", "Nutrition", "Recovery", "Self-esteem", "Obsessive thoughts", "Procrastination", "Personal effectiveness", "Depression"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    aboutFull: "Lorem ipsum dolor sit amet consectetur. Aliquam scelerisque faucibus leo vestibulum. Lorem sapien tristique quisque condimentum aliquam. Morbi in eu quisque a ipsum pulvinar gravida fermentum dapibus. Adipiscing ut egestas aliquam tristique porta turpis risus nunc. Platea porta elit scelerisque sit semper. Pharetra sed gravida rutrum porttitor enim aliquam felis. Imperdiet elit congue cursus sit gravida eleifend senectus gravida.",
    yearsExperience: "6+ years",
    rating: "4.8",
    reviewsCount: "45+",
    languages: ["English", "French"],
    sessionTypes: ["In person", "Online"],
    photo: "/images/specialist-3.jpg",
    priceFrom: 45,
    sessionDuration: 50,
    sessions: [
      {
        id: "s1",
        name: "Free Consultation",
        description: "A brief introductory session to understand your needs and explore how we can work together effectively.",
        price: "Free",
        duration: "10 min",
      },
      {
        id: "s2",
        name: "Individual Session",
        description: "Rhoncus dictum lorem viverra suscipit non sed vestibulum sed morbi. Consectetur senectus tempor magna donec faucibus sit enim rhoncus nisl. Facilisis tellus non purus ac non.",
        price: "€55 / €100",
        duration: "45 min / 90 min",
      },
      {
        id: "s3",
        name: "Nutrition & Wellness Plan",
        description: "Rhoncus dictum lorem viverra suscipit non sed vestibulum sed morbi. Consectetur senectus tempor magna donec faucibus sit enim rhoncus nisl. Facilisis tellus non purus ac non. Purus feugiat pretium fames sit sit augue. Felis pulvinar sit diam enim ultricies.",
        price: "€100 / €150",
        duration: "45 min / 90 min",
      },
    ],
    qualifications: [
      {
        id: "q1",
        type: "education",
        title: "Master's Degree in Clinical Psychology",
        institution: "Vilnius University, Vilnius, Lithuania",
        year: "2015 — 2020",
        description: "Lorem ipsum dolor sit amet consectetur. Id tincidunt quam pharetra dignissim laoreet viverra in pharetra in. Posuere egestas velit odio diam arcu. Fermentum elementum ut odio arcu.",
      },
      {
        id: "q2",
        type: "education",
        title: "Certified Cognitive Behavioral Therapy (CBT) Practitioner",
        institution: "Lithuanian Association of Psychotherapy",
        year: "2021",
        description: "Lorem ipsum dolor sit amet consectetur. Eu potenti id molestie congue. Diam montes enim eu malesuada laoreet. Libero morbi eros posuere neque. Ac quis ac amet tincidunt nisi sagittis nulla.",
      },
      {
        id: "q3",
        type: "experience",
        title: "Physiotherapist",
        institution: "Vilnius Sports Medicine Centre",
        year: "2020 — present",
        description: "Specialising in post-injury recovery, chronic pain management, and performance rehabilitation for athletes and general patients.",
      },
      {
        id: "q4",
        type: "approach",
        title: "Integrative Nutrition Therapy",
        institution: "Primary approach",
        year: "",
        description: "Combines nutritional science with psychological understanding of eating behaviours. Addresses root causes of disordered eating, fatigue, and metabolic imbalance.",
      },
    ],
    faq: [
      {
        id: "f1",
        question: "Do you offer both in-person and online sessions?",
        answer: "Yes, I offer both formats. In-person sessions are held at my Vilnius clinic. Online sessions are available via secure video call for clients who prefer remote work.",
      },
      {
        id: "f2",
        question: "Can you help with nutrition and mental health together?",
        answer: "Absolutely — this is one of my core specialisations. I take an integrative approach that considers how nutrition, lifestyle, and psychological wellbeing are interconnected.",
      },
      {
        id: "f3",
        question: "What age groups do you work with?",
        answer: "I work with infants (in a parent-guided capacity), children, adolescents, and adults. Each age group has tailored approaches suited to their developmental stage.",
      },
      {
        id: "f4",
        question: "How quickly can I book a first appointment?",
        answer: "I typically have availability within 1–2 weeks. You can book directly through this page by selecting your preferred date and time.",
      },
    ],
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
    slug: "lamar-mohr",
    name: "Lamar Mohr",
    location: "Klaipėda, Lithuania",
    specializations: ["Psychologist", "Therapist"],
    ageGroups: "Work with Adults",
    specializationTags: ["Anxiety", "Depression", "Trauma", "PTSD", "Grief", "Identity", "Stress"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    aboutFull: "Lorem ipsum dolor sit amet consectetur. Aliquam scelerisque faucibus leo vestibulum. Lorem sapien tristique quisque condimentum aliquam. Morbi in eu quisque a ipsum pulvinar gravida fermentum dapibus. Adipiscing ut egestas aliquam tristique porta turpis risus nunc. Platea porta elit scelerisque sit semper. Pharetra sed gravida rutrum porttitor enim aliquam felis. Imperdiet elit congue cursus sit gravida eleifend senectus gravida.",
    yearsExperience: "10+ years",
    rating: "5.0",
    reviewsCount: "89+",
    languages: ["Lithuanian", "English", "Russian"],
    sessionTypes: ["Online"],
    photo: "/images/specialist-4.jpg",
    priceFrom: 55,
    sessionDuration: 45,
    sessions: [
      {
        id: "s1",
        name: "Free Consultation",
        description: "A brief introductory session to understand your needs and explore how we can work together effectively.",
        price: "Free",
        duration: "10 min",
      },
      {
        id: "s2",
        name: "Individual Therapy Session",
        description: "Structured therapeutic work tailored to your specific concerns. Evidence-based methods are applied to support meaningful and lasting change.",
        price: "€55 / €95",
        duration: "45 min / 90 min",
      },
      {
        id: "s3",
        name: "Trauma-Focused Session",
        description: "Specialised sessions using trauma-informed approaches such as EMDR and somatic techniques for processing difficult past experiences.",
        price: "€85 / €150",
        duration: "60 min / 90 min",
      },
    ],
    qualifications: [
      {
        id: "q1",
        type: "education",
        title: "Master's Degree in Psychology",
        institution: "Kaunas University, Lithuania",
        year: "2011 — 2016",
        description: "Specialised in clinical and health psychology with research focus on trauma and stress-related disorders.",
      },
      {
        id: "q2",
        type: "education",
        title: "EMDR Therapist Certification",
        institution: "EMDR Europe Association",
        year: "2019",
        description: "Completed the full EMDR Europe-accredited training programme, covering phases 1–8 of the EMDR protocol for trauma processing.",
      },
      {
        id: "q3",
        type: "experience",
        title: "Clinical Psychologist",
        institution: "Klaipėda Trauma Support Centre",
        year: "2017 — present",
        description: "Providing trauma-focused therapy to adults, including veterans, first responders, and survivors of abuse and accidents.",
      },
      {
        id: "q4",
        type: "approach",
        title: "Eye Movement Desensitization and Reprocessing (EMDR)",
        institution: "Primary approach",
        year: "",
        description: "EMDR is a highly effective, research-backed therapy for trauma and PTSD. It uses bilateral stimulation to help the brain process distressing memories and reduce their emotional charge.",
      },
    ],
    faq: [
      {
        id: "f1",
        question: "What is EMDR and how does it work?",
        answer: "EMDR (Eye Movement Desensitisation and Reprocessing) is a structured therapy that helps process traumatic memories using bilateral stimulation — typically eye movements. It reduces the emotional distress associated with difficult memories.",
      },
      {
        id: "f2",
        question: "Is EMDR suitable for everyone?",
        answer: "EMDR is highly effective for trauma and PTSD. During the initial consultation we assess whether it is the right approach for you. Some clients benefit more from other trauma-informed methods, which I also offer.",
      },
      {
        id: "f3",
        question: "How many sessions does trauma therapy typically take?",
        answer: "This varies widely. Single-incident trauma may resolve in 6–12 sessions. Complex or developmental trauma typically requires longer-term work. We evaluate progress regularly and adjust the plan as needed.",
      },
      {
        id: "f4",
        question: "Do you speak Russian during sessions?",
        answer: "Yes, I offer sessions in Lithuanian, English, and Russian. Please indicate your preferred language when booking.",
      },
    ],
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
    slug: "dr-emma-williams-2",
    name: "Dr. Emma Williams",
    location: "Vilnius, Lithuania",
    specializations: ["Psychologist", "Physiotherapist", "Therapist"],
    ageGroups: "Work with Adults & Seniors",
    specializationTags: ["Anxiety", "Stress", "Recovery", "Physical rehabilitation", "Pain management", "Sports injuries"],
    bio: "Lorem ipsum dolor sit amet consectetur. Sit sit consectetur vehicula blandit sit a. Turpis diam ultricies ut aenean tristique amet enim amet non.",
    aboutFull: "Lorem ipsum dolor sit amet consectetur. Aliquam scelerisque faucibus leo vestibulum. Lorem sapien tristique quisque condimentum aliquam. Morbi in eu quisque a ipsum pulvinar gravida fermentum dapibus. Adipiscing ut egestas aliquam tristique porta turpis risus nunc. Platea porta elit scelerisque sit semper. Pharetra sed gravida rutrum porttitor enim aliquam felis. Imperdiet elit congue cursus sit gravida eleifend senectus gravida.",
    yearsExperience: "8+ years",
    rating: "4.7",
    reviewsCount: "38+",
    languages: ["Lithuanian", "English"],
    sessionTypes: ["In person"],
    photo: "/images/specialist-1.jpg",
    priceFrom: 50,
    sessionDuration: 45,
    sessions: [
      {
        id: "s1",
        name: "Free Consultation",
        description: "A brief introductory session to understand your needs and explore how we can work together effectively.",
        price: "Free",
        duration: "10 min",
      },
      {
        id: "s2",
        name: "Physiotherapy Session",
        description: "Hands-on physiotherapy for injury rehabilitation, chronic pain, and physical performance. Personalised assessment and treatment plan included.",
        price: "€50 / €90",
        duration: "45 min / 90 min",
      },
      {
        id: "s3",
        name: "Psychological Support Session",
        description: "Therapeutic support for emotional challenges related to physical health, chronic illness, recovery, and body image.",
        price: "€50 / €90",
        duration: "45 min / 90 min",
      },
    ],
    qualifications: [
      {
        id: "q1",
        type: "education",
        title: "Bachelor's Degree in Physiotherapy",
        institution: "Lithuanian University of Health Sciences",
        year: "2013 — 2017",
        description: "Core physiotherapy training covering musculoskeletal, neurological, and cardiorespiratory rehabilitation.",
      },
      {
        id: "q2",
        type: "education",
        title: "Master's Degree in Health Psychology",
        institution: "Vilnius University",
        year: "2017 — 2019",
        description: "Postgraduate study focusing on the psychological dimensions of physical health, chronic illness, and rehabilitation outcomes.",
      },
      {
        id: "q3",
        type: "experience",
        title: "Physiotherapist & Health Psychologist",
        institution: "Vilnius Rehabilitation Centre",
        year: "2019 — present",
        description: "Providing integrated physiotherapy and psychological support to patients recovering from surgery, injury, and chronic conditions.",
      },
      {
        id: "q4",
        type: "approach",
        title: "Biopsychosocial Rehabilitation",
        institution: "Primary approach",
        year: "",
        description: "Takes an integrated view of physical and psychological recovery, addressing biomechanical, emotional, and social factors that influence healing and long-term wellbeing.",
      },
    ],
    faq: [
      {
        id: "f1",
        question: "Do I need a doctor's referral for physiotherapy?",
        answer: "No referral is needed to book a session. However, if you have recent imaging (MRI, X-ray) or medical reports, please bring them to your first appointment.",
      },
      {
        id: "f2",
        question: "Can you help with both physical and mental health?",
        answer: "Yes — this integrated approach is my speciality. Physical pain often has psychological dimensions and vice versa. I work with both aspects to support complete recovery.",
      },
      {
        id: "f3",
        question: "What should I wear to an in-person physiotherapy session?",
        answer: "Comfortable, loose-fitting clothing is ideal. For lower body assessments, shorts are helpful. I have changing facilities available at the clinic.",
      },
      {
        id: "f4",
        question: "How many physiotherapy sessions will I need?",
        answer: "This depends on your condition and goals. Acute injuries typically resolve in 4–8 sessions. Chronic conditions may require ongoing management. We will set a clear plan after the initial assessment.",
      },
    ],
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
