
import React from "react";
import { motion } from "framer-motion";

export function AnimatedRobot() {
  return (
    <motion.div
      className="absolute right-10 bottom-10 w-40 h-40 md:w-48 md:h-48 z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full h-full">
        {/* Robot Head */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-2xl shadow-lg border-2 border-gray-200"
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
        >
          {/* Robot Eyes */}
          <div className="flex justify-center space-x-4 mt-6">
            <motion.div 
              className="w-4 h-4 bg-learnverse-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="w-4 h-4 bg-learnverse-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </div>
          
          {/* Robot Mouth */}
          <motion.div 
            className="w-10 h-1.5 bg-learnverse-accent rounded-md mx-auto mt-4"
            animate={{ width: [40, 30, 40] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        {/* Robot Body */}
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 w-28 h-24 bg-white rounded-xl shadow-lg border-2 border-gray-200"
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
        >
          {/* Robot Control Panel */}
          <div className="grid grid-cols-2 gap-2 p-2">
            <motion.div 
              className="w-4 h-4 rounded-full bg-learnverse-accent"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="w-4 h-4 rounded-full bg-learnverse-primary"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="w-4 h-4 rounded-full bg-gray-300"
              animate={{ opacity: [0.8, 0.4, 0.8] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="w-4 h-4 rounded-full bg-gray-400"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut" 
              }}
            />
          </div>
          
          {/* Robot Screen */}
          <motion.div 
            className="w-16 h-6 bg-gray-100 rounded mx-auto mt-2"
            animate={{ 
              backgroundColor: ["#f1f5f9", "#e2e8f0", "#f1f5f9"] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut" 
            }}
          >
            <motion.div 
              className="w-1/2 h-1 bg-learnverse-accent rounded-full mx-auto mt-2.5"
              animate={{ width: ["50%", "70%", "50%"] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Robot Arms */}
        <motion.div 
          className="absolute top-24 left-2 w-6 h-16 bg-white rounded-full shadow-lg border border-gray-200"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut" 
          }}
          style={{ transformOrigin: "top" }}
        />
        <motion.div 
          className="absolute top-24 right-2 w-6 h-16 bg-white rounded-full shadow-lg border border-gray-200"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </motion.div>
  );
}
