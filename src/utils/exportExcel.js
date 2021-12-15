// Require library
let xl = require('excel4node');
let { v4 } = require('uuid');

let exportExcel = (data, dataMonths, dataYears) => {
  const { totalUser, totalMale, totalFeMale, totalReport } = data;
  const { totalMatchMonths, totalReportMonths, totalBlockMonths } = dataMonths;
  const { totalMatchYears, totalReportYears, totalBlockYears } = dataYears;

  // Create a new instance of a Workbook class
  let wb = new xl.Workbook();

  // Add Worksheets to the workbook
  let ws = wb.addWorksheet('Tất cả');
  let ws2 = wb.addWorksheet('Tháng');
  // let ws3 = wb.addWorksheet('Năm 2021');
  let ws4 = wb.addWorksheet('Năm');

  // Create a reusable style
  let style = wb.createStyle({
    font: {
      color: '#FF0800',
      size: 12,
    },
  });

  ws.cell(2, 4, 2, 5, true)
    .string('Thống kê')
    .style({ font: { color: 'red', size: 15 } });

  ws.column(4).setWidth(25);

  ws.cell(4, 4)
    .string('Tổng số người dùng')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(4, 6)
    .number(totalUser)
    .style({ font: { size: 13 } });

  ws.cell(5, 4)
    .string('Sinh viên nam')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(5, 6)
    .number(totalMale)
    .style({ font: { size: 13 } });

  ws.cell(6, 4)
    .string('Sinh viên nữ')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(6, 6)
    .number(totalFeMale)
    .style({ font: { size: 13 } });

  ws.cell(7, 4)
    .string('Số phiếu báo cáo')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(7, 6)
    .number(totalReport)
    .style({ font: { size: 13 } });

  // thống kê theo tháng
  ws2
    .cell(2, 4, 2, 5, true)
    .string('Thống kê theo tháng của năm 2021')
    .style({ font: { color: 'red', size: 15 } });

  ws2.column(4).setWidth(35);

  ws2
    .cell(3, 5)
    .string('Tháng 1')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 6)
    .string('Tháng 2')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 7)
    .string('Tháng 3')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 8)
    .string('Tháng 4')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 9)
    .string('Tháng 5')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 10)
    .string('Tháng 6')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 11)
    .string('Tháng 7')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 12)
    .string('Tháng 8')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 13)
    .string('Tháng 9')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 14)
    .string('Tháng 10')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 15)
    .string('Tháng 11')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 16)
    .string('Tháng 12')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(4, 4)
    .string('Số lượt kết bạn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalMatchMonths.length; i++) {
    ws2
      .cell(4, 5 + i)
      .number(totalMatchMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws2
    .cell(5, 4)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalReportMonths.length; i++) {
    ws2
      .cell(5, 5 + i)
      .number(totalReportMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws2
    .cell(6, 4)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalBlockMonths.length; i++) {
    ws2
      .cell(6, 5 + i)
      .number(totalBlockMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  // thống kê theo 10 năm
  ws4
    .cell(2, 4, 2, 5, true)
    .string('Thống kê từ năm 2020 - 2030')
    .style({ font: { color: 'red', size: 15 } });

  ws4.column(4).setWidth(35);

  ws4
    .cell(3, 5)
    .string('Năm 2021')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 6)
    .string('Năm 2022')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 7)
    .string('Năm 2023')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 8)
    .string('Năm 2024')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 9)
    .string('Năm 2025')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 10)
    .string('Năm 2026')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 11)
    .string('Năm 2027')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 12)
    .string('Năm 2028')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 13)
    .string('Năm 2029')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 14)
    .string('Năm 2030')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(4, 4)
    .string('Số lượt kết bạn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalMatchYears.length; i++) {
    ws4
      .cell(4, 5 + i)
      .number(totalMatchYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws4
    .cell(5, 4)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalReportYears.length; i++) {
    ws4
      .cell(5, 5 + i)
      .number(totalReportYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws4
    .cell(6, 4)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalBlockYears.length; i++) {
    ws4
      .cell(6, 5 + i)
      .number(totalBlockYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  let fileName = v4();
  wb.write(`src/public/files/${fileName}.xlsx`);
  return fileName + '.xlsx';
};

module.exports = exportExcel;
