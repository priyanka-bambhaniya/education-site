# EduInsight Pro

EduInsight Pro is a production-grade K-12 learning analytics SaaS built on Next.js 14, TypeScript, Tailwind CSS, Supabase, and Vercel. It ships with role-aware architecture for students, teachers, admins, and parents plus core modules for schools, classes, assessments, question banks, student responses, progress analytics, and reporting.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth + Storage)
- Vercel deployment

## Project Structure

```text
app/
  api/
    health/route.ts
  auth/
    callback/route.ts
  dashboard/
    page.tsx
    analytics/page.tsx
    assessments/page.tsx
    classes/page.tsx
    question-bank/page.tsx
    reports/page.tsx
    responses/page.tsx
    schools/page.tsx
  sign-in/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  dashboard/
    app-shell.tsx
    module-page.tsx
    sidebar.tsx
lib/
  supabase/
    browser.ts
    middleware.ts
    server.ts
    service-role.ts
  env.ts
  module-data.ts
  navigation.ts
  rbac.ts
  utils.ts
public/
  favicon.ico
middleware.ts
types/
  database.ts
  domain.ts
```

## Next.js Project Initialization

```bash
npx create-next-app@latest eduinsight-pro \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --import-alias "@/*"
```

## Tailwind Configuration

- `tailwind.config.ts` scans `app/`, `components/`, `lib/`, and `types/`.
- Theme tokens are aligned to CSS variables in `app/globals.css`.

## Supabase Client Setup

- `lib/supabase/browser.ts` creates the browser client for client components.
- `lib/supabase/server.ts` creates the server client for server components and routes.
- `lib/supabase/service-role.ts` is reserved for server-only admin tasks.
- `lib/supabase/middleware.ts` integrates Supabase Auth into Next.js middleware.
- `middleware.ts` applies session refresh and protects `/dashboard/*`.

## Environment Variables

Copy `.env.example` into `.env.local` and fill in your Supabase credentials.

```bash
NEXT_PUBLIC_APP_NAME="EduInsight Pro"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
SUPABASE_DB_URL="postgresql://postgres:[YOUR-PASSWORD]@db.kidqvpdnwwifxbmeirrv.supabase.co:5432/postgres"
SUPABASE_STORAGE_BUCKET="eduinsight-pro-assets"
NEXT_PUBLIC_DEFAULT_ROLE="admin"
```

## Git Initialization

```bash
git init
git add .
git commit -m "feat: scaffold EduInsight Pro"
```

## Development

```bash
npm install
npm run dev
```

## Deployment (Vercel)

1. Create a new Vercel project and import this repo.
2. Add the same environment variables from `.env.local` in the Vercel dashboard.
3. Deploy and validate `/api/health` for readiness.


