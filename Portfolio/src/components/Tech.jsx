import React from "react";
import { motion } from "framer-motion";

import { FaLaptopCode } from "react-icons/fa";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies & Tools. <FaLaptopCode className="inline-block" /></h2>
      </motion.div>

      <div className='w-full flex flex-col'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          I stay current with modern web technologies and continuously expand my skillset to build cutting-edge applications.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-5 flex gap-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shadow-[0_0_10px_#FFD700] bg-[#FFD700]"></span> Expert
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shadow-[0_0_10px_#A020F0] bg-[#A020F0]"></span> Advanced
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shadow-[0_0_10px_#00BFFF] bg-[#00BFFF]"></span> Intermediate
          </div>
        </motion.div>
      </div>

      <div className='flex flex-row flex-wrap justify-center gap-10 mt-10'>
        {technologies.map((technology, index) => {
          let shadowColor = "";
          if (technology.level === "Expert") shadowColor = "#FFD700"; // Gold
          else if (technology.level === "Advanced") shadowColor = "#A020F0"; // Purple
          else if (technology.level === "Intermediate") shadowColor = "#00BFFF"; // Blue

          return (
            <motion.div
              className='w-28 h-28 rounded-full'
              style={{ boxShadow: `0 0 25px -5px ${shadowColor}` }}
              key={technology.name}
              variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
            >
              <BallCanvas icon={technology.icon} />
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
