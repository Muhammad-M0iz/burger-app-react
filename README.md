# 🍔 BurgerCraft - Interactive Burger Builder App

A modern, interactive burger builder application built with React, TypeScript, and Vite. Create custom burgers, visualize them in real-time, and manage your orders with a beautiful, responsive UI.

## ✨ Features

- **Interactive Burger Builder**: Add/remove ingredients with real-time price calculation
- **3D Burger Visualization**: See your burger come to life with animated layers
- **User Authentication**: Sign up and sign in to save your orders
- **Order Management**: Track your order history with detailed breakdowns
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Burger-inspired color scheme with smooth animations

## 🚀 Tech Stack

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Formik + Yup** for form handling and validation
- **React Router** for navigation

## 📋 Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-M0iz/burger-app-react.git
cd burger-app-react
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Start the Development Server

Using npm:
```bash
npm run dev
```

Or using yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

Using npm:
```bash
npm run build
```

Or using yarn:
```bash
yarn build
```

### 5. Preview Production Build

Using npm:
```bash
npm run preview
```

Or using yarn:
```bash
yarn preview
```

## 📁 Project Structure

```
burger-app-react/
├── src/
│   ├── Components/          # React components
│   │   ├── BurgerBuilder.tsx    # Main burger building interface
│   │   ├── BurgerVisiualizor.tsx # 3D burger visualization
│   │   ├── Layout.tsx           # App layout and navigation
│   │   ├── SignIn.tsx           # Authentication components
│   │   ├── SignUp.tsx
│   │   ├── Checkout.tsx         # Order checkout
│   │   └── Order.tsx            # Order history
│   ├── pages/               # Page components
│   ├── store/               # Redux store and slices
│   ├── assets/              # Static assets and styling utilities
│   ├── schemas/             # Form validation schemas
│   └── types/               # TypeScript type definitions
├── hooks/                   # Custom React hooks
├── types/                   # Global type definitions
└── public/                  # Static public assets
```

## 🎮 How to Use

1. **Start Building**: Navigate to the burger builder page
2. **Add Ingredients**: Click the "+" buttons to add ingredients to your burger
3. **Visualize**: Watch your burger build up in real-time in the visualization panel
4. **Adjust Quantities**: Use "+" and "-" buttons to adjust ingredient quantities
5. **Sign Up/Sign In**: Create an account to save your orders
6. **Checkout**: Add your delivery address and place your order
7. **Track Orders**: View your order history in the Orders page

## 🎨 Color Scheme

The app uses a burger-inspired color palette:
- **Bun Colors**: Warm amber and golden tones
- **Meat Colors**: Rich brown tones
- **Vegetable Colors**: Fresh greens, bright yellows, and vibrant reds
- **UI Colors**: Warm whites and soft gradients

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (below 768px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues & Support

If you encounter any issues or need support, please [open an issue](https://github.com/Muhammad-M0iz/burger-app-react/issues) on GitHub.

---

Built with ❤️ and 🍔 by [Muhammad-M0iz](https://github.com/Muhammad-M0iz)
