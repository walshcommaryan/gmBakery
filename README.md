# 🍞 BakeryApp – Farmer's Market Bakery Storefront

This is the frontend React + TypeScript web application for a local bakery business selling baked goods at a farmer's market in Austin, TX. Customers can browse products, select a pickup date, and place orders using Square Checkout. The app is designed for simplicity, responsiveness, and a charming aesthetic fitting a small artisan bakery.

## Features

- 🛒 Cart system with item management
- 📆 Date picker for pickup scheduling (Saturdays only, cutoff Wednesday midnight)
- 🧾 Checkout with Square payment integration
- 📬 Order confirmation and summary page
- 💾 Order history for logged-in users
- 🧁 TailwindCSS + Radix UI for modern, elegant design
- 📦 Auth + Cart Context for state management
- 🌐 Responsive design for mobile and desktop

## Technologies

- React (TypeScript)
- TailwindCSS + Radix UI
- React Router
- Framer Motion
- Axios for API calls
- Context API for Auth and Cart

## Setup

```bash
# Install dependencies
npm install

# Run the frontend (proxy setup assumed for backend on port 2000)
npm start

# Environment Variables
REACT_APP_API_URL=http://localhost:2000
