
"use client"
import styles from "./style.module.css"
import { useState } from "react"
import Project from "../Projects"
import Modal from "../Modal"
import Link from "next/link"
import Image from "next/image"
import { color } from "motion"

const projects = [
  {
    title: "MEDICONNECT",
    src: "Mediconnect.png",
    color: "#1A2E35", // Deep cyan-charcoal, urban and premium-modern
    link: "/Mediconnect",
  },
  {
    title: "LLD",
    src: "LLD.png",
    color: "#4B0082", // Indigo, creative and imaginative
    link: "/LLD",
  },
  {
    title: "ROBOTICS CLUB",
    src: "Robotics.png",
    color: "#228B22", // Forest green, growth and harmony
    link: "/Robotics",
  },
]



export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 })

  return (
    <>
      {/* Added text to encourage exploration above the main container */}
      <div className="text-center py-8 max-w-6xl mx-auto z-[-10] leading-none">
        <h1 className="text-[4em] md:text-[8em] lg:text-[12em] font-[Bebas_Neue] font-bold bg-[#000000] text-[#FFFFF0]">
          PROJECTS
        </h1>
        <h3 className="text-white/40">Move your cursor over the project to experience it. </h3>
      </div>
      <main className={styles.main}>
        <div className={styles.body}>
          {projects.map((project, index) => {
            return <Project index={index} title={project.title} setModal={setModal} link={project.link} key={index} />
          })}
        </div>
        <Modal modal={modal} projects={projects} />
      </main>
      <div className="block lg:hidden min-h-screen bg-black py-10 px-6">
        <div className="max-w-5xl md:max-w-2xl mx-auto space-y-10">
          {projects.map((project, index) => (
            <Link
              href={project.link}
              key={index}
              className="group relative block rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-500"
            >
              {/* Image Layer */}
              <div className="relative h-60 md:h-72">
                <Image
                  src={`/images/${project.src}`}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
          
              {/* Text Layer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col">
                <h2 className="text-3xl font-bold text-white tracking-wide group-hover:text-[${project.color}] transition-colors duration-300 drop-shadow-md">
                  {project.title}
                </h2>
                <div className="mt-2 flex items-center text-white/80 group-hover:text-white text-sm md:text-base">
                  <span>Explore {project.title}</span>
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
          
              {/* Accent Line */}
              <div
                className="absolute top-0 left-0 w-full h-[3px]"
                style={{ backgroundColor: project.color }}
              />
            </Link>
          ))}
        </div>
</div>

    </>
  )
}
