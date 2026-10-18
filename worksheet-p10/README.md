# Pertemuan 10 — My Life's Gallery

## Bagian A — Panggilan API pertama

Pekerjaan Pertemuan 9 disalin sebagai dasar. `js/api.js` menyimpan satu alamat API publik JSONPlaceholder. Pada bagian A, fungsi `load()` menampilkan `response.status` serta `response.ok`, memeriksa status sebelum membaca JSON, lalu mengembalikan datanya. Setelah bagian B, nama ekspor yang dipakai adalah `fetchNews()`. Untuk mencoba dari Console pada halaman yang disajikan lewat server lokal, jalankan:

```js
const { fetchNews } = await import("./js/api.js");
await fetchNews();
```

API: `https://jsonplaceholder.typicode.com/posts?_limit=4` (tanpa kunci akses). Pada pemeriksaan bagian A, respons berstatus `200`, `response.ok` bernilai `true`, dan `Content-Type` adalah `application/json; charset=utf-8`.

## Bagian B — async/await dan penanganan galat

`fetchNews()` membungkus `fetch`, pemeriksaan `response.ok`, dan pembacaan JSON dalam satu `try/catch`. Kesalahan dicatat lalu dilempar kembali agar pemanggil di `app.js` menampilkan pesannya pada `#status-api`. Tombol **Coba lagi** memanggil ulang fungsi tanpa memuat ulang halaman. Saat berhasil, halaman menampilkan jumlah catatan yang diterima. Render kartu dari data jaringan dikerjakan pada bagian D.

Pemeriksaan: URL yang mengembalikan 404 menampilkan `Gagal memuat catatan: status 404`; domain `.invalid` mensimulasikan koneksi yang tidak tersedia dan menampilkan `Gagal memuat catatan: Failed to fetch`. Setelah URL asli dikembalikan, empat catatan kembali terdeteksi. Mode Offline di DevTools juga dicoba, tetapi saat halaman dimuat ulang seluruh halaman lokal ikut gagal dibuka; bukti pesan dalam halaman untuk kasus jaringan berasal dari uji domain `.invalid`.

## Dasar dari Pertemuan 9

Nama: Didar Muktafa Billah

NIM: 25523220

Tanggal: 15 Oktober 2026

## Menjalankan

Dari folder `worksheet-p10`, jalankan:

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

## Bagian B — Membangun elemen dari data

- `buatKartuProyek(proyek)` membuat satu elemen `li` untuk setiap objek proyek.
- Isi kartu dimasukkan dengan `textContent`, sehingga data selalu diperlakukan sebagai teks.
- `renderProyek(daftar)` mengosongkan container pada baris pertama sebelum menambahkan kartu baru.
- Kartu ditampung dalam `DocumentFragment`, kemudian dimasukkan ke halaman dengan `append`.
- `renderProyek(daftarProyek)` dipanggil saat halaman dibuka agar daftar langsung tampil tanpa perintah dari Console.

### Hasil pemeriksaan Bagian B

| Yang diperiksa | Hasil                                          |
| -------------- | ---------------------------------------------- |
| Jumlah kartu   | 4 kartu, sama dengan panjang `daftarProyek`    |
| Kartu teratas  | `Profil Pribadi`, sama dengan data pertama     |
| Isi kartu      | Ditampilkan sebagai teks melalui `textContent` |
| Reload halaman | Tetap 4 kartu dan tidak ada duplikasi          |

## Bagian C — Satu listener untuk semua tombol

- Empat tombol kategori berada di dalam parent `#filter-proyek`.
- Hanya parent tersebut yang menerima satu listener `click`.
- `event.target.closest("button[data-category]")` menemukan tombol yang benar dari target klik.
- Nilai `data-category` menentukan data yang diberikan ke `renderProyek`.
- `tandaiTombolAktif` mengatur class `active` dan `aria-pressed` pada satu tombol saja.
- Kategori Desain sengaja tidak memiliki proyek agar keadaan kosong dan pesannya dapat diperiksa.

### Hasil pemeriksaan Bagian C

| Keadaan             | Hasil                                   |
| ------------------- | --------------------------------------- |
| Halaman baru dibuka | 4 proyek tampil dan tombol Semua aktif  |
| Tombol Web          | 2 proyek kategori Web tampil            |
| Tombol JavaScript   | 2 proyek kategori JS tampil             |
| Tombol Desain       | 0 proyek dan pesan daftar kosong tampil |
| Klik berulang       | Jumlah kartu tidak berlipat             |

## Bagian D — Render dan validasi form

- `renderKenangan(daftar)` menjadi satu tempat untuk menggambar ulang tabel kenangan.
- Handler `submit` memanggil `preventDefault()` sebelum menjalankan validasi.
- Judul dan pesan diperiksa setelah `trim()`, sehingga isi berupa spasi tetap tidak valid.
- Tahun harus berupa bilangan bulat antara 1900 dan 2100.
- Setiap kolom memiliki pesan perbaikan, `aria-invalid`, dan keadaan visualnya sendiri.
- Pesan kesalahan menghilang segera setelah kolom diperbaiki.
- Tombol Simpan dinonaktifkan setelah validasi gagal dan baru aktif ketika semua kolom valid.

### Hasil pemeriksaan Bagian D

| Keadaan               | Hasil yang diharapkan                                |
| --------------------- | ---------------------------------------------------- |
| Form kosong dikirim   | Halaman tidak reload dan tiga pesan perbaikan tampil |
| Satu kolom diperbaiki | Pesan pada kolom tersebut langsung hilang            |
| Nilai hanya spasi     | Tetap dinyatakan tidak valid                         |
| Semua kolom valid     | Tombol Simpan aktif dan data dapat ditambahkan       |

## Bagian E — Membaca gejala sebelum menebak

- `pilihElemen(selector)` menghentikan script dengan pesan yang menyebut selector ketika elemen tidak ditemukan.
- Handler filter diberi nama `tanganiKlikFilter`, sehingga mudah dikenali pada panel Event Listeners.
- Listener filter dipasang tepat satu kali pada parent dan berada di luar `renderProyek`.
- `renderProyek` selalu menangani daftar kosong dengan menampilkan `#pesan-daftar-kosong`.

### Tiga kasus yang diperiksa

| Gejala yang diuji                                     | Penyebab                                         | Baris yang menangani                                                |
| ----------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| Selector menghasilkan `null`                          | ID atau class berbeda dari elemen di halaman     | `pilihElemen` memeriksa hasil selector dan memberi pesan yang jelas |
| Satu klik berisiko menjalankan aksi lebih dari sekali | Listener dipasang kembali di dalam fungsi render | `addEventListener` hanya dipanggil sekali di luar `renderProyek`    |
| Filter Desain menghasilkan daftar kosong              | Tidak ada proyek dengan kategori `Desain`        | `renderProyek` menampilkan pesan keadaan kosong                     |

### Pemeriksaan melalui DevTools

1. Pilih elemen `#filter-proyek` pada panel Elements.
2. Buka Event Listeners dan periksa event `click`.
3. Pastikan hanya ada satu handler bernama `tanganiKlikFilter`.
4. Jalankan `monitorEvents(document.querySelector("#filter-proyek"), "click")` di Console.
5. Klik satu tombol dan pastikan hanya satu event tercetak.

Bukti visual dan petunjuk pengambilannya disimpan dalam folder `evidence/`.

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
p9.renderProyek(p9.daftarProyek);
```

## Deklarasi penggunaan AI P9

Menggunakan Codex untuk membaca worksheet, membantu membuat dan menguji render daftar proyek, event delegation pada filter kategori, validasi form per kolom, serta pemeriksaan kasus selector, listener ganda, dan daftar kosong.

## Deklarasi penggunaan AI P10

Pada bagian A, Codex membantu menyalin dasar P9, membuat `js/api.js`, menguji respons API melalui Console dan Network, serta mengisi tabel worksheet. Pada bagian B, Codex membantu menambahkan `try/catch`, status dan tombol coba lagi, menguji kasus gagal, serta mengisi worksheet. Topik dan isi profil berasal dari pekerjaan P9 saya.
