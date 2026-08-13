/**
 * Utility functions for handling announcement release schedule dates & times.
 * Prevents UTC timezone shifting bugs when saving and displaying input type="datetime-local".
 */

// 1. Parses any datetime string (e.g. "2026-05-05T15:00", "2026-05-05T15:00:00", "2026-05-05T15:00:00.000Z")
// into a JavaScript Date object representing the EXACT local date and time set by the admin.
export const parseAnnouncementDate = (timeStr: string): Date => {
  if (!timeStr) return new Date();
  
  // Clean string: remove trailing Z, timezone offsets (+07:00), milliseconds
  const cleanStr = timeStr.replace(/Z$/, '').replace(/\+.*$/, '').replace(/\.\d+$/, '');
  const [datePart, timePart] = cleanStr.split('T');

  if (datePart && timePart) {
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      return new Date(year, month - 1, day, hours || 0, minutes || 0, seconds || 0);
    }
  }

  // Fallback to native Date parser
  const parsed = new Date(timeStr);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

// 2. Formats a time string into "YYYY-MM-DDTHH:mm" for HTML <input type="datetime-local">
export const formatToDatetimeLocal = (timeStr: string): string => {
  if (!timeStr) return '2026-05-05T15:00';
  
  // Clean trailing Z or UTC offsets
  const cleanStr = timeStr.replace(/Z$/, '').replace(/\+.*$/, '').replace(/\.\d+$/, '');
  
  if (cleanStr.includes('T')) {
    const [datePart, timePart] = cleanStr.split('T');
    const timeFormatted = timePart.slice(0, 5); // HH:mm
    return `${datePart}T${timeFormatted}`;
  }
  
  return cleanStr.slice(0, 16);
};

// 3. Formats an announcement time into human-readable Indonesian text
// e.g. "5 Mei 2026, Pukul 15:00 WIB"
export const formatAnnouncementDisplay = (timeStr: string): string => {
  const dateObj = parseAnnouncementDate(timeStr);
  
  const day = dateObj.getDate();
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  return `${day} ${month} ${year} • Pukul ${hours}:${minutes} WIB`;
};
