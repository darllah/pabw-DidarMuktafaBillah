import { fetchNews } from "./api.js";

const namaProfil = "Didar Muktafa Billah";
const nimProfil = "25523220";
const tahunProfil = 2026;
const judulHalaman = "My Life's Gallery";
const daftarKeahlian = [
  { nama: "HTML", bidang: "Struktur halaman" },
  { nama: "CSS", bidang: "Tampilan halaman" },
  { nama: "JavaScript", bidang: "Pengolahan data" },
  { nama: "Bootstrap", bidang: "Komponen antarmuka" },
  { nama: "Git", bidang: "Riwayat perubahan" },
];
const profil = {
  nama: namaProfil,
  nim: nimProfil,
  tahun: tahunProfil,
  peran: "Mahasiswa Informatika yang belajar pengembangan web",
  bio: "Semua momen hidup saya tersimpan dalam galeri ini.",
  keahlian: daftarKeahlian,
};

const daftarProyek = [
  { judul: "Profil Pribadi", tahun: 2024, kategori: "Web", selesai: true },
  { judul: "Kalkulator Sederhana", tahun: 2024, kategori: "JS", selesai: true },
  { judul: "Landing Page Toko", tahun: 2025, kategori: "Web", selesai: false },
  { judul: "Aplikasi Catatan", tahun: 2025, kategori: "JS", selesai: true },
];
const daftarKenangan = [
  { judul: "Main", tahun: 2016, cerita: "Jamannya belum digital" },
  { judul: "Tidur", tahun: 2015, cerita: "Ketika gabut tidur" },
  {
    judul: "Layangan",
    tahun: 2019,
    cerita: "Masa-masa lulus SD banyak bermain",
  },
];
const jumlahProyek = daftarProyek.length;
let pilihanAktif = "semua";

const buatPerkenalan = ({
  nama = "Pengunjung",
  peran = "Pencinta kenangan",
} = {}) => {
  return `Halo, saya ${nama} — ${peran}. Selamat datang di galeri hidup saya!`;
};
const formatKeahlian = (daftar = []) => {
  return daftar.map((keahlian) => keahlian.nama).join(" · ");
};

const judulProyek = daftarProyek.map((proyek) => proyek.judul);
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai === true);
const proyekSpesifik = daftarProyek.find(
  (proyek) => proyek.judul === "Kalkulator Sederhana",
);
const proyekTidakAda = daftarProyek.find(
  (proyek) => proyek.judul === "Tidak ada",
);
const salinanProfil = { ...profil, nama: "Salinan untuk latihan" };

const proyekTerurut = [...daftarProyek].sort((a, b) =>
  a.judul.localeCompare(b.judul),
);

document.title = judulHalaman;
document.querySelector("#judul-halaman").textContent = judulHalaman;
document.querySelector("#nama-profil").textContent = profil.nama;
document.querySelector("#perkenalan").textContent = buatPerkenalan(profil);
document.querySelector("#bio-profil").textContent = profil.bio;
document.querySelector("#keahlian").textContent = formatKeahlian(
  profil.keahlian,
);
document.querySelector("#identitas-footer").textContent =
  `${profil.nama} · ${profil.nim} · ${profil.tahun}`;
document.querySelector("#caption-kenangan").textContent =
  `Momen ${profil.nama}`;
document.querySelector("#proyek-pilihan").textContent =
  `Proyek pilihan: ${proyekSpesifik?.judul ?? "Belum dipilih"}`;

document.querySelector("#tema").addEventListener("change", (event) => {
  document.documentElement.dataset.bsTheme = event.target.checked
    ? "dark"
    : "light";
  document.querySelector(".tombol-tema").textContent = event.target.checked
    ? "Tema terang"
    : "Tema gelap";
  document
    .querySelector(".tombol-tema")
    .classList.toggle("btn-outline-light", event.target.checked);
  document
    .querySelector(".tombol-tema")
    .classList.toggle("btn-outline-dark", !event.target.checked);
});
console.log("Lembar B —", {
  namaProfil,
  jumlahProyek,
  tipeTahun: typeof tahunProfil,
});
console.log(
  "Lembar C —",
  buatPerkenalan(profil),
  formatKeahlian(daftarKeahlian),
);
console.table(profil);
console.table(daftarKeahlian);
console.table(daftarProyek);
console.table(proyekSelesai);
console.log("map:", judulProyek, "find:", proyekSpesifik);
console.log(
  "find tanpa hasil:",
  proyekTidakAda?.judul ?? "Proyek tidak ditemukan",
);
console.log("Salinan objek:", salinanProfil, "Nama asli:", profil.nama);
console.table(proyekTerurut);
console.log(
  "Urutan asli tetap:",
  daftarProyek.map((proyek) => proyek.judul),
);

const statusApi = document.querySelector("#status-api");

async function muatStatusApi() {
  statusApi.textContent = "Mengambil data dari API…";

  try {
    const data = await fetchNews();
    console.log("Bentuk data API:", data);
    if (data.length > 0) {
      const contohTeksJson = JSON.stringify(data[0]);
      console.log("Contoh JSON.stringify:", contohTeksJson);
      console.log("Tipe hasil stringify:", typeof contohTeksJson);
    }
    statusApi.textContent = `${data.length} catatan berhasil dimuat dari API.`;
  } catch (error) {
    statusApi.textContent = `Gagal memuat catatan: ${error.message}`;
  }
}

muatStatusApi();
document.querySelector("#ulang-api").addEventListener("click", muatStatusApi);

export {
  profil,
  namaProfil,
  jumlahProyek,
  daftarKeahlian,
  daftarProyek,
  daftarKenangan,
  buatPerkenalan,
  formatKeahlian,
  judulProyek,
  proyekSelesai,
  proyekSpesifik,
  proyekTidakAda,
  salinanProfil,
  proyekTerurut,
  pilihanAktif,
  muatStatusApi,
};
