# Be žalos — Frontend

React + TypeScript frontend for [bezalos.lt](https://www.bezalos.lt) — a Lithuanian women's nutrition and healthy lifestyle platform.

## Tech Stack

| Category     | Technology                             |
| ------------ | -------------------------------------- |
| UI framework | React 19                               |
| Language     | TypeScript 5                           |
| Build tool   | Vite 7                                 |
| Routing      | React Router DOM v6                    |
| Server state | TanStack Query v5                      |
| HTTP client  | Axios                                  |
| Forms        | React Hook Form                        |
| Animations   | Framer Motion                          |
| Charts       | Recharts                               |
| Real-time    | Socket.io-client                       |
| Styling      | CSS Modules + SASS                     |
| Icons        | FontAwesome, Lucide React, React Icons |

## Project Structure

```
src/
├── api/              # Axios instances (public + private)
├── assets/           # Images, icons, PDFs, videos
├── components/
│   ├── Shared/       # Design system (Box, Stack, Grid, Cluster, Cover, ...)
│   ├── UI/           # Legacy general-purpose components
│   ├── admin/        # Admin-specific components
│   └── layout/       # Banner, Header, Footer, CookieConsent
├── contexts/         # MediaQueryProvider, ObserverProvider
├── features/
│   ├── admin/
│   │   └── virtuve/  # Video management in the admin panel
│   ├── auth/         # Authentication system
│   │   ├── core/     # AuthProvider, AuthService, refresh token logic
│   │   └── modal/    # AuthModal (login / signup / forgot password)
│   └── client/
│       ├── homepage/ # Homepage sections
│       ├── naryste/  # Membership plans and payments
│       ├── paslaugos/# Services catalog and purchasing
│       ├── valgymotestas/ # Eating behavior test
│       └── virtuve/  # Video recipe library
├── hooks/            # Custom hooks (recipes, plans, products, services, ...)
├── layouts/          # ClientLayout
└── pages/
    ├── admin/        # Admin pages (users, plans, recipes, services)
    ├── client/       # Public client pages
    ├── profilisPages/# Protected profile sections
    ├── recipesPages/ # Recipe list and detail
    └── paymentPages/ # Payment status pages
```

## Routes

### Public (`/`)

| Path                                   | Description          |
| -------------------------------------- | -------------------- |
| `/`                                    | Homepage             |
| `/receptai`                            | Recipe list          |
| `/receptai/:slug`                      | Recipe detail        |
| `/virtuve`                             | Video recipe library |
| `/virtuve/:slug`                       | Individual video     |
| `/paslaugos`                           | Services catalog     |
| `/paslaugos/:slug`                     | Service detail       |
| `/naryste`                             | Membership plans     |
| `/atlik-testa`                         | Test entry point     |
| `/atlik-testa/valgymo-elgsenos-testas` | Eating behavior test |

### Protected — user (`/profilis`)

| Path                          | Description                   |
| ----------------------------- | ----------------------------- |
| `/profilis`                   | Nutrition plans               |
| `/profilis/anketa`            | User questionnaire            |
| `/profilis/produktu-keitimas` | Product substitutions in plan |
| `/profilis/mano-receptai`     | Saved favorite recipes        |
| `/profilis/kalorijos`         | Calorie diary                 |
| `/profilis/statistika`        | Body change statistics        |
| `/profilis/nustatymai`        | Account settings              |

### Protected — admin (`/admin`)

| Path                      | Description                                   |
| ------------------------- | --------------------------------------------- |
| `/admin`                  | User list                                     |
| `/admin/:id`              | User detail (plan, questionnaire, statistics) |
| `/admin/planai`           | Nutrition plan management                     |
| `/admin/planai/valgiai`   | Meal management                               |
| `/admin/planai/produktai` | Product management                            |
| `/admin/receptai`         | Recipe management                             |
| `/admin/paslaugos`        | Services and membership management            |
| `/admin/virtuve`          | Video upload and management                   |
| `/admin/mails`            | Mail viewer                                   |

## Authentication

JWT + refresh token strategy:

- **Access token** — stored in memory (`useState`), injected into requests via an Axios request interceptor
- **Refresh token** — httpOnly cookie, automatically used to renew the access token on 401 responses
- **Cross-tab sync** — `BroadcastChannel` API ensures login/logout in one tab is reflected across all others

## Design System

`src/components/Shared/` — layout primitives following "Every Layout" principles:

| Component   | Purpose                           |
| ----------- | --------------------------------- |
| `Stack`     | Vertical spacing between elements |
| `Cluster`   | Horizontal grouping with wrapping |
| `Grid`      | Auto-fill responsive grid         |
| `Box`       | Simple wrapper with padding       |
| `Cover`     | Full-height centred layout        |
| `Center`    | Horizontal centring               |
| `Container` | Page-width constraint             |

## Notes

- Videos are stored in AWS S3 and served via CloudFront signed URLs
- Payments are handled through Stripe
- Axios upload timeout is set to 30 minutes to accommodate large S3 video uploads
- Heavy client pages use `React.lazy` + `Suspense` for code splitting (HomePage, VirtuvePage, RecipesPage, ...)
