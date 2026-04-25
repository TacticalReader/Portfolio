import React from "react";
import './Tech.css';
import { motion } from "framer-motion";

import { FaLaptopCode } from "react-icons/fa";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const levelClassNames = {
  Expert: "tech-card--expert",
  Advanced: "tech-card--advanced",
  Intermediate: "tech-card--intermediate",
};

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()} className='tech-heading'>
        <p className={styles.sectionSubText}>My technical expertise</p>
        <h2 className={styles.sectionHeadText}>Technologies & Tools. <FaLaptopCode className="tech-heading-icon" /></h2>
      </motion.div>

      <div className='tech-intro'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='tech-description'
        >
          I stay current with modern web technologies and continuously expand my skillset to build cutting-edge applications.
        </motion.p>

        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="tech-legend"
        >
          <div className="tech-legend-item">
            <span className="tech-legend-dot tech-legend-dot--expert"></span> Expert
          </div>
          <div className="tech-legend-item">
            <span className="tech-legend-dot tech-legend-dot--advanced"></span> Advanced
          </div>
          <div className="tech-legend-item">
            <span className="tech-legend-dot tech-legend-dot--intermediate"></span> Intermediate
          </div>
        </motion.div>
      </div>

      <div className='tech-grid'>
        {technologies.map((technology, index) => (
          <motion.div
            className={`tech-card ${levelClassNames[technology.level] || ""}`}
            key={technology.name}
            variants={fadeIn("up", "spring", 0.08 * index, 0.75)}
          >
            <div className='tech-icon-wrap'>
              <img
                src={technology.icon}
                alt={`${technology.name} logo`}
                className='tech-icon'
                loading='lazy'
              />
            </div>
            <h3 className='tech-name'>{technology.name}</h3>
            <span className='tech-level'>{technology.level}</span>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
