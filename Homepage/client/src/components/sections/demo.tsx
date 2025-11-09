import { useState } from "react";
import { Play, List, Captions, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const demoVideos = [
  {
    id: 'main-demo',
    title: 'Complete Walkthrough',
    description: 'From setup to advanced AI features',
    duration: '5:32',
    thumbnail: 'main-product-demo'
  },
  {
    id: 'ai-completion',
    title: 'AI Code Completion',
    description: 'Watch intelligent autocomplete in action',
    duration: '2:15',
    icon: 'magic'
  },
  {
    id: 'debugging',
    title: 'Smart Debugging',
    description: 'AI finds and fixes bugs automatically',
    duration: '1:45',
    icon: 'bug'
  },
  {
    id: 'code-generation',
    title: 'Code Generation',
    description: 'From description to working code',
    duration: '3:20',
    icon: 'code'
  }
];

export default function DemoSection() {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);

  return (
    <section id="demo" className="py-20 bg-vscode-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See CodeAI in <span className="text-vscode-green">Action</span>
          </h2>
          <p className="text-xl text-vscode-text-secondary max-w-2xl mx-auto">
            Watch how developers are already transforming their workflow with AI-powered coding
          </p>
        </motion.div>

        {/* Video Gallery */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Main Demo Video */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative bg-vscode-secondary rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-vscode-secondary to-vscode-dark flex items-center justify-center relative">
                <div className="absolute inset-4 border border-vscode-border rounded-lg opacity-50"></div>
                <div className="text-center z-10">
                  <Play className="h-16 w-16 text-vscode-blue mb-4 opacity-80 mx-auto" />
                  <h3 className="text-lg font-semibold mb-2">Full Product Demo</h3>
                  <p className="text-sm text-vscode-text-secondary">5:32 minutes</p>
                </div>
                <button 
                  className="absolute inset-0 hover:bg-black/20 transition-all duration-300 group-hover:bg-black/30"
                  onClick={() => setSelectedVideo(demoVideos[0])}
                >
                  <span className="sr-only">Play video</span>
                </button>
              </div>
              <div className="p-4 border-t border-vscode-border">
                <h4 className="font-semibold mb-1">Complete Walkthrough</h4>
                <p className="text-sm text-vscode-text-secondary">From setup to advanced AI features</p>
              </div>
            </div>
          </motion.div>

          {/* Feature Showcase Videos */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {demoVideos.slice(1).map((video, index) => (
              <div key={video.id} className="relative group">
                <div className="bg-vscode-secondary rounded-lg overflow-hidden border border-vscode-border hover:border-vscode-blue transition-colors cursor-pointer">
                  <div className="flex">
                    <div className="relative w-32 h-20 bg-gradient-to-br from-vscode-dark to-vscode-secondary flex items-center justify-center">
                      <Play className="h-6 w-6 text-vscode-blue" />
                      <button 
                        className="absolute inset-0 hover:bg-black/20 transition-all duration-300"
                        onClick={() => setSelectedVideo(video)}
                      >
                        <span className="sr-only">Play video</span>
                      </button>
                    </div>
                    <div className="flex-1 p-3">
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <p className="text-xs text-vscode-text-secondary mb-2">{video.description}</p>
                      <div className="text-xs text-vscode-blue">{video.duration}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Video Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center items-center space-x-6 mb-8"
        >
          <Button 
            variant="outline"
            className="flex items-center space-x-2 px-4 py-2 bg-vscode-secondary border-vscode-border hover:border-vscode-blue hover:text-vscode-blue transition-all"
          >
            <List className="h-4 w-4" />
            <span>Playlist</span>
          </Button>
          <Button 
            variant="outline"
            className="flex items-center space-x-2 px-4 py-2 bg-vscode-secondary border-vscode-border hover:border-vscode-blue hover:text-vscode-blue transition-all"
          >
            <Captions className="h-4 w-4" />
            <span>Captions</span>
          </Button>
          <Button 
            variant="outline"
            className="flex items-center space-x-2 px-4 py-2 bg-vscode-secondary border-vscode-border hover:border-vscode-blue hover:text-vscode-blue transition-all"
          >
            <Maximize className="h-4 w-4" />
            <span>Fullscreen</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
