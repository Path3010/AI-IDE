import { useState } from "react";
import { Wand2, Search, Users, Bug, Code, FlaskConical, Play } from "lucide-react";
import { motion } from "framer-motion";
import VideoModal from "@/components/video-modal";

const features = [
  {
    icon: Wand2,
    title: "AI Code Completion",
    description: "Intelligent autocomplete that understands context and suggests entire functions, not just variables.",
    code: "// AI suggests: async function fetchUser(id) { ... }",
    tags: [],
    color: "text-vscode-green"
  },
  {
    icon: Search,
    title: "Real-time Analysis",
    description: "Instant code quality feedback, performance suggestions, and bug detection as you type.",
    code: "",
    tags: ["Performance", "Security"],
    color: "text-vscode-blue"
  },
  {
    icon: Users,
    title: "Collaborative AI",
    description: "AI that learns from your team's coding patterns and maintains consistency across projects.",
    code: "",
    tags: [],
    color: "text-vscode-yellow"
  },
  {
    icon: Bug,
    title: "Smart Debugging",
    description: "AI-powered debugging that identifies root causes and suggests fixes automatically.",
    code: "🔍 Potential null reference at line 42",
    tags: [],
    color: "text-red-400"
  },
  {
    icon: Code,
    title: "Code Generation",
    description: "Describe what you want in plain English, and watch AI generate production-ready code.",
    code: "Create a REST API endpoint for user authentication",
    tags: [],
    color: "text-vscode-green"
  },
  {
    icon: FlaskConical,
    title: "Testing Assistant",
    description: "Automatically generate unit tests, integration tests, and identify edge cases you missed.",
    code: "✓ 94% Coverage • 12 Tests",
    tags: [],
    color: "text-vscode-yellow"
  }
];

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index);
    setSelectedVideo(features[index]);
    setIsVideoModalOpen(true);
  };

  return (
    <section id="features" className="py-20 bg-vscode-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features, <span className="text-vscode-blue">Familiar Interface</span>
          </h2>
          <p className="text-xl text-vscode-text-secondary max-w-2xl mx-auto">
            Everything you love about VS Code, enhanced with cutting-edge AI capabilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-vscode-dark rounded-lg border border-vscode-border overflow-hidden group hover:border-vscode-blue transition-all duration-300 cursor-pointer"
              onClick={() => handleFeatureClick(index)}
            >
              <div className="relative h-48 bg-vscode-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-vscode-dark/50 to-vscode-secondary/50 flex items-center justify-center">
                  <feature.icon className={`h-16 w-16 ${feature.color} opacity-80`} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-vscode-dark/80 to-transparent"></div>
                <button 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFeatureClick(index);
                  }}
                >
                  <Play className="text-white text-3xl" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <feature.icon className={`${feature.color} text-xl mr-3`} />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-vscode-text-secondary mb-4">
                  {feature.description}
                </p>
                
                {feature.code && (
                  <div className="text-sm font-mono text-vscode-yellow bg-vscode-secondary/50 p-2 rounded">
                    {feature.code}
                  </div>
                )}
                
                {feature.tags.length > 0 && (
                  <div className="flex space-x-2 mt-4">
                    {feature.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-vscode-green/20 text-vscode-green text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          title={selectedVideo?.title || "Feature Demo"}
          description={selectedVideo?.description || "Watch this feature in action"}
        />
      </div>
    </section>
  );
}
