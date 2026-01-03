import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Send, Zap, Globe, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(); // Reference for EmailJS
  const [formData, setFormData] = useState({
    user_name: '', // Changed to match EmailJS template
    user_email: '', // Changed to match EmailJS template
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // EmailJS configuration - Replace with your actual values
  const EMAILJS_SERVICE_ID = 'service_lil9cjz';
  const EMAILJS_TEMPLATE_ID = 'template_8ytdtfa';
  const EMAILJS_PUBLIC_KEY = 'OwaUGUTHDJs71lZeJ';

  // Form validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.user_name.trim()) newErrors.user_name = "Name is required";
    
    if (!formData.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Result:', result);
      
      toast({
        title: "TRANSMISSION COMPLETE",
        description: "Your message has been sent successfully. We'll respond soon.",
        variant: "default",
      });
      
      // Reset form after successful submission
      setFormData({
        user_name: '',
        user_email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      let errorMessage = "There was an error sending your message. Please try again.";
      
      if (error.text) {
        errorMessage = `Failed to send message: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "TRANSMISSION FAILED",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Glitch animation for cyberpunk effect
  const [glitchText, setGlitchText] = useState(false);
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section id="contact" className="py-20 bg-ml-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-black dark:via-gray-950 dark:to-black transition-colors duration-500">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>
      
      {/* Animated neon lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-600 tracking-tighter mb-4 text-center">
             CONTACT
          </h2>
          
          <div className="w-24 h-1 mx-auto my-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
          
          <p className="text-cyan-300 text-center max-w-2xl mx-auto text-lg opacity-80">
            Ready to collaborate? Send encrypted transmission for immediate neural sync.
          </p>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form - Takes 3 columns on large screens */}
            <div className="lg:col-span-3 border border-purple-500/30 rounded-lg bg-black/80 backdrop-blur-sm relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-pink-500"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-pink-500"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500"></div>
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <Zap className="text-cyan-400 mr-3" size={24} />
                  <h3 className="text-2xl font-bold text-white">Direct Transmission</h3>
                </div>
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="user_name" className="block text-cyan-300 mb-2 text-sm tracking-wide">IDENTIFIER</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-3.5 text-purple-400" />
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-black/60 border ${errors.user_name ? 'border-red-500' : 'border-purple-500/30'} rounded-md focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 transition-colors`}
                        placeholder="Enter your name"
                      />
                    </div>
                    {errors.user_name && <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="user_email" className="block text-cyan-300 mb-2 text-sm tracking-wide">COMM CHANNEL</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-3.5 text-purple-400" />
                      <input
                        type="email" 
                        id="user_email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 bg-black/60 border ${errors.user_email ? 'border-red-500' : 'border-purple-500/30'} rounded-md focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 transition-colors`}
                        placeholder="your.email@domain.net"
                      />
                    </div>
                    {errors.user_email && <p className="text-red-500 text-xs mt-1">{errors.user_email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-cyan-300 mb-2 text-sm tracking-wide">DATA PACKET</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-black/60 border ${errors.message ? 'border-red-500' : 'border-purple-500/30'} rounded-md focus:outline-none focus:border-cyan-400 text-white placeholder-gray-500 resize-none transition-colors`}
                      placeholder="Input your message here..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-md text-white font-medium tracking-wide transition-all duration-300 flex items-center justify-center overflow-hidden relative group"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                    {isSubmitting ? (
                      <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="flex items-center">
                        <span className="mr-2">TRANSMIT</span>
                        <Send size={18} className="animate-pulse" />
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Contact Info - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              {/* Contact Details */}
              <div className="border border-purple-500/30 rounded-lg bg-black/80 backdrop-blur-sm p-6 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-pink-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-pink-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500"></div>
                
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Globe className="text-cyan-400 mr-2" size={20} />
                  Network Coordinates
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center">
                      <Mail size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-purple-300">Secure Channel</h4>
                      <p className="text-cyan-300">hasibnirjhar100@gmail.com</p>
                      <p className="text-gray-400 text-sm mt-1">24/7 encrypted communications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center">
                      <MapPin size={18} className="text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-purple-300">Base Location</h4>
                      <p className="text-cyan-300">Bangladesh</p>
                      <p className="text-gray-400 text-sm mt-1">Global digital operations available</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="border border-purple-500/30 rounded-lg bg-black/80 backdrop-blur-sm p-6 relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-pink-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-pink-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500"></div>
                
                <h3 className="text-xl font-bold text-white mb-6">Neural Network Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 border border-purple-500/30 rounded-lg hover:bg-purple-900/30 transition-colors group"
                  >
                    <svg className="w-6 h-6 text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 border border-purple-500/30 rounded-lg hover:bg-purple-900/30 transition-colors group"
                  >
                    <svg className="w-6 h-6 text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 border border-purple-500/30 rounded-lg hover:bg-purple-900/30 transition-colors group"
                  >
                    <svg className="w-6 h-6 text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 border border-purple-500/30 rounded-lg hover:bg-purple-900/30 transition-colors group"
                  >
                    <svg className="w-6 h-6 text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the CSS for grid pattern and glitch effect */}
      <style>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .cyberpunk-glitch {
          position: relative;
          animation: glitch 200ms linear;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
      `}</style>
    </section>
  );
};

export default Contact;