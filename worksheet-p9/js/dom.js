import {
  daftarProyek,
  daftarKenangan,
  profil,
} from "./app.js";

const daftarProyekElement = document.querySelector("#daftar-proyek");
const barisFilterProyek = document.querySelector("#filter-proyek");
const pesanDaftarKosong = document.querySelector("#pesan-daftar-kosong");
const formKenangan = document.querySelector("#form-kenangan");
const judulKenangan = document.querySelector("#judul");
const tahunKenangan = document.querySelector("#momen");
const pesanKenangan = document.querySelector("#pesan");

export {
  barisFilterProyek,
  daftarKenangan,
  daftarProyek,
  daftarProyekElement,
  formKenangan,
  judulKenangan,
  pesanDaftarKosong,
  pesanKenangan,
  profil,
  tahunKenangan,
};
