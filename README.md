# 🦷 Dental AI

> AI-powered Progressive Web Application (PWA) for early dental caries detection and oral health monitoring.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 About

Dental AI is a Progressive Web Application (PWA) designed to assist users in the **early detection of dental caries** using Artificial Intelligence.

Unlike conventional dental caries detection systems that focus on identifying cavities after significant damage has occurred, this application aims to support **early identification of enamel demineralization** (e.g., white spot lesions) to encourage preventive dental care.

The application is designed to run as a PWA and can also be integrated into a Flutter application via WebView for Android deployment.

---

## ✨ Features

### 👤 User

- AI-based dental image analysis
- Early caries detection
- Weekly streak tracking
- Daily checklist
- Detection history
- Oral health education
- User profile

### 👨‍⚕️ Admin

- Dashboard management
- Educational content management
- User management
- Detection history monitoring
- AI model management (future)

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State Management | Zustand |
| Form Validation | React Hook Form + Zod |
| HTTP Client | Axios |
| Notification | Sonner |
| Icons | Lucide React |
| AI Model | ONNX Runtime (Planned) |
| Database | PostgreSQL (Planned) |
| ORM | Prisma (Planned) |
| Deployment | VPS |

---

## 📁 Project Structure

```text
dental-ai-apps/
│
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── prisma/
├── public/
├── services/
├── store/
├── styles/
├── types/
├── utils/
├── docs/
└── middleware.ts
```

For detailed explanation, see:

📄 **docs/SETUP.md**

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/<username>/dental-ai-apps.git
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

## 📚 Documentation

Detailed documentation is available inside the **docs** directory.

| Documentation | Description |
|---------------|-------------|
| SETUP.md | Project setup guide |
| ARCHITECTURE.md | Application architecture |
| API.md | REST API documentation |
| DATABASE.md | Database schema |
| DEPLOYMENT.md | VPS deployment guide |
| MEETING.md | Meeting notes |

---

## 🛣 Roadmap

### Phase 1

- [x] Project Setup
- [x] Folder Structure
- [x] Supporting Libraries

### Phase 2

- [ ] UI Development
- [ ] Authentication
- [ ] Dashboard
- [ ] Detection Module

### Phase 3

- [ ] PWA Integration
- [ ] Prisma ORM
- [ ] PostgreSQL

### Phase 4

- [ ] AI Integration
- [ ] Admin Dashboard
- [ ] Flutter WebView

### Phase 5

- [ ] VPS Deployment
- [ ] Production Release

---

## 🎯 Project Goals

- Early dental caries detection using Artificial Intelligence
- Preventive oral healthcare
- Cross-platform accessibility through Progressive Web App
- Integration with Flutter for Android deployment
- Scalable architecture for future development

---

## 👨‍💻 Development Team

| Role | Responsibility |
|------|----------------|
| Frontend Developer | Next.js, PWA, UI/UX |
| Backend Developer | REST API, Database |
| AI Engineer | Model Training & Inference |
| Mobile Developer | Flutter Integration |

---

## 📄 License

This project is intended for research and educational purposes.

MIT License.