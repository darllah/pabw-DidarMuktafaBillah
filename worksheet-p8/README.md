# Pertemuan 8 — My Life's Gallery

Nama: Didar Muktafa Billah  
NIM: 25523220  
Tanggal: 11 Oktober 2026

## Menjalankan

Dari folder `worksheet-p8`, jalankan:

```sh
python3 -m http.server 8000
```

Buka http://localhost:8000/profil.html

## Isi pekerjaan

- `profil.html`: struktur halaman dengan satu `<script type="module">`.
- `js/app.js`: data profil, 5 keahlian, 4 proyek, 3 kenangan, dua fungsi murni, array methods, salinan objek/array, dan pengisian halaman.

## Memeriksa variabel modul melalui Console

Variabel modul tidak otomatis tersedia sebagai variabel global. Jalankan:

```js
const p8 = await import("./js/app.js");
p8.namaProfil;
p8.buatPerkenalan(p8.profil);
p8.formatKeahlian(p8.daftarKeahlian);
console.table(p8.daftarProyek);
```

## Deklarasi penggunaan AI

Menggunakan Codex untuk membaca worksheet, menguji halaman. mengonfirmasi isi proyek, dan menyesuaikan refleksi serta penilaian pribadi sebelum mengumpulkan.

## Note

Karena dikejar deadline, untuk push ke git di akhirkan agar mempercepat pekerjaan
