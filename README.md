# Grammar Checker AI

An AI-powered writing assistant built with **Next.js 16**, **React 19**, **MongoDB**, and **Groq AI**. Grammar Checker AI helps users improve their writing by detecting grammar mistakes, correcting spelling and punctuation, and providing intelligent suggestions to enhance clarity, readability, and overall writing quality.

## 🌐 Live Demo

https://grammarcheckerai.vercel.app

## 📂 Repository

https://github.com/akramansari27923mah-dotcom/grammar-checker-ai

## ✨ Features

* AI-powered grammar correction
* Spelling and punctuation checking
* Writing enhancement suggestions
* Real-time text analysis
* Secure JWT authentication
* Google Sign-In with Firebase
* User dashboard
* Light & Dark mode support
* PDF and DOCX export functionality
* Responsive design for all devices
* Modern UI with smooth animations
* Email notifications using Nodemailer

## 🛠 Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* Shadcn UI
* Radix UI
* Framer Motion
* Lucide React
* React Icons

### Backend

* Next.js API Routes
* Node.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* JWT Authentication
* Firebase Authentication
* Google Authentication
* Bcrypt Password Hashing

### AI Integration

* Groq AI

### Utilities

* Axios
* React Hot Toast
* clsx
* class-variance-authority
* tailwind-merge

### Document Export

* jsPDF
* DOCX
* File Saver

## 📦 Installation

### Clone the Repository

```bash
git clone https://github.com/akramansari27923mah-dotcom/grammar-checker-ai.git
cd grammar-checker-ai
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📁 Project Structure

```text
grammar-checker-ai/
│
├── app/
│   ├── about/
│   ├── api/
│   ├── contact/
│   ├── dashboard/
│   ├── grammar-checker/
│   ├── login/
│   ├── signup/
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
│
├── components/
├── contexts/
├── dashboardComponents/
├── data/
├── db/
├── hooks/
├── lib/
├── public/
├── schemas/
│
├── .env.local
├── package.json
└── README.md
```

## 🏗 Architecture

The application follows the **Next.js App Router** architecture and is organized into modular directories for scalability and maintainability.

| Directory              | Purpose                               |
| ---------------------- | ------------------------------------- |
| `app/`                 | Routes, pages, and API endpoints      |
| `components/`          | Reusable UI components                |
| `contexts/`            | Global state management               |
| `db/`                  | Database connection and configuration |
| `hooks/`               | Custom React hooks                    |
| `lib/`                 | Utility functions and helpers         |
| `schemas/`             | Validation schemas                    |
| `public/`              | Static assets                         |
| `dashboardComponents/` | Dashboard-specific components         |

## 🔒 Security

Sensitive credentials are managed using environment variables. Never commit `.env` files or secrets to version control.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## 👨‍💻 Author

**Akram Ansari**

Built with Next.js, MongoDB, Groq AI, and modern web technologies.
