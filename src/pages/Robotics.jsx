"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Link from "next/link";
import Head from "next/head";

export default function ExampleProjectPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Only enable Lenis + scroll progress on large screens
  useEffect(() => {
    if (!isLargeScreen) return;

    const lenis = new Lenis({ smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [isLargeScreen]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / window.innerHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLargeScreen]);

  // Scroll-based transforms (only for large screens)
  const textScale = isLargeScreen ? 1 - scrollProgress * 0.3 : 1;
  const quickProgress = isLargeScreen ? Math.min(scrollProgress / 0.15, 1) : 1;
  const imageWidth = isLargeScreen ? 80 + quickProgress * 20 : 100;
  const imageScale = isLargeScreen ? 1 + quickProgress * 0.05 : 1;

  return (
    <>
    <Head>
        <title>Prasoon Portfolio%2025</title>
        <meta name="description" content="Welcome to my Protfolio, Get to know about me through this piece of art." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://img.icons8.com/?size=100&id=LmG49EnUQig9&format=png&color=000000" />
      </Head>
    <div className="bg-[#1A2E35] min-h-screen">
      {/* Hero Section */}
      {isLargeScreen ? (
        // --- Large Screen Version (with effect) ---
        <div className="relative min-h-screen leading-none">
          {/* Title + Description */}
          <div
            className="fixed top-0 left-0 right-0 pt-20 pb-8 px-6 text-center z-0 pointer-events-none"
            style={{
              transform: `scale(${textScale})`,
              transformOrigin: "top center",
            }}
            >
            <h1 className="text-[6em] md:text-[12em] font-[Bebas_Neue] font-bold text-white">
              Robotics Club
            </h1>
            <p className="text-lg md:text-xl text-white opacity-40 max-w-2xl mx-auto">
              This was one of my first web development projects, created for my college’s Robotics Club. The goal was to design a simple yet functional website to share club activities, project updates, and event information. It helped me learn the fundamentals of frontend development, responsive design, and version control.
            </p>
          </div>

          {/* Expanding Image */}
          <div className="absolute top-[50vh] lg:top-[55vh] left-0 right-0 px-6 md:px-12 lg:px-24 z-10 flex justify-center">
            <div
              className="relative transition-[width,transform] duration-600 ease-out"
              style={{
                width: `${imageWidth}%`,
                transform: `scale(${imageScale})`,
              }}
              >
              <Link href="https://prasoonrawat.github.io/robotics.github.io/" target="_blank">
                <div className="relative mx-auto h-[115vh] w-full">
                  <Image
                    src="/Images/Robotics.png"
                    alt="Project showcase"
                    fill
                    className="object-cover rounded-t-2xl cursor-target"
                    priority
                    />
                </div>
              </Link>
            </div>
          </div>

          {/* Spacer for scroll */}
          <div className="h-[140vh]" />
        </div>
      ) : (
        // --- Mobile / Tablet Version (no effect, static layout) ---
        <div className="pt-20 px-6 md:px-12 lg:px-24 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-[Bebas_Neue] font-bold text-white">
            Robotics club
          </h1>
          <p className="text-base md:text-lg text-white opacity-70 max-w-2xl mx-auto">
            This was one of my first web development projects, created for my college’s Robotics Club. The goal was to design a simple yet functional website to share club activities, project updates, and event information. It helped me learn the fundamentals of frontend development, responsive design, and version control.
          </p>
          <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <Link href="https://prasoonrawat.github.io/robotics.github.io/" target="_blank">
              <Image
                src="/Images/Robotics.png"
                alt="Project showcase"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
                />
            </Link>
          </div>
        </div>
      )}

      {/* Project Details Section */}
      <div className="bg-[#1A2E35] px-6 md:px-12 lg:px-24 py-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Start Date
              </h3>
              <p className="text-2xl text-white font-medium">March 2023</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                End Date
              </h3>
              <p className="text-2xl text-white font-medium">April 2023</p>
            </div>
          </div>

          {/* Role */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Role
            </h3>
            <p className="text-2xl text-white font-medium">Front End Development</p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "HTML",
                "CSS",
                "Js",
              ].map((tech) => (
                <span
                key={tech}
                className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Project Details
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              This project was developed as a frontend website for my college’s Robotics Club.
              It was one of my first web development projects, aimed at showcasing the club’s presence, activities, and ongoing projects. The website served as a platform to share event updates, project highlights, and announcements within the college community. Through this project, I learned the fundamentals of HTML, CSS, and basic JavaScript, along with essential concepts of responsive design and version control — making it a great foundation for my journey into web development.
            </p>
          </div>

          {/* Challenges */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Challenges
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              The main challenge was to design a website that was both visually appealing and informative, while maintaining a balance between aesthetics and functionality. Ensuring that the design looked engaging without compromising the website’s core purpose and usability was a key focus throughout the development process.
            </p>
          </div>

          {/* Outcome */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Outcome
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              A responsive and visually appealing website that enhanced the club’s visibility and strengthened my foundational web development skills.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
