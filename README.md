# 🚀 Project Setup Monorepo Template

A production-ready monorepo template featuring:

**Frontend**  
⚛️ React 19 + TypeScript  
🎯 Vite + Vitest  
🧹 ESLint + Prettier  

**Backend**  
🖥️ Node.js + Express  
📦 TypeScript  
🧪 Jest + Supertest  
🔒 Robust ESLint config

## 🛠 Features

### Frontend (`packages/frontend`)
- Blazing fast Vite build system
- React 19 with strict type checking
- Vitest for component testing ([config](packages/frontend/vitest.config.ts))
- ESLint with React hooks/runtime rules ([config](packages/frontend/eslint.config.js))
- CSS-in-JS ready structure

### Backend (`packages/backend`)
- Express.js with TypeScript
- Jest for API testing ([config](packages/backend/jest.config.js))
- Supertest for endpoint validation
- Production-ready TS config ([tsconfig](packages/backend/tsconfig.json))

## 📋 Prerequisites

- Node.js v18+
- npm v9+
- Lerna (`npm install -g lerna`)

## 🚦 Quick Start
```bash
# Clone the repository
git clone https://github.com/your-repo/rpc-docs.git
cd rpc-docs

# install dependencies across all packages
npm install

# Start development servers
npm run dev

# Run all tests
npm run test

# Run all lint 
npm run lint

# Format all code
npm run format

# Build all production
npm run build

````

## 🧑💻 Development Workflows

### Frontend
```bash
cd packages/frontend

# Dev server (port 5173)
npm run dev

# Run component tests
npm run test

# Production build
npm run build
````

### Backend
```bash
cd packages/backend

# Dev server with hot reload
npm run dev

# Run API tests
npm run test

# Production build
npm run build
```

## 🗂 Project Structure

```bash
rpcdoc/
├── packages/
│ ├── frontend/ # React application
│ │   ├── src/ # Component source
│ │   ├── vitest.config.ts # Test config
│ │   └── vite.config.ts # Build config
│ └── backend/ # Express API
│     ├── src/ # Service source
│     └── jest.config.js # Test setup
├── lerna.json # Monorepo config
└── tsconfig.json # Base TypeScript config
```

## 🔧 Key Configurations

- **Monorepo Management**  
  [Lerna config](lerna.json) with independent versioning
- **Shared Code Quality**  
  [Global ESLint rules](eslint.config.js) with TypeScript support
- **Consistent Formatting**  
  [Prettier config](.prettierrc) enforced across packages

## 🤝 Contributing

Follow our commit message conventions:
- 🐛 Fix bugs: `git commit -m "🐛 fix button click handler"`
- ✨ New features: `git commit -m "✨ add user auth endpoint"`
- 🔄 Refactors: `git commit -m "🔄 simplify api response types"`

## 📄 License

MIT © [Your Name] (Update in package.json files)