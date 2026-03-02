import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Layers, 
  Terminal, 
  ChevronRight, 
  Send,
  Sparkles,
  BrainCircuit,
  Award,
  GraduationCap,
  Briefcase,
  X,
  MessageSquare
} from 'lucide-react';
import { chatWithResume } from './services/aiService';

// Types
interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

interface Skill {
  name: string;
  category: 'frontend' | 'ai' | 'tools' | 'other';
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

// Configuration - Update your profile image URL here!
const PROFILE_IMAGE_URL = "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=800&q=80";

// Data
const PROJECTS: Project[] = [
  {
    title: "AI Resume Builder",
    description: "A tool that uses LLMs to help users craft professional resumes based on their experience and target roles.",
    tags: ["React", "Gemini API", "Tailwind CSS"],
  },
  {
    title: "Deep-Zoom Medical Viewer",
    description: "A high-performance visualization tool for large-scale medical imaging data with smooth zooming and panning.",
    tags: ["Angular", "Canvas API", "RxJS"],
  },
  {
    title: "Collaboration Dashboard",
    description: "A real-time dashboard for team collaboration featuring live updates and interactive data visualizations.",
    tags: ["Next.js", "WebSockets", "D3.js"],
  }
];
const EXPERIENCES: Experience[] = [
  {
    company: "Bio-Rad Laboratories",
    role: "Senior Frontend Developer / UI Developer",
    period: "August 2022 - Present",
    location: "Hercules, California, United States",
    highlights: [
      "Led development of AI-driven imaging interfaces using Angular 16+, enabling deep-zoom visualization of complex clinical datasets.",
      "Developed scalable, component-driven UIs using Angular 18, React, and Vue.",
      "Collaborated with ML engineers to translate requirements into intuitive AI-powered user experiences.",
      "Implemented modern UI styling using Tailwind CSS and Material UI."
    ]
  },
  {
    company: "The Reynolds and Reynolds Company",
    role: "React Developer / UI Developer",
    period: "October 2019 - July 2022",
    location: "Salem, North Carolina, United States",
    highlights: [
      "Developed and maintained large-scale React.js SPAs with complex state management using Redux.",
      "Designed and implemented reusable UI components using TypeScript, Next.js, and Tailwind CSS.",
      "Collaborated with cross-functional Agile teams to deliver high-quality, data-driven user experiences."
    ]
  },
  {
    company: "Express Scripts by Evernorth",
    role: "Frontend Developer / UI Developer",
    period: "May 2017 - September 2019",
    location: "Franklin, New Jersey, United States",
    highlights: [
      "Developed high-traffic JavaScript-driven web applications using React.js and AngularJS.",
      "Implemented NgRx state management to control user privileges and dynamically adjust UI access.",
      "Integrated front-end modules with RESTful and SOAP APIs for healthcare backend systems."
    ]
  }
];

const SKILLS: Skill[] = [
  { name: "React / Next.js", category: 'frontend' },
  { name: "Angular 18+", category: 'frontend' },
  { name: "Vue.js", category: 'frontend' },
  { name: "TypeScript", category: 'frontend' },
  { name: "Tailwind CSS", category: 'frontend' },
  { name: "AI-Driven UI", category: 'ai' },
  { name: "Generative AI", category: 'ai' },
  { name: "Prompt Engineering", category: 'ai' },
  { name: "Redux / NgRx", category: 'tools' },
  { name: "RxJS", category: 'tools' },
  { name: "Node.js", category: 'tools' },
  { name: "GraphQL / REST", category: 'tools' }
];

const CERTIFICATIONS = [
  "Generative AI for Developers",
  "AI and Career Empowerment",
  "Prompt Engineering",
  "Application Security For Developers",
  "Cloud Generative AI"
];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', parts: [{ text: userMessage }] }]);
    setIsTyping(true);

    const response = await chatWithResume(userMessage, chatHistory);
    
    setIsTyping(false);
    setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: response || "I'm not sure about that." }] }]);
  };

  return (
    <div className="min-h-screen grid-background selection:bg-ai-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-ai-bg/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center ai-glow">
              <span className="text-ai-bg font-display font-bold text-xl">MV</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">Mukharji Vajje</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#experience" className="text-sm font-medium hover:text-ai-primary transition-colors">Experience</a>
            <a href="#projects" className="text-sm font-medium hover:text-ai-primary transition-colors">Projects</a>
            <a href="#skills" className="text-sm font-medium hover:text-ai-primary transition-colors">Skills</a>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-ai-primary" />
              AI Assistant
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-32 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-ai-primary/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-ai-secondary/10 blur-[100px] rounded-full" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ai-primary/10 border border-ai-primary/20 text-ai-primary text-xs font-bold uppercase tracking-wider mb-6">
                <BrainCircuit className="w-3 h-3" />
                AI-Powered Interface Specialist
              </div>
              <h1 className="text-6xl sm:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
                Crafting the <span className="ai-gradient-text">Future of UI</span> with Intelligence.
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl">
                Senior Frontend Developer with 9+ years of experience building high-performance, 
                AI-driven interfaces and scalable enterprise applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="mailto:mukharjivajje@gmail.com"
                  className="px-8 py-4 bg-ai-primary text-ai-bg font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Me
                </a>
                <a 
                  href="https://www.linkedin.com/in/mukharji-vajje-182a7a326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-ai-primary to-ai-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-64 h-80 sm:w-80 sm:h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-ai-bg">
                <img 
                  src={PROFILE_IMAGE_URL} 
                  alt="Mukharji Vajje"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-ai-bg border border-white/10 rounded-2xl p-4 flex items-center justify-center ai-glow">
                <div className="text-center">
                  <div className="text-ai-primary font-display font-bold text-xl">9+</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Years Exp</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats / Quick Info */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { label: "Years Experience", value: "9+", icon: Briefcase },
            { label: "Tech Stack", value: "Modern Web", icon: Code2 },
            { label: "Specialization", value: "AI Interfaces", icon: Cpu }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 flex items-center gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-ai-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-ai-primary" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                <div className="text-2xl font-display font-bold">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-display font-bold">Experience</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-ai-primary ai-glow" />
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-white">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-ai-primary font-medium">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-slate-400">{exp.period}</div>
                    <div className="text-xs text-slate-500 flex items-center justify-end gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-slate-400 flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-ai-primary mt-1 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-display font-bold">Personal Projects</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 group hover:border-ai-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-ai-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal className="w-6 h-6 text-ai-primary" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3 group-hover:text-ai-primary transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-slate-500 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills & Certs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <section id="skills">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-display font-bold">Technical Arsenal</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, i) => (
                <span 
                  key={i}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:scale-105 cursor-default
                    ${skill.category === 'ai' 
                      ? 'bg-ai-primary/10 border-ai-primary/30 text-ai-primary' 
                      : 'bg-white/5 border-white/10 text-slate-300'}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-display font-bold">Certifications</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="glass-panel p-4 flex items-center gap-3">
                  <Award className="w-5 h-5 text-ai-secondary" />
                  <span className="text-sm font-medium text-slate-300">{cert}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Education */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-display font-bold">Education</h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8">
              <GraduationCap className="w-10 h-10 text-ai-primary mb-6" />
              <h3 className="text-xl font-display font-bold mb-2">Master's in Information Technology</h3>
              <p className="text-slate-400 mb-4">American College of Commerce and Technology</p>
              <span className="text-sm font-mono text-slate-500">Class of 2017</span>
            </div>
            <div className="glass-panel p-8">
              <GraduationCap className="w-10 h-10 text-ai-secondary mb-6" />
              <h3 className="text-xl font-display font-bold mb-2">Bachelor's in Computer Science</h3>
              <p className="text-slate-400 mb-4">Osmania University, Hyderabad</p>
              <span className="text-sm font-mono text-slate-500">Class of 2009</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-20 border-t border-white/5 text-center">
          <div className="mb-8 flex flex-col items-center gap-2">
            <a href="tel:412-932-0039" className="text-slate-400 hover:text-ai-primary transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" />
              412-932-0039
            </a>
            <a href="mailto:mukharjivajje@gmail.com" className="text-slate-400 hover:text-ai-primary transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" />
              mukharjivajje@gmail.com
            </a>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            © {new Date().getFullYear()} Mukharji Vajje. Built with React, Tailwind & Intelligence.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://www.linkedin.com/in/mukharji-vajje-182a7a326" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-ai-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:mukharjivajje@gmail.com" className="text-slate-400 hover:text-ai-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-ai-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </main>

      {/* AI Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-ai-bg border-l border-white/10 z-[70] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ai-primary/20 flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6 text-ai-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold">Resume Assistant</h3>
                    <p className="text-xs text-ai-primary font-medium">Powered by Gemini AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {chatHistory.length === 0 && (
                  <div className="text-center py-10">
                    <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-4" />
                    <p className="text-slate-400 text-sm">
                      Ask me anything about Mukharji's experience, skills, or projects!
                    </p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-ai-primary text-ai-bg font-medium' 
                        : 'bg-white/5 border border-white/10 text-slate-300'}`}
                    >
                      {msg.parts[0].text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1">
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-ai-primary" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-ai-primary" />
                      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-ai-primary" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-6 border-t border-white/10">
                <div className="relative">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about his experience..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-ai-primary/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-ai-primary text-ai-bg rounded-lg disabled:opacity-50 transition-all hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-ai-primary text-ai-bg rounded-full shadow-2xl flex items-center justify-center ai-glow z-50 hover:scale-110 transition-transform"
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
