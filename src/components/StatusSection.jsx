// "use client"

// import { useEffect, useRef, useState } from "react"

// function Speedometer({ label, value, maxValue, suffix = "", color, delay = 0 }) {
//   const [count, setCount] = useState(0)
//   const [progress, setProgress] = useState(0)
//   const [isVisible, setIsVisible] = useState(false)
//   const ref = useRef(null)

//   const radius = 80
//   const strokeWidth = 12
//   const normalizedRadius = radius - strokeWidth / 2
//   const circumference = normalizedRadius * 2 * Math.PI

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setTimeout(() => setIsVisible(true), delay)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     if (ref.current) {
//       observer.observe(ref.current)
//     }

//     return () => {
//       if (ref.current) {
//         observer.unobserve(ref.current)
//       }
//     }
//   }, [delay])

//   useEffect(() => {
//     if (!isVisible) return

//     const duration = 1500
//     const startTime = Date.now()

//     const animate = () => {
//       const elapsed = Date.now() - startTime
//       const progress = Math.min(elapsed / duration, 1)

//       // Smooth easing (ease-out cubic)
//       const eased = 1 - Math.pow(1 - progress, 3)
//       const currentValue = value * eased

//       setCount(Math.round(currentValue))
//       setProgress((currentValue / maxValue) * 100)

//       if (progress < 1) {
//         requestAnimationFrame(animate)
//       } else {
//         setCount(value)
//         setProgress((value / maxValue) * 100)
//       }
//     }

//     requestAnimationFrame(animate)
//   }, [isVisible, value, maxValue])

//   const strokeDashoffset = circumference - (progress / 100) * circumference

//   return (
//     <div ref={ref} className="flex flex-col items-center gap-6 group">
//       {/* Speedometer Circle */}
//       <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
//         {/* Background glow */}
//         <div
//           className={`absolute inset-0 rounded-full ${color} opacity-5 blur-2xl transition-opacity duration-700 group-hover:opacity-20`}
//         />

//         {/* SVG Speedometer */}
//         <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
//           {/* Background circle */}
//           <circle
//             stroke="currentColor"
//             className="text-white/20"
//             fill="transparent"
//             strokeWidth={strokeWidth}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />

//           <circle
//             stroke={`var(${color})`}
//             className={color.replace("bg-", "text-")}
//             fill="transparent"
//             strokeWidth={strokeWidth}
//             strokeDasharray={circumference + " " + circumference}
//             style={{
//               strokeDashoffset,
//               transition: "stroke-dashoffset 0.1s linear",
//             }}
//             strokeLinecap="round"
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//         </svg>

//         {/* Center content */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <div className="flex items-baseline gap-1">
//             <span className={`font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-white`}>{count}</span>
//             {suffix && <span className={`text-2xl md:text-3xl font-bold text-white/70`}>{suffix}</span>}
//           </div>
//           <div className={`mt-2 h-0.5 w-12 ${color} opacity-50 transition-all duration-500 group-hover:w-16`} />
//         </div>
//       </div>

//       {/* Label */}
//       <div className="text-center">
//         <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-1">{label}</h3>
//         <div className={`h-px w-20 mx-auto ${color} opacity-30`} />
//       </div>
//     </div>
//   )
// }

// export default function StatsSection() {
//   return (
//     <section className="w-full min-h-screen bg-gradient-to-b from-[#060011] to-[#000000] flex items-center justify-center px-4 py-20 md:py-32">
//       <div className="max-w-7xl w-full">
//         {/* Section header */}
//         <div className="mb-16 md:mb-24 text-center">
//           <h2 className="text-4xl md:text-5xl lg:text-[6em] font-bold mb-4 text-balance text-white">
//             Achievements & Milestones
//           </h2>
//           <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto text-balance">
//             A snapshot of my journey in software development
//           </p>
//         </div>

//         {/* Speedometer grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
//           <Speedometer label="Questions Solved" value={600} maxValue={1000} suffix="+" color="--chart-1" delay={0} />
//           <Speedometer label="Projects Completed" value={4} maxValue={10} suffix="+" color="--chart-2" delay={200} />
//           <Speedometer label="Achievements Earned" value={4} maxValue={10} suffix="+" color="--chart-3" delay={400} />
//         </div>

//         {/* Optional description */}
//         <div className="mt-20 text-center">
//           <p className="text-sm text-white/40 max-w-3xl mx-auto text-pretty leading-relaxed">
//             These numbers represent countless hours of learning, problem-solving, and building. Each milestone marks a
//             step forward in my continuous journey of growth and innovation.
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useEffect, useRef, useState } from "react"

function Speedometer({ label, value, maxValue, suffix = "", color, delay = 0 }) {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  const radius = 80
  const strokeWidth = 12
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = value * eased

      setCount(Math.round(currentValue))
      setProgress((currentValue / maxValue) * 100)

      if (progress < 1) requestAnimationFrame(animate)
      else {
        setCount(value)
        setProgress((value / maxValue) * 100)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, value, maxValue])

  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-6 group"
      style={{ "--circle-color": `var(${color})` }}
    >
      {/* Speedometer Circle */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-full opacity-5 blur-2xl transition-opacity duration-700 group-hover:opacity-20"
             style={{ backgroundColor: "var(--circle-color)" }} />

        {/* SVG Speedometer */}
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
          {/* Background circle */}
          <circle
            stroke="currentColor"
            className="text-white/20"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + " " + circumference}
            style={{
              stroke: "var(--circle-color)",
              strokeDashoffset,
              transition: "stroke-dashoffset 0.1s linear",
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-white">{count}</span>
            {suffix && <span className="text-2xl md:text-3xl font-bold text-white/70">{suffix}</span>}
          </div>
          <div className="mt-2 h-0.5 w-12 opacity-50 transition-all duration-500 group-hover:w-16"
               style={{ backgroundColor: "var(--circle-color)" }} />
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-1">{label}</h3>
        <div className="h-px w-20 mx-auto opacity-30"
             style={{ backgroundColor: "var(--circle-color)" }} />
      </div>
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-[#060011] to-[#000000] flex items-center justify-center px-4 py-20 md:py-25">
      <div className="max-w-7xl w-full">
        {/* Section header */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-[6em] font-bold mb-4 text-balance text-[#FFFFF0]">
            <span className="font-[Bebas_Neue]">Achievements</span> <span className="font-[Bebas_Neue]">&</span> <span className="font-[Bebas_Neue]">Milestones</span>
          </h2>
          <p className="text-lg md:text-[1.4em] text-white/60 max-w-2xl mx-auto text-balance font-[Pt_Sans_Narrow]">
            A snapshot of my journey in software development
          </p>
        </div>

        {/* Speedometer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
          <Speedometer label="Questions Solved" value={600} maxValue={1000} suffix="+" color="--chart-1" delay={0} />
          <Speedometer label="Projects Completed" value={4} maxValue={10} suffix="+" color="--chart-2" delay={200} />
          <Speedometer label="Achievements Earned" value={4} maxValue={10} suffix="+" color="--chart-3" delay={400} />
        </div>

        {/* Optional description */}
        <div className="mt-20 text-center">
          <p className="text-sm text-white/40 max-w-3xl mx-auto text-pretty leading-relaxed font-[Pt_Sans_Narrow]">
            These numbers represent countless hours of learning, problem-solving, and building. 
            Each milestone marks a step forward in my continuous journey of growth and innovation.
          </p>
        </div>
      </div>
    </section>
  )
}
