"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import Link from "next/link";

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
              MEDICONNECT
            </h1>
            <p className="text-lg md:text-xl text-white opacity-40 max-w-2xl mx-auto">
              Mediconnect is an all-in-one platform for doctors and patients where no
              mediator is required. Both patients and doctors have full control over
              appointments and can securely store medical reports.
            </p>
          </div>

          {/* Expanding Image */}
          <div className="absolute top-[50vh] left-0 right-0 px-6 md:px-12 lg:px-24 z-10 flex justify-center">
            <div
              className="relative transition-[width,transform] duration-600 ease-out"
              style={{
                width: `${imageWidth}%`,
                transform: `scale(${imageScale})`,
              }}
            >
              <Link href="https://medconnect-user.netlify.app/" target="_blank">
                <div className="relative mx-auto h-[90vh] w-full">
                  <Image
                    src="/Images/MediconnectProject.png"
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
            MEDICONNECT
          </h1>
          <p className="text-base md:text-lg text-white opacity-70 max-w-2xl mx-auto">
            Mediconnect is an all-in-one platform for doctors and patients where no
            mediator is required. Both patients and doctors have full control over
            appointments and can securely store medical reports.
          </p>
          <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <Link href="https://medconnect-user.netlify.app/" target="_blank">
              <Image
                src="/Images/MediconnectProject.png"
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
              <p className="text-2xl text-white font-medium">September 2024</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                End Date
              </h3>
              <p className="text-2xl text-white font-medium">March 2025</p>
            </div>
          </div>

          {/* Role */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Role
            </h3>
            <p className="text-2xl text-white font-medium">Full Stack Developer</p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React.js",
                "TypeScript",
                "Tailwind CSS",
                "Express",
                "APIs",
                "Git",
                "Github",
                "Renderer",
                "Netlify",
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
            <p className="text-lg text-white leading-relaxed">
              This project was developed as a college major project and involves building an all-in-one healthcare platform called Mediconnect, designed to connect doctors and patients directly without any mediator.
              The platform features two types of users — doctors and patients — where patients can search for doctors based on their specialization, book consultation slots, and securely store medical reports. Doctors can manage their schedules, accept or decline appointment requests, and maintain patient interaction records.
              Mediconnect simplifies healthcare communication by providing a transparent and secure system that gives both doctors and patients full control over appointments and medical data.
            </p>
          </div>

          {/* Challenges */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Challenges
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              While displaying all registered doctors, the application experienced performance issues and delays due to loading a large dataset at once.
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Solution
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              To resolve this, I implemented pagination, which optimized data loading by fetching doctors in smaller batches. This significantly improved page load speed and provided a smoother user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
