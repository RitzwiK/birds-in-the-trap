/**
 * Seed script – populates MongoDB with Birds in the TRAP members.
 * Run: node seed.js
 */
const mongoose = require('mongoose');
require('dotenv').config();

const Member = require('./models/Member');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/birdsinthetrap';

const members = [
  {
    name:         'Kanye West',
    roll:         'TRAP001',
    year:         '2024',
    degree:       'B.Tech',
    role:         'Creative Director',
    email:        'ye@birdsinthetrap.dev',
    project:      'DONDA OS – AI-driven music composition platform',
    hobbies:      'Architecture, Fashion Design, Music Production',
    certificate:  'Grammy Award in Creative Excellence',
    internship:   'Adidas Yeezy Division',
    aboutYourAim: 'To be the greatest creative of all time and redefine what human expression looks like',
    imageUrl:     'https://api.dicebear.com/9.x/pixel-art/svg?seed=KanyeWest&backgroundColor=b6e3f4',
  },
  {
    name:         'Drake',
    roll:         'TRAP002',
    year:         '2024',
    degree:       'B.Tech',
    role:         'Content Strategist',
    email:        'drizzy@birdsinthetrap.dev',
    project:      'OVO Analytics – Streaming trend prediction engine',
    hobbies:      'Basketball, Luxury Watches, Songwriting',
    certificate:  'Billboard Chart Optimization & Growth Hacking',
    internship:   'Young Money Entertainment',
    aboutYourAim: 'Started from the bottom, now we are architecting the future of content distribution',
    imageUrl:     'https://api.dicebear.com/9.x/pixel-art/svg?seed=Drake6God&backgroundColor=c0aede',
  },
  {
    name:         'Linus Torvalds',
    roll:         'TRAP003',
    year:         '2024',
    degree:       'B.Tech',
    role:         'Lead Developer',
    email:        'linus@birdsinthetrap.dev',
    project:      'TrapKernel – Open-source microkernel for embedded team management',
    hobbies:      'Scuba Diving, Kernel Hacking, Reading Git blame logs',
    certificate:  'Linux Foundation – Kernel Contributor Level 5',
    internship:   'The Linux Foundation',
    aboutYourAim: 'Talk is cheap. Show me the code. Everything else is just README.',
    imageUrl:     'https://api.dicebear.com/9.x/pixel-art/svg?seed=LinusTorvalds&backgroundColor=d1f4d1',
  },
  {
    name:         'Elon Musk',
    roll:         'TRAP004',
    year:         '2024',
    degree:       'B.Tech',
    role:         'Systems Architect',
    email:        'elonx@birdsinthetrap.dev',
    project:      'StarTrap – Distributed satellite-based team sync system',
    hobbies:      'Rockets, Neural Interfaces, Memes, Electric Cars',
    certificate:  'SpaceX Advanced Propulsion Engineering',
    internship:   'Tesla Autopilot Division',
    aboutYourAim: 'Make humanity multi-planetary and ship code fast enough that Mars has Wi-Fi before 2030',
    imageUrl:     'https://api.dicebear.com/9.x/pixel-art/svg?seed=ElonMusk&backgroundColor=ffd5dc',
  },
  {
    name:         'Jeff Bezos',
    roll:         'TRAP005',
    year:         '2024',
    degree:       'B.Tech',
    role:         'Product Manager',
    email:        'jeff@birdsinthetrap.dev',
    project:      'PrimePM – Day-1 thinking applied to product backlogs',
    hobbies:      'Space Tourism, Weightlifting, Long-term Thinking',
    certificate:  'AWS Solutions Architect – Legendary',
    internship:   'Amazon Web Services – Founding Team',
    aboutYourAim: 'Work hard, have fun, make history. Two-day delivery for everything including project milestones.',
    imageUrl:     'https://api.dicebear.com/9.x/pixel-art/svg?seed=JeffBezos&backgroundColor=ffeac2',
  },
  {
    name:         'Tyler the Creator',
    roll:         'TRAP006',
    year:         '2024',
    degree:       'B.Tech',
    role:         'UI/UX Designer',
    email:        'wolf@birdsinthetrap.dev',
    project:      'GOLF Interface – Colour-theory-first design system',
    hobbies:      'Sketching, Vintage Cars, Golf Le Fleur Collection',
    certificate:  'Adobe Creative Suite – Expert Level',
    internship:   'Odd Future Design Lab',
    aboutYourAim: 'Create things that feel alive. Ugly on purpose until it becomes beautiful. Color is everything.',
    imageUrl:     'https://api.dicebear.com/9.x/pixel-art/svg?seed=TylerTheCreator&backgroundColor=c4f0c5',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Member.deleteMany({});
    console.log('🗑  Cleared existing members');

    const created = await Member.insertMany(members);
    console.log(`🌱 Seeded ${created.length} members:`);
    created.forEach((m) => console.log(`   • ${m.name} (${m.role})`));

    mongoose.disconnect();
    console.log('✅ Done – MongoDB disconnected');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
