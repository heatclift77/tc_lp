document.addEventListener("DOMContentLoaded", () => {
  const tabComponent = document.querySelector(".tab-component-01");
  if (!tabComponent) return;

  const tabHeaders = tabComponent.querySelectorAll("ul li h2");
  const tabContents = tabComponent.querySelectorAll(
    ".tab-component-01-subcontent",
  );

  tabHeaders.forEach((header, index) => {
    header.addEventListener("click", () => {
      console.log("onclick trigered");
      tabHeaders.forEach((h) => h.classList.remove("tab-component-01-active"));
      tabContents.forEach((c) =>
        c.classList.remove("tab-component-01-subcontent-active"),
      );

      header.classList.add("tab-component-01-active");

      if (tabContents[index]) {
        tabContents[index].classList.add("tab-component-01-subcontent-active");
      }
    });
  });

  // 1. Tangkap elemen tombol dan container menu overlay
  const menuBtn = document.querySelector(".mobile-close");

  // Menangkap div overlay menu (div kedua di dalam HTML)
  const menuOverlay = document.querySelector(
    'div[style*="position: fixed"][style*="z-index: 100"]',
  );

  // Tangkap semua link di dalam menu agar menu otomatis tertutup saat link diklik
  const menuItems = document.querySelectorAll(".mobile-menu-item");

  if (!menuBtn || !menuOverlay) {
    console.error("Elemen menu tidak ditemukan!");
    return;
  }

  // 2. Buat fungsi Toggle Menu
  function toggleMenu(e) {
    if (e) e.preventDefault(); // Mencegah scroll ke atas karena tag <a>

    // Periksa apakah menu sedang terbuka
    const isOpen =
      menuOverlay.style.top === "0px" || menuOverlay.style.top === "0";

    if (isOpen) {
      // Jika terbuka, sembunyikan kembali
      menuOverlay.style.top = "-110%";
      menuBtn.textContent = "Menu";
    } else {
      // Jika tertutup, tampilkan (turunkan ke top: 0)
      menuOverlay.style.top = "0";
      menuBtn.textContent = "Close";
    }
  }

  // 3. Pasang Event Listener pada Tombol Menu
  menuBtn.addEventListener("click", toggleMenu);

  // 4. (Opsional) Tutup menu ketika salah satu link diklik
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuOverlay.style.top = "-100%";
      menuBtn.textContent = "Menu";
    });
  });

  // 1. Ambil elemen gambar berdasarkan ID
  const imgElement1 = document.getElementById("section_01_bg");
  const imgElement5 = document.getElementById("section_05_bg");

  // 2. Buat media query breakpoint (Misal: 768px untuk batas Tablet/Desktop)
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  // 3. Fungsi untuk mengganti src gambar
  function updateImageSource(e) {
    if (e.matches) {
      // Jika viewport >= 768px (Desktop / Tablet)
      imgElement1.style.backgroundImage = "url('images/bg_aurora_04.jpg')";
      imgElement5.style.backgroundImage = "url('images/bg_aurora_08.jpg')";
    } else {
      // Jika viewport < 768px (Mobile)
      imgElement1.style.backgroundImage = "url('images/bg_aurora_06.jpg')";
      imgElement5.style.backgroundImage = "url('images/bg_aurora_07.jpg')";
    }
  }

  // 4. Jalankan fungsi sekali saat pertama kali halaman di-load
  updateImageSource(mediaQuery);

  // 5. Tambahkan listener agar otomatis berubah saat layar di-resize
  mediaQuery.addEventListener("change", updateImageSource);

  // Mengambil elemen navbar
  const navbar = document.getElementById("navbar-desktop");

  // Mendengarkan event scroll pada window
  window.addEventListener("scroll", () => {
    // Jika posisi scroll lebih besar dari 50px dari atas
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled-bg-navbar");
    } else {
      navbar.classList.remove("scrolled-bg-navbar");
    }
  });

  // slider
  const track = document.getElementById("sliderTrack");
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const paginationContainer = document.getElementById("pagination");

  let currentIndex = 0;
  const totalSlides = slides.length;

  // 1. Buat Indikator Titik (Pagination Dots)
  function createDots() {
    paginationContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      paginationContainer.appendChild(dot);
    });
  }

  // 2. Fungsi Pindah ke Slide Tertentu
  function goToSlide(index) {
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updatePagination();
  }

  // 3. Update Status Active Titik Pagination
  function updatePagination() {
    const dots = Array.from(paginationContainer.children);
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // 4. Handler Tombol Next & Prev
  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0); // Loop kembali ke slide pertama
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(totalSlides - 1); // Loop ke slide terakhir
    }
  });

  // Inisialisasi awal
  createDots();
});
