
# 🧠 AI Health Tip Chat — Backend + Frontend

An interactive **AI-powered health assistant** that provides short, general **wellness tips** based on user symptoms.
Built with a **Node.js backend (Gemini API)** and a **React + TypeScript + Tailwind CSS frontend** that mimics a simple chat interface.

---

## 🚀 Features

* 💬 **Chat-style Interface** – Users can enter symptoms and receive helpful AI-generated health tips.
* 🧩 **AI-Powered Backend** – Uses **Google Gemini API** to generate concise and safe advice.
* ⚙️ **TypeScript + React + Tailwind** – Clean, modular frontend architecture with responsive design.
* 🧠 **Dynamic Responses** – The AI tailors tips based on the type of symptom (e.g., fatigue vs cramps).
* 💡 **Loading Indicators** – Displays a "Thinking..." state while waiting for AI responses.
* 🧾 **Simple REST API** – One endpoint: `/api/healthtip`.

---

## 🏗️ Tech Stack

**Frontend:**

* React (TypeScript)
* Tailwind CSS
* Axios (for backend requests)

**Backend:**

* Node.js + Express
* Google Gemini API (Generative AI)
* CORS enabled for local testing

---

## 🧠 How It Works

1. User enters a **symptom** like “cramps” or “fatigue” in the chat box.
2. Frontend sends a POST request to `/api/healthtip`:

   ```json
   { "symptoms": "cramps" }
   ```
3. Backend calls the **Gemini model** with a custom prompt:

   > “You are a helpful medical assistant. Generate a short, non-technical health tip for this symptom...”
4. Gemini responds with:

   ```json
   [
     {
       "content": {
         "parts": [
           { "text": "For cramps, try gentle stretching and massage..." }
         ]
       }
     }
   ]
   ```
5. Backend extracts and returns:

   ```json
   { "tip": "For cramps, try gentle stretching and massage..." }
   ```
6. Frontend displays it like a chat message on the left side.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/<your-username>/ai-health-tip-chat.git
cd ai-health-tip-chat
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
PORT=5000
```

Run the backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)** (Vite default).
Backend runs on **[http://localhost:5000](http://localhost:5000)**.

---

## 🧩 API Endpoint

### `POST /api/healthtip`

**Request Body:**

```json
{ "symptoms": "fatigue" }
```

**Response:**

```json
{ "tip": "For fatigue, get enough rest and stay hydrated..." }
```

---

## 🖼️ UI Preview

```
You: cramps  
AI: For cramps, try gentle stretching and massage to ease the tension.  
```

Clean, minimal chat layout built with Tailwind.

---

## 🧪 Example Prompt

The backend uses a structured system prompt to ensure safety and clarity:

```
You are a helpful medical assistant. Your job is to generate a SHORT, simple, 
non-technical health tip based on the user's symptom.
Rules:
- Keep it concise (2–3 sentences maximum).
- Do NOT diagnose diseases.
- Provide safe, general wellness advice only.
- Tailor the response based on the symptom type.
```

---

## 📂 Project Structure

```
ai-health-tip-chat/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── ...
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🛡️ Disclaimer

This app is for **educational and wellness purposes only.**
It is **not a medical diagnostic tool** and should **not replace professional medical advice.**

---

## 🌟 Future Improvements

* [ ] Add support for multiple chat sessions
* [ ] Improve prompt variety based on symptom type
* [ ] Add voice input (Web Speech API)
* [ ] Store past conversations locally

---

## 👨‍💻 Author

**Rnav Sar**
