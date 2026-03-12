"use client";

import { motion } from "framer-motion";
import ScrollyVideo from "./ScrollyVideo";

export default function FleetHero() {
    return (
        <section className="relative w-full overflow-hidden bg-black">
            {/* The ScrollyVideo component pins itself and the children to the screen for the duration of the scroll */}
            <ScrollyVideo
                folderPath="/Sequence 1"
                frameCount={55}
                filePrefix="Sequence"
                fileExtension="jpg"
                startIndex={0}
                padLength={2}
                className="bg-black"
            >
                {/* Background Accent Gradients (pinned with content) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[800px] bg-red-600/10 blur-[150px] rounded-full" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-8 w-full px-6 md:px-12 h-full justify-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-3xl space-y-6"
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[1.1] font-outfit text-white tracking-tight drop-shadow-2xl shadow-black">
                            Execution- <br />
                            Driven <br />
                            <span className="text-[#ee3425]">Goods</span> <br />
                            <span className="text-[#ee3425]">Transportation</span> <br />
                            <span className="text-blue-500">Solutions.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-xl font-inter drop-shadow-md bg-black/50 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                            Robust transportation solutions that keep your business moving securely, sustainably, and cost-effectively.
                        </p>
                    </motion.div>
                </div>
            </ScrollyVideo>
        </section>
    );
}
