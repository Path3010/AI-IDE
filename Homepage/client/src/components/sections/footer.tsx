import { Code } from "lucide-react";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Demo Videos", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Video Tutorials", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy", href: "#" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-vscode-secondary border-t border-vscode-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Code className="text-vscode-blue text-2xl" />
              <span className="font-semibold text-xl">CodeAI</span>
            </div>
            <p className="text-vscode-text-secondary mb-4">
              The AI-powered IDE that transforms how developers write code.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-vscode-text-secondary hover:text-vscode-blue transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-vscode-text-secondary hover:text-vscode-blue transition-colors">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-vscode-text-secondary hover:text-vscode-blue transition-colors">
                <FaDiscord className="h-5 w-5" />
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-vscode-text-secondary">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="hover:text-vscode-blue transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-vscode-border mt-8 pt-8 text-center text-vscode-text-secondary">
          <p>&copy; 2024 CodeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
