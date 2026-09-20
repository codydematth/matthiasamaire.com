export interface Project {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  productScope: string;
  contributions: string[];
  technologiesUsed: string[];
  troubleshootingFocus: string[];
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

export interface CategorizedSkill {
  name: string;
  description: string;
  image?: string;
  invert?: boolean;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: CategorizedSkill[];
}

export const skills: Skill[] = [
  { name: 'TypeScript', image: '/images/tech/typescript.png' },
  { name: 'Next.js', image: '/images/tech/next.png', invert: true },
  { name: 'React', image: '/images/tech/reactjs.png' },
  { name: 'React Native', image: '/images/tech/react-native.png' },
  { name: 'FastAPI', image: '/images/tech/fastAPI.png' },
  { name: 'Redux', image: '/images/tech/redux.png' },
  { name: 'Git', image: '/images/tech/git.png' },
  { name: 'Tailwind CSS', image: '/images/tech/tailwind.png' },
  { name: 'Three.js', image: '/images/tech/threejs.svg', invert: true },
  { name: 'Expo', image: '/images/tech/expo-go-app.svg', invert: true },
];

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    description: 'Core languages utilized across production web, mobile, and backend codebases.',
    skills: [
      { name: 'TypeScript', description: 'Strong typing, interface definitions, strict type checking, and robust compile-time safety.', image: '/images/tech/typescript.png' },
      { name: 'JavaScript (ES6+)', description: 'Asynchronous event loops, DOM manipulation, promises, closures, and modern ES syntaxes.', image: '/images/tech/javascript.png' },
      { name: 'Python', description: 'Scripting, backend service implementation, and REST endpoint construction.', image: '/images/tech/fastAPI.png' }
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Modern component-driven web frameworks, styling engines, and reactive state stores.',
    skills: [
      { name: 'React', description: 'Custom hooks, lifecycle optimization, component architecture, and reactive rendering.', image: '/images/tech/reactjs.png' },
      { name: 'Next.js', description: 'App Router architecture, Server-Side Rendering (SSR), Server Actions, and bundle optimization.', image: '/images/tech/next.png', invert: true },
      { name: 'Redux & Redux Toolkit', description: 'Predictable centralized state trees, slice management, and async thunk middleware.', image: '/images/tech/redux.png' },
      { name: 'Tailwind CSS', description: 'Utility-first responsive layouts, dynamic theme configuration, and modern styling systems.', image: '/images/tech/tailwind.png' },
      { name: 'Shadcn UI', description: 'Accessible, composable headless UI components built on top of Radix primitives.' }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'Cross-platform native mobile applications deployed to iOS and Android environments.',
    skills: [
      { name: 'React Native', description: 'Native view bridge orchestration, responsive mobile layout trees, and platform-specific behaviors.', image: '/images/tech/react-native.png' },
      { name: 'Expo', description: 'EAS build systems, native configuration management, and hardware SDK integration.', image: '/images/tech/expo-go-app.svg', invert: true },
      { name: 'Mobile Device APIs', description: 'Hardware biometrics (Face ID/Touch ID/KeyStore), camera access, local storage, and secure enclave.' },
      { name: 'Mobile Debugging', description: 'React Native debugger, Flipper, Android Logcat, and device-specific rendering diagnostics.' }
    ]
  },
  {
    id: 'apis-web',
    name: 'APIs & Web',
    description: 'Network communication, HTTP protocol adherence, and robust integration patterns.',
    skills: [
      { name: 'REST APIs', description: 'Standard HTTP methods, status code semantics, payload structuring, and idempotency patterns.' },
      { name: 'API Integration', description: 'Consuming upstream services, data serialization, schema validation, and error contract handling.' },
      { name: 'HTTP & Networking', description: 'Headers inspection, CORS policy resolution, cache control headers, and connection lifecycle.' },
      { name: 'Axios & Fetch', description: 'Configuring interceptors, retry strategies, timeout thresholds, and cancellation tokens.' },
      { name: 'Webhooks', description: 'Receiving and verifying asynchronous event callbacks from payment providers and third-party services.' }
    ]
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    description: 'Methodical diagnostic workflows to isolate, reproduce, and resolve defects.',
    skills: [
      { name: 'Root Cause Analysis (RCA)', description: 'Isolating underlying failure mechanisms rather than addressing mere symptoms.' },
      { name: 'Frontend & Mobile Debugging', description: 'Diagnosing re-render loops, state drift, layout shifts, and memory leaks.' },
      { name: 'Network Inspection', description: 'Analyzing request/response payloads, timing waterfalls, and TLS/CORS connection errors in DevTools.' },
      { name: 'Console & Log Analysis', description: 'Tracing stack errors, uncaught promise rejections, and structured log events.' },
      { name: 'Performance Profiling', description: 'React DevTools profiler, mobile frame-rate (FPS) drops, and script execution bottlenecks.' }
    ]
  },
  {
    id: 'authentication',
    name: 'Authentication',
    description: 'Identity flows, token management, and secure authorization handshakes.',
    skills: [
      { name: 'OAuth 2.0 & Azure AD', description: 'Authorization code flows, token exchange, refresh cycles, and Azure AD / Entra ID tenant config.' },
      { name: 'JWT & Token Management', description: 'Validating payload claims, secure token storage, automated refresh interceptors, and expiry handling.' },
      { name: 'Session & State Auth', description: 'Role-based access control (RBAC), protected route guards, and login session invalidation.' },
      { name: 'Device Biometrics', description: 'Integrating native Face ID / Touch ID hardware authorization via local secure enclave.' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Backend services, serverless cloud functions, and database interfaces.',
    skills: [
      { name: 'FastAPI (Python)', description: 'Building high-performance REST APIs, Pydantic validation models, and asynchronous endpoint handlers.', image: '/images/tech/fastAPI.png' },
      { name: 'Azure Functions', description: 'Serverless event-driven execution for file processing, notifications, and micro-tasks.' },
      { name: 'Azure Storage & SQL', description: 'Managing blob storage containers, SAS tokens, and relational SQL queries.' },
      { name: 'SQLite', description: 'Embedded relational database schema design, indexing, and transactional integrity.' }
    ]
  },
  {
    id: 'tools-cicd',
    name: 'Developer Tools / CI/CD',
    description: 'Version control workflows, build pipelines, and automated delivery systems.',
    skills: [
      { name: 'Git & GitHub', description: 'Branching strategies, conflict resolution, rebase hygiene, and collaborative pull request reviews.', image: '/images/tech/git.png' },
      { name: 'GitHub Actions', description: 'Configuring CI automation workflows for linting, build verification, and release management.' },
      { name: 'Azure DevOps', description: 'Managing build pipelines, artifact releases, and continuous integration triggers.' },
      { name: 'CircleCI', description: 'Containerized build environments, deployment pipelines, and workflow orchestration.' }
    ]
  }
];

export const experiences: Experience[] = [
  {
    title: 'Frontend Engineer',
    companyName: 'Localbuka, Nigeria',
    icon: '/images/company/localbuka.png',
    date: 'Dec 2025 - Present',
    points: [
      'Designed and developed a restaurant discovery web application enabling users to browse, search, and explore food options.',
      'Built responsive and user-friendly interfaces using Next.js, React, and TypeScript.',
      'Implemented core features including restaurant listings, dynamic filtering, and live query rendering.',
      'Integrated REST backend APIs to manage data synchronization and dynamic user interactions.',
      'Investigated and resolved mobile browser rendering quirks and responsive layout constraints across touch viewports.',
      'Developed the company marketing website focused on clean UI/UX, fast page delivery, and accessibility.'
    ]
  },
  {
    title: 'Fullstack Engineer',
    companyName: 'Keepsafe ng, United Kingdom',
    icon: '/images/company/keepsafe.png',
    date: 'Oct 2025 - Present',
    points: [
      'Built and maintained backend cloud integrations with Azure Functions, Azure Blob Storage, and Azure SQL database for secure document workflows.',
      'Engineered the Keepsafe mobile app using React Native & Expo (TypeScript) and the admin web portal using React Vite, Tailwind CSS, and Shadcn UI.',
      'Implemented and troubleshot OAuth authentication with Azure, resolving token refresh timing issues and redirect loop edge cases.',
      'Engineered secure file upload pipelines with progress tracking and network timeout handling for high-resolution document submissions.',
      'Created role-based administrative dashboards, user verification flows, and voting UI modules.',
      'Conducted ongoing debugging and technical troubleshooting across both mobile and web clients, resolving integration defects promptly.'
    ]
  },
  {
    title: 'Frontend Engineer',
    companyName: 'SterlingTech & Data Science, Nigeria',
    icon: '/images/company/SterlinTech.png',
    date: 'Oct 2023 - Jan 2026',
    points: [
      'Led frontend development for Peoplesstore (now Moorcart.com), an AI-assisted e-commerce platform, using Next.js, TypeScript, Shadcn UI, Tailwind CSS, Redux, and FastAPI.',
      'Integrated AI-enhanced search features including typo tolerance, voice-to-text input, and dynamic relevance filtering.',
      'Integrated payment checkout flows with Flutterwave and Seerbit, debugging callback reconciliation and webhook edge cases.',
      'Led frontend development for DATR (Directorate of Air Transport Regulation, NCAA) using React, TypeScript, Tailwind CSS, Shadcn UI, and Redux.',
      'Collaborated closely with backend engineers to diagnose API integration errors and resolve data serialization mismatches.'
    ]
  },
  {
    title: 'Frontend Engineer',
    companyName: 'Keepsafe ng, United Kingdom',
    icon: '/images/company/keepsafe.png',
    date: 'Nov 2024 - Sept 2025',
    points: [
      'Built Keepsafe cross-platform mobile application and web administration panel from scratch using React Native Expo, TypeScript, and React Vite.',
      'Implemented Azure OAuth authentication flows and secure credential storage.',
      'Developed document verification workflows, member onboarding interfaces, and interactive dashboards.',
      'Troubleshot cross-browser rendering inconsistencies, API payload formatting issues, and mobile state caching.'
    ]
  },
  {
    title: 'Mobile Engineer',
    companyName: 'Jopiter.io, Nigeria',
    icon: '/images/company/jopiter.png',
    date: 'Feb 2025 - Aug 2025',
    points: [
      'Engineered core features of a social fashion mobile application using React Native (Expo + TypeScript), published on the Google Play Store.',
      'Implemented interactive post feeds, nested comment flows, and creator engagement features.',
      'Investigated and resolved mobile scroll stutter (jank) in long feeds by optimizing image rendering, list memoization, and item recycling.',
      'Integrated REST APIs and handled mobile-specific debugging across diverse Android device form factors.'
    ]
  },
  {
    title: 'Frontend Engineer',
    companyName: 'TAWOL Technologies, Nigeria',
    icon: '/images/company/tawol.ico',
    date: 'Feb 2023 - April 2024',
    points: [
      'Developed multiple internal enterprise platforms: Client Manager, Lead CRM, Save For Future, and Lead Certificate using React, React Native, and Redux.',
      'Collaborated closely with backend engineers to integrate APIs, standardize request/response contracts, and troubleshoot integration errors.',
      'Maintained CI/CD pipelines across environments, managed code reviews, and resolved pull request integration conflicts.',
      'Conducted debugging sessions to fix state desynchronization, browser storage limits, and export engine memory spikes.'
    ]
  },
  {
    title: 'Mobile Engineer',
    companyName: 'Delbott, Nigeria',
    icon: '/images/company/delbotts.jpg',
    date: 'Sept 2022 - Dec 2022',
    points: [
      'Led mobile application development for the Delbott package delivery platform using TypeScript, React Native, Redux, and Tailwind CSS.',
      'Constructed driver onboarding modules, authentication flows, and real-time delivery management interfaces.',
      'Investigated intermittent connectivity issues, ensuring state integrity when mobile drivers transitioned between offline and online states.',
      'Ensured cross-device responsive UI scaling and consistent interaction patterns.'
    ]
  },
  {
    title: 'Computer Technician',
    companyName: 'AP & ICT (The Federal Polytechnic Ado)',
    icon: '/images/company/fpa.png',
    date: 'Jan 2017 - March 2021',
    points: [
      'Handled Information and Communication Technology hardware setups, local network connectivity, and electronic payment terminal troubleshooting.',
      'Collaborated with hardware engineers, network administrators, and data analysts to resolve workstation and connectivity failures.',
      'Installed, configured, and diagnosed computer hardware operating systems and application software packages.',
      'Supported technical onboarding for faculty and students, providing direct user problem resolution.'
    ]
  }
];

const rawProjects: Project[] = [
  {
    id: 'vaultvoss-app-2026',
    title: 'VaultVoss',
    subTitle: 'Mobile App',
    description: 'Private, offline-first personal asset and expense tracker built with React Native & Expo, featuring local biometrics and budget management.',
    productScope: 'A privacy-focused mobile application that enables users to manage personal assets, log liabilities, schedule recurring expenses, and calculate real-time net worth without sending sensitive financial logs to remote servers.',
    contributions: [
      'Architected the entire application from scratch using React Native, Expo, and TypeScript.',
      'Implemented local biometric authentication (Face ID / Touch ID / Android BiometricPrompt) interfaced directly with the device Secure Enclave.',
      'Configured offline-first SQLite/MMKV persistent storage with encrypted serialization.',
      'Built automated Android APK production build workflows for direct distribution.'
    ],
    technologiesUsed: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Biometrics', 'Secure Enclave', 'Android APK'],
    troubleshootingFocus: [
      'Investigated and handled fallback authentication paths when device biometric sensors were temporarily unavailable, un-enrolled, or locked out.',
      'Resolved state hydration race conditions on cold app starts to guarantee encrypted financial logs loaded before UI components mounted.'
    ],
    liveUrl: '/apps/vaultvoss',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2026-07-28T10:00:00.000000Z',
    image: '/images/vault_image.png',
    tags: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Biometrics', 'Android APK'],
    highlights: [
      'Offline-first personal asset & liability tracking with real-time valuation.',
      'Secured financial records with device-native biometrics via Secure Enclave.',
      'Enabled direct APK download and pending Google Play Store submission.'
    ]
  },
  {
    id: 'localbuka-app-2026',
    title: 'Localbuka',
    subTitle: 'Web Application & Marketing',
    description: 'Restaurant discovery web application and corporate marketing website helping users explore menus, search local eateries, and connect.',
    productScope: 'A dual-surface digital product consisting of an interactive restaurant discovery web application and the company corporate marketing site, providing fast culinary search and location discovery.',
    contributions: [
      'Built responsive Next.js frontend interfaces using TypeScript, Tailwind CSS, and Shadcn UI components.',
      'Integrated RESTful backend endpoints to fetch restaurant catalogs, menus, and dynamic location results.',
      'Developed interactive menu filtering, category exploration, and real-time query inputs.'
    ],
    technologiesUsed: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Shadcn UI', 'REST APIs'],
    troubleshootingFocus: [
      'Diagnosed and eliminated UI lag caused by unthrottled search input queries by applying debounced API calls and optimistic filter states.',
      'Fixed cross-browser mobile layout anomalies where fixed header elements interfered with virtual keyboard viewports on iOS Safari.'
    ],
    liveUrl: 'https://www.localbuka.com/',
    codeUrl: '',
    dateCreated: '2026-04-17T17:10:22.495988Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1776385025/Screenshot_2026-04-17_at_01.16.42_l2ok0q.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'REST APIs'],
    highlights: [
      'Engineered dynamic restaurant discovery & menu filtering mechanisms.',
      'Designed responsive Next.js frontend maximizing mobile usability.',
      'Integrated backend APIs for real-time culinary search and discovery.'
    ]
  },
  {
    id: 'keepsafe-platform-2025',
    title: 'Keepsafe Ecosystem',
    subTitle: 'Mobile App & Admin Portal',
    description: 'Identity verification and secure document management ecosystem comprising a React Native mobile application and React/Vite admin dashboard.',
    productScope: 'A multi-platform security and document verification suite providing identity verification, role-based dashboards, and member voting tools, backed by Azure cloud infrastructure.',
    contributions: [
      'Developed cross-platform mobile app using React Native Expo and TypeScript.',
      'Engineered the administrative web dashboard using React, Vite, Tailwind CSS, and Shadcn UI.',
      'Built backend integration with Azure Functions, Azure Blob Storage, and Azure SQL database for file storage and identity operations.',
      'Implemented OAuth authentication with Azure for secure access across both clients.'
    ],
    technologiesUsed: ['React Native', 'Expo', 'React', 'Vite', 'TypeScript', 'Azure OAuth', 'Azure Functions', 'Azure Blob Storage', 'Tailwind CSS'],
    troubleshootingFocus: [
      'Investigated and resolved OAuth redirect loop failures occurring during mobile deep linking by standardizing redirect URI schemes across platforms.',
      'Debugged secure file upload timeouts on large verification documents by implementing chunked uploads and network retry logic with exponential backoff.'
    ],
    liveUrl: '',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-10-01T10:00:00.000000Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718774059/mathias-new-portfolio_o5dwpw.png',
    tags: ['React Native', 'React', 'Vite', 'TypeScript', 'Azure OAuth', 'Azure Functions', 'Blob Storage'],
    highlights: [
      'Configured Azure OAuth identity management across mobile and web.',
      'Implemented secure chunked file uploads directly to Azure Blob Storage.',
      'Built role-based dashboard for verification workflows and member voting.'
    ]
  },
  {
    id: 'peoplesstore-portal-2025',
    title: 'Peoplesstore (Now Moorcart)',
    subTitle: 'E-commerce Platform & Admin',
    description: 'AI-assisted e-commerce buyer platform and back-office management system featuring voice search, typo-tolerant querying, and payment integrations.',
    productScope: 'An e-commerce marketplace platform (now transitioned to Moorcart.com) and comprehensive administrative back-office supporting real-time inventory management, order processing, and payment reconciliation.',
    contributions: [
      'Led frontend development using Next.js, React, TypeScript, Redux Toolkit, and Tailwind CSS.',
      'Integrated REST endpoints powered by FastAPI backend services for catalog search and order placement.',
      'Configured payment gateway integrations using Flutterwave and Seerbit checkout modules.',
      'Built UI modules for AI-powered typo-tolerant search and speech-to-text queries.'
    ],
    technologiesUsed: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'FastAPI', 'Tailwind CSS', 'Shadcn UI', 'Flutterwave', 'Seerbit'],
    troubleshootingFocus: [
      'Investigated asynchronous checkout failure states where payment webhook confirmations arrived before client redirect was completed, introducing state synchronization flags.',
      'Debugged speech-to-text audio permission rejections across varying mobile web environments, adding clear fallback input indicators.'
    ],
    liveUrl: 'https://www.peoplesstore.ng/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T17:04:13.763854Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756743255/Simplistic_Laptop_iphone_tablet_mockup_instagram_post_zvlx6r.png',
    tags: ['Next.js', 'TypeScript', 'Redux', 'FastAPI', 'Tailwind CSS', 'Flutterwave', 'Seerbit'],
    highlights: [
      'Developed AI search modules supporting typo tolerance and speech-to-text.',
      'Configured dual payment gateways with Flutterwave & Seerbit modules.',
      'Architected dynamic catalog navigation and administrative analytics.'
    ]
  },
  {
    id: 'jopiter-fashion-app-2025',
    title: 'Jopiter Fashion App',
    subTitle: 'Mobile App',
    description: 'Social commerce and visual fashion discovery mobile application published on Google Play Store, centered on creator feeds and engagement.',
    productScope: 'A native mobile social app for fashion creators and enthusiasts, featuring visual moodboards, social feeds, double-tap interactions, and commenting systems.',
    contributions: [
      'Engineered core user-facing features using React Native, Expo, and TypeScript.',
      'Constructed nested comment threads, interactive photo feeds, and user profile boards.',
      'Collaborated on Google Play Store production build and release lifecycle.'
    ],
    technologiesUsed: ['React Native', 'Expo', 'TypeScript', 'Redux', 'REST APIs'],
    troubleshootingFocus: [
      'Profiled deep feed scrolling using React Native performance monitor, resolving image re-rendering spikes by implementing FlatList memoization and windowSize tuning.',
      'Troubleshot asynchronous comment race conditions where rapid user submissions occasionally displayed out-of-order.'
    ],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.jopiter.jopiterio&hl=en',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T17:10:22.495988Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756741370/White_Green_Mobile_Mockup_Photo_Collage_Beauty_Facebook_Post_2_kuqib5.png',
    tags: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Mobile Debugging'],
    highlights: [
      'Built native interactive post feed, double-tap likes, and visual boards.',
      'Optimized FlatList item recycling for smooth 60fps scrolling performance.',
      'Successfully packaged and released onto the Google Play Store.'
    ]
  },
  {
    id: 'ncaa-datr-portal-2025',
    title: 'NCAA DATR Regulatory Portal',
    subTitle: 'Government Web Portal & Admin',
    description: 'Official public regulatory portal and administrative management system for the Nigeria Civil Aviation Authority Directorate of Air Transport Regulation.',
    productScope: 'A mission-critical governmental web portal and role-based administrative system facilitating air transport regulatory compliance, public announcements, and aviation documentation.',
    contributions: [
      'Built responsive public web portal and internal administrative management interface.',
      'Utilized Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, and Redux.',
      'Implemented secure role-based navigation guards and document viewing components.'
    ],
    technologiesUsed: ['Next.js', 'React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Shadcn UI', 'REST APIs'],
    troubleshootingFocus: [
      'Diagnosed and corrected authorization state desynchronization when administrative sessions expired during lengthy document review workflows.',
      'Investigated slow PDF preview rendering on low-bandwidth connections, introducing progressive loading indicators and asset optimization.'
    ],
    liveUrl: 'https://datr.ncaa.gov.ng/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2025-09-01T17:07:10.171929Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1756743658/Simplistic_Laptop_iphone_tablet_mockup_instagram_post_1_aioaqw.png',
    tags: ['Next.js', 'React', 'TypeScript', 'Redux', 'Tailwind CSS', 'Shadcn UI'],
    highlights: [
      'Constructed public regulatory portal and role-based administrative panels.',
      'Built secure document verification and regulatory announcement modules.',
      'Optimized data caching and component rendering for high stability.'
    ]
  },
  {
    id: 'delbott-logistics-2024',
    title: 'Delbott Logistics',
    subTitle: 'Mobile App',
    description: 'Mobile logistics and parcel delivery application for drivers, package routing, and real-time proof-of-delivery status.',
    productScope: 'A mobile delivery dispatch application designed for drivers to manage route manifests, log package delivery status, and capture proof of delivery.',
    contributions: [
      'Developed native mobile interface using React Native, TypeScript, and Redux.',
      'Implemented driver onboarding, authentication, and dispatch checklist workflows.',
      'Built responsive status tracking screens for dynamic delivery updates.'
    ],
    technologiesUsed: ['React Native', 'TypeScript', 'React', 'Redux', 'Tailwind CSS', 'REST APIs'],
    troubleshootingFocus: [
      'Handled mobile connectivity dropouts during active delivery routes, implementing local queue persistence to prevent lost delivery timestamps.',
      'Debugged touch responsiveness issues across lower-end Android target devices, refining gesture handlers.'
    ],
    liveUrl: '',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-20T08:34:19.577542Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1718872289/delbott_glrsyv.png',
    tags: ['React Native', 'TypeScript', 'Redux', 'Mobile Logistics'],
    highlights: [
      'Constructed driver onboarding and route dispatch checklist screens.',
      'Implemented offline status queuing for reliable proof-of-delivery sync.',
      'Ensured cross-device responsive UI scaling across Android devices.'
    ]
  },
  {
    id: 'tawol-client-manager-2024',
    title: 'Client Manager & Lead Certificate',
    subTitle: 'Enterprise Internal Platforms',
    description: 'Internal project management, lead CRM, and cryptographic certificate issuance and verification platforms developed at TAWOL Technologies.',
    productScope: 'A suite of internal enterprise web and mobile utilities built for TAWOL Technologies, including client relation management, certificate issuance pipelines, and verification dashboards.',
    contributions: [
      'Developed client management dashboards and role-based access control interfaces using React and Redux Toolkit.',
      'Built verification pipelines and automated PDF export engines for the Lead Certificate platform.',
      'Integrated REST APIs and contributed to CI/CD pipeline configuration and pull request reviews.'
    ],
    technologiesUsed: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Axios', 'CI/CD Pipelines'],
    troubleshootingFocus: [
      'Investigated client-side cryptographic hashing mismatches in certificate verification caused by inconsistent string encoding.',
      'Resolved browser memory exhaustion errors during bulk PDF certificate generation by streaming document batches.'
    ],
    liveUrl: 'http://sandbox.tawol-tech.com:3001/',
    codeUrl: 'https://github.com/codydematth',
    dateCreated: '2024-06-19T14:39:59.921797Z',
    image: 'https://res.cloudinary.com/db3oikvrl/image/upload/v1715292813/Screenshot_from_2024-05-09_23-01-31_zm0oq6.png',
    tags: ['React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Enterprise CRM'],
    highlights: [
      'Designed verification dashboards and cryptographic certificate issuance pipelines.',
      'Implemented role-based client management and lead tracking workflows.',
      'Contributed to automated CI/CD workflows and collaborative code reviews.'
    ]
  }
];

export const projects: Project[] = [...rawProjects].sort(
  (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
);
