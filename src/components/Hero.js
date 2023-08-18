import React from "react";
import { AiOutlineRobot } from "react-icons/ai";

const Hero = () => {
  return (
    <div className="w-full px-4 md:px-20">
      <nav className="py-6 flex justify-between">
        {/* logo */}
        <div className="flex items-center gap-1 md:gap-2 cursor-pointer">
          <AiOutlineRobot size={30} className="text-[#ff385c]" />
          <span className="font-semibold md:text-2xl text-lg ">
            Article Summarizer
          </span>
        </div>
        {/* source code button */}
        <button
          onClick={() =>
            window.open(
              "https://github.com/ZihadHossainNayem/AI-Article-Summarizer"
            )
          }
          className="px-3 md:px-4 py-2 rounded-2xl bg-[#ff385c] text-white font-medium 
          hover:bg-white hover:text-[#ff385c] border border-white hover:border-[#ff385c]"
        >
          <span className="text-sm md:text-base">Source Code</span>
        </button>
      </nav>
      {/* title + sub title */}
      <h1 className="mt-4 md:mt-12 md:text-4xl text-3xl text-center font-bold">
        Get the Summary of any Article powered by{" "}
        <span className="text-[#ff385c]">OpenAI</span>
      </h1>
      <h3 className="mt-4 md:mt-8 text-center text-gray-500">
        Dive into Article Summaries Enhanced by ChatGPT AI. Transform Lengthy
        Reads into Bites of Wisdom, Empowering You to Learn More, Faster &
        Experience Clarity.
      </h3>
    </div>
  );
};

export default Hero;
