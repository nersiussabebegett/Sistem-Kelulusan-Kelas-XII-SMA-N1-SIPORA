import React, { useState } from 'react';
import {
  Database,
  Code2,
  Download,
  Copy,
  Check,
  FileCode,
  FolderArchive,
  Terminal,
  CheckCircle2,
  Server,
  Key,
  Layers,
  ArrowRight,
  Sparkles,
  BookOpen,
  Cpu
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  category: 'database' | 'model' | 'controller' | 'view' | 'routes' | 'config';
  path: string;
  code: string;
}

export const LaravelExportView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('database');
  const [selectedFileId, setSelectedFileId] = useState<string>('sql-schema');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const files: FileItem[] = [
    {
      id: 'sql-schema',
      name: 'database_skl_kelulusan.sql',
      category: 'database',
      path: 'database/database_skl_kelulusan.sql',
      code: `-- ==============================================================================
-- DATABASE MYSQL FULL SCHEMA & DATA DUMP FOR SISTEM CEK KELULUSAN & CETAK SKL
-- Framework Compatible: Laravel 11 / 12 / 13
-- Database: db_kelulusan_skl
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`db_kelulusan_skl\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`db_kelulusan_skl\`;

-- ------------------------------------------------------------------------------
-- Table Structure for \`sessions\` (Wajib untuk Session Database Laravel)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`sessions\`;
CREATE TABLE \`sessions\` (
  \`id\` varchar(255) NOT NULL,
  \`user_id\` bigint(20) UNSIGNED DEFAULT NULL,
  \`ip_address\` varchar(45) DEFAULT NULL,
  \`user_agent\` text DEFAULT NULL,
  \`payload\` longtext NOT NULL,
  \`last_activity\` int(11) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`sessions_user_id_index\` (\`user_id\`),
  KEY \`sessions_last_activity_index\` (\`last_activity\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- Table Structure for \`users\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`username\` varchar(50) NOT NULL UNIQUE,
  \`name\` varchar(150) NOT NULL,
  \`email\` varchar(150) NOT NULL UNIQUE,
  \`password\` varchar(255) NOT NULL,
  \`role\` enum('admin','operator','kepala_sekolah','siswa') NOT NULL DEFAULT 'admin',
  \`student_nisn\` varchar(20) DEFAULT NULL,
  \`remember_token\` varchar(100) DEFAULT NULL,
  \`last_login\` datetime DEFAULT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`users\` (\`id\`, \`username\`, \`name\`, \`email\`, \`password\`, \`role\`, \`created_at\`, \`updated_at\`) VALUES
(1, 'admin', 'Administrator SMAN 1 Sipora', 'admin@sman1siporautara.sch.id', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'admin', NOW(), NOW()),
(2, 'kepsek', 'Drs. H. Ahmad Dahlan, M.Pd.', 'kepsek@sman1siporautara.sch.id', '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', 'kepala_sekolah', NOW(), NOW());

-- ------------------------------------------------------------------------------
-- Table Structure for \`school_infos\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`school_infos\`;
CREATE TABLE \`school_infos\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`name\` varchar(200) NOT NULL,
  \`npsn\` varchar(20) NOT NULL,
  \`address\` text NOT NULL,
  \`subdistrict\` varchar(100) NOT NULL,
  \`district\` varchar(100) NOT NULL,
  \`province\` varchar(100) NOT NULL,
  \`postal_code\` varchar(10) NOT NULL,
  \`email\` varchar(100) NOT NULL,
  \`phone\` varchar(30) NOT NULL,
  \`website\` varchar(150) DEFAULT NULL,
  \`logo_url\` text DEFAULT NULL,
  \`principal_name\` varchar(150) NOT NULL,
  \`principal_nip\` varchar(30) NOT NULL,
  \`principal_photo_url\` text DEFAULT NULL,
  \`academic_year\` varchar(20) NOT NULL DEFAULT '2025/2026',
  \`sk_number_prefix\` varchar(100) NOT NULL DEFAULT '421.3/SKL-SMAN1/2026/',
  \`graduation_date\` date NOT NULL,
  \`is_announcement_open\` boolean NOT NULL DEFAULT TRUE,
  \`announcement_time\` datetime NOT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`school_infos\` (\`id\`, \`name\`, \`npsn\`, \`address\`, \`subdistrict\`, \`district\`, \`province\`, \`postal_code\`, \`email\`, \`phone\`, \`principal_name\`, \`principal_nip\`, \`academic_year\`, \`graduation_date\`, \`is_announcement_open\`, \`announcement_time\`) VALUES
(1, 'SMAN 1 SIPORA UTARA', '10303212', 'Jl. Raya Tuapejat Km. 7, Sipora Utara', 'Sipora Utara', 'Kepulauan Mentawai', 'Sumatera Barat', '25392', 'info@sman1siporautara.sch.id', '(0759) 322101', 'Drs. H. Ahmad Dahlan, M.Pd.', '19680512 199403 1 004', '2025/2026', '2026-05-05', 1, '2026-05-05 15:00:00');

-- ------------------------------------------------------------------------------
-- Table Structure for \`students\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`students\`;
CREATE TABLE \`students\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`nisn\` varchar(20) NOT NULL UNIQUE,
  \`nis\` varchar(20) NOT NULL,
  \`name\` varchar(150) NOT NULL,
  \`pob\` varchar(100) NOT NULL,
  \`dob\` date NOT NULL,
  \`gender\` enum('L','P') NOT NULL,
  \`address\` text DEFAULT NULL,
  \`phone\` varchar(30) DEFAULT NULL,
  \`parent_name\` varchar(150) DEFAULT NULL,
  \`class\` varchar(50) NOT NULL,
  \`major\` enum('MIPA','IPS') NOT NULL,
  \`photo_url\` text DEFAULT NULL,
  \`status\` enum('LULUS','TIDAK_LULUS','PENDING') NOT NULL DEFAULT 'PENDING',
  \`sk_number\` varchar(100) NOT NULL,
  \`average_score\` decimal(5,2) NOT NULL DEFAULT '0.00',
  \`notes\` text DEFAULT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_nisn\` (\`nisn\`),
  KEY \`idx_class\` (\`class\`),
  KEY \`idx_status\` (\`status\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`students\` (\`id\`, \`nisn\`, \`nis\`, \`name\`, \`pob\`, \`dob\`, \`gender\`, \`class\`, \`major\`, \`status\`, \`sk_number\`, \`average_score\`) VALUES
(1, '0061234567', '21221001', 'Rahmat Hidayat', 'Tuapejat', '2006-04-12', 'L', 'XII MIPA 1', 'MIPA', 'LULUS', '421.3/SKL-SMAN1/2026/001', 88.50),
(2, '0061234568', '21221002', 'Siti Nurhaliza', 'Padang', '2006-08-20', 'P', 'XII MIPA 1', 'MIPA', 'LULUS', '421.3/SKL-SMAN1/2026/002', 91.20);

-- ------------------------------------------------------------------------------
-- Table Structure for \`grades\`
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS \`grades\`;
CREATE TABLE \`grades\` (
  \`id\` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  \`student_id\` bigint(20) UNSIGNED NOT NULL,
  \`subject_name\` varchar(100) NOT NULL,
  \`score\` decimal(5,2) NOT NULL,
  \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  CONSTRAINT \`fk_grades_students\` FOREIGN KEY (\`student_id\`) REFERENCES \`students\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO \`grades\` (\`student_id\`, \`subject_name\`, \`score\`) VALUES
(1, 'Pendidikan Agama dan Budi Pekerti', 88.00),
(1, 'Pendidikan Pancasila dan Kewarganegaraan', 87.50),
(1, 'Bahasa Indonesia', 90.00),
(1, 'Matematika (Wajib)', 85.00),
(1, 'Sejarah Indonesia', 88.00),
(1, 'Bahasa Inggris', 89.00),
(1, 'Matematika (Peminatan)', 86.50),
(1, 'Biologi', 88.00),
(1, 'Fisika', 87.00),
(1, 'Kimia', 89.00);`
    },
    {
      id: 'mig-students',
      name: '2026_01_01_000002_create_students_table.php',
      category: 'database',
      path: 'database/migrations/2026_01_01_000002_create_students_table.php',
      code: `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nisn', 20)->unique();
            $table->string('nis', 20);
            $table->string('name', 150);
            $table->string('pob', 100);
            $table->date('dob');
            $table->enum('gender', ['L', 'P']);
            $table->text('address')->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('parent_name', 150)->nullable();
            $table->string('class', 50);
            $table->enum('major', ['MIPA', 'IPS']);
            $table->text('photo_url')->nullable();
            $table->enum('status', ['LULUS', 'TIDAK_LULUS', 'PENDING'])->default('PENDING');
            $table->string('sk_number', 100);
            $table->decimal('average_score', 5, 2)->default(0.00);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index('nisn');
            $table->index('class');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};`
    },
    {
      id: 'model-student',
      name: 'Student.php',
      category: 'model',
      path: 'app/Models/Student.php',
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'nisn',
        'nis',
        'name',
        'pob',
        'dob',
        'gender',
        'address',
        'phone',
        'parent_name',
        'class',
        'major',
        'photo_url',
        'status',
        'sk_number',
        'average_score',
        'notes',
    ];

    protected $casts = [
        'dob' => 'date',
        'average_score' => 'float',
    ];

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }
}`
    },
    {
      id: 'model-school',
      name: 'SchoolInfo.php',
      category: 'model',
      path: 'app/Models/SchoolInfo.php',
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class SchoolInfo extends Model
{
    protected $fillable = [
        'name',
        'npsn',
        'address',
        'subdistrict',
        'district',
        'province',
        'postal_code',
        'email',
        'phone',
        'website',
        'logo_url',
        'principal_name',
        'principal_nip',
        'principal_photo_url',
        'academic_year',
        'sk_number_prefix',
        'graduation_date',
        'is_announcement_open',
        'announcement_time',
    ];

    protected $casts = [
        'graduation_date' => 'date',
        'announcement_time' => 'datetime',
        'is_announcement_open' => 'boolean',
    ];
}`
    },
    {
      id: 'model-grade',
      name: 'Grade.php',
      category: 'model',
      path: 'app/Models/Grade.php',
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Grade extends Model
{
    protected $fillable = [
        'student_id',
        'subject_name',
        'score',
    ];

    protected $casts = [
        'score' => 'float',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}`
    },
    {
      id: 'model-announcement',
      name: 'Announcement.php',
      category: 'model',
      path: 'app/Models/Announcement.php',
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'category',
        'date',
        'author',
        'content',
        'is_important',
    ];

    protected $casts = [
        'date' => 'date',
        'is_important' => 'boolean',
    ];
}`
    },
    {
      id: 'model-audit-log',
      name: 'AuditLog.php',
      category: 'model',
      path: 'app/Models/AuditLog.php',
      code: `<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class AuditLog extends Model
{
    protected $fillable = [
        'user',
        'role',
        'action',
        'details',
    ];
}`
    },
    {
      id: 'model-user',
      name: 'User.php',
      category: 'model',
      path: 'app/Models/User.php',
      code: `<?php

namespace App\\Models;

use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'username',
        'name',
        'email',
        'password',
        'role',
        'student_nisn',
        'last_login',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'last_login' => 'datetime',
    ];
}`
    },
    {
      id: 'ctrl-cek',
      name: 'CekKelulusanController.php',
      category: 'controller',
      path: 'app/Http/Controllers/CekKelulusanController.php',
      code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Student;
use App\\Models\\SchoolInfo;
use Illuminate\\Http\\Request;
use Carbon\\Carbon;

class CekKelulusanController extends Controller
{
    public function index()
    {
        $schoolInfo = SchoolInfo::first();
        return view('cek-kelulusan', compact('schoolInfo'));
    }

    public function check(Request $request)
    {
        $request->validate([
            'nisn' => 'required|numeric',
            'dob' => 'required|date',
        ]);

        $schoolInfo = SchoolInfo::first();

        // Cek jika pengumuman belum dibuka
        if (!$schoolInfo->is_announcement_open) {
            return back()->with('error', 'Pengumuman kelulusan belum resmi dibuka oleh pihak sekolah.');
        }

        if (Carbon::now()->isBefore($schoolInfo->announcement_time)) {
            return back()->with('error', 'Pengumuman kelulusan akan dibuka sesuai jadwal pada ' . $schoolInfo->announcement_time->format('d F Y - H:i') . ' WIB.');
        }

        $student = Student::with('grades')
            ->where('nisn', $request->nisn)
            ->whereDate('dob', $request->dob)
            ->first();

        if (!$student) {
            return back()->with('error', 'Data siswa dengan NISN dan Tanggal Lahir tersebut tidak ditemukan. Mohon periksa kembali.');
        }

        return view('cek-kelulusan', compact('student', 'schoolInfo'));
    }
}`
    },
    {
      id: 'ctrl-auth',
      name: 'AuthController.php',
      category: 'controller',
      path: 'app/Http/Controllers/AuthController.php',
      code: `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        if (Auth::check()) {
            return redirect()->route('admin.dashboard');
        }
        return view('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']], $request->boolean('remember'))) {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'))->with('success', 'Selamat datang kembali, ' . Auth::user()->name);
        }

        return back()->withErrors([
            'username' => 'Username atau password yang dimasukkan tidak cocok dengan data kami.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home')->with('success', 'Anda telah berhasil keluar dari sistem.');
    }
}`
    },
    {
      id: 'ctrl-skl',
      name: 'SklController.php',
      category: 'controller',
      path: 'app/Http/Controllers/SklController.php',
      code: `<?php

namespace App\\Http\\Controllers;

use App\\Models\\Student;
use App\\Models\\SchoolInfo;
use Illuminate\\Http\\Request;
use Barryvdh\\DomPDF\\Facade\\Pdf;

class SklController extends Controller
{
    public function printSkl($nisn)
    {
        $student = Student::with('grades')->where('nisn', $nisn)->firstOrFail();
        $schoolInfo = SchoolInfo::firstOrFail();

        if ($student->status !== 'LULUS') {
            abort(403, 'Surat Keterangan Lulus hanya dapat dicetak bagi siswa yang dinyatakan LULUS.');
        }

        $pdf = Pdf::loadView('skl-pdf', compact('student', 'schoolInfo'))
            ->setPaper('A4', 'portrait');

        return $pdf->stream('SKL_' . $student->nisn . '_' . str_replace(' ', '_', $student->name) . '.pdf');
    }

    public function verify($sk_number)
    {
        $student = Student::where('sk_number', urldecode($sk_number))->first();
        $schoolInfo = SchoolInfo::first();

        return view('verifikasi-skl', compact('student', 'schoolInfo', 'sk_number'));
    }
}`
    },
    {
      id: 'view-skl-pdf',
      name: 'skl-pdf.blade.php',
      category: 'view',
      path: 'resources/views/skl-pdf.blade.php',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Keterangan Lulus - {{ $student->name }}</title>
    <style>
        body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.4; color: #000; margin: 0; padding: 20px; }
        .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; position: relative; }
        .logo { position: absolute; left: 10px; top: 5px; width: 70px; }
        .header h3 { margin: 0; font-size: 12pt; font-weight: bold; text-transform: uppercase; }
        .header h2 { margin: 2px 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; }
        .header p { margin: 0; font-size: 9pt; font-style: italic; }
        .title { text-align: center; margin: 15px 0; }
        .title h4 { margin: 0; font-size: 13pt; text-decoration: underline; font-weight: bold; text-transform: uppercase; }
        .title p { margin: 2px 0; font-size: 10pt; font-weight: bold; }
        table.data { width: 100%; margin: 15px 0; border-collapse: collapse; }
        table.data td { padding: 4px 6px; vertical-align: top; }
        table.grades { width: 100%; border-collapse: collapse; margin: 15px 0; }
        table.grades th, table.grades td { border: 1px solid #000; padding: 5px 8px; font-size: 10pt; }
        table.grades th { background-color: #f2f2f2; text-align: center; font-weight: bold; }
        .status-box { text-align: center; margin: 20px 0; padding: 10px; border: 2px solid #000; font-weight: bold; font-size: 14pt; background-color: #e8f5e9; }
        .footer { margin-top: 30px; width: 100%; }
        .footer td { width: 50%; vertical-align: top; }
        .signature { text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h3>PEMERINTAH PROVINSI SUMATERA BARAT</h3>
        <h3>DINAS PENDIDIKAN</h3>
        <h2>{{ $schoolInfo->name }}</h2>
        <p>{{ $schoolInfo->address }}, Kec. {{ $schoolInfo->subdistrict }}, Kab. {{ $schoolInfo->district }}</p>
        <p>Website: {{ $schoolInfo->website }} | Email: {{ $schoolInfo->email }} | NPSN: {{ $schoolInfo->npsn }}</p>
    </div>

    <div class="title">
        <h4>SURAT KETERANGAN LULUS</h4>
        <p>Nomor: {{ $student->sk_number }}</p>
    </div>

    <p>Yang bertanda tangan di bawah ini, Kepala Sekolah Menengah Atas (SMA) Negeri 1 Sipora Utara Kabupaten Kepulauan Mentawai, menerangkan bahwa:</p>

    <table class="data">
        <tr><td width="30%">Nama Siswa</td><td width="3%">:</td><td><strong>{{ $student->name }}</strong></td></tr>
        <tr><td>Tempat, Tanggal Lahir</td><td>:</td><td>{{ $student->pob }}, {{ \Carbon\Carbon::parse($student->dob)->isoFormat('D MMMM YYYY') }}</td></tr>
        <tr><td>NIS / NISN</td><td>:</td><td>{{ $student->nis }} / {{ $student->nisn }}</td></tr>
        <tr><td>Program Keahlian/Jurusan</td><td>:</td><td>{{ $student->major }} ({{ $student->class }})</td></tr>
    </table>

    <div class="status-box">
        DILAPORKAN : L U L U S
    </div>

    <p>Dari Satuan Pendidikan {{ $schoolInfo->name }} Tahun Ajaran {{ $schoolInfo->academicYear }} berdasarkan kriteria kelulusan yang telah ditetapkan.</p>

    <p><strong>DAFTAR NILAI UJIAN / ASESMEN SEKOLAH:</strong></p>
    <table class="grades">
        <thead>
            <tr>
                <th width="10%">No</th>
                <th width="65%">Mata Pelajaran</th>
                <th width="25%">Nilai Akhir</th>
            </tr>
        </thead>
        <tbody>
            @foreach($student->grades as $index => $grade)
            <tr>
                <td style="text-align: center;">{{ $index + 1 }}</td>
                <td>{{ $grade->subject_name }}</td>
                <td style="text-align: center; font-weight: bold;">{{ number_format($grade->score, 2) }}</td>
            </tr>
            @endforeach
            <tr style="font-weight: bold; background-color: #f9f9f9;">
                <td colspan="2" style="text-align: right;">RATA-RATA NILAI</td>
                <td style="text-align: center;">{{ number_format($student->average_score, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <table class="footer">
        <tr>
            <td>
                <p>Catatan:</p>
                <small>Surat Keterangan Lulus ini sah dan diterbitkan secara elektronik oleh sistem informasi resmi sekolah.</small>
            </td>
            <td class="signature">
                <p>Tuapejat, {{ \Carbon\Carbon::parse($schoolInfo->graduation_date)->isoFormat('D MMMM YYYY') }}<br>Kepala Sekolah,</p>
                <br><br><br>
                <p><strong><u>{{ $schoolInfo->principal_name }}</u></strong><br>NIP. {{ $schoolInfo->principal_nip }}</p>
            </td>
        </tr>
    </table>
</body>
</html>`
    },
    {
      id: 'view-cek-kelulusan',
      name: 'cek-kelulusan.blade.php',
      category: 'view',
      path: 'resources/views/cek-kelulusan.blade.php',
      code: `@extends('layouts.app')

@section('title', 'Cek Kelulusan Siswa - ' . $schoolInfo->name)

@section('content')
<div class="max-w-4xl mx-auto space-y-6">
    {{-- Header Banner --}}
    <div class="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white text-center shadow-lg">
        <h1 class="text-2xl md:text-3xl font-black uppercase tracking-tight">{{ $schoolInfo->name }}</h1>
        <p class="text-blue-200 text-sm mt-1">Sistem Informasi Cek Kelulusan Siswa & Cetak SKL Resmi Tahun Ajaran {{ $schoolInfo->academic_year }}</p>
    </div>

    {{-- Form Pencarian / Hasil --}}
    @if(!isset($student))
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 class="text-lg font-bold text-slate-800 mb-4">Masukkan Identitas Siswa</h2>
        <form action="{{ route('cek-kelulusan.check') }}" method="POST" class="space-y-4">
            @csrf
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Nomor Induk Siswa Nasional (NISN)</label>
                <input type="text" name="nisn" required placeholder="Contoh: 0061234567" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1">Tanggal Lahir</label>
                <input type="date" name="dob" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            </div>
            <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition">
                Cek Status Kelulusan
            </button>
        </form>
    </div>
    @else
    {{-- Display Results --}}
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
        <div class="flex items-center justify-between border-b pb-4">
            <div>
                <h2 class="text-xl font-bold text-slate-900">{{ $student->name }}</h2>
                <p class="text-sm text-slate-500">NISN: {{ $student->nisn }} | Kelas: {{ $student->class }} ({{ $student->major }})</p>
            </div>
            <span class="px-4 py-2 rounded-full font-black text-sm {{ $student->status == 'LULUS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800' }}">
                STATUS: {{ $student->status }}
            </span>
        </div>

        {{-- Action Button --}}
        @if($student->status == 'LULUS')
        <div class="text-center pt-2">
            <a href="{{ route('skl.print', $student->nisn) }}" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition">
                Download / Cetak SKL Resmi (PDF)
            </a>
        </div>
        @endif
    </div>
    @endif
</div>
@endsection`
    },
    {
      id: 'view-verifikasi-skl',
      name: 'verifikasi-skl.blade.php',
      category: 'view',
      path: 'resources/views/verifikasi-skl.blade.php',
      code: `@extends('layouts.app')

@section('title', 'Verifikasi Keabsahan Surat SKL')

@section('content')
<div class="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center space-y-4">
    <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>

    <h1 class="text-xl font-bold text-slate-900">Verifikasi Keabsahan SKL Digital</h1>
    <p class="text-sm text-slate-500">No. Registrasi / SK: <strong class="text-slate-800">{{ $sk_number }}</strong></p>

    @if($student)
    <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-left text-sm space-y-2">
        <div class="font-bold text-emerald-900">STATUS: TERVERIFIKASI ASLI</div>
        <div>Dokumen Surat Keterangan Lulus ini terdaftar secara sah pada pangkalan data {{ $schoolInfo->name }}.</div>
        <hr class="border-emerald-200">
        <div><strong>Nama Siswa:</strong> {{ $student->name }}</div>
        <div><strong>NISN:</strong> {{ $student->nisn }}</div>
        <div><strong>Status Kelulusan:</strong> <span class="font-bold">{{ $student->status }}</span></div>
    </div>
    @else
    <div class="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-800 text-left text-sm">
        <div class="font-bold text-rose-900">STATUS: TIDAK DITEMUKAN</div>
        <div>Nomor SKL ini tidak terdaftar dalam pangkalan data resmi sekolah. Mohon pastikan kembali QR Code yang di-scan.</div>
    </div>
    @endif
</div>
@endsection`
    },
    {
      id: 'view-admin-dashboard-old',
      name: 'admin-dashboard-old.blade.php',
      category: 'view',
      path: 'resources/views/admin/dashboard.blade.php',
      code: `@extends('layouts.app')

@section('title', 'Admin Dashboard - Panel Kelulusan SKL')

@section('content')
<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900">Dashboard Manajemen Kelulusan</h1>
        <a href="{{ route('students.create') }}" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition">+ Tambah Siswa</a>
    </div>

    {{-- Ringkasan Statistik --}}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div class="text-xs text-slate-500 font-bold uppercase">Total Siswa</div>
            <div class="text-2xl font-black text-slate-800 mt-1">{{ $totalStudents ?? 0 }}</div>
        </div>
        <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 shadow-sm">
            <div class="text-xs text-emerald-700 font-bold uppercase">Siswa Lulus</div>
            <div class="text-2xl font-black text-emerald-800 mt-1">{{ $passedStudents ?? 0 }}</div>
        </div>
        <div class="bg-rose-50 p-5 rounded-2xl border border-rose-200 shadow-sm">
            <div class="text-xs text-rose-700 font-bold uppercase">Ditunda / Tidak Lulus</div>
            <div class="text-2xl font-black text-rose-800 mt-1">{{ $pendingStudents ?? 0 }}</div>
        </div>
        <div class="bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-sm">
            <div class="text-xs text-blue-700 font-bold uppercase">Tahun Ajaran</div>
            <div class="text-lg font-black text-blue-900 mt-1">{{ $schoolInfo->academic_year ?? '2025/2026' }}</div>
        </div>
    </div>
</div>
@endsection`
    },
    {
      id: 'view-login',
      name: 'login.blade.php',
      category: 'view',
      path: 'resources/views/login.blade.php',
      code: `@extends('layouts.app')

@section('title', 'Login Administrator - Sistem Kelulusan SKL')

@section('content')
<div class="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
    <div class="text-center">
        <h1 class="text-xl font-black text-slate-900 uppercase">Login Administrator</h1>
        <p class="text-xs text-slate-500 mt-1">Masukkan username dan password admin sekolah</p>
    </div>

    @if($errors->any())
    <div class="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800">
        <div class="font-bold">Gagal Masuk:</div>
        <ul class="list-disc list-inside mt-1">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif

    <form action="{{ route('login') }}" method="POST" class="space-y-4">
        @csrf
        <div>
            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Username</label>
            <input type="text" name="username" value="{{ old('username') }}" required autofocus class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
        </div>

        <div>
            <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Password</label>
            <input type="password" name="password" required class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
        </div>

        <div class="flex items-center justify-between text-xs">
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="remember" class="rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                <span class="text-slate-600">Ingat Saya</span>
            </label>
        </div>

        <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition">
            Masuk ke Panel Admin
        </button>
    </form>
</div>
@endsection`
    },
    {
      id: 'view-app-layout',
      name: 'app.blade.php',
      category: 'view',
      path: 'resources/views/layouts/app.blade.php',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Sistem Kelulusan & SKL Sekolah')</title>
    <!-- Tailwind CSS CDN Fallback (Garansi Tampilan Tidak Acak-Atakan Bahkan Tanpa npm run dev) -->
    <script src="https://cdn.tailwindcss.com"></script>
    @if(file_exists(public_path('build/manifest.json')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
</head>
<body class="bg-slate-100 text-slate-800 antialiased font-sans min-h-screen flex flex-col justify-between">
    <header class="bg-white border-b border-slate-200 py-4 px-6 shadow-sm">
        <div class="max-w-6xl mx-auto flex items-center justify-between">
            <a href="{{ route('home') }}" class="font-black text-lg text-blue-900 tracking-tight flex items-center gap-2">
                <span>🎓</span> SKL ONLINE
            </a>
            <nav class="flex items-center gap-4 text-sm font-semibold">
                <a href="{{ route('home') }}" class="text-slate-600 hover:text-blue-600">Beranda</a>
                @auth
                <a href="{{ route('admin.dashboard') }}" class="text-slate-600 hover:text-blue-600">Dashboard</a>
                <form action="{{ route('logout') }}" method="POST" class="inline">
                    @csrf
                    <button type="submit" class="text-rose-600 hover:underline">Keluar</button>
                </form>
                @else
                <a href="{{ route('login') }}" class="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition">Login Admin</a>
                @endauth
            </nav>
        </div>
    </header>

    <main class="py-8 px-4 flex-grow max-w-6xl mx-auto w-full">
        {{-- Flash Messages Alert --}}
        @if(session('success'))
        <div class="mb-6 p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 font-semibold text-sm flex items-center justify-between">
            <span>✅ {{ session('success') }}</span>
        </div>
        @endif

        @if(session('error'))
        <div class="mb-6 p-4 rounded-xl bg-rose-100 border border-rose-300 text-rose-800 font-semibold text-sm flex items-center justify-between">
            <span>⚠️ {{ session('error') }}</span>
        </div>
        @endif

        @yield('content')
    </main>

    <footer class="bg-slate-900 text-slate-400 py-5 text-center text-xs">
        <div class="max-w-6xl mx-auto px-4 space-y-1">
            <p>&copy; {{ date('Y') }} Sistem Kelulusan Siswa & Cetak SKL Resmi. All rights reserved.</p>
            <p class="text-slate-500 text-[11px]">Dikembangkan dengan Laravel 11/12/13 & MySQL Engine</p>
        </div>
    </footer>
</body>
</html>`
    },
    {
      id: 'routes-web',
      name: 'web.php',
      category: 'routes',
      path: 'routes/web.php',
      code: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\CekKelulusanController;
use App\\Http\\Controllers\\SklController;
use App\\Http\\Controllers\\Admin\\StudentController;
use App\\Http\\Controllers\\Admin\\SettingsController;
use App\\Http\\Controllers\\Admin\\SchoolInfoController;
use App\\Http\\Controllers\\AuthController;

// Public Routes
Route::get('/', [CekKelulusanController::class, 'index'])->name('home');
Route::post('/cek-kelulusan', [CekKelulusanController::class, 'check'])->name('cek-kelulusan.check');
Route::get('/cetak-skl/{nisn}', [SklController::class, 'printSkl'])->name('skl.print');
Route::get('/verifikasi-skl/{sk_number}', [SklController::class, 'verify'])->name('skl.verify');

// Auth Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Admin Protected Routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('admin.dashboard');
    Route::resource('students', StudentController::class);
    Route::get('/school-info', [SettingsController::class, 'index'])->name('admin.school-info.edit');
    Route::put('/school-info', [SettingsController::class, 'update'])->name('admin.school-info.update');
});`
    },
    {
      id: 'composer',
      name: 'composer.json',
      category: 'config',
      path: 'composer.json',
      code: `{
    "name": "laravel/sistem-kelulusan-skl",
    "type": "project",
    "description": "Sistem Informasi Kelulusan Siswa & Cetak SKL Berbasis Laravel 13 dan MySQL",
    "keywords": ["laravel", "kelulusan", "skl", "sekolah", "mysql"],
    "license": "MIT",
    "require": {
        "php": "^8.3",
        "barryvdh/laravel-dompdf": "^3.0",
        "laravel/framework": "^13.0",
        "laravel/tinker": "^2.9"
    },
    "require-dev": {
        "fakerphp/faker": "^1.23",
        "laravel/pint": "^1.13",
        "laravel/sail": "^1.26",
        "mockery/mockery": "^1.6",
        "nunomaduro/collision": "^8.0",
        "phpunit/phpunit": "^10.5"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "app/",
            "Database\\\\Factories\\\\": "database/factories/",
            "Database\\\\Seeders\\\\": "database/seeders/"
        }
    },
    "scripts": {
        "post-autoload-dump": [
            "Illuminate\\\\Foundation\\\\ComposerScripts::postAutoloadDump",
            "@php artisan package:discover --ansi"
        ]
    }
}`
    },
    {
      id: 'env-example',
      name: '.env.example',
      category: 'config',
      path: '.env.example',
      code: `APP_NAME="Sistem Kelulusan SKL SMAN 1 Sipora Utara"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=Asia/Jakarta
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_kelulusan_skl
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120`
    },
    {
      id: 'ctrl-admin-student',
      name: 'StudentController.php',
      category: 'controller',
      path: 'app/Http/Controllers/Admin/StudentController.php',
      code: `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Student;
use App\\Models\\SchoolInfo;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Str;

class StudentController extends Controller
{
    public function dashboard()
    {
        $totalStudents = Student::count();
        $passedStudents = Student::where('status', 'LULUS')->count();
        $pendingStudents = Student::where('status', '!=', 'LULUS')->count();
        $schoolInfo = SchoolInfo::first();

        return view('admin.dashboard', compact('totalStudents', 'passedStudents', 'pendingStudents', 'schoolInfo'));
    }

    public function index(Request $request)
    {
        $query = Student::query();

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('nisn', 'like', "%{$search}%")
                  ->orWhere('class', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }

        $students = $query->orderBy('class')->orderBy('name')->paginate(15);
        return view('admin.students.index', compact('students'));
    }

    public function create()
    {
        return view('admin.students.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nisn' => 'required|string|unique:students,nisn',
            'nis' => 'required|string',
            'name' => 'required|string|max:150',
            'pob' => 'required|string|max:100',
            'dob' => 'required|date',
            'gender' => 'required|in:L,P',
            'class' => 'required|string',
            'major' => 'required|in:MIPA,IPS',
            'status' => 'required|in:LULUS,TIDAK_LULUS,PENDING',
            'average_score' => 'required|numeric|min:0|max:100',
        ]);

        $schoolInfo = SchoolInfo::first();
        $skNumber = ($schoolInfo->sk_number_prefix ?? '421.3/SKL-SMAN1/2026/') . Str::padLeft(Student::count() + 1, 3, '0');

        $student = Student::create(array_merge($validated, [
            'sk_number' => $skNumber,
            'qr_code_hash' => Str::random(32),
        ]));

        return redirect()->route('students.index')->with('success', 'Data siswa berhasil ditambahkan.');
    }

    public function edit(Student $student)
    {
        return view('admin.students.create', compact('student'));
    }

    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'nisn' => 'required|string|unique:students,nisn,' . $student->id,
            'nis' => 'required|string',
            'name' => 'required|string|max:150',
            'pob' => 'required|string|max:100',
            'dob' => 'required|date',
            'gender' => 'required|in:L,P',
            'class' => 'required|string',
            'major' => 'required|in:MIPA,IPS',
            'status' => 'required|in:LULUS,TIDAK_LULUS,PENDING',
            'average_score' => 'required|numeric|min:0|max:100',
        ]);

        $student->update($validated);

        return redirect()->route('students.index')->with('success', 'Data siswa berhasil diperbarui.');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('students.index')->with('success', 'Data siswa berhasil dihapus.');
    }
}`
    },
    {
      id: 'ctrl-admin-settings',
      name: 'SettingsController.php',
      category: 'controller',
      path: 'app/Http/Controllers/Admin/SettingsController.php',
      code: `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\SchoolInfo;
use Illuminate\\Http\\Request;

class SettingsController extends Controller
{
    public function index()
    {
        $schoolInfo = SchoolInfo::first();
        return view('admin.settings', compact('schoolInfo'));
    }

    public function update(Request $request)
    {
        $schoolInfo = SchoolInfo::firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'npsn' => 'required|string|max:20',
            'address' => 'required|string',
            'subdistrict' => 'required|string',
            'district' => 'required|string',
            'province' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'principal_name' => 'required|string',
            'principal_nip' => 'required|string',
            'academic_year' => 'required|string',
            'graduation_date' => 'required|date',
            'is_announcement_open' => 'nullable|boolean',
        ]);

        $validated['is_announcement_open'] = $request->has('is_announcement_open');

        $schoolInfo->update($validated);

        return back()->with('success', 'Pengaturan profil sekolah berhasil diperbarui.');
    }
}`
    },
    {
      id: 'ctrl-admin-schoolinfo',
      name: 'SchoolInfoController.php',
      category: 'controller',
      path: 'app/Http/Controllers/Admin/SchoolInfoController.php',
      code: `<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use App\\Models\\SchoolInfo;
use Illuminate\\Http\\Request;

class SchoolInfoController extends Controller
{
    public function edit()
    {
        $schoolInfo = SchoolInfo::first();
        return view('admin.settings', compact('schoolInfo'));
    }

    public function index()
    {
        return $this->edit();
    }

    public function update(Request $request)
    {
        $schoolInfo = SchoolInfo::firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'npsn' => 'required|string|max:20',
            'address' => 'required|string',
            'subdistrict' => 'required|string',
            'district' => 'required|string',
            'province' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|email',
            'principal_name' => 'required|string',
            'principal_nip' => 'required|string',
            'academic_year' => 'required|string',
            'graduation_date' => 'required|date',
            'is_announcement_open' => 'nullable|boolean',
        ]);

        $validated['is_announcement_open'] = $request->has('is_announcement_open');

        $schoolInfo->update($validated);

        return back()->with('success', 'Pengaturan profil sekolah berhasil diperbarui.');
    }
}`
    },
    {
      id: 'middleware-admin',
      name: 'AdminMiddleware.php',
      category: 'config',
      path: 'app/Http/Middleware/AdminMiddleware.php',
      code: `<?php

namespace App\\Http\\Middleware;

use Closure;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Akses terbatas! Silakan login sebagai administrator terlebih dahulu.');
        }

        return $next($request);
    }
}`
    },
    {
      id: 'seeder-database',
      name: 'DatabaseSeeder.php',
      category: 'database',
      path: 'database/seeders/DatabaseSeeder.php',
      code: `<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;
use App\\Models\\User;
use App\\Models\\SchoolInfo;
use Illuminate\\Support\\Facades\\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Akun Admin Default
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Administrator SMAN 1 Sipora',
                'email' => 'admin@sman1siporautara.sch.id',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // 2. Profil Sekolah Default
        SchoolInfo::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'SMAN 1 SIPORA UTARA',
                'npsn' => '10303212',
                'address' => 'Jl. Raya Tuapejat Km. 7, Sipora Utara',
                'subdistrict' => 'Sipora Utara',
                'district' => 'Kepulauan Mentawai',
                'province' => 'Sumatera Barat',
                'postal_code' => '25392',
                'email' => 'info@sman1siporautara.sch.id',
                'phone' => '(0759) 322101',
                'website' => 'https://sman1siporautara.sch.id',
                'principal_name' => 'Drs. H. Ahmad Dahlan, M.Pd.',
                'principal_nip' => '19680512 199403 1 004',
                'academic_year' => '2025/2026',
                'sk_number_prefix' => '421.3/SKL-SMAN1/2026/',
                'graduation_date' => '2026-05-05',
                'is_announcement_open' => true,
                'announcement_time' => now(),
            ]
        );
    }
}`
    },
    {
      id: 'view-admin-layout',
      name: 'admin.blade.php',
      category: 'view',
      path: 'resources/views/layouts/admin.blade.php',
      code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Panel - SKL')</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 flex min-h-screen">
    <!-- Sidebar Admin -->
    <aside class="w-64 bg-slate-950 border-r border-slate-800 p-5 space-y-6 flex-shrink-0">
        <div class="font-black text-lg text-yellow-400">SMAN 1 SIPORA ADMIN</div>
        <nav class="space-y-2 text-sm font-semibold">
            <a href="{{ route('admin.dashboard') }}" class="block px-4 py-2.5 rounded-xl hover:bg-slate-800">Dashboard</a>
            <a href="{{ route('students.index') }}" class="block px-4 py-2.5 rounded-xl hover:bg-slate-800">Data Siswa & SKL</a>
            <a href="{{ route('admin.school-info.edit') }}" class="block px-4 py-2.5 rounded-xl hover:bg-slate-800">Pengaturan Sekolah</a>
            <form action="{{ route('logout') }}" method="POST" class="pt-4 border-t border-slate-800">
                @csrf
                <button type="submit" class="w-full text-left px-4 py-2.5 text-rose-400 hover:bg-rose-950/40 rounded-xl">Keluar</button>
            </form>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow p-8 bg-slate-900 overflow-y-auto">
        @yield('content')
    </main>
</body>
</html>`
    },
    {
      id: 'view-admin-dashboard',
      name: 'dashboard.blade.php',
      category: 'view',
      path: 'resources/views/admin/dashboard.blade.php',
      code: `@extends('layouts.admin')

@section('title', 'Dashboard Panel Admin')

@section('content')
<div class="space-y-6">
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-2xl font-black text-white">Dashboard Administrator</h1>
            <p class="text-xs text-slate-400 mt-1">Sistem Informasi Kelulusan & SKL {{ $schoolInfo->name ?? 'SMAN 1 Sipora' }}</p>
        </div>
        <span class="px-3 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold text-xs rounded-full">
            Tahun Ajaran {{ $schoolInfo->academic_year ?? '2025/2026' }}
        </span>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <span class="text-xs font-bold text-slate-400 uppercase">Total Siswa Terdata</span>
            <div class="text-3xl font-black text-white">{{ $totalStudents ?? 0 }}</div>
            <p class="text-xs text-slate-500">Siswa kelas XII calon lulusan</p>
        </div>

        <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <span class="text-xs font-bold text-emerald-400 uppercase">Siswa Dinyatakan LULUS</span>
            <div class="text-3xl font-black text-emerald-400">{{ $passedStudents ?? 0 }}</div>
            <p class="text-xs text-slate-500">Siap mencetak SKL resmi</p>
        </div>

        <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-2">
            <span class="text-xs font-bold text-amber-400 uppercase">Status Akses Pengumuman</span>
            <div class="text-xl font-black text-amber-400">
                {{ ($schoolInfo->is_announcement_open ?? true) ? 'TERBUKA' : 'TERTUTUP' }}
            </div>
            <p class="text-xs text-slate-500">Dapat diatur di Pengaturan Sekolah</p>
        </div>
    </div>

    <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 class="font-bold text-lg text-white">Aksi Cepat Admin</h2>
        <div class="flex flex-wrap gap-4">
            <a href="{{ route('students.index') }}" class="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl">
                Kelola Data Siswa & SKL
            </a>
            <a href="{{ route('admin.school-info.edit') }}" class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl">
                Ubah Pengaturan Sekolah
            </a>
        </div>
    </div>
</div>
@endsection`
    },
    {
      id: 'view-admin-students-index',
      name: 'index.blade.php',
      category: 'view',
      path: 'resources/views/admin/students/index.blade.php',
      code: `@extends('layouts.admin')

@section('title', 'Kelola Data Siswa & Status Kelulusan')

@section('content')
<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h1 class="text-xl font-bold">Data Kelulusan Siswa</h1>
        <a href="{{ route('students.create') }}" class="px-4 py-2 bg-yellow-500 text-slate-950 font-bold rounded-xl hover:bg-yellow-400">+ Tambah Siswa</a>
    </div>

    <div class="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
        <table class="w-full text-left text-sm">
            <thead class="bg-slate-800 text-slate-300 font-bold uppercase text-xs">
                <tr>
                    <th class="p-4">NISN / NIS</th>
                    <th class="p-4">Nama Siswa</th>
                    <th class="p-4">Kelas</th>
                    <th class="p-4">Status</th>
                    <th class="p-4">Rata-rata</th>
                    <th class="p-4 text-right">Aksi</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
                @foreach($students as $s)
                <tr class="hover:bg-slate-900">
                    <td class="p-4 font-mono">{{ $s->nisn }} / {{ $s->nis }}</td>
                    <td class="p-4 font-bold">{{ $s->name }}</td>
                    <td class="p-4">{{ $s->class }}</td>
                    <td class="p-4">
                        <span class="px-3 py-1 rounded-full text-xs font-bold {{ $s->status == 'LULUS' ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400' }}">
                            {{ $s->status }}
                        </span>
                    </td>
                    <td class="p-4 font-bold">{{ number_format($s->average_score, 2) }}</td>
                    <td class="p-4 text-right space-x-2">
                        <a href="{{ route('students.edit', $s->id) }}" class="text-yellow-400 hover:underline">Edit</a>
                        <a href="{{ route('skl.print', $s->nisn) }}" target="_blank" class="text-blue-400 hover:underline">Cetak SKL</a>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection`
    },
    {
      id: 'view-admin-students-create',
      name: 'create.blade.php',
      category: 'view',
      path: 'resources/views/admin/students/create.blade.php',
      code: `@extends('layouts.admin')

@section('title', isset($student) ? 'Edit Data Siswa' : 'Tambah Siswa Baru')

@section('content')
<div class="max-w-2xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
    <h1 class="text-xl font-bold">{{ isset($student) ? 'Edit Data Siswa' : 'Form Tambah Siswa' }}</h1>

    <form action="{{ isset($student) ? route('students.update', $student->id) : route('students.store') }}" method="POST" class="space-y-4 text-sm">
        @csrf
        @if(isset($student)) @method('PUT') @endif

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 font-bold">NISN</label>
                <input type="text" name="nisn" value="{{ old('nisn', $student->nisn ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
            <div>
                <label class="block mb-1 font-bold">NIS</label>
                <input type="text" name="nis" value="{{ old('nis', $student->nis ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
        </div>

        <div>
            <label class="block mb-1 font-bold">Nama Lengkap</label>
            <input type="text" name="name" value="{{ old('name', $student->name ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 font-bold">Tempat Lahir</label>
                <input type="text" name="pob" value="{{ old('pob', $student->pob ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
            <div>
                <label class="block mb-1 font-bold">Tanggal Lahir</label>
                <input type="date" name="dob" value="{{ old('dob', isset($student) ? $student->dob->format('Y-m-d') : '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div>
                <label class="block mb-1 font-bold">Jenis Kelamin</label>
                <select name="gender" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                    <option value="L" {{ old('gender', $student->gender ?? '') == 'L' ? 'selected' : '' }}>Laki-laki</option>
                    <option value="P" {{ old('gender', $student->gender ?? '') == 'P' ? 'selected' : '' }}>Perempuan</option>
                </select>
            </div>
            <div>
                <label class="block mb-1 font-bold">Kelas</label>
                <input type="text" name="class" value="{{ old('class', $student->class ?? 'XII MIPA 1') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
            <div>
                <label class="block mb-1 font-bold">Jurusan</label>
                <select name="major" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                    <option value="MIPA" {{ old('major', $student->major ?? '') == 'MIPA' ? 'selected' : '' }}>MIPA</option>
                    <option value="IPS" {{ old('major', $student->major ?? '') == 'IPS' ? 'selected' : '' }}>IPS</option>
                </select>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 font-bold">Status Kelulusan</label>
                <select name="status" class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                    <option value="LULUS" {{ old('status', $student->status ?? '') == 'LULUS' ? 'selected' : '' }}>LULUS</option>
                    <option value="TIDAK_LULUS" {{ old('status', $student->status ?? '') == 'TIDAK_LULUS' ? 'selected' : '' }}>TIDAK LULUS</option>
                    <option value="PENDING" {{ old('status', $student->status ?? '') == 'PENDING' ? 'selected' : '' }}>DITUNDA</option>
                </select>
            </div>
            <div>
                <label class="block mb-1 font-bold">Rata-Rata Nilai</label>
                <input type="number" step="0.01" name="average_score" value="{{ old('average_score', $student->average_score ?? '85.00') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
        </div>

        <button type="submit" class="w-full py-3 bg-yellow-500 text-slate-950 font-bold rounded-xl hover:bg-yellow-400">
            Simpan Data Siswa
        </button>
    </form>
</div>
@endsection`
    },
    {
      id: 'view-admin-settings',
      name: 'settings.blade.php',
      category: 'view',
      path: 'resources/views/admin/settings.blade.php',
      code: `@extends('layouts.admin')

@section('title', 'Pengaturan Profil Sekolah & SKL')

@section('content')
<div class="max-w-2xl mx-auto bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 text-sm">
    <h1 class="text-xl font-bold">Pengaturan Identitas Sekolah</h1>

    <form action="{{ route('admin.school-info.update') }}" method="POST" class="space-y-4">
        @csrf
        @method('PUT')

        <div>
            <label class="block mb-1 font-bold">Nama Sekolah</label>
            <input type="text" name="name" value="{{ old('name', $schoolInfo->name ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 font-bold">NPSN</label>
                <input type="text" name="npsn" value="{{ old('npsn', $schoolInfo->npsn ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
            <div>
                <label class="block mb-1 font-bold">Tahun Ajaran</label>
                <input type="text" name="academic_year" value="{{ old('academic_year', $schoolInfo->academic_year ?? '2025/2026') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
        </div>

        <div>
            <label class="block mb-1 font-bold">Alamat Lengkap</label>
            <textarea name="address" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">{{ old('address', $schoolInfo->address ?? '') }}</textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 font-bold">Nama Kepala Sekolah</label>
                <input type="text" name="principal_name" value="{{ old('principal_name', $schoolInfo->principal_name ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
            <div>
                <label class="block mb-1 font-bold">NIP Kepala Sekolah</label>
                <input type="text" name="principal_nip" value="{{ old('principal_nip', $schoolInfo->principal_nip ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block mb-1 font-bold">Email Sekolah</label>
                <input type="email" name="email" value="{{ old('email', $schoolInfo->email ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
            <div>
                <label class="block mb-1 font-bold">Telepon Sekolah</label>
                <input type="text" name="phone" value="{{ old('phone', $schoolInfo->phone ?? '') }}" required class="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700">
            </div>
        </div>

        <div class="pt-2">
            <label class="flex items-center gap-2 cursor-pointer font-bold">
                <input type="checkbox" name="is_announcement_open" value="1" {{ old('is_announcement_open', $schoolInfo->is_announcement_open ?? false) ? 'checked' : '' }} class="rounded">
                <span>Buka Akses Pengumuman Kelulusan untuk Siswa</span>
            </label>
        </div>

        <button type="submit" class="w-full py-3 bg-yellow-500 text-slate-950 font-bold rounded-xl hover:bg-yellow-400">
            Simpan Perubahan Pengaturan
        </button>
    </form>
</div>
@endsection`
    }
  ];

  const filteredFiles = files.filter(f => f.category === activeCategory);
  const currentFile = files.find(f => f.id === selectedFileId) || files[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSql = () => {
    const element = document.createElement('a');
    const file = new Blob([files[0].code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'database_skl_kelulusan.sql';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadSingleFile = (fileItem: FileItem) => {
    const element = document.createElement('a');
    const blob = new Blob([fileItem.code], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = fileItem.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Top Banner Notice */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 p-6 md:p-8 border-2 border-red-500/40 text-white shadow-bold relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <Database className="w-96 h-96 text-red-400" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Full Package Source Code & Database Converter
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase leading-tight">
            Pusat Source Code Full Laravel 13 & Database MySQL
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Sistem Cek Kelulusan Siswa & Cetak SKL telah dikonversi secara menyeluruh ke dalam arsitektur <strong>Framework Laravel 13</strong> lengkap dengan <strong>Database Relasional MySQL</strong> (`.sql` schema + Foreign Keys + Migrations + Eloquent Models + Controllers + Blade Views + DomPDF).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadSql}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider border-2 border-slate-900 shadow-bold transition"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              Download Database MySQL (.sql)
            </button>

            <a
              href="/database_skl_kelulusan.sql"
              download="database_skl_kelulusan.sql"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider border-2 border-slate-700 transition"
            >
              <FileCode className="w-4 h-4 stroke-[2.5]" />
              Unduh Langsung Direct SQL
            </a>
          </div>
        </div>
      </div>

      {/* Categories & File Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar File Tree */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Kategori Modul Laravel
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
              {[
                { id: 'database', label: 'Database & SQL', icon: Database, count: files.filter(f => f.category === 'database').length },
                { id: 'model', label: 'Eloquent Models', icon: Server, count: files.filter(f => f.category === 'model').length },
                { id: 'controller', label: 'HTTP Controllers', icon: Cpu, count: files.filter(f => f.category === 'controller').length },
                { id: 'view', label: 'Blade Views & PDF', icon: Code2, count: files.filter(f => f.category === 'view').length },
                { id: 'routes', label: 'Routes (web.php)', icon: ArrowRight, count: files.filter(f => f.category === 'routes').length },
                { id: 'config', label: 'Config & Composer', icon: Key, count: files.filter(f => f.category === 'config').length },
              ].map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      const firstInCat = files.find(f => f.category === cat.id);
                      if (firstInCat) setSelectedFileId(firstInCat.id);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-left transition ${
                      isActive
                        ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 stroke-[2.5]" />
                      <span>{cat.label}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Files List in Active Category */}
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 space-y-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Daftar Berkas Kode:
            </h4>

            <div className="space-y-1">
              {filteredFiles.map((file, idx) => (
                <button
                  key={`${file.id}-${idx}`}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold text-left transition truncate ${
                    selectedFileId === file.id
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code Viewer Area */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-bold">
            {/* Code Viewer Header */}
            <div className="bg-slate-950 px-5 py-3 border-b-2 border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {currentFile.path}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
                </button>

                <button
                  onClick={() => handleDownloadSingleFile(currentFile)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition border border-emerald-500/40"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File Ini</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <pre className="p-5 text-xs font-mono text-emerald-300 bg-slate-950 overflow-x-auto max-h-[550px] leading-relaxed">
              <code>{currentFile.code}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Tutorial Installation Guide */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b-2 border-slate-800 pb-4">
          <div className="p-3 bg-emerald-400 text-slate-950 rounded-xl border-2 border-slate-900 shadow-bold">
            <BookOpen className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black font-display text-white uppercase tracking-tight">
              Langkah Panduan Instalasi Laravel + MySQL (Local / Server cPanel / VPS)
            </h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Panduan Menjalankan Project Laravel Hasil Konversi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
          {/* Step 1 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">1</span>
              Persiapan Database MySQL
            </div>
            <p className="text-xs text-slate-400">
              Buat database baru di MySQL via phpMyAdmin, Laragon, atau MySQL CLI:
            </p>
            <pre className="p-3 rounded bg-slate-900 text-xs font-mono text-amber-300 overflow-x-auto">
              CREATE DATABASE db_kelulusan_skl;
            </pre>
            <p className="text-xs text-slate-400">
              Lalu import file <span className="text-emerald-400 font-mono">database_skl_kelulusan.sql</span> yang sudah didownload ke dalamnya.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">2</span>
              Install Dependensi Composer
            </div>
            <p className="text-xs text-slate-400">
              Buka terminal pada direktori project Laravel Anda dan jalankan perintah:
            </p>
            <pre className="p-3 rounded bg-slate-900 text-xs font-mono text-emerald-300 overflow-x-auto">
              composer install
            </pre>
            <p className="text-xs text-slate-400">
              Ini akan mendownload semua package Laravel 13 & DomPDF.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">3</span>
              Konfigurasi File Environment (.env)
            </div>
            <p className="text-xs text-slate-400">
              Salin file <span className="text-emerald-400 font-mono">.env.example</span> menjadi <span className="text-emerald-400 font-mono">.env</span> dan atur kredensial MySQL:
            </p>
            <pre className="p-3 rounded bg-slate-900 text-xs font-mono text-slate-300 overflow-x-auto">
              {`DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_kelulusan_skl
DB_USERNAME=root
DB_PASSWORD=`}
            </pre>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black">4</span>
              Generate Key & Serve Project
            </div>
            <p className="text-xs text-slate-400">
              Jalankan perintah berikut untuk meng-generate App Key dan menjalankan server lokal:
            </p>
            <pre className="p-3 rounded bg-slate-900 text-xs font-mono text-emerald-300 overflow-x-auto">
              {`php artisan key:generate
php artisan storage:link
php artisan serve`}
            </pre>
            <p className="text-xs text-slate-400">
              Akses aplikasi di browser pada <span className="text-emerald-400 font-mono">http://localhost:8000</span>
            </p>
          </div>
        </div>

        {/* Anti-Error & Troubleshooting Section */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-amber-500/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            Tips Garansi Bebas Error Saat Instalasi Laravel:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">1. Bebas Error Session Table</div>
              <p className="text-slate-400">
                File SQL <code className="text-amber-300">database_skl_kelulusan.sql</code> telah dilengkapi struktur tabel <code className="text-amber-300">sessions</code>. Anda tidak akan mengalami error <code className="text-rose-400">Table 'sessions' doesn't exist</code> saat login.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">2. Bebas Error View Not Found</div>
              <p className="text-slate-400">
                Seluruh tampilan (<code className="text-amber-300">app.blade.php</code>, <code className="text-amber-300">login.blade.php</code>, <code className="text-amber-300">cek-kelulusan.blade.php</code>) sudah disertakan dan terstruktur rapi di dalam folder <code className="text-amber-300">resources/views/</code>.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="font-bold text-emerald-400">3. Bebas Error Tampilan CSS Acak</div>
              <p className="text-slate-400">
                Layout <code className="text-amber-300">app.blade.php</code> sudah menyertakan fallback CDN Tailwind CSS sehingga tampilan aplikasi langsung rapi dan indah bahkan tanpa perlu menjalankan <code className="text-amber-300">npm run dev</code>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
