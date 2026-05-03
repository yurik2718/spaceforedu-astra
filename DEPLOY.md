# Deploy Guide — Hostinger VPS
**Project:** Space for Edu (spaceforedu.com)
**Stack:** Astro static site → Nginx → Let's Encrypt SSL → GitHub Actions CI/CD
**VPS:** Hostinger (Ubuntu 22.04 LTS assumed)

---

## What you will end up with

- Nginx serving the static `dist/` folder on the VPS
- Free SSL certificate via Let's Encrypt (auto-renewing)
- GitHub Actions: every push to `main` → builds the site → deploys to VPS automatically
- Root redirect `/` → `/es/` handled by Nginx
- Security headers, caching, and 404 page — all configured in Nginx

**Your active time: ~60 minutes**

---

## Prerequisites

Before starting, confirm:
- [ ] Hostinger VPS is running Ubuntu 22.04
- [ ] You have root or sudo SSH access to the VPS
- [ ] You know the VPS IP address (find it in Hostinger hPanel → VPS)
- [ ] Domain DNS A record points to your VPS IP (set in your domain registrar or Hostinger hPanel)
- [ ] GitHub repo `yurik2718/spaceforedu-astra` is accessible

---

## Phase A — Connect to VPS

From your terminal:

```bash
ssh root@YOUR_VPS_IP
```

If Hostinger gave you a password, use it. Then immediately change it:

```bash
passwd
```

Create a deploy user (safer than deploying as root):

```bash
adduser deploy
usermod -aG sudo deploy
```

Switch to the deploy user for the rest of setup:

```bash
su - deploy
```

---

## Phase B — Install Nginx and Node.js

```bash
sudo apt update && sudo apt upgrade -y

# Nginx
sudo apt install -y nginx

# Node.js 20 (for building on VPS if needed, also used by GitHub Actions)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Verify
nginx -v
node -v
npm -v
```

---

## Phase C — Create site directory

```bash
sudo mkdir -p /var/www/spaceforedu/dist
sudo chown -R deploy:deploy /var/www/spaceforedu
```

This is where GitHub Actions will upload the built `dist/` folder.

---

## Phase D — Configure Nginx

Create the Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/spaceforedu
```

Paste the following (replace `spaceforedu.com` with your actual domain):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name spaceforedu.com www.spaceforedu.com;

    # Certbot will modify this block for SSL — leave as-is for now
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name spaceforedu.com www.spaceforedu.com;

    root /var/www/spaceforedu/dist;
    index index.html;

    # Root redirect → default locale
    location = / {
        return 301 /es/;
    }

    # Serve static files; fall back to .html extension then 404
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Error page
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Security headers (replaces Cloudflare _headers file)
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), interest-cohort=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'" always;

    # Cache hashed Astro assets forever (filenames include content hash)
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable" always;
    }

    # Cache images for 30 days
    location /images/ {
        expires 30d;
        add_header Cache-Control "public" always;
    }

    # Cache manifest
    location ~* \.webmanifest$ {
        expires 7d;
        add_header Cache-Control "public" always;
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1024;

    # SSL — Certbot will add certificate lines here in Phase E
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/spaceforedu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Phase E — SSL Certificate (Let's Encrypt)

> DNS A record must be pointing to your VPS IP before this step works.

```bash
sudo certbot --nginx -d spaceforedu.com -d www.spaceforedu.com
```

Certbot will:
1. Ask for your email (for expiry notices)
2. Ask to agree to terms
3. Automatically modify your Nginx config to add SSL
4. Set up auto-renewal

Test auto-renewal:

```bash
sudo certbot renew --dry-run
```

Visit `https://spaceforedu.com` — you should see a blank page (no `dist/` yet, that comes in Phase G).

---

## Phase F — GitHub Actions: Auto-Deploy on Push

Every push to `main` will: build the site with env vars → rsync `dist/` to VPS → site updates in ~2 minutes.

### Step 1: Generate SSH key for GitHub Actions

On your **local machine** (not VPS):

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/spaceforedu_deploy
```

This creates two files:
- `~/.ssh/spaceforedu_deploy` — private key (goes into GitHub)
- `~/.ssh/spaceforedu_deploy.pub` — public key (goes onto VPS)

### Step 2: Add public key to VPS

Copy the public key content:

```bash
cat ~/.ssh/spaceforedu_deploy.pub
```

On the VPS, logged in as `deploy`:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste the public key on a new line, save
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

Test from local machine:

```bash
ssh -i ~/.ssh/spaceforedu_deploy deploy@YOUR_VPS_IP
```

It should log in without a password.

### Step 3: Add secrets to GitHub

Go to `github.com/yurik2718/spaceforedu-astra/settings/secrets/actions` → **New repository secret** — add all five:

| Secret name | Value |
|---|---|
| `VPS_HOST` | Your VPS IP address |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | Contents of `~/.ssh/spaceforedu_deploy` (the private key, starts with `-----BEGIN`) |
| `PUBLIC_CONTACT_WHATSAPP` | WhatsApp number, digits only, no `+` (e.g. `34663689393`) |
| `PUBLIC_CONTACT_EMAIL` | Contact email (e.g. `hola@spaceforedu.com`) |

`PUBLIC_SITE_URL` is hardcoded as `https://spaceforedu.com` in the workflow below.

### Step 4: Create GitHub Actions workflow

On your **local machine**, inside the project:

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        env:
          PUBLIC_CONTACT_WHATSAPP: ${{ secrets.PUBLIC_CONTACT_WHATSAPP }}
          PUBLIC_CONTACT_EMAIL: ${{ secrets.PUBLIC_CONTACT_EMAIL }}
          PUBLIC_SITE_URL: https://spaceforedu.com
        run: npm run build

      - name: Deploy to VPS
        uses: burnett01/rsync-deployments@7.0.1
        with:
          switches: -avz --delete --checksum
          path: dist/
          remote_path: /var/www/spaceforedu/dist/
          remote_host: ${{ secrets.VPS_HOST }}
          remote_user: ${{ secrets.VPS_USER }}
          remote_key: ${{ secrets.VPS_SSH_KEY }}

      - name: Reload Nginx
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: sudo nginx -s reload
```

Allow `deploy` user to reload Nginx without password prompt:

```bash
# On VPS
echo "deploy ALL=(ALL) NOPASSWD: /usr/sbin/nginx" | sudo tee /etc/sudoers.d/deploy-nginx
```

---

## Phase G — First Deploy

Commit and push the workflow file:

```bash
git add .github/workflows/deploy.yml
git commit -m "add VPS deploy workflow"
git push origin main
```

Watch the action run:
- Go to `github.com/yurik2718/spaceforedu-astra/actions`
- Click the running workflow
- All steps should be green in ~2 minutes

Then visit `https://spaceforedu.com` — the site should be live.

---

## Phase H — Fill in real content

### Contact variables
Already set as GitHub secrets. They are baked into the build automatically.

### Legal notice (required by Spanish law LSSI-CE)

Edit these three files and fill in the `provider_body` placeholder with real company details:

```
src/lib/i18n/es.json
src/lib/i18n/en.json
src/lib/i18n/ru.json
```

Then push to `main` — GitHub Actions redeploys automatically.

---

## Nginx: remove Cloudflare-specific files

The `_redirects` and `_headers` files in `public/` were for Cloudflare Pages. On Nginx they are served as static files (harmless but unused). You can leave them or delete from `public/`. The actual redirects and headers are now handled by the Nginx config above.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| GitHub Action fails at rsync | Check `VPS_SSH_KEY` secret — must include full key including `-----BEGIN` and `-----END` lines |
| Site loads but shows blank page | Check `dist/` was uploaded: `ls /var/www/spaceforedu/dist/` on VPS |
| SSL certificate error | DNS A record must point to VPS IP. Run `dig spaceforedu.com` to verify |
| 404 on all pages | Nginx `root` path wrong. Verify: `ls /var/www/spaceforedu/dist/es/` should list `index.html` |
| WhatsApp button does nothing | `PUBLIC_CONTACT_WHATSAPP` secret is wrong. Update in GitHub Secrets → push any change to trigger redeploy |
| Nginx config error on reload | Run `sudo nginx -t` on VPS — it will show the exact line with the error |
| Certbot fails | Port 80 must be open. Check Hostinger firewall in hPanel → VPS → Firewall |

---

## Pre-launch checklist

- [ ] SSH access works as `deploy` user (not root)
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] SSL certificate issued: `https://spaceforedu.com` shows padlock
- [ ] All 5 GitHub secrets set correctly
- [ ] GitHub Action ran successfully (all steps green)
- [ ] `https://spaceforedu.com` redirects to `https://spaceforedu.com/es/`
- [ ] WhatsApp button opens chat with real number
- [ ] Footer shows real email address
- [ ] `/es/aviso-legal/` shows real company details (not placeholder)
- [ ] `https://spaceforedu.com/sitemap-index.xml` loads
- [ ] `https://spaceforedu.com/robots.txt` loads
- [ ] `https://spaceforedu.com/llms.txt` loads

---

## Ongoing maintenance

| Task | How |
|---|---|
| Deploy new code | Push to `main` — auto-deploys in ~2 min |
| Update env variables | Edit GitHub Secrets → push any commit to trigger rebuild |
| Renew SSL | Automatic (Certbot cron). Check with `sudo certbot renew --dry-run` |
| View Nginx logs | `sudo tail -f /var/log/nginx/access.log` |
| View Nginx errors | `sudo tail -f /var/log/nginx/error.log` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Check disk space | `df -h` |

---

## Summary timeline

| Phase | Active time |
|---|---|
| A. SSH + create deploy user | 5 min |
| B. Install Nginx + Node.js + Certbot | 5 min |
| C. Create site directory | 2 min |
| D. Configure Nginx | 10 min |
| E. SSL certificate | 5 min |
| F. GitHub Actions setup | 20 min |
| G. First deploy | 5 min |
| H. Fill real content | 15 min |
| **Total** | **~60 min** |
