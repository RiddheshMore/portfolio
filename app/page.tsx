"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Project = {
  name: string;
  description: string;
  tags: string[];
  url: string;
  image?: string;
  status?: "Live" | "Prototype" | "In Progress";
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "steve_pan_tilt_controller",
    description:
      "ROS-based pan-tilt controller for camera/sensor actuation and motion experiments.",
    tags: ["Python", "ROS", "Robotics"],
    status: "Live",
    featured: true,
    image:
      "linear-gradient(135deg, rgba(34,211,238,0.35), rgba(14,165,233,0.12)), radial-gradient(circle at 10% 20%, rgba(16,185,129,0.32), transparent 45%)",
    url: "https://github.com/RiddheshMore/steve_pan_tilt_controller",
  },
  {
    name: "Tender-Analysis-AI",
    description:
      "AI-assisted tender analysis workflow for extracting and summarizing key bid insights.",
    tags: ["Python", "AI", "NLP"],
    status: "Prototype",
    image:
      "linear-gradient(135deg, rgba(168,85,247,0.35), rgba(56,189,248,0.14)), radial-gradient(circle at 80% 10%, rgba(236,72,153,0.28), transparent 50%)",
    url: "https://github.com/RiddheshMore/Tender-Analysis-AI",
  },
  {
    name: "ros-component-explorer",
    description:
      "Toolkit for exploring ROS components, dependencies, and runtime interactions.",
    tags: ["Python", "ROS", "Developer Tools"],
    status: "Live",
    featured: true,
    image:
      "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(59,130,246,0.15)), radial-gradient(circle at 70% 70%, rgba(14,116,144,0.35), transparent 50%)",
    url: "https://github.com/RiddheshMore/ros-component-explorer",
  },
  {
    name: "omnidoc-parser-benchmark",
    description:
      "Benchmark suite to compare document parser quality and performance across datasets.",
    tags: ["Python", "Benchmarking", "Document AI"],
    status: "In Progress",
    image:
      "linear-gradient(135deg, rgba(6,182,212,0.34), rgba(59,130,246,0.14)), radial-gradient(circle at 20% 85%, rgba(14,165,233,0.3), transparent 45%)",
    url: "https://github.com/RiddheshMore/omnidoc-parser-benchmark",
  },
  {
    name: "steve_command_grounding",
    description:
      "Command-grounding pipeline to map natural-language instructions to robot actions.",
    tags: ["Python", "Robotics", "LLM"],
    status: "Prototype",
    image:
      "linear-gradient(135deg, rgba(45,212,191,0.34), rgba(14,165,233,0.14)), radial-gradient(circle at 90% 90%, rgba(34,211,238,0.3), transparent 46%)",
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

const rotatingRoles = [
  "Robotics Engineer",
  "AI/ML Builder",
  "ROS Developer",
  "Automation Problem Solver",
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } },
};

function useTypingEffect(words: string[], reducedMotion: boolean) {
  const fallback = words[0] ?? "";
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState(fallback);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || words.length === 0) {
      return;
    }

    const current = words[index % words.length] ?? "";
    const finishedTyping = displayed === current;
    const finishedDeleting = displayed.length === 0;

    const speed = deleting ? 45 : 75;
    const timeout = finishedTyping ? 1200 : speed;

    const timer = window.setTimeout(() => {
      if (!deleting && finishedTyping) {
        setDeleting(true);
        return;
      }

      if (deleting && finishedDeleting) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setDisplayed((prev) =>
        deleting ? current.slice(0, Math.max(0, prev.length - 1)) : current.slice(0, prev.length + 1),
      );
    }, timeout);

    return () => window.clearTimeout(timer);
  }, [deleting, displayed, index, reducedMotion, words]);

  return reducedMotion ? fallback : displayed;
}

function useCursorGlow(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const root = document.documentElement;
    const updatePosition = (event: MouseEvent) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", updatePosition);
    return () => window.removeEventListener("pointermove", updatePosition);
  }, [enabled]);
}

type Ripple = { id: number; x: number; y: number };

function RippleButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const className =
    variant === "primary"
      ? "button-primary"
      : "button-secondary border border-white/20 bg-white/[0.04] text-slate-100 hover:border-cyan-300/60";

  return (
    <a
      href={href}
      className={`relative inline-flex overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold ${className}`}
      onPointerDown={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const next = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top };
        setRipples((prev) => [...prev, next]);
        window.setTimeout(() => {
          setRipples((prev) => prev.filter((item) => item.id !== next.id));
        }, 520);
      }}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden
        />
      ))}
    </a>
  );
}

function HeroSection({ name, role }: { name: string; role: string }) {
  return (
    <section id="home" className="relative overflow-hidden rounded-3xl glass-card p-8 sm:p-12">
      <div className="hero-noise" aria-hidden />
      <div className="hero-glow hero-glow-a" aria-hidden />
      <div className="hero-glow hero-glow-b" aria-hidden />

      <motion.div
        className="relative z-10"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={childVariants} className="text-sm uppercase tracking-[0.2em] text-cyan-300/90">
          Portfolio
        </motion.p>
        <motion.h1
          variants={childVariants}
          className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          {name}
        </motion.h1>
        <motion.p variants={childVariants} className="mt-4 text-xl text-slate-200">
          Building scalable robotics + AI products with engineering precision.
        </motion.p>
        <motion.p variants={childVariants} className="mt-3 h-7 text-base text-cyan-200">
          <span className="font-medium">I am a </span>
          <span className="gradient-text font-semibold">{role}</span>
          <span className="typing-caret" aria-hidden>
            |
          </span>
        </motion.p>
        <motion.p variants={childVariants} className="mt-6 max-w-2xl leading-7 text-slate-300">
          I design practical systems that connect autonomous robotics, ML, and developer tooling,
          turning ambitious ideas into reliable products.
        </motion.p>
        <motion.div variants={childVariants} className="mt-8 flex flex-wrap gap-3">
          <RippleButton href="#projects" variant="primary">
            View Projects
          </RippleButton>
          <RippleButton href="#contact" variant="ghost">
            Contact Me
          </RippleButton>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionShell({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className="rounded-3xl glass-card p-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 variants={childVariants} className="text-2xl font-semibold text-white">
        {title}
      </motion.h2>
      <motion.div variants={childVariants} className="mt-4">
        {children}
      </motion.div>
    </motion.section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="project-card group"
      variants={childVariants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div
        className="project-media"
        style={{ backgroundImage: project.image }}
        aria-hidden
      >
        <div className="project-overlay" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          {project.status ? (
            <span className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-200">
              {project.status}
            </span>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="tech-tag">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
          >
            View repository →
          </a>
          {project.featured ? (
            <span className="text-xs uppercase tracking-wider text-cyan-200/80">Featured</span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const typedRole = useTypingEffect(rotatingRoles, Boolean(prefersReducedMotion));
  const cursorEnabled = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      !prefersReducedMotion &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, [prefersReducedMotion]);

  useCursorGlow(cursorEnabled);

  return (
    <div className="portfolio-shell">
      <div className="cursor-gradient" aria-hidden />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-14 sm:px-10 lg:px-12">
        <HeroSection name="Riddhesh More" role={typedRole || rotatingRoles[0]} />

        <SectionShell id="about" title="About">
          <p className="leading-7 text-slate-300">
            I&apos;m passionate about building intelligent systems where robotics and AI solve
            real-world operational problems. I focus on production-quality automation pipelines,
            robust experimentation, and scalable engineering practices.
          </p>
        </SectionShell>

        <SectionShell id="projects" title="Projects">
          <div className="mt-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </SectionShell>

        <SectionShell id="skills" title="Skills">
          <ul className="mt-1 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <li key={skill} className="skill-chip">
                {skill}
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell id="contact" title="Contact">
          <p className="leading-7 text-slate-300">
            Open to robotics, AI, and full-stack engineering collaborations.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">
            <a
              href="https://github.com/RiddheshMore"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary rounded-xl px-4 py-2 text-sm font-medium"
            >
              GitHub
            </a>
            <a
              href="mailto:your.email@example.com"
              className="button-secondary rounded-xl px-4 py-2 text-sm font-medium"
            >
              Email
            </a>
          </div>
        </SectionShell>
      </main>
    </div>
  );
}
