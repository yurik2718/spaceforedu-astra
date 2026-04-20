# Deploying SpaceForEdu — Owner Setup Guide

A step-by-step walkthrough to get the site live on your own infrastructure. After this you own hosting, DNS, domain and all contact data. I keep the GitHub repo on my account (public) and you're an Admin collaborator — full push/merge/settings rights, same as me.

**Your attention time: ~40 minutes, spread across the phases below.**
Plus up to 24 hours of passive waiting for DNS propagation (runs in the background — you don't need to watch).

## What you'll end up with

- Admin access to the GitHub repo `github.com/yurik2718/spaceforedu-astra` (public). You can clone, push, merge, change settings.
- A Cloudflare account you own — hosting, DNS, CDN, SSL. Free tier, $0/mo.
- Your existing domain pointed at Cloudflare.
- Cloudflare Pages auto-deploying every push to `main`.

---

## Phase A — GitHub access (5 min)

The repo stays on my account as a public open-source project. You get **Admin** rights on it — the same permissions I have — so you can push code, merge pull requests, change repo settings, and (critically for Phase D) authorize Cloudflare to install deploy webhooks.

1. Open GitHub on your Mac. Sign in or create an account. Enable 2FA under **Settings → Password and authentication**.
2. Send me your GitHub username via WhatsApp.
3. I add you at `github.com/yurik2718/spaceforedu-astra/settings/access` with the **Admin** role.
4. You'll get an email from GitHub titled *"@yurik2718 invited you to collaborate"*. Click **View invitation → Accept invitation**.

After accepting, the repo shows up in your GitHub left sidebar and you can clone it normally:

```bash
git clone https://github.com/yurik2718/spaceforedu-astra.git
```

You now have the same permissions as me on this repo.

---

## Phase B — Cloudflare account (3 min)

1. Go to https://dash.cloudflare.com/sign-up
2. Register with a long-term email you control — ideally `admin@<your-domain>` or your main work address, not a personal Gmail you might lose.
3. **Enable 2FA immediately**: **My Profile → Authentication → Two-Factor Authentication**. Use 1Password or Apple Passwords on your Mac to save the backup codes.

---

## Phase C — Point your domain at Cloudflare (15 min active, up to 24 h passive)

1. Cloudflare dashboard → **+ Add a site** → enter your domain (e.g. `spaceforedu.com`) → pick the **Free** plan.
2. Cloudflare scans your existing DNS records. **Review them carefully** — if you use this domain for email (Google Workspace, etc.), you should see your MX records here. Confirm nothing is missing, then continue.
3. Cloudflare shows you **two nameservers** — something like:
   ```
   aliza.ns.cloudflare.com
   sam.ns.cloudflare.com
   ```
   Keep this tab open.
4. In a new tab, log into the registrar where you bought the domain (GoDaddy, Namecheap, Gandi, whoever). Find **DNS / Nameservers** for your domain and **replace the existing nameservers with the two Cloudflare gave you**. Save.
5. Back in Cloudflare, click **Check nameservers**. Propagation usually finishes in under an hour but can take up to 24. Cloudflare emails you when it's ready.

While waiting, continue with Phase D — it doesn't depend on DNS.

> **Safety note:** changing nameservers transfers *DNS management* to Cloudflare. Your email (if any) keeps working because the MX records get migrated over. Domain registration itself stays at your current registrar.

---

## Phase D — Deploy the site (5 min)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Click **Connect GitHub**. In the GitHub authorization screen, pick **"Only select repositories"** → choose `yurik2718/spaceforedu-astra`. (You need the Admin invite from Phase A to be accepted, otherwise GitHub won't offer this repo.)
3. Select the repo → **Begin setup**.
4. Fill in the build config:

   | Field | Value |
   | --- | --- |
   | Project name | `spaceforedu` |
   | Production branch | `main` |
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave empty)* |

5. Expand **Environment variables (advanced)** and add all three. Apply each to **Production** *and* **Preview**:

   | Variable | Value | Example |
   | --- | --- | --- |
   | `PUBLIC_CONTACT_WHATSAPP` | WhatsApp number, digits only, with country code, no `+` or spaces | `34663689393` |
   | `PUBLIC_CONTACT_EMAIL` | Contact email on your domain | `hola@spaceforedu.com` |
   | `PUBLIC_SITE_URL` | Full site URL, no trailing slash | `https://spaceforedu.com` |

6. **Save and Deploy**. First build runs in ~1–2 minutes. When green, your site is live at `https://spaceforedu.pages.dev`. Open it — you should see the Spanish home page.

---

## Phase E — Attach your real domain (2 min, after Phase C finishes)

Only do this once Cloudflare has confirmed your nameservers are active (you'll get an email).

1. Open your Pages project → **Custom domains → Set up a custom domain**.
2. Enter `spaceforedu.com` → **Continue → Activate domain**. Cloudflare creates the CNAME automatically.
3. Repeat for `www.spaceforedu.com` (it will redirect to the apex).
4. SSL certificate is issued automatically — wait 5–15 minutes, then visit `https://spaceforedu.com`.

---

## Phase F — Invite me to Cloudflare (2 min)

So I can push env-var changes, roll back bad deploys, and debug production without pinging you:

1. Cloudflare dashboard → **Manage Account → Members → Invite**.
2. Enter the email I'll give you.
3. Role: **Administrator** (simplest) or **Pages Admin** (narrower — just deployments).
4. I accept the invitation. From then on I handle code *and* infrastructure.

You can revoke my access from this page any time.

> GitHub is already set up: you're Admin on my repo, which is enough for Cloudflare to keep auto-deploying regardless of who pushes.

---

## Phase G — Fill in the remaining content (15 min, can be done later)

Two things must have real values before showing the site to clients or running Meta/Google ads:

### 1. Contact variables — done in Phase D

If you put real values there already, you're set. If you used placeholders, update them now in **Pages project → Settings → Environment variables**, then **Deployments → Retry build** to push the change live.

### 2. Legal notice (`Aviso Legal`)

Spanish law (LSSI-CE Art. 10) requires your company details on the site. They live in three translation files:

```
src/lib/i18n/es.json
src/lib/i18n/en.json
src/lib/i18n/ru.json
```

In each, find the `legal_notice` block and replace the `provider_body` placeholder with your real data — company name, CIF/NIF, registered address, Registro Mercantil entry (if applicable).

**If you'd rather I do it:** send me the legal details (company name, CIF/NIF, registered address, registry entry) by WhatsApp. I'll commit the change, Cloudflare auto-deploys.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Build fails in Cloudflare | Open the deployment → view log. Usually a missing env variable or wrong branch name. |
| `spaceforedu.com` doesn't load after DNS change | DNS can take up to 24 h. Flush Mac DNS cache: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`. Or test from your phone on mobile data. |
| WhatsApp button does nothing | `PUBLIC_CONTACT_WHATSAPP` is empty or has non-digits. Fix in **Pages project → Settings → Environment variables**, then **Deployments → Retry build**. |
| SSL warning on `www.` | Give it 15 min after attaching the custom domain — certificate issuance is async. |
| Email stopped working after nameserver change | Check **Cloudflare → DNS → Records** — your MX records should be there. If missing, add them from your old registrar's records. |

---

## Pre-launch checklist

Before you tell the world about the site or turn on paid ads:

- [ ] GitHub invite accepted; you can see `yurik2718/spaceforedu-astra` in your repo list.
- [ ] Cloudflare account is yours; 2FA on; I'm invited as team member.
- [ ] Domain nameservers point to Cloudflare (confirmed email received).
- [ ] `spaceforedu.pages.dev` loads the site.
- [ ] `https://spaceforedu.com` loads the site over HTTPS with a valid certificate.
- [ ] WhatsApp button on the live site opens a chat with **your real number**.
- [ ] Footer email is **your real address**.
- [ ] `/es/aviso-legal/` shows your real company details (not the placeholder about "datos en proceso de actualización").
- [ ] `https://spaceforedu.com/sitemap-index.xml` and `/robots.txt` both load.

---

## Summary timeline

| Phase | Active time | Waiting |
| --- | --- | --- |
| A. GitHub access | 5 min | — |
| B. Cloudflare account | 3 min | — |
| C. Nameservers | 15 min | up to 24 h (background) |
| D. Pages deploy | 5 min | — |
| E. Custom domain | 2 min | 5–15 min for SSL |
| F. Invite me to Cloudflare | 2 min | — |
| G. Legal + contacts | 15 min *(or hand it to me)* | — |
| **Total** | **~45 min of your attention** | |

You can stop after Phase F — Phase G can wait until you have your legal paperwork. Ping me on any step where you'd rather I take over.
