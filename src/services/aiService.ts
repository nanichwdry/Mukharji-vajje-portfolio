
export const resumeContext = `
Name: Mukharji Vajje
Role: Senior Frontend Developer / UI Developer
Location: New Market, Maryland, United States
Contact: 
- Phone: 412-932-0039
- Email: mukharjivajje@gmail.com
- LinkedIn: https://www.linkedin.com/in/mukharji-vajje-182a7a326
Experience: 9+ years
Current Company: Bio-Rad Laboratories (since Aug 2022)
Key Expertise: AI-Powered Interfaces, React, Angular (18+), Vue, Next.js, TypeScript, Tailwind CSS, NgRx, Redux, RxJS.
Education: 
- Master's in Information Technology, American College of Commerce and Technology (2017)
- Bachelor's in Computer Science, Osmania University (2009)
Certifications: 
- Generative AI for Developers
- AI and Career Empowerment
- Prompt Engineering
- Application Security For Developers
- Cloud Generative AI

Professional Summary:
Highly skilled Senior Frontend Developer with 9+ years of experience. Expert in building dynamic, responsive web and mobile applications. Proven experience in AI-driven UI development, deep-zoom visualization tools, and intelligent automation.

Experience Highlights:
- Bio-Rad Laboratories: Led development of AI-driven imaging interfaces using Angular 16+, Material UI, Kendo UI.
- The Reynolds and Reynolds Company: Developed large-scale React.js SPAs with Redux.
- Express Scripts by Evernorth: Developed high-traffic JS-driven web apps using React and AngularJS.

Personal Projects:
- AI Resume Builder: A tool that uses LLMs to help users craft professional resumes based on their experience.
- Deep-Zoom Medical Viewer: A high-performance visualization tool for large-scale medical imaging data.
- Real-time Collaboration Dashboard: A WebSocket-based dashboard for team collaboration and task tracking.
`;

export async function chatWithResume(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const lowerMessage = message.toLowerCase();
  
  // Experience queries
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
    return "Mukharji has 9+ years of experience as a Senior Frontend Developer. Currently at Bio-Rad Laboratories (since Aug 2022) working on AI-driven imaging interfaces with Angular 16+. Previously at Reynolds and Reynolds (2019-2022) building React SPAs, and Express Scripts (2017-2019) developing healthcare web apps.";
  }
  
  // Skills queries
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return "Mukharji specializes in React/Next.js, Angular 18+, Vue.js, TypeScript, and Tailwind CSS. He's expert in AI-Powered Interfaces, Redux/NgRx, RxJS, and has certifications in Generative AI, Prompt Engineering, and Cloud AI.";
  }
  
  // AI/ML queries
  if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
    return "Mukharji specializes in AI-driven UI development. At Bio-Rad, he leads development of AI-powered imaging interfaces and collaborates with ML engineers to create intuitive AI experiences. He's certified in Generative AI, Prompt Engineering, and Cloud Generative AI.";
  }
  
  // Projects queries
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
    return "Key projects include: Aura AI Assistant (voice-controlled AI with PC automation, persistent memory, and 18+ tools using React, Gemini API, OpenAI API), Deep-Zoom Medical Viewer (Angular + Canvas API for large-scale medical imaging), and MediSchedule (AI-powered medical appointment system with voice calling, live transcription, and patient management using React, Vapi AI, Gemini API).";
  }
  
  // Education queries
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university')) {
    return "Mukharji holds a Master's in Information Technology from American College of Commerce and Technology (2017) and a Bachelor's in Computer Science from Osmania University (2009).";
  }
  
  // Contact queries
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
    return "You can reach Mukharji at mukharjivajje@gmail.com or call 412-932-0039. He's also on LinkedIn at linkedin.com/in/mukharji-vajje-182a7a326";
  }
  
  // Location queries
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based')) {
    return "Mukharji is based in New Market, Maryland, United States.";
  }
  
  // Angular queries
  if (lowerMessage.includes('angular')) {
    return "Mukharji is highly proficient in Angular 16+ and Angular 18. At Bio-Rad, he leads development of complex Angular applications with Material UI and Kendo UI for AI-driven imaging interfaces.";
  }
  
  // React queries
  if (lowerMessage.includes('react')) {
    return "Mukharji has extensive React experience. At Reynolds and Reynolds, he developed large-scale React.js SPAs with Redux. He's also skilled in Next.js and modern React patterns with TypeScript.";
  }
  
  // Default response
  return "I can help you learn about Mukharji's experience, skills, projects, education, or contact information. What would you like to know?";
}
