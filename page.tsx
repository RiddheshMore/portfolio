"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#impact", label: "Impact" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
];

const PROJECTS = [
  {
    title: "Autonomous Vision Stack",
    meta: "COMPUTER VISION // ROBOTICS",
    category: "Computer Vision",
    description:
      "Human-aware perception suite for mobile robots in dynamic warehouse spaces.",
    from: "SENSOR INPUT",
    to: "PERCEPTION MODEL",
    url: "https://github.com/RiddheshMore/steve_pan_tilt_controller",
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
  },
];

const FILTERS = ["All", "Computer Vision", "NLP / LLM", "Dev Tools"];

const SKILL_GROUPS = [
  {
    n: "01",
    title: "Robotics & Perception",
    tags: ["ROS2", "Computer Vision", "Sensor Fusion", "Edge AI"],
  },
  {
    n: "02",
    title: "AI / ML",
    tags: ["PyTorch", "TensorFlow", "LangChain", "NLP"],
  },
  { n: "03", title: "Backend", tags: ["Python", "Node.js", "REST APIs"] },
  {
    n: "04",
    title: "Cloud & DevOps",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  { n: "05", title: "Data", tags: ["PostgreSQL", "SQL", "Power BI"] },
  { n: "06", title: "Tools", tags: ["Git", "Linux", "VS Code"] },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

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
                {["Python", "ROS2", "PyTorch", "TensorFlow", "Docker", "Kubernetes"].map(
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
                src="/profile.jpg"
                alt="Riddhesh More"
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
                I&apos;m a robotics and AI engineer working across perception, NLP, and
                developer tooling &mdash; building systems that help robots and automation
                pipelines operate reliably in the real world, from ROS2 navigation stacks
                to LLM-driven document intelligence.
              </p>
              <div className="mt-8 placeholder-card p-6">
                <p className="placeholder-note-light">// Add your role history here</p>
                <p className="mt-2 text-sm text-black/45">
                  This card is a placeholder &mdash; replace with your current role, company,
                  and years active.
                </p>
              </div>
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="placeholder-card-dark p-6">
                <p className="text-4xl font-extrabold" style={{ color: "var(--accent)" }}>
                  &mdash;
                </p>
                <p className="mt-3 text-sm text-white/60">
                  Add an impact metric (e.g. % improvement, users served, uptime).
                </p>
                <p className="placeholder-note mt-4">@ PROJECT NAME</p>
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
            <div className="relative pb-2 pl-8">
              <span className="timeline-dot absolute -left-[5px] top-1.5" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold">Add your current role</h3>
                <p className="kicker text-sm">MM/YYYY &rarr; Present</p>
              </div>
              <p className="placeholder-note-light mt-1">// Company name &mdash; edit this entry</p>
            </div>
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
              </motion.a>
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
                  <p className="mt-1 text-lg font-semibold">your.email@example.com</p>
                  <p className="placeholder-note mt-0.5">// add your real email</p>
                </div>
                <div>
                  <p className="field-label">Location</p>
                  <p className="mt-1 text-lg font-semibold">Add your location</p>
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
                  <p className="mt-1 text-lg font-semibold text-white/50">Add your LinkedIn URL</p>
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
                window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
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
