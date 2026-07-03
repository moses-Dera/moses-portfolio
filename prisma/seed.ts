import "dotenv/config";
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
}).$extends(withAccelerate());

const projects = [
  {
    name: 'TaskFlow Backend API',
    description: 'Enterprise-grade REST API for task management with JWT authentication, real-time messaging, role-based access control, file management, and professional email integration.',
    techStack: 'Node.js,Express.js,MongoDB,JWT,Nodemailer',
    link: 'https://github.com/moses-Dera/Task-Manger-backend',
    image: 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331217/t2_e8rdux.png',
    images: ['https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331218/t1_foxn6g.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331217/t2_e8rdux.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331217/t3_vhad9o.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331218/t4_ym8li6.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331218/t5_zfgyty.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331217/6_alk77c.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766331219/t7_qrh2qd.png'],
    content: `## Architectural Overview

TaskFlow is engineered as a highly concurrent RESTful backend service designed to handle complex task management workflows at scale. The core challenge was building a system capable of real-time state synchronization while maintaining strict Role-Based Access Control (RBAC) across distributed teams.

### Core System Design
The architecture is built on a **Node.js/Express.js** foundation, utilizing **MongoDB** for flexible, document-based data persistence. This allows for rapid iteration of task schemas without painful migrations.

*   **Authentication & Security**: Implemented a stateless security model using **JWT (JSON Web Tokens)**. Access tokens are short-lived, with secure HTTP-only refresh token rotation to mitigate XSS and CSRF vectors.
*   **Role-Based Access Control**: Middleware interceptors parse JWT payloads and validate permissions against a strict RBAC matrix before controller execution.
*   **Asynchronous Processing**: Integrated **Nodemailer** for critical path alerts (e.g., password resets, task assignments). Email dispatch is decoupled from the main request-response cycle to ensure low API latency.
*   **Data Integrity**: Utilized Mongoose middleware for pre/post save hooks, ensuring cascading deletes (e.g., deleting a project automatically purges associated tasks) to maintain database normalization and prevent orphan records.

## Technical Interfaces
The API is fully documented and structured following REST standards, ensuring predictable resource manipulation and HTTP status codes.

`
  },
  {
    name: 'Mace Platform',
    description: 'AI-powered social media automation platform that intelligently schedules and automates posting to Twitter/X and Facebook. Features intelligent content scheduling and multi-platform social media management.',
    techStack: 'Node.js,Express,JavaScript,React,OAuth 2.0,AI Automation',
    link: 'https://github.com/moses-Dera/mace-backend',
    image: 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766330228/mace5_mwnb5j.png',
    images: ['https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766332570/mace7_ywobij.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766330226/mace1_lrcqmm.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766330226/mace2_avdgtr.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766330226/mace3_zkulni.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766330226/mace4_wmmyc5.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766330227/mace6_cabayc.png'],
    content: `## The Automation Engine

The Mace Platform bridges the gap between AI content generation and multi-platform social media distribution. The primary engineering challenge was managing volatile third-party API rate limits and secure OAuth token lifecycles across diverse platforms (Twitter/X, Facebook).

### System Architecture
The platform operates on a decentralized frontend-backend model. The backend serves as the orchestration layer, handling OAuth handshakes, AI prompt generation, and scheduled dispatching.

*   **OAuth 2.0 Identity Management**: Built a robust state-machine for OAuth 2.0 flows. The system securely encrypts and stores access/refresh tokens, automatically handling token renewal prior to scheduled post dispatches.
*   **AI Integration Pipeline**: Integrated LLM APIs to generate context-aware social media posts. The pipeline includes a sanitization step to ensure generated content adheres to platform-specific character limits and content policies.
*   **Distributed Scheduling**: Implemented a CRON-based scheduling system. Posts are queued in the database with specific dispatch timestamps. A worker process polls the queue and executes API calls, implementing exponential backoff for failed network requests.
*   **Frontend Client**: The React frontend consumes the internal API, providing users with a unified dashboard to manage connected accounts, view the dispatch queue, and review AI-generated content.

## System Interfaces
The following views demonstrate the unified dashboard and the seamless flow from AI generation to platform scheduling.

`
  },
  {
    name: 'AI-Powered Health Prediction System',
    description: 'AI-driven health prediction application with interactive user experience, modern UI components, and responsive design for managing health data.',
    techStack: 'React,TypeScript,Vite,Tailwind CSS,shadcn-ui',
    link: 'https://tobex.com.ng/hms',
    image: 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766328362/health1_dhwzzt.png',
    images: ['https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766328362/health1_dhwzzt.png','https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766328362/health2_hml0lp.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766328362/health6_wdtpd3.png', 'https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766328363/health4_cmzptk.png'],
    content: `## Frontend Architecture & ML Integration

This project focuses on translating complex Machine Learning predictive models into an intuitive, accessible frontend interface. The architecture prioritizes client-side performance, strict type safety, and a premium user experience.

### Architectural Decisions
Built utilizing **Vite** for rapid HMR and optimized production builds, the application leverages **React** and **TypeScript** to ensure deterministic rendering and prevent runtime type errors when parsing complex health datasets.

*   **Component Engineering**: Adopted **shadcn/ui** and **Tailwind CSS** to construct a highly reusable, accessible (a11y-compliant) component library. This allowed for the rapid development of complex data input forms without sacrificing design consistency.
*   **State Management**: Utilized React Context and custom hooks to manage the multi-step prediction funnel. Health data is aggregated in memory and validated against strict Zod schemas before being transmitted to the AI prediction backend.
*   **Data Visualization**: The results from the prediction engine are parsed and rendered into dynamic, easy-to-understand visual indicators, ensuring users can immediately interpret their health risk vectors.
*   **Performance Optimization**: Implemented lazy loading for heavy visualization components and memoized complex calculations to maintain a consistent 60fps interaction rate, even on low-end mobile devices.

## Dashboard Interfaces
Below are the interactive interfaces designed to simplify the collection of health metrics and the presentation of predictive analysis.

`
  },
];

async function main() {
  console.log('Seeding database...');
  // Delete existing to avoid duplicates if re-seeding
  await prisma.project.deleteMany({});
  
  for (const p of projects) {
    await prisma.project.create({
      data: {
        title: p.name,
        description: p.description,
        coverImage: p.image,
        repoUrl: p.link.includes('github') ? p.link : null,
        liveUrl: !p.link.includes('github') ? p.link : null,
        techStack: p.techStack,
        content: p.content + p.images.map(img => `![Screenshot](${img})`).join('\n\n'),
      }
    });
  }
  console.log('Seeding complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
