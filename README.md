# Be žalos - Frontend

Profesionali mitybos konsultavimo platforma, sukurta mitybos konsultantei Sandrai Jatulytei.

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.30.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-5.28.4-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-1.97.1-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.3.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.6.7-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## Apie projektą

**Be žalos** yra išsami mitybos ir sveikatos konsultavimo platforma, skirta teikti personalizuotas mitybos paslaugas, receptus, edukacijos turinį ir interaktyvius įrankius valgymo įpročių vertinimui.

🌐 **Website**: [bezalos.lt](https://www.bezalos.lt)
📧 **Kontaktai**: sandra@bezalos.lt

## Pagrindinės funkcijos

### Klientams

- **Valgymo elgsenos testas** - Interaktyvus klausimynas su rezultatų vertinimu
- **Mitybos planai** - Personalizuoti maitinimosi planai su makroelementų sekimu
- **Receptų biblioteka** - Kuratorių atrinktos sveikos mitybos receptų kolekcija
- **Virtuvė** - Edukacinių vaizdo įrašų biblioteka
- **Prenumeratos paslaugos** - Įvairūs paslaugų lygiai su skirtingomis galimybėmis
- **Asmeninė paskyra** - Individuali darbo sritis su:
  - Mitybos planų valdymu
  - Produktų pakaitalų sistema
  - Išsaugotais receptais
  - Kalorijų sekimu
  - Pažangos statistika
  - Nustatymais

### Administratoriams

- **Vartotojų valdymas** - Klientų duomenų bazė su individualiais dashboardais
- **Mitybos planų kūrimas** - Planų, patiekalų ir produktų valdymas
- **Turinio valdymas** - Receptai, paslaugos, narystės, vaizdo įrašai
- **El. pašto valdymas** - Komunikacijos sekimas

## Technologijos

### Core Stack

- **React** 19.2.3 - UI framework
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.1.9 - Build tool & dev server
- **React Router DOM** 6.30.1 - Routing

### State Management & Data Fetching

- **TanStack React Query** 5.28.4 - Server state management
- **React Hook Form** 7.51.0 - Form management
- **Axios** 1.6.7 - HTTP client
- **Socket.io Client** 4.8.1 - Real-time features

### UI & Styling

- **SASS** 1.97.1 - CSS preprocessor
- **Framer Motion** 12.3.0 - Animations
- **React Icons** 5.0.1 - Icon library
- **Lucide React** 0.462.0 - Modern icons
- **FontAwesome** 6.5.1 - Icon set
- **React Select** 5.8.0 - Advanced select inputs

### Data Visualization & UX

- **Recharts** 2.13.0 - Charts and graphs
- **React Countup** 6.5.3 - Animated counters
- **React Hot Toast** 2.4.1 - Notifications

### Authentication & Security

- **JWT Decode** 4.0.0 - Token handling
- **React Cookie** 7.1.4 - Cookie management
- **AWS CloudFront Signer** 3.541.0 - Protected content delivery

### SEO & Meta

- **React Helmet** 6.1.0 - Dynamic head management

## Projekto struktūra

```
bezalos_frontend/
├── src/
│   ├── api/                      # API konfigūracija (Axios)
│   ├── pages/                    # Puslapiai
│   │   ├── client/               # Kliento puslapiai
│   │   ├── admin/                # Admin puslapiai
│   │   ├── paslaugosPages/       # Paslaugų puslapiai
│   │   ├── profilisPages/        # Profilio puslapiai
│   │   ├── recipesPages/         # Receptų puslapiai
│   │   ├── virtuvePages/         # Virtuvės puslapiai
│   │   └── paymentPages/         # Mokėjimų puslapiai
│   ├── components/               # Komponentai
│   │   ├── Shared/               # Bendri UI komponentai
│   │   ├── admin/                # Admin komponentai
│   │   ├── auth/                 # Autentifikacijos komponentai
│   │   ├── layout/               # Layout komponentai
│   │   └── [feature]/            # Feature-specifiniai komponentai
│   ├── features/                 # Feature moduliai
│   │   └── client/
│   │       ├── homepage/         # Pagrindinio puslapio sekcijos
│   │       ├── valgymotestas/    # Testo logika ir UI
│   │       └── paslaugospasiulymas/
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useAxiosPrivate.js
│   │   ├── useLogout.ts
│   │   └── [feature]/            # Feature-specifiniai hooks
│   ├── contexts/                 # React Context providers
│   │   ├── AuthProvider.tsx      # Autentifikacija
│   │   ├── MediaQueryProvider.tsx# Responsive design
│   │   ├── PaymentProvider.jsx   # Mokėjimai
│   │   └── ObserverProvider.tsx  # Intersection Observer
│   ├── layouts/                  # Layout wrappers
│   │   └── ClientLayout.tsx
│   ├── styles/                   # Globalūs stiliai
│   │   ├── index.scss
│   │   ├── _variables-colors.scss
│   │   ├── _variables-fonts.scss
│   │   └── _variables-spaces.scss
│   ├── assets/                   # Statiniai failai
│   │   ├── images/
│   │   ├── icons/
│   │   ├── videos/
│   │   └── pdf/
│   ├── utils/                    # Pagalbinės funkcijos
│   │   ├── calculationsHelpers.js
│   │   ├── dateHelpers.js
│   │   ├── roles.ts
│   │   └── images.js
│   ├── constants/                # Konstantos
│   ├── App.tsx                   # Pagrindinis routing
│   └── main.tsx                  # Entry point
├── public/                       # Public assets
├── index.html                    # HTML šablonas
├── package.json                  # Dependencies
├── vite.config.js                # Vite konfigūracija
└── tsconfig.json                 # TypeScript konfigūracija
```

## Įdiegimas ir paleidimas

### Reikalavimai

- Node.js 22.x arba naujesnė versija
- npm arba yarn package manager

### Įdiegimo žingsniai

1. Klonuokite repositoriją:
```bash
git clone <repository-url>
cd bezalos_frontend
```

2. Įdiekite priklausomybes:
```bash
npm install
```

3. Sukurkite `.env` failą projekto šakniniame kataloge:
```env
# API Configuration
VITE_API_URL=http://localhost:3003/api/v1

# AWS CloudFront (jei naudojate)
VITE_CLOUDFRONT_URL=your-cloudfront-url
VITE_CLOUDFRONT_KEY_PAIR_ID=your-key-pair-id
VITE_CLOUDFRONT_PRIVATE_KEY=your-private-key

# Stripe (mokėjimams)
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key

# Facebook Pixel (jei naudojate)
VITE_FB_PIXEL_ID=1415961173554028
```

4. Paleiskite development serverį:
```bash
npm run dev
```

Aplikacija bus prieinama adresu: `http://localhost:5173`

## Available Scripts

### Development

```bash
npm run dev          # Paleidžia development serverį (port 5173)
npm run build        # Sukuria production build
npm run preview      # Preview production build lokaliai
npm run lint         # Paleidžia ESLint
```

## API Konfigūracija

Projektas naudoja Axios su dviem tipais klientų:

- **Public API** - Nereikalauja autentifikacijos
- **Private API** - Su JWT token interceptors

### API Endpoints

**Development**: `http://localhost:3003/api/v1`
**Production**: `/api/v1` (proxy per backend)

## Autentifikacija

Projektas naudoja JWT token based autentifikaciją:

- Access tokens saugomi memory
- Refresh token handling su automatine atnaujinimu
- Role-based access control:
  - Admin rolė: `1213`
  - User rolė: `2324`
- Protected routes su `RequireAuth` wrapper

## Stilių sistema

### Spalvų paletė

```scss
// Primary
$primary-light: #084747;
$primary-dark: #082b1d;

// Buttons
$button-primary: #7ed957;
$button-hover: #60c040;

// Backgrounds
$bg-light: #eff1ef;
$bg-dark: #082b1d;

// Macronutrients
$protein-color: #245D6B;
$carbs-color: #30c040;
$fat-color: #ec9f11;

// Utility
$error: #c00;
$success: #60c040;
```

### Tipografija

- **Font**: Poppins (100-900 weights)
- **Base size**: 10px
- **Scale**: 1.333 modular scale

### Layout Primitives

Projektas naudoja modulinę layout sistemą:
- Box, Stack, Grid, Cluster
- Container, Cover, Center
- Responsive spacing tokens

## Deployment

### CI/CD Pipeline (GitHub Actions)

Automatinis deployment su commit message tags:

```bash
# Dev deployment
git commit -m "Your message [dev]"
git push

# Production deployment
git commit -m "Your message [prod]"
git push
```

### Build Process

1. **Install**: `npm ci`
2. **Build**: `npm run build`
3. **Deploy**:
   - **Dev**: Hostinger (SSH)
   - **Production**: AWS (SSH)

### Artifact Storage

Build artifacts saugomi 1 dieną GitHub Actions.

## Responsive Design

Projektas optimizuotas visiems įrenginiams:

- Mobile-first approach
- MediaQuery context hook
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## SEO Optimizacija

- React Helmet dinaminiam head management
- Open Graph meta tags
- Twitter Card support
- Schema.org structured data (Organization, Person, WebSite)
- Canonical URLs
- Facebook Pixel integruotas

## Browser Support

- Chrome (naujausios 2 versijos)
- Firefox (naujausios 2 versijos)
- Safari (naujausios 2 versijos)
- Edge (naujausios 2 versijos)

## Code Style

Projektas naudoja:
- **ESLint** - JavaScript/React linting
- **EditorConfig** - Konsistentus code formatting
- **TypeScript** - Type safety

## Pagrindiniai maršrutai

### Public Routes

- `/` - Pagrindinis puslapis
- `/atlik-testa` - Testo įvadas
- `/atlik-testa/valgymo-elgsenos-testas` - Testas
- `/atlik-testa/suzinok-daugiau` - Paslaugų pasiūlymas
- `/receptai` - Receptų biblioteka
- `/virtuve` - Vaizdo įrašų biblioteka
- `/paslaugos` - Paslaugų sąrašas

### Protected Routes (User)

- `/profilis` - Pagrindinis dashboard
- `/profilis/planai` - Mitybos planai
- `/profilis/anketa` - Klausimynas
- `/profilis/pakaitai` - Produktų pakaitai
- `/profilis/receptai` - Išsaugoti receptai
- `/profilis/kalorijos` - Kalorijų sekimas
- `/profilis/statistika` - Statistika
- `/profilis/settings` - Nustatymai

### Admin Routes

- `/admin/users` - Vartotojų valdymas
- `/admin/nutritionplans` - Mitybos planų kūrimas
- `/admin/recipes` - Receptų valdymas
- `/admin/services` - Paslaugų valdymas
- `/admin/videos` - Vaizdo įrašų valdymas

## Performance Optimizations

- Code splitting su React.lazy
- Image optimization utilities
- TanStack Query caching
- Lazy loading vaizdo įrašams
- Intersection Observer lazy loading

## Saugumas

- XSS protection
- CSRF tokens
- JWT token handling
- HTTPS only cookies
- Content Security Policy
- GDPR-compliant cookie consent

## Pagalba ir palaikymas

Jei turite klausimų ar problemų:

1. Peržiūrėkite dokumentaciją
2. Patikrinkite GitHub Issues
3. Susisiekite: sandra@bezalos.lt

## Licencija

Privatus projektas. Visos teisės saugomos.

---

**Sukurta su ❤️ Lietuvoje**
