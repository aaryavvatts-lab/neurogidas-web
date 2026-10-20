// The whole year lives here. To update the site, edit this list and push.
// date: YYYY-MM-DD (a Wednesday). track: 'neuro' | 'gidas' | 'joint'.
// confirmed: true once the meeting is locked in. Unconfirmed dates show as tentative.
// recap: what actually happened, written after the meeting.

export type Track = 'neuro' | 'gidas' | 'joint';

export interface Meeting {
  date: string;
  track: Track;
  title: string;
  summary: string;
  confirmed: boolean;
  recap?: string;
  openToAll?: boolean;
  room?: string; // only when it is not B327
}

export const MEETINGS: Meeting[] = [
  {
    date: '2026-09-23',
    track: 'joint',
    title: 'Intro meeting',
    summary: 'What the year looks like and how the two tracks switch off each week.',
    confirmed: true,
    recap: 'We went over the year: brain science one week, genetics research the next. Everyone got to see both sides before deciding to stay.',
  },
  {
    date: '2026-09-30',
    track: 'neuro',
    title: 'Build a neuron',
    summary: 'How a neuron sends a signal, then everyone builds their own.',
    confirmed: true,
    recap: 'We learned how a signal moves through a neuron, from the dendrites to the axon. Then everyone built a model neuron out of pipe cleaners and clay.',
  },
  {
    date: '2026-10-07',
    track: 'gidas',
    title: 'What GIDAS is, and the disease vote',
    summary: 'How the research works from start to finish, with past abstracts as examples.',
    confirmed: true,
    recap: 'Our first GIDAS week. We showed how a project goes from a public dataset to a written abstract, read a couple of real ones, and voted on the disease we will research this year.',
  },
  {
    date: '2026-10-14',
    track: 'neuro',
    title: 'Attention and Memory Lab',
    summary: 'Three quick experiments on your own brain, plus optical illusions.',
    confirmed: true,
    recap: 'We ran the Stroop test, a multitasking test, and some memory tests, then put everyone’s results on the board. Reading turned out to be automatic, attention has limits, and grouping things into chunks helps you remember more.',
  },
  { date: '2026-10-21', track: 'gidas', title: 'DNA structure and replication', summary: 'What DNA is made of, how it copies itself, and why that matters for disease.', confirmed: true },
  { date: '2026-10-28', track: 'neuro', title: 'Journal club', summary: 'We read a real neuroscience paper together and break it down into plain English.', confirmed: true },
  { date: '2026-11-04', track: 'gidas', title: 'The central dogma', summary: 'DNA to RNA to protein. Every GIDAS tool builds on this.', confirmed: false },
  {
    date: '2026-11-11',
    track: 'neuro',
    title: 'Talk and Q&A with Dr. Anant Naik',
    summary: 'Dr. Naik is a neurosurgeon and an Eastview alum. He will talk about his work and answer your questions about medicine and the brain.',
    confirmed: true,
    openToAll: true,
    room: 'Learning Commons',
  },
  { date: '2026-11-18', track: 'gidas', title: 'Pick a research question', summary: 'Learn the disease well enough to ask a question you can answer with data.', confirmed: false },
  { date: '2026-12-02', track: 'neuro', title: 'Brain Bee prep starts', summary: 'The topics that come up most, plus timed practice questions.', confirmed: false },
  { date: '2026-12-09', track: 'gidas', title: 'GEO2R and STRING', summary: 'Pick your own dataset, find the genes that change, and see how their proteins connect.', confirmed: false },
  { date: '2026-12-16', track: 'neuro', title: 'Ethics debate', summary: 'Two sides, picked at random, argue a real question in neuroscience.', confirmed: false },
  { date: '2027-01-06', track: 'gidas', title: 'Genes and Health Contest practice', summary: 'Review and a practice round before the January contest.', confirmed: false },
  { date: '2027-01-13', track: 'neuro', title: 'Brain trivia', summary: 'Team trivia on everything from the fall, and a look back at the first half.', confirmed: false },
  { date: '2027-01-20', track: 'gidas', title: 'KEGG and the UCSC Genome Browser', summary: 'Find the pathways your genes share, then look at them on the genome.', confirmed: false },
  { date: '2027-01-27', track: 'neuro', title: 'Research night and Brain Bee study', summary: 'Time to work on projects, with a Brain Bee study group at the same time.', confirmed: false },
  { date: '2027-02-03', track: 'gidas', title: 'GeneCards, OMIM and Gene Ontology', summary: 'Look up what your genes do and which diseases they are linked to.', confirmed: false },
  { date: '2027-02-10', track: 'neuro', title: 'Inside a research lab', summary: 'How a real lab works day to day.', confirmed: false },
  { date: '2027-02-17', track: 'gidas', title: 'Analyze your data', summary: 'Put your results together and figure out what they actually show.', confirmed: false },
  { date: '2027-02-24', track: 'neuro', title: 'Brain cancer night', summary: 'Where both tracks meet. We also kick off the Brain Cancer Innovation Challenge.', confirmed: false },
  { date: '2027-03-03', track: 'gidas', title: 'How to write an abstract', summary: 'What the April conference is like and what a good abstract looks like.', confirmed: false },
  { date: '2027-03-17', track: 'neuro', title: 'Brain Awareness Week', summary: 'Quick, hands-on brain science for the rest of the school.', confirmed: false },
  { date: '2027-03-24', track: 'gidas', title: 'Writing abstracts', summary: 'Write a draft, swap with a partner, and fix it up.', confirmed: false },
  { date: '2027-04-07', track: 'gidas', title: 'Submit abstracts', summary: 'Final edits, then we send them to the miRcore conference.', confirmed: false },
  { date: '2027-04-14', track: 'neuro', title: 'Careers in science and medicine', summary: 'Different paths into medicine, neuroscience, genetics, and research.', confirmed: false },
  { date: '2027-04-21', track: 'gidas', title: 'After the conference', summary: 'What we presented, what we learned, and what we would change.', confirmed: false },
  { date: '2027-04-28', track: 'neuro', title: 'Lab visit', summary: 'A visit to a working research lab.', confirmed: false },
  { date: '2027-05-05', track: 'gidas', title: 'Intro to R', summary: 'A first look at R, for anyone who wants to keep doing research.', confirmed: false },
  { date: '2027-05-12', track: 'neuro', title: 'Brain Bee wrap-up', summary: 'Results, review, and a final look at the year in neuroscience.', confirmed: false },
  { date: '2027-05-19', track: 'gidas', title: 'Next year’s board', summary: 'We announce next year’s officers and start planning the fall.', confirmed: false },
  { date: '2027-05-26', track: 'neuro', title: 'Innovation Challenge presentations', summary: 'Teams present their Brain Cancer Innovation Challenge ideas.', confirmed: false },
  { date: '2027-06-02', track: 'joint', title: 'Last meeting', summary: 'We look back at the year together.', confirmed: false },
];

// Big events. Months only where exact dates are not set yet.
export const EVENTS = [
  { month: '2027-01', when: 'January', name: 'Genes and Health Contest', detail: 'A free online contest about genetics and the research tools.', track: 'gidas' as Track },
  { month: '2027-01', when: 'January to March', name: 'Brain Bee', detail: 'A neuroscience competition. Regional rounds are January to March.', track: 'neuro' as Track },
  { month: '2027-03', when: 'March', name: 'Brain Awareness Week', detail: 'We run quick brain science demos for the rest of Eastview.', track: 'neuro' as Track },
  { month: '2027-04', when: 'April', name: 'miRcore Research Conference', detail: 'Members turn in an abstract and present their own project.', track: 'gidas' as Track },
];

export const TIMEZONE = 'America/Chicago';
// A meeting stays "next" until it ends (3:30 PM Central).
// Central time is UTC-6 from Nov 1, 2026 to Mar 13, 2027, and UTC-5 otherwise.
export function meetingEnd(m: Meeting): Date {
  const standard = m.date >= '2026-11-01' && m.date < '2027-03-14';
  return new Date(`${m.date}T15:30:00${standard ? '-06:00' : '-05:00'}`);
}

export function splitMeetings(now: Date = new Date()) {
  const past = MEETINGS.filter((m) => meetingEnd(m) < now);
  const upcoming = MEETINGS.filter((m) => meetingEnd(m) >= now);
  return { past, upcoming, next: upcoming[0] };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function parts(date: string) {
  const [y, mo, d] = date.split('-').map(Number);
  return { year: y, month: mo - 1, day: d, mon: MONTHS[mo - 1], monthLong: MONTHS_LONG[mo - 1] };
}

export function longDate(date: string) {
  const p = parts(date);
  return `Wednesday, ${p.monthLong} ${p.day}`;
}

export const DEFAULT_ROOM = 'Room B327';
export const roomOf = (m: Meeting) => m.room ?? DEFAULT_ROOM;

export function shortDate(date: string) {
  const p = parts(date);
  return `${p.mon} ${p.day}`;
}

export const TRACK_LABEL: Record<Track, string> = {
  neuro: 'Neuroscience',
  gidas: 'GIDAS research',
  joint: 'Both tracks',
};

// One line per month for the roadmap on the Meetings page.
export const ROADMAP = [
  { month: '2026-09', theme: 'Getting started', line: 'Met the club and built model neurons.' },
  { month: '2026-10', theme: 'The basics', line: 'What GIDAS is, a memory lab, DNA, and our first journal club.' },
  { month: '2026-11', theme: 'How research works', line: 'The central dogma, Dr. Naik’s talk, and picking a research question.' },
  { month: '2026-12', theme: 'Pick your data', line: 'Brain Bee prep starts, GEO2R and STRING, and an ethics debate.' },
  { month: '2027-01', theme: 'Contest month', line: 'The Genes and Health Contest, brain trivia, and KEGG.' },
  { month: '2027-02', theme: 'Figure it out', line: 'Look up your genes, analyze your data, and brain cancer night.' },
  { month: '2027-03', theme: 'Write it up', line: 'How to write an abstract, Brain Awareness Week, and first drafts.' },
  { month: '2027-04', theme: 'Present', line: 'Submit abstracts, present at the miRcore conference, and look at careers.' },
  { month: '2027-05', theme: 'Look ahead', line: 'Intro to R, the Brain Bee wrap-up, and Innovation Challenge presentations.' },
  { month: '2027-06', theme: 'Wrap up', line: 'One last meeting to look back on the year.' },
]
