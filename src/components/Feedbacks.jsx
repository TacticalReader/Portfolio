import React from "react";
import './Feedbacks.css';
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
  date,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full relative border border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2'
  >
    {/* Realistic touch: A subtle top highlight to simulate light source */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    {/* Large decorative quote mark in background */}
    <FaQuoteLeft className='absolute top-8 right-8 text-[48px] text-white/5' />

    <div className='mt-1 relative z-10'>
      <FaQuoteLeft className='text-[#915eff] text-[24px] mb-4' />

      <p className='text-white tracking-wider text-[18px] leading-[30px] font-light font-["Inter"]'>
        {testimonial}
      </p>

      <div className='mt-7 flex items-center gap-4 pt-6 border-t border-white/5'>
        <div className="relative">
          <img
            src={image}
            alt={`feedback_by-${name}`}
            className='w-12 h-12 rounded-full object-cover border-2 border-[#915eff]'
          />
        </div>

        <div className='flex-1 flex flex-col'>
          <p className='text-[#915eff] font-bold text-[16px] font-["Orbitron"] tracking-wider'>
            {name}
          </p>
          <p className='mt-1 text-secondary text-[12px] uppercase tracking-wider font-["Space_Mono"]'>
            {designation} of {company}
          </p>
          {date && (
            <p className='mt-1 text-[#915eff] text-[11px] font-medium font-["Space_Mono"]'>
              {date}
            </p>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px] overflow-hidden relative`}>
      {/* CSS Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#915eff] via-[#6333dd] to-transparent opacity-10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#915eff] to-transparent opacity-10 blur-[80px]" />

        {/* Abstract shapes */}
        <div className="absolute top-[20%] left-[10%] w-20 h-20 border-2 border-[#915eff]/20 rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-16 h-16 border border-white/10 rotate-45" />
      </div>
      <div
        className={`bg-tertiary rounded-t-[20px] ${styles.padding} min-h-[300px] relative`}
      >
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} font-["Playfair_Display"] italic tracking-wider`}>What others say</p>
          <h2 className={`${styles.sectionHeadText} font-["Oswald"] font-bold uppercase tracking-wide`}>Testimonials.</h2>
        </motion.div>
        {/* Subtle gradient overlay for depth */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black-100 to-transparent" />
      </div>

      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
