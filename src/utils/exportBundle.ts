import JSZip from 'jszip';
import { getSchoolInfo, getStudents, getAnnouncements } from '../services/storage';

/**
 * Generates SQL script for phpMyAdmin / MySQL import
 */
export const generateSqlDump = (): string => {
  const school = getSchoolInfo();
  const students = getStudents();
  const announcements = getAnnouncements();

  return `-- ============================================================
-- DATABASE DUMP: SYSTEM SKL & KELULUSAN SISWA (REACT 18 + MYSQL)
-- Target RDBMS: MySQL 5.7+ / MariaDB / phpMyAdmin
-- Generated At: ${new Date().toISOString()}
-- ============================================================

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS \`db_skl_sipora\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`db_skl_sipora\`;

-- --------------------------------------------------------
-- Table structure for \`school_info\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`school_info\`;
CREATE TABLE \`school_info\` (
  \`id\` varchar(50) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`npsn\` varchar(50) NOT NULL,
  \`address\` text NOT NULL,
  \`subdistrict\` varchar(100) NOT NULL,
  \`district\` varchar(100) NOT NULL,
  \`province\` varchar(100) NOT NULL,
  \`postal_code\` varchar(20) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`phone\` varchar(50) NOT NULL,
  \`website\` varchar(255) DEFAULT NULL,
  \`logo_url\` text DEFAULT NULL,
  \`principal_name\` varchar(255) NOT NULL,
  \`principal_nip\` varchar(100) NOT NULL,
  \`principal_photo_url\` text DEFAULT NULL,
  \`academic_year\` varchar(50) NOT NULL,
  \`sk_number_prefix\` varchar(100) NOT NULL,
  \`graduation_date\` date NOT NULL,
  \`is_announcement_open\` tinyint(1) NOT NULL DEFAULT '1',
  \`announcement_time\` datetime DEFAULT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`school_info\` (\`id\`, \`name\`, \`npsn\`, \`address\`, \`subdistrict\`, \`district\`, \`province\`, \`postal_code\`, \`email\`, \`phone\`, \`website\`, \`logo_url\`, \`principal_name\`, \`principal_nip\`, \`principal_photo_url\`, \`academic_year\`, \`sk_number_prefix\`, \`graduation_date\`, \`is_announcement_open\`, \`announcement_time\`) VALUES
('sch-01', '${school.name.replace(/'/g, "''")}', '${school.npsn}', '${school.address.replace(/'/g, "''")}', '${school.subdistrict.replace(/'/g, "''")}', '${school.district.replace(/'/g, "''")}', '${school.province.replace(/'/g, "''")}', '${school.postalCode}', '${school.email}', '${school.phone}', '${school.website || ''}', '${school.logoUrl || ''}', '${school.principalName.replace(/'/g, "''")}', '${school.principalNip}', '${school.principalPhotoUrl || ''}', '${school.academicYear}', '${school.skNumberPrefix.replace(/'/g, "''")}', '${school.graduationDate}', ${school.isAnnouncementOpen ? 1 : 0}, '${school.announcementTime ? school.announcementTime.replace('T', ' ') + ':00' : '2026-05-05 15:00:00'}');

-- --------------------------------------------------------
-- Table structure for \`students\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`students\`;
CREATE TABLE \`students\` (
  \`id\` varchar(50) NOT NULL,
  \`nisn\` varchar(20) NOT NULL,
  \`nis\` varchar(20) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`pob\` varchar(100) NOT NULL,
  \`dob\` date NOT NULL,
  \`gender\` enum('L','P') NOT NULL,
  \`address\` text DEFAULT NULL,
  \`phone\` varchar(50) DEFAULT NULL,
  \`parent_name\` varchar(255) DEFAULT NULL,
  \`class\` varchar(50) NOT NULL,
  \`major\` enum('MIPA','IPS') NOT NULL,
  \`photo_url\` text DEFAULT NULL,
  \`status\` enum('LULUS','TIDAK_LULUS','PENDING') NOT NULL DEFAULT 'PENDING',
  \`sk_number\` varchar(100) NOT NULL,
  \`average_score\` decimal(5,2) NOT NULL DEFAULT '0.00',
  \`grades\` json DEFAULT NULL,
  \`notes\` text DEFAULT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`nisn\` (\`nisn\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${students.length > 0 ? `INSERT INTO \`students\` (\`id\`, \`nisn\`, \`nis\`, \`name\`, \`pob\`, \`dob\`, \`gender\`, \`address\`, \`phone\`, \`parent_name\`, \`class\`, \`major\`, \`photo_url\`, \`status\`, \`sk_number\`, \`average_score\`, \`grades\`, \`notes\`) VALUES
${students.map(s => `('${s.id}', '${s.nisn}', '${s.nis}', '${s.name.replace(/'/g, "''")}', '${(s.pob || 'Sipora').replace(/'/g, "''")}', '${s.dob || '2007-01-01'}', '${s.gender}', '${(s.address || '').replace(/'/g, "''")}', '${s.phone || ''}', '${(s.parentName || '').replace(/'/g, "''")}', '${s.class}', '${s.major}', '${s.photoUrl || ''}', '${s.status}', '${s.skNumber.replace(/'/g, "''")}', ${s.averageScore || 0}, '${JSON.stringify(s.grades || {}).replace(/'/g, "''")}', '${(s.notes || '').replace(/'/g, "''")}')`).join(',\n')};` : '-- No students data'}

-- --------------------------------------------------------
-- Table structure for \`announcements\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`announcements\`;
CREATE TABLE \`announcements\` (
  \`id\` varchar(50) NOT NULL,
  \`title\` varchar(255) NOT NULL,
  \`content\` text NOT NULL,
  \`category\` varchar(50) NOT NULL,
  \`author\` varchar(100) NOT NULL,
  \`date\` date NOT NULL,
  \`is_important\` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${announcements.length > 0 ? `INSERT INTO \`announcements\` (\`id\`, \`title\`, \`content\`, \`category\`, \`author\`, \`date\`, \`is_important\`) VALUES
${announcements.map(a => `('${a.id}', '${a.title.replace(/'/g, "''")}', '${a.content.replace(/'/g, "''")}', '${a.category}', '${a.author.replace(/'/g, "''")}', '${a.date}', ${a.isImportant ? 1 : 0})`).join(',\n')};` : ''}

-- --------------------------------------------------------
-- Table structure for \`users\`
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
  \`id\` varchar(50) NOT NULL,
  \`username\` varchar(100) NOT NULL,
  \`password_hash\` varchar(255) NOT NULL,
  \`name\` varchar(255) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`role\` enum('admin','operator','kepala_sekolah','siswa') NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`username\` (\`username\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`users\` (\`id\`, \`username\`, \`password_hash\`, \`name\`, \`email\`, \`role\`) VALUES
('usr-01', 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrator Utama', 'admin@sman1sipora.sch.id', 'admin'),
('usr-02', 'kepsek', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Drs. H. Syafruddin, M.Pd', 'kepsek@sman1sipora.sch.id', 'kepala_sekolah'),
('usr-03', 'operator', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Operator Kurikulum', 'operator@sman1sipora.sch.id', 'operator');

COMMIT;
SET FOREIGN_KEY_CHECKS=1;
`;
};

/**
 * Downloads the SQL database file directly
 */
export const downloadSqlFile = (): void => {
  const sqlContent = generateSqlDump();
  const blob = new Blob([sqlContent], { type: 'text/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'db_skl_sipora.sql');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Downloads full React 18 + MySQL Source Code Zip Package
 */
export const downloadFullReactProjectZip = async (): Promise<void> => {
  const zip = new JSZip();

  // Root Config Files
  zip.file('package.json', JSON.stringify({
    name: "sistem-kelulusan-skl-react18",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      "dev": "vite --port=3000 --host=0.0.0.0",
      "build": "vite build",
      "preview": "vite preview",
      "lint": "tsc --noEmit"
    },
    dependencies: {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "lucide-react": "^0.450.0",
      "jspdf": "^2.5.2",
      "html2canvas": "^1.4.1",
      "xlsx": "^0.18.5",
      "qrcode.react": "^4.0.1",
      "canvas-confetti": "^1.9.4",
      "motion": "^11.11.0",
      "recharts": "^2.13.0"
    },
    devDependencies: {
      "@types/react": "^18.3.1",
      "@types/react-dom": "^18.3.1",
      "@types/node": "^22.0.0",
      "@vitejs/plugin-react": "^4.3.0",
      "@tailwindcss/vite": "^4.0.0",
      "tailwindcss": "^4.0.0",
      "typescript": "^5.6.0",
      "vite": "^5.4.0"
    }
  }, null, 2));

  zip.file('vercel.json', JSON.stringify({
    rewrites: [
      { source: "/(.*)", destination: "/index.html" }
    ]
  }, null, 2));

  zip.file('vite.config.ts', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});`);

  zip.file('index.html', `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistem Informasi Kelulusan & SKL Digital SMAN 1 Sipora</title>
    <meta name="title" content="Sistem Informasi Kelulusan & SKL Digital SMAN 1 Sipora" />
    <meta name="description" content="Sistem Informasi Kelulusan & Pengumuman Kelulusan Siswa Kelas XII SMAN 1 Sipora - Kabupaten Kepulauan Mentawai" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Sistem Informasi Kelulusan & SKL Digital SMAN 1 Sipora" />
    <meta property="og:description" content="Sistem Informasi Kelulusan & Pengumuman Kelulusan Siswa Kelas XII SMAN 1 Sipora - Kabupaten Kepulauan Mentawai" />
    <meta property="og:site_name" content="SMAN 1 Sipora" />
  </head>
  <body class="bg-slate-900 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`);

  zip.file('.env.example', `VITE_APP_TITLE="Sistem Kelulusan & SKL Digital SMAN 1 Sipora"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_skl_sipora
PORT=3000`);

  zip.file('README.md', `# Sistem Informasi Kelulusan & SKL Digital (React 18 + MySQL)

Aplikasi Web Modern Kelulusan Siswa, Cetak SKL Digital ber-QR Code, dan Manajemen Nilai Sekolah.

## Cara Install & Jalankan di Localhost:

1. **Persiapan Database (phpMyAdmin)**:
   - Buka XAMPP / Laragon, jalankan Apache & MySQL.
   - Buka \`http://localhost/phpmyadmin\`
   - Buat database baru bernama \`db_skl_sipora\`
   - Import file \`db_skl_sipora.sql\` yang ada di dalam folder ini.

2. **Jalankan React App**:
   - Install dependensi: \`npm install\`
   - Jalankan server dev: \`npm run dev\`
   - Buka browser di: \`http://localhost:3000\`

3. **Kredensial Default Admin**:
   - Username: \`admin\`
   - Password: \`admin123\`
`);

  // SQL Dump File
  zip.file('db_skl_sipora.sql', generateSqlDump());

  // Generate ZIP and trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'sistem-kelulusan-skl-react18-full.zip');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
