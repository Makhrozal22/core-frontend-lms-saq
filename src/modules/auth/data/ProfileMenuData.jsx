import { User, Phone, Shield, Settings, Bell, HelpCircle, Users } from "lucide-react";

export const getProfileMenuGroups = ({
  childrenCount,
  loadingChildren,
  parentPhone,
  navigate,
  showModal,
  openChildrenSheet,
}) => [
  {
    title: "Akun",
    items: [
      {
        icon: User,
        label: "Data Pribadi",
        sub: "Lihat dan edit profil",
        action: () => showModal("Data Pribadi", "Fitur untuk melihat dan merubah data pribadi Anda sedang dalam tahap pengembangan."),
      },
      {
        icon: Users,
        label: "Daftar Anak",
        sub: loadingChildren ? "Memuat data..." : `${childrenCount} anak terdaftar`,
        action: openChildrenSheet,
      },
      {
        icon: Phone,
        label: "Ubah Nomor HP",
        sub: parentPhone || "-",
        action: () => showModal("Ubah Nomor HP", "Fitur ubah nomor WhatsApp utama akan segera aktif pada pembaruan berikutnya."),
      },
    ],
  },
  {
    title: "Pengaturan",
    items: [
      {
        icon: Bell,
        label: "Notifikasi",
        sub: "Atur preferensi notifikasi",
        action: () => showModal("Notifikasi", "Pengaturan preferensi notifikasi pesan & aplikasi akan segera hadir."),
      },
      {
        icon: Shield,
        label: "Keamanan & Biometrik",
        sub: "PIN, fingerprint, face ID",
        action: () => navigate("/biometric"),
      },
      {
        icon: Settings,
        label: "Pengaturan Aplikasi",
        sub: "Bahasa, tampilan",
        action: () => showModal("Pengaturan Aplikasi", "Fitur ubah bahasa dan tema tampilan akan segera tersedia."),
      },
    ],
  },
  {
    title: "Bantuan",
    items: [
      {
        icon: HelpCircle,
        label: "Pusat Bantuan",
        sub: "FAQ dan panduan penggunaan",
        action: () => showModal("Pusat Bantuan", "Pusat bantuan dan panduan penggunaan portal wali santri akan segera dibuka."),
      },
    ],
  },
];