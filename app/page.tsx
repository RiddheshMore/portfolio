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
  "Architected a secure multi-tenant RAG backend using FastAPI, Qdrant, and SQLite with strict tenant-level data isolation.",
  "Benchmarked 7 OCR/VLM pipelines (Docling, GLM-OCR, Qwen3-VL, Granite-Vision, etc.) for scanned agronomic PDFs, tables, and charts.",
  "Designed ingestion with contextual embeddings, heading-aware chunking, ColBERT table retrieval, and chart-to-CSV extraction.",
  "Built a DeepEval framework for Faithfulness, Answer Relevancy, Contextual Precision, and Recall with golden dataset regression testing.",
  "Implemented adaptive Top-K hybrid retrieval using Jina embeddings, BM25/BM42, cross-encoder reranking, and parent-table reconstruction.",
  "Developed LangGraph agent workflows for live PostgreSQL queries over field, soil, and NDVI data.",
  "Deployed production services on AWS EC2 with vLLM, Ollama, systemd, and GitHub-based deployments.",
  "Created custom Claude Code skills for systematic debugging on EC2.",
  "Used Playwright for automated UI/UX and workflow testing.",
  "Implemented LangFuse tracing (retrieval, tool-calls, generation) for latency and tool-routing debugging.",
];

const CURRENT_ROLE_PROBLEMS_SOLVED = [
  "Eliminated cross-tenant data leakage through end-to-end tenant isolation.",
  "Improved retrieval quality for complex scanned PDFs with long tables and charts.",
  "Replaced manual RAG validation with automated evaluation and regression testing.",
  "Enabled grounded AI responses across unstructured documents and live agricultural databases.",
];

const CURRENT_ROLE_TECH_STACK = [
  { icon: "FA", label: "FastAPI" },
  { icon: "QD", label: "Qdrant" },
  { icon: "SQ", label: "SQLite" },
  { icon: "LG", label: "LangGraph" },
  { icon: "PG", label: "PostgreSQL" },
  { icon: "DE", label: "DeepEval" },
  { icon: "JL", label: "Jina" },
  { icon: "BM", label: "BM25/BM42" },
  { icon: "CE", label: "Cross-Encoder" },
  { icon: "LF", label: "LangFuse" },
  { icon: "VV", label: "vLLM" },
  { icon: "OL", label: "Ollama" },
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
        viewport={{ once: true, amount: 0.25 }}
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
              <div className="mt-8 card-light p-6">
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

                <div className="mt-5">
                  <p className="eyebrow-mono text-black/55">tech stack</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CURRENT_ROLE_TECH_STACK.map((tech) => (
                      <span
                        key={tech.label}
                        className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-3 py-1.5 text-xs font-semibold text-black/70"
                      >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ink)] text-[10px] font-bold text-white">
                          {tech.icon}
                        </span>
                        {tech.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-black/10 bg-white/70 p-4">
                  <p className="eyebrow-mono text-black/55">agentic reasoning loop</p>
                  <div className="mt-3 rounded-lg border border-black/10 bg-white p-3">
                    <svg
                      viewBox="0 0 640 250"
                      className="h-auto w-full"
                      role="img"
                      aria-label="Agentic reasoning loop from farm reports and PDFs through hybrid retrieval and agents to grounded agronomy answers"
                    >
                      <defs>
                        <marker
                          id="arrow"
                          markerWidth="8"
                          markerHeight="8"
                          refX="7"
                          refY="4"
                          orient="auto"
                        >
                          <path d="M0,0 L8,4 L0,8 z" fill="#1f1f1f" />
                        </marker>
                      </defs>
                      <rect
                        x="30"
                        y="92"
                        width="175"
                        height="66"
                        rx="14"
                        fill="#fdfdfb"
                        stroke="#1f1f1f"
                        strokeOpacity="0.2"
                      />
                      <rect
                        x="235"
                        y="52"
                        width="175"
                        height="66"
                        rx="14"
                        fill="#fdfdfb"
                        stroke="#1f1f1f"
                        strokeOpacity="0.2"
                      />
                      <rect
                        x="235"
                        y="132"
                        width="175"
                        height="66"
                        rx="14"
                        fill="#fdfdfb"
                        stroke="#1f1f1f"
                        strokeOpacity="0.2"
                      />
                      <rect
                        x="440"
                        y="92"
                        width="175"
                        height="66"
                        rx="14"
                        fill="#fdfdfb"
                        stroke="#1f1f1f"
                        strokeOpacity="0.2"
                      />
                      <path
                        d="M205 125 H225"
                        stroke="#1f1f1f"
                        strokeOpacity="0.45"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      <path
                        d="M410 85 H430"
                        stroke="#1f1f1f"
                        strokeOpacity="0.45"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      <path
                        d="M410 165 H430"
                        stroke="#1f1f1f"
                        strokeOpacity="0.45"
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                      <path
                        d="M525 158 C525 228, 120 228, 120 165"
                        fill="none"
                        stroke="#1f1f1f"
                        strokeOpacity="0.28"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        markerEnd="url(#arrow)"
                      />
                      <text
                        x="118"
                        y="118"
                        textAnchor="middle"
                        style={{ fontSize: "12px", fill: "rgba(18,18,18,0.75)", fontWeight: 700 }}
                      >
                        Farm Reports + PDFs
                      </text>
                      <text
                        x="322"
                        y="78"
                        textAnchor="middle"
                        style={{ fontSize: "12px", fill: "rgba(18,18,18,0.75)", fontWeight: 700 }}
                      >
                        Hybrid Retrieval
                      </text>
                      <text
                        x="322"
                        y="158"
                        textAnchor="middle"
                        style={{ fontSize: "12px", fill: "rgba(18,18,18,0.75)", fontWeight: 700 }}
                      >
                        Agents
                      </text>
                      <text
                        x="525"
                        y="118"
                        textAnchor="middle"
                        style={{ fontSize: "12px", fill: "rgba(18,18,18,0.75)", fontWeight: 700 }}
                      >
                        Grounded Agronomy Answers
                      </text>
                      <text
                        x="322"
                        y="242"
                        textAnchor="middle"
                        style={{ fontSize: "11px", fill: "rgba(18,18,18,0.55)" }}
                      >
                        Continuous retrieval & evaluation feedback loop
                      </text>
                    </svg>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="eyebrow-mono text-black/55">key contributions</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {CURRENT_ROLE_CONTRIBUTIONS.map((item) => (
                      <div key={item} className="rounded-lg border border-black/10 bg-white/75 p-3">
                        <p className="text-sm leading-6 text-black/65">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="eyebrow-mono text-black/55">problems solved</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {CURRENT_ROLE_PROBLEMS_SOLVED.map((item) => (
                      <div key={item} className="rounded-lg border border-black/10 bg-white/75 p-3">
                        <p className="text-sm leading-6 text-black/65">{item}</p>
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
                    <p className="text-xl font-bold">10+</p>
                    <p className="text-xs text-black/55">major platform contributions</p>
                  </div>
                  <div className="rounded-lg border border-black/10 bg-white p-3">
                    <p className="text-xl font-bold">4</p>
                    <p className="text-xs text-black/55">core problems solved</p>
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
          </div>
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
