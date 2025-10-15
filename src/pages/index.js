import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Lanyard from "@/components/Lanyard";
import CardNav from "@/components/CardNav";
import TargetCursor from "@/components/TargetCursor";
import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiGithub, SiCplusplus, SiC, SiMongodb } from 'react-icons/si';
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import StatusSection from "@/components/StatusSection";
import { GoArrowDown } from "react-icons/go";
import ProjectSection from "@/components/ProjectSection/Hover";
import { ExperienceCard } from "@/components/Experience-Card";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Link from "next/link";

import { Mail ,Download } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const experiences = [
  {
    company: "ENROLLIX",
    role: "Full Stack Developer",
    startDate: "Dec 2024",
    endDate: "Jul 2025",
    description:
      "Built responsive web application using Next.js and Tailwind CSS, implemented RESTful APIs with Node.js and Express, and managed MongoDB database operations.",
  },
]



export default function Home() {
  const [preloader, setPreloader] = useState(false);
  const [inView, setInView] = useState(false);
  const lanyardRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (lanyardRef.current) {
      observer.observe(lanyardRef.current);
    }

    return () => {
      if (lanyardRef.current) {
        observer.unobserve(lanyardRef.current);
      }
    };
  }, []);

  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Me", ariaLabel: "About me", href: "#Aboutme" },
        { label: "Careers", ariaLabel: "About Careers", href: "#Career" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/LLD" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#271E37", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "mailto:prasoon818@gmail.com"},
        { label: "Github", ariaLabel: "Github", href: "https://github.com/PrasoonRawat" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/in/prasoon-priya-rawat-42060922a/" }
      ]
    }
  ];

  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiCplusplus />, title: "C++", href: "https://isocpp.org" },
    { node: <SiC />, title: "C", href: "https://en.cppreference.com/w/c" },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" }
  ];

  return (
    <>
    {preloader ? 
      <div className="absolute flex flex-col items-center justify-center bg-[#191919] text-[#dbd8d6]">
          <h1 className="text-[1.5vw] transform-upper font-serif font-[600] ">Prasoon Priya Rawat</h1>
          <h2 className="text-[1.5vw] transform-upper font-stretch-extra-condensed italic mt-10px">PORTFOLIO</h2>
      </div> :
    <>
    <CardNav
    logo="/logo.svg"
    logoAlt="Company Logo"
    items={items}
    baseColor="#FFFFF0"
    menuColor="#000"
    buttonBgColor="#111"
    buttonTextColor="#fff"
    ease="power3.out"
    />
      <Head>
        <title>Prasoon Portfolio%2025</title>
        <meta name="description" content="Welcome to my Protfolio, Get to know about me through this piece of art." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://img.icons8.com/?size=100&id=LmG49EnUQig9&format=png&color=000000" />
      </Head>
      <span className="hidden lg:block">
      <TargetCursor 
      spinDuration={2}
      hideDefaultCursor={false}
      />
      </span>
      <div>
        <div className="bg-gradient-to-b from-[#2E2440] to-[#060011] flex flex-col  justify-center min-h-screen font-[Pt_Sans_Narrow] items-center text-white leading-none">
          <div className="px-4">
            <div className="flex h-6 mb-2">
              <div className="border px-2 py-2 md:px-3 md:py-4 flex items-center justify-center rounded-[50px] gap-2 bg-[#FFFFF0] border-[#FFFFF0] text-black">
              <div className="w-3 h-3 rounded-full bg-[#37ff00]"></div> 
              <h3 className="font-bold">AVAILABLE</h3>
              </div>
            </div>
            <h3 className="text-[1em] md:text-[2em] font-[Pt_Sans_Narrow]">welcome to my portfolio 🌍</h3>
            <h1 className="text-[3em] md:text-[8em]">Hi, I AM <span className="font-bold font-[Bebas_Neue] text-[#FFFFF0]">PRASOON</span></h1>
            <h3 className="font-bold opacity-40 text-[1em] md:text-[2em] font-[Pt_Sans_Narrow] ">Developer, Programmer, Problem Solver, Enthusiast </h3>
            <h3 className="opacity-40 font-[Pt_Sans_Narrow]">I am not just a computer guy, I’m the bridge between logic and creativity, shaping ideas into experiences.</h3>
          {/* <div className="flex gap-4 mt-4">
            <div className="flex h-6 mb-2">
              <Link href="mailto:prasoon818@gmail.com">
              <div className="border px-3 py-4 flex items-center justify-center rounded-[50px] gap-2 bg-[#FFFFF0] border-[#FFFFF0] text-black">
                <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                <h3 className="font-bold">CONNECT</h3>
              </div>
              </Link>
            </div>
            <div className="flex h-6 mb-2">
              <Link href="">
              <div className="border px-3 py-4 flex items-center justify-center rounded-[50px] gap-2 bg-[#FFFFF0] border-[#FFFFF0] text-black">
              <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
              <h3 className="font-bold">Download CV</h3>
              </div>
              </Link>
            </div>
          </div> */}
          </div>
            <div ref={lanyardRef} className="absolute hidden lg:block" style={{ width: "100%", height: "100vh" }}>
              {inView && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />}
          </div>
        </div>
      </div>
      

      {/* WHO I AM */}
      <div id="Aboutme" className="w-full bg-[#060011]">
        <div className="flex flex-col md:flex-row items-center text-[#FFFFF0] px-4 md:px-24 text-center md:text-left py-16 gap-10 md:gap-10 lg:gap-40">
          <div className="items-start flex flex-row md:flex-col gap-2 md:gap-0 leading-[.8] border-l-[2px] border-[#FFFFF0] pl-2 md:pl-10 ">
            <h1 className="font-bold font-[Bebas_Neue] text-[5em] md:text-[8em] lg:text-[12rem]"> <span className="text-[#fff674]">WHO</span></h1>
            <h1 className="font-bold font-[Bebas_Neue] text-[5em] md:text-[8em] lg:text-[12rem]">I AM!</h1>
          </div>
          <div className="flex flex-1 flex-col gap-4 text-m lg:text-[1.4em] font-[Pt_Sans_Narrow]">
            <p className="text-white">I’m a B.Tech undergraduate student in Computer Science (2021–2025) with a strong interest in problem solving and software development. Over the years, I’ve built a solid foundation in algorithms, data structures, and programming, with C++ as my primary language.</p>
            <p className="text-white">I have solved 600+ programming challenges across various platforms and actively participated in coding contests to sharpen my skills. Alongside competitive programming, I also explore full-stack development and have hands-on experience working with technologies like MERN, Next.js, and Tailwind CSS.</p>
            <p className="text-white">I enjoy building impactful solutions and learning new technologies that push my creativity and problem-solving skills. I’m always curious to explore opportunities where I can contribute to real-world projects, grow as a developer, and make technology more meaningful for people.</p>
          </div>
        </div>
      </div>
      {/* <LogoLoop
      logos={techLogos}
      speed={120}
      direction="left"
      logoHeight={48}
      gap={40}
      pauseOnHover
      scaleOnHover
      fadeOut
      fadeOutColor="#ffffff"
      ariaLabel="Technology partners"
      className="text-white bg-[#060011]"
      /> */}
      
      <StatusSection/>
      <Skills />
      <div className="w-full bg-[#000000] text-white py-2 md:py-24 lg:py-32" id="Career" >
        <div className="flex flex-col md:flex-row items-center text-[#FFFFF0] px-4 md:px-24 py-16 gap-5 md:gap-10 lg:gap-20">
          <div className="space-y-8 order-2 lg:order-1">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
          <div className="items-end flex order-1 lg:order-2 lg:sticky lg:top-24 flex-col px-4 md:flex-col gap-2 md:gap-0 leading-[.8] border-r-[2px] border-[#FFFFF0] pr-10">
            <h1 className="font-bold font-[Bebas_Neue] text-[4em] md:text-[6em] lg:text-[12rem]" id="Aboutme"> <span className="text-[#FFFFF0]">WORK</span></h1>
            <h1 className="font-bold font-[Bebas_Neue] text-[4em] md:text-[6em] lg:text-[12rem] text-[#fff674]">EXPERIENCE</h1>
          </div>
        </div>
      </div>
      <div id="Projects">
        <ProjectSection />
      </div>
      <div id="Get_Started">
        <Footer /> 
      </div>
    </>
    }
    </>
  );
}
