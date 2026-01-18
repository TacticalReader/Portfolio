import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { fadeIn, textVariant } from "../utils/motion";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <motion.span variants={textVariant(0.5)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className='text-[#915EFF]'>Tanmay</motion.span>
          </h1>
          <motion.p variants={fadeIn("", "", 0.1, 1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </motion.p>
          <motion.div variants={fadeIn("", "", 0.5, 1)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.25 }} className='flex gap-4 mt-5'>
             <a href="#" className="text-white hover:text-[#915EFF] text-[24px]">
               <FaGithub />
             </a>
             <a href="#" className="text-white hover:text-[#915EFF] text-[24px]">
               <FaLinkedin />
             </a>
             <a href="#" className="text-white hover:text-[#915EFF] text-[24px]">
               <FaTwitter />
             </a>
          </motion.div>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
