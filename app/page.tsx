"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "steve_pan_tilt_controller",
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
    <div className="bg-slate-950 text-slate-100">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-14 sm:px-10">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Portfolio</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Riddhesh More
          </h1>
          <p className="mt-2 text-lg text-slate-300">Robotics / AI / ML Engineer</p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300">
            I build intelligent robotics systems and practical AI workflows. This portfolio highlights
            selected projects focused on autonomous systems, tooling, and applied machine learning.
          </p>
        </section>

        <motion.section
          id="about"
          className="rounded-3xl border border-white/10 bg-slate-900/40 p-8"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold text-white">About</h2>
          <p className="mt-4 leading-7 text-slate-300">
            I&apos;m passionate about combining robotics and AI to solve real-world problems. Replace
            this section with your detailed bio, experience, and achievements.
          </p>
        </motion.section>

        <motion.section
          id="projects"
          className="rounded-3xl border border-white/10 bg-slate-900/40 p-8"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold text-white">Projects</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.name}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
                whileHover={{ y: -5, boxShadow: "0 14px 30px rgba(8, 145, 178, 0.18)" }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <h3 className="text-lg font-medium text-white">{project.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-medium text-cyan-300 underline-offset-4 transition hover:text-cyan-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  View repository
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="rounded-3xl border border-white/10 bg-slate-900/40 p-8"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold text-white">Skills</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-lg border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-slate-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          id="contact"
          className="rounded-3xl border border-white/10 bg-slate-900/40 p-8"
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-4 leading-7 text-slate-300">
            Add your preferred contact details here. Placeholder email: your.email@example.com
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a
              href="https://github.com/RiddheshMore"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              GitHub
            </a>
            <a
              href="mailto:your.email@example.com"
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Email
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
