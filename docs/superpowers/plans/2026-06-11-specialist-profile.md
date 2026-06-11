# Specialist Profile Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/specialists/[slug]` profile page that exactly matches Figma node `44-6153`, wired to `/find-specialists` cards, with a sticky booking card, interactive tabs, FAQ accordion, and responsive layout.

**Architecture:** Server Component `page.tsx` reads the slug and looks up the specialist; client sub-components handle all interactivity (tabs, accordion, booking card). All specialist data lives in `app/data/specialists.ts` as a single source of truth ready for future API replacement.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-06-11-specialist-profile-design.md`  
**Figma node:** `44-6153` in file `HKVT4QYMJGDlpLpKLOCKJB`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `app/data/specialists.ts` | Add slug, profile fields, new interfaces, mock data |
| Modify | `app/components/Header.tsx` | Add `variant` prop for dark (solid teal) background |
| Modify | `app/components/find-specialists/SpecialistCard.tsx` | Wire "View Profile" button → `<Link>` |
| Create | `app/specialists/[slug]/page.tsx` | Server Component: lookup + layout + notFound |
| Create | `app/components/specialists/ProfileHero.tsx` | Photo, name, stats row, specialization tags |
| Create | `app/components/specialists/ProfileContent.tsx` | `"use client"` — Overview/Reviews tabs, About Me, Sessions, Qualification, FAQ |
| Create | `app/components/specialists/ProfileBookingCard.tsx` | `"use client"` — date picker, time slots, format toggle, CTA |

---

## Task 1: Extend `specialists.ts` with profile data model

**Files:**
- Modify: `app/data/specialists.ts`

- [ ] **Step 1.1: Replace the file contents with the extended model and mock data**

```typescript
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
```

- [ ] **Step 1.2: Verify build compiles**

```bash
cd "/Users/liudas/Desktop/Rezolvus BENDRAS/rezolvus" && npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors. If errors, fix them before continuing.

- [ ] **Step 1.3: Commit**

```bash
git add app/data/specialists.ts
git commit -m "feat: extend specialists data model with profile fields and mock data"
```

---

## Task 2: Update Header with dark variant

**Files:**
- Modify: `app/components/Header.tsx`

- [ ] **Step 2.1: Add `variant` prop to Header**

Add `variant?: "light" | "dark"` to the component props. The only change is the pill background:
- `"light"` (default): `bg-white/5 backdrop-blur-md` — existing behavior
- `"dark"`: `bg-[#013d47]` — solid dark teal, used on specialist profile page

Replace:
```tsx
export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className="bg-white/5 backdrop-blur-md rounded-full px-5 py-3 flex items-center justify-between">
```

With:
```tsx
interface HeaderProps {
  variant?: "light" | "dark";
}

export default function Header({ variant = "light" }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const pillBg = variant === "dark" ? "bg-[#013d47]" : "bg-white/5 backdrop-blur-md";

  return (
    <header className="absolute top-4 left-4 right-4 z-20">
      <div className={`${pillBg} rounded-full px-5 py-3 flex items-center justify-between`}>
```

Also update the mobile menu background from `bg-white/10 backdrop-blur-md` to conditionally use `bg-[#013d47]/90` on dark variant:

Find:
```tsx
<div className="lg:hidden mt-2 bg-white/10 backdrop-blur-md rounded-[24px] px-6 py-6 flex flex-col gap-5">
```

Replace:
```tsx
<div className={`lg:hidden mt-2 ${variant === "dark" ? "bg-[#013d47]" : "bg-white/10 backdrop-blur-md"} rounded-[24px] px-6 py-6 flex flex-col gap-5`}>
```

- [ ] **Step 2.2: Verify build and existing pages unaffected**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 2.3: Commit**

```bash
git add app/components/Header.tsx
git commit -m "feat: add dark variant to Header for profile page"
```

---

## Task 3: Wire "View Profile" button in SpecialistCard

**Files:**
- Modify: `app/components/find-specialists/SpecialistCard.tsx`

- [ ] **Step 3.1: Add Link import and wire both "View Profile" buttons**

Add import at top of file (after existing imports):
```tsx
import Link from "next/link";
```

The card has two "View Profile" buttons — one for mobile (`xl:hidden`) and one for desktop. Change both from `<button>` to `<Link>`:

**Mobile button** (inside `xl:hidden` div) — replace:
```tsx
<button className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-sm font-medium leading-6 hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
  View Profile
</button>
```

With:
```tsx
<Link
  href={`/specialists/${specialist.slug}`}
  className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-sm font-medium leading-6 hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 flex items-center justify-center"
>
  View Profile
</Link>
```

**Desktop button** (inside `hidden xl:flex` div) — replace:
```tsx
<button className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-sm font-medium leading-6 hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 cursor-pointer">
  View Profile
</button>
```

With:
```tsx
<Link
  href={`/specialists/${specialist.slug}`}
  className="flex-1 h-10 border-[1.5px] border-[#FB652B] rounded-full text-[#FB652B] text-sm font-medium leading-6 hover:bg-[#FB652B]/10 active:bg-[#FB652B]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FB652B]/60 flex items-center justify-center"
>
  View Profile
</Link>
```

- [ ] **Step 3.2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 3.3: Commit**

```bash
git add app/components/find-specialists/SpecialistCard.tsx
git commit -m "feat: wire View Profile buttons to specialist slug routes"
```

---

## Task 4: Create ProfileHero component

**Files:**
- Create: `app/components/specialists/ProfileHero.tsx`

This component renders the top section: breadcrumbs, specialist photo, name, stats row, and specialization tags. It is a Server Component (no `"use client"`).

- [ ] **Step 4.1: Create the file**

```tsx
// app/components/specialists/ProfileHero.tsx

import Image from "next/image";
import Link from "next/link";
import type { Specialist } from "@/app/data/specialists";

function CaretRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="#858482" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5L12.245 7.045L17.3 7.8L13.65 11.355L14.49 16.39L10 14.025L5.51 16.39L6.35 11.355L2.7 7.8L7.755 7.045L10 2.5Z" stroke="#2B2B2A" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" stroke="#2B2B2A" strokeWidth="1.5" />
      <path d="M10 2.5c0 0-3.125 2.5-3.125 7.5s3.125 7.5 3.125 7.5M10 2.5c0 0 3.125 2.5 3.125 7.5S10 17.5 10 17.5M2.5 10h15" stroke="#2B2B2A" strokeWidth="1.5" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="6" r="3.5" stroke="#2B2B2A" strokeWidth="1.5" />
      <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#2B2B2A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

interface ProfileHeroProps {
  specialist: Specialist;
}

export default function ProfileHero({ specialist }: ProfileHeroProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2">
        <Link
          href="/"
          className="text-[#858482] text-[18px] font-medium leading-7 hover:text-[#013d47] transition-colors"
        >
          Home
        </Link>
        <CaretRightIcon />
        <Link
          href="/find-specialists"
          className="text-[#858482] text-[18px] font-medium leading-7 hover:text-[#013d47] transition-colors"
        >
          Search
        </Link>
        <CaretRightIcon />
        <span className="text-[#013d47] text-[18px] font-medium leading-7">
          {specialist.name}
        </span>
      </nav>

      {/* Hero: photo + info */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Photo */}
        <div className="w-full lg:w-[416px] lg:h-[406px] shrink-0 relative rounded-[24px] overflow-hidden aspect-[4/3] lg:aspect-auto">
          <Image
            src={specialist.photo}
            alt={specialist.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5 flex-1 min-w-0">
          {/* Name + specializations */}
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[#0d0d0d] text-[32px] font-medium leading-10 tracking-[-0.96px] capitalize">
              {specialist.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3">
              {specialist.specializations.map((spec, i) => (
                <span key={`${spec}-${i}`} className="flex items-center gap-3">
                  <span className="text-[rgba(13,13,13,0.65)] text-[14px] leading-5">
                    {spec}
                  </span>
                  {i < specialist.specializations.length - 1 && (
                    <span className="w-[3px] h-[3px] rounded-full bg-[rgba(13,13,13,0.65)] shrink-0" />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <CertificateIcon />
              <span className="text-[#2b2b2a] text-[14px] leading-5">{specialist.yearsExperience} of experience</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icon-star.svg" alt="" className="w-5 h-5 shrink-0" />
              <span className="text-[#2b2b2a] text-[14px] leading-5">{specialist.rating} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/icon-users-three.svg" alt="" className="w-5 h-5 shrink-0" />
              <span className="text-[#2b2b2a] text-[14px] leading-5">{specialist.reviewsCount} reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="text-[#2b2b2a] text-[14px] leading-5">{specialist.languages.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <PersonIcon />
              <span className="text-[#2b2b2a] text-[14px] leading-5">{specialist.ageGroups}</span>
            </div>
          </div>

          {/* Specializes in */}
          <div className="flex flex-col gap-2">
            <p className="text-[#1c1c1c] text-[14px] font-medium leading-5">Specializes in:</p>
            <div className="flex flex-wrap gap-2">
              {specialist.specializationTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white rounded-full px-3 py-2 text-[14px] text-[rgba(13,13,13,0.65)] leading-5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4.2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 4.3: Commit**

```bash
git add app/components/specialists/ProfileHero.tsx
git commit -m "feat: add ProfileHero component for specialist profile page"
```

---

## Task 5: Create ProfileBookingCard component

**Files:**
- Create: `app/components/specialists/ProfileBookingCard.tsx`

This is a `"use client"` component. It mirrors the booking column logic from `SpecialistCard.tsx` but adapted for the profile page layout (full card, not embedded in a row).

- [ ] **Step 5.1: Create the file**

```tsx
// app/components/specialists/ProfileBookingCard.tsx
"use client";

import { useState } from "react";
import type { Specialist } from "@/app/data/specialists";

function ChevronLeftIcon({ disabled }: { disabled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={disabled ? "opacity-35" : ""}>
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#0D0D0D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3.5 4.5V9.5C3.5 13.09 6.24 16.45 10 17.5C13.76 16.45 16.5 13.09 16.5 9.5V4.5L10 2Z" fill="#013d47" />
      <path d="M7.5 10L9.5 12L12.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1 13h14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function ArmchairIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M2 7h12v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

interface ProfileBookingCardProps {
  specialist: Specialist;
}

export default function ProfileBookingCard({ specialist }: ProfileBookingCardProps) {
  const { nextAvailable, sessionTypes, sessionDuration, priceFrom, sessions } = specialist;

  const firstAvailableDay = nextAvailable.dates.find((d) => d.available)?.day ?? nextAvailable.dates[0].day;
  const [selectedDay, setSelectedDay] = useState(firstAvailableDay);
  const [selectedTime, setSelectedTime] = useState<string>(nextAvailable.times[1]?.[1] ?? "14:00");
  const [selectedFormat, setSelectedFormat] = useState<"Online" | "In person">(
    sessionTypes.includes("In person") ? "In person" : "Online"
  );
  const [selectedSession, setSelectedSession] = useState(sessions[1] ?? sessions[0]);

  return (
    <div id="booking" className="bg-white rounded-[24px] pt-6 pb-4 px-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[#1c1c1c] text-[24px] font-medium leading-8">Book session</p>
        <p className="text-[#1c1c1c] text-[14px] leading-5">GMT+3 Timezone</p>
      </div>

      {/* Option selector */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-[#1c1c1c] text-[14px] font-medium leading-5">Option</p>
          <div className="relative">
            <select
              className="w-full bg-[rgba(13,13,13,0.05)] h-12 rounded-[8px] px-4 text-[#1c1c1c] text-[14px] leading-5 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#013d47]/30"
              value={selectedSession.id}
              onChange={(e) => {
                const s = sessions.find((s) => s.id === e.target.value);
                if (s) setSelectedSession(s);
              }}
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <img
              src="/images/icon-caret-down.svg"
              alt=""
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 bg-[rgba(13,13,13,0.05)] rounded-[8px] flex items-center justify-center gap-1 py-2">
            <span className="text-[#676665] text-[12px] leading-5">Time:</span>
            <span className="text-[#013d47] text-[14px] font-medium leading-5">{selectedSession.duration.split("/")[0].trim()}</span>
          </div>
          <div className="flex-1 bg-[rgba(13,13,13,0.05)] rounded-[8px] flex items-center justify-center gap-1 py-2">
            <span className="text-[#676665] text-[12px] leading-5">Price:</span>
            <span className="text-[#013d47] text-[14px] font-medium leading-5">{selectedSession.price.split("/")[0].trim()}</span>
          </div>
        </div>
      </div>

      {/* Format */}
      <div className="flex flex-col gap-1">
        <p className="text-[#1c1c1c] text-[14px] font-medium leading-5">Format</p>
        <div className="flex gap-2">
          {(["Online", "In person"] as const).map((format) => {
            const available = sessionTypes.includes(format);
            const isSelected = selectedFormat === format;
            return (
              <button
                key={format}
                onClick={() => available && setSelectedFormat(format)}
                disabled={!available}
                className={[
                  "flex-1 flex items-center justify-center gap-2 py-2 rounded-[8px] text-[14px] leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/30",
                  isSelected
                    ? "bg-[rgba(13,13,13,0.05)] border border-[#fb652b] text-[#1c1c1c]"
                    : available
                    ? "bg-[rgba(13,13,13,0.05)] text-[#1c1c1c] hover:bg-[rgba(13,13,13,0.08)] cursor-pointer"
                    : "bg-[rgba(13,13,13,0.03)] text-[rgba(13,13,13,0.3)] cursor-not-allowed",
                ].join(" ")}
              >
                {format === "Online" ? <LaptopIcon /> : <ArmchairIcon />}
                {format}
              </button>
            );
          })}
        </div>
      </div>

      {/* Date picker */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[14px] leading-5">
          <span className="font-medium text-[#1c1c1c]">Choose time</span>
          <span className="text-[#676665] font-normal">{nextAvailable.weekLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="w-8 h-[52px] flex items-center justify-center rounded-[8px] cursor-not-allowed focus-visible:outline-none shrink-0"
          >
            <ChevronLeftIcon disabled />
          </button>
          {nextAvailable.dates.slice(0, 4).map((d) => {
            const isSelected = d.day === selectedDay;
            const isUnavailable = !d.available;
            return (
              <button
                key={d.day}
                onClick={() => d.available && setSelectedDay(d.day)}
                disabled={isUnavailable}
                className={[
                  "flex-1 h-[52px] flex flex-col items-center justify-center rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2",
                  isSelected
                    ? "bg-[#fb652b] focus-visible:ring-[#fb652b]/60"
                    : isUnavailable
                    ? "bg-[#f6f6f5] opacity-50 cursor-not-allowed"
                    : "bg-[rgba(13,13,13,0.05)] hover:bg-[rgba(13,13,13,0.08)] cursor-pointer focus-visible:ring-[#013d47]/30",
                ].join(" ")}
              >
                <span className={["text-[16px] font-medium leading-6", isSelected ? "text-white" : "text-[#1c1c1c]"].join(" ")}>
                  {d.day}
                </span>
                <span className={["text-[14px] leading-5", isSelected ? "text-white/80" : "text-[rgba(13,13,13,0.5)]"].join(" ")}>
                  {d.dayName}
                </span>
              </button>
            );
          })}
          <button className="w-8 h-[52px] flex items-center justify-center rounded-[8px] hover:bg-[rgba(13,13,13,0.05)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#013d47]/30 shrink-0">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Time slots */}
      <div className="flex flex-col gap-2 pt-3">
        {nextAvailable.times.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {row.map((time) => {
              if (!time) return null;
              const isSelected = time !== "View All" && time === selectedTime;
              const isViewAll = time === "View All";
              return (
                <button
                  key={time}
                  onClick={() => !isViewAll && setSelectedTime(time)}
                  className={[
                    "flex-1 py-2 flex items-center justify-center rounded-[8px] text-[14px] leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer",
                    isSelected
                      ? "bg-[rgba(13,13,13,0.05)] border border-[#fb652b] text-[#1c1c1c] focus-visible:ring-[#fb652b]/60"
                      : isViewAll
                      ? "bg-transparent text-[#fb652b] font-medium hover:underline focus-visible:ring-[#fb652b]/40"
                      : "bg-[rgba(13,13,13,0.05)] text-[#1c1c1c] hover:bg-[rgba(13,13,13,0.08)] focus-visible:ring-[#013d47]/30",
                  ].join(" ")}
                >
                  {time}
                </button>
              );
            })}
          </div>
        ))}
        <div className="flex justify-center">
          <button className="text-[#fb652b] text-[14px] font-medium leading-5 hover:underline focus-visible:outline-none">
            View more availabilities
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <button className="w-full bg-[#fb652b] rounded-full py-3 text-white text-[16px] font-medium leading-6 hover:bg-[#e85520] active:bg-[#d44a18] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fb652b]/60 cursor-pointer">
          Login to Book
        </button>
        <div className="flex items-center justify-center gap-2">
          <ShieldCheckIcon />
          <span className="text-[#013d47] text-[14px] leading-5">Free cancellation within 24h</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5.2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 5.3: Commit**

```bash
git add app/components/specialists/ProfileBookingCard.tsx
git commit -m "feat: add ProfileBookingCard component"
```

---

## Task 6: Create ProfileContent component

**Files:**
- Create: `app/components/specialists/ProfileContent.tsx`

This `"use client"` component contains all interactive tab content: About Me, Session Options, Qualification, and FAQ.

- [ ] **Step 6.1: Create the file**

```tsx
// app/components/specialists/ProfileContent.tsx
"use client";

import { useState } from "react";
import type { Specialist } from "@/app/data/specialists";

function PlusIcon({ rotated }: { rotated?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`transition-transform duration-200 ${rotated ? "rotate-[135deg]" : ""}`}
    >
      <path d="M12 5V19M5 12H19" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M8 6L22 14L8 22V6Z" fill="white" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L1 6L8 10L15 6L8 2Z" stroke="#013d47" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M4 8v4c0 1.1 1.79 2 4 2s4-.9 4-2V8" stroke="#013d47" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M15 6v4" stroke="#013d47" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

interface ProfileContentProps {
  specialist: Specialist;
}

type MainTab = "Overview" | "Reviews";
type SessionTab = "Options" | "Type";
type QualificationTab = "Education" | "Experience" | "Approach";

export default function ProfileContent({ specialist }: ProfileContentProps) {
  const [mainTab, setMainTab] = useState<MainTab>("Overview");
  const [sessionTab, setSessionTab] = useState<SessionTab>("Options");
  const [qualTab, setQualTab] = useState<QualificationTab>("Education");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(new Set([specialist.faq[0]?.id]));
  const [showAllSessions, setShowAllSessions] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredQualifications = specialist.qualifications.filter((q) => {
    if (qualTab === "Education") return q.type === "education";
    if (qualTab === "Experience") return q.type === "experience";
    return q.type === "approach";
  });

  const visibleSessions = showAllSessions ? specialist.sessions : specialist.sessions.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      {/* Main tabs: Overview / Reviews */}
      <div className="flex items-end border-b border-[rgba(13,13,13,0.15)]">
        {(["Overview", "Reviews"] as MainTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={[
              "flex items-center gap-2 px-6 py-2 text-[16px] leading-6 transition-colors cursor-pointer focus-visible:outline-none",
              mainTab === tab
                ? "border-b-[3px] border-[#fb652b] text-[#1c1c1c] font-medium -mb-px"
                : "text-[#676665] font-normal hover:text-[#1c1c1c]",
            ].join(" ")}
          >
            {tab}
            {tab === "Reviews" && (
              <span className="bg-[#013d47] text-white text-[12px] leading-5 rounded-full px-1 min-w-[20px] flex items-center justify-center">
                {specialist.reviewsCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {mainTab === "Overview" && (
        <div className="flex flex-col gap-16">
          {/* About Me */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#013d47] text-[24px] font-medium leading-8">About Me</h2>
            <div className="flex flex-col gap-1">
              <p className="text-[#494947] text-[16px] leading-6">
                {aboutExpanded ? specialist.aboutFull : specialist.aboutFull.slice(0, 300) + (specialist.aboutFull.length > 300 ? "..." : "")}
              </p>
              {specialist.aboutFull.length > 300 && (
                <button
                  onClick={() => setAboutExpanded((v) => !v)}
                  className="text-[#fb652b] text-[16px] font-medium leading-6 self-start hover:underline focus-visible:outline-none cursor-pointer"
                >
                  {aboutExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
            {/* Video/photo placeholder */}
            <div className="relative h-[320px] lg:h-[459px] rounded-[24px] overflow-hidden bg-[#e4dece]">
              <img
                src={specialist.photo}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <button
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center group focus-visible:outline-none"
              >
                <span className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <PlayIcon />
                </span>
              </button>
            </div>
          </section>

          {/* Session Options & Type */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-[#013d47] text-[24px] font-medium leading-8 whitespace-nowrap">
                Session Options &amp; Type
              </h2>
              {/* Toggle tabs */}
              <div className="bg-[rgba(13,13,13,0.05)] border border-[#dadad9] flex gap-1 p-1 rounded-[12px]">
                {(["Options", "Type"] as SessionTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSessionTab(t)}
                    className={[
                      "px-6 py-2 rounded-[8px] text-[14px] leading-5 transition-colors cursor-pointer focus-visible:outline-none",
                      sessionTab === t
                        ? "bg-white text-[#fb652b] font-medium"
                        : "text-[#676665] hover:text-[#1c1c1c]",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {visibleSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-[24px] p-6 flex gap-8 items-start"
                >
                  <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <p className="text-[#1c1c1c] text-[20px] font-medium leading-6">{session.name}</p>
                    <p className="text-[#494947] text-[14px] leading-5">{session.description}</p>
                  </div>
                  <div className="bg-[#e4dece] rounded-[12px] px-4 py-3 flex flex-col items-center shrink-0 min-w-[80px] text-right">
                    <span className="text-[#013d47] text-[14px] font-medium leading-5">{session.price}</span>
                    <span className="text-[rgba(1,61,71,0.75)] text-[14px] leading-5">{session.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {specialist.sessions.length > 3 && (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllSessions((v) => !v)}
                  className="text-[#fb652b] text-[16px] font-medium leading-6 hover:underline focus-visible:outline-none cursor-pointer"
                >
                  {showAllSessions ? "Show fewer sessions" : "View more sessions"}
                </button>
              </div>
            )}
          </section>

          {/* Qualification */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-[#013d47] text-[24px] font-medium leading-8 whitespace-nowrap">
                Qualification
              </h2>
              {/* Toggle tabs */}
              <div className="bg-[rgba(13,13,13,0.05)] border border-[#dadad9] flex gap-1 p-1 rounded-[12px]">
                {(["Education", "Experience", "Approach"] as QualificationTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setQualTab(t)}
                    className={[
                      "px-6 py-2 rounded-[8px] text-[14px] leading-5 transition-colors cursor-pointer focus-visible:outline-none",
                      qualTab === t
                        ? "bg-white text-[#fb652b] font-medium"
                        : "text-[#676665] hover:text-[#1c1c1c]",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredQualifications.length > 0 ? (
                filteredQualifications.map((q) => (
                  <div key={q.id} className="bg-white rounded-[24px] p-6 flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <p className="text-[#1c1c1c] text-[20px] font-medium leading-6">{q.title}</p>
                        <div className="flex items-center gap-2">
                          <GraduationCapIcon />
                          <span className="text-[#013d47] text-[14px] font-medium leading-5">{q.institution}</span>
                        </div>
                      </div>
                      {q.year && (
                        <span className="bg-[#e4dece] rounded-full px-3 py-1 text-[#013d47] text-[14px] font-medium leading-5 whitespace-nowrap shrink-0">
                          {q.year}
                        </span>
                      )}
                    </div>
                    <p className="text-[#676665] text-[14px] leading-5">{q.description}</p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-[24px] p-6">
                  <p className="text-[#676665] text-[14px] leading-5">No {qualTab.toLowerCase()} information available.</p>
                </div>
              )}
            </div>
          </section>

          {/* FAQ */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[#013d47] text-[24px] font-medium leading-8">FAQ</h2>
            <div className="flex flex-col gap-3">
              {specialist.faq.map((item) => {
                const isOpen = openFaqIds.has(item.id);
                return (
                  <div key={item.id} className="bg-white rounded-[16px] overflow-hidden">
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-start gap-3 p-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#013d47]/30"
                    >
                      <span className="flex-1 text-[#1c1c1c] text-[20px] font-medium leading-6">{item.question}</span>
                      <span className="shrink-0 mt-0.5">
                        <PlusIcon rotated={isOpen} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <p className="text-[#676665] text-[14px] leading-5">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ── REVIEWS TAB ── */}
      {mainTab === "Reviews" && (
        <div className="bg-white rounded-[24px] p-6">
          <p className="text-[#676665] text-[16px] leading-6">No reviews yet.</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6.2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

- [ ] **Step 6.3: Commit**

```bash
git add app/components/specialists/ProfileContent.tsx
git commit -m "feat: add ProfileContent component with tabs, accordion and sessions"
```

---

## Task 7: Create `app/specialists/[slug]/page.tsx`

**Files:**
- Create: `app/specialists/[slug]/page.tsx`

This is the main Server Component. It looks up the specialist by slug and renders the full page layout.

- [ ] **Step 7.1: Create the directory and file**

```tsx
// app/specialists/[slug]/page.tsx

import { notFound } from "next/navigation";
import { specialists } from "@/app/data/specialists";
import Header from "@/app/components/Header";
import Footer from "@/app/components/sections/Footer";
import ProfileHero from "@/app/components/specialists/ProfileHero";
import ProfileContent from "@/app/components/specialists/ProfileContent";
import ProfileBookingCard from "@/app/components/specialists/ProfileBookingCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return specialists.map((s) => ({ slug: s.slug }));
}

export default async function SpecialistProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const specialist = specialists.find((s) => s.slug === slug);

  if (!specialist) {
    notFound();
  }

  return (
    <main className="overflow-x-hidden">
      <div className="relative">
        <Header variant="dark" />
      </div>

      <div className="bg-[#edecec] min-h-screen">
        {/* Spacer for fixed header */}
        <div className="h-20" />

        <div className="px-5 sm:px-8 lg:px-20 pt-8 pb-40">
          {/* Hero (breadcrumbs + photo + name + stats) */}
          <ProfileHero specialist={specialist} />

          {/* Two-column layout */}
          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
            {/* Left column: tabs + content */}
            <div className="flex-1 min-w-0">
              <ProfileContent specialist={specialist} />
            </div>

            {/* Right column: sticky booking card */}
            <div className="w-full lg:w-[416px] shrink-0 lg:sticky lg:top-8">
              <ProfileBookingCard specialist={specialist} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 7.2: Run dev server and verify the page loads**

```bash
npm run dev
```

Open: `http://localhost:3000/specialists/stephanie-morar`

Check:
- Page loads without errors
- Header is dark teal
- Breadcrumbs show correctly
- Photo, name, stats, tags render
- Two-column layout on desktop
- Booking card on right
- Tabs work (Overview/Reviews, Sessions Options/Type, Qualification tabs)
- FAQ accordion opens/closes
- "Login to Book" button has hover state

- [ ] **Step 7.3: Check that other pages are unaffected**

Open:
- `http://localhost:3000` — homepage, check it loads
- `http://localhost:3000/find-specialists` — check "View Profile" buttons now navigate correctly

- [ ] **Step 7.4: Check 404 for invalid slug**

Open: `http://localhost:3000/specialists/nonexistent-slug`

Expected: Next.js 404 page.

- [ ] **Step 7.5: Verify build**

```bash
npm run build 2>&1 | tail -30
```

Expected: clean build, no TypeScript errors, all 5 specialist routes listed under `/specialists/[slug]`.

- [ ] **Step 7.6: Commit**

```bash
git add app/specialists/ app/components/specialists/
git commit -m "feat: add specialist profile page at /specialists/[slug]"
```

---

## Task 8: Responsive polish

**Files:**
- Modify: `app/components/specialists/ProfileHero.tsx`
- Modify: `app/components/specialists/ProfileContent.tsx`
- Modify: `app/components/specialists/ProfileBookingCard.tsx`
- Modify: `app/specialists/[slug]/page.tsx`

Test at each breakpoint using browser DevTools: 1440px, 1280px, 1024px, 768px, 430px, 375px.

- [ ] **Step 8.1: Fix mobile hero photo**

In `ProfileHero.tsx`, the photo div currently uses `aspect-[4/3] lg:aspect-auto`. Verify it looks correct on mobile. If the photo is clipped or distorted, adjust:

```tsx
<div className="w-full lg:w-[416px] shrink-0 relative rounded-[24px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
  {/* on lg+, override to fixed height */}
</div>
```

Use Tailwind instead:
```tsx
<div className="w-full aspect-[4/3] lg:w-[416px] lg:h-[406px] lg:aspect-auto shrink-0 relative rounded-[24px] overflow-hidden">
```

- [ ] **Step 8.2: Fix FAQ accordion heading wrap on small screens**

In `ProfileContent.tsx`, the FAQ question uses `text-[20px]`. On 375px this may be tight. Add `text-[18px] sm:text-[20px]`:

```tsx
<span className="flex-1 text-[#1c1c1c] text-[18px] sm:text-[20px] font-medium leading-6">{item.question}</span>
```

- [ ] **Step 8.3: Fix Qualification tabs overflow on mobile**

On small screens the three tabs (Education/Experience/Approach) may overflow. Make the tab group scrollable:

```tsx
<div className="bg-[rgba(13,13,13,0.05)] border border-[#dadad9] flex gap-1 p-1 rounded-[12px] overflow-x-auto no-scrollbar">
```

Do the same for Session tabs.

- [ ] **Step 8.4: Verify booking card on mobile**

On <1024px, the booking card sits below the ProfileContent. On ≥1024px it is sticky. Test:
- 768px: card is below, not sticky — correct
- 1280px: card is sticky on right — correct

- [ ] **Step 8.5: Verify full-page build**

```bash
npm run build 2>&1 | tail -30
```

- [ ] **Step 8.6: Commit**

```bash
git add app/components/specialists/ app/specialists/
git commit -m "fix: responsive polish for specialist profile page"
```

---

## Task 9: Final quality check

- [ ] **Step 9.1: Run full build**

```bash
npm run build 2>&1
```

Expected: exit 0, no TypeScript errors, no ESLint errors.

- [ ] **Step 9.2: Check all specialist routes work**

In dev server, verify all 5 slugs:
- `/specialists/dr-emma-williams`
- `/specialists/maureen-schimmel-torp`
- `/specialists/stephanie-morar`
- `/specialists/lamar-mohr`
- `/specialists/dr-emma-williams-2`

- [ ] **Step 9.3: Verify no console errors in browser**

Open DevTools Console on the profile page. Expected: no errors, no missing image 404s.

- [ ] **Step 9.4: Verify homepage and find-specialists are unaffected**

- `/` homepage loads and displays correctly
- `/find-specialists` loads, all 5 cards show, "View Profile" links navigate to correct profile pages

- [ ] **Step 9.5: Final commit**

```bash
git add -A
git commit -m "feat: complete specialist profile page implementation"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| `/specialists/[slug]` route | Task 7 |
| `notFound()` for invalid slug | Task 7 |
| Header dark variant | Task 2 |
| Breadcrumbs | Task 4 (ProfileHero) |
| Photo + name + stats + specialization tags | Task 4 (ProfileHero) |
| Overview / Reviews tabs | Task 6 (ProfileContent) |
| About Me + Read more | Task 6 |
| Video/photo card with play overlay | Task 6 |
| Session Options with toggle tabs | Task 6 |
| Qualification with Education/Experience/Approach tabs | Task 6 |
| FAQ accordion | Task 6 |
| Booking card sticky | Task 7 |
| Date picker + time slots | Task 5 (ProfileBookingCard) |
| Format toggle (Online/In person) | Task 5 |
| "Login to Book" CTA | Task 5 |
| "Free cancellation" note | Task 5 |
| "View Profile" wired to slug | Task 3 |
| Full mock data for all 5 specialists | Task 1 |
| Responsive (mobile booking card below content) | Task 7 + Task 8 |
| Empty state for Reviews tab | Task 6 |
| No photo fallback | — handled: specialist data always has photo |

**Placeholder scan:** ✅ No TBD/TODO. All code blocks are complete.

**Type consistency:**
- `Specialist` interface defined in Task 1, imported in Tasks 4, 5, 6, 7 ✅
- `specialist.slug` used in Task 3 after being added in Task 1 ✅
- `specialist.sessions` typed as `SessionOption[]`, used correctly in Tasks 5 and 6 ✅
- `specialist.qualifications` typed as `Qualification[]`, filtered by `.type` in Task 6 ✅
- `specialist.faq` typed as `FaqItem[]`, mapped in Task 6 ✅
