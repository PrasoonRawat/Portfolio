"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import Lenis from "lenis"
import Link from "next/link"


export default function ExampleProjectPage() {
  const [scrollProgress, setScrollProgress] = useState(0)

   useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / window.innerHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Text shrinks slightly on scroll
  const textScale = 1 - scrollProgress * 0.3

  // Expand quickly in the first ~15% of viewport height scroll
  const quickProgress = Math.min(scrollProgress / 0.15, 1) // full expansion early
  const imageWidth = 80 + quickProgress * 20 // 80% → 100%

  // Optional small zoom-out for subtle cinematic effect
  const imageScale = 1 + quickProgress * 0.05

  return (
    <>
    <div className="bg-[#1A2E35] min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen leading-none">
        {/* Title & Description (fixed + shrinking) */}
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
            Mediconnect is a all in one platform for doctors and patients where no Mediator is required, both patient and doctor have full controll over the appointments. Adding to it all the medical reports (external or via platform) can be saved by patient or doctor for future use.
          </p>
        </div>

        {/* Expanding Image (quick early expansion) */}
        <div className="absolute top-[50vh] left-0 right-0 px-6 md:px-12 lg:px-24 z-10 flex justify-center">
          <div
            className="relative transition-[width,transform] duration-600 ease-out"
            style={{
                width: `${imageWidth}%`,
                transform: `scale(${imageScale})`,
            }}
            >
            <Link
            href="https://medconnect-user.netlify.app/"
            >
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

        {/* Spacer to enable scroll */}
        <div className="h-[140vh]" />
      </div>

      {/* Project Details Section */}
      <div className="bg-[#1A2E35] px-6 md:px-12 lg:px-24 py-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Start Date</h3>
              <p className="text-2xl text-white font-medium">January 2024</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">End Date</h3>
              <p className="text-2xl text-white font-medium">March 2025</p>
            </div>
          </div>

          {/* Role */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Role</h3>
            <p className="text-2xl text-white font-medium">Full Stack Developer</p>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Express", "APIs", "Git", "Github", "Renderer", "Netllify"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Project Details</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              This project involved building a comprehensive web application with a focus on user experience and
              performance. The application features real-time data updates, responsive design, and seamless integration
              with third-party APIs.
            </p>
          </div>

          {/* Challenges */}
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Challenges</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              One of the main challenges was optimizing the application for mobile devices while maintaining feature
              parity with the desktop version.
            </p>
          </div>

          {/* Outcome */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Outcome</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Successfully launched the application with over 1,000 active users in the first month.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
