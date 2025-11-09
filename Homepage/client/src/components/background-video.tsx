import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundVideoProps {
  isPlaying?: boolean;
  isMuted?: boolean;
}

export default function BackgroundVideo({ isPlaying = true, isMuted = true }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1920;
    canvas.height = 1080;

    // Create animated code background
    const createCodeAnimation = () => {
      const lines = [];
      const codeSnippets = [
        '// AI-powered code completion',
        'function generateCode(prompt: string) {',
        '  const result = ai.complete(prompt);',
        '  return result.suggestions;',
        '}',
        '',
        'interface CodeSuggestion {',
        '  text: string;',
        '  confidence: number;',
        '  type: "function" | "variable" | "import";',
        '}',
        '',
        '// Real-time code analysis',
        'const analyzer = new CodeAnalyzer({',
        '  detectBugs: true,',
        '  suggestOptimizations: true,',
        '  checkSecurity: true',
        '});',
        '',
        'export default class AIAssistant {',
        '  async analyze(code: string): Promise<Analysis> {',
        '    return await this.engine.process(code);',
        '  }',
        '}',
      ];

      for (let i = 0; i < codeSnippets.length; i++) {
        lines.push({
          text: codeSnippets[i],
          y: i * 25 + 50,
          opacity: 0.8,
          color: i % 3 === 0 ? '#569cd6' : i % 3 === 1 ? '#4ec9b0' : '#dcdcaa'
        });
      }

      return lines;
    };

    const lines = createCodeAnimation();
    let animationId: number;

    const animate = () => {
      // Clear canvas with VS Code dark background
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating particles
      ctx.fillStyle = 'rgba(0, 122, 204, 0.3)';
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(Date.now() * 0.001 + i) * 200) + canvas.width / 2;
        const y = (Math.cos(Date.now() * 0.0005 + i) * 100) + canvas.height / 2;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw code lines
      ctx.font = '16px "JetBrains Mono", monospace';
      lines.forEach((line, index) => {
        ctx.fillStyle = line.color;
        ctx.globalAlpha = line.opacity * (0.5 + Math.sin(Date.now() * 0.002 + index * 0.1) * 0.3);
        ctx.fillText(line.text, 100, line.y + Math.sin(Date.now() * 0.001 + index) * 5);
      });

      ctx.globalAlpha = 1;

      // Draw VS Code-like sidebar
      ctx.fillStyle = '#252526';
      ctx.fillRect(0, 0, 60, canvas.height);

      // Draw activity icons
      const icons = ['📁', '🔍', '🔗', '🐛', '⚙️'];
      icons.forEach((icon, index) => {
        ctx.font = '20px Arial';
        ctx.fillStyle = '#cccccc';
        ctx.fillText(icon, 20, 50 + index * 60);
      });

      animationId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 0.6 : 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 w-full h-full"
    >
      <video
        ref={videoRef}
        className="hidden"
        muted={isMuted}
        playsInline
        loop
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          filter: 'blur(1px)',
          opacity: 0.4
        }}
      />
    </motion.div>
  );
}