# KhannaGPT

<img src="/logo.png" alt="KhannaGPT Logo" width="50" height="50">

KhannaGPT is your **AI-powered productivity hub**.  
It can generate code with syntax highlights, to tables, images, and real-time search in chat history



## 🚀 Features

### 💬 Intelligent Chat
- Context-aware AI conversations powered by Google Gemini
- Real-time loading indicator
- Streaming responses (coming soon)
- Toggle sidebar for history, search and new chat

### 📄 Rich Content Support
- **Code Blocks**: Syntax-highlighted, copyable code snippets
- **Tables**: Neatly rendered Markdown tables
- **Images**: Supports Markdown image syntax & direct URLs
- **Slides**: Placeholder support for upcoming slide rendering (coming soon)

### 🎙 AI Message Tools
- **Text-to-Speech**: Listen to AI & user messages
- **Voice-to-Text**: Speak naturally with the AI assistant
- **Copy to Clipboard**: One-click copy
- **Feedback Buttons**: Mark response as 👍 or 👎

### 🗂 Chat Management
- Save & load chats from Supabase DB
- Search chats instantly
- Rename & delete chats
- Responsive sidebar with history

### 🔒 Authentication
- Secure login/logout with Supabase Auth




## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, Shadcn UI
- **AI**: Google's Generative AI, Deepgram (for voice)
- **Database & Auth**: Supabase
- **Payments**: Stripe Integration (Coming Soon)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Supabase account for database
- Google AI API key
- (Optional) Stripe account for payments

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/username/khannagpt.git
   cd khannagpt
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Update the environment variables in .env.local
   ```

4. Run the development server
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Roadmap

- [ ] AI Streaming Responses
- [ ] Full Slide Rendering
- [ ] Sandbox for running code inside chat
- [ ] Premium tier via Stripe
- [ ] Real-time voice chat
- [ ] Image and file input support



## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


