import React from "react";
import './About.css';
import { FaUserGraduate } from 'react-icons/fa';
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, potrait } from "../assets";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center font-["Oswald"] tracking-wide'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} font-["Playfair_Display"] italic tracking-wider text-secondary text-[18px]`}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} font-["Oswald"] font-bold uppercase tracking-wider`}>Overview. <FaUserGraduate className="inline-block" /></h2>
      </motion.div>

      <div className='flex flex-col-reverse gap-10 md:flex-row md:items-center'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='m-[6px] p-[8px] text-secondary text-[17px] max-w-3xl leading-[30px] font-["Inter"] font-normal'
        >
          I'm a skilled <strong className="font-['Orbitron'] text-[#915eff]">software developer</strong> with experience in <strong className="font-['Orbitron'] text-[#915eff]">TypeScript</strong> and
          <strong className="font-['Orbitron'] text-[#915eff]">JavaScript</strong>, and expertise in frameworks like <strong className="font-['Orbitron'] text-[#915eff]">React</strong>, <strong className="font-['Orbitron'] text-[#915eff]">Node.js</strong>, and
          <strong className="font-['Orbitron'] text-[#915eff]">Three.js</strong>. I also work extensively with <strong className="font-['Orbitron'] text-[#915eff]">Next.js</strong> for building modern web applications,
          <strong className="font-['Orbitron'] text-[#915eff]">Chart.js</strong> for creating beautiful data visualizations, and animation libraries like
          <strong className="font-['Orbitron'] text-[#915eff]">GSAP</strong> and <strong className="font-['Orbitron'] text-[#915eff]">Anime.js</strong> to bring interfaces to life with smooth, engaging animations.
          I'm a quick learner and collaborate closely with clients to
          create efficient, scalable, and <strong className="font-['Orbitron'] text-[#915eff]">user-friendly</strong> solutions that solve
          real-world problems. Let's work together to bring your ideas to <strong className="font-['Orbitron'] text-[#915eff]">life</strong>!
          <br />
          <span className="text-white font-['Sacramento'] text-[32px] block mt-4 opacity-80 rotate-[-2deg]">
            Tanmay .
          </span>
        </motion.p>
        <motion.div
          variants={fadeIn("left", "", 0.2, 1)}
          className='w-full md:w-auto flex justify-center'
        >
          <div className='relative w-[200px] h-[200px] md:w-[250px] md:h-[250px]'>
            <img
              src={potrait}
              alt='profile'
              className='w-full h-full object-cover rounded-full border-4 border-white/10 shadow-card'
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#915eff] to-transparent opacity-30" />
          </div>
        </motion.div>
      </div>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
