import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-vscode-dark/95 backdrop-blur-sm border-b border-vscode-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code className="text-vscode-blue text-2xl" />
            <span className="font-semibold text-xl">CodeAI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="hover:text-vscode-blue transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="hover:text-vscode-blue transition-colors"
            >
              Demo
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="hover:text-vscode-blue transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-vscode-blue transition-colors"
            >
              About
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              className="hidden sm:block border-vscode-border hover:border-vscode-blue hover:text-vscode-blue bg-transparent"
            >
              Sign In
            </Button>
            <Button 
              size="sm"
              className="bg-vscode-blue hover:bg-blue-600 text-white"
            >
              Get Early Access
            </Button>
          </div>
          
          <button 
            className="md:hidden text-vscode-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-vscode-secondary border-b border-vscode-border"
        >
          <div className="px-4 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('features')}
              className="block w-full text-left hover:text-vscode-blue transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="block w-full text-left hover:text-vscode-blue transition-colors"
            >
              Demo
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left hover:text-vscode-blue transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="block w-full text-left hover:text-vscode-blue transition-colors"
            >
              About
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
