import axios from 'axios'

export const inputFIle = async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) {
      return res.status(400).json({ message: "symptoms is missing" });
      }
      

const prompt = `
You are a helpful medical assistant. 
Your job is to generate a SHORT, simple, non-technical health tip based on the user's symptom.

Rules:
- Keep it concise (2–3 sentences maximum).
- Do NOT diagnose diseases.
- Provide safe, general wellness advice only.
- Tailor the response based on the symptom type (e.g., pain, fatigue, stomach issues, stress, cold symptoms).
- If the symptom is unclear, ask for clarification briefly.

User symptom: "${symptoms}"

Provide the health tip now.
`;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          GEMINI_API_KEY;
      
      const geminiRes = await axios.post(geminiUrl, {
          contents:[{parts:[{text:prompt}]}]
      })
      return res.status(200).json(geminiRes.data.candidates[0].content.parts[0].text);
      
  } catch (error) {
    return res.status(400).json({ message: error.message});
  }
};

export const quoteOfTheDay = async (req, res) => {
  try {
      
const prompt = `
You are a helpful medical assistant. 
Your job is to generate a SHORT, simple, wellness quote of the day with proper emojis preferred

Rules:
- Keep it concise (1-2 sentences maximum).
-If possible try to keep it related to period pains and advises for girls


Provide the health tip now.
`;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const geminiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
          GEMINI_API_KEY;
      
      const geminiRes = await axios.post(geminiUrl, {
          contents:[{parts:[{text:prompt}]}]
      })
      return res.status(200).json(geminiRes.data.candidates[0].content.parts[0].text);
      
  } catch (error) {
    return res.status(400).json({ message: error.message});
  }
}