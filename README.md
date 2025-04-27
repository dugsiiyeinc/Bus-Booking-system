🚌 Bus Booking System
Bus Booking System waa web application casri ah oo kuu oggolaanaya in aad raadiso, jadwal ka eegi karto, una qabsan karto safarada basaska si fudud. Waxaa la dhisay iyadoo la adeegsanayo React frontend iyo Supabase backend ahaan.

✨ Features
✅ Isdiiwaangelin iyo Login (Authentication)

✅ Raadinta Jadwalka Baska (Search Routes & Schedules)

✅ Booking Tigidhada Safarka

✅ Maareynta Jadwalka (Admin Panel)

✅ Soo saarista Rasiidh (PDF / Printable Receipt) marka Booking la dhammeeyo

🛠️ Teknolojiyada la Isticmaalay
⚛️ React — Frontend Framework

🛢️ Supabase — Backend (Database + Authentication)

🎨 TailwindCSS (haddii aad isticmaashay)

🛠️ Vite — Development Build Tool

📦 Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/bus-booking-system.git
cd bus-booking-system
Install dependencies:

bash
Copy
Edit
npm install
Create .env file oo geli keys ka Supabase:

bash
Copy
Edit
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
Run Development Server:

bash
Copy
Edit
npm run dev
App-ka ka fur browser ka:

arduino
Copy
Edit
http://localhost:5173
🛤️ Database Tables Overview

Table Name	Description
Users	Isticmaalayaasha diiwaangashan
Buses	Xogta basaska (Magac, Number Plate, Capacity)
Routes	Goobaha laga raaco iyo loo socdo
Schedules	Jadwalka safarada (Route + Bus + Time)
Bookings	Qabsashada tigidhada safarka