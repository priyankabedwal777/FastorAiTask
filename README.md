# Fastor Assignment

---

## ✨ What It Does

- **Phone + OTP Login** — Enter your mobile number, get a 6-digit code (demo OTP: `123456`), and you're in.
- **Home Feed** — Pulls live restaurant data from the Fastor staging API and displays it in a clean, scrollable list with skeleton loading states.
- **Your Taste** — A horizontally scrollable section showing restaurant taste cards, with a "See All" view.
- **Banner Carousel** — Auto-sliding promotional banners with dot indicators.
- **Restaurant Detail** — Tap any restaurant to see its full detail page with an interactive image gallery rendered on an HTML5 (drag to pan!).
- **Share Feature** — Share a restaurant card with the Fastor branding using the native Web Share API, or download it as a PNG.

---

## 🛠️ Tech Stack

| Tool               | Purpose                                |
| ------------------ | -------------------------------------- |
| React js           | UI & state management                  |
| Vite               | Lightning-fast dev server & bundler    |
| Tailwind CSS       | Utility-first styling                  |
| HTML5 Canvas API   | Interactive restaurant image rendering |
| Web Share API      | Native share sheet on mobile           |
| Fastor Staging API | Live restaurant data                   |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

**Demo credentials:**

- Mobile: any 10-digit number (e.g. `9999999999`)
- OTP: `123456`

---

## Project Structure

```
src/
├── components/       # Reusable UI pieces (buttons, cards, carousel, spinner...)
├── data/             # Static restaurant gallery data
├── hooks/            # useRestaurantCanvas — canvas draw + drag logic
└── pages/            # MobileScreen → OtpScreen → HomeScreen → RestaurantDetail
```

> Built with React + Vite + Tailwind as a frontend assignment for Fastor AI.
