"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#moments", label: "Moments" },
  { href: "#skills", label: "Skills" },
];

const MOMENTS = [
  {
    image: "/projects/ros-industrial-conference.jpg",
    caption: "Presenting hybrid-retrieval RAG results",
    tag: "ROS-INDUSTRIAL CONFERENCE — STRASBOURG, NOV 2025",
  },
  {
    image: "/projects/lerobot-hackathon.jpg",
    caption: "Building with the LeRobot community",
    tag: "LEROBOT WORLDWIDE HACKATHON — AACHEN, JUN 2025",
  },
  {
    image: "/projects/javaland-volunteer.jpg",
    caption: "Volunteering on-site",
    tag: "JAVALAND — APR 2024 · 1 MO",
  },
];

type Project = {
  title: string;
  meta: string;
  category: string;
  description: string;
  from: string;
  to: string;
  url: string;
  image?: string;
  video?: string;
  poster?: string;
  gallery?: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Open-Vocabulary Mobile Manipulator",
    meta: "MULTIMODAL AI // MANIPULATION",
    category: "Computer Vision",
    description:
      "Multimodal pipeline fusing DeepSeek LLM reasoning with OWL-ViT & SAM3 VLMs for open-vocabulary pick-and-place on a Neobotix MPO-700 + UR5e arm, at the Humanoid Robotics Lab, University of Bonn.",
    from: "LANGUAGE COMMAND",
    to: "PICK & PLACE",
    url: "https://github.com/RiddheshMore/steve_command_grounding",
    image: "/projects/ovmm-steve.jpg",
    video: "/projects/command-grounding-demo.mp4",
    poster: "/projects/command-grounding-poster.jpg",
  },
  {
    title: "Tender Analysis AI",
    meta: "NLP // AUTOMATION",
    category: "NLP / LLM",
    description:
      "End-to-end tender intelligence platform with extraction, ranking, and summaries.",
    from: "DOCUMENT INTAKE",
    to: "LLM RANKING",
    url: "https://github.com/RiddheshMore/Tender-Analysis-AI",
  },
  {
    title: "ROS Component Explorer",
    meta: "DEVELOPER TOOLS // ROS",
    category: "Dev Tools",
    description:
      "Visual graph tooling for ROS runtime introspection and dependency diagnostics.",
    from: "ROS GRAPH",
    to: "DIAGNOSTICS UI",
    url: "https://github.com/RiddheshMore/ros-component-explorer",
    video: "/projects/ros-component-explorer-demo.mp4",
    poster: "/projects/ros-component-explorer-poster.jpg",
  },
  {
    title: "Control Plugin for Solo12 Quadruped",
    meta: "ROBOTICS // ROS2_CONTROL",
    category: "Robotics",
    description:
      "Mock hardware plugin built on ros2_control, validating joint trajectories and kinematics for a 12-DOF quadruped in RViz/Gazebo.",
    from: "JOINT COMMANDS",
    to: "VALIDATED TRAJECTORY",
    url: "https://github.com/RiddheshMore/solo_12",
    image: "/projects/solo12-rviz.jpg",
    gallery: ["/projects/solo12-gui.jpg"],
  },
  {
    title: "Modular AMR Exploration Platform",
    meta: "ROBOTICS // MOBILE PLATFORM",
    category: "Robotics",
    description:
      "Modular hex-cell mobile robot chassis built for autonomous exploration, with onboard compute and sensing across a reconfigurable frame.",
    from: "SENSOR SWEEP",
    to: "EXPLORATION MAP",
    url: "https://github.com/RiddheshMore/amr-project-roba_the_explorer",
    video: "/projects/amr-demo.mp4",
    poster: "/projects/amr-demo-poster.jpg",
  },
];

const FILTERS = ["All", "Computer Vision", "NLP / LLM", "Dev Tools", "Robotics"];

const SKILL_GROUPS = [
  {
    n: "01",
    title: "Robotics & Perception",
    tags: ["ROS1/2", "Gazebo", "IsaacSim", "ros2_control", "OpenCV"],
  },
  {
    n: "02",
    title: "AI / ML",
    tags: ["Python", "LangChain", "LLMs (DeepSeek)", "VLMs (OWL-ViT, SAM3)"],
  },
  {
    n: "03",
    title: "Retrieval & NLP",
    tags: ["RAG", "Hybrid Retrieval", "NLP", "Multi-Agent Systems"],
  },
  {
    n: "04",
    title: "Hardware & Control",
    tags: ["PLCs", "UR5e Arm", "Neobotix MPO-700", "Solo12 Quadruped"],
  },
  { n: "05", title: "DevOps & Tools", tags: ["Git, GitLab", "CI/CD", "n8n", "Linux"] },
  {
    n: "06",
    title: "Languages",
    tags: ["English (C1)", "German (B2)", "Hindi", "Marathi"],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CURRENT_ROLE_CONTRIBUTIONS = [
  {
    title: "Multi-tenant backend",
    desc: "FastAPI + Qdrant + SQLite, hard tenant-level isolation",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    title: "7-way OCR/VLM bake-off",
    desc: "Docling, GLM-OCR, Qwen3-VL, Granite-Vision on scanned agronomic PDFs",
    icon: <path d="M3 12h4l2-8 4 16 2-8h6" />,
  },
  {
    title: "Context-aware ingestion",
    desc: "Heading-aware chunking, ColBERT table retrieval, chart-to-CSV",
    icon: <path d="M4 6h16M4 12h10M4 18h13" />,
  },
  {
    title: "DeepEval regression suite",
    desc: "Faithfulness, Relevancy, Precision/Recall against golden set",
    icon: (
      <>
        <path d="M9 12l2 2 4-4" />
        <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
      </>
    ),
  },
  {
    title: "Adaptive top-k retrieval",
    desc: "Jina dense + BM25/42 sparse, cross-encoder rerank",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
  },
  {
    title: "LangGraph field agent",
    desc: "Live PostgreSQL queries over field, soil, NDVI data",
    icon: (
      <>
        <circle cx="5" cy="6" r="2.3" />
        <circle cx="19" cy="6" r="2.3" />
        <circle cx="12" cy="18" r="2.3" />
        <path d="M7 7.3L10.3 16M17 7.3L13.7 16M7.3 6h9.4" />
      </>
    ),
  },
  {
    title: "Production on EC2",
    desc: "vLLM, Ollama, systemd, GitHub-driven deploys",
    icon: <path d="M7 17a4 4 0 01-1-7.9 5 5 0 019.6-1.7A4.5 4.5 0 0117 17H7z" />,
  },
  {
    title: "Playwright coverage",
    desc: "Automated UI/UX and workflow testing",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9l6 3-6 3V9z" />
      </>
    ),
  },
  {
    title: "LangFuse tracing",
    desc: "Retrieval, tool calls, generation for latency debugging",
    icon: <path d="M3 12h3l2-7 4 14 2-9 2 5h5" />,
  },
  {
    title: "vLLM inference + quantization",
    desc: "Serving on vLLM, benchmarked AWQ/GPTQ/fp8 for latency vs. answer quality on the L4 GPU",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" opacity="0.55" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" opacity="0.3" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" opacity="0.15" />
      </>
    ),
  },
];

const CURRENT_ROLE_PROBLEMS_SOLVED = [
  { num: "A ≠ B", label: "Tenant A can never read Tenant B's documents — enforced at the query, not the UI" },
  { num: "↑", label: "Retrieval quality on scanned tables & charts" },
  { num: "Δ", label: "Manual RAG checks replaced by automated regression" },
  { num: "2→1", label: "Documents + live DB, one grounded answer" },
];

const CURRENT_ROLE_TECH_STACK = [
  {
    group: "Parsing & OCR",
    items: [
      {
        label: "Docling",
        extra: (
          <>
            <path d="M6 3h8l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
            <path d="M14 3v5h5" />
            <path d="M8.5 12.5h7M8.5 15.5h7M8.5 18.5h4" />
          </>
        ),
      },
      {
        label: "GLM (OCR)",
        extra: (
          <>
            <path d="M2 12s3.6-6.2 10-6.2S22 12 22 12s-3.6 6.2-10 6.2S2 12 2 12z" />
            <circle cx="12" cy="12" r="2.3" />
          </>
        ),
      },
    ],
  },
  {
    group: "Retrieval & storage",
    items: [
      {
        label: "Qdrant (vector DB)",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="m12 16.5 3.897-2.25v-4.5L12 7.5 8.103 9.75v4.5zM1.607 18 12 24l3.897-2.25v-4.5L12 19.5l-6.495-3.75v-7.5L12 4.5l6.495 3.75v15L22.393 21V6L12 0 1.607 6Z"
          />
        ),
      },
      {
        label: "Jina (dense embeddings)",
        extra: (
          <>
            <circle cx="6" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="13" cy="5.5" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="18" cy="10" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="8" cy="14" r="1.3" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="16.5" r="1.3" fill="currentColor" stroke="none" />
            <path d="M6 7.5l7-2 5 4.5M8 14l7.5 2.5" opacity="0.5" />
          </>
        ),
      },
      {
        label: "BM25/BM42",
        extra: (
          <>
            <circle cx="10" cy="10" r="6" />
            <path d="M14.5 14.5L20 20" />
          </>
        ),
      },
      {
        label: "Cross-encoder rerank",
        extra: (
          <>
            <path d="M4 8h9M4 16h9" />
            <path d="M9 5l4 3-4 3M19 13l-4 3 4 3" />
          </>
        ),
      },
      {
        label: "SQLite",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M21.678.521c-1.032-.92-2.28-.55-3.513.544a8.71 8.71 0 0 0-.547.535c-2.109 2.237-4.066 6.38-4.674 9.544.237.48.422 1.093.544 1.561a13.044 13.044 0 0 1 .164.703s-.019-.071-.096-.296l-.05-.146a1.689 1.689 0 0 0-.033-.08c-.138-.32-.518-.995-.686-1.289-.143.423-.27.818-.376 1.176.484.884.778 2.4.778 2.4s-.025-.099-.147-.442c-.107-.303-.644-1.244-.772-1.464-.217.804-.304 1.346-.226 1.478.152.256.296.698.422 1.186.286 1.1.485 2.44.485 2.44l.017.224a22.41 22.41 0 0 0 .056 2.748c.095 1.146.273 2.13.5 2.657l.155-.084c-.334-1.038-.47-2.399-.41-3.967.09-2.398.642-5.29 1.661-8.304 1.723-4.55 4.113-8.201 6.3-9.945-1.993 1.8-4.692 7.63-5.5 9.788-.904 2.416-1.545 4.684-1.931 6.857.666-2.037 2.821-2.912 2.821-2.912s1.057-1.304 2.292-3.166c-.74.169-1.955.458-2.362.629-.6.251-.762.337-.762.337s1.945-1.184 3.613-1.72C21.695 7.9 24.195 2.767 21.678.521m-18.573.543A1.842 1.842 0 0 0 1.27 2.9v16.608a1.84 1.84 0 0 0 1.835 1.834h9.418a22.953 22.953 0 0 1-.052-2.707c-.006-.062-.011-.141-.016-.2a27.01 27.01 0 0 0-.473-2.378c-.121-.47-.275-.898-.369-1.057-.116-.197-.098-.31-.097-.432 0-.12.015-.245.037-.386a9.98 9.98 0 0 1 .234-1.045l.217-.028c-.017-.035-.014-.065-.031-.097l-.041-.381a32.8 32.8 0 0 1 .382-1.194l.2-.019c-.008-.016-.01-.038-.018-.053l-.043-.316c.63-3.28 2.587-7.443 4.8-9.791.066-.069.133-.128.198-.194Z"
          />
        ),
      },
      {
        label: "PostgreSQL",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851Z"
          />
        ),
      },
    ],
  },
  {
    group: "Agent & inference",
    items: [
      {
        label: "LangGraph",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M5 19H10A5 5 0 115 14ZM19 14A5 5 0 1114 19H19ZM10 5A5 5 0 105 10V5ZM19 5V10A5 5 0 1014 5Z"
          />
        ),
      },
      {
        label: "Qwen (agent LLM)",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M23.919 14.545 20.817 9.17l1.47-2.544a.56.56 0 0 0 0-.566l-1.633-2.83a.57.57 0 0 0-.49-.283h-6.207L12.487.402a.57.57 0 0 0-.49-.284H8.732a.56.56 0 0 0-.49.284L5.139 5.775h-2.94a.56.56 0 0 0-.49.284L.077 8.887a.56.56 0 0 0 0 .567L3.18 14.83l-1.47 2.545a.56.56 0 0 0 0 .566l1.634 2.83a.57.57 0 0 0 .49.283h6.205l1.47 2.545a.57.57 0 0 0 .49.284h3.266a.57.57 0 0 0 .49-.284l3.104-5.375h2.94a.57.57 0 0 0 .49-.283l1.634-2.828a.55.55 0 0 0-.004-.568M8.733.686l1.634 2.828-1.634 2.828H21.8L20.164 9.17H7.425L5.63 6.06Zm1.306 19.801-6.205-.002 1.634-2.83h3.265L2.201 6.344h3.267q3.182 5.517 6.367 11.032zm10.124-5.66L18.53 12l-6.532 11.315-1.634-2.83c2.129-3.673 4.25-7.351 6.373-11.028h3.592l3.102 5.374Z"
          />
        ),
      },
      {
        label: "vLLM (inference)",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="m23.6 0-8.721 4.59L9.829 24h7.41zM9.83 24V5.142H.4Z"
          />
        ),
      },
      {
        label: "Ollama",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M16.361 10.26a.894.894 0 0 0-.558.47l-.072.148.001.207c0 .193.004.217.059.353.076.193.152.312.291.448.24.238.51.3.872.205a.86.86 0 0 0 .517-.436.752.752 0 0 0 .08-.498c-.064-.453-.33-.782-.724-.897a1.06 1.06 0 0 0-.466 0zm-9.203.005c-.305.096-.533.32-.65.639a1.187 1.187 0 0 0-.06.52c.057.309.31.59.598.667.362.095.632.033.872-.205.14-.136.215-.255.291-.448.055-.136.059-.16.059-.353l.001-.207-.072-.148a.894.894 0 0 0-.565-.472 1.02 1.02 0 0 0-.474.007Zm4.184 2c-.131.071-.223.25-.195.383.031.143.157.288.353.407.105.063.112.072.117.136.004.038-.01.146-.029.243-.02.094-.036.194-.036.222.002.074.07.195.143.253.064.052.076.054.255.059.164.005.198.001.264-.03.169-.082.212-.234.15-.525-.052-.243-.042-.28.087-.355.137-.08.281-.219.324-.314a.365.365 0 0 0-.175-.48.394.394 0 0 0-.181-.033c-.126 0-.207.03-.355.124l-.085.053-.053-.032c-.219-.13-.259-.145-.391-.143a.396.396 0 0 0-.193.032zm.39-2.195c-.373.036-.475.05-.654.086-.291.06-.68.195-.951.328-.94.46-1.589 1.226-1.787 2.114-.04.176-.045.234-.045.53 0 .294.005.357.043.524.264 1.16 1.332 2.017 2.714 2.173.3.033 1.596.033 1.896 0 1.11-.125 2.064-.727 2.493-1.571.114-.226.169-.372.22-.602.039-.167.044-.23.044-.523 0-.297-.005-.355-.045-.531-.288-1.29-1.539-2.304-3.072-2.497a6.873 6.873 0 0 0-.855-.031zm.645.937a3.283 3.283 0 0 1 1.44.514c.223.148.537.458.671.662.166.251.26.508.303.82.02.143.01.251-.043.482-.08.345-.332.705-.672.957a3.115 3.115 0 0 1-.689.348c-.382.122-.632.144-1.525.138-.582-.006-.686-.01-.853-.042-.57-.107-1.022-.334-1.35-.68-.264-.28-.385-.535-.45-.946-.03-.192.025-.509.137-.776.136-.326.488-.73.836-.963.403-.269.934-.46 1.422-.512.187-.02.586-.02.773-.002zm-5.503-11a1.653 1.653 0 0 0-.683.298C5.617.74 5.173 1.666 4.985 2.819c-.07.436-.119 1.04-.119 1.503 0 .544.064 1.24.155 1.721.02.107.031.202.023.208a8.12 8.12 0 0 1-.187.152 5.324 5.324 0 0 0-.949 1.02 5.49 5.49 0 0 0-.94 2.339 6.625 6.625 0 0 0-.023 1.357c.091.78.325 1.438.727 2.04l.13.195-.037.064c-.269.452-.498 1.105-.605 1.732-.084.496-.095.629-.095 1.294 0 .67.009.803.088 1.266.095.555.288 1.143.503 1.534.071.128.243.393.264.407.007.003-.014.067-.046.141a7.405 7.405 0 0 0-.548 1.873c-.062.417-.071.552-.071.991 0 .56.031.832.148 1.279L3.42 24h1.478l-.05-.091c-.297-.552-.325-1.575-.068-2.597.117-.472.25-.819.498-1.296l.148-.29v-.177c0-.165-.003-.184-.057-.293a.915.915 0 0 0-.194-.25 1.74 1.74 0 0 1-.385-.543c-.424-.92-.506-2.286-.208-3.451.124-.486.329-.918.544-1.154a.787.787 0 0 0 .223-.531c0-.195-.07-.355-.224-.522a3.136 3.136 0 0 1-.817-1.729c-.14-.96.114-2.005.69-2.834.563-.814 1.353-1.336 2.237-1.475.199-.033.57-.028.776.01.226.04.367.028.512-.041.179-.085.268-.19.374-.431.093-.215.165-.333.36-.576.234-.29.46-.489.822-.729.413-.27.884-.467 1.352-.561.17-.035.25-.04.569-.04.319 0 .398.005.569.04a4.07 4.07 0 0 1 1.914.997c.117.109.398.457.488.602.034.057.095.177.132.267.105.241.195.346.374.43.14.068.286.082.503.045.343-.058.607-.053.943.016 1.144.23 2.14 1.173 2.581 2.437.385 1.108.276 2.267-.296 3.153-.097.15-.193.27-.333.419-.301.322-.301.722-.001 1.053.493.539.801 1.866.708 3.036-.062.772-.26 1.463-.533 1.854a2.096 2.096 0 0 1-.224.258.916.916 0 0 0-.194.25c-.054.109-.057.128-.057.293v.178l.148.29c.248.476.38.823.498 1.295.253 1.008.231 2.01-.059 2.581a.845.845 0 0 0-.044.098c0 .006.329.009.732.009h.73l.02-.074.036-.134c.019-.076.057-.3.088-.516.029-.217.029-1.016 0-1.258-.11-.875-.295-1.57-.597-2.226-.032-.074-.053-.138-.046-.141.008-.005.057-.074.108-.152.376-.569.607-1.284.724-2.228.031-.26.031-1.378 0-1.628-.083-.645-.182-1.082-.348-1.525a6.083 6.083 0 0 0-.329-.7l-.038-.064.131-.194c.402-.604.636-1.262.727-2.04a6.625 6.625 0 0 0-.024-1.358 5.512 5.512 0 0 0-.939-2.339 5.325 5.325 0 0 0-.95-1.02 8.097 8.097 0 0 1-.186-.152.692.692 0 0 1 .023-.208c.208-1.087.201-2.443-.017-3.503-.19-.924-.535-1.658-.98-2.082-.354-.338-.716-.482-1.15-.455-.996.059-1.8 1.205-2.116 3.01a6.805 6.805 0 0 0-.097.726c0 .036-.007.066-.015.066a.96.96 0 0 1-.149-.078A4.857 4.857 0 0 0 12 3.03c-.832 0-1.687.243-2.456.698a.958.958 0 0 1-.148.078c-.008 0-.015-.03-.015-.066a6.71 6.71 0 0 0-.097-.725C8.997 1.392 8.337.319 7.46.048a2.096 2.096 0 0 0-.585-.041Zm.293 1.402c.248.197.523.759.682 1.388.03.113.06.244.069.292.007.047.026.152.041.233.067.365.098.76.102 1.24l.002.475-.12.175-.118.178h-.278c-.324 0-.646.041-.954.124l-.238.06c-.033.007-.038-.003-.057-.144a8.438 8.438 0 0 1 .016-2.323c.124-.788.413-1.501.696-1.711.067-.05.079-.049.157.013zm9.825-.012c.17.126.358.46.498.888.28.854.36 2.028.212 3.145-.019.14-.024.151-.057.144l-.238-.06a3.693 3.693 0 0 0-.954-.124h-.278l-.119-.178-.119-.175.002-.474c.004-.669.066-1.19.214-1.772.157-.623.434-1.185.68-1.382.078-.062.09-.063.159-.012Z"
          />
        ),
      },
    ],
  },
  {
    group: "Eval, serving & ops",
    items: [
      {
        label: "FastAPI",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M12 .0387C5.3729.0384.0003 5.3931 0 11.9988c-.001 6.6066 5.372 11.9628 12 11.9625 6.628.0003 12.001-5.3559 12-11.9625-.0003-6.6057-5.3729-11.9604-12-11.96m-.829 5.4153h7.55l-7.5805 5.3284h5.1828L5.279 18.5436q2.9466-6.5444 5.892-13.0896Z"
          />
        ),
      },
      {
        label: "DeepEval",
        extra: (
          <>
            <path d="M9 12l2 2 4-4" />
            <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
          </>
        ),
      },
      {
        label: "LangFuse",
        path: "M3 12h3l2-7 4 14 2-9 2 5h5",
      },
      {
        label: "Playwright",
        extra: (
          <path
            fill="currentColor"
            stroke="none"
            d="M23.996 7.462c-.056.837-.257 2.135-.716 3.85-.995 3.715-4.27 10.874-10.42 9.227-6.15-1.65-5.407-9.487-4.412-13.201.46-1.716.934-2.94 1.305-3.694.42-.853.846-.289 1.815.523.684.573 2.41 1.791 5.011 2.488 2.601.697 4.706.506 5.583.352 1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61-.433 1.618-.827 4.055-.632 6.426-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z"
          />
        ),
      },
      {
        label: "AWS EC2",
        path: "M7 17a4 4 0 01-1-7.9 5 5 0 019.6-1.7A4.5 4.5 0 0117 17H7z",
      },
    ],
  },
];

export default function Home() {
  const [filter, setFilter] = useState("All");
  const visibleProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="flex flex-col">
      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-black/8 bg-[var(--cream)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <a href="#top" className="text-base font-bold tracking-tight">
            Riddhesh More
          </a>
          <nav className="hidden items-center gap-7 sm:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>
          <motion.a
            href="#contact"
            className="btn-dark"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact
          </motion.a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="section-light">
        <motion.div
          className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Robotics &amp; AI
              <br />
              <span className="italic font-semibold text-black/55">Platform Engineer.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-black/65">
              Building production-grade robotics perception, ROS2 tooling, and applied
              AI/NLP systems for real-world autonomy.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="#work"
                className="btn-dark"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Work
              </motion.a>
              <span className="text-sm text-black/45">Explore case studies below</span>
            </div>
            <div className="mt-12 border-t border-black/8 pt-6">
              <p className="placeholder-note-light mb-3">TRUSTED STACK</p>
              <div className="flex flex-wrap gap-2">
                {["Python", "ROS1/2", "OpenCV", "LangChain", "Gazebo", "PLCs"].map(
                  (t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="overflow-hidden rounded-3xl border border-black/8">
              <img
                src="/hero-automatica.jpg"
                alt="Riddhesh More at automatica 2025, Munich"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="card-light p-5">
                <p className="text-sm text-black/55">Focus areas</p>
                <p className="mt-2 text-xl font-bold">Robotics + AI</p>
              </div>
              <div className="rounded-2xl bg-[var(--ink)] p-5 text-[#fdfdfb]">
                <p className="text-xl font-bold">5+</p>
                <p className="mt-1 text-xs text-white/70">years building systems</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        className="section-light"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="kicker">/ Who Am I</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Building robots that <span className="text-black/45">understand the world.</span>
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
            <div>
              <div className="overflow-hidden rounded-3xl border border-black/8">
                <img
                  src="/profile.jpg"
                  alt="Riddhesh More"
                  className="aspect-[4/3] w-full object-cover grayscale"
                />
              </div>
              <p className="mt-4 font-bold">Riddhesh More</p>
              <p className="text-sm text-black/55">Robotics &amp; AI Engineer</p>
            </div>
            <div>
              <p className="max-w-xl text-base leading-7 text-black/70">
                I&apos;m passionate about pushing the envelope of what&apos;s possible in
                robotics and AI. My work focuses on connecting motion planning, semantic
                reasoning, and 3D scene graphs &mdash; from ROS2 manipulation stacks to
                LLM/VLM-driven perception and RAG-based document intelligence, currently as
                an M.Sc. Autonomous Systems student at Hochschule Bonn-Rhein-Sieg.
              </p>
            </div>
          </div>

          <div className="mt-10 card-light p-6">
                <p className="eyebrow-mono" style={{ color: "oklch(0.6 0.15 145)" }}>
                  CURRENT ROLE
                </p>
                <p className="mt-2 text-lg font-bold">
                  AI-gronomist &mdash; Agentic RAG Platform for Precision Agriculture
                </p>
                <p className="text-sm text-black/55">
                  CinSOIL GmbH, Berlin (Remote) &middot; Jan 2026 &rarr; Present
                </p>
                <p className="mt-3 text-sm leading-6 text-black/60">
                  Developed an enterprise-grade multi-tenant Agentic RAG platform
                  enabling agronomists to query farm reports, soil analyses, satellite
                  imagery, and field data using natural language.
                </p>

                <div className="mt-5 space-y-4">
                  {CURRENT_ROLE_TECH_STACK.map((group) => (
                    <div key={group.group}>
                      <p className="eyebrow-mono text-black/45">{group.group}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {group.items.map((tech) => (
                          <span
                            key={tech.label}
                            className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-3 py-1.5 text-xs font-semibold text-black/70"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3.5 w-3.5 shrink-0"
                              style={{ color: "oklch(0.6 0.15 145)" }}
                            >
                              {tech.path && <path d={tech.path} />}
                              {tech.extra}
                            </svg>
                            {tech.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-black/10 bg-white/70 p-4">
                  <p className="eyebrow-mono text-black/55">agentic reasoning loop</p>
                  <div className="mt-3 rounded-lg border border-black/10 bg-white p-3">
                    <svg
                      viewBox="0 0 860 410"
                      className="h-auto w-full"
                      role="img"
                      aria-label="A central LangGraph ReAct agent reasons in a loop of up to ten steps, calling out to six tools — search knowledge base, get soil samples, get NDVI history, get season report, get hotspot summary, and get field trend — each returning results back to the agent, which then produces one grounded answer."
                    >
                      <defs>
                        <marker
                          id="arrow2"
                          viewBox="0 0 10 10"
                          refX="8"
                          refY="5"
                          markerWidth="6.5"
                          markerHeight="6.5"
                          orient="auto-start-reverse"
                        >
                          <path d="M0 0L10 5L0 10z" fill="#1f1f1f" />
                        </marker>
                      </defs>

                      <g fontFamily="ui-monospace, monospace" fontSize="11" fill="rgba(18,18,18,0.82)">
                        {/* tool nodes */}
                        <rect x="14" y="20" width="140" height="56" rx="9" fill="#eef3f1" stroke="#1f1f1f" strokeOpacity="0.25" />
                        <text x="84" y="42" textAnchor="middle" fontWeight="700">search_knowledge_base</text>
                        <text x="84" y="58" textAnchor="middle" opacity="0.6" fontSize="9.5">Qdrant + SQLite, hybrid</text>

                        <rect x="170" y="20" width="128" height="56" rx="9" fill="#fdfdfb" stroke="#1f1f1f" strokeOpacity="0.2" />
                        <text x="234" y="42" textAnchor="middle" fontWeight="700">get_soil_samples</text>
                        <text x="234" y="58" textAnchor="middle" opacity="0.6" fontSize="9.5">organic C, texture, N</text>

                        <rect x="314" y="20" width="128" height="56" rx="9" fill="#fdfdfb" stroke="#1f1f1f" strokeOpacity="0.2" />
                        <text x="378" y="42" textAnchor="middle" fontWeight="700">get_ndvi_history</text>
                        <text x="378" y="58" textAnchor="middle" opacity="0.6" fontSize="9.5">daily vegetation index</text>

                        <rect x="458" y="20" width="128" height="56" rx="9" fill="#fdfdfb" stroke="#1f1f1f" strokeOpacity="0.2" />
                        <text x="522" y="42" textAnchor="middle" fontWeight="700">get_season_report</text>
                        <text x="522" y="58" textAnchor="middle" opacity="0.6" fontSize="9.5">SOS→EOS diagnostics</text>

                        <rect x="602" y="20" width="128" height="56" rx="9" fill="#fdfdfb" stroke="#1f1f1f" strokeOpacity="0.2" />
                        <text x="666" y="42" textAnchor="middle" fontWeight="700">get_hotspot_summary</text>
                        <text x="666" y="58" textAnchor="middle" opacity="0.6" fontSize="9.5">low/high zones, %area</text>

                        <rect x="746" y="20" width="112" height="56" rx="9" fill="#fdfdfb" stroke="#1f1f1f" strokeOpacity="0.2" />
                        <text x="802" y="42" textAnchor="middle" fontWeight="700">get_field_trend</text>
                        <text x="802" y="58" textAnchor="middle" opacity="0.6" fontSize="9.5">multi-season slope</text>

                        {/* spokes: tool <-> agent, call + result */}
                        <line x1="84" y1="76" x2="330" y2="215" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.1" markerEnd="url(#arrow2)" markerStart="url(#arrow2)" />
                        <line x1="234" y1="76" x2="365" y2="215" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.1" markerEnd="url(#arrow2)" markerStart="url(#arrow2)" />
                        <line x1="378" y1="76" x2="405" y2="212" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.1" markerEnd="url(#arrow2)" markerStart="url(#arrow2)" />
                        <line x1="522" y1="76" x2="475" y2="212" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.1" markerEnd="url(#arrow2)" markerStart="url(#arrow2)" />
                        <line x1="666" y1="76" x2="515" y2="215" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.1" markerEnd="url(#arrow2)" markerStart="url(#arrow2)" />
                        <line x1="802" y1="76" x2="550" y2="215" stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.1" markerEnd="url(#arrow2)" markerStart="url(#arrow2)" />

                        {/* central agent node */}
                        <rect x="335" y="216" width="190" height="70" rx="12" fill="#f6ece1" stroke="#1f1f1f" strokeOpacity="0.4" strokeWidth="1.6" />
                        <text x="430" y="245" textAnchor="middle" fontWeight="800" fontSize="13">LangGraph ReAct agent</text>
                        <text x="430" y="264" textAnchor="middle" opacity="0.65" fontSize="10">reason → act → observe</text>
                        <text x="430" y="278" textAnchor="middle" opacity="0.65" fontSize="10">bounded to ≤10 steps</text>

                        {/* self-loop showing iteration */}
                        <path d="M395 216 C 395 190, 465 190, 465 216" fill="none" stroke="#1f1f1f" strokeOpacity="0.5" strokeWidth="1.3" markerEnd="url(#arrow2)" />
                        <text x="430" y="182" textAnchor="middle" opacity="0.55" fontSize="9.5">iterates until answer is grounded</text>

                        {/* down to answer */}
                        <line x1="430" y1="286" x2="430" y2="340" stroke="#1f1f1f" strokeOpacity="0.5" strokeWidth="1.6" markerEnd="url(#arrow2)" />
                        <rect x="330" y="344" width="200" height="52" rx="9" fill="#eef3f1" stroke="#1f1f1f" strokeOpacity="0.4" strokeWidth="1.6" />
                        <text x="430" y="366" textAnchor="middle" fontWeight="800">Grounded answer</text>
                        <text x="430" y="382" textAnchor="middle" opacity="0.6" fontSize="9.5">with citations back to source</text>
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="eyebrow-mono text-black/55">key contributions</p>
                  <div className="mt-3 grid gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10 sm:grid-cols-3">
                    {CURRENT_ROLE_CONTRIBUTIONS.map((item) => (
                      <div key={item.title} className="flex flex-col gap-2 bg-white/90 p-3.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-[19px] w-[19px]"
                          style={{ color: "oklch(0.65 0.16 45)" }}
                        >
                          {item.icon}
                        </svg>
                        <p className="text-xs leading-5 text-black/65">
                          <span className="font-semibold text-black">{item.title}</span> — {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="eyebrow-mono text-black/55">problems solved</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-4">
                    {CURRENT_ROLE_PROBLEMS_SOLVED.map((item) => (
                      <div
                        key={item.num}
                        className="rounded-lg p-3.5"
                        style={{ background: "oklch(0.6 0.15 145 / 0.1)" }}
                      >
                        <p className="font-mono text-lg font-semibold" style={{ color: "oklch(0.6 0.15 145)" }}>
                          {item.num}
                        </p>
                        <p className="mt-1.5 text-xs leading-5 text-black/60">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-lg border border-black/10 bg-white p-3">
                    <p className="text-xl font-bold">7</p>
                    <p className="text-xs text-black/55">OCR/VLM pipelines benchmarked</p>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white p-3">
                    <p className="text-xl font-bold">6</p>
                    <p className="text-xs text-black/55">tools the agent can call per query</p>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white p-3">
                    <p className="text-xl font-bold">≤10</p>
                    <p className="text-xs text-black/55">reasoning steps before it must answer</p>
                  </div>
                </div>
              </div>
              <a
                href="/docs/Riddhesh-More-CV.pdf"
                download
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold hover:bg-black/5"
              >
                Download CV &darr;
              </a>
        </div>
      </motion.section>

      {/* IMPACT */}
      <motion.section
        id="impact"
        className="section-dark"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="kicker-dark">/ Impact</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Delivering impact.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                stat: "76.67%",
                copy:
                  "Success@10 on hybrid RAG retrieval — beating a keyword-only baseline (70.66%) while also holding the lowest latency (23ms).",
                tag: "@ CINSOIL AI CHATBOT",
              },
              {
                stat: "3-Model Fusion",
                copy:
                  "An LLM (DeepSeek) plus two VLMs (OWL-ViT, SAM3) combined into one open-vocabulary pick-and-place pipeline on a Neobotix MPO-700 + UR5e arm.",
                tag: "@ OPEN-VOCAB MOBILE MANIPULATOR",
              },
              {
                stat: "7 Months",
                copy:
                  "R&D project building a multi-agent LangChain pipeline to extract and structure metadata from GitHub repositories.",
                tag: "@ FRAUNHOFER IPA",
              },
            ].map((m) => (
              <div key={m.tag} className="card-dark p-6">
                <p className="text-3xl font-extrabold" style={{ color: "var(--accent)" }}>
                  {m.stat}
                </p>
                <p className="mt-3 text-sm text-white/60">{m.copy}</p>
                <p className="eyebrow-mono mt-4 text-white/40">{m.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section
        id="experience"
        className="section-light"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:px-10 sm:py-24">
          <p className="kicker">/ Career Sequence</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Professional Experience
          </h2>
          <div className="timeline-line mx-auto mt-12 max-w-xl text-left">
            {[
              {
                role: "AI Engineer (Werkstudent)",
                company: "CinSOIL GmbH, Berlin (Remote)",
                dates: "01/2026 → Present",
                note: "Developed an AI chatbot with RAG and hybrid retrieval; deployed optimized AI models via CI/CD pipelines.",
              },
              {
                role: "Research Assistant (R&D Project)",
                company: "Fraunhofer IPA, Stuttgart",
                dates: "07/2025 → 12/2025",
                note: "Built a multi-agent pipeline using LangChain and LLMs to extract and structure metadata from GitHub repositories.",
              },
              {
                role: "Design Trainee",
                company: "Fixit Engineering, Mumbai",
                dates: "06/2022 → 11/2022",
                note: "Assisted in product execution after finalizing designs and prints; defined project requirements by collaborating with internal teams and external partners.",
              },
              {
                role: "Welding Engineering Trainee",
                company: "Larsen & Toubro Ltd, Mumbai",
                dates: "12/2018 → 05/2019",
                note: "Programmed an Impact Test Exemption Calculator with VBA; achieved a deposition rate of 48.4 kg/day with TIG overlay; organized seminars and training sessions on welding applications.",
              },
              {
                role: "Heating Air Conditioning Design Trainee",
                company: "Godrej & Boyce Mfg. Co. Ltd., Mumbai",
                dates: "06/2017 → 11/2017",
                note: "Learned about Daihatsu diesel generators and air conditioning; drafted the piping layout of the chiller system in AutoCAD; estimated the cost of air conditioning ducting.",
              },
            ].map((e) => (
              <div key={e.role} className="relative pb-8 pl-8 last:pb-2">
                <span className="timeline-dot absolute -left-[5px] top-1.5" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold">{e.role}</h3>
                  <p className="kicker text-sm">{e.dates}</p>
                </div>
                <p className="mt-1 text-sm font-semibold text-black/55">{e.company}</p>
                <p className="mt-1 text-sm leading-6 text-black/60">{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* WORK */}
      <motion.section
        id="work"
        className="section-dark"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-10 sm:py-24">
          <p className="kicker-dark">/ Engineering</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Engineering Showcases
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`pill ${filter === f ? "pill-active" : "pill-inactive"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
            {visibleProjects.map((p) => (
              <motion.a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-dark flex flex-col p-6"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                {(p.video || p.image) && (
                  <div className="-mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
                    {p.video ? (
                      <video
                        src={p.video}
                        poster={p.poster}
                        className="aspect-video w-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="none"
                      />
                    ) : (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="aspect-video w-full object-cover"
                      />
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between gap-3">
                  <div className="pipeline-node">{p.from}</div>
                  <div className="h-px flex-1 border-t border-dashed" style={{ borderColor: "var(--accent)" }} />
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                  <div className="pipeline-node">{p.to}</div>
                </div>
                <p className="eyebrow-mono mt-6" style={{ color: "var(--accent)" }}>
                  {p.meta}
                </p>
                <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">{p.description}</p>
                {p.gallery && (
                  <div className={`mt-4 grid gap-2 ${p.gallery.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {p.gallery.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${p.title} detail`}
                        className="aspect-video w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* MOMENTS */}
      <motion.section
        id="moments"
        className="section-light"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="kicker">/ Along the way</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Moments.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {MOMENTS.map((m) => (
              <div key={m.tag} className="card-light overflow-hidden">
                <img src={m.image} alt={m.caption} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <p className="text-sm font-semibold">{m.caption}</p>
                  <p className="eyebrow-mono mt-2 text-black/40">{m.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section
        id="skills"
        className="section-light"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <p className="kicker">/ Stack</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
            The toolbox.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title} className="card-light p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{g.title}</h3>
                  <span className="eyebrow-mono" style={{ color: "oklch(0.6 0.15 145)" }}>
                    {g.n}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="section-dark"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="eyebrow-mono inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5" style={{ color: "var(--accent)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                Open to opportunities
              </span>
              <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Let&apos;s build
                <br />
                something.
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/65">
                Reach out for robotics engineering, applied AI/NLP work, or full-stack
                collaboration.
              </p>
              <div className="mt-10 flex flex-col gap-5">
                <div>
                  <p className="field-label">Primary email</p>
                  <a
                    href="mailto:riddheshmore27@gmail.com"
                    className="mt-1 inline-block text-lg font-semibold hover:underline"
                  >
                    riddheshmore27@gmail.com
                  </a>
                </div>
                <div>
                  <p className="field-label">Location</p>
                  <p className="mt-1 text-lg font-semibold">Bonn, Germany</p>
                </div>
                <div>
                  <p className="field-label">GitHub</p>
                  <a
                    href="https://github.com/RiddheshMore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-lg font-semibold hover:underline"
                  >
                    github.com/RiddheshMore
                  </a>
                </div>
                <div>
                  <p className="field-label">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/riddheshmore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-lg font-semibold hover:underline"
                  >
                    linkedin.com/in/riddheshmore
                  </a>
                </div>
              </div>
            </div>

            <form
              className="card-dark p-7 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const subject = encodeURIComponent(String(data.get("subject") || "Portfolio inquiry"));
                const body = encodeURIComponent(
                  `From: ${data.get("name")} (${data.get("email")})\n\n${data.get("message")}`,
                );
                window.location.href = `mailto:riddheshmore27@gmail.com?subject=${subject}&body=${body}`;
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label" htmlFor="name">
                    Name
                  </label>
                  <input id="name" name="name" required className="field-input mt-2" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="field-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="field-input mt-2"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label className="field-label" htmlFor="subject">
                  Subject
                </label>
                <input id="subject" name="subject" className="field-input mt-2" placeholder="Project inquiry" />
              </div>
              <div className="mt-5">
                <label className="field-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="field-textarea mt-2 resize-none"
                  placeholder="Tell me about the project..."
                />
              </div>
              <motion.button
                type="submit"
                className="btn-accent mt-6 w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message &rarr;
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>

      <footer className="section-dark border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs text-white/40 sm:px-10">
          &copy; {new Date().getFullYear()} Riddhesh More
        </div>
      </footer>
    </div>
  );
}
