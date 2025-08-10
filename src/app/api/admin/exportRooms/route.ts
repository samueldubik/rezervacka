import { prisma } from '@/lib/prisma';
import { hasBalcony } from '@/utils/Utils';
import * as XLSX from 'xlsx';

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: { students: true },
      orderBy: { name: 'asc' },
    });

    // Prepare header rows
    const headerRow1 = [
      'Názov izby',
      'Typ izby',
      'Balkón',
      'Študent 1',
      '',
      'Študent 2',
      '',
      'Študent 3',
      '',
      'Študent 4',
      '',
    ];
    const headerRow2 = [
      '',
      '',
      '',
      'Meno',
      'Email',
      'Meno',
      'Email',
      'Meno',
      'Email',
      'Meno',
      'Email',
    ];

    // Prepare data rows
    const dataRows = rooms.map((room) => {
      // Replace gender
      const gender = room.gender === 'MALE' ? 'mužská' : room.gender === 'FEMALE' ? 'ženská' : '';
      // Students
      const students = room.students.map((s) => [s.name, s.email]);
      while (students.length < 4) students.push(['', '']);
      return [room.name, gender, hasBalcony(room.name) ? 'Áno' : 'Nie', ...students.flat()];
    });

    // Combine all rows
    const sheetData = [headerRow1, headerRow2, ...dataRows];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

    // Merge cells for student headers
    worksheet['!merges'] = [
      { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } },
      { s: { r: 0, c: 5 }, e: { r: 0, c: 6 } },
      { s: { r: 0, c: 7 }, e: { r: 0, c: 8 } },
      { s: { r: 0, c: 9 }, e: { r: 0, c: 10 } },
    ];

    // Center all cells
    const range = XLSX.utils.decode_range(worksheet['!ref']!);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell) {
          cell.s = {
            alignment: { horizontal: 'center', vertical: 'center' },
          };
        }
      }
    }

    // Set column widths (double for student columns)
    worksheet['!cols'] = [
      { wch: 15 }, // Názov izby
      { wch: 10 }, // Typ izby
      { wch: 8 }, // Balkón
      { wch: 18 }, // Študent 1 Meno
      { wch: 25 }, // Študent 1 Email
      { wch: 18 }, // Študent 2 Meno
      { wch: 25 }, // Študent 2 Email
      { wch: 18 }, // Študent 3 Meno
      { wch: 25 }, // Študent 3 Email
      { wch: 18 }, // Študent 4 Meno
      { wch: 25 }, // Študent 4 Email
    ];

    // Create workbook and write to array
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Izby');
    const xlsxArray = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const buffer = new Uint8Array(xlsxArray);

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const filename = `rezervacky_${day}.${month}.${year}_${hours}-${minutes}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error exporting rooms:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
