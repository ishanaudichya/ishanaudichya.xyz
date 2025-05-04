import { Icons } from "@/components/icons";
import { GamepadIcon, HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Ishan Audichya",
  initials: "IA",
  url: "https://ishanaudichya.xyz",
  location: "Bangalore, India",
  locationLink: "https://www.google.com/maps/place/chennai",
  description:
    "Software Developer from India. I love building things and exploring tech. Active on Github.",
  summary:
    "I work at LegalForce Trademarkia as a Developer, I ve been persuing the dev stack for some time and love to make apps and doing interns at startups. I have a bachelors degree in computer science. As of right now I am trying to learn the T3 stack along with refining my system design concepts.",
  avatarUrl: "/me.png",
  skillCategories: [
    {
      name: "Languages",
      key: "languages"
    },
    {
      name: "Frontend",
      key: "frontend"
    },
    {
      name: "Backend",
      key: "backend"
    },
    {
      name: "DevOps",
      key: "devops"
    }
  ],
  skills: {
    languages: [
      "Typescript",
      "Javascript",
      "C/C++",
      "Python",
      "Java",
    ],
    frontend: [
      "React",
      "Next.js",
      "React Native",
      "TailwindCSS",
      "SWR",
    ],
    backend: [
      "Node.js",
      "WebSockets",
      "Express.js",
      "MongoDB",
      "Postgres",
      "Redis",
    ],
    devops: [
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Git",
    ]
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "https://blog.ishanaudichya.xyz", icon: NotebookIcon, label: "Blog" },
    { href: "/fun", icon: GamepadIcon, label: "Games" },
  ],
  contact: {
    email: "audichyaishan@gmail.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ishanaudichya",
        icon: Icons.github,
        
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ishan-audichya/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/audichyaishan/",
        icon: Icons.instagram,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/ishan_audichya",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@ishanaudichya4003",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Trademarkia",
      href: "https://trademarkia.com/",
      badges: [],
      location: "Chennai, TN",
      title: "Software Developer",
      logoUrl: "/trademarkia.jpeg",
      start: "October 2024",
      end: "Present",
      description:
        "Developed client-side product flows and created user flows for various applications. Worked on Signmarkia, a decentralized e-signature tool, where I handled deployments and contributed to system architecture. Additionally, I implemented features for the statistics tab for the admin dashboard.",
    },
    {
      company: "Disney Graphics",
      badges: [],
      href: "https://disneygraphics.com/",
      location: "Remote",
      title: "Full Stack Developer | Project Lead",
      logoUrl: "/disney.png",
      start: "May 2024",
      end: "August 2024",
      description:
        "Led the development of a comprehensive e-commerce platform, which included creating a client panel for managing transactions and user interactions. Implemented payment processing systems, established deployment pipelines, and managed cluster configurations to ensure seamless operations. Additionally, designed a centralized admin dashboard to oversee all aspects of the platform efficiently.",
    },
    {
      company: "E Connect Solutions Pvt. Ltd.",
      href: "https://www.e-connectsolutions.com/",
      badges: [],
      location: "Jaipur, Rajasthan",
      title: "DevOps Intern -> Frontend Intern",
      logoUrl: "/econ.png",
      start: "September 2023",
      end: "November 2023",
      description:
        "Developed 'RajSIMS' and 'XHRM' for the Rajasthan Government healthcare sector, role in creating responsive mobile applications, achieving a 95% user satisfaction rating across platforms. Enhanced application scalability by kubernetes and backend optimization with AWS, ",
    },
  ],
  education: [
    {
      school: "Vellore Institute of Technology, Vellore",
      href: "https://vit.ac.in",
      degree: "Bachelor's degree in CSE",
      logoUrl: "/vit.png",
      start: "2021",
      end: "present",
    },
    {
      school: "Delhi Public School, Udaipur",
      href: "https://dpsudaipur.com",
      degree: "Senior School Certificate (CBSE), Secondary School Examination-SSC (CBSE)",
      logoUrl: "/dps.png", 
      start: "2018",
      end: "2021",
    }
  ],
  projects: [
    {
      title: "EasyDeploy",
      href: "https://github.com/ishanaudichya/easydeploy",
      dates: "2024",
      active: true,
      description:
        "Scalable One click deployement using AWS services. It converts any git repository to react build in an EC2 instance uploads it to a S3 bucket and then serves the build using a reverse proxy server. Logs using REDIS and WEBSOCKETS",
      technologies: [
        "AWS EC2",
        "AWS S3",
        "Redis",
        "WebSocket",
        "React"
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/ishanaudichya/easydeploy",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Demo",
          href: "https://www.youtube.com/watch?v=-gj5By1Q3CU",
          icon: <Icons.youtube className="size-3" />,
        }
      ],
      video: "/video/easydeploy_480p.mp4",
      image: "",
    },
    {
      title: "Luganodes Ethereum Tracker",
      href: "https://github.com/ishanaudichya/luganodes-ethtrackerv2/",
      dates: "2024",
      active: true,
      description:
        "A robust and efficient system designed to monitor and record ETH deposits on the Beacon Deposit Contract. This project provides real-time tracking of Ethereum transactions, database storage, live logging, and instant notifications through Telegram.",
      technologies: [
        "Ethereum",
        "Blockchain",
        "Node.js",
        "Telegram API"
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/ishanaudichya/luganodes-ethtrackerv2/",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Demo",
          href: "https://youtu.be/0qb0-YHE7Qw",
          icon: <Icons.youtube className="size-3" />,
        }
      ],
      video: "/video/eth_480p.mp4",
      image: "",
    },
    {
      title: "VitSphere",
      href: "https://vitsphere.vercel.app/",
      dates: "2023",
      active: true,
      description:
        "Full-stack MERN project designed to create a thriving online community for VIT students. This platform allows students to connect, share posts, toggle between dark and light themes, and manage their sessions securely.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "TailwindCSS"
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/ishanaudichya/social-media",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Website",
          href: "https://vitsphere.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        }
      ],
      image: "",
      video: "/video/vit_480p.mp4",
    },
    {
      title: "Business ERP Software",
      href: "https://neonsports.vercel.app/",
      dates: "2023",
      active: true,
      description:
        "MERN Business Software simplifies inventory management and invoicing. Easily add, categorize, and edit products. Create professional invoices with real-time data sync and a powerful tech stack.",
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "TailwindCSS"
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/ishanaudichya/business-erp-mern",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Website",
          href: "https://neonsports.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        }
      ],
      video: "/video/erp_480p.mp4",
      image: "",
    }
  ],
 
} as const;
