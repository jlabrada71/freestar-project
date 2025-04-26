
# 🃏 BlackJack App (Nuxt.js)

Welcome to the BlackJack application!  
This is a simple, interactive BlackJack game built using **TypeScript**, **VueJS** , **Nuxtjs** and **TailwindCSS**.

This README provides a runbook for operating, building, and testing the application.

---

## 🏃‍♂️ Runbook

### Requirements
- Node.js v20+ (recommended)
- npm v9+ 
- Git (for version control)

---

### Starting the Application Locally

1. **Clone the repository**
   ```bash
   git clone  https://github.com/jlabrada71/freestar-project.git
   cd freestar-project/blackjack
   ```

2. **Install dependencies**
   ```bash
   npm install

   ```

3. **Run the development server**
   ```bash
   npm run dev

   ```
   
   The app will start on [http://localhost:3000](http://localhost:3000).

---

### Building for Production

1. **Build the app**
   ```bash
   npm run build

   ```

2. **Preview the production build**
   ```bash
   npm run preview

   ```
   > This will simulate a production server locally on [http://localhost:3000](http://localhost:3000).

---

### Testing the Application

> _Testing ensures that gameplay business rules are stable and bug-free._

1. **Run unit tests**  
   _(if you have set up testing, e.g., Vitest or Jest)_
   ```bash
   npm run test

   ```

---

## 🛠️ Technologies Used

- [Nuxt.js 3](https://nuxt.com/)
- [Vue.js 3](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/) 
- Testing: [Vitest](https://vitest.dev/)

---

## 📋 Notes

- **Static Hosting:**  
  If you want to deploy to platforms like Vercel, Netlify, etc., build the app using `npm run build` and follow their deployment instructions.

---

## 🚨 Troubleshooting

| Issue                      | Solution                                   |
|-----------------------------|--------------------------------------------|
| Ports already in use        | Kill the existing process or change port  |
| Modules not found           | Run `npm install` again                    |
| Build errors                | Check Nuxt logs and verify environment     |
| Unexpected gameplay behavior | Clear browser cache and cookies            |


