Intent Weaver — Find Files by Intent, Not Location

Intent Weaver is an intelligent smart file management system that organizes and retrieves files based on meaning, purpose, and context, rather than traditional folder structure.
It enables users to search files using natural intent such as:

“Show my study materials”

“Find Python projects”

“Where are my college documents?”

“Programming files”

“Cooking notes”

Instead of manually managing folders, Intent Weaver automatically groups files into Spaces such as:
✔ Study
✔ Programming
✔ Work
✔ Personal
✔ Custom user-created spaces

🚀 Features
🔍 Intent-Based File Retrieval

Search files using meaning instead of exact names or paths.

🗂 Smart Spaces

Files are categorized automatically based on tags & context.
Users can also create their own spaces.

📂 File Browser

Browse, preview, and interact with files easily.

🎯 AI-Like Search Experience

Even without an LLM backend, search feels intelligent due to semantic mapping logic.

⚙ Settings & Preferences

Customizable configurations for user control.

✔ Clean UI & UX

Minimal, modern UI inspired by productivity tools.

🛠 Tech Stack
Frontend

React

TypeScript

Vite

TailwindCSS

React Router

ShadCN UI

Sonner Toasts

Zustand / State Handling

Context + Hooks

Backend

Node.js

Express.js

REST APIs

File metadata handling

Secure routing

Modular architecture

Can easily be upgraded to AI-backed search using:

OpenAI

HuggingFace

Sentence Transformers

📦 Project Structure
IntentWeaver
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── data
│   │   ├── lib
│   │   └── types
│   ├── public
│   └── index.html
│
└── backend
    ├── routes
    ├── controllers
    ├── middleware
    ├── models
    ├── config
    └── server.js

🏃‍♂️ Running the Project
1️⃣ Clone Repository
git clone <repo-url>
cd IntentWeaver

2️⃣ Start Backend
cd backend
npm install
npm start


Backend runs on:

http://localhost:5000

3️⃣ Start Frontend
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:8080

🎯 Core Concepts
🔹 Spaces

A “Space” represents a logical grouping of files.
Example:

Study → syllabus, notes, assignments

Programming → projects, code, references

Personal → photos, receipts, identity docs

🔹 Search Intelligence

Instead of searching:

C:/Users/Documents/Project/


You simply type:

programming
college
pdf
assignment


and Intent Weaver finds it.

🧪 Future Enhancements

✔ AI-powered semantic search
✔ Tag learning system
✔ Cloud sync
✔ Multi-user
✔ Real filesystem integration
✔ Desktop app (Electron)

📸 Screenshots

(Add screenshots when ready)

👤 Author

Aathil Ahamed
AI/ML & Full Stack Enthusiast

📜 License

MIT — Free to use, modify, and distribute.

⭐ If This Helped

Star the repo… it helps a lot.
