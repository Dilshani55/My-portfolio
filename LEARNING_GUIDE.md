# Learning Guide - understand and maintain your own portfolio

Simple English, with short Sinhala notes where they help.
Each phase has: **files**, **what they do**, **why**, **concepts**, **how to change it**, and a **practice task**.

Tip: keep `npm run dev` running in one terminal. Every time you save a file, the browser updates by itself.
(`npm run dev` run කරලා තියන්න. file එකක් save කරපු ගමන් browser එක update වෙනවා.)

---

## Phase 1 - Project setup

**Files created (by Vite):** `package.json`, `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx`, `.gitignore`, `.oxlintrc.json`

| File | What it does |
| --- | --- |
| `package.json` | The project's ID card: its name, the scripts (`npm run dev`) and the packages it needs. |
| `index.html` | The ONE real HTML page. React draws everything inside `<div id="root">`. Also holds the SEO tags. |
| `src/main.jsx` | The starting point. It tells React: "draw `<App />` inside `#root`". |
| `src/App.jsx` | The top component. It puts the Navbar, sections and Footer in order. |
| `vite.config.js` | Settings for Vite (the tool that runs and builds the site). |

**Why this way:** Vite starts instantly and refreshes the page the moment you save. React lets you build the page from small reusable pieces.

**Concepts**
- **Component** = a reusable piece of UI. (UI එකේ නැවත පාවිච්චි කළ හැකි කෑල්ලක්.) In React it is just a function that returns HTML-like code called **JSX**.
- **npm** installs packages. `node_modules` is where they go. You never edit it, and Git ignores it.

**How to change it:** edit `<title>` and the `description` meta tag in `index.html` to change what Google and LinkedIn show.

**Practice task:** open `index.html` and change the `<title>`. Save and look at the browser tab. Then change it back.

---

## Phase 2 - Tailwind, icons, animation, structure

**Files created:** `src/index.css`, `src/lib/helpers.js`, folders `components/`, `components/ui/`, `data/`, `hooks/`, `lib/`

**Packages added:** `tailwindcss` + `@tailwindcss/vite` (styling), `motion` (animation), `lucide-react` (icons)

**`src/index.css` explained**
- `@import 'tailwindcss';` turns Tailwind on.
- `:root { --bg: #f6f8fc; ... }` are **CSS variables** for the light theme. `.dark { --bg: #060b18; ... }` replaces the same names for the dark theme. (වර්ණ එක තැනකින් පාලනය කරනවා.)
- `@theme inline { --color-bg: var(--bg); ... }` tells Tailwind our names, so `bg-bg`, `text-fg`, `text-muted`, `border-line`, `text-accent` work and automatically follow the theme.
- `html { scroll-behavior: smooth; scroll-padding-top: 5rem; }` gives smooth scrolling and stops the sticky navbar from covering headings.
- `@media (prefers-reduced-motion: reduce)` switches animations off for people who ask their computer for less motion.

**Tailwind in one minute:** instead of writing CSS in another file, you write small classes on the element.

```jsx
<p className="mt-4 text-lg font-semibold text-accent">Hello</p>
//             |      |        |             |
//        margin-top  size   boldness     colour
```

Pattern: `md:text-xl` means "from 768px width and up, use text-xl". `hover:text-accent` means "only while hovering". Write for mobile first, then add `sm:`, `md:`, `lg:` for bigger screens.

**`src/lib/helpers.js`:** `cx()` joins class names, `isProvided()` checks a value is not empty, `normalizeUrl()` adds `https://` when you forget it.

**Practice task:** in `src/index.css`, change the dark theme `--accent: #38bdf8;` to `#a78bfa` (purple). Save and see every accent change. Then undo it. (One line changed the whole site: that is why we use variables.)

---

## Phase 3 - Navbar, Hero, About

**Files created:** `Navbar.jsx`, `Hero.jsx`, `About.jsx`, `ui/ThemeToggle.jsx`, `ui/Button.jsx`, `ui/SocialLinks.jsx`, `ui/BrandIcons.jsx`, `ui/Section.jsx`, `ui/SectionHeading.jsx`, `ui/Reveal.jsx`, `ui/Card.jsx`, `hooks/useActiveSection.js`, `lib/contactChannels.js`, `data/portfolioData.js`

**What each does**
- **`portfolioData.js`**: ALL your content. Components only *read* from it.
- **`Navbar.jsx`**: sticky header, links, theme button, mobile menu.
- **`useActiveSection.js`**: a **custom hook** that watches which section is in the middle of the screen so the navbar can highlight it.
- **`Hero.jsx`**: the big first section.
- **`About.jsx`**: your intro text and a facts card.
- **`Reveal.jsx`**: wraps any content so it fades in when you scroll to it.
- **`contactChannels.js`**: turns your email / LinkedIn / GitHub values into safe links. If a value is empty, the link simply does not appear. (හිස් නම් link එක පෙන්වන්නේ නැහැ, එනිසා broken link එකක් කවදාවත් නැහැ.)

**Why the code is written this way**
- Navbar links are `<a href="#about">`. The browser scrolls by itself, the keyboard works, and the back button works. No JavaScript needed for that.
- The mobile menu **floats over the page** (it is `absolute`). While testing I found that when it pushed the page down, tapping a link scrolled to the wrong place. Overlay fixes it. Good example of why we test.

**Concepts**
- **Props** = data a parent gives to a child: `<Button href="#contact">Contact Me</Button>`. (Parent එකෙන් child එකට දෙන දත්ත.)
- **State** = data a component remembers: `const [menuOpen, setMenuOpen] = useState(false)`. When state changes, React redraws. (Component එකට මතක තියාගන්න වෙන දත්ත.)
- **`useEffect`** runs code after the component appears, e.g. adding a scroll listener. The `return () => ...` part is the **cleanup**.
- **`array.map()`** makes one element for every item: `navItems.map(item => <li>...</li>)`. Always give each a unique `key`.
- **Conditional rendering:** `{cvHref && <a>Download CV</a>}` shows the link only when `cvHref` is not empty.
- **Semantic HTML:** `header`, `nav`, `main`, `section`, `footer` tell browsers and screen readers what each part is.

**How to change it**
- Hero text, chips: `personal` in `portfolioData.js`.
- Add a nav item: add `{ id: 'x', label: 'X' }` to `navItems` and a section with `id="x"`.
- Change the About paragraphs: `about.paragraphs`.

**Practice task:** in `portfolioData.js`, change `availability` or the About `goal` sentence. Then add a 5th fact to `about.facts` (copy one and change `label` and `value`). Watch it appear.

---

## Phase 4 - Skills, Projects, Experience, Education, Certifications

**Files created:** `Skills.jsx`, `Projects.jsx`, `Experience.jsx`, `Education.jsx`, `Certifications.jsx`, `ui/Badge.jsx`, `ui/Timeline.jsx`

**What each does**
- **`Skills.jsx`**: loops over `skillCategories` and makes one card per category. No fake percentages, only honest lists.
- **`Projects.jsx`**: loops over the `projects` array and makes one card per project: an optional **demo video**, title, description, optional highlights, technologies, and **Code** / **Live site** links that only appear when you give a URL. While the array is empty it shows a "coming soon" placeholder.
- **The video part:** `getVideoSource()` in `lib/helpers.js` looks at `videoUrl` and decides: a file in `/public/videos` uses a normal `<video controls>` tag; a YouTube link becomes a **click-to-play** embed (`useState` remembers whether it was clicked, and only then loads the iframe); any other link becomes a "Watch demo" link.
- **`Experience.jsx` / `Education.jsx`**: use `Timeline` (the vertical line with dots) and a `Card` for each entry.
- **`Certifications.jsx`**: shows each certificate. Empty details show **"To be verified"** and the link only appears when you add a URL.
- **`Badge.jsx`**: the small rounded labels (dates, "Internship").

**Why:** all four read arrays from `portfolioData.js`. To add a second job you only add one more object to the `experience` array. No component code changes. (data and design වෙන් කරලා තියෙනවා.)

**Concepts**
- **Reusable components with props:** `Card` and `Badge` are used in many places, so a design change happens in one file.
- **CSS Grid:** `grid gap-5 sm:grid-cols-2 lg:grid-cols-3` = 1 column on phones, 2 on tablets, 3 on laptops.
- **Flexbox:** `flex items-center gap-4` puts items in a row and centres them vertically.
- **Object mapping for icons:** `categoryIcons = { monitor: Monitor, ... }` turns the text `'monitor'` in the data file into the real icon.

**How to change it**
- Add a skill: add the name to the right `items` array in `skillCategories`.
- Add a certificate detail: fill `issuer`, `date`, `credentialId`, `credentialUrl` **only from your real certificate**.
- Add another job: copy the object in `experience`, give it a new `id`, and change the text.
- Add a project: in `portfolioData.js`, find `export const projects`, copy one of the objects, change the `id`, text, technologies and links. Only write what is **true**.
- Add a demo video: put a small `.mp4` in `public/videos/` and set `videoUrl: '/videos/name.mp4'` on that project (or paste a YouTube link).

**Practice task (video):** record a 20-second screen video of one project, put it in `public/videos/`, set its `videoUrl`, and watch the player appear on that card.

**Practice task:** add a new skill (e.g. `'Postman'`, only if it is true!) to Developer Tools. Then fill the `issuer` of one certificate with the exact text from your certificate and watch the "To be verified" disappear.

---

## Phase 5 - Contact, Footer, theme switching

**Files created:** `Contact.jsx`, `Footer.jsx`, `hooks/useTheme.js`

**What each does**
- **`Contact.jsx`**: the form on the left and, on the right, one card per channel (a real link when you filled the value, a dashed placeholder when you did not) plus a CV card with **View** and **Download** when `links.cv` is set.
- **`ContactForm.jsx`**: the message form (validation, sending, success and error screens).
- **`Footer.jsx`**: name, social icons, the current year (calculated by `new Date().getFullYear()`), and a Back to top link.
- **`useTheme.js`**: remembers dark or light, flips the `dark` class on `<html>`, and saves your choice in `localStorage`.

**Why**
- A website with no server cannot send email by itself. So the contact **form** (`ContactForm.jsx`) uses a free outside service, **FormSubmit**: the browser sends the message with `fetch()`, and FormSubmit forwards it to your Gmail. A plain `mailto:` link (the email card) is the backup that needs no service.
- The form checks the input first (name, a valid email, a message of 10+ characters), shows clear errors, and handles the replies: **sending**, **success**, **error** and **"not activated yet"**. It keeps what the visitor typed if something fails.
- A tiny script in `index.html` sets the theme **before** React loads, so the page never flashes the wrong colours.

**Concepts**
- **Custom hook:** a function starting with `use` that bundles state + effects so components stay simple.
- **`localStorage`:** a small storage inside the visitor's browser. (Browser එකේ පොඩි memory එකක්.) It is wrapped in `try/catch` because some browsers block it.
- **`mailto:`**: `href="mailto:you@example.com"` opens the visitor's email app.
- **Controlled inputs:** `value={values.name}` + `onChange` means React state is always the single source of truth for what is typed in the form.
- **`fetch` + `async/await`:** `await fetch(url, { method: 'POST', body })` sends data and waits for the reply; `try/catch` handles network failures.
- **Honeypot:** a hidden field that real people never fill. If it has text, the sender is a bot, so the form does not send anything.

**How to change it**
- Put your real details in `links` in `portfolioData.js`. That is all. Hero icons, footer icons and contact cards update together.

**Practice task:** put a test email into `links.email`, see where it appears (hero, contact, footer), then **delete it again** if it is not real. After that, try changing `contact.heading`.

---

## Phase 6 - Responsive and accessible

Nothing new to install. This phase is mostly about the *classes* and *attributes* already in the code. Find them:

| Goal | Where to look |
| --- | --- |
| Phone to desktop layout | Tailwind prefixes: `sm:` `md:` `lg:` (search the files for `lg:grid-cols`) |
| No sideways scroll | `overflow-x: clip` in `index.css`, plus `min-w-0` / `break-words` on long text |
| Touch-friendly | `min-h-11` (= 44px) on buttons and links |
| Keyboard | Skip link, `:focus-visible` in `index.css`, `Esc` closes the menu in `Navbar.jsx` |
| Screen readers | `aria-label`, `aria-expanded`, `aria-current`, `sr-only` text, `aria-hidden` on decoration |
| Reduced motion | `<MotionConfig reducedMotion="user">` in `App.jsx` and the media query in `index.css` |

**Concepts**
- **Mobile-first:** write the small-screen style first, then add `md:` / `lg:` for bigger screens.
- **Accessibility (a11y):** the site must work with a keyboard and a screen reader, and text needs enough contrast.
- **Heading order:** one `h1`, then `h2` for sections, `h3` for items. Never skip levels just for size. Use classes for size.

**Practice task:** open the site, press **Tab** repeatedly and watch the focus ring move. Can you reach everything without a mouse? Then press F12, click the phone icon (device toolbar), and drag the width from 320 to 1440 to see the layout change.

---

## Phase 7 - Review, performance, bugs

**What was checked:** every section in dark and light, 320 px to 1440 px widths, keyboard order, the mobile menu, links, reduced motion, console errors and the production build.

**Bugs found and fixed**
1. The mobile menu pushed the page down, so tapping a menu link scrolled to the wrong place. Fixed by making the menu an overlay.
2. The "Main focus" line wrapped badly on phones. Fixed by grouping its text.
3. Certificate cards did not line up. Fixed with `flex-1`.
4. The logo tap area was smaller than 44 px. Fixed with padding.
5. The CV button could crowd the navbar at about 1024 px. It is now icon-only between 1024 and 1280 px.

**Concept:** **debugging** = test, find the real cause, fix the cause (not the symptom), test again. (Cause එක හොයලා fix කරනවා.)

**Practice task:** run `npm run lint` and `npm run build`. Both must finish with no errors. Then break something on purpose (delete a `}` in a component), read the error message carefully, and fix it.

---

## Phase 8 - GitHub and deployment

Follow the exact steps in [README.md](README.md): **Upload to GitHub**, then **Host on GitHub Pages** (free, from the same repo). Vercel and Netlify are alternatives.

**Files:** `.github/workflows/deploy.yml` (the robot that builds and publishes your site), `vite.config.js` (`base`), and `assetUrl()` in `src/lib/helpers.js`.

**Concepts**
- **Git commit** = a save point you can return to. **Push** = upload your commits to GitHub. (වැඩේ save point එකක්.)
- **Build** (`npm run build`) turns your React code into plain files in `dist/`. GitHub Pages / Vercel run that command for you.
- **GitHub Actions** = a small robot on GitHub that follows the steps in `deploy.yml` every time you push: install, build, publish.
- **Base path:** on a GitHub project site your page is at `/repo-name/`, not `/`. Vite's `base` setting plus `assetUrl()` make the photo, CV and video links include that prefix, so nothing breaks. (Website එක host වෙන path එක වෙනස් වුණාට link කැඩෙන්නේ නැහැ.)
- **Environment:** you never upload `node_modules`; the host runs `npm ci` itself.

**Practice task:** after you deploy, change one word in `portfolioData.js`, then run `git add .`, `git commit -m "Update text"` and `git push`. Open the **Actions** tab, watch the run turn green, and refresh your live site.

---

## Your learning path (suggested order)

1. `src/data/portfolioData.js` - just text. Change things and watch.
2. `src/components/ui/Badge.jsx` and `Button.jsx` - tiny components with props.
3. `src/components/Skills.jsx` - `map()` and conditional classes.
4. `src/hooks/useTheme.js` - `useState` + `useEffect`.
5. `src/components/Navbar.jsx` - state, events, accessibility.
6. `src/index.css` - variables, themes, keyframes.

When stuck, read the comments in each file. They explain the *why*.
