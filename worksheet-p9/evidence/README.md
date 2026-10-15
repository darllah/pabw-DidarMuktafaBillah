# Bukti Bagian E

Folder ini menyimpan bukti pemeriksaan gejala pada Bagian E.

- `e-after-fix.jpg`: halaman berjalan normal setelah selector dan listener diperiksa.
- `e-filter-web.jpg`: filter Web bekerja dan hanya dua proyek Web yang tampil.
- `e-empty-state.jpg`: filter Desain menghasilkan nol proyek dan pesan keadaan kosong tampil.
- `e-event-listener.txt`: hasil pemeriksaan otomatis bahwa hanya ada satu pemanggilan `addEventListener` untuk filter di `dom.js`.

Screenshot Event Listeners perlu diambil langsung melalui Chrome DevTools:

1. Buka `profile.html` melalui server lokal.
2. Inspect elemen `#filter-proyek`.
3. Buka panel Event Listeners, lalu bagian `click`.
4. Ambil screenshot ketika handler `tanganiKlikFilter` terlihat satu kali.
