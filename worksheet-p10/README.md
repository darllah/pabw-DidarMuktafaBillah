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

## Bagian C — Membaca JSON

`response.json()` di `js/api.js` mengubah isi respons menjadi nilai JavaScript. Pada API yang dipilih, hasilnya adalah array berisi empat objek. Setiap objek memiliki `userId` dan `id` (number), serta `title` dan `body` (string). Di `js/app.js`, hasil `fetchNews()` dicetak sekali untuk memeriksa bentuknya sebelum bagian D membuat kartu. `JSON.stringify(data[0])` menunjukkan arah sebaliknya: objek menjadi teks JSON bertipe `string`. `JSON.parse(teks)` juga mengubah teks menjadi nilai, tetapi digunakan untuk teks JSON yang sudah kita pegang sendiri; respons jaringan di sini dibaca dengan `response.json()`.

Contoh akses yang valid: `data[0].userId`, `data[0].id`, `data[0].title`, dan `data[0].body`. Respons ini tidak mempunyai kunci boolean atau `null`, sehingga kolom tersebut ditandai tidak tersedia di worksheet, bukan dibuat-buat.

## Bagian D — Menampilkan data API

`js/api.js` tetap khusus mengambil dan memeriksa data; `js/app.js` memakai hasilnya untuk membuat satu `<article>` per catatan di `#daftar-catatan-api`. Judul dan isi jaringan dimasukkan dengan `textContent`, bukan `innerHTML`. `renderCatatan()` mengosongkan container sebelum mengisi ulang, sehingga tombol **Coba lagi** tidak menggandakan kartu.

Empat keadaan ditangani pada halaman: **memuat** menampilkan “Mengambil data dari API…”, **berhasil** menampilkan jumlah catatan beserta kartunya, **gagal** menampilkan pesan galat, dan **kosong** menampilkan “Belum ada catatan dari API.” Tombol coba lagi dinonaktifkan selama permintaan berjalan. Fungsi `renderCatatan` diekspor agar keadaan kosong dapat dicoba dari Console dengan `const { renderCatatan } = await import("./js/app.js"); renderCatatan([]);`.

Pemeriksaan browser: respons asli menampilkan 4 artikel; uji sementara `?userId=0` menampilkan keadaan kosong; domain `.invalid` menampilkan kegagalan; dan klik **Coba lagi** setelah URL dipulihkan tetap menampilkan 4 artikel. Alamat API di `js/api.js` sudah dikembalikan ke nilai asli.

## Bagian E — Menangani kasus sulit

Status 404 tetap menghasilkan objek `Response`, jadi `fetchNews()` memeriksa `response.ok` sebelum membaca isi. Setelah status berhasil, fungsi itu memeriksa header `Content-Type`; respons HTML ditolak dengan pesan “respons API bukan JSON”. Jika header menyatakan JSON tetapi isinya rusak, `response.json()` tetap dapat menolak dan `catch` meneruskan galat ke halaman.

`await` di dalam fungsi biasa atau skrip klasik menghasilkan `SyntaxError`, sehingga kode berikutnya tidak berjalan. Modul ES juga mengizinkan *top-level await*, tetapi latihan ini menaruh `await fetchNews()` di dalam `async function muatStatusApi()` agar alur dan penanganan galat tetap jelas. Respons JSON berupa array kosong bukan galat: `renderCatatan([])` menampilkan “Belum ada catatan dari API.”, bukan halaman putih.

Uji bagian E dilakukan sementara, lalu URL asli dipulihkan: path tidak ada menghasilkan pesan `status 404`, halaman HTML lokal menghasilkan pesan `respons API bukan JSON`, dan respons `?userId=0` menghasilkan keadaan kosong. Kasus `await` di fungsi biasa diperiksa melalui uji sintaks terpisah, bukan dimasukkan ke kode halaman yang dikumpulkan.

## Bagian F — Pemeriksaan akhir

Empat keadaan antarmuka memiliki tangkapan layar di `evidence/`: `f-success.jpg`, `f-failure.jpg`, `f-empty.jpg`, dan `f-loading.jpg`. Keadaan berhasil menampilkan empat kartu. Keadaan gagal diuji dengan domain `.invalid`; keadaan kosong diuji dengan respons `?userId=0`. Untuk merekam keadaan memuat, pemanggilan API diberi jeda sementara. Semua perubahan uji telah dipulihkan; `js/api.js` kembali memakai URL asli.

Pada pemuatan normal, Console tidak mencatat galat dan tombol **Coba lagi** bekerja. Checklist, penilaian diri sementara, dan exit ticket diisi dalam `WORKSHEET-P10.docx`. Pernyataan orisinalitas pribadi dan tanda tangan belum saya isi; keduanya perlu dikonfirmasi oleh pemilik tugas. Nilai `90/100` di worksheet adalah perkiraan, bukan penilaian dosen.

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

Pada bagian A, Codex membantu menyalin dasar P9, membuat `js/api.js`, menguji respons API melalui Console dan Network, serta mengisi tabel worksheet. Pada bagian B, Codex membantu menambahkan `try/catch`, status dan tombol coba lagi, menguji kasus gagal, serta mengisi worksheet. Pada bagian C, Codex membantu memeriksa bentuk respons, memberi contoh `JSON.stringify`, dan mengisi peta data worksheet. Pada bagian D, Codex membantu membuat kartu data API, empat keadaan antarmuka, menguji hasilnya, dan mengisi worksheet. Pada bagian E, Codex membantu memeriksa kasus 404, respons bukan JSON, `await` di luar `async`, keadaan kosong, dan mengisi worksheet. Pada bagian F, Codex membantu menguji dan mengambil bukti empat keadaan, mengisi checklist, menyusun penilaian diri sementara, serta menjawab exit ticket. Topik dan isi profil berasal dari pekerjaan P9 saya.
