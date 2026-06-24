# Anantha Kumar Gadham — Portfolio

## Folder Structure

```
portfolio/
├── index.html          ← Main HTML file
├── css/style.css       ← All styles
├── js/main.js          ← Animations + EmailJS contact form
├── images/profile.svg  ← PLACEHOLDER — replace with your real photo
└── README.md
```

---

## ✉️ How to make the contact form send real emails (FREE — 5 min setup)

### Step 1 — Sign up at EmailJS
Go to https://emailjs.com → click **Sign Up** → use your Gmail (ananthgadham@gmail.com)

### Step 2 — Connect your Gmail
- Dashboard → **Email Services** → **Add New Service**
- Choose **Gmail** → connect your Gmail account
- Copy the **Service ID** (looks like: `service_xxxxxxx`)

### Step 3 — Create an email template
- Dashboard → **Email Templates** → **Create New Template**
- Set **To Email**: `ananthgadham@gmail.com`
- Set **Subject**: `New portfolio message from {{from_name}}`
- Set **Body**:
  ```
  Name: {{from_name}}
  Email: {{from_email}}

  Message:
  {{message}}
  ```
- Click **Save** → copy the **Template ID** (looks like: `template_xxxxxxx`)

### Step 4 — Get your Public Key
- Top right → **Account** → **API Keys**
- Copy your **Public Key** (looks like: `aBcDeFgHiJkLmNoPq`)

### Step 5 — Paste into js/main.js
Open `js/main.js` and replace lines 10–12:
```js
const EMAILJS_PUBLIC_KEY  = 'aBcDeFgHiJkLmNoPq';   // ← your public key
const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';        // ← your service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';       // ← your template ID
```

That's it! The form will now deliver emails directly to your Gmail inbox.
Free plan allows 200 emails/month.

---

## 🖼️ How to add your real photo

1. Name your photo `profile.jpg`
2. Drop it inside the `images/` folder
3. In `index.html` change:
   ```html
   <img src="images/profile.svg" .../>
   ```
   to:
   ```html
   <img src="images/profile.jpg" .../>
   ```

---

## 🚀 Deploy for free

- **Vercel**: drag & drop the `portfolio/` folder at vercel.com
- **Netlify**: drag & drop at netlify.com/drop
- **GitHub Pages**: push to repo → Settings → Pages → enable
