
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
        <h1 className="text-4xl md:text-4xl lg:text-[12em] font-[Bebas_Neue] font-bold bg-[#000000] text-[#FFFFF0]">
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
      <div className="block lg:hidden min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Responsive grid: 1 column on mobile, 2 columns on tablet */}
          <div className="rid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Link href={project.link} key={index} className="group block">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                  style={{ backgroundColor: `${project.color}15` }}
                >
                  {/* Image container with aspect ratio */}
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <Image
                      src={`/images/${project.src}`}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {project.title}
                    </h2>
                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors duration-300">
                      <span className="text-sm md:text-base">Explore {project.title}</span>
                      <svg
                        className="w-4! h-4! relative! md:w-5! md:h-5! ml-2! group-hover:translate-x-1! transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Colored accent border */}
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: project.color }} />
                </div>
              </Link>
            ))}
          </div>
          {/* Optional: Add a footer or additional content */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm md:text-base">Discover the information</p>
          </div>
        </div>
      </div>
    </>
  )
}
