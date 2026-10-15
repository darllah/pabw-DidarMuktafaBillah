# Pertemuan 9 — My Life's Gallery

Nama: Didar Muktafa Billah

NIM: 25523220

Tanggal: 15 Oktober 2026

## Menjalankan

Dari folder `worksheet-p9`, jalankan:

```sh
python3 -m http.server 8000
```

Buka http://localhost:8000/profile.html

## Bagian A — Memilih elemen halaman

- `profile.html`: hasil Pertemuan 8 dengan `app.js` dan `dom.js` yang dimuat berurutan sebelum penutup `body`.
- `js/app.js`: data dan fungsi dari Pertemuan 8, tanpa perubahan.
- `js/dom.js`: selector elemen yang akan digunakan untuk mengisi dan merespons halaman.

| Area halaman          | Selector               | Akan diisi dengan              | Nama variabel         |
| --------------------- | ---------------------- | ------------------------------ | --------------------- |
| Daftar proyek         | `#daftar-proyek`       | Data dari `daftarProyek`       | `daftarProyekElement` |
| Kontrol filter proyek | `#filter-proyek`       | Pilihan filter proyek          | `barisFilterProyek`   |
| Pesan daftar kosong   | `#pesan-daftar-kosong` | Pesan saat hasil filter kosong | `pesanDaftarKosong`   |
| Form kenangan         | `#form-kenangan`       | Data kenangan baru             | `formKenangan`        |
| Kolom judul           | `#judul`               | Judul kenangan                 | `judulKenangan`       |
| Kolom tahun           | `#momen`               | Tahun kenangan                 | `tahunKenangan`       |
| Kolom pesan           | `#pesan`               | Cerita kenangan                | `pesanKenangan`       |

## Memeriksa variabel modul melalui Console

Variabel modul tidak otomatis tersedia sebagai variabel global. Jalankan:

```js
const p9 = await import("./js/dom.js");
p9.daftarProyekElement;
p9.barisFilterProyek;
p9.pesanDaftarKosong;
p9.formKenangan;
p9.judulKenangan;
p9.tahunKenangan;
p9.pesanKenangan;
```

## Deklarasi penggunaan AI

Menggunakan Codex untuk membaca worksheet, , membuat pemetaan selector di `dom.js`, dan menguji bahwa setiap selector menemukan elemen yang benar
