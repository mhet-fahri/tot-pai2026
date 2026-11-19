/**
 * Data Resmi Jadwal Pelatihan ToT PAI Kementerian Agama RI (5 Hari)
 * Seluruh Bahan Tayang & Modul berbentuk Presentasi PPT / PPTX
 */

export const SCHEDULE_DAYS = [
  {
    id: 1,
    title: "Hari Ke-1",
    theme: "Kebijakan & Fondasi Pedagogis",
    date: "Senin",
    agenda: [
      { time: "13.00 - 14.30", title: "Pembukaan Resmi ToT", type: "event" },
      { time: "14.30 - 16.30", title: "Kebijakan Direktorat PAI Kementerian Agama RI", type: "session", materialId: "MAT-H1-01" },
      { time: "16.30 - 17.30", title: "Pretest dan Dinamika Kelompok", type: "test", worksheetId: "LK-H1-01" },
      { time: "17.30 - 19.30", title: "ISHOMA (Istirahat, Sholat, Makan)", type: "break" },
      { time: "19.30 - 21.30", title: "Perspektif Ekoteologi dalam Pendidikan Agama Islam", type: "session", materialId: "MAT-H1-02", worksheetId: "LK-H1-02" }
    ]
  },
  {
    id: 2,
    title: "Hari Ke-2",
    theme: "Pedagogi Inovatif, AI & Karakteristik Murid",
    date: "Selasa",
    agenda: [
      { time: "08.00 - 10.00", title: "Kurikulum Berbasis Cinta melalui Pembelajaran Mendalam", type: "session", materialId: "MAT-H2-01" },
      { time: "10.00 - 10.30", title: "Coffee Break", type: "break" },
      { time: "10.30 - 12.30", title: "Praktik Pedagogis STREAM (Science, Technology, Religion, Art, Mathematic)", type: "session", materialId: "MAT-H2-02", worksheetId: "LK-H2-01" },
      { time: "12.30 - 13.30", title: "ISHOMA", type: "break" },
      { time: "13.30 - 15.30", title: "Pemanfaatan Koding dan AI dalam Pengembangan Media Pembelajaran Digital", type: "session", materialId: "MAT-H2-03", worksheetId: "LK-H2-02" },
      { time: "15.30 - 16.00", title: "Orientasi dan Mekanisme ToT", type: "event" },
      { time: "16.00 - 18.00", title: "Perencanaan Pembelajaran: Analisis Karakteristik Murid", type: "session", materialId: "MAT-H2-04", worksheetId: "LK-H2-03" },
      { time: "17.30 - 19.30", title: "ISHOMA", type: "break" },
      { time: "19.30 - 21.30", title: "Perencanaan Pembelajaran: Materi Esensial (Al-Qur'an Hadis, Akidah, Akhlak, Fikih, SKI)", type: "session", materialId: "MAT-H2-05" }
    ]
  },
  {
    id: 3,
    title: "Hari Ke-3",
    theme: "Analisis CP-TP-ATP, Asesmen & Sertifikasi BNSP",
    date: "Rabu",
    agenda: [
      { time: "08.00 - 10.00", title: "Perencanaan Pembelajaran: Analisis CP, TP, ATP dari Materi Esensial (Sesi 1)", type: "session", materialId: "MAT-H3-01", worksheetId: "LK-H3-01" },
      { time: "10.00 - 10.30", title: "Coffee Break", type: "break" },
      { time: "10.30 - 12.30", title: "Perencanaan Pembelajaran: Analisis CP, TP, ATP dari Materi Esensial (Sesi 2)", type: "session", materialId: "MAT-H3-01", worksheetId: "LK-H3-01" },
      { time: "12.30 - 13.30", title: "ISHOMA", type: "break" },
      { time: "13.30 - 15.30", title: "Asesmen Pembelajaran: Materi Esensial (Al-Qur'an Hadis, Akidah, Akhlak, Fikih, SKI)", type: "session", materialId: "MAT-H3-02", worksheetId: "LK-H3-02" },
      { time: "15.30 - 17.30", title: "Berbagi Praktik Baik (Best Practice)", type: "session", materialId: "MAT-H3-03" },
      { time: "17.30 - 19.30", title: "ISHOMA", type: "break" },
      { time: "19.30 - 21.30", title: "Orientasi Sertifikasi BNSP", type: "session", materialId: "MAT-H3-04" }
    ]
  },
  {
    id: 4,
    title: "Hari Ke-4",
    theme: "Simulasi Microteaching & Post Test",
    date: "Kamis",
    agenda: [
      { time: "08.00 - 10.00", title: "Pelaksanaan Pembelajaran: Microteaching (2 Kelas) - Sesi 1", type: "practice", worksheetId: "LK-H4-01" },
      { time: "10.00 - 10.30", title: "Coffee Break", type: "break" },
      { time: "10.30 - 12.30", title: "Pelaksanaan Pembelajaran: Microteaching (2 Kelas) - Sesi 2", type: "practice", worksheetId: "LK-H4-01" },
      { time: "12.30 - 13.30", title: "ISHOMA", type: "break" },
      { time: "13.30 - 15.30", title: "Pelaksanaan Pembelajaran: Microteaching (2 Kelas) - Sesi 3", type: "practice", worksheetId: "LK-H4-01" },
      { time: "15.30 - 17.30", title: "Pelaksanaan Pembelajaran: Microteaching (2 Kelas) - Sesi 4", type: "practice", worksheetId: "LK-H4-01" },
      { time: "17.30 - 19.30", title: "ISHOMA", type: "break" },
      { time: "19.30 - 21.30", title: "Post Test dan Refleksi Akhir Pelatihan", type: "test", worksheetId: "LK-H4-02" }
    ]
  },
  {
    id: 5,
    title: "Hari Ke-5",
    theme: "Sertifikasi & Penutupan",
    date: "Jumat",
    agenda: [
      { time: "08.00 - 10.00", title: "Pengumuman Kelulusan & Verifikasi Sertifikasi BNSP", type: "session", materialId: "MAT-H5-01" },
      { time: "10.00 - 10.30", title: "Upacara Penutupan Resmi ToT PAI", type: "event" }
    ]
  }
];

export const INITIAL_MATERIALS = [
  // Hari 1
  {
    material_id: "MAT-H1-01",
    day: 1,
    title: "Kebijakan Direktorat PAI Kementerian Agama RI",
    description: "Slide paparan arah kebijakan kurikulum, moderasi beragama, dan standardisasi kompetensi guru PAI.",
    file_type: "PPTX",
    file_size: "14.2 MB",
    url: "https://docs.google.com/presentation/d/placeholder-kemenag",
    order_index: 1
  },
  {
    material_id: "MAT-H1-02",
    day: 1,
    title: "Perspektif Ekoteologi dalam Pendidikan Agama Islam",
    description: "Slide modul integrasi nilai pelestarian lingkungan dan teologi Islam dalam materi kelas.",
    file_type: "PPTX",
    file_size: "9.8 MB",
    url: "https://docs.google.com/presentation/d/placeholder-ekoteologi",
    order_index: 2
  },

  // Hari 2
  {
    material_id: "MAT-H2-01",
    day: 2,
    title: "Kurikulum Berbasis Cinta melalui Pembelajaran Mendalam (Deep Learning)",
    description: "Slide presentasi pendekatan pedagogis holistik berbasis kasih sayang dan kebermaknaan belajar.",
    file_type: "PPTX",
    file_size: "11.5 MB",
    url: "https://docs.google.com/presentation/d/placeholder-kurikulum-cinta",
    order_index: 1
  },
  {
    material_id: "MAT-H2-02",
    day: 2,
    title: "Praktik Pedagogis STREAM (Science, Technology, Religion, Art, Mathematic)",
    description: "Slide model integrasi multidisiplin STREAM yang berakar pada nilai-nilai keagamaan Islam.",
    file_type: "PPTX",
    file_size: "16.4 MB",
    url: "https://docs.google.com/presentation/d/placeholder-stream",
    order_index: 2
  },
  {
    material_id: "MAT-H2-03",
    day: 2,
    title: "Pemanfaatan Koding & AI dalam Media Digital berorientasi Learners Agency",
    description: "Slide panduan rekayasa prompt AI generatif dan konsep logika koding sederhana guru PAI.",
    file_type: "PPTX",
    file_size: "18.1 MB",
    url: "https://docs.google.com/presentation/d/placeholder-ai-pembelajaran",
    order_index: 3
  },
  {
    material_id: "MAT-H2-04",
    day: 2,
    title: "Panduan Analisis Karakteristik Murid & Gaya Belajar",
    description: "Slide instrumen asesmen diagnostik non-kognitif dan pemetaan modalitas belajar peserta didik.",
    file_type: "PPTX",
    file_size: "8.7 MB",
    url: "https://docs.google.com/presentation/d/placeholder-karakteristik-murid",
    order_index: 4
  },
  {
    material_id: "MAT-H2-05",
    day: 2,
    title: "Peta Materi Esensial PAI (Al-Qur'an Hadis, Akidah, Akhlak, Fikih, SKI)",
    description: "Slide pemetaan materi esensial 5 rumpun keilmuan PAI untuk penguatan konsep fundamental.",
    file_type: "PPTX",
    file_size: "22.3 MB",
    url: "https://docs.google.com/presentation/d/placeholder-materi-esensial",
    order_index: 5
  },

  // Hari 3
  {
    material_id: "MAT-H3-01",
    day: 3,
    title: "Panduan Penurunan CP menjadi TP dan Alur Tujuan Pembelajaran (ATP)",
    description: "Slide metodologi analisis Capaian Pembelajaran menuju Tujuan Pembelajaran kontekstual.",
    file_type: "PPTX",
    file_size: "15.6 MB",
    url: "https://docs.google.com/presentation/d/placeholder-cp-tp-atp",
    order_index: 1
  },
  {
    material_id: "MAT-H3-02",
    day: 3,
    title: "Instrumen Asesmen Diagnostik, Formatif & Sumatif Materi PAI",
    description: "Slide panduan penyusunan rubrik autentik dan soal penalaran tingkat tinggi (HOTS).",
    file_type: "PPTX",
    file_size: "13.4 MB",
    url: "https://docs.google.com/presentation/d/placeholder-asesmen-pai",
    order_index: 2
  },
  {
    material_id: "MAT-H3-03",
    day: 3,
    title: "Kompilasi Praktik Baik (Best Practice) Guru PAI Inspiratif",
    description: "Slide studi kasus inovasi pembelajaran dan diferensiasi kelas di berbagai sekolah.",
    file_type: "PPTX",
    file_size: "19.2 MB",
    url: "https://docs.google.com/presentation/d/placeholder-best-practice",
    order_index: 3
  },
  {
    material_id: "MAT-H3-04",
    day: 3,
    title: "Pedoman Teknis & Skema Uji Sertifikasi Kompetensi BNSP",
    description: "Slide persyaratan portofolio bukti kerja, standar unit kompetensi, dan mekanisme asesmen BNSP.",
    file_type: "PPTX",
    file_size: "10.5 MB",
    url: "https://docs.google.com/presentation/d/placeholder-bnsp",
    order_index: 4
  },

  // Hari 5
  {
    material_id: "MAT-H5-01",
    day: 5,
    title: "Panduan Kelulusan & Pengambilan Sertifikat Kompetensi BNSP",
    description: "Slide tahapan verifikasi berkas pasca-ToT dan rencana tindak lanjut (RTL) di daerah.",
    file_type: "PPTX",
    file_size: "7.1 MB",
    url: "https://docs.google.com/presentation/d/placeholder-sertifikasi",
    order_index: 1
  }
];

export const INITIAL_WORKSHEETS = [
  // Hari 1
  {
    worksheet_id: "LK-H1-01",
    day: 1,
    title: "LK 1.1: Lembar Pretest & Refleksi Awal Dinamika Kelompok",
    instructions: "Isi asesmen awal pemahaman konsep moderasi beragama dan identifikasi peran tim.",
    template_url: "https://docs.google.com/document/d/placeholder-template-pretest",
    deadline: "Hari Ke-1 • 17.30 WIB"
  },
  {
    worksheet_id: "LK-H1-02",
    day: 1,
    title: "LK 1.2: Matriks Desain Pembelajaran Berperspektif Ekoteologi",
    instructions: "Rancang 1 skenario pembelajaran PAI yang mengintegrasikan kesadaran lingkungan dan teologi Islam.",
    template_url: "https://docs.google.com/document/d/placeholder-template-ekoteologi",
    deadline: "Hari Ke-1 • 21.30 WIB"
  },

  // Hari 2
  {
    worksheet_id: "LK-H2-01",
    day: 2,
    title: "LK 2.1: Desain Modul Ajar Pendekatan STREAM PAI",
    instructions: "Susun sintaks pembelajaran STREAM yang mengaitkan fenomena sains dengan dalil naqli.",
    template_url: "https://docs.google.com/document/d/placeholder-template-stream",
    deadline: "Hari Ke-2 • 12.30 WIB"
  },
  {
    worksheet_id: "LK-H2-02",
    day: 2,
    title: "LK 2.2: Portofolio Media Pembelajaran Berbantuan AI & Koding",
    instructions: "Unggah bukti tautan media/kuis digital atau prompt engineering AI yang dirancang untuk murid.",
    template_url: "https://docs.google.com/document/d/placeholder-template-ai",
    deadline: "Hari Ke-2 • 15.30 WIB"
  },
  {
    worksheet_id: "LK-H2-03",
    day: 2,
    title: "LK 2.3: Pemetaan Profil & Karakteristik Murid Rumpun PAI",
    instructions: "Lakukan analisis diagnostik awal gaya belajar murid sesuai rumpun mata pelajaran esensial yang diampu.",
    template_url: "https://docs.google.com/document/d/placeholder-template-karakteristik",
    deadline: "Hari Ke-2 • 18.00 WIB"
  },

  // Hari 3
  {
    worksheet_id: "LK-H3-01",
    day: 3,
    title: "LK 3.1: Matriks Penurunan CP - TP - ATP Materi Esensial PAI",
    instructions: "Turunkan Capaian Pembelajaran (CP) menjadi Tujuan Pembelajaran (TP) dan Alur (ATP) rumpun esensial.",
    template_url: "https://docs.google.com/document/d/placeholder-template-cp-tp-atp",
    deadline: "Hari Ke-3 • 12.30 WIB"
  },
  {
    worksheet_id: "LK-H3-02",
    day: 3,
    title: "LK 3.2: Perancangan Instrumen Asesmen Autentik PAI",
    instructions: "Rancang instrumen asesmen formatif & sumatif lengkap dengan kisi-kisi dan rubrik kriteria ketercapaian.",
    template_url: "https://docs.google.com/document/d/placeholder-template-asesmen",
    deadline: "Hari Ke-3 • 17.30 WIB"
  },

  // Hari 4
  {
    worksheet_id: "LK-H4-01",
    day: 4,
    title: "LK 4.1: Rencana Pelaksanaan Pembelajaran (RPP) Microteaching",
    instructions: "Unggah dokumen perangkat persiapan simulasi mengajar (15-20 menit) di depan observer kelas.",
    template_url: "https://docs.google.com/document/d/placeholder-template-microteaching",
    deadline: "Hari Ke-4 • 08.00 WIB"
  },
  {
    worksheet_id: "LK-H4-02",
    day: 4,
    title: "LK 4.2: Lembar Post Test & Refleksi Mandiri Peserta",
    instructions: "Kumpulkan hasil pengerjaan evaluasi akhir dan lembar refleksi tindak lanjut pasca-pelatihan.",
    template_url: "https://docs.google.com/document/d/placeholder-template-posttest",
    deadline: "Hari Ke-4 • 21.30 WIB"
  }
];
