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
}

export const MEETINGS: Meeting[] = [
  {
    date: '2026-09-23',
    track: 'joint',
    title: 'Intro meeting',
    summary: 'What the year looks like, and how the two tracks trade off week to week.',
    confirmed: true,
    recap:
      'We walked through the year: brain science one week, genetics research the next. People got a feel for both tracks before deciding to stay.',
  },
  {
    date: '2026-09-30',
    track: 'neuro',
    title: 'Build a neuron',
    summary: 'How a neuron sends a signal, then everyone builds their own model.',
    confirmed: true,
    recap:
      'We covered how a signal moves through a neuron, from dendrites to axon terminals. Then everyone built a model neuron out of pipe cleaners and clay.',
  },
  {
    date: '2026-10-07',
    track: 'gidas',
    title: 'What GIDAS is, and the disease vote',
    summary: 'How the research works from start to finish, with real abstracts as examples.',
    confirmed: true,
    recap:
      'Our first GIDAS week. We went over how a project goes from a public dataset to a written abstract, read a couple of real ones, and voted on the disease we will research this year.',
  },
  {
    date: '2026-10-14',
    track: 'neuro',
    title: 'Attention and Memory Lab',
    summary: 'Three quick experiments on your own brain, plus optical illusions.',
    confirmed: true,
    recap:
      'We ran the Stroop test, a multitasking test, and a set of memory tests, then put the class results on the board. The numbers showed reading is automatic, attention has limits, and chunking stretches working memory.',
  },
  {
    date: '2026-10-21',
    track: 'neuro',
    title: 'Talk and Q&A with Dr. Anant Naik',
    summary:
      'Dr. Naik is a neurosurgery resident. He will talk about his work and answer your questions about medicine and the brain.',
    confirmed: true,
    openToAll: true,
  },
  { date: '2026-10-28', track: 'gidas', title: 'DNA structure and replication', summary: 'What DNA is made of, how it copies itself, and why that matters for disease.', confirmed: false },
  { date: '2026-11-04', track: 'neuro', title: 'Journal club and neuroscience in the news', summary: 'One published paper, explained simply, plus what is new in brain science this month.', confirmed: false },
  { date: '2026-11-11', track: 'gidas', title: 'The central dogma', summary: 'DNA to RNA to protein, the idea every GIDAS tool builds on.', confirmed: false },
  { date: '2026-11-18', track: 'neuro', title: 'Brain Bee prep begins', summary: 'High-yield topics and timed practice questions for the Brain Bee.', confirmed: false },
  { date: '2026-12-02', track: 'gidas', title: 'Disease deep dive and research questions', summary: 'Learn the disease well enough to ask a question you can actually answer with data.', confirmed: false },
  { date: '2026-12-09', track: 'neuro', title: 'Ethics debate', summary: 'Two sides, assigned at random, on an open question in neuroscience.', confirmed: false },
  { date: '2026-12-16', track: 'gidas', title: 'GEO2R and STRING', summary: 'Pick your own gene expression dataset and map how the proteins connect.', confirmed: false },
  { date: '2027-01-06', track: 'neuro', title: 'Brain trivia and reflection', summary: 'Team trivia on everything so far, and a look back at the first half.', confirmed: false },
  { date: '2027-01-13', track: 'gidas', title: 'Genes and Health Contest review', summary: 'Concept review and a practice round before the January contest.', confirmed: false },
  { date: '2027-01-20', track: 'neuro', title: 'Research night and Brain Bee study', summary: 'Work time on projects, with a Brain Bee study group running alongside.', confirmed: false },
  { date: '2027-01-27', track: 'gidas', title: 'KEGG pathways and the UCSC Genome Browser', summary: 'Find the pathways your genes share, then look at them on the genome.', confirmed: false },
  { date: '2027-02-03', track: 'neuro', title: 'Research lab walkthrough', summary: 'A look at how a research lab runs, day to day.', confirmed: false },
  { date: '2027-02-10', track: 'gidas', title: 'GeneCards, OMIM and Gene Ontology', summary: 'Find out what your genes do and which diseases they are tied to.', confirmed: false },
  { date: '2027-02-17', track: 'neuro', title: 'Brain cancer night', summary: 'Where the two tracks meet. Launch of the Brain Cancer Innovation Challenge.', confirmed: false },
  { date: '2027-02-24', track: 'gidas', title: 'Analyze your dataset', summary: 'Pull your results together and decide what they actually show.', confirmed: false },
  { date: '2027-03-03', track: 'gidas', title: 'Abstract format and the conference', summary: 'What the April conference looks like and how a strong abstract is built.', confirmed: false },
  { date: '2027-03-17', track: 'neuro', title: 'Brain Awareness Week', summary: 'Quick, hands-on brain science for the rest of the school.', confirmed: false },
  { date: '2027-03-24', track: 'gidas', title: 'Writing abstracts', summary: 'Draft, trade, and revise your abstract with feedback.', confirmed: false },
  { date: '2027-04-07', track: 'gidas', title: 'Finalize and submit abstracts', summary: 'Last edits, then submit to the miRcore conference.', confirmed: false },
  { date: '2027-04-14', track: 'neuro', title: 'Career exploration', summary: 'Paths into medicine, neuroscience, genetics and research.', confirmed: false },
  { date: '2027-04-21', track: 'gidas', title: 'Conference debrief', summary: 'What we presented, what we learned, and what we would do next time.', confirmed: false },
  { date: '2027-04-28', track: 'neuro', title: 'Lab visit', summary: 'A visit to a working research lab.', confirmed: false },
  { date: '2027-05-05', track: 'gidas', title: 'Intro to R and looking ahead', summary: 'A first look at R for anyone who wants to keep doing research.', confirmed: false },
  { date: '2027-05-12', track: 'neuro', title: 'Brain Bee wrap and capstone', summary: 'Results, review, and a capstone on the year in neuroscience.', confirmed: false },
  { date: '2027-05-19', track: 'gidas', title: 'Board announcements', summary: 'Next year’s officers and planning for the fall.', confirmed: false },
  { date: '2027-05-26', track: 'neuro', title: 'Innovation Challenge presentations', summary: 'Teams present their Brain Cancer Innovation Challenge ideas.', confirmed: false },
  { date: '2027-06-02', track: 'joint', title: 'End of year', summary: 'A look back at the year, together.', confirmed: false },
];

// Big events. Months only where exact dates are not set yet.
export const EVENTS = [
  { month: '2027-01', when: 'January', name: 'Genes and Health Contest', detail: 'A free online contest on genetics concepts and the research tools.', track: 'gidas' as Track },
  { month: '2027-01', when: 'January to March', name: 'Brain Bee', detail: 'Neuroscience competition. Regional rounds run from January through March.', track: 'neuro' as Track },
  { month: '2027-03', when: 'March', name: 'Brain Awareness Week', detail: 'We bring quick brain science demos to the rest of Eastview.', track: 'neuro' as Track },
  { month: '2027-04', when: 'April', name: 'miRcore Research Conference', detail: 'Members submit an abstract and present their own project.', track: 'gidas' as Track },
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
  { month: '2026-09', theme: 'Getting started', line: 'Meet the club and build a model neuron.' },
  { month: '2026-10', theme: 'Foundations', line: 'What GIDAS is, an attention and memory lab, a neurosurgery resident, and DNA.' },
  { month: '2026-11', theme: 'How research works', line: 'The central dogma, a journal club, and the start of Brain Bee prep.' },
  { month: '2026-12', theme: 'Pick your data', line: 'Choose a research question and a public dataset, and run GEO2R and STRING.' },
  { month: '2027-01', theme: 'Contest month', line: 'The Genes and Health Contest, KEGG pathways, and Brain Bee study.' },
  { month: '2027-02', theme: 'Make sense of it', line: 'Find out what your genes do, analyze your data, and a night on brain cancer.' },
  { month: '2027-03', theme: 'Write it up', line: 'Abstract format, Brain Awareness Week, and first drafts.' },
  { month: '2027-04', theme: 'Present', line: 'Submit abstracts, present at the miRcore conference, and explore careers.' },
  { month: '2027-05', theme: 'Look ahead', line: 'A first look at R, Brain Bee wrap-up, and Innovation Challenge presentations.' },
  { month: '2027-06', theme: 'Wrap up', line: 'One last meeting to look back on the year.' },
];
