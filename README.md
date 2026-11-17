# Katalog Interaktif Loggio

Website katalog statis berdasarkan file hasil scraping `shopee(2).csv`.

## Isi paket
- `index.html`: halaman katalog.
- `css/style.css`: tampilan responsif.
- `js/app.js`: pencarian, filter, pengurutan, dan asisten katalog berbasis pencocokan kata kunci.
- `data/products.json`: data terstruktur untuk website dan asisten.
- `data/products.csv`: data normalisasi.
- `data/shopee_raw.csv`: CSV hasil scraping asli.

## Data
Paket ini memuat **62 baris produk unik** dari CSV yang diberikan. Jumlah tersebut adalah jumlah yang berhasil direkam pada file scraping, bukan bukti bahwa seluruh produk aktif di toko sudah tercakup. Kategori pria/wanita dikelompokkan otomatis dari kata pada nama produk. Harga, rating, jumlah terjual, gambar, dan tautan diambil dari CSV. Informasi dapat berubah pada Shopee.

## Menjalankan lokal
1. Ekstrak ZIP.
2. Buka folder di VS Code.
3. Jalankan ekstensi Live Server dari `index.html`, atau gunakan server lokal sederhana.
4. Buka alamat lokal yang diberikan Live Server.

Catatan: membuka `index.html` langsung (`file://`) dapat membuat browser membatasi `fetch()` untuk `products.json`; gunakan Live Server.

## Deploy Vercel
1. Unggah isi folder ini ke repository GitHub.
2. Di Vercel pilih **Add New → Project** dan impor repository.
3. Framework Preset: **Other**.
4. Build Command: kosongkan.
5. Output Directory: `.` (root).
6. Klik Deploy.

Tidak ada API key yang disimpan di browser. Chatbot di versi ini adalah pencarian lokal berbasis data produk, bukan integrasi Groq/RAG server. Tombol Tanya membuka WhatsApp dengan teks yang sudah diisi; pengguna memilih kontak tujuan.
