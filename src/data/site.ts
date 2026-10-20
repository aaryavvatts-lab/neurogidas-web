export const SITE = {
  name: 'NeuroGIDAS',
  school: 'Eastview High School',
  url: 'https://neurogidas-web.vercel.app',
  description:
    "Eastview's brain science and genetics club. One week we learn how the brain works, the next we do genetics research. Wednesdays after school in B327. No experience needed.",
  room: 'B327',
  time: '2:45 to 3:30 PM',
  day: 'Wednesdays',
  advisor: 'Mr. Meyer',
};

export const LINKS = {
  groupme: 'https://groupme.com/join_group/116138825/N4amjZQj',
  instagram: 'https://www.instagram.com/neurogidas.evhs/',
  instagramHandle: '@neurogidas.evhs',
  email: 'neurogidas@gmail.com',
  textbook: 'https://aaryavvatts-lab.github.io/neuroscience-textbook/',
  mircore: 'https://mircore.org/',
  gidas: 'https://mircore.org/gidas/',
  rishikPaper: 'https://aclanthology.org/2026.bionlp-1.13/',
  rishikPaperPdf: 'https://aclanthology.org/2026.bionlp-1.13.pdf',
};

export const NAV = [
  { href: '/about/', label: 'About' },
  { href: '/meetings/', label: 'Meetings' },
  { href: '/research/', label: 'Research' },
  { href: '/resources/', label: 'Resources' },
  { href: '/team/', label: 'Team' },
];

export const TEAM = [
  {
    name: 'Rishik Kondadadi',
    initials: 'RK',
    role: 'Co-Founder and Co-President',
    school: 'Eastview High School, 11th grade',
    photo: '/team/rishik-kondadadi.webp',
    photoSmall: '/team/rishik-kondadadi-480.webp',
    link: { href: 'https://aclanthology.org/2026.bionlp-1.13/', label: 'Read Rishik’s paper' },
    bio: [
      'Rishik is a junior at Eastview and co-founded NeuroGIDAS with Aaryav. He does research on finding new uses for existing drugs, and his paper on drug repurposing, including a test on epilepsy, was published at BioNLP 2026.',
      'He started the club to share his passion for genetics research with other students. He hopes precision medicine, where treatment is matched to a person’s genes, becomes common in the future.',
    ],
  },
  {
    name: 'Aaryav Sharma',
    initials: 'AS',
    role: 'Co-Founder and Co-President',
    school: 'Eastview High School, 10th grade',
    link: { href: 'https://aaryavvatts-lab.github.io/neuroscience-textbook/', label: 'Read Aaryav’s textbook' },
    bio: [
      'Aaryav is a sophomore at Eastview and co-founded NeuroGIDAS with Rishik. What pulls him into neuroscience are questions like whether you can read the words someone is trying to say straight from their brain signals. He has shadowed neurosurgeon Dr. Anant Naik, watched two live brain surgeries, and built his own research projects from public brain recordings.',
      'Along the way he ran into a real gap. Most high schools barely teach neuroscience, and the study material that does exist is mostly flat pages you read once. So he wrote From Neuron to Bedside, a free textbook with 16 chapters and 16 simulations where you can fire a neuron or trace a stroke yourself.',
      'NeuroGIDAS is the other half of that. A book can teach the basics, but he wanted a place at Eastview where students actually do neuroscience together: test their own brains, ask a surgeon real questions, and start research while they are still in high school.',
    ],
  },
];
