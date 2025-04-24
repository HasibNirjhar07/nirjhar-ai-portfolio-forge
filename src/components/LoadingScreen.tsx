// Loading screen
import { useState, useEffect } from 'react';

const LoadingScreen = ({ isLoaded, loadingProgress, setIsLoaded }) => {
  const [currentText, setCurrentText] = useState(0);
  const loadingTexts = [
    "Loading character data...",
    "Initializing skill matrix...",
    "Calibrating achievements...",
    "Processing inventory items...",
    "Establishing neural links...",
    "Synchronizing combat systems..."
  ];

  // Handle text typing animation
  useEffect(() => {
    if (isLoaded) return;
    
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    
    return () => clearInterval(textInterval);
  }, [isLoaded]);

  // Random cyberpunk glitch effect
  useEffect(() => {
    if (isLoaded) return;
    
    const glitchElements = document.querySelectorAll('.glitch-element');
    
    const glitchInterval = setInterval(() => {
      glitchElements.forEach(element => {
        if (Math.random() > 0.85) {
          element.classList.add('active-glitch');
          setTimeout(() => {
            element.classList.remove('active-glitch');
          }, 150);
        }
      });
    }, 500);
    
    return () => clearInterval(glitchInterval);
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
        {/* Background matrix effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="matrix-bg"></div>
        </div>
        
        {/* Scanner line effect */}
        <div className="absolute inset-0 scanner-line"></div>
        
        {/* Header with glitch effect */}
        <div className="relative mb-10">
          <div className="text-4xl font-bold text-green-500 glitch-text glitch-element" 
               data-text="LOADING CHARACTER">LOADING CHARACTER</div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <span className="text-blue-400 opacity-0 glitch-effect">LOADING CHARACTER</span>
          </div>
        </div>
        
        {/* Progress bar with enhanced animations */}
        <div className="w-64 h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700 relative">
          <div 
            className="h-full bg-gradient-to-r from-green-500 via-cyan-400 to-green-500 rounded-full transition-all duration-300 pulse-glow"
            style={{ width: `${loadingProgress}%` }}
          >
            <div className="absolute inset-0 glow-overlay"></div>
          </div>
          {/* Progress bar scanline */}
          <div className="absolute inset-0 scanline"></div>
        </div>
        
        {/* Percentage with flickering effect */}
        <div className="mt-3 text-green-400 font-mono text-xl flicker-text glitch-element">{loadingProgress}%</div>
        
        {/* Animated data terminals */}
        <div className="mt-8 max-w-md text-center">
          <div className="font-mono text-sm text-cyan-500 typing-animation">
            {loadingTexts[currentText]}
          </div>
          
          {/* Data streams */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="data-stream-container">
                <div className="data-stream"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Artificial delay for visual effect */}
        {loadingProgress >= 100 && (
          <div className="mt-8">
            <button 
              onClick={() => setIsLoaded(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 pulse-button"
            >
              ENTER SYSTEM
            </button>
          </div>
        )}
        
        {/* Required CSS */}
        <style jsx>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
          
          @keyframes flicker {
            0% { opacity: 1; }
            8% { opacity: 0.8; }
            10% { opacity: 1; }
            20% { opacity: 1; }
            20.5% { opacity: 0.5; }
            21% { opacity: 1; }
            60% { opacity: 1; }
            60.5% { opacity: 0.2; }
            61% { opacity: 1; }
            90% { opacity: 1; }
            95% { opacity: 0.8; }
            100% { opacity: 1; }
          }
          
          @keyframes matrixRain {
            0% { top: -50%; }
            100% { top: 110%; }
          }
          
          @keyframes scan {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          
          @keyframes dataStream {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          
          .pulse-glow {
            animation: pulse 1.5s infinite;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
          }
          
          .glow-overlay {
            box-shadow: 0 0 10px 2px rgba(6, 182, 212, 0.7) inset;
          }
          
          .typing-animation {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #22d3ee;
            animation: typing 2s steps(40), flicker 0.75s step-end infinite alternate;
          }
          
          .flicker-text {
            animation: flicker 3s infinite;
          }
          
          .matrix-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(rgba(0, 20, 0, 0.5), rgba(0, 20, 0, 0.5)), 
                        repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 0, 0.1) 1px, rgba(0, 255, 0, 0.1) 2px);
            overflow: hidden;
          }
          
          .active-glitch {
            transform: skew(1deg);
            text-shadow: 2px 0 0 rgba(255, 0, 128, 0.5), -2px 0 0 rgba(0, 255, 255, 0.5);
          }
          
          .scanline {
            height: 2px;
            width: 100%;
            background-color: rgba(6, 182, 212, 0.5);
            position: absolute;
            animation: scanline 2s linear infinite;
          }
          
          .scanner-line {
            height: 2px;
            width: 100%;
            background: linear-gradient(to right, transparent, rgba(6, 182, 212, 0.8), transparent);
            opacity: 0.6;
            animation: scan 4s linear infinite;
          }
          
          .data-stream-container {
            height: 40px;
            overflow: hidden;
            background-color: rgba(2, 20, 20, 0.5);
            border: 1px solid rgba(6, 182, 212, 0.3);
            position: relative;
          }
          
          .data-stream {
            position: absolute;
            height: 300%;
            width: 100%;
            top: -100%;
            background: repeating-linear-gradient(
              0deg,
              rgba(6, 182, 212, 0.15) 0px,
              rgba(6, 182, 212, 0.15) 1px,
              transparent 1px,
              transparent 5px
            );
            animation: dataStream 8s linear infinite;
          }
          
          .pulse-button {
            animation: pulse 2s infinite;
            box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
          }
          
          .glitch-text {
            position: relative;
            text-shadow: 0 0 5px rgba(6, 182, 212, 0.8);
          }
          
          .glitch-text:before, .glitch-text:after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          
          .glitch-text:before {
            left: 2px;
            color: #ff00ff;
            opacity: 0;
          }
          
          .glitch-text:after {
            left: -2px;
            color: #00ffff;
            opacity: 0;
          }
          
          .active-glitch:before, .active-glitch:after {
            opacity: 0.8;
          }
        `}</style>
      </div>
    );
  }
  
  return null;
};

export default LoadingScreen;

