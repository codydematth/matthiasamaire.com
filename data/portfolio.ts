export interface Project {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  liveUrl: string;
  codeUrl: string;
  dateCreated: string;
  image: string;
  tags: string[];
  highlights?: string[];
}

export interface Experience {
  title: string;
  companyName: string;
  icon: string;
  date: string;
  points: string[];
}

export interface Skill {
  name: string;
  image: string;
  invert?: boolean;
}

export const skills: Skill[] = [
  { name: 'TypeScript', image: '/images/tech/typescript.png' },
  { name: 'Next.js', image: '/images/tech/next.png', invert: true },
  { name: 'React', image: '/images/tech/reactjs.png' },
  { name: 'React Native', image: '/images/tech/react-native.png' },
  { name: 'Redux', image: '/images/tech/redux.png' },
  { name: 'FastAPI', image: '/images/tech/fastAPI.png' },
  { name: 'Git', image: '/images/tech/git.png' },
  { name: 'Tailwind CSS', image: '/images/tech/tailwind.png' },
  { name: 'Three.js', image: '/images/tech/threejs.svg', invert: true },
  { name: 'Expo', image: '/images/tech/expo-go-app.svg', invert: true },
];

export const experiences: Experience[] = [
  {
    title: 'Freelance Frontend Engineer',
    companyName: 'Localbuka, Nigeria',
    icon: '/images/company/localbuka.png',
    date: 'Dec 2025 - Present',
    points: [
      'Designed and developed a restaurant discovery web application enabling users to browse, search, and explore food options.',
      'Built responsive and user-friendly interfaces using Next.js and TypeScript.',
      'Implemented core features including restaurant listings, filtering, and dynamic content rendering.',
      'Integrated backend APIs to manage real-time data and user interactions.',
      'Developed the company’s marketing website to support product visibility and user acquisition.',
      'Focused on performance optimization, accessibility, and clean UI/UX.'
    ]
  },
  {
    title: 'Mobile Engineer',
    companyName: 'Jopiter.io, Nigeria',
    icon: '/images/company/jopiter.png',
    date: 'Feb 2025 - Aug 2025',
    points: [
      'Built core features of a social fashion mobile app using React Native (Expo + TypeScript), published on Play Store.',
      'Implemented post feed, comment system, and user interaction flows for content engagement.',
      'Optimized performance for large lists and real-time interactions.',
      'Integrated APIs and handled mobile-specific debugging and performance issues.'
    ]
  },
  {
    title: 'Frontend Engineer',
    companyName: 'Keepsafe ng, United Kingdom',
    icon: '/images/company/keepsafe.png',
    date: 'Nov 2024 - Dec 2025',
    points: [
      'Built Keepsafe mobile app and admin web interface from scratch using React Native Expo, TypeScript (mobile) and React Vite + Tailwind CSS + Shadcn/ui (admin).',
      'Collaboration & Integration: Worked closely with backend developers to integrate front-end interfaces with back-end functionalities for a cohesive user experience.',
      'Troubleshooting & Maintenance: Conducted debugging and maintenance activities to ensure smooth functioning of the front-end features, resolving issues promptly.',
      'Developed OAuth authentication (Azure) and secure file uploads and Created profile setup, document verification, role-based dashboards, and voting system UI.'
    ]
  },
  {
    title: 'Frontend Engineer',
    companyName: 'SterlingTech & Data Science, Nigeria',
    icon: '/images/company/SterlinTech.png',
    date: 'Oct 2023 - Jan 2026',
    points: [
      'Led frontend development for People’s Store, an AI-powered e-commerce platform, using Next.js, TypeScript, Shadcn/ui, Tailwind CSS, Redux, and FastAPI.',
      'Collaboration & Integration: Worked closely with backend developers to integrate front-end interfaces with back-end functionalities for a cohesive user experience.',
      'Built AI-enhanced features such as typo tolerance, voice-to-text input, and smart relevance filtering.',
      'Led frontend development for DATR (Directorate of Air Transport Regulation) using React, TypeScript, Tailwind CSS, Shadcn/ui, Redux.'
    ]
  },
  {
    title: 'Frontend Engineer',
    companyName: 'TAWOL Technologies, Nigeria',
    icon: '/images/company/tawol.ico',
    date: 'Feb 2023 - April 2024',
    points: [
      'Developed multiple internal platforms: Client Manager, Lead CRM, Save For Future, TBS Suite using React, React Native, Redux.',
      'Collaboration & Integration: Worked closely with backend developers to integrate front-end interfaces with back-end functionalities for a cohesive user experience.',
      'Troubleshooting & Maintenance: Conducted debugging and maintenance activities to ensure smooth functioning of the front-end features, resolving issues promptly.',
      'Participated in code reviews and provided constructive feedback to other developers.',
      'Continuous Integration/Deployment Pipeline Integration, pull requests, code reviews, unit and integration testing.'
    ]
  },
  {
    title: 'Mobile Engineer',
    companyName: 'Delbott, Nigeria',
    icon: '/images/company/delbotts.jpg',
    date: 'Sept 2022 - Dec 2022',
    points: [
      'Led the development and implementation of the entire Delbott projects using the technologies of TypeScript, React, React Native, Tailwind, CSS3, Redux, and Git.',
      'Constructed user-friendly registration and login modules for seamless onboarding.',
      'Designed and implemented a robust delivery management system for efficient order handling.',
      'Implemented responsive design and ensured cross-browser compatibility.'
    ]
  },
  {
    title: 'Computer Technician',
    companyName: 'AP & ICT (The Federal Polytechnic Ado)',
    icon: '/images/company/fpa.png',
    date: 'Jan 2017 - March 2021',
    points: [
      'Handled related Information Communication Technology matters, Electronic payments and web research.',
      'Collaborated with cross-functional teams including Hardware Engineer, Data Analyst, and Networking Administration.',
      'Installed and configured computer hardware operating systems and applications.',
      'Participated in onboarding new students.'
    ]
  }
];

const rawProjects: Project[] = [
  {
    id: '2d0b08ea-527f-4eba-a90d-4fedee199099',
    title: 'Lead Certificate',
    subTitle: 'Web Development',
    description:
      'Lead Certificate is a comprehensive certificate platform that simplifies the certificate creation, issuance, management, and verification process. It enhances efficiency, security, and convenience for organizations and individuals seeking to authenticate and share their achievements and qualifications.',
    liveUrl: 'http://sandbox.tawol-tech.com:3003/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-05-23T13:57:09.762495Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718774358/lead-certificate_gnzdyq.png',
    tags: ['Axios', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'React JS', 'JavaScript', 'PDF'],
    highlights: [
      'Designed comprehensive issuance pipelines and verification dashboards.',
      'Implemented cryptographic hashing mechanisms to guarantee certificate authenticity.',
      'Created automated PDF templates render engines for issuer certification cards.'
    ]
  },
  {
    id: '2ab74969-40fd-4876-8b0b-abd4b310f195',
    title: 'Save-For-Future',
    subTitle: 'App Development',
    description: 'A React Native mobile application built with Expo to help users save their money for investment and track goals.',
    liveUrl: '',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-18T17:57:53.049584Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718774059/save-for-future_qc8xgx.png',
    tags: ['Axios', 'TypeScript', 'Redux', 'JavaScript', 'React Native', 'Expo', 'Native-paper']
  },
  {
    id: 'de2b7dd2-83b4-4109-8f60-3800c68ac950',
    title: 'Tekol Africa',
    subTitle: 'Web Development',
    description: 'Tekol Computer Showroom and e-commerce showcase built with Django and SQLite.',
    liveUrl: 'https://tekolafrica.onrender.com/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-19T05:29:14.927827Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1715292583/tekol_jnj2q4.png',
    tags: ['Python', 'Django', 'Email JS', 'JavaScript', 'HTML', 'CSS', 'Bootstrap', 'SQLite']
  },
  {
    id: 'bbbb2036-b18a-477b-93a1-645ba78472af',
    title: 'Lead-CRM',
    subTitle: 'App Development',
    description: 'A mobile CRM app for tracking business leads, sales pipelines, and customer communications.',
    liveUrl: '',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-19T05:31:15.319361Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718774060/lead-crm_ul3z8n.png',
    tags: ['Axios', 'TypeScript', 'Redux', 'JavaScript', 'React Native', 'Expo']
  },
  {
    id: '4d603ea2-5177-476c-825a-a7744d2b8b28',
    title: 'Portfolio V1',
    subTitle: 'Web Development',
    description: 'Personal portfolio V1 website designed with Material UI and Framer Motion.',
    liveUrl: 'https://codydematth.netlify.app/',
    codeUrl: 'https://github.com/codydematth/React-Portfolio',
    dateCreated: '2024-06-19T05:34:30.558767Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1714094994/eavnobcvhq8otg7w0d8w.png',
    tags: ['Material UI', 'React JS', 'JavaScript', 'Framer Motion']
  },
  {
    id: '550f322b-24c8-4552-b317-120ef41de8b5',
    title: 'Portfolio V2',
    subTitle: 'Web Development',
    description: 'Personal portfolio V2 website built using React, Vite, and Three.js elements.',
    liveUrl: 'https://matthiasamire.netlify.app',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-19T05:38:55.967372Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718774059/mathias-new-portfolio_o5dwpw.png',
    tags: ['Axios', 'Tailwind CSS', 'React JS', 'Django', 'TypeScript', 'Framer Motion', 'Three.js']
  },
  {
    id: '2cb1799e-a28e-430b-b58e-bac186defa8c',
    title: 'Multimedia Learning System',
    subTitle: 'Web Application',
    description: 'An interactive online teaching and course manager platform built using Django and Bootstrap.',
    liveUrl: 'https://codyteaching.pythonanywhere.com/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-19T14:38:01.835946Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718808251/mls_uztzqr.png',
    tags: ['Python', 'Django', 'CSS', 'HTML', 'Bootstrap']
  },
  {
    id: 'd433c832-6765-455f-8f74-ac1b044c6f80',
    title: 'Client Manager',
    subTitle: 'Web Development',
    description: 'Internal project management and client dashboard with role-based access control.',
    liveUrl: 'http://sandbox.tawol-tech.com:3001/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-19T14:39:59.921797Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1715292813/Screenshot_from_2024-05-09_23-01-31_zm0oq6.png',
    tags: ['Redux Toolkit', 'Tailwind CSS', 'React JS', 'TypeScript', 'JavaScript']
  },
  {
    id: 'd6538f3e-ddfe-4cc9-a077-a4598a221798',
    title: 'Delbott Driver',
    subTitle: 'App Development',
    description: 'A mobile driver app for package routing, map navigation, and proof of delivery.',
    liveUrl: '',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-20T08:34:19.577542Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718872289/delbott_glrsyv.png',
    tags: ['TypeScript', 'Redux', 'Expo', 'React Native']
  },
  {
    id: '1be1f81a-dfc9-4390-9109-1894de805f3f',
    title: 'Peoplesstore Admin',
    subTitle: 'Web Development',
    description: 'An advanced admin panel for managing catalog, inventory, recommendations, and analytics of Peoplesstore.',
    liveUrl: 'https://admin.peoplesstore.ng/admin',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T16:50:47.629139Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756743702/Screenshot_2025-09-01_at_11.44.38_thdpie.png',
    tags: ['TypeScript', 'Redux', 'Tailwind CSS', 'React JS', 'JavaScript', 'E-commerce']
  },
  {
    id: '687292c4-457b-4a98-90f5-5aa7751984df',
    title: 'NCAA DATR Admin',
    subTitle: 'Web Development',
    description: 'Official admin panel for the Nigeria Civil Aviation Authority Directorate of Air Transport Regulation.',
    liveUrl: 'https://admin.datr.ncaa.gov.ng/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T16:57:38.473403Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756741159/Screenshot_2025-09-01_at_11.29.05_wby3fm.png',
    tags: ['Redux', 'Next JS', 'Tailwind', 'Shadcn UI', 'TypeScript']
  },
  {
    id: '4d9c9f1b-aea9-4f09-8646-3dc441581a98',
    title: 'Peoplesstore Buyer Portal',
    subTitle: 'Web Development',
    description: 'AI-powered buyer platform featuring typo tolerance, speech-to-text search, and smart recommendation flows.',
    liveUrl: 'https://www.peoplesstore.ng/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T17:04:13.763854Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756743255/Simplistic_Laptop_iphone_tablet_mockup_instagram_post_zvlx6r.png',
    tags: ['TypeScript', 'Redux', 'Next JS', 'Tailwind', 'Shadcn UI', 'FastAPI', 'Flutterwave', 'Seerbit'],
    highlights: [
      'Developed AI-powered search modules supporting typo tolerance and speech-to-text.',
      'Configured payment gateways using Flutterwave & Seerbit checkout modules.',
      'Designed user recommendation flows and dynamic inventory search filters.'
    ]
  },
  {
    id: 'be542d14-39e2-4e78-bb21-e199ace9f4bb',
    title: 'NCAA DATR Portal',
    subTitle: 'Web Development',
    description: 'Main public facing portal for Directorate of Air Transport Regulation (DATR).',
    liveUrl: 'https://datr.ncaa.gov.ng/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T17:07:10.171929Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756743658/Simplistic_Laptop_iphone_tablet_mockup_instagram_post_1_aioaqw.png',
    tags: ['Redux', 'React JS', 'Next JS', 'Tailwind', 'Shadcn UI', 'TypeScript']
  },
  {
    id: 'dd5aa325-7ddf-497f-b600-b36e23d4e1d5',
    title: 'Jopiter Fashion App',
    subTitle: 'App Development',
    description: 'A social commerce and mobile fashion app focused on creators, visual photo boards, and engagement.',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.jopiter.jopiterio&hl=en',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T17:10:22.495988Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756741370/White_Green_Mobile_Mockup_Photo_Collage_Beauty_Facebook_Post_2_kuqib5.png',
    tags: ['TypeScript', 'Redux', 'React Native', 'Expo', 'Fashion', 'Social Media'],
    highlights: [
      'Constructed core social fashion app features using React Native & Expo.',
      'Built interactive post feed, double-tap likes, and profile visual boards.',
      'Optimized list performance for fast scrolls and real-time user reactions.'
    ]
  },
  {
    id: 'dd5aa325-7ddf-497f-b600-b36e23d4e1d9',
    title: 'Localbuka App',
    subTitle: 'Web Development',
    description: 'A platform helping users discover nearby restaurants, plan meals, and connect with other food lovers.',
    liveUrl: 'https://www.localbuka.com/',
    codeUrl: '',
    dateCreated: '2026-04-17T17:10:22.495988Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1776385025/Screenshot_2026-04-17_at_01.16.42_l2ok0q.png',
    tags: ['TypeScript', 'Next JS', 'Tailwind', 'Shadcn UI'],
    highlights: [
      'Built dynamic restaurant discovery features & menu filtering mechanisms.',
      'Designed highly responsive Next.js frontend interfaces to maximize mobile usability.',
      'Integrated backend APIs to support location searches and foodie community engagement.'
    ]
  }
];

export const projects: Project[] = [...rawProjects].sort(
  (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
);

