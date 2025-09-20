# Mini Project Dumbways

Mini-project ini dibuat sebagai proyek latihan Full Stack menggunakan **React.js** untuk frontend dan **Node.js + Express + Supabase** untuk backend. Project ini merupakan mini version dari platform “Support Creator”, di mana **Fans** bisa memberikan support ke **Creators** dan melihat histori support mereka.

---

## 🔹 Fitur

### Frontend

* Login & Register dummy (OTP console)
* Dashboard untuk Fan & Creator
* Fans dapat melihat daftar creators dan melakukan support
* Histori support realtime untuk Fans & saldo tip realtime untuk Creators (via Socket.io)
* AI caption untuk posting (call eksternal sekali)
* Routing SPA menggunakan React Router
* Responsif dan UI modern dengan Tailwind CSS

### Backend

* **Express.js API** untuk auth, creators, supports, balance, dan AI caption
* **Supabase** sebagai database (users, supports, posts, balances)
* Endpoint utama:

  * `POST /auth/register` → register user
  * `POST /auth/login` → login user
  * `GET /auth/users` → fetch semua users
  * `GET /creators` → fetch semua creator
  * `GET /creators/:id/posts` → fetch posting creator
  * `POST /supports` → create support
  * `GET /supports/:fanId` → fetch histori support fan
  * `GET /supports` → fetch semua histori support
  * `GET /balance/:userId` → fetch saldo user

### Socket.io

* Realtime update balance untuk Creator
* Notifikasi support baru untuk Creator

---

## 🔹 Struktur Folder

### Backend (`/backend/src`)

```
src/
├─ api/
│   └─ api.js              # konfigurasi axios
├─ routes/
│   ├─ authRoutes.js
│   ├─ creatorRoutes.js
│   ├─ balanceRoutes.js
│   ├─ supportRoutes.js
│   └─ aiRoutes.js
├─ server.js               # main server
└─ ...
```

### Frontend (`/frontend/src`)

```
src/
├─ api/
│   └─ api.js              # axios instance
├─ components/
│   ├─ Auth/
│   │   ├─ Login.jsx
│   │   └─ Register.jsx
│   ├─ Navigation/
│   │   └─ Navbar.jsx
│   └─ SupportForm.jsx
├─ pages/
│   ├─ CreatorPage.jsx
│   ├─ SupporterPage.jsx
│   └─ Dashboard.jsx
├─ store/
│   ├─ slices/
│   │   ├─ authSlice.js
│   │   ├─ creatorSlice.js
│   │   ├─ supportSlice.js
│   │   └─ socketSlice.js
│   └─ index.js
├─ __tests__/              # semua unit test
└─ main.jsx
```

---

## 🔹 Instalasi & Menjalankan Project

### Backend

1. Masuk ke folder backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan server:

```bash
npm run dev
```

> Server default berjalan di `http://localhost:5000`

### Frontend

1. Masuk ke folder frontend:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan development server:

```bash
npm start
```

> Aplikasi React berjalan di `http://localhost:5173` (Vite default)

### Testing

* Untuk menjalankan semua unit test:

```bash
npm test
```

* Meliputi:

  * Slice: `authSlice`, `creatorSlice`, `supportSlice`, `socketSlice`
  * Component: `Login`, `Register`

---

## 🔹 Teknologi

* Frontend: **React.js, Redux Toolkit, React Router, Tailwind CSS, React Testing Library, Jest**
* Backend: **Node.js, Express.js, Supabase, Axios, Socket.io**
* Testing: **Jest, Redux Mock Store, React Testing Library**

---

## 🔹 Notes

* OTP login & register hanya simulasi, muncul di console
* Midtrans / payment gateway menggunakan sandbox untuk testing
* Socket.io digunakan untuk update realtime balance dan notifikasi
* Struktur slice sudah mengikuti **Redux Toolkit best practice**

