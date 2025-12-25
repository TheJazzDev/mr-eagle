# ⚡ Quick Start - Get Raymond's Portfolio Running in 5 Minutes

## Step 1: Get a Free Database (2 minutes)

Go to **[neon.tech](https://neon.tech)** and sign up (free):
1. Create new project: "eagle-portfolio"
2. Copy the connection string they show you
3. Done!

## Step 2: Configure (1 minute)

Open `.env` file and paste your connection string:
```env
DATABASE_URL="paste-your-neon-connection-string-here"
```

## Step 3: Install & Setup (2 minutes)

Run these commands in order:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

## Step 4: View!

Open **[http://localhost:3000](http://localhost:3000)**

You should see Raymond's beautiful portfolio! 🦅✨

---

## Deploy to Make it Live (Optional - 5 more minutes)

1. Create a GitHub repo and push your code
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add `DATABASE_URL` environment variable
5. Deploy!

Vercel gives you a free URL like: `raymond-portfolio.vercel.app`

---

## That's It!

Check **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed instructions and troubleshooting.

Check **[README.md](./README.md)** for full documentation.

---

**Happy Birthday Raymond! 🎉🦅**
