# Job Application Tracker

A small personal project I built to keep track of my job applications in one place.

Instead of sending an updated list every time something changes, I can simply share the public link. The overview stays up to date and shows where I applied, when I applied, the current status, and any response I received.

## Features

- Public overview of job applications
- Dutch and English interface
- Search applications by company, position or location
- Filter applications by status
- Track application status and responses
- Responsive layout for desktop and mobile
- Private admin dashboard
- Add, edit and delete applications
- Protected admin access

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

## How It Works

The public dashboard is read-only and can be shared with others.

Applications are displayed with their current status, application date, company, location and any response that was received.

The private admin area is used to manage the applications. When an application is added or updated, the changes are stored in Supabase and automatically reflected on the public overview.

## Getting Started

Clone the repository:

```bash
git clone <https://github.com/mohamadmatar7/job-application-tracker.git>
cd job-application-tracker
```

Install the dependencies:

```bash
npm install
```

Create a `.env.local` file and add the required Supabase environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

If the project uses a server-side Supabase key for admin operations, add it as well:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Never commit `.env.local` or private keys to GitHub.

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Languages

The public overview is available in:

- Dutch
- English

The language can be changed directly from the dashboard.

## Why I Built It

I wanted a simple way to keep my job application process organized and up to date.

Instead of maintaining separate documents or sending a new list every time something changes, I can update the tracker once and share the same link.

Simple, practical, and easier to maintain.

## License

This is a personal project created for my own use.