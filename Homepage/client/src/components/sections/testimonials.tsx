import { User, Star, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Full Stack Developer",
    text: "CodeAI has completely transformed my development workflow. The AI suggestions are incredibly accurate and save me hours every day.",
    color: "bg-vscode-blue"
  },
  {
    name: "Marcus Rodriguez",
    role: "Tech Lead at StartupCo",
    text: "The debugging features are game-changing. It's like having a senior developer pair programming with you 24/7.",
    color: "bg-vscode-green"
  },
  {
    name: "Emily Johnson",
    role: "Freelance Developer",
    text: "I can deliver projects 3x faster now. The AI understands my coding style and generates exactly what I need.",
    color: "bg-vscode-yellow"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-vscode-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Developers Are <span className="text-vscode-blue">Saying</span>
          </h2>
          <p className="text-xl text-vscode-text-secondary">
            Join thousands of developers already using CodeAI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-vscode-dark rounded-lg border border-vscode-border p-6 relative hover:border-vscode-blue transition-colors group"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center mr-4`}>
                  <User className={`text-white ${testimonial.color === 'bg-vscode-yellow' ? 'text-vscode-dark' : ''}`} />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-vscode-text-secondary">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="text-vscode-text-secondary mb-4">
                "{testimonial.text}"
              </p>
              
              <div className="flex text-vscode-yellow mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              
              {/* Video testimonial button */}
              <button className="absolute top-4 right-4 text-vscode-text-secondary hover:text-vscode-blue transition-colors opacity-0 group-hover:opacity-100">
                <PlayCircle className="h-6 w-6" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
