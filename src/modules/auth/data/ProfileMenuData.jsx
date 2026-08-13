import { User, Phone, Shield, Settings, Bell, HelpCircle, Users } from "lucide-react";

export const getProfileMenuGroups = ({ childrenCount, parentPhone, navigate, showToast }) => [
  {
    title: "Akun",
    items: [
      { 
        icon: User, 
        label: "Data Pribadi", 
        sub: "Lihat dan edit profil", 
        action: () => showToast("info", "Fitur akan segera tersedia.") 
      },
      { 
        icon: Users, 
        label: "Daftar Anak", 
        sub: `${childrenCount} anak terdaftar`, 
        action: () => navigate("/children") 
      },
      { 
        icon: Phone, 
        label: "Ubah Nomor HP", 
        sub: parentPhone || "-", 
        action: () => showToast("info", "Fitur akan segera tersedia.") 
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
        action: () => showToast("info", "Fitur akan segera tersedia.") 
      },
      { 
        icon: Shield, 
        label: "Keamanan & Biometrik", 
        sub: "PIN, fingerprint, face ID", 
        action: () => navigate("/biometric") 
      },
      { 
        icon: Settings, 
        label: "Pengaturan Aplikasi", 
        sub: "Bahasa, tampilan", 
        action: () => showToast("info", "Fitur akan segera tersedia.") 
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
        action: () => showToast("info", "Fitur akan segera tersedia.") 
      },
    ],
  },
];