"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "Steve Pan Tilt Controller",
    description:
      "ROS-based pan-tilt controller for camera/sensor actuation and motion experiments.",
    tags: ["Python", "ROS", "Robotics"],
    url: "https://github.com/RiddheshMore/steve_pan_tilt_controller",
  },
  {
    name: "Tender-Analysis-AI",
    description:
      "AI-assisted tender analysis workflow for extracting and summarizing key bid insights.",
    tags: ["Python", "AI", "NLP"],
    url: "https://github.com/RiddheshMore/Tender-Analysis-AI",
  },
  {
    name: "ros-component-explorer",
    description:
      "Toolkit for exploring ROS components, dependencies, and runtime interactions.",
    tags: ["Python", "ROS", "Developer Tools"],
    url: "https://github.com/RiddheshMore/ros-component-explorer",
  },
  {
    name: "omnidoc-parser-benchmark",
    description:
      "Benchmark suite to compare document parser quality and performance across datasets.",
    tags: ["Python", "Benchmarking", "Document AI"],
    url: "https://github.com/RiddheshMore/omnidoc-parser-benchmark",
  },
  {
    name: "steve_command_grounding",
    description:
      "Command-grounding pipeline to map natural-language instructions to robot actions.",
    tags: ["Python", "Robotics", "LLM"],
    url: "https://github.com/RiddheshMore/steve_command_grounding",
  },
];

const skills = [
  "Python",
  "ROS",
  "Machine Learning",
  "NLP",
  "Computer Vision",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
];

const sectionMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <p className="text-sm font-semibold tracking-wide">Riddhesh More</p>
          <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
            <a href="#about" className="transition hover:text-slate-900">
              About
            </a>
            <a href="#projects" className="transition hover:text-slate-900">
              Work
            </a>
            <a href="#contact" className="transition hover:text-slate-900">
              Contact
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-14 sm:px-10 sm:py-20">
        <section className="rounded-4xl border border-slate-200 bg-slate-50 p-8 sm:p-12">
          <p className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">
            Robotics • AI • ML
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Building practical intelligent systems for real-world automation.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
            I design and ship robotics and AI products—from motion control and command grounding
            to document intelligence and benchmark tooling.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Get in touch
            </a>
          </div>
        </section>

        <motion.section
          id="about"
          className="grid gap-8 md:grid-cols-[1.2fr_1fr]"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">About</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              I focus on applied AI that actually ships.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              I work at the intersection of robotics, machine learning, and product engineering to
              build reliable systems that are useful in production environments.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">Core capabilities</h3>
            <ul className="mt-4 grid gap-2 text-sm text-slate-600">
              {skills.map((skill) => (
                <li key={skill} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">Work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Selected projects
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.name}
                className="rounded-3xl border border-slate-200 bg-white p-6"
                whileHover={{ y: -4, boxShadow: "0 14px 30px rgba(15, 23, 42, 0.1)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center text-sm font-medium text-slate-900 underline-offset-4 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  Open repository
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="rounded-4xl border border-slate-200 bg-slate-50 p-8 sm:p-10"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            Let&apos;s build something meaningful.
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-slate-600">
            Reach out for collaboration on robotics platforms, AI feature development, and applied
            machine learning products.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/RiddheshMore"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              GitHub
            </a>
            <a
              href="mailto:your.email@example.com"
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Email
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
