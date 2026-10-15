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

## Deklarasi penggunaan AI

Menggunakan Codex untuk membaca worksheet, membantu membuat dan menguji render daftar proyek, event delegation pada filter kategori, validasi form per kolom, serta pemeriksaan kasus selector, listener ganda, dan daftar kosong.
