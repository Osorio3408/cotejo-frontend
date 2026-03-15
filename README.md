# 🏟️ Cotejo Frontend

Cotejo es una plataforma web para reservar canchas al toque, pensada para jugadores y administradores de escenarios deportivos.

### 🚀 Stack principal
- ⚛️ **React + TypeScript** — arquitectura modular por features
- 🎨 **TailwindCSS v4** — modo oscuro, diseño minimalista
- ⚡ **Vite** — build rápido y soporte nativo para TS
- 🔐 **React Query + Zustand** — manejo de estado y autenticación
- 🧩 **Lucide-react** — sistema de iconografía ligera

### 🗂️ Estructura
src/
├── components/ # UI y componentes reutilizables
├── pages/ # Vistas principales (Home, Login, Register, Dashboard…)
├── hooks/ # Custom hooks de negocio
├── layouts/ # Layouts globales (App, Dashboard)
└── utils/ # Funciones de ayuda


### 💻 Scripts básicos
```bash
npm install
npm run dev     # modo desarrollo
npm run build   # compilación para producción
npm run preview # vista previa del build


---

## 🧠 3. Commit inicial sugerido

Una vez hayas hecho `git init` y agregado tu remoto:

```bash
git init
git add .
git commit -m "🎨 setup: inicial de COTEJO Frontend con React + TypeScript + Tailwind v4 + estructura base"
git branch -M main
git remote add origin https://github.com/tuUsuario/cotejo-frontend.git
git push -u origin main
