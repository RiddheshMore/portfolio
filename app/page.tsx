"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Autonomous Vision Stack",
    description: "Human-aware perception suite for mobile robots in dynamic warehouse spaces.",
    year: "2026",
    tags: ["Computer Vision", "ROS", "Edge AI"],
    url: "https://github.com/RiddheshMore/steve_pan_tilt_controller",
  },
  {
    title: "Tender Analysis AI",
    description: "End-to-end tender intelligence platform with extraction, ranking, and summaries.",
    year: "2025",
    tags: ["NLP", "LLM", "Automation"],
    url: "https://github.com/RiddheshMore/Tender-Analysis-AI",
  },
  {
    title: "ROS Component Explorer",
    description: "Visual graph tooling for ROS runtime introspection and dependency diagnostics.",
    year: "2025",
    tags: ["Developer Tools", "ROS", "Data Viz"],
    url: "https://github.com/RiddheshMore/ros-component-explorer",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="page-shell">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10">
        <p className="text-sm font-semibold tracking-[0.2em] text-white/90">RIDDHESH MORE</p>
        <nav className="hidden items-center gap-6 text-sm text-white/70 sm:flex">
          <a href="#work" className="transition hover:text-white">
            Work
          </a>
          <a href="#services" className="transition hover:text-white">
            Services
          </a>
          <a href="#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 sm:px-10 sm:pb-20">
        <section className="hero-grid">
          <div className="glass-panel p-8 sm:p-10">
            <p className="badge">Product Designer + AI Engineer</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-6xl">
              I craft premium digital experiences for intelligent products.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-indigo-100/85">
              Portfolio-focused web experiences, robotics interfaces, and AI-first workflows with
              polished visuals and measurable user outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="cta-primary">
                Explore Work
              </a>
              <a href="#contact" className="cta-secondary">
                Let&apos;s Talk
              </a>
            </div>
          </div>
          <div className="glass-panel overflow-hidden p-7">
            <div className="stats-card">
              <p className="text-sm text-indigo-200">Recent impact</p>
              <p className="mt-2 text-4xl font-semibold text-white">48%</p>
              <p className="mt-2 text-sm text-indigo-100/80">
                Improvement in task completion for automation workflows.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <article className="mini-card">
                <p className="text-xl font-semibold text-white">12+</p>
                <p className="text-xs text-indigo-100/80">Enterprise projects</p>
              </article>
              <article className="mini-card">
                <p className="text-xl font-semibold text-white">8</p>
                <p className="text-xs text-indigo-100/80">Design systems shipped</p>
              </article>
              <article className="mini-card">
                <p className="text-xl font-semibold text-white">5+</p>
                <p className="text-xs text-indigo-100/80">Years building products</p>
              </article>
              <article className="mini-card">
                <p className="text-xl font-semibold text-white">24/7</p>
                <p className="text-xs text-indigo-100/80">Automation support</p>
              </article>
            </div>
          </div>
        </section>

        <motion.section
          id="work"
          className="glass-panel p-8 sm:p-10"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Case studies with outcomes</h2>
            </div>
            <a
              href="https://github.com/RiddheshMore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-100 transition hover:text-white"
            >
              View all repositories →
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                className="work-card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <p className="text-xs uppercase tracking-[0.12em] text-indigo-200">{project.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-indigo-100/80">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-medium text-white/90 hover:text-white"
                >
                  Open project →
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="services"
          className="grid gap-4 md:grid-cols-3"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <article className="glass-panel p-6">
            <p className="section-kicker">01</p>
            <h3 className="mt-2 text-xl font-semibold text-white">UX for AI Products</h3>
            <p className="mt-3 text-sm leading-6 text-indigo-100/80">
              Human-centered dashboards and interfaces for model-heavy workflows.
            </p>
          </article>
          <article className="glass-panel p-6">
            <p className="section-kicker">02</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Robotics Experience Design</h3>
            <p className="mt-3 text-sm leading-6 text-indigo-100/80">
              Operational tooling for monitoring, command workflows, and autonomous execution.
            </p>
          </article>
          <article className="glass-panel p-6">
            <p className="section-kicker">03</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Front-end Engineering</h3>
            <p className="mt-3 text-sm leading-6 text-indigo-100/80">
              Fast, animated, production-grade React experiences built for conversion.
            </p>
          </article>
        </motion.section>

        <motion.section
          id="contact"
          className="glass-panel p-8 text-center sm:p-10"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="section-kicker">Start a project</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Need a portfolio-grade product experience?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-indigo-100/85">
            I help founders and teams build bold, modern interfaces across AI and robotics domains.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:your.email@example.com" className="cta-primary">
              your.email@example.com
            </a>
            <a
              href="https://github.com/RiddheshMore"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              GitHub Profile
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
