// import { 
//   Code2, 
//   Braces, 
//   Database, 
//   Globe, 
//   Terminal,
//   Layers,
//   GitBranch,
//   Cpu,
//   Puzzle,
//   Lightbulb,
//   Target,
//   Workflow
// } from "lucide-react";

// const Skills = () => {
//   const coreSkills = [
//     { name: "Problem Solving", icon: Lightbulb },
//     { name: "Data Structures", icon: Layers },
//     { name: "Algorithms", icon: Workflow },
//     { name: "System Design", icon: Cpu },
//     { name: "Critical Thinking", icon: Target },
//     { name: "Competitive Programming", icon: Puzzle },
//   ];

//   const programmingLanguages = [
//     { name: "C++", icon: Code2 },
//     { name: "JavaScript", icon: Braces },
//     { name: "Python", icon: Terminal },
//     { name: "TypeScript", icon: Code2 },
//     { name: "SQL", icon: Database },
//     { name: "HTML/CSS", icon: Globe },
//   ];

//   const toolsTechnologies = [
//     { name: "React.js", icon: Code2 },
//     { name: "Node.js", icon: Terminal },
//     { name: "Next.js", icon: Layers },
//     { name: "MongoDB", icon: Database },
//     { name: "Git & GitHub", icon: GitBranch },
//     { name: "Tailwind CSS", icon: Globe },
//   ];

//   const SkillCard = ({ name, icon: Icon }) => (
//     <div className="group relative overflow-hidden rounded-xl bg-[#141414] border border-gray-800 p-6 transition-all duration-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1">
//       <div className="flex flex-col items-center gap-4 text-center">
//         <div className="rounded-full bg-gray-800 p-4 transition-all duration-300 group-hover:bg-yellow-400 group-hover:scale-110">
//           <Icon className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-gray-900" />
//         </div>
//         <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-yellow-400">
//           {name}
//         </h3>
//       </div>
//     </div>
//   );

//   const SkillCategory = ({ title, skills }) => (
//     <div className="space-y-8">
//       <h3 className="text-2xl md:text-3xl font-bold text-white border-l-4 border-yellow-400 pl-6">
//         {title}
//       </h3>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
//         {skills.map((skill) => (
//           <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <section className="min-h-screen bg-[#0a0a0a] py-20 px-6 md:px-12 lg:px-24">
//       <div className="max-w-7xl mx-auto space-y-16">
//         {/* Header */}
//         <div className="space-y-6 text-center">
//           <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white">
//             SKILLS
//           </h1>
//           <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
//             A comprehensive showcase of my technical expertise and competencies
//           </p>
//         </div>

//         {/* Skills Categories */}
//         <div className="space-y-20">
//           <SkillCategory title="Core Skills" skills={coreSkills} />
//           <SkillCategory title="Programming Languages" skills={programmingLanguages} />
//           <SkillCategory title="Tools & Technologies" skills={toolsTechnologies} />
//         </div>

//         {/* Bottom Accent */}
//         <div className="flex justify-center pt-12">
//           <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills;



import { 
  Code2, 
  Braces, 
  Database, 
  Globe, 
  GlobeLock,
  Terminal,
  Layers,
  GitBranch,
  Cpu,
  Puzzle,
  Lightbulb,
  Target,
  Workflow
} from "lucide-react";

const Skills = () => {
  const coreSkills = [
    { name: "Problem Solving", icon: Lightbulb },
    { name: "Data Structures", icon: Layers },
    { name: "Algorithms", icon: Workflow },
    { name: "System Design", icon: Cpu },
    { name: "Critical Thinking", icon: Target },
    { name: "Competitive Programming", icon: Puzzle },
  ];

  const programmingLanguages = [
    { name: "C++", icon: Code2 },
    { name: "C", icon: Code2 },
    { name: "JavaScript", icon: Braces },
    { name: "Python", icon: Terminal },
    { name: "TypeScript", icon: Code2 },
    { name: "MySQL", icon: Database },
    { name: "HTML/CSS", icon: Globe },
  ];

  const toolsTechnologies = [
    { name: "React.js", icon: Code2 },
    { name: "Node.js", icon: Terminal },
    { name: "Next.js", icon: Layers },
    { name: "MongoDB", icon: Database },
    { name: "Git & GitHub", icon: GitBranch },
    { name: "Tailwind CSS", icon: Globe },
    { name: "Render", icon: Layers },
    { name: "Netlify", icon: Globe },
    { name: "Vercel", icon: GlobeLock },
  ];

  const SkillCard = ({ name, icon: Icon }) => (
    <div className="group relative overflow-hidden rounded-xl bg-[#111111] border border-[#111111] p-6 transition-all duration-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-gray-800 p-4 transition-all duration-300 group-hover:bg-yellow-400 group-hover:scale-110">
          <Icon className="h-8 w-8 text-white transition-colors duration-300 group-hover:text-gray-900" />
        </div>
        <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-yellow-400">
          {name}
        </h3>
      </div>
    </div>
  );

  const SkillCategory = ({ title, skills }) => (
    <div className="space-y-8">
      <h3 className="text-2xl md:text-3xl font-bold text-[#FFFFF0] border-l-4 border-yellow-400 pl-6 font-bebas">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {skills.map((skill) => (
          <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#000000] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#FFFFF0] font-[Bebas_neue]">
            SKILLS
          </h1>
          <p className="text-lg md:text-xl text-white opacity-60 max-w-3xl mx-auto">
            A comprehensive showcase of my technical expertise and competencies
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-20">
          <SkillCategory title="Core Skills" skills={coreSkills} />
          <SkillCategory title="Programming Languages" skills={programmingLanguages} />
          <SkillCategory title="Tools & Technologies" skills={toolsTechnologies} />
        </div>

        {/* Bottom Accent */}
        <div className="flex justify-center pt-12">
          <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
