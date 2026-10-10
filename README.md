# Dilshani Vitharana - Portfolio

A modern, responsive developer portfolio for an aspiring Full-Stack Developer.
Built with **React + Vite + Tailwind CSS + Motion + Lucide icons**. Frontend only: no backend, no database.

> Every piece of personal content lives in **one file**: [`src/data/portfolioData.js`](src/data/portfolioData.js).
> You can change names, skills, links and certifications without touching any component.
>
> New to React? Read [LEARNING_GUIDE.md](LEARNING_GUIDE.md): a phase-by-phase explanation with practice tasks.

## Features

- Sticky navbar with smooth scrolling, an animated active-section indicator and a mobile hamburger menu
- Dark and light themes (remembers your choice; follows your system on the first visit)
- Sections: Home, About, Skills, Projects, Experience, Education, Certifications, Contact, plus a Footer with Back to top
- Scroll-reveal animations, subtle hover effects, animated gradient accents
- Respects `prefers-reduced-motion`
- Semantic HTML, skip link, visible focus rings, keyboard-friendly navigation
- SEO title, meta description and Open Graph tags
- No fake data: anything unverified is an editable placeholder

## Run it locally (Windows PowerShell + VS Code)

You need **Node.js 20.19 or newer** (check with `node --version`). Download the LTS version from https://nodejs.org if needed.
When VS Code asks to install the recommended extensions (Tailwind CSS IntelliSense, Oxc), click **Install**. They give you class-name autocomplete and error hints.

```powershell
# 1. Open the project folder in VS Code
cd C:\dilshani-portfolio
code .

# 2. Install the packages (only needed once, or after package.json changes)
npm install

# 3. Start the development server
npm run dev
```

Vite prints a local address such as `http://localhost:5173/`. Hold **Ctrl** and click it, or paste it into your browser.
Save a file in VS Code and the browser updates by itself. Stop the server with **Ctrl + C**.

Handy commands:

| Command           | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server with live reload          |
| `npm run build`   | Create the optimized production site in `dist` |
| `npm run preview` | Serve the `dist` build locally to test it      |
| `npm run lint`    | Check the code for common mistakes             |

## Project structure

```
src/
  components/
    Navbar.jsx  Hero.jsx  About.jsx  Skills.jsx  Projects.jsx  Experience.jsx
    Education.jsx  Certifications.jsx  Contact.jsx  Footer.jsx
    ui/                      small reusable pieces
      Button  Card  Badge  Reveal  Section  SectionHeading
      SocialLinks  ThemeToggle  Timeline  BrandIcons
  data/
    portfolioData.js         <- ALL your content (edit this one)
  hooks/
    useTheme.js              dark / light switching
    useActiveSection.js      highlights the current nav link
  lib/
    helpers.js               cx(), isProvided(), normalizeUrl()
    contactChannels.js       turns your links into safe, ready-to-use link objects
  App.jsx                    puts the sections together
  main.jsx                   starts React
  index.css                  Tailwind + colour tokens for both themes
index.html                   SEO + Open Graph tags
public/                      files served as-is (favicon, your CV, your photo)
```

## Placeholders you need to replace

Open `src/data/portfolioData.js`. A value of `''` means "not provided yet". The site then shows a placeholder, or hides the button, instead of a broken link.

| Where in `portfolioData.js` | What to add | What happens until you do |
| --- | --- | --- |
| `links.email`, `links.linkedin`, `links.github`, `links.blog` | **Already filled in** with your real details | (If you ever empty one, its button and icon are hidden and the Contact card becomes a placeholder.) |
| `projects[].videoUrl` | A demo video for each project (see "Project demo videos" below) | The card simply has no video |
| `projects[].liveUrl` | Link to the deployed site, if the project is hosted | No "Live site" link |
| `projects` (text) | **4 projects are already filled in**, written from the code and READMEs in your public GitHub repos | Please read every sentence and correct anything that is not exact. If the list were empty, the section would show "Projects coming soon". |
| `links.cv` | **Already set** to `/Dilshani-Vitharana-CV.pdf` (the file is `public/Dilshani-Vitharana-CV.pdf`, copied from your Documents folder, dated Dec 2025). **Please update it with your latest CV** (see below). | If set to `''`, no CV buttons or card appear |
| Contact form activation | Send one first message and click the "Activate" link FormSubmit emails you (see "Contact form" below) | Messages are not delivered until you activate |
| `personal.photo` | **Already set** to `/profile.jpg` (the file is `public/profile.jpg`). To change it, replace that file and keep the name. | If set to `''`, the hero goes back to typography-only with no portrait |
| `certifications[].issuer` | Issuing organisation from the official certificate | Shows "To be verified" |
| `certifications[].date` | Issue date from the certificate | Shows "To be verified" |
| `certifications[].credentialId` | Credential ID, if the certificate has one | Shows "To be verified" |
| `certifications[].credentialUrl` | Official verification link | "View credential" link is hidden |
| `index.html` | After deploying: uncomment `og:url` and `og:image` and add your real values | Link previews have no image |

Also double-check these facts against your own records before sharing:

- Job title wording: the Experience card says **Software Engineer Intern**.
- Internship dates: December 2025 - June 2026.
- Education dates: 2022 - November 2026 (Expected).

## Project demo videos

Each project card can show a small demo video above its title. Set `videoUrl` on the project in `src/data/portfolioData.js`. There are three ways:

1. **A video file (best for short clips).** Put the file in `public/videos/` and write `videoUrl: '/videos/my-demo.mp4'`.
   - Keep it small: about 10-15 MB, 20-40 seconds, 720p. `.mp4` (H.264) or `.webm` both work.
   - GitHub refuses files over 100 MB, and large files make the site slow.
   - Optional: add `videoPoster: '/videos/my-demo-poster.jpg'` (an image shown before the video starts).
2. **A YouTube link.** Write `videoUrl: 'https://youtu.be/XXXXXXXXXXX'`. The video loads only when a visitor clicks play, so the page stays fast. You can set the video to "Unlisted" on YouTube.
3. **Any other site (Loom, Google Drive...).** Paste the link. A "Watch demo" link appears instead of a player.

Leave `videoUrl: ''` and no video is shown. Tip: the free Windows Game Bar (`Win + G`) or OBS Studio can record your screen.

## Customising

- **Text, skills, dates, links:** `src/data/portfolioData.js`
- **Colours:** top of `src/index.css`. `:root` is the light theme, `.dark` is the dark theme.
- **Fonts:** the Google Fonts `<link>` in `index.html` and `--font-*` in `src/index.css`
- **Section order:** the order of `<Hero />`, `<About />` ... inside `src/App.jsx` (keep `navItems` in the data file in the same order)

## Contact form (how it works)

This site is frontend-only, so it has no server of its own to send email. A contact form therefore needs an outside service. This one uses **[FormSubmit](https://formsubmit.co)** (free, no account). When a visitor sends a message, the browser posts it to FormSubmit, and FormSubmit forwards it to the email in `links.email`.

**One-time activation (you must do this once):**
1. Run the site (or open the deployed one) and send yourself a first message through the form.
2. FormSubmit emails your Gmail an **"Activate Form"** message. Open it and click the activation link. (Check Spam if you do not see it.)
3. From then on, every message arrives in your inbox. The visitor's email is set as "Reply-To", so you can just press Reply.

If you sent several test messages before activating, you will have several "Activate Form" emails. **Only the newest one works.** Each new attempt makes FormSubmit create a fresh link and the older links then show "Not a valid link - Confirmation token not found". If that happens: open the newest email (check the time) and click that one. If every link says "Not a valid link", the form may already be active, so send a message from the site to find out. If the site still says it is "not switched on yet", send one new message, then click only the one new email that arrives.

Until you activate it, the form tells visitors it is "not switched on yet" and shows your email address instead (it does **not** pretend the message was sent). Messages sent before activation may not reach you, so activate it **before** you share the site.

Good to know:
- Messages pass through FormSubmit (the form says so under the Send button).
- Spam protection: a hidden trap field catches simple bots. If you ever get a lot of spam, FormSubmit offers a captcha option on their website.
- If sending fails (for example the visitor is offline), the form shows a friendly error with a direct `mailto:` link, and keeps what they typed.
- To turn the form off, set `enableForm: false` in the `contact` section of `src/data/portfolioData.js`. The contact cards stay.
- The form only works when `links.email` is set.

## Your CV (View and Download)

Your CV is already set up: the file is `public/Dilshani-Vitharana-CV.pdf` and `cv: '/Dilshani-Vitharana-CV.pdf'` is set in `src/data/portfolioData.js`.

**To update your CV:** save your new PDF over `public/Dilshani-Vitharana-CV.pdf` (same name). Nothing else to change.

That is all. Three things appear automatically: a **Download CV** button in the navbar (and mobile menu), and a **CV card** in the Contact section with **View CV** (opens the PDF in a new tab) and **Download CV**. Downloads are always named `Dilshani-Vitharana-CV.pdf`. While `cv` is `''`, none of these show.

Tip: keep the CV PDF under about 1 MB, and replace the file (same name) whenever you update your CV.

## Build for production

```powershell
npm run build
npm run preview
```

The finished website is in the `dist` folder.

## Upload to GitHub

1. Create an **empty, public** repository on https://github.com/new (no README, no .gitignore, no license).
   - **Recommended name: `Dilshani55.github.io`**. Your site then lives at the clean address `https://dilshani55.github.io/`.
   - Any other name works too (for example `portfolio-website`), and the site will then be at `https://dilshani55.github.io/portfolio-website/`.
   - You already have an older repo called `portfolio` (your previous portfolio). Pick a new name unless you want to replace that old one.
2. In PowerShell inside the project folder (replace `REPO-NAME` with the name you chose):

```powershell
git init
git add .
git commit -m "Initial commit: portfolio website"
git branch -M main
git remote add origin https://github.com/Dilshani55/REPO-NAME.git
git push -u origin main
```

`node_modules` and `dist` are already ignored by `.gitignore`, so they are not uploaded.
Later, to publish changes: `git add .`, `git commit -m "Describe the change"`, `git push`.

**Heads-up: a public repository is public.** Everything in it can be seen by anyone, including `public/Dilshani-Vitharana-CV.pdf` (it contains your phone number) and `public/profile.jpg`. Check your CV first.

## Deploy

### Host on GitHub Pages (free, from the same repository)

The project already contains the workflow file `.github/workflows/deploy.yml`, so you only need to switch Pages on once.

1. Push the project to GitHub (see "Upload to GitHub" above).
2. On GitHub open your repository, then **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions**. (Only needed once.)
4. Open the **Actions** tab. The "Deploy to GitHub Pages" run starts by itself after a push (or click **Run workflow**). It takes about 1-2 minutes. When it turns green, the address appears in **Settings > Pages**.
5. From now on, every `git push` to `main` updates the live site automatically.

How it works: the workflow runs `npm run build` on GitHub's servers and publishes the `dist` folder. It also works out the site's "base path" by itself (`/` for `Dilshani55.github.io`, otherwise `/REPO-NAME/`), which is why the photo, CV and videos still load on a project site. If you ever want to test that on your own computer in PowerShell: `$env:BASE_PATH="/REPO-NAME/"; npm run build; npm run preview`, then open `http://localhost:4173/REPO-NAME/`. (Close the terminal afterwards, or run `Remove-Item Env:BASE_PATH`.)

Good to know:
- GitHub Pages is free for **public** repositories.
- The contact form keeps working there, because FormSubmit accepts messages from any address. After deploying, send yourself one real message to confirm.
- If the Actions run turns red, open it and read the message. The most common cause is step 3 above (Source not set to "GitHub Actions").
- A custom domain (like `dilshani.dev`) can be added later in **Settings > Pages**.

### Vercel (alternative)

1. Go to https://vercel.com and sign in with GitHub.
2. **Add New... > Project**, then import your repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`). Click **Deploy**.
4. Every `git push` to `main` redeploys automatically.

### Netlify

1. Go to https://app.netlify.com and sign in with GitHub.
2. **Add new site > Import an existing project**, then choose your repository.
3. Build command: `npm run build`. Publish directory: `dist`. Click **Deploy**.

After deploying, put your new address in `og:url` / `og:image` in `index.html` (see the placeholder table), and add the address to your LinkedIn profile and CV.

## Accessibility notes

- Skip link, landmarks (`header`, `nav`, `main`, `footer`) and one `h1` with an ordered `h2`/`h3` hierarchy
- All interactive controls are at least 44 px tall and reachable by keyboard; focus rings are always visible
- Mobile menu works with the keyboard (`Esc` closes it); the theme button announces its action
- External links announce "opens in a new tab" to screen readers
- Animations are removed or shortened when the system asks for reduced motion
