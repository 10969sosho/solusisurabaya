# PT Dara Boga Nusantara - Company Profile

## 🌾 Overview

Modern, responsive company profile for PT Dara Boga Nusantara dengan dengan animasi AOS (Animate On Scroll) yang menarik. Company profile ini dibuat dengan teknologi HTML, CSS, dan JavaScript.

## ✨ Features

- **Fully Responsive Design**: Tampilan yang responsif untuk semua ukuran perangkat (desktop, tablet, dan mobile)
- **Animate On Scroll (AOS)**: Animasi saat melakukan scroll untuk memberikan pengalaman visual yang menarik
- **Modern UI Design**: Desain modern dengan warna dan layout yang sesuai dengan tema agribisnis
- **Interactive Elements**: Counter animation, smooth scrolling, dan form interaktif
- **Optimized Images**: Gambar dalam format WebP yang dioptimalkan untuk performa yang baik dan ukuran file yang lebih kecil

## 🚀 How to Use

1. Buka file `index.html` di browser Anda untuk melihat company profile
2. Untuk melakukan perubahan, Anda dapat:
   - Edit file `index.html` untuk mengubah struktur dan konten
   - Edit file `styles.css` untuk mengubah tampilan dan gaya
   - Edit file `script.js` untuk mengubah fungsi dan interaksi

## 📁 File Structure

```
PT DARA BOGA NUSANTARA/
├── index.html              # File HTML utama
├── styles.css              # File CSS untuk styling
├── script.js               # File JavaScript untuk interaktivitas
├── image-cropper.html      # Tool untuk crop dan konversi gambar ke WebP
├── cropper-styles.css      # CSS untuk image cropper tool
├── cropper-script.js       # JavaScript untuk image cropper tool
├── README.md               # Dokumentasi
└── images/                 # Folder untuk gambar (format WebP)
    ├── hero-bg.webp
    ├── about-img.webp
    ├── counter-bg.webp
    ├── product-1.webp
    ├── product-2.webp
    └── product-3.webp
```

## 🖼️ Image Cropper & WebP Converter

Tool khusus untuk crop gambar dan konversi ke format WebP telah tersedia di `image-cropper.html`.

### Fitur Image Cropper:
- **Upload Gambar**: Upload gambar dari komputer atau pilih dari folder lokal
- **Crop Interaktif**: Crop gambar dengan drag & drop pada canvas
- **Aspect Ratio**: Pilih aspect ratio (1:1, 16:9, 9:16, 4:3, 3:4, atau bebas)
- **Ukuran Custom**: Tentukan ukuran output sesuai kebutuhan
- **Kualitas WebP**: Atur kualitas WebP (0-100)
- **Batch Processing**: Proses beberapa gambar sekaligus
- **Download**: Download hasil dalam format WebP

### Cara Menggunakan:
1. Buka file `image-cropper.html` di browser
2. Upload gambar atau pilih dari dropdown "Pilih dari folder lokal"
3. Pilih area crop dengan klik dan drag pada gambar
4. Atur aspect ratio, ukuran output, dan kualitas WebP
5. Klik "Crop & Convert ke WebP"
6. Download hasil gambar WebP

### Batch Processing:
1. Klik "Choose Files" pada bagian Batch Processing
2. Pilih beberapa gambar sekaligus
3. Atur ukuran output dan kualitas
4. Klik "Proses Semua Gambar"
5. Download setiap gambar yang sudah diproses

## 🔧 Customization

### Mengubah Warna Tema

Buka file `styles.css` dan ubah nilai variabel CSS pada bagian `:root`:

```css
:root {
    --primary-color: #0d6a25;    /* Warna utama */
    --secondary-color: #ffcc00;  /* Warna sekunder */
    --dark-color: #013220;       /* Warna gelap */
    --light-color: #f9f9f9;      /* Warna terang */
    --text-color: #333;          /* Warna teks */
    --hover-color: #0a4b1a;      /* Warna hover */
    /* ... */
}
```

### Mengganti Gambar

1. Siapkan gambar baru dengan rasio aspek yang sama dengan gambar yang akan diganti
2. Letakkan gambar baru di folder `images/`
3. Edit file `index.html` dan ubah path gambar sesuai kebutuhan

### Mengedit Konten

Buka file `index.html` dan ubah teks atau struktur sesuai kebutuhan.

## 📱 Contact

Untuk pertanyaan atau bantuan lebih lanjut, silakan hubungi:

- Email: info@daraboganusantara.com
- Telepon: +62 321 555 7890
- Alamat: Dusun Kedungasem, Jombang, Jawa Timur 