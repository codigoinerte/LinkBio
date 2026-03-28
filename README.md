# AboutLink.me

> Your links, your projects, your brand — all in one place.

A modern **link-in-bio** profile application that lets users create personalized public pages to showcase their links and projects. Fully customizable, with themes, wallpapers, and real-time preview.

---

## Features

- **Profile management** — name, nickname, headline, bio, and profile photo
- **Link management** — create, edit, enable/disable, and reorder links via drag & drop
- **Project showcase** — display your projects alongside your links
- **Design customization** — 12+ pre-built themes, wallpaper options (solid colors, patterns, images), and accent color controls
- **Live preview** — see your profile changes in real time before saving
- **Public profile pages** — each user gets a unique URL (`/:nickname`)
- **Analytics** — track clicks and visitors per link
- **Authentication** — registration, login, and session persistence via cookies

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 + SWC |
| Routing | React Router 7 |
| Styling | TailwindCSS 4 |
| UI primitives | Radix UI |
| Icons | Lucide React |
| State management | Zustand |
| Server state | TanStack React Query |
| Forms | React Hook Form |
| HTTP client | Axios |
| Drag & drop | dnd-kit |
| File upload | React Dropzone |
| Notifications | Sonner |
| Animations | DotLottie React |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### 1. Clone and install

```bash
git clone https://github.com/your-user/aboutlink-me.git
cd aboutlink-me
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.template .env
```

| Variable | Description |
|---|---|
| `VITE_BASE_URL` | App base URL (e.g. `http://localhost:5173`) |
| `VITE_BASE_URL_API` | Backend API base URL (e.g. `http://localhost:8000/api`) |
| `VITE_BASE_URL_IMAGE` | Base URL for profile images |
| `VITE_BASE_URL_WALLPAPER` | Base URL for wallpaper images |
| `VITE_BASE_URL_GALERY` | Base URL for gallery images |
| `VITE_COOKIE_NAME` | Cookie key used to store the auth token |

### 3. Run

```bash
pnpm dev       # Development server with HMR
pnpm build     # Production build
pnpm preview   # Preview production build locally
```

---

## Project Structure

```
src/
├── admin/          # Dashboard pages and components (authenticated)
│   ├── pages/      # Dashboard, Account, Design, Profile
│   ├── components/ # Links, Projects, Theme, Wallpaper, Preview
│   └── actions/    # API calls for CRUD operations
├── front/          # Public-facing pages
│   ├── pages/      # Home, Login, Landing (/:slug)
│   └── components/ # Header, LandingProfile, LandingContent
├── components/
│   ├── ui/         # Radix UI wrappers (button, input, tabs, etc.)
│   └── custom/     # Shared custom components
├── context/        # Zustand stores (user auth, landing data)
├── router/         # Route definitions and guards
├── api/            # Axios instance with auth interceptor
├── helpers/        # Cookie utils, date helpers, slug utils
└── mock/           # Static theme definitions
```

---

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Home page |
| `/login` | Public | Login and registration |
| `/:slug` | Public | User public profile |
| `/admin/dashboard` | Private | Links and projects management |
| `/admin/design` | Private | Theme and wallpaper customization |
| `/admin/account` | Private | Account settings |
| `/admin/profile` | Private | Profile settings |

---

## License

[MIT](LICENSE)
