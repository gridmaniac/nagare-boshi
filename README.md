# 流れ星 (Nagare Boshi) - Japanese Learning App

A modern Japanese learning application that leverages Imiwa? dictionary data to create an effective SRS (Spaced Repetition System) flashcard study experience.

✨ **Feel free to use it: [nagare-boshi.vercel.app](https://nagare-boshi.vercel.app/)**

## Quick Start

1. Visit [nagare-boshi.vercel.app](https://nagare-boshi.vercel.app/)
2. Export your Imiwa? dictionary backup (`.imiwa` file)
3. Upload the backup file on the main page
4. Start learning with SRS flashcards!

No account needed - just upload your Imiwa? backup and start studying.

## Features

- 📚 Import Imiwa? dictionary backup data
- 🔄 SRS (Spaced Repetition System) for efficient learning
- 📖 Interactive reader with word lookup
- 🎯 Smart card organization with boxes based on mastery level
- 🔍 Related words and synonyms discovery
- 📝 Note-taking capability for each card
- 📱 Progressive Web App (PWA) support
- 🎨 Beautiful UI with shooting stars animation
- 🌙 Dark mode support

## Tech Stack

- **Framework**: [Nuxt.js](https://nuxt.com/)
- **UI**: [DaisyUI](https://daisyui.com/) + [Tailwind CSS](https://tailwindcss.com/)
- **Database**: MongoDB
- **Japanese Text Processing**: Kuromoji.js

## Project Structure

```
nagare-boshi/
├── components/     # Vue components
├── composables/    # Vue composables and shared logic
├── mutations/      # Data modification operations
├── queries/       # Data fetching operations
├── pages/         # Route components
├── server/        # Backend API and models
└── utils/         # Utility functions and constants
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB instance
- Imiwa? dictionary backup (optional)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gridmaniac/nagare-boshi.git
   cd nagare-boshi
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your MongoDB connection string and other required variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## Usage

1. **Initial Setup**
   - Import your Imiwa? dictionary backup
   - Create a new deck or select an existing one

2. **Study Flow**
   - New cards start in Box 0
   - Review choices:
     - 👍 **Good** - Move up one box
     - 🎂 **Cake** - Move directly to mastery
     - ❌ **Delist** - Remove card from review queue
   - Review intervals:
     - Box 1: Review next day (24h)
     - Box 2: Review in 1 week
     - Box 3: Review in 1 month
     - Box 4: Review in 1 month

3. **Features**
   - Use the reader for looking up unknown words
   - Add notes to cards for better memorization
   - Discover related words and synonyms
   - Track your learning progress with statistics

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

For detailed deployment instructions, check out the [Nuxt.js deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Imiwa?](http://www.imiwaapp.com/) for the excellent dictionary data format
- [JMdict](https://www.edrdg.org/jmdict/j_jmdict.html) for the comprehensive Japanese dictionary
- The Japanese learning community for inspiration and feedback
