# 🔗 Afuwape Tunde — URL Shortener

A fast, secure, and minimal URL shortener built with modern web technologies.  
Designed for reliability, simplicity, and real-world production use.

> Shorten links. Share confidently.

---

## 🚀 Features

- ⚡ Instant URL shortening
- 🔒 Secure redirects
- 🧠 Clean, maintainable architecture
- 🌍 Production-ready deployment
- 📈 Scalable design
- 🧩 API-first approach

---

## 🛠️ Tech Stack

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="40" />
</p>

---

## 📂 Project Structure

```bash
.
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── utils/
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
BASE_URL=https://short.afuwapetunde.com
```

### 4. Build the project

```bash
npm run build
```

### 5. Run the server

```bash
npm start
```

---

## 📡 API Usage

### Shorten a URL

```http
POST /shorten
```

**Request Body**

```json
{
  "url": "https://example.com/very-long-url"
}
```

**Response**

```json
{
  "shortUrl": "https://shortener.afuwapetunde.com/abc123"
}
```

---

## 👤 Author

**Afuwape Tunde**  
Full-Stack Developer

- 🌐 https://afuwapetunde.com
- 🐙 https://github.com/your-github-handle
- 💼 https://linkedin.com/in/your-linkedin
- ✉️ youremail@example.com

---

## 📄 License

MIT License
