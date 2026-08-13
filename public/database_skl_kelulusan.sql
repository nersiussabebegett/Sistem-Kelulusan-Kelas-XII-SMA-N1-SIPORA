-- ==============================================================================
-- DATABASE MYSQL FULL SCHEMA & DATA DUMP FOR SISTEM CEK KELULUSAN & CETAK SKL
-- Framework Compatible: Laravel 13
-- Database: db_kelulusan_skl
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `db_kelulusan_skl` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_kelulusan_skl`;

-- ------------------------------------------------------------------------------
-- Table Structure for `sessions` (Diperlukan oleh Session Driver Database Laravel)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table Structure for `users`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL UNIQUE,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','operator','kepala_sekolah','siswa') NOT NULL DEFAULT 'admin',
  `student_nisn` varchar(20) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Dumping Data for `users` (Password Default: password / admin123 hashed via bcrypt)
-- ------------------------------------------------------------------------------
INSERT INTO `users` (`id`, `username`, `name`, `email`, `password`, `role`, `student_nisn`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administrator SMAN 1 Sipora', 'admin@sman1siporautara.sch.id', '$2y$12$R.32u4cOn5pL5B7nQ5.v1eQ2Z.B0KzG6Yp9A5dJ7p8X2v5Q5.v1eQ', 'admin', NULL, NOW(), NOW(), NOW()),
(2, 'kepsek', 'Drs. H. Ahmad Dahlan, M.Pd.', 'kepsek@sman1siporautara.sch.id', '$2y$12$R.32u4cOn5pL5B7nQ5.v1eQ2Z.B0KzG6Yp9A5dJ7p8X2v5Q5.v1eQ', 'kepala_sekolah', NULL, NOW(), NOW(), NOW()),
(3, 'operator', 'Operator Kurikulum', 'operator@sman1siporautara.sch.id', '$2y$12$R.32u4cOn5pL5B7nQ5.v1eQ2Z.B0KzG6Yp9A5dJ7p8X2v5Q5.v1eQ', 'operator', NULL, NOW(), NOW(), NOW());

-- ------------------------------------------------------------------------------
-- Table Structure for `school_infos`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `school_infos`;
CREATE TABLE `school_infos` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `npsn` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `subdistrict` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `website` varchar(150) DEFAULT NULL,
  `logo_url` text DEFAULT NULL,
  `principal_name` varchar(150) NOT NULL,
  `principal_nip` varchar(30) NOT NULL,
  `principal_photo_url` text DEFAULT NULL,
  `academic_year` varchar(20) NOT NULL DEFAULT '2025/2026',
  `sk_number_prefix` varchar(100) NOT NULL DEFAULT '421.3/SKL-SMAN1/2026/',
  `graduation_date` date NOT NULL,
  `is_announcement_open` boolean NOT NULL DEFAULT TRUE,
  `announcement_time` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Dumping Data for `school_infos`
-- ------------------------------------------------------------------------------
INSERT INTO `school_infos` (`id`, `name`, `npsn`, `address`, `subdistrict`, `district`, `province`, `postal_code`, `email`, `phone`, `website`, `logo_url`, `principal_name`, `principal_nip`, `principal_photo_url`, `academic_year`, `sk_number_prefix`, `graduation_date`, `is_announcement_open`, `announcement_time`, `created_at`, `updated_at`) VALUES
(1, 'SMAN 1 SIPORA UTARA', '10302814', 'Jl. Raya Tuapejat Km. 7, SidoMakmur', 'Sipora Utara', 'Kabupaten Kepulauan Mentawai', 'Sumatera Barat', '25392', 'info@sman1siporautara.sch.id', '(0759) 322104', 'https://sman1siporautara.sch.id', 'https://images.unsplash.com/photo-1594312915251-48ed9280ca78?auto=format&fit=crop&q=80&w=200', 'Drs. H. Ahmad Dahlan, M.Pd.', '19680512 199403 1 005', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300', '2025/2026', '421.3/SKL-SMAN1/2026/', '2026-05-05', 1, '2026-05-05 16:00:00', NOW(), NOW());

-- ------------------------------------------------------------------------------
-- Table Structure for `students`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nisn` varchar(20) NOT NULL UNIQUE,
  `nis` varchar(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `pob` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `gender` enum('L','P') NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `parent_name` varchar(150) DEFAULT NULL,
  `class` varchar(50) NOT NULL,
  `major` enum('MIPA','IPS') NOT NULL,
  `photo_url` text DEFAULT NULL,
  `status` enum('LULUS','TIDAK_LULUS','PENDING') NOT NULL DEFAULT 'PENDING',
  `sk_number` varchar(100) NOT NULL,
  `average_score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_nisn` (`nisn`),
  KEY `idx_class` (`class`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Dumping Data for `students`
-- ------------------------------------------------------------------------------
INSERT INTO `students` (`id`, `nisn`, `nis`, `name`, `pob`, `dob`, `gender`, `address`, `phone`, `parent_name`, `class`, `major`, `photo_url`, `status`, `sk_number`, `average_score`, `notes`, `created_at`, `updated_at`) VALUES
(1, '0061234567', '21221001', 'ARIEF SETIAWAN', 'Tuapejat', '2006-04-12', 'L', 'SidoMakmur Km 7, Sipora Utara', '081267890123', 'Budi Setiawan', 'XII MIPA 1', 'MIPA', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300', 'LULUS', '421.3/SKL-SMAN1/2026/001', 88.50, 'Memenuhi seluruh kriteria kelulusan TA 2025/2026', NOW(), NOW()),
(2, '0062345678', '21221002', 'ANNISA RAHMAWATI', 'Sioban', '2006-08-23', 'P', 'Desa Sioban, Sipora Selatan', '082189012345', 'Rahmad Hidayat', 'XII MIPA 1', 'MIPA', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300', 'LULUS', '421.3/SKL-SMAN1/2026/002', 91.20, 'Lulus dengan nilai sangat baik & prestasi OSN Matematika', NOW(), NOW()),
(3, '0063456789', '21221003', 'BAYU KUSUMA', 'Rokot', '2006-01-15', 'L', 'Desa Rokot, Sipora Utara', '085234567890', 'Kusuma Wijaya', 'XII IPS 1', 'IPS', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300', 'LULUS', '421.3/SKL-SMAN1/2026/003', 85.70, 'Memenuhi seluruh syarat akademik & kelakuan baik', NOW(), NOW()),
(4, '0064567890', '21221004', 'DINA MARLIANA', 'Tuapejat', '2006-11-05', 'P', 'Jl. Dermaga Tuapejat', '081345678901', 'Marlian Sani', 'XII IPS 2', 'IPS', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300', 'LULUS', '421.3/SKL-SMAN1/2026/004', 87.40, 'Memenuhi standar kelulusan sekolah', NOW(), NOW());

-- ------------------------------------------------------------------------------
-- Table Structure for `grades`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `grades`;
CREATE TABLE `grades` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `subject_name` varchar(100) NOT NULL,
  `score` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_student_id` (`student_id`),
  CONSTRAINT `fk_grades_students` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Dumping Data for `grades`
-- ------------------------------------------------------------------------------
INSERT INTO `grades` (`student_id`, `subject_name`, `score`) VALUES
-- Student 1
(1, 'Pendidikan Agama', 88.00),
(1, 'PPKn', 86.00),
(1, 'Bahasa Indonesia', 90.00),
(1, 'Matematika', 87.00),
(1, 'Sejarah Indonesia', 85.00),
(1, 'Bahasa Inggris', 89.00),
(1, 'Seni Budaya', 88.00),
(1, 'PJOK', 91.00),
(1, 'Prakarya & Kewirausahaan', 88.00),
(1, 'Peminatan MIPA/IPS', 93.00),
-- Student 2
(2, 'Pendidikan Agama', 92.00),
(2, 'PPKn', 90.00),
(2, 'Bahasa Indonesia', 94.00),
(2, 'Matematika', 96.00),
(2, 'Sejarah Indonesia', 88.00),
(2, 'Bahasa Inggris', 92.00),
(2, 'Seni Budaya', 89.00),
(2, 'PJOK', 87.00),
(2, 'Prakarya & Kewirausahaan', 91.00),
(2, 'Peminatan MIPA/IPS', 95.00);

-- ------------------------------------------------------------------------------
-- Table Structure for `announcements`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `announcements`;
CREATE TABLE `announcements` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` enum('Jadwal','SKL','Ijazah','Daftar Ulang','Umum') NOT NULL DEFAULT 'Umum',
  `date` date NOT NULL,
  `author` varchar(100) NOT NULL DEFAULT 'Panitia Kelulusan',
  `content` text NOT NULL,
  `is_important` boolean NOT NULL DEFAULT FALSE,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Dumping Data for `announcements`
-- ------------------------------------------------------------------------------
INSERT INTO `announcements` (`id`, `title`, `category`, `date`, `author`, `content`, `is_important`, `created_at`, `updated_at`) VALUES
(1, 'Pengumuman Kelulusan Resmi TA 2025/2026', 'SKL', '2026-05-05', 'Panitia Kelulusan', 'Pengumuman kelulusan siswa kelas XII SMAN 1 Sipora Utara secara resmi dapat diakses melalui portal ini mulai pukul 16:00 WIB.', 1, NOW(), NOW()),
(2, 'Prosedur Pengambilan Surat Keterangan Lulus (SKL) Fisik', 'Jadwal', '2026-05-06', 'Subbag Tata Usaha', 'Siswa yang telah dinyatakan LULUS dapat mengambil SKL fisik di ruang Tata Usaha dengan membawa bukti cetak mandiri dan bebas pustaka.', 0, NOW(), NOW());

-- ------------------------------------------------------------------------------
-- Table Structure for `audit_logs`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `action` varchar(150) NOT NULL,
  `details` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Dumping Data for `audit_logs`
-- ------------------------------------------------------------------------------
INSERT INTO `audit_logs` (`id`, `user`, `role`, `action`, `details`, `created_at`) VALUES
(1, 'Administrator SMAN 1 Sipora', 'admin', 'INISIALISASI SISTEM', 'Sistem kelulusan & database MySQL berhasil dikonfigurasi', NOW());
