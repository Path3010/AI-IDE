import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface ThreeSceneProps {
  scrollProgress?: number;
}

export default function ThreeScene({ scrollProgress = 0 }: ThreeSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Create monitor base
    const baseGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x2d2d30 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1.5;
    
    // Create monitor stand
    const standGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8);
    const standMaterial = new THREE.MeshLambertMaterial({ color: 0x2d2d30 });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.y = -1.1;
    
    // Create monitor screen
    const monitorGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.1);
    const monitorMaterial = new THREE.MeshLambertMaterial({ color: 0x1e1e1e });
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
    monitor.position.y = -0.3;
    monitor.castShadow = true;
    monitor.receiveShadow = true;
    
    // Create screen surface
    const screenGeometry = new THREE.PlaneGeometry(2, 1.2);
    const screenMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0a0a0a,
      transparent: true,
      opacity: 0.95
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, -0.3, 0.06);
    
    // Create VS Code-like interface elements
    // Top bar
    const topBarGeometry = new THREE.PlaneGeometry(2, 0.08);
    const topBarMaterial = new THREE.MeshBasicMaterial({ color: 0x323233 });
    const topBar = new THREE.Mesh(topBarGeometry, topBarMaterial);
    topBar.position.set(0, 0.26, 0.001);
    screen.add(topBar);
    
    // Sidebar
    const sidebarGeometry = new THREE.PlaneGeometry(0.4, 1.04);
    const sidebarMaterial = new THREE.MeshBasicMaterial({ color: 0x252526 });
    const sidebar = new THREE.Mesh(sidebarGeometry, sidebarMaterial);
    sidebar.position.set(-0.8, -0.08, 0.001);
    screen.add(sidebar);
    
    // Code area
    const codeAreaGeometry = new THREE.PlaneGeometry(1.6, 1.04);
    const codeAreaMaterial = new THREE.MeshBasicMaterial({ color: 0x1e1e1e });
    const codeArea = new THREE.Mesh(codeAreaGeometry, codeAreaMaterial);
    codeArea.position.set(0.2, -0.08, 0.001);
    screen.add(codeArea);
    
    // Add animated code lines
    const lineColors = [0x569cd6, 0x4ec9b0, 0xdcdcaa, 0xce9178, 0x9cdcfe];
    for (let i = 0; i < 12; i++) {
      const lineGeometry = new THREE.PlaneGeometry(1.4, 0.025);
      const lineMaterial = new THREE.MeshBasicMaterial({ 
        color: lineColors[i % lineColors.length],
        transparent: true,
        opacity: 0.8
      });
      const line = new THREE.Mesh(lineGeometry, lineMaterial);
      line.position.set(0.2, 0.45 - i * 0.08, 0.002);
      line.scale.x = 0.2 + Math.random() * 0.8;
      codeArea.add(line);
    }
    
    // Create cursor blink effect
    const cursorGeometry = new THREE.PlaneGeometry(0.015, 0.025);
    const cursorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 1
    });
    const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
    cursor.position.set(0.1 + Math.random() * 0.5, 0.37 - Math.random() * 0.8, 0.003);
    codeArea.add(cursor);
    
    // Group everything together
    const ideGroup = new THREE.Group();
    ideGroup.add(base);
    ideGroup.add(stand);
    ideGroup.add(monitor);
    ideGroup.add(screen);
    meshRef.current = ideGroup;

    scene.add(ideGroup);

    // Add particles for tech effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x007acc,
      size: 0.02,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x007acc, 1, 100);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-1, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
        
        // Simple floating animation
        meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.002;
        particlesRef.current.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update rotation based on scroll
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z = scrollProgress * Math.PI * 2;
      meshRef.current.position.y = scrollProgress * 2;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.x = scrollProgress * Math.PI;
    }

    if (cameraRef.current) {
      cameraRef.current.position.z = 5 + scrollProgress * 3;
    }
  }, [scrollProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}