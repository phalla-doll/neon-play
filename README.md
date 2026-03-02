![Neon Play](https://github.com/phalla-doll/neon-play/blob/main/public/neon-play-og-image.png)

# Neon Play

A modern browser-based gaming platform featuring 50+ curated games across 14 diverse categories, built with Next.js 15 and designed for seamless gameplay experience.

## 🎮 Features

### Game Catalog
- **50+ curated browser games** from various genres
- **14 categories**: Action, Racing, Arcade, Puzzle, Casual, Sports, Shooting, Drift, Simulator, Adventure, Strategy, 2 Player, Girl
- **Search functionality** by title, category, or developer
- **Game details** with descriptions, view counts, and release dates

### User Experience
- **Full-featured game player** with fullscreen mode
- **Social sharing** (Twitter, Facebook, copy link)
- **Game history** - automatically tracks up to 20 recently played games
- **Save favorites** - bookmark up to 20 games for quick access
- **Responsive design** - optimized for mobile, tablet, and desktop

### Performance & Analytics
- **Google Analytics 4** integration for user insights
- **Optimized performance** with Next.js 15 and React 19
- **Smooth animations** powered by Motion library
- **Client-side persistence** using localStorage

## 🛠️ Tech Stack

**Frontend Framework**
- Next.js 15 (App Router)
- React 19
- TypeScript

**Styling & UI**
- Tailwind CSS v4
- Lucide React icons
- Motion (animations)

**Analytics & Storage**
- Google Analytics 4
- localStorage (game history, saved games)

## 📁 Project Structure

```
neon-play/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home - game grid
│   ├── game/[id]/         # Game detail page
│   ├── history/           # Recently played games
│   └── saved/             # Saved games
├── components/            # React components
│   ├── GameCard.tsx       # Game card display
│   ├── GameClient.tsx     # Game player controls
│   ├── Header.tsx         # Site header
│   ├── Sidebar.tsx        # Category navigation
│   ├── MobileNav.tsx      # Mobile navigation
│   ├── SearchBar.tsx      # Search input
│   └── GameGrid.tsx      # Responsive game grid
├── lib/                   # Utilities & data
│   ├── games.ts           # Game catalog data (50+ games)
│   ├── analytics.ts       # Analytics tracking functions
│   ├── storage.ts         # localStorage helpers
│   ├── categories.ts      # Category definitions
│   └── utils.ts          # Utility functions
└── hooks/                 # Custom React hooks
    ├── use-game-storage.ts
    └── use-fullscreen.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/phalla-doll/neon-play.git
   cd neon-play
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file (optional):
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build & Production

```bash
npm run build    # Build for production
npm run start    # Start production server
```

## 🔧 Configuration

### Image Domains
Remote image domains are configured in `next.config.ts`:
- `www.onlinegames.io` - Game thumbnails
- `picsum.photos` - Placeholder images

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean Next.js cache

## 🎨 Features Breakdown

### Game Categories

- **Action**: High-octane shooters and combat games (e.g., CS Online, WarStrike)
- **Racing**: Car games, drifting, and racing simulators (e.g., Drift King, Highway Traffic)
- **Arcade**: Classic arcade-style games (e.g., Geometry Dash, Stack Fire Ball)
- **Puzzle**: Brain teasers and logic games (e.g., Block Blast, Four Colors)
- **Casual**: Relaxing, easy-to-play games (e.g., Love Tester, Get On Top)
- **Sports**: Various sports simulations (e.g., Basket Hoop, Backflip Challenge)
- **Shooting**: FPS and sniper games (e.g., Masked Special Forces, Mob City)
- **Drift**: Dedicated drift racing games (e.g., Drift Hunters Pro, Madalin Stunt Cars Pro)
- **Simulator**: Realistic simulation games (e.g., Real Flight Simulator, Cat Simulator)
- **Adventure**: Exploration and story-driven games (e.g., Stickman Parkour, Dublix)
- **Strategy**: Strategic and tactical games (e.g., 99 Nights in the Forest, Fast Food Rush)
- **2 Player**: Local multiplayer games (e.g., Drunken Duel, Rooftop Duel)
- **Girl**: Games targeting female audiences (e.g., Love Tester Story)

### User Features

- **Search**: Real-time search across all games by title, category, or developer
- **Filter**: Browse by master categories (Action, Racing, Puzzle, Casual)
- **History**: View your recently played games with timestamps
- **Save**: Bookmark your favorite games with one click
- **Share**: Share games on Twitter, Facebook, or copy link
- **Fullscreen**: Toggle immersive gameplay mode
- **Related Games**: Discover similar games on game pages

## 📊 Analytics

The platform tracks the following events:

- **Game Interaction**: Clicks, views, and unique views
- **Navigation**: Category filters and page navigation
- **Search**: Search queries and result counts
- **User Actions**: Save, share, fullscreen toggle
- **Session Data**: Session ID and viewed games

## 🌐 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

The easiest way to deploy is to connect your GitHub repository to Vercel.

### Other Platforms

Build the project:
```bash
npm run build
```

Deploy the `.next` directory to your hosting provider of choice:
- Netlify
- AWS
- Google Cloud
- DigitalOcean
- Railway
- Render

## 🐛 Troubleshooting

### Build Errors
```bash
npm run clean
npm install
npm run build
```

### Port Already in Use
```bash
PORT=3001 npm run dev
```

### Image Loading Issues
Ensure remote image domains are whitelisted in `next.config.ts`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Game content hosted by [OnlineGames.io](https://www.onlinegames.io)
- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Motion](https://motion.dev/)

## 📞 Support

For issues, questions, or suggestions, please:
- Open an issue on GitHub
- Contact the maintainers

---

100% fully vibe-coded with Opencode and GLM-5
