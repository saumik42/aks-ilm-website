# AKS Ilm — Islamic Trivia & Learning

Complete static website, prepared for GitHub Pages. No installation or build command is needed.

## First publication

1. Create a GitHub repository called `aks-ilm-website`. Choose Public for GitHub Pages on GitHub Free. The website source will be visible to others. Do not add a licence: none has been selected for this project.
2. Extract the ZIP on your computer. Open the extracted folder, then upload its **contents**, including the `assets` folder, to the repository. `index.html` must be at the repository root, not inside another folder. Upload the extracted files, not the ZIP itself.
3. Commit the upload to the default branch (normally `main`).
4. In the repository, open Settings → Pages. Choose Deploy from a branch, select `main` and `/(root)`, then Save.
5. Wait for publication. Use the exact website link shown in Settings → Pages.
6. Check the homepage on your phone, all three quiz modes, question Library, terms, reminders, smile celebration, Prophets, Islamic Places and Kaʿbah map.
7. Connect `www.aksilm.org` only after these checks. Leave the domain and current Google Site unchanged until then.

The portable links support both a GitHub project address and your own domain. The private ChatGPT preview is a separate copy; it will not automatically synchronise with this GitHub repository. Once published here, treat this repository as the main version.

## What to edit

| Content | File |
| --- | --- |
| Trivia questions and answers | `questions.js` |
| Terms and beneficial reminders | `learning-data.js` |
| Homepage text and layout | `index.html` |
| About page | `about.html` |
| Prophets content and feature | `prophets.html` |
| Islamic Places content and map | `places.html` |
| Kaʿbah feature | `kabah.html` |
| Smile interaction | `smile.js` (appearance is in `index.html`) |
| Navigation appearance on subpages | `shared.css` |
| Logo | `assets/aks-ilm-logo.png` |

## Adding a trivia question

Both the random quiz and Library read `questions.js`. The homepage count also updates from this collection.

Each entry follows this order:

```js
[number, "Question text", "Option A", "Option B", "Option C", "Option D", "B"]
```

The last value is the correct option letter, A–D. Add a comma after the previous entry and insert the next question before the final `];`. Use the next unused question number. The current collection ends at 262, so the next question is 263. Keep numbers sequential, because the quiz displays them for correction reports.

Use `\"` for a quotation mark inside a double-quoted string. Do not add invented references; the Library currently provides answers, without a reference field.

After committing, wait for GitHub Pages to finish publishing. Open the Library's final range and check the new question and answer. Check the homepage count too. You do not need to edit the quiz and Library separately.

## Terms and reminders

`learning-data.js` has two collections: `terms` and `benefits`.

A term entry contains: transliterated name, Arabic name, meaning, simple explanation, and reference/explanation.

A reminder is an object with `text` and `source`, plus optional `arabic` and `note` fields. Copy an existing object and replace its values, preserving braces, quotation marks and commas. Verify the source before publishing. Rotate through the feature to check your addition.

## Editing on GitHub

Open the file, choose the pencil/Edit action, make your change and commit it. Keep a meaningful commit message such as "Add trivia question 263". GitHub Pages republishes after a commit to the configured publishing branch. If changes do not appear, check Actions for the publication status, then refresh the page.

For a substantial redesign, use a separate branch and review the changes before merging. For a mistake, use file history to retrieve the earlier contents and commit the correction. Keep a downloaded backup before major updates.

## Dates and maps

The Islamic calendar in `index.html` uses the approved 2026 month-start table, then an estimated browser calendar outside the table. To keep future dates aligned to your preferred local calendar, update that table with verified month starts; do not treat the fallback as local moon-sighting confirmation.

The maps still rely on external mapping, imagery and city-search services. `world.geojson` is the local world outline used by the Kaʿbah feature. Keep it in the repository.

## Domain switch, later

Set your custom domain in GitHub Pages before changing DNS at your domain provider. Use GitHub's current instructions and the records appropriate to your provider. Preserve email-related DNS records. Domain verification, HTTPS and both `aksilm.org` and `www.aksilm.org` must be checked before announcing the replacement.

Useful official guidance:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Copyright and third-party material

© 2026 AKS Ilm · Est. 2025. Copyright notices are included in page footers. No open-source licence is granted by this package. Qur’an/Hadith excerpts, external images and third-party map resources retain their applicable source rights and attribution. The Natural Earth world outline is public-domain data.
