import {
  daftarProyek,
  daftarKenangan,
  jumlahProyek,
  profil,
  proyekSelesai,
} from "./app.js";

const pilihElemen = (selector, root = document) => {
  const elemen = root.querySelector(selector);
  if (!elemen) {
    throw new Error(
      `Elemen "${selector}" tidak ditemukan. Periksa ejaan selector dan urutan script.`,
    );
  }
  return elemen;
};

const daftarProyekElement = pilihElemen("#daftar-proyek");
const barisFilterProyek = pilihElemen("#filter-proyek");
const pesanDaftarKosong = pilihElemen("#pesan-daftar-kosong");
const ringkasanProyek = pilihElemen("#ringkasan-proyek");
const daftarKenanganElement = pilihElemen("#daftar-kenangan");
const formKenangan = pilihElemen("#form-kenangan");
const judulKenangan = pilihElemen("#judul");
const tahunKenangan = pilihElemen("#momen");
const pesanKenangan = pilihElemen("#pesan");
const galatJudul = pilihElemen("#galat-judul");
const galatTahun = pilihElemen("#galat-momen");
const galatPesan = pilihElemen("#galat-pesan");
const tombolSimpan = pilihElemen("#simpan-kenangan");
const statusSimpan = pilihElemen("#status-simpan");

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

  pesanDaftarKosong.hidden = daftar.length !== 0;
  ringkasanProyek.textContent = `${daftar.length} dari ${jumlahProyek} proyek ditampilkan; ${proyekSelesai.length} sudah selesai.`;
};

const tandaiTombolAktif = (tombolAktif) => {
  barisFilterProyek.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("active", aktif);
    tombol.setAttribute("aria-pressed", aktif.toString());
  });
};

const tanganiKlikFilter = (event) => {
  if (!(event.target instanceof Element)) return;
  const tombol = event.target.closest("button[data-category]");
  if (!tombol || !barisFilterProyek.contains(tombol)) return;

  const kategori = tombol.dataset.category;
  const proyekTerpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori,
  );

  renderProyek(proyekTerpilih);
  tandaiTombolAktif(tombol);
};

barisFilterProyek.addEventListener("click", tanganiKlikFilter);

const buatBarisKenangan = (kenangan) => {
  const baris = document.createElement("tr");
  const judul = document.createElement("th");
  const tahun = document.createElement("td");
  const cerita = document.createElement("td");

  judul.scope = "row";
  judul.textContent = kenangan.judul;
  tahun.textContent = kenangan.tahun;
  cerita.textContent = kenangan.cerita;
  baris.append(judul, tahun, cerita);
  return baris;
};

const renderKenangan = (daftar) => {
  daftarKenanganElement.textContent = "";
  const fragmen = document.createDocumentFragment();
  daftar.map(buatBarisKenangan).forEach((baris) => fragmen.append(baris));
  daftarKenanganElement.append(fragmen);
};

const konfigurasiKolom = [
  {
    kolom: judulKenangan,
    galat: galatJudul,
    valid: () => judulKenangan.value.trim() !== "",
  },
  {
    kolom: tahunKenangan,
    galat: galatTahun,
    valid: () => {
      const tahun = Number(tahunKenangan.value);
      return (
        tahunKenangan.value.trim() !== "" &&
        Number.isInteger(tahun) &&
        tahun >= 1900 &&
        tahun <= 2100
      );
    },
  },
  {
    kolom: pesanKenangan,
    galat: galatPesan,
    valid: () => pesanKenangan.value.trim() !== "",
  },
];

const validasiKolom = ({ kolom, galat, valid }) => {
  const kolomValid = valid();
  kolom.setAttribute("aria-invalid", (!kolomValid).toString());
  kolom.classList.toggle("is-invalid", !kolomValid);
  kolom.classList.toggle("is-valid", kolomValid);
  galat.hidden = kolomValid;
  return kolomValid;
};

const perbaruiTombolSimpan = () => {
  const formValid = konfigurasiKolom.every(({ valid }) => valid());
  tombolSimpan.disabled = !formValid;
  return formValid;
};

const tanganiInputForm = (event) => {
  const konfigurasi = konfigurasiKolom.find(
    ({ kolom }) => kolom === event.target,
  );
  if (!konfigurasi) return;

  validasiKolom(konfigurasi);
  perbaruiTombolSimpan();
  statusSimpan.textContent = "";
};

const tanganiSubmitForm = (event) => {
  event.preventDefault();

  const hasilValidasi = konfigurasiKolom.map(validasiKolom);
  const formValid = hasilValidasi.every(Boolean);
  tombolSimpan.disabled = !formValid;

  if (!formValid) {
    const kolomPertamaTidakValid = konfigurasiKolom.find(
      (_, indeks) => !hasilValidasi[indeks],
    );
    kolomPertamaTidakValid.kolom.focus();
    return;
  }

  const judulBaru = judulKenangan.value.trim();
  const tahunBaru = Number(tahunKenangan.value);
  daftarKenangan.push({
    judul: judulBaru,
    tahun: tahunBaru,
    cerita: pesanKenangan.value.trim(),
  });

  renderKenangan(daftarKenangan);
  statusSimpan.textContent = `Kenangan “${judulBaru}” ditambahkan untuk tahun ${tahunBaru}.`;
  formKenangan.reset();
  konfigurasiKolom.forEach(({ kolom, galat }) => {
    kolom.setAttribute("aria-invalid", "false");
    kolom.classList.remove("is-invalid", "is-valid");
    galat.hidden = true;
  });
  tombolSimpan.disabled = true;
};

formKenangan.addEventListener("input", tanganiInputForm);
formKenangan.addEventListener("submit", tanganiSubmitForm);

renderProyek(daftarProyek);
renderKenangan(daftarKenangan);

export {
  barisFilterProyek,
  buatBarisKenangan,
  buatKartuProyek,
  daftarKenangan,
  daftarKenanganElement,
  daftarProyek,
  daftarProyekElement,
  formKenangan,
  judulKenangan,
  pesanDaftarKosong,
  pesanKenangan,
  perbaruiTombolSimpan,
  pilihElemen,
  profil,
  renderKenangan,
  renderProyek,
  ringkasanProyek,
  tandaiTombolAktif,
  tanganiInputForm,
  tanganiKlikFilter,
  tanganiSubmitForm,
  tahunKenangan,
  tombolSimpan,
  validasiKolom,
};
