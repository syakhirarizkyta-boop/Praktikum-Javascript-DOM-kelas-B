console.log("Bissmilah Kita Belajar Javascript DOM")

// Aktiviras 1 DOM SELECTION
// penjelasan kita harus menyeleksi atu "menangkap"
// mengambil elemen HTML berdasarkan ID/Class

// 1. Mengambil elemen judul & sub judul
// getElementByid -> Seleksi berdasarkan id
const judulUtama = document.getElementById("judul-utama");

// 1.1 Mengambil elemen sub judul
// queryselector(#..)
const subjudul = document.querySelector("#sub-judul");

// 2. Mengambil elemen pada kartu 1 (Kartu manipulasi teks & style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");

// 3. Mengambil elemen tombol-tombol aksi pada kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

//4. Mengambil elemen pada kartu 2 (fitur catatan dinamis / todolist sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas 2 Manipulasi teks & style
// addEventListener("click", function(){...}
btnUbahTeks.addEventListener("click", function(){
    // .innerText = Mengganti atau Mengisi tulisan teks yang ada di HTML
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah melalui DOM!";

    // .style.color = Mengubah warna teks secara langsung melalui Javascript
    teksPreview.style.color = "#1f1d97";

    // console.log mencetak pesan di console
    console.log("DOM Teks Preview telah diperbaharui");
});

// B -- Manipulasi Class Css Menggunakan ClassListToggle()
btnToggleWarna.addEventListener("click", function(){
    // .classList.togglen= Fitur untuk saklar otomatis
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("DOM class Highlight berhasil di switch!");
})

// Mengembalikan (Reset) Teks & Style ke kondisi semula
btnReset.addEventListener("click", function(){
    // 1. Kembalikan tulisan teks ke aslinya
    teksPreview.innerText = ("Halo! Teks ini siap diubah oleh Javascript.");

    // 2. Kosongkan warna inline style (styl.color = "") agar balik ke css bawaan
    teksPreview.style.color = "",

    // 3. Hapus Class khusus menggunakan .classList.remove("...")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("DOM Tampilan direset");
}); 


// Aktivitas 3 & 4: Elemen dinamis & Event Handling (TO-DO list)
// Penejelasan
// Bagian ini kita bakal belajar buat elemen HTML LI secara otomatis
// Mengisi teks nya, memberi tombol hapus, lalu menempelkan ke dalam layar <ul>

// Langkah 1: Variabel Penampung Angka jumlah catatan
// 'let' digunakan karena nilai variabel yang akan berubah-ubah
let  totalCatatan = 0;

//. Langkah 2: membuat function supaya update Angka counter & pesan status
// Fungsi ini kumpulan perintah yang diberi nama. Kita bisa pangiil kapan saja
function perbaruiJumlah() {
    // Masukkan angka total catatan terbaru ke dalam tag <span id="jumlah-catatan"
    jumlahCatatan.innerText = totalCatatan;

    // Periksa kondisi: apakah catatan 0?
    if (totalCatatan === 0) {
        // jika 0: hapus Class "hidden" supaya teks "Belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // jika > 0 : tambahkan class "hidden" agar teks "Belum ada catatan" sembunyi/hilang
        pesanKosong.classList.add("hidden");
    }
} 

// Langkah 3: Function Tambah catatn Fungsi Utama logika
function tambahCatatan() {
    // 3.1 input catatan value = mengambil teks yang diketik oleh user di kolom input
    // .trim() = untuk menghapus spasi di awal dan spasi di akhir
    const isiTeks = inputCatatan.value.trim();
    
    // 3.2 Validasi input: jika isiTeks kosong tampilkan peringatan berupa alert
    if (isiTeks === "") {
        alert("Catatan tidak boleh kosong!");
        return;
    }

    // 3.3 document .create.Element ("li") = membuat tag html <li> baru secara dinamis pake Javascript
    const liBaru = document.createElement("li");
    liBaru.className = "note-item";

    // 3.4 .innerHTML = mengisi struktur di dalam <li> dengan teks catatan & tombol "hapus"
    // tanda backtick (`)
    liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">hapus</button>`;

    // 3.5 Menambahkan Event Listener Khusus Tombol "Hapus" pada item <li>
    // liBaru.querySelector(".btn-hapus") mengambil berdasarkan class 'btn-hapus'
    const btnHapus = liBaru.querySelector(".btn-hapus");
    btnHapus.addEventListener("click", function(){
        liBaru.remove();
        totalCatatan--;
        perbaruiJumlah();
        console.log(`[DOM]catatan "$(isiTeks)" dihapus`);
    });

    // 3.6 .appenChild (libaru) = menempelkan elemen <li> di dalam wadah <ul id="daftar-catatan">
    daftarCatatan.appendChild(liBaru);

    // 3.7 Mengosongkan kembali isi kolom input agar siap diketik lagi
    inputCatatan.value = "";

    // 3.8 TotalCatatan++ increment total catatan ditambah 1x
    totalCatatan++;
    perbaruiJumlah();

    console.log(`DOM Catatan Baru ditambahkan : ${isiTeks}`);
}

// Langkah 4: Event Listener klik Tombol +tambah
// ketika klik Tombol + Tambah jalankan fungsi TambahCatatan()
btnTambah.addEventListener("click", function(){
    tambahCatatan();
});

// langkah 5: Event Listener Tombol "ENTER"
// Ketika user mengetik dikolom input dan melepas tombol -> (event : keyup)
inputCatatan.addEventListener("keyup", function(event){
    // periksa apakah tombol keyboard yang ditekan adalah tombol enter?
    if (event.key === "Enter") {
        tambahCatatan();
    }
}) 
