# 🦅 Raymond Henry Portfolio - Mr Eagle

A stunning, modern Web3 portfolio website built as a birthday gift for Raymond Henry (Mr Eagle), showcasing his impressive journey as a Project Manager, Marketer, and Advisor in the Web3 space.

## ✨ Features

- 🎨 **Beautiful Web3-Inspired Design** - Gradient animations, smooth transitions, and modern UI
- 🌙 **Dark Mode Support** - Automatic dark/light mode based on system preferences
- 📱 **Fully Responsive** - Mobile-first design that looks perfect on all devices
- ⚡ **Blazing Fast** - Built with Next.js 15 and optimized for performance
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🗄️ **Database-Driven** - Dynamic content managed through Prisma and PostgreSQL
- 🔄 **Easy Updates** - Update portfolio content through the database
- 🎯 **SEO Optimized** - Meta tags and Open Graph support

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** PostgreSQL with Prisma ORM
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- npm or yarn package manager

### Setup Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**

   Update the `.env` file with your PostgreSQL database URL:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/eagle_portfolio?schema=public"
   ```

   Replace `username`, `password`, and database connection details with your actual PostgreSQL credentials.

3. **Initialize the database:**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations to create database tables
   npx prisma migrate dev --name init

   # Seed the database with Raymond's portfolio data
   npx prisma db seed
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Updating Portfolio Content

The portfolio content is stored in the PostgreSQL database. You can update it in **three ways**:

#### Option 1: Admin Dashboard (Easiest!)

Raymond has a secret admin panel where he can manage everything without touching code:

1. Navigate to: `http://localhost:3000/eagle-dash-2025`
2. Password: `eagle2025` (change this in production!)
3. Manage experiences and skills through beautiful forms
4. Add, edit, or delete content instantly

**Features:**
- ✅ Add/edit/delete work experiences
- ✅ Manage skills by category
- ✅ User-friendly interface
- ✅ No coding required!
- ✅ Changes appear instantly on the website

#### Option 2: Update the Seed File

Edit `prisma/seed.ts` with new content, then run:
```bash
npx prisma db seed
```

#### Option 3: Direct Database Updates

Use Prisma Studio for a visual interface:
```bash
npx prisma studio
```

This opens a browser-based GUI where you can:
- Add/edit experiences
- Update skills
- Modify education details
- Change profile information

### Customizing Colors

The color scheme can be modified in `app/globals.css`:
- `--primary`: Main brand color (blue)
- `--secondary`: Secondary color (purple)
- `--accent`: Accent color (cyan)

### Adding New Sections

1. Create a new component in `/components`
2. Add it to `/app/page.tsx`
3. Update the navigation in `/components/Navigation.tsx`

## 📁 Project Structure

```
casi/
├── app/
│   ├── layout.tsx          # Root layout with Navigation
│   ├── page.tsx            # Main page integrating all components
│   └── globals.css         # Global styles and CSS variables
├── components/
│   ├── Hero.tsx            # Hero section with profile intro
│   ├── ExperienceTimeline.tsx  # Professional experience timeline
│   ├── Skills.tsx          # Skills showcase by category
│   ├── Education.tsx       # Education and certifications
│   ├── Contact.tsx         # Contact information and footer
│   └── Navigation.tsx      # Sticky navigation with smooth scroll
├── lib/
│   └── prisma.ts           # Prisma client singleton
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data with portfolio content
├── public/
│   └── eagle-avatar.svg    # Profile avatar image
└── README.md
```

## 🗄️ Database Schema

### Profile
- Personal information
- Contact details
- Social media links

### Experience
- Company name
- Position/role
- Date range
- Description (array)
- Current role flag

### Education
- Institution
- Degree
- Field of study
- Year

### Skills
- Skill name
- Category (Leadership, Marketing, Technical, etc.)

## 🎯 Key Components

### Hero Section
- Animated background with floating orbs
- Profile image with glow effect
- Introduction and tagline
- Social media links
- Smooth scroll indicator

### Experience Timeline
- Chronological display of roles
- Alternating left/right layout on desktop
- Current role highlighting
- Animated entry effects
- Hover interactions

### Skills Showcase
- Grouped by category
- Icon-based cards
- Color-coded by skill type
- Staggered animations
- Responsive grid layout

### Education
- Harvard credentials display
- Hover effects
- Year and field information
- Decorative elements

### Contact Footer
- Multi-channel contact options
- Social media integration
- Animated background
- Made with love message

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your hosting platform:
```env
DATABASE_URL="your-production-database-url"
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed database with data

## 🎁 Gift Message

This portfolio was crafted with care as a birthday gift for Raymond Henry. Over 10 years of friendship, you've helped secure amazing opportunities. This is a small token of appreciation for everything you've done.

May this portfolio showcase your incredible journey in the Web3 space and help you reach even greater heights!

Happy Birthday, Mr Eagle! 🦅🎉

## 📝 License

This project is created as a personal gift. Feel free to customize and use it as needed.

## 🙏 Acknowledgments

- Built with Next.js and the amazing React ecosystem
- Animations powered by Framer Motion
- Icons from Lucide React
- Styled with Tailwind CSS

---

**Made with ❤️ by a good friend**
