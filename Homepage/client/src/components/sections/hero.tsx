import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Volume2, VolumeX, Pause, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ThreeScene from "@/components/three-scene";
import BackgroundVideo from "@/components/background-video";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { scrollProgress } = useSmoothScroll();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <BackgroundVideo isPlaying={isVideoPlaying} isMuted={isMuted} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vscode-dark/60 to-vscode-dark/90"></div>
      </div>

      {/* Hero Content - Split into two columns */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Text Content */}
        <div className="text-center lg:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">Code Smarter</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vscode-blue to-vscode-green">
            With AI
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-vscode-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          The next-generation IDE that understands your code, suggests improvements, and writes alongside you. Experience the familiar VS Code interface powered by advanced AI.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button 
            size="lg"
            className="px-8 py-4 bg-vscode-blue text-white text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="px-8 py-4 border-2 border-vscode-blue text-vscode-blue text-lg font-semibold hover:bg-vscode-blue hover:text-white transition-all bg-transparent"
          >
            Join Waitlist
          </Button>
        </motion.div>

          {/* Video Controls */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center lg:justify-start items-center space-x-6 text-vscode-text-secondary"
          >
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="hover:text-vscode-blue transition-colors"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <span className="text-sm">Background video</span>
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="hover:text-vscode-blue transition-colors"
            >
              {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
          </motion.div>
        </div>

        {/* Right Column - 3D Scene */}
        <div className="hidden lg:block h-96">
          <ThreeScene scrollProgress={scrollProgress} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="text-vscode-text-secondary text-2xl" />
      </motion.div>
    </section>
  );
}
