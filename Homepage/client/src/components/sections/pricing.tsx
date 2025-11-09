import { Button } from "@/components/ui/button";
import { Rocket, Check } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Developers Waiting", value: "10,000+", color: "text-vscode-blue" },
  { label: "Lines of Code", value: "1M+", color: "text-vscode-green" },
  { label: "Languages Supported", value: "50+", color: "text-vscode-yellow" },
  { label: "AI Accuracy", value: "99%", color: "text-vscode-blue" }
];

const features = [
  "All AI features included",
  "VS Code compatibility",
  "Priority support",
  "Shape future features"
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-vscode-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-vscode-green">Get Started?</span>
          </h2>
          <p className="text-xl text-vscode-text-secondary max-w-2xl mx-auto">
            Join the early access program and be among the first to experience the future of coding
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto bg-vscode-secondary rounded-2xl border border-vscode-border overflow-hidden mb-16"
        >
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-vscode-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Early Access</h3>
            <p className="text-vscode-text-secondary mb-6">
              Be the first to try CodeAI and help shape the future of AI-powered development
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-center space-x-3"
                >
                  <Check className="text-vscode-green h-5 w-5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <Button 
                size="lg"
                className="w-full px-8 py-4 bg-vscode-blue text-white text-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Join Waitlist
              </Button>
              <p className="text-sm text-vscode-text-secondary">
                Free during beta • No credit card required
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-vscode-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
