// Special events get their own spotlight (home and Meetings pages) until `moveAt`,
// then they move to "Past events" on the Meetings page. This happens in the browser
// at that moment, so no redeploy is needed. Write `recap` after the event.

export interface SpecialEvent {
  slug: string;
  kicker: string;
  title: string;
  date: string; // YYYY-MM-DD
  when: string;
  room: string;
  summary: string;
  pastSummary: string;
  recap?: string;
  image: string;
  imageSmall: string;
  imageAlt: string;
  post: { url: string; caption: string[] };
  moveAt: string; // ISO time the spotlight ends and the event becomes past
}

export const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    slug: 'dr-naik-talk',
    kicker: 'Special guest',
    title: 'Talk and Q&A with Dr. Anant Naik',
    date: '2026-11-11',
    when: 'Wednesday, Nov 11, 2:45 to 3:30 PM',
    room: 'Learning Commons (not our usual room)',
    summary:
      'Dr. Naik is a neurosurgeon at the University of Minnesota and an Eastview alum. He will talk about what the job is really like and how to become one, then answer your questions. Open to everyone, members or not.',
    pastSummary:
      'Dr. Anant Naik, a neurosurgeon at the University of Minnesota and an Eastview alum, came back to talk about what the job is really like and how to become one, then took questions. Hosted with Eastview HOSA.',
    image: '/events/dr-naik-talk.webp',
    imageSmall: '/events/dr-naik-talk-540.webp',
    imageAlt:
      'NeuroGIDAS post: Dr. Anant Naik, neurosurgeon and Eastview alum. Talk and Q&A, Wednesday Nov 11, 2:45 to 3:30 PM, Learning Commons. Open to everyone.',
    post: {
      url: 'https://www.instagram.com/p/Dfk3DywBo43/',
      caption: [
        'A neurosurgeon is coming back to Eastview to talk to us.',
        'Dr. Anant Naik went to Eastview. After high school he studied biomedical engineering at the University of Minnesota, where he led Engineers Without Borders projects that brought clean water and food to communities in Ethiopia and Guatemala, and he did neuroscience research with Mayo Clinic. He got his MD from the Carle Illinois College of Medicine. In med school he wrote a children’s book about COVID-19 called Heroes of a Pandemic and gave all the money it made to Doctors Without Borders. Now he is training as a neurosurgeon at the University of Minnesota, and his research has looked at recovery after spinal cord injury and the tools surgeons use in brain surgery.',
        'This is a talk and a live Q&A. He’ll share his experiences as a neurosurgeon, what the job is really like, and what it takes to become one. After that the floor is open, so come with a question about medicine, the brain, or what you can do in high school to get started.',
        'Open to everyone, members or not, so bring a friend.',
        'This talk is also hosted by Eastview HOSA, so check out @eastviewhosa for their events too.',
      ],
    },
    // Midnight Central at the end of Nov 11 (Central is UTC-6 in November).
    moveAt: '2026-11-12T00:00:00-06:00',
  },
];

export const isPast = (e: SpecialEvent, now: Date = new Date()) => now >= new Date(e.moveAt);
