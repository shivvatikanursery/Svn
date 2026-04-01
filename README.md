# 🌿 SVN Inventory — Shiv Vatika Nursery

**Shiv Vatika Nursery ka complete inventory management app** — Plants, Gamla, Dava, Billing, Reports sab ek jagah.

## 📱 App Install Karen (PWA)

### Android par:
1. Chrome mein open karen: `https://[aapka-username].github.io/[repo-name]/`
2. Browser mein **"Add to Home Screen"** ya **"Install App"** button aayega
3. Install karen — app phone pe install ho jaayega
4. Ab offline bhi kaam karega ✅

### iPhone/iPad par:
1. Safari mein open karen (Chrome nahi)
2. Share button (⬆️) dabao
3. **"Add to Home Screen"** select karen
4. Install ✅

---

## 🚀 GitHub Pages par Host Kaise Karen

### Step 1 — Repository banao
1. GitHub par jaao → **New Repository**
2. Naam do: `svn-inventory` (ya jo chahein)
3. **Public** rakho
4. **Create Repository** click karen

### Step 2 — Files upload karen
In sab files ko repository mein upload karen:

```
📁 Repository
├── index.html          ← Main app file
├── manifest.json       ← PWA manifest
├── service-worker.js   ← Offline support
├── icon-192x192.png    ← App icon (small)
├── icon-512x512.png    ← App icon (large)
├── favicon.ico         ← Browser tab icon
└── README.md           ← Yeh file
```

**Upload karne ka tarika:**
- Repository page par jaao
- **"Add file" → "Upload files"** click karen
- Sab files drag & drop karen
- **"Commit changes"** click karen

### Step 3 — GitHub Pages ON karen
1. Repository → **Settings**
2. Left sidebar mein **"Pages"** click karen
3. **Source:** `Deploy from a branch`
4. **Branch:** `main` → folder: `/ (root)`
5. **Save** click karen
6. 2-3 minute wait karen
7. Link mil jaayega: `https://[username].github.io/[repo-name]/`

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🌱 Plant Inventory | Stock, Price, Alert, Categories |
| 🪴 Gamla Inventory | Size, Type, Color tracking |
| 💊 Dava Inventory | Medicine stock management |
| 🧾 Billing | Bill generate, Print, WhatsApp share |
| 📊 Reports | 25+ report types, Print, PDF |
| 💾 Backup | Download, WhatsApp, Paste restore |
| 🔐 PIN Lock | 4-digit security |
| 🌙 Dark Mode | Eye comfort |
| 🔍 Global Search | Plants + Gamla + Dava ek saath |
| 📅 Calendar | Events, reminders |
| 💸 Kharch | Expense tracking |
| 🥀 Loss Record | Sukhay/tutay items |
| 📱 PWA | Phone pe install, Offline kaam kare |

---

## 💾 Data Storage

- **IndexedDB** — primary storage (fast, large capacity)
- **localStorage** — fallback (agar IDB na mile)
- **Unlimited logs** — koi limit nahi
- Data phone mein safe rehta hai, koi server nahi

---

## 🔄 Backup & Restore

- **Download** — JSON file download karen
- **WhatsApp** — backup share karen
- **Copy** — clipboard mein copy karen
- **Restore** — file ya paste se restore karen

---

*Shiv Vatika Nursery — Lucknow* 🌿
