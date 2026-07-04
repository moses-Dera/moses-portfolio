import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

async function main() {
  await prisma.skill.deleteMany({});
  
  await prisma.skill.createMany({
    data: [
      {
        order: 1,
        category: "System Architecture & Backend Engineering",
        description: "Architecting high-concurrency distributed systems and resilient microservices. I specialize in designing scalable RESTful APIs, implementing robust message queues, and optimizing complex database interactions to handle intensive data loads across enterprise platforms.",
        techStack: "Python, C++, TypeScript, JavaScript, HTML5, Solidity, FastAPI, Node.js, Next.js, PostgreSQL, MongoDB, Redis, Prisma"
      },
      {
        order: 2,
        category: "Cloud Infrastructure & DevOps",
        description: "Transitioning legacy applications into cost-optimized, zero-downtime serverless environments. I manage containerized architectures, orchestrate seamless CI/CD pipelines, and deploy highly available infrastructure on Google Cloud Platform and Cloudflare edge networks.",
        techStack: "AWS, Google Cloud, Docker, Nginx, Git, GitHub Actions, Cloudflare"
      },
      {
        order: 3,
        category: "Enterprise Security & Access Control",
        description: "Building strict security layers utilizing Zero Trust Network Access (ZTNA). I implement rigid role-based access control (RBAC), secure JWT authentication flows, and deploy mandatory API security headers to safeguard sensitive telemetry and user data.",
        techStack: "JWT, Zero Trust (ZTNA), RBAC, API Security"
      },
      {
        order: 4,
        category: "AI / LLM Integration",
        description: "Engineering intelligent workflows by integrating Large Language Models and AI toolchains. I build context-aware AI operations, predictive analysis features, and specialized RAG pipelines to automate complex business processes.",
        techStack: "OpenAI, LangChain, PyTorch, Hugging Face"
      }
    ]
  });

  console.log('Seeded skills successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
