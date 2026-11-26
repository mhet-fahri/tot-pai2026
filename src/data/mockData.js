/**
 * Data Resmi Jadwal Pelatihan ToT PAI Kementerian Agama RI (4 Hari)
 * Sumber: rev_Jadwal Pelatihan.xlsx (Sheet: Jadwal Rev)
 * 
 * Narasumber & Fasilitator resmi terbagi per sesi dan kelas.
 */

export const SCHEDULE_DAYS = [
  {
    id: 1,
    title: "Hari Ke-1",
    theme: "Pembukaan, Sertifikasi BNSP & Perspektif Ekoteologi",
    date: "Kamis",
    agenda: [
      {
        time: "13.00 - 14.30",
        jp: 2,
        title: "Pembukaan dan Orientasi Sertifikasi BNSP",
        type: "session",
        materialId: "MAT-H1-01",
        narasumber: "Karvin Fadila",
        fasilitator: ["Salamah Agung, M.A., Ph.D.", "Nur Luthfi Rizqa H, M.Pd."]
      },
      {
        time: "14.30 - 16.30",
        jp: 2,
        title: "Kebijakan Direktorat PAI Kementerian Agama RI (Sesi Awal)",
        type: "session"
      },
      {
        time: "16.30 - 18.30",
        jp: 2,
        title: "Pretest dan Dinamika Kelompok",
        type: "test",
        worksheetId: "LK-H1-01",
        narasumber: "Fajar Pinastia, M.Pd.",
        fasilitator: ["Afif Faizin, M.Pd.", "Reza Ruhbani Amarulloh, M.Pd."]
      },
      {
        time: "18.30 - 19.00",
        title: "ISHOMA (Istirahat, Sholat, Makan)",
        type: "break"
      },
      {
        time: "19.00 - 20.00",
        title: "Kebijakan Direktorat PAI Kementerian Agama RI",
        type: "session",
        materialId: "MAT-H1-02",
        narasumber: "Direktur PAI",
        fasilitator: ["Prof Siti Nurul Azkiyah, M.Sc., Ph.D"]
      },
      {
        time: "20.00 - 22.00",
        jp: 2,
        title: "Perspektif Ekoteologi dalam Pendidikan Agama Islam",
        type: "session",
        materialId: "MAT-H1-03",
        worksheetId: "LK-H1-02",
        narasumber: "Prof. Muhammad Zuhdi, M.Ed., Ph.D.",
        fasilitator: ["Bobi Erno Rusadi, M.Pd.I", "Afif Faizin, M.Pd."]
      }
    ]
  },
  {
    id: 2,
    title: "Hari Ke-2",
    theme: "Pedagogi Inovatif, STREAM, AI & Materi Esensial",
    date: "Jumat",
    agenda: [
      {
        time: "08.00 - 10.00",
        jp: 2,
        title: "Kurikulum Berbasis Cinta melalui Pembelajaran Mendalam",
        type: "session",
        materialId: "MAT-H2-01",
        narasumber: "Nur Luthfi Rizqa H, M.Pd.",
        fasilitator: ["Salamah Agung, M.A., Ph.D.", "Afif Faizin, M.Pd."]
      },
      {
        time: "10.00 - 10.30",
        title: "Coffee Break",
        type: "break"
      },
      {
        time: "10.30 - 12.30",
        jp: 2,
        title: "Praktik Pedagogis STREAM (Science, Technology, Religion, Art, Mathematic)",
        type: "session",
        materialId: "MAT-H2-02",
        worksheetId: "LK-H2-01",
        narasumber: "Prof.Zulfiani, M.Si",
        fasilitator: ["Dr. Yanti Herlanti, M.Pd.", "Miesya Wardani, M.Si"]
      },
      {
        time: "12.30 - 13.30",
        title: "ISHOMA",
        type: "break"
      },
      {
        time: "13.30 - 15.30",
        jp: 2,
        title: "Pemanfaatan Koding dan Artifisial Intelijen (AI) dalam Pengembangan Media Pembelajaran Digital berorientasi Learners Agency",
        type: "session",
        materialId: "MAT-H2-03",
        worksheetId: "LK-H2-02",
        narasumber: "Reza Ruhbani Amarulloh, M.Pd.",
        fasilitator: ["Muhammad Fahri, M.Pd.", "Sulthan Hadist I.C., M.Pd."]
      },
      {
        time: "15.30 - 16.00",
        title: "Orientasi dan Mekanisme ToT",
        type: "event"
      },
      {
        time: "16.00 - 18.00",
        jp: 2,
        title: "Perencanaan Pembelajaran: Analisis Karakteristik Murid",
        type: "session",
        materialId: "MAT-H2-04",
        worksheetId: "LK-H2-03",
        narasumber: "Salamah Agung, M.A., Ph.D.",
        fasilitator: ["Rizal Mahfuzo, Ph.D.", "Nur Luthfi Rizqa H, M.Pd."]
      },
      {
        time: "17.30 - 19.30",
        title: "ISHOMA",
        type: "break"
      },
      {
        time: "19.30 - 21.30",
        jp: 2,
        title: "Perencanaan Pembelajaran: Materi Esensial (Al-Qur'an dan Hadis, Akidah, Akhlak, Fikih, Sejarah Peradaban Islam)",
        type: "session",
        materialId: "MAT-H2-05",
        narasumber: "Bobi Erno Rusadi, M.Pd.I",
        fasilitator: ["Ridholloh, M.Pd.I", "Hani Hilyati, M.Pd"]
      }
    ]
  },
  {
    id: 3,
    title: "Hari Ke-3",
    theme: "Analisis CP-TP-ATP, Asesmen & Best Practice",
    date: "Sabtu",
    agenda: [
      {
        time: "08.00 - 10.00",
        jp: 2,
        title: "Perencanaan Pembelajaran: Analisis CP, TP, ATP dari Materi Esensial (Sesi 1)",
        type: "session",
        materialId: "MAT-H3-01",
        worksheetId: "LK-H3-01",
        narasumber: "Dr. Yudhi Munadhi, M.Pd.",
        fasilitator: ["Ridholloh, M.Pd.I", "Hani Hilyati, M.Pd"]
      },
      {
        time: "10.00 - 10.30",
        title: "Coffee Break",
        type: "break"
      },
      {
        time: "10.30 - 12.30",
        jp: 2,
        title: "Perencanaan Pembelajaran: Analisis CP, TP, ATP dari Materi Esensial (Sesi 2)",
        type: "session",
        materialId: "MAT-H3-01",
        worksheetId: "LK-H3-01",
        narasumber: "Ridholloh, M.Pd.I",
        fasilitator: ["Bobi Erno Rusadi, M.Pd.I", "Hani Hilyati, M.Pd"]
      },
      {
        time: "12.30 - 13.30",
        title: "ISHOMA",
        type: "break"
      },
      {
        time: "13.30 - 15.30",
        jp: 2,
        title: "Asesmen Pembelajaran: Materi Esensial (Al-Qur'an dan Hadis, Akidah, Akhlak, Fikih, Sejarah Peradaban Islam)",
        type: "session",
        materialId: "MAT-H3-02",
        worksheetId: "LK-H3-02",
        narasumber: "Rizal Mahfuzo, Ph.D.",
        fasilitator: ["Fajar Pinastia, M.Pd.", "Muhammad Fahri, M.Pd."]
      },
      {
        time: "15.30 - 17.30",
        jp: 2,
        title: "Berbagi Praktik Baik (Best Practice)",
        type: "session",
        materialId: "MAT-H3-03",
        narasumber: "Prof. Dr. Mahsusi, M.M",
        fasilitator: ["Fajar Pinastia, M.Pd.", "Rizal Mahfuzo, Ph.D."]
      },
      {
        time: "17.30 - 19.30",
        title: "ISHOMA",
        type: "break"
      },
      {
        time: "19.30 - 21.30",
        jp: 2,
        title: "Post Test dan Refleksi",
        type: "test",
        worksheetId: "LK-H3-03",
        narasumber: "Karvin Fadila",
        fasilitator: ["Rizal Mahfuzo, Ph.D.", "Fajar Pinastia, M.Pd."]
      }
    ]
  },
  {
    id: 4,
    title: "Hari Ke-4",
    theme: "Simulasi Microteaching & Pengumuman Sertifikasi",
    date: "Minggu",
    agenda: [
      {
        time: "08.00 - 10.00",
        jp: 2,
        title: "Pelaksanaan Pembelajaran: Microteaching (Sesi 1 - 2 Kelas)",
        type: "practice",
        worksheetId: "LK-H4-01",
        timPenguji: {
          kelas1: ["Salamah Agung, M.A., Ph.D.", "Nur Luthfi Rizqa H, M.Pd.", "Dr. Yanti Herlanti, M.Pd."],
          kelas2: ["Prof.Zulfiani, M.Si", "Miesya Wardani, M.Si", "Reza Ruhbani Amarulloh, M.Pd."],
          fasilitatorPendamping: ["Ridholloh, M.Pd.I", "Bobi Erno Rusadi, M.Pd.I", "Hani Hilyati, M.Pd", "Sulthan Hadist I.C., M.Pd.", "Afif Faizin, M.Pd.", "Muhammad Fahri, M.Pd."]
        }
      },
      {
        time: "10.00 - 10.30",
        jp: 2,
        title: "Pelaksanaan Pembelajaran: Microteaching (Sesi 2 - 2 Kelas)",
        type: "practice",
        worksheetId: "LK-H4-01",
        timPenguji: {
          kelas1: ["Salamah Agung, M.A., Ph.D.", "Nur Luthfi Rizqa H, M.Pd.", "Dr. Yanti Herlanti, M.Pd."],
          kelas2: ["Prof.Zulfiani, M.Si", "Miesya Wardani, M.Si", "Reza Ruhbani Amarulloh, M.Pd."],
          fasilitatorPendamping: ["Ridholloh, M.Pd.I", "Bobi Erno Rusadi, M.Pd.I", "Hani Hilyati, M.Pd", "Sulthan Hadist I.C., M.Pd.", "Afif Faizin, M.Pd.", "Muhammad Fahri, M.Pd."]
        }
      },
      {
        time: "10.30 - 12.30",
        jp: 2,
        title: "Pengumuman Sertifikasi & Penutupan",
        type: "session",
        materialId: "MAT-H4-01",
        narasumber: "Sulthan Hadist I.C., M.Pd.",
        fasilitator: ["Afif Faizin, M.Pd.", "Miesya Wardani, M.Si"]
      }
    ]
  }
];

export const INITIAL_MATERIALS = [
  // Hari 1 - Kamis
  {
    material_id: "MAT-H1-01",
    day: 1,
    title: "Orientasi Sertifikasi BNSP",
    description: "Slide pedoman teknis persyaratan asesmen uji kompetensi kerja skema BNSP bagi Guru PAI.",
    narasumber: "Karvin Fadila",
    file_type: "PPTX",
    file_size: "10.5 MB",
    url: "https://docs.google.com/presentation/d/placeholder-bnsp",
    order_index: 1
  },
  {
    material_id: "MAT-H1-02",
    day: 1,
    title: "Kebijakan Direktorat PAI Kementerian Agama RI",
    description: "Slide arah kebijakan penguatan kompetensi guru, moderasi beragama, dan transformasi digital pendidikan Islam.",
    narasumber: "Direktur PAI & Prof Siti Nurul Azkiyah, M.Sc., Ph.D",
    file_type: "PPTX",
    file_size: "14.2 MB",
    url: "https://docs.google.com/presentation/d/placeholder-kemenag",
    order_index: 2
  },
  {
    material_id: "MAT-H1-03",
    day: 1,
    title: "Perspektif Ekoteologi dalam Pendidikan Agama Islam",
    description: "Slide integrasi nilai-nilai pelestarian lingkungan hidup berbasis ajaran teologi Islam ke dalam proses pembelajaran.",
    narasumber: "Prof. Muhammad Zuhdi, M.Ed., Ph.D.",
    file_type: "PPTX",
    file_size: "9.8 MB",
    url: "https://docs.google.com/presentation/d/placeholder-ekoteologi",
    order_index: 3
  },

  // Hari 2 - Jumat
  {
    material_id: "MAT-H2-01",
    day: 2,
    title: "Kurikulum Berbasis Cinta melalui Pembelajaran Mendalam (Deep Learning)",
    description: "Slide pendekatan pedagogis holistik berbasis kasih sayang dan keterlibatan aktif peserta didik.",
    narasumber: "Nur Luthfi Rizqa H, M.Pd.",
    file_type: "PPTX",
    file_size: "11.5 MB",
    url: "https://docs.google.com/presentation/d/placeholder-kurikulum-cinta",
    order_index: 1
  },
  {
    material_id: "MAT-H2-02",
    day: 2,
    title: "Praktik Pedagogis STREAM (Science, Technology, Religion, Art, Mathematic)",
    description: "Slide model integrasi kurikulum multidisiplin STREAM yang bersinergi dengan materi PAI.",
    narasumber: "Prof.Zulfiani, M.Si",
    file_type: "PPTX",
    file_size: "16.4 MB",
    url: "https://docs.google.com/presentation/d/placeholder-stream",
    order_index: 2
  },
  {
    material_id: "MAT-H2-03",
    day: 2,
    title: "Pemanfaatan Koding & AI dalam Media Pembelajaran Digital (Learners Agency)",
    description: "Slide rekayasa prompt AI generatif dan pemanfaatan koding untuk mendorong agensi dan kemandirian belajar murid.",
    narasumber: "Reza Ruhbani Amarulloh, M.Pd.",
    file_type: "PPTX",
    file_size: "18.1 MB",
    url: "https://docs.google.com/presentation/d/placeholder-ai-pembelajaran",
    order_index: 3
  },
  {
    material_id: "MAT-H2-04",
    day: 2,
    title: "Perencanaan Pembelajaran: Analisis Karakteristik Murid",
    description: "Slide diagnostik gaya belajar, minat, dan pemetaan kesiapan peserta didik.",
    narasumber: "Salamah Agung, M.A., Ph.D.",
    file_type: "PPTX",
    file_size: "8.7 MB",
    url: "https://docs.google.com/presentation/d/placeholder-karakteristik-murid",
    order_index: 4
  },
  {
    material_id: "MAT-H2-05",
    day: 2,
    title: "Perencanaan Pembelajaran: Materi Esensial Rumpun PAI",
    description: "Slide bedah materi esensial Al-Qur'an & Hadis, Akidah, Akhlak, Fikih, serta Sejarah Peradaban Islam.",
    narasumber: "Bobi Erno Rusadi, M.Pd.I",
    file_type: "PPTX",
    file_size: "22.3 MB",
    url: "https://docs.google.com/presentation/d/placeholder-materi-esensial",
    order_index: 5
  },

  // Hari 3 - Sabtu
  {
    material_id: "MAT-H3-01",
    day: 3,
    title: "Analisis CP, TP, ATP dari Materi Esensial PAI",
    description: "Slide metodologi penurunan Capaian Pembelajaran (CP) ke Tujuan Pembelajaran (TP) & Alur Tujuan Pembelajaran (ATP).",
    narasumber: "Dr. Yudhi Munadhi, M.Pd. & Ridholloh, M.Pd.I",
    file_type: "PPTX",
    file_size: "15.6 MB",
    url: "https://docs.google.com/presentation/d/placeholder-cp-tp-atp",
    order_index: 1
  },
  {
    material_id: "MAT-H3-02",
    day: 3,
    title: "Asesmen Pembelajaran: Materi Esensial Rumpun PAI",
    description: "Slide panduan perancangan asesmen autentik (diagnostik, formatif, dan sumatif) berbasis HOTS.",
    narasumber: "Rizal Mahfuzo, Ph.D.",
    file_type: "PPTX",
    file_size: "13.4 MB",
    url: "https://docs.google.com/presentation/d/placeholder-asesmen-pai",
    order_index: 2
  },
  {
    material_id: "MAT-H3-03",
    day: 3,
    title: "Berbagi Praktik Baik (Best Practice) Inovasi Pembelajaran PAI",
    description: "Slide inspirasi implementasi strategi pengajaran inovatif dari narasumber pakar.",
    narasumber: "Prof. Dr. Mahsusi, M.M",
    file_type: "PPTX",
    file_size: "19.2 MB",
    url: "https://docs.google.com/presentation/d/placeholder-best-practice",
    order_index: 3
  },

  // Hari 4 - Minggu
  {
    material_id: "MAT-H4-01",
    day: 4,
    title: "Pedoman Teknis Pengumuman Sertifikasi & Penutupan",
    description: "Slide ketentuan pasca-ToT, rekapitulasi nilai kompetensi, dan tindak lanjut penerbitan sertifikat.",
    narasumber: "Sulthan Hadist I.C., M.Pd.",
    file_type: "PPTX",
    file_size: "7.1 MB",
    url: "https://docs.google.com/presentation/d/placeholder-sertifikasi",
    order_index: 1
  }
];

export const INITIAL_WORKSHEETS = [
  // Hari 1 - Kamis
  {
    worksheet_id: "LK-H1-01",
    day: 1,
    title: "LK 1.1: Pretest dan Dinamika Kelompok",
    instructions: "Kerjakan asesmen awal instrumen pretest pemahaman kompetensi dan lembar komitmen dinamika kelompok.",
    narasumber: "Fajar Pinastia, M.Pd.",
    fasilitator: "Afif Faizin, M.Pd. & Reza Ruhbani Amarulloh, M.Pd.",
    template_url: "https://exampro-7xj.pages.dev/",
    deadline: "Hari Ke-1 • 18.30 WIB"
  },
  {
    worksheet_id: "LK-H1-02",
    day: 1,
    title: "LK 1.2: Matriks Desain Pembelajaran Berperspektif Ekoteologi",
    instructions: "Susun skenario integrasi pelestarian lingkungan berbasis ajaran Islam ke dalam rancangan pembelajaran PAI.",
    narasumber: "Prof. Muhammad Zuhdi, M.Ed., Ph.D.",
    fasilitator: "Bobi Erno Rusadi, M.Pd.I & Afif Faizin, M.Pd.",
    template_url: "https://docs.google.com/document/d/placeholder-template-ekoteologi",
    deadline: "Hari Ke-1 • 22.00 WIB"
  },

  // Hari 2 - Jumat
  {
    worksheet_id: "LK-H2-01",
    day: 2,
    title: "LK 2.1: Praktik Pedagogis STREAM dalam Pembelajaran PAI",
    instructions: "Rancang sintaks dan lembar aktivitas belajar murid berbasis model pendekatan STREAM.",
    narasumber: "Prof.Zulfiani, M.Si",
    fasilitator: "Dr. Yanti Herlanti, M.Pd. & Miesya Wardani, M.Si",
    template_url: "https://docs.google.com/document/d/placeholder-template-stream",
    deadline: "Hari Ke-2 • 12.30 WIB"
  },
  {
    worksheet_id: "LK-H2-02",
    day: 2,
    title: "LK 2.2: Media Pembelajaran Digital Berbantuan Koding & AI",
    instructions: "Unggah dokumen prompt AI terstruktur atau prototipe media digital yang mengaktifkan learners agency murid.",
    narasumber: "Reza Ruhbani Amarulloh, M.Pd.",
    fasilitator: "Muhammad Fahri, M.Pd. & Sulthan Hadist I.C., M.Pd.",
    template_url: "https://docs.google.com/document/d/placeholder-template-ai",
    deadline: "Hari Ke-2 • 15.30 WIB"
  },
  {
    worksheet_id: "LK-H2-03",
    day: 2,
    title: "LK 2.3: Analisis Profil & Karakteristik Belajar Murid",
    instructions: "Lakukan pemetaan kebutuhan belajar dan gaya belajar peserta didik pada rumpun materi esensial PAI.",
    narasumber: "Salamah Agung, M.A., Ph.D.",
    fasilitator: "Rizal Mahfuzo, Ph.D. & Nur Luthfi Rizqa H, M.Pd.",
    template_url: "https://docs.google.com/document/d/placeholder-template-karakteristik",
    deadline: "Hari Ke-2 • 18.00 WIB"
  },

  // Hari 3 - Sabtu
  {
    worksheet_id: "LK-H3-01",
    day: 3,
    title: "LK 3.1: Matriks Penurunan CP - TP - ATP Materi Esensial PAI",
    instructions: "Turunkan Capaian Pembelajaran rumpun PAI ke dalam rumusan TP dan alur logis ATP kurikulum merdeka.",
    narasumber: "Dr. Yudhi Munadhi, M.Pd. & Ridholloh, M.Pd.I",
    fasilitator: "Ridholloh, M.Pd.I, Bobi Erno Rusadi, M.Pd.I & Hani Hilyati, M.Pd",
    template_url: "https://docs.google.com/document/d/placeholder-template-cp-tp-atp",
    deadline: "Hari Ke-3 • 12.30 WIB"
  },
  {
    worksheet_id: "LK-H3-02",
    day: 3,
    title: "LK 3.2: Perancangan Instrumen Asesmen Autentik PAI",
    instructions: "Susun rubrik asesmen, kisi-kisi soal penalaran kontekstual, dan instrumen observasi afektif siswa.",
    narasumber: "Rizal Mahfuzo, Ph.D.",
    fasilitator: "Fajar Pinastia, M.Pd. & Muhammad Fahri, M.Pd.",
    template_url: "https://docs.google.com/document/d/placeholder-template-asesmen",
    deadline: "Hari Ke-3 • 15.30 WIB"
  },
  {
    worksheet_id: "LK-H3-03",
    day: 3,
    title: "LK 3.3: Post Test dan Refleksi Akhir Pelatihan",
    instructions: "Isi evaluasi post test pemahaman kompetensi dan instrumen refleksi mandiri hasil ToT.",
    narasumber: "Karvin Fadila",
    fasilitator: "Rizal Mahfuzo, Ph.D. & Fajar Pinastia, M.Pd.",
    template_url: "https://docs.google.com/document/d/placeholder-template-posttest",
    deadline: "Hari Ke-3 • 21.30 WIB"
  },

  // Hari 4 - Minggu
  {
    worksheet_id: "LK-H4-01",
    day: 4,
    title: "LK 4.1: Rencana Pembelajaran (Modul Ajar) Microteaching",
    instructions: "Unggah Modul Ajar / RPP lengkap yang siap disimulasikan pada sesi praktik Microteaching 2 Kelas di hadapan asesor & fasilitator.",
    narasumber: "Tim Penguji Microteaching (2 Kelas)",
    fasilitator: "Salamah Agung, Ph.D., Prof.Zulfiani, Dr. Yanti Herlanti, Miesya Wardani, M.Si, Reza Ruhbani, dkk.",
    template_url: "https://docs.google.com/document/d/placeholder-template-microteaching",
    deadline: "Hari Ke-4 • 08.00 WIB"
  }
];
