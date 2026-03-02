import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [
        { role: 'user', parts: [{ text: `You are an AI assistant representing Mukharji Vajje. Use the following resume context to answer questions about him professionally and concisely. If you don't know something, say you'll have Mukharji get back to them. Resume Context: ${resumeContext}` }] },
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again later!";
  }
}
