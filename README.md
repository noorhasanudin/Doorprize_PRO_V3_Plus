Doorprize PRO — V3 Copyright 2026 noorhasanudin

# Overview Aplikasi Doorprize PRO — V3
<img width="200" height="200" alt="image" src="https://github.com/user-attachments/assets/41c64bb5-8c3c-4a1f-9c26-9d43d7455721" />

Aplikasi Doorprize PRO — V3 adalah aplikasi untuk undian Doorprize berbasis Web, yang dapat melakukan pengundian hadiah Doorprize secara otomatis dijalankan oleh sistem, yang cepat, dan transparan, tanpa rekayasa, karena sistem akan secara acak memilih pemenang undian dari daftar peserta yang sudah terverifikasi, dan hanya Peserta yang bestatus "HADIR" yang masuk dalam proses Undian Doorprize. Aplikasi secara otomatis membuat Kartu QR (File PDF) yang dapat digunakan untuk melakukan Konfirmasi Kehadiran Peserta. 

 
# Keunggulan Aplikasi Doorprize PRO — V3

- Aplikasi dibuat menggunakan Framework `Flask Python` yang fleksibel, sangat ringan dan cepat.
- Database menggunakan `SQLite3`, tanpa perlu menginstall MySQL
- Cocok digunakan untuk acara besar
- Data Peserta Tidak Terbatas
- Branding acara: Nama acara, subtitle, logo
- Fullscreen / LED mode
- Dashboard statistik
- Manajemen data dan pengaturan dilindungi login admin.
- Import Excel (.xlsx/.xlsm)
- Manajemen hadiah + quantity
- Otomatis membuat QR Peserta untuk Konfirmasi Kehadiran
- Download QR Peserta Per Peserta (.pdf) atau Semua Peserta (.zip)
- Status Peserta
- Animasi Roda keberuntungan
- Animasi Rolling peserta
- Suara drumroll dan fanfare berbasis Web Audio API
- Peserta pemenang otomatis dikeluarkan dari undian berikutnya
- Riwayat pemenang
- Reset hasil atau reset seluruh data

## Source files
	- /static
	- /static/app.js
	- /static/attendance.png
	- /static/draw.png
	- /static/doorprice_pro.ico
	- /static/doorprice_pro.png	
	- /static/qr_cards.png
	- /static/register_and_setting.png
	- /static/state.png
	- /static/register_and_setting.png
	- /static/style.css
	- /templates
	- /templates/admin_login.html
	- /templates/attendance.html
	- /templates/draw.html
	- /templates/index.html
	- /templates/qr_cards.html
	- /templates/register_and_setting.html
	- /templates/state.html
	- app.py
	- doorprize_pro.db
	- Doorprize_PRO_V3.bat
	- Template_Upload_Hadiah_Doorprize.xlsx
	- Template_Upload_Peserta_Doorprize.xlsx
	- README.md
	- requirements.txt

## Menjalankan Aplikasi
	Klik `Doorprize_PRO_V3.bat` akan otomatis menjalankan `DOS/Windows Powershell` yang terdiri dari:
	- Menginstall tools Library `Python`: `pip install -r requirements.txt`.
	- Menjalankan Aplikasi `Flask Python`: `python app.py`
	- Memjalankan `Chrome` Localhost `http://127.0.0.1:5000/`
	- Menampilkan Dashboard Aplikasi `Doorprize PRO — V3 Plus`

## Membuat Shortcut Aplikasi + Icon Desktop
	- Klik Kanan pada `Doorprize_PRO_V3_Plus.bat` -> Send to `Desktop (Create Shortcut)`
	- Klik Kanan pada Shortcut Desktop `Doorprize__PRO_V3_Plus.bat - Shortcut` `Rename` menjadi `Doorprize_PRO_V3_Plus`
	- Klik Kanan Pada Shortcut Desktop `Doorprize_PRO_V3_Plus` -> `Properties` -> `Change Icon` -> `Browse` Cari file `/static/doorprice_pro.ico` -> `Open`
	
## Dashboard
	Terdapat 5 Menu Utama pada Dashboard Doorprize PRO — V3:
	- `📝 Registrasi & Pengaturan`
	- `🪪 QR Peserta`
	- `📷 Konfirmasi Kehadiran`
	- `📰 Status Peserta`
	- `🎡 Putar Undian`

<img width="1911" height="957" alt="image" src="https://github.com/user-attachments/assets/b19e44b6-a30b-458d-8888-459adb485d15" >
Dashboard Doorprize PRO V3


## Menu `📝 Registrasi & Pengaturan`

### Login Admin
	- Login Admin — `📝 Registrasi & Pengaturan`
		Menu `📝 Registrasi & Pengaturan` dilindungi login admin.
		Kredensial awal:
		Username: `admin`
		Password: `admin123`
	- Klik Tombol `🔑 Masuk Sebagai Admin`
	- Password disimpan sebagai hash di SQLite.
	- Endpoint input data, upload Excel, logo, pengaturan, dan hapus semua data juga dilindungi session admin.
	- Setelah masuk, Klik Tombol `🔑 Ubah Password` untuk mengganti password.
	- Password baru minimal 8 karakter dan disimpan sebagai hash di SQLite.
	- Logout: Klik Tombol `🔒 Logout Admin`
	- Klik Tombol `← Kembali ke Dashboard`untuk kembali ke Halaman Dashboard.
<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/e4377ea8-1720-4957-aa07-6a82e41d9480" />
Login Admin

### Pengaturan
	- Klik Tombol `⚙️ Pengaturan`
	- Pada Row Pertama isikan Nama Acara
	  Default : `GRAND DOORPRIZE`
	- Pada row kedua isikan Subtitle.
	  Default : `Annual Gathering & Celebration`
	- Untuk Mengubah Logo Klik `🖼️ Upload Logo` -> Pilih File Gambar (.png/.jpg/.webp) -> `Open`
	- Klik Tombol `Simpan`atau Tombol `Batal` untuk membatalkan perubahan pengaturan.
	- Klik Tombol `⚠️ Hapus Semua Data` untuk menghapus semua database yang tersimpan di SQLite (Data Peserta, Hadiah, Pemenang dan Pengaturan).
	- Klik Tombol `← Dashboard`untuk kembali ke Halaman Dashboard.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/554d61e2-f33e-462a-8b02-8ebb8d1eba74" />
Pengaturan

### Input Data Peserta
	- Isikan Nomor Tiket pada row input `Tiket` (*Wajib diisi).
	- Isikan Nama peserta pada row input `Nama peserta` (*Opsional).
	- Isikan Departemen / Instansi pada row input `Departemen / Instansi` (*Opsional).
	- Isikan Nomor HP / WA pada row input `Nomor HP / WA` (*Opsional).
	- Klik Tombol `➕ Tambah Peserta`.
	- Urutan Kolom Tabel Excel `Upload Excel Peserta` : |No|Nomor Tiket|Nama Peserta|Departemen|No HP|Status| atau bisa juga menggunakan Template file Excel yang tersedia.
	- Untuk Upload data Peserta menggunakan Template file Excel Klik `📊 Upload Excel Peserta` -> Pilih File Excel Peserta (.xlxs) -> `Open`
	- Untuk menghapus data Peserta satu per satu klik tommbol `❌` pada sisi kanan data Peserta.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/2001f68f-3a29-41ba-91ed-413d62f483c6" />
Input Data Peserta Manual

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/e7fb95e0-b28d-448e-a651-224c156e0000" />
Template Impor Excel Data Peserta	

### Input Data Hadiah
	- Isikan Nama hadiah pada row input `Nama hadiah` (*Wajib diisi).
	- Isikan Jumlah pada row input `Jumlah` (*Wajib diisi dengan angka minimal `1`).
	- Klik Tombol `➕ Tambah Hadiah`.
	- Urutan Kolom Tabel Excel `Upload Hadiah` : |No|Nama Hadiah|Jumlah|Keterangan| atau bisa juga menggunakan Template file Excel yang tersedia.
	- Untuk Upload data Hadiah menggunakan Template file Excel Klik `📊 Upload Excel Hadiah` -> Pilih File Excel Peserta (.xlxs) -> `Open`
	- Untuk menghapus data Hadiah satu per satu klik tommbol `❌` pada sisi kanan data Hadiah.
	- Klik Tombol `← Dashboard`untuk kembali ke Halaman Dashboard.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/73362251-0452-4735-a672-a759fcb924df" />
Input Data Hadiah Manual

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/1448c282-8e07-47ad-8821-3868f6da4fe2" />
Template Impor Excel Data Hadiah	

### Reset Riwayat Pemenang
	- Klik Tombol `Reset Hasil` untuk mengembalikan semua data pemenang.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/9f993e0b-bd07-487f-92b4-2662110bd4c3" />
Reset Riwayat Pemenang

## Menu `🪪 QR Peserta`
	- Klik `Download Kartu PDF` pada bagian bawah Kartu QR masing-masing peserta untuk menguduh Kartu QR Setiap Peserta menjadi file PDF (nomor_tiket.pdf).
	- Klik Tombol `Download Semua Kartu PDF ZIP` untuk menguduh semua Kartu QR PDF dalam bentuk file ZIP (Kartu_Peserta_Doorprize.zip).
	- File Kartu QR peserta dapat dikirimkan kepada masing-masing Peserta yang dapat digunakan untuk melakukan `Konfirmasi kehadiran peserta` 
	- Klik Tombol `Konfirmasi kehadiran` untuk ke Halaman `Konfirmasi kehadiran`.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/108b3051-4bd3-4120-bba7-8513c2dbfb7d" />
QR Peserta	

## Menu `📝 Konfirmasi Kehadiran`

### Konfirmasi Kehadiran menggunakan Kartu QR Peserta
	- Klik Tombol `📷 Mulai Scanner`
	- Arahkan Kartu QR Peserta ke posisi Kotak QR kamera pada PC/Smartphone sampai tampil pesan `Peserta sudah terkonfirmasi hadir`, dan pada Status Kehadiran yang sebelumnya 
	  `⏳Belum Hadir` menjadi `Hadir`.
	- Jika kamera tidak muncul:
		1. Gunakan Chrome/Edge.
		2. Izinkan akses kamera.
		3. Untuk komputer lokal `127.0.0.1`, kamera dapat digunakan tanpa HTTPS.
		4. Untuk komputer jaringan LAN `192.168.*.*`, kamera tidak bisa digunakan tanpa HTTPS (tidak berfungsi).		
		5. Jika scanner library tidak termuat, periksa koneksi internet karena halaman memuat `html5-qrcode` dari CDN.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/16ee8773-2203-4148-adb9-4231349d6911" />
Konfirmasi Kehadiran menggunakan Kartu QR Peserta

### Konfirmasi kehadiran manual
	- Isikan `Nomor Tiket` pada row input `Nomor Tiket` sebagai alternatif jika scanner tidak tersedia
	- Klik Tombol `✓ Konfirmasi Hadir` sampai tampil pesan `Kehadiran berhasil dikonfirmasi`, dan pada Status Kehadiran  yang sebelumnya `⏳Belum Hadir` menjadi `Hadir`.
	- Klik Tombol `← Dashboard` untuk kembali ke Halaman Dashboard.

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/8addd97f-e4d5-4abb-a942-85664c58fa8d" />
Konfirmasi kehadiran manual	
	
## Menu `📰 Status Peserta`
	- Pada menu Status Peserta digunakan untuk menampilkan status kehadiran peserta `⏳Belum Hadir` / `Hadir`/ `Hadir` `🏆 Sudah Menang`

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/3f242a46-eb9a-4d5e-bdfa-c92083020a4f" />
Status Peserta

## Menu `🎡 Putar Undian`

### Pengaturan Tampilan Undian
	- Klik Tombol `▣ LED / Fullscreen` untuk mengubah ke mode Fullscreen
	- tekan `ESC` untuk keluar dari mode Fullscreen

### Memulai undian
	- Pilih Hadiah salah satu jenis hadiah yang terdapat pada row Pilihan hadiah.
	- Klik Tombol `🔊 Suara ON` untuk mode suara aktif, atau `🔇 Suara OFF` untuk mode suara senyap.
	- Pastikan terdapat status `SIAP`
	- Klik Tombol `🎡 Putar Undian` untuk menentukan Pemenang Undian, tunggu sampai putaran undian berhenti dan pemenang tampil pada layar.
	- Seluruh Pemenang akan tampil pada bagian sisi bawah.
	- Klik Tombol `← Dashboard` untuk kembali ke Halaman Dashboard.	

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/4630716d-3fe1-42e3-bd83-1124e03dccbc" />
Melakukan Pengundian Doorprize

<img width="100%" height="Auto" alt="image" src="https://github.com/user-attachments/assets/99c3210d-df1d-4fb3-ba50-d1740fc6f522" />
Hsil Pemenang Undian Doorprize




	
