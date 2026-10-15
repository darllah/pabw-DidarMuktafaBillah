import {
  daftarProyek,
  daftarKenangan,
  jumlahProyek,
  profil,
  proyekSelesai,
} from "./app.js";

const daftarProyekElement = document.querySelector("#daftar-proyek");
const barisFilterProyek = document.querySelector("#filter-proyek");
const pesanDaftarKosong = document.querySelector("#pesan-daftar-kosong");
const ringkasanProyek = document.querySelector("#ringkasan-proyek");
const formKenangan = document.querySelector("#form-kenangan");
const judulKenangan = document.querySelector("#judul");
const tahunKenangan = document.querySelector("#momen");
const pesanKenangan = document.querySelector("#pesan");

const buatKartuProyek = (proyek) => {
  const kartu = document.createElement("li");
  kartu.className = "list-group-item";
  kartu.textContent = `${proyek.judul} · ${proyek.tahun} · ${proyek.kategori} · ${proyek.selesai ? "Selesai" : "Belum selesai"}`;
  return kartu;
};

const renderProyek = (daftar) => {
  daftarProyekElement.textContent = "";

  const fragmen = document.createDocumentFragment();
  const kartuProyek = daftar.map(buatKartuProyek);
  kartuProyek.forEach((kartu) => fragmen.append(kartu));
  daftarProyekElement.append(fragmen);

  ringkasanProyek.textContent =
    `${daftar.length} dari ${jumlahProyek} proyek ditampilkan; ${proyekSelesai.length} sudah selesai.`;
};

renderProyek(daftarProyek);

export {
  barisFilterProyek,
  buatKartuProyek,
  daftarKenangan,
  daftarProyek,
  daftarProyekElement,
  formKenangan,
  judulKenangan,
  pesanDaftarKosong,
  pesanKenangan,
  profil,
  renderProyek,
  ringkasanProyek,
  tahunKenangan,
};
