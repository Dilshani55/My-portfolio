/**
 * portfolioData.js
 * ---------------------------------------------------------------
 * ONE place to edit your portfolio content.
 * (ඔබේ portfolio එකේ තොරතුරු වෙනස් කරන්න ඕන නම් මේ file එක විතරක් edit කරන්න.)
 *
 * Rules:
 *  - Leave a value as '' (empty quotes) when you don't have it yet.
 *    The website will then show a placeholder instead of a broken link.
 *  - Only add facts that are TRUE. Recruiters check.
 */

// ---------------------------------------------------------------
// 1. PERSONAL DETAILS
// ---------------------------------------------------------------
export const personal = {
  name: 'Dilshani Vitharana',
  initials: 'DV',
  title: 'Aspiring Full-Stack Developer',
  location: 'Kandy, Sri Lanka', // shown in the hero card, About facts and Contact
  // Profile photo, shown in the hero. The file is public/profile.jpg.
  // To change it: replace that file (keep the name), or put a new file in /public
  // and write its path here. Leave '' to go back to the typography-only hero.
  photo: '/profile.jpg',
  heroHeadline: "Hi, I'm",
  heroSummary:
    'Passionate about building modern, responsive, and user-friendly web applications using frontend and backend technologies.',
  // Shown as small chips under the summary in the hero
  highlights: ['MERN Stack Development', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
  availability: 'Exploring junior Full-Stack Developer and Software Engineering opportunities.',
};

// ---------------------------------------------------------------
// 2. LINKS
// Email, LinkedIn, GitHub and Blog are real. CV is still empty on purpose.
// ---------------------------------------------------------------
export const links = {
  // No "mailto:" needed - it is added for you
  email: 'vitharanadilshani@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dilshani-vitharana/',
  github: 'https://github.com/Dilshani55',
  blog: 'https://blogswithdil.blogspot.com/',
  // Your CV is the file public/Dilshani-Vitharana-CV.pdf.
  // To update it: replace that file with your new PDF and keep the same name.
  // While this is '', NO CV buttons or card are shown anywhere.
  cv: '/Dilshani-Vitharana-CV.pdf',
};

// ---------------------------------------------------------------
// 3. NAVIGATION  (id must match the id of the section in the page)
// ---------------------------------------------------------------
export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

// ---------------------------------------------------------------
// 4. ABOUT
// ---------------------------------------------------------------
export const about = {
  paragraphs: [
    'I am an aspiring Full-Stack Developer and Software Engineering undergraduate at NSBM Green University.',
    'I gained practical full-stack development experience during my Software Engineering internship at Qdesk AI, primarily working with the MERN Stack.',
    'My experience includes frontend and backend development, REST API integration, debugging, Git and GitHub workflows, documentation, and team collaboration.',
    'I enjoy learning modern technologies, solving technical problems, and building clean, maintainable web applications.',
  ],
  goal: 'My career goal is to grow as a Full-Stack Developer and contribute to real-world software engineering teams.',
  // Small fact list beside the text. "icon" names are matched in About.jsx
  facts: [
    { icon: 'graduation', label: 'Studying', value: 'BSc (Hons) in Software Engineering' },
    { icon: 'building', label: 'University', value: 'NSBM Green University' },
    { icon: 'briefcase', label: 'Internship', value: 'Qdesk AI (Dec 2025 – Jun 2026)' },
    { icon: 'pin', label: 'Location', value: personal.location },
  ],
};

// ---------------------------------------------------------------
// 5. SKILLS  (no fake percentages - just honest lists)
// "icon" names are matched in Skills.jsx
// ---------------------------------------------------------------
export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'monitor',
    description: 'Building responsive, accessible user interfaces.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    description: 'Creating APIs and server-side logic.',
    items: ['Node.js', 'Express.js', 'Python', 'Flask', 'FastAPI'],
  },
  {
    id: 'database',
    title: 'Database',
    icon: 'database',
    description: 'Storing and querying application data.',
    items: ['MongoDB'],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: 'wrench',
    description: 'Everyday tools for collaborative development.',
    items: ['Git', 'GitHub', 'VS Code'],
  },
  {
    id: 'core',
    title: 'Core Skills',
    icon: 'sparkles',
    description: 'Engineering habits that apply to every project.',
    items: [
      'REST API Development',
      'Debugging',
      'Frontend Development',
      'Backend Development',
      'Problem Solving',
      'Team Collaboration',
    ],
  },
];

// ---------------------------------------------------------------
// 6. PROJECTS
// One object per project. Only describe what you REALLY built.
// The 4 projects below were written from the code and READMEs in your public
// GitHub repositories. Please read each sentence and fix anything that is not exact.
// Projects appear on the site in this order (move a whole { ... } block to reorder).
//
// Every project card shows: demo video (optional), title, description,
// highlights (optional), technologies, and links. A link or video only
// appears when you fill it in; '' means "not available".
//
// To add another project, copy an object below and change the text.
//
// VIDEO (videoUrl) - pick ONE way:
//   1. A file:   put it in  public/videos/  and write  '/videos/my-demo.mp4'
//                (keep it small: about 10-15 MB, 20-40 seconds; .mp4 or .webm)
//   2. YouTube:  paste the link, e.g. 'https://youtu.be/XXXXXXXXXXX'
//                (set the video to "Unlisted" on YouTube if you want)
//   3. Any other site (Loom, Google Drive...): paste the link. A "Watch demo"
//                link is shown instead of a player.
// videoPoster (optional): an image shown before a FILE video is played,
//                e.g. '/videos/my-demo-poster.jpg'
// ---------------------------------------------------------------
export const projects = [
  {
    id: 'digital-tailor-system',
    title: 'AI-Assisted Digital Tailor System',
    description:
      "A final-year project that turns a garment photo and body measurements into a sewing pattern for women's blouses and T-shirts, with a fabric estimate. AI suggests the garment design, the user confirms it, and the pattern itself is drafted with deterministic geometry.",
    highlights: [
      'Computer vision models (YOLOv8 and MobileNetV3 with PyTorch) suggest the garment type and features from a photo; the user reviews and confirms them before any pattern is drawn.',
      'Python pattern-drafting engine with seam allowances, automatic geometry validation, and a PDF of the pattern pieces with their measurements.',
      'Fabric recommendation using AHP-weighted TOPSIS, and fabric quantity calculated by nesting the real pattern pieces on standard cloth widths.',
      'Flask REST API with MongoDB and JWT login, and a React front end with a resumable multi-step wizard and a saved pattern library.',
    ],
    technologies: ['React.js', 'Python', 'Flask', 'MongoDB', 'PyTorch', 'YOLOv8', 'OpenCV', 'JWT'],
    githubUrl: 'https://github.com/Dilshani55/digital-tailor-system',
    liveUrl: '',
    videoUrl: '',
    videoPoster: '',
  },
  {
    id: 'ticket-booking',
    title: 'Movie Ticket Booking Website',
    description:
      'A full-stack MERN application for booking movie tickets online. Users can browse movies and theatres, choose seats and pay with Stripe, while admins manage movies and view all bookings.',
    highlights: [
      'Built a REST API with Express.js and MongoDB (Mongoose) for users, movies, theatres and bookings.',
      'Added JWT authentication with user and admin roles, and protected routes in the React front end.',
      'Seat selection that checks seat availability before booking, with Stripe Checkout payments and a webhook.',
    ],
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Stripe'],
    githubUrl: 'https://github.com/Dilshani55/Ticket-Booking-Website',
    liveUrl: '',
    videoUrl: '', // e.g. '/videos/ticket-booking-demo.mp4'
    videoPoster: '',
  },
  {
    id: 'crud-product-system',
    title: 'Product CRUD System',
    description:
      'A MERN stack application for managing products. An Express REST API with MongoDB handles create, read, update and delete, and a React front end lets users add, list and edit products.',
    highlights: [
      'REST endpoints for creating, listing, updating and deleting products using Mongoose, with validation and 404 handling.',
      'React client that talks to the API with Axios.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Axios'],
    githubUrl: 'https://github.com/Dilshani55/CRUD-operation-system',
    liveUrl: '',
    videoUrl: '',
    videoPoster: '',
  },
  {
    id: 'mini-ecommerce',
    title: 'Mini E-Commerce Website',
    description:
      'An e-commerce website built with HTML, CSS, JavaScript, PHP and MySQL. Visitors can browse products, view product details and use a shopping cart, and an admin panel is used to add and manage products.',
    highlights: [
      'Shopping cart with add, remove and quantity update.',
      'Contact form with validation and a responsive layout.',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/Dilshani55/Ecommerce_html-css-js-php',
    liveUrl: '',
    videoUrl: '',
    videoPoster: '',
  },
];

// ---------------------------------------------------------------
// 7. EXPERIENCE  (keep it factual - no invented numbers)
// ---------------------------------------------------------------
export const experience = [
  {
    id: 'qdesk-ai',
    company: 'Qdesk AI',
    role: 'Software Engineer Intern',
    type: 'Internship',
    period: 'December 2025 – June 2026',
    focus: 'MERN Stack Development',
    responsibilities: [
      'Contributed to full-stack web application development using MongoDB, Express.js, React.js, and Node.js.',
      'Worked on frontend development using React.js, JavaScript, HTML, and CSS.',
      'Worked on backend APIs and database-related functionality.',
      'Participated in debugging and troubleshooting application issues.',
      'Used Git and GitHub in collaborative development workflows.',
      'Contributed to technical documentation and team collaboration.',
    ],
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Git', 'GitHub'],
  },
];

// ---------------------------------------------------------------
// 8. EDUCATION
// ---------------------------------------------------------------
export const education = [
  {
    id: 'nsbm',
    institution: 'NSBM Green University',
    degree: 'Bachelor of Science (Honours) in Software Engineering',
    period: '2022 – November 2026 (Expected)',
    status: 'Undergraduate',
  },
];

// ---------------------------------------------------------------
// 9. CERTIFICATIONS
// Only the titles are confirmed. Every other detail is a placeholder
// until you check it against your official certificate.
// Fill in a field by replacing '' with the verified text.
// ---------------------------------------------------------------
export const certifications = [
  {
    id: 'github-career-essentials',
    title: 'Career Essentials in GitHub Professional Certificate',
    issuer: '', // e.g. the organisation printed on your certificate
    date: '', // e.g. 'March 2026'
    credentialId: '',
    credentialUrl: '', // full https:// link to the official certificate
  },
  {
    id: 'practical-github-actions',
    title: 'Practical GitHub Actions',
    issuer: '',
    date: '',
    credentialId: '',
    credentialUrl: '',
  },
];

// ---------------------------------------------------------------
// 10. CONTACT TEXT
// ---------------------------------------------------------------
export const contact = {
  heading: "Let's connect",
  intro:
    "I'm exploring junior Full-Stack Developer and Software Engineering opportunities. If you'd like to talk about a role or a team, I'd be glad to hear from you.",
  // true  = show a "send me a message" form (needs links.email).
  // false = hide the form and show only the contact cards.
  // How it works: this site has no server, so the form sends the message through
  // FormSubmit (formsubmit.co), a free service that forwards it to links.email.
  // The FIRST message ever sent makes FormSubmit email you an "Activate" link:
  // click it once, and after that every message arrives in your inbox.
  enableForm: true,
};
