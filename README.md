# Lavan Lok – landing page

React + Vite + Tailwind CSS + Framer Motion + Lucide icons.

## Run locally
Requires Node.js 18 or newer.
```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Add your photos
The site shows coloured placeholders until real photos exist. Put JPGs in `public/images/` with the names listed in `src/config.js`
(hero, stay, food, music, culture, destination, gallery-salt, gallery-tents, gallery-music, gallery-bonfire, gallery-folk, gallery-food).
Compress them to roughly 200–400 KB each for fast loading.

## Edit details
`src/config.js` holds the WhatsApp number, email, image paths and social links. Add the profile URLs under `SOCIALS` and the icons become live links.

## How enquiries work
- **Register your interest**: validates the form, then opens `wa.me/919549251649` with the message pre-filled. The visitor must press Send in WhatsApp.
- **Register via email**: validates, then opens the visitor's email app addressed to krishansamriya7@gmail.com. The visitor must press Send there.
The page says clearly that nothing is sent until they do. No backend is used and no keys are in the code.

Optional: for submissions that arrive without the visitor pressing Send, create a free form at formspree.io and POST the form values to its endpoint URL (the endpoint ID is public by design, never put secret keys in frontend code).

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New → Project, import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click Deploy.
4. Add your domain under Project → Settings → Domains.
(Alternative: `npm i -g vercel`, then run `vercel` in this folder.)

## Logo
`public/logo.png` is your original, unmodified file. `public/favicon.png` is a 256px downscale of it. The logo has a cream background, so it sits on the cream (#F4EFE6) navigation bar and footer; `mix-blend-multiply` blends the paper tone seamlessly. For a transparent version, supply a PNG with transparency.
