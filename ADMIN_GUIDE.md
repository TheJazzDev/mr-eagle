# 🔐 Admin Dashboard Guide

## Quick Access

**URL:** `http://localhost:3000/eagle-dash-2025`
**Password:** `eagle2025`

> ⚠️ **Important:** Change the password in production! Edit `src/app/eagle-dash-2025/page.tsx` line 27

---

## 📋 Features

### 1. Manage Work Experiences

**Add New Experience:**
1. Click "Add Experience" button
2. Fill in the form:
   - Company name
   - Position/role
   - Start date (e.g., "Jan 2024")
   - End date (leave empty if current role)
   - Check "Current Position" if applicable
   - Add responsibilities (one per line)
3. Click "Save"

**Edit Experience:**
1. Click the edit icon (pencil) on any experience card
2. Update the information
3. Click "Save"

**Delete Experience:**
1. Click the delete icon (trash) on any experience card
2. Confirm deletion

---

### 2. Manage Skills

**Add New Skill:**
1. Switch to "Skills" tab
2. Click "Add Skill" button
3. Enter skill name
4. Select category:
   - Leadership
   - Communication
   - Operations
   - Marketing
   - Product
   - Business
   - Technical
   - Research
5. Click "Save"

**Edit Skill:**
1. Hover over a skill card
2. Click the edit icon
3. Update name or category
4. Click "Save"

**Delete Skill:**
1. Hover over a skill card
2. Click the delete icon
3. Confirm deletion

---

## 💡 Tips

### Organizing Skills
- Group related skills under the same category
- Keep skill names concise (1-4 words)
- Categories are color-coded on the main website

### Writing Experience Descriptions
- Start each bullet with an action verb
- Be specific about achievements
- One responsibility per line
- Quantify results when possible

### Current Role
- Check "Current Position" for your active job
- Leave "End Date" empty for current roles
- Current roles appear first in the timeline

---

## 🔒 Security

### Changing the Password

1. Open `/src/app/eagle-dash-2025/page.tsx`
2. Find line 27: `if (password === 'eagle2025')`
3. Change `'eagle2025'` to your new password
4. Save the file

### Making the URL More Secret

1. Rename the folder `/src/app/eagle-dash-2025/` to something else
2. Use a longer, random string like `/src/app/my-secret-panel-xyz789/`
3. Update the URL accordingly

---

## 🐛 Troubleshooting

### "Failed to fetch data"
- Check if the database is running
- Verify `DATABASE_URL` in `.env`
- Run `npx prisma generate`

### Changes not appearing
- Refresh the main portfolio page
- Check if the save was successful
- Look for errors in the browser console

### Forgot password
- Check line 27 in `/src/app/eagle-dash-2025/page.tsx`
- Default is `eagle2025`

### Can't access admin page
- Verify the URL: `/eagle-dash-2025`
- Check if the folder exists in `/src/app/`
- Make sure the dev server is running

---

## 📱 Mobile Access

The admin dashboard works on mobile too!
- Use your phone's browser
- Navigate to the same URL
- Login with the password
- Manage content on the go

---

## 🎯 Best Practices

1. **Regular Updates**
   - Update your portfolio monthly
   - Add new skills as you learn them
   - Keep job descriptions current

2. **Content Quality**
   - Proofread before saving
   - Use consistent date formats
   - Keep descriptions professional

3. **Backups**
   - Export data periodically using Prisma Studio
   - Keep important changes documented
   - Consider database backups

4. **Testing**
   - After updates, check the main website
   - Verify on mobile devices
   - Test all links and sections

---

## 🚀 Advanced: API Endpoints

If you want to integrate with other tools:

- **GET** `/api/admin/data` - Fetch all data
- **POST** `/api/admin/experience` - Create experience
- **PUT** `/api/admin/experience` - Update experience
- **DELETE** `/api/admin/experience?id=xxx` - Delete experience
- **POST** `/api/admin/skill` - Create skill
- **PUT** `/api/admin/skill` - Update skill
- **DELETE** `/api/admin/skill?id=xxx` - Delete skill

---

## ❓ Need Help?

1. Check this guide first
2. Review the main `README.md`
3. Check `SETUP_GUIDE.md` for database issues
4. Search for errors online
5. Contact your developer friend! 😊

---

**Happy Managing! 🦅**
