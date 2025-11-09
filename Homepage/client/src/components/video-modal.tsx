import { useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface VideoModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
}

export default function VideoModal({ 
  isOpen = false, 
  onClose = () => {}, 
  title = "Feature Demonstration", 
  description = "Watch how this feature works in real-time" 
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(33);

  const handleClose = () => {
    setIsPlaying(false);
    onClose();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:text-vscode-blue text-2xl z-10 h-10 w-10"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="bg-vscode-dark rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video bg-vscode-secondary flex items-center justify-center relative">
                {/* Video player placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlaying && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-16 w-16 text-vscode-blue opacity-80 hover:opacity-100"
                      onClick={togglePlay}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  )}
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-vscode-blue h-8 w-8"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    
                    <div className="flex-1 bg-vscode-border rounded-full h-1 cursor-pointer">
                      <div 
                        className="bg-vscode-blue rounded-full h-1 transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <span className="text-white text-sm">2:30 / 5:32</span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-vscode-blue h-8 w-8"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-vscode-blue h-8 w-8"
                    >
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-vscode-border">
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-vscode-text-secondary">{description}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
