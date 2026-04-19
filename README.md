<div align="center">
<img width="1200" height="475" alt="Money Game Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Money Game 🪙

An interactive educational web application designed to help children learn about money through fun, engaging games. Built with React 19, TypeScript, and Tailwind CSS, featuring AI integration with Google's Gemini API.

## 🎮 Game Modes

Money Game offers three distinct learning experiences:

### 1. Coin Purse (Count Coins) 🔢
Practice counting different coin combinations and build fundamental money math skills.

### 2. Shopping 🛒
A simulation game where kids can practice making purchases and handling transactions in a safe, virtual environment.

### 3. Piggy Bank 🐷
Learn about savings and financial responsibility through interactive piggy bank challenges.

## ✨ Features

- **Kid-Friendly Interface**: Colorful, intuitive design with large buttons and clear visuals
- **Interactive Animations**: Engaging motion effects using Framer Motion
- **Confetti Celebrations**: Reward animations for achievements using canvas-confetti
- **AI-Powered**: Integrates Google's Gemini AI for enhanced interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Fully typed codebase for reliability and maintainability
- **Modern Stack**: Built with React 19, Vite, and Tailwind CSS 4

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A [Gemini API key](https://aistudio.google.com/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd money-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   echo "GEMINI_API_KEY=your_api_key_here" > .env.local
   ```
   
   Or manually create `.env.local` and add:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready app in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove build artifacts |

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion), canvas-confetti
- **Icons**: Lucide React
- **AI Integration**: @google/genai
- **Development**: Express, tsx

## 📁 Project Structure

```
money-game/
├── src/
│   ├── components/
│   │   └── modes/
│   │       ├── CountCoins.tsx    # Coin counting game
│   │       ├── Shop.tsx          # Shopping simulation
│   │       └── PiggyBank.tsx     # Savings game
│   ├── data/                     # Game data and configurations
│   ├── utils/                    # Helper functions
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── .env.local                    # Environment variables (not in repo)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite configuration
```

## 🎯 Learning Objectives

Money Game helps children develop:

- **Coin Recognition**: Identify different coin denominations
- **Math Skills**: Practice addition and subtraction with money
- **Financial Literacy**: Understand basic concepts of spending and saving
- **Decision Making**: Make choices about purchases and savings goals
- **Problem Solving**: Work through money-related challenges

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

### Deploy to Your Favorite Platform

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist/` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions or deploy manually
- **Firebase Hosting**: Deploy using Firebase CLI

## 🔑 Getting a Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env.local` file

**Note:** Keep your API key secure and never commit it to version control.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache 2.0 License - see the source code for details.

## 🔗 Links

- **View in AI Studio**: https://ai.studio/apps/d7f7f623-5d30-44e0-a275-c69d0e3a7b
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Vite**: https://vitejs.dev
- **Google AI Studio**: https://aistudio.google.com

---

Made with ❤️ for teaching kids about money
