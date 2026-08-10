# PROGRAM BARBERSHOP

Aplikasi kasir barbershop dummy yang responsive untuk mobile dan desktop. Dibuat dengan HTML, CSS, dan JavaScript murni tanpa database.

## 🚀 Fitur Utama

### 1. Halaman Kasir (POS)
- ✅ Input layanan: potong rambut, cuci, creambath, styling, fade cut, beard trim
- ✅ Input produk tambahan: pomade, shampoo, hair gel, hair spray, conditioner, hair oil
- ✅ Pilih barber: Budi, Andi, Rian
- ✅ Input jumlah dengan tombol +/- dan input manual
- ✅ Harga otomatis terhitung
- ✅ Diskon manual (Rp / %)
- ✅ Total transaksi otomatis
- ✅ Tombol cetak struk dengan preview modal
- ✅ Tombol simpan dengan alert dummy

### 2. Halaman Database Pelanggan (CRM)
- ✅ Tabel pelanggan dengan data dummy
- ✅ Form tambah pelanggan dengan modal
- ✅ Tombol follow-up dengan pesan WhatsApp otomatis
- ✅ Tombol edit pelanggan
- ✅ Data hilang saat refresh (dummy)

### 3. Halaman Laporan (Analitik)
- ✅ Chart omzet harian dengan Chart.js
- ✅ Chart pelanggan per barber (doughnut)
- ✅ Chart produk terlaris (bar)
- ✅ Ringkasan harian: transaksi, omzet, pelanggan baru, produk terjual

### 4. Halaman Loyalty & Promo
- ✅ Daftar pelanggan dengan poin dan status (Regular/Loyalty/VIP)
- ✅ Tombol kirim promo dengan pesan WhatsApp otomatis
- ✅ 3 jenis promo: ulang tahun, loyalty reward, musiman
- ✅ Sistem poin dummy (10 poin per kunjungan)

## 📱 Responsive Design

### Mobile (≤768px)
- Navigasi bottom tab seperti aplikasi Flutter
- UI compact dan mudah digunakan
- Kartu layanan dan produk yang touch-friendly
- Tabel responsive dengan scroll horizontal

### Desktop (>768px)
- Dashboard modern dengan sidebar navigation
- Layout grid yang rapi
- Hover effects dan animasi smooth
- UI yang keren untuk anak muda

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Menggunakan gradient modern
- **Card-based Design**: Semua konten dalam card yang elegan
- **Smooth Animations**: Hover effects dan transitions
- **Color Coding**: Warna berbeda untuk setiap kategori
- **Icons**: Font Awesome icons untuk visual appeal
- **Typography**: Font modern dan readable

## 🛠️ Teknologi

- **HTML5**: Struktur semantik
- **CSS3**: Flexbox, Grid, Animations, Media Queries
- **JavaScript ES6+**: Modern JavaScript features
- **Bootstrap 5**: Framework CSS untuk responsive
- **Chart.js**: Library untuk chart dan grafik
- **Font Awesome**: Icon library

## 📁 Struktur File

```
PROGRAM BARBERSHOP/
├── index.html          # File HTML utama
├── styles.css          # Custom CSS
├── script.js           # JavaScript aplikasi
└── README.md           # Dokumentasi
```

## 🚀 Cara Menjalankan

1. Download semua file ke folder `public_html` di hosting shared
2. Buka `index.html` di browser
3. Aplikasi siap digunakan!

## 📋 Data Dummy

Aplikasi sudah dilengkapi dengan data dummy:
- 6 layanan barbershop
- 6 produk tambahan
- 5 pelanggan dummy
- 3 transaksi dummy
- Data loyalty dan poin

## 🔧 Customization

### Menambah Layanan/Produk
Edit array `services` dan `products` di `script.js`:

```javascript
const services = [
    { id: 1, name: 'Nama Layanan', price: 25000, category: 'service' },
    // tambahkan layanan baru
];
```

### Mengubah Data Pelanggan
Edit array `customers` di fungsi `initializeDummyData()`:

```javascript
customers = [
    {
        id: 1,
        name: 'Nama Pelanggan',
        phone: '081234567890',
        barber: 'Budi',
        lastService: 'Potong Rambut',
        lastVisit: '2024-01-15',
        visits: 5
    },
    // tambahkan pelanggan baru
];
```

### Mengubah Warna Tema
Edit CSS variables di `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #27ae60;
    /* ubah warna sesuai kebutuhan */
}
```

## 📱 Mobile Features

- Bottom navigation dengan icon dan label
- Touch-friendly buttons dan inputs
- Compact layout untuk layar kecil
- Swipe gestures support
- Responsive tables dengan horizontal scroll

## 🖥️ Desktop Features

- Top navigation bar
- Sidebar layout
- Hover effects dan animations
- Grid layout untuk optimal space usage
- Professional dashboard look

## 🎯 Demo Features

- **Cetak Struk**: Modal preview dengan format struk
- **WhatsApp Integration**: Link langsung ke WhatsApp dengan pesan otomatis
- **Real-time Calculation**: Total otomatis update
- **Visual Feedback**: Animasi saat klik/tambah item
- **Data Persistence**: Data tersimpan di memory (hilang saat refresh)

## 🔮 Future Enhancements

- Local Storage untuk persist data
- Export laporan ke PDF
- Notifikasi real-time
- Multi-language support
- Dark mode toggle
- Print receipt functionality

## 📞 Support

Aplikasi ini dibuat untuk demo/tampilan. Tidak ada koneksi database atau server yang diperlukan. Semua data dummy dan akan hilang saat refresh halaman.

---

**PROGRAM BARBERSHOP** - Aplikasi Kasir Barbershop Responsive
Dibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript
