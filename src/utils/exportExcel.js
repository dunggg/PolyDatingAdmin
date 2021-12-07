// Require library
var xl = require('excel4node');
const { v4 } = require('uuid');

const exportExcel = () => {
  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet('Tất cả');
  var ws2 = wb.addWorksheet('Tháng 11');
  var ws3 = wb.addWorksheet('Năm 2021');
  var ws4 = wb.addWorksheet('10 năm');

  // Create a reusable style
  var style = wb.createStyle({
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
    .number(5)
    .style({ font: { size: 13 } });

  ws.cell(5, 4)
    .string('Sinh viên nam')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(5, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws.cell(6, 4)
    .string('Sinh viên nữ')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(6, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws.cell(7, 4)
    .string('Số lượt nhắn tin')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(7, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws.cell(8, 4)
    .string('Số phiếu báo cáo')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(8, 6)
    .number(5)
    .style({ font: { size: 13 } });

  // thống kê theo tháng
  ws2
    .cell(2, 4, 2, 5, true)
    .string('Thống kê theo tháng')
    .style({ font: { color: 'red', size: 15 } });

  ws2.column(4).setWidth(35);

  ws2
    .cell(4, 4)
    .string('Số lượt match')
    .style({ font: { color: 'red', size: 13 } });
  ws2
    .cell(4, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws2
    .cell(5, 4)
    .string('Thời gian hoạt động của người dùng')
    .style({ font: { color: 'red', size: 13 } });
  ws2
    .cell(5, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws2
    .cell(6, 4)
    .string('Số lượng người dùng hoạt động')
    .style({ font: { color: 'red', size: 13 } });
  ws2
    .cell(6, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws2
    .cell(7, 4)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });
  ws2
    .cell(7, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws2
    .cell(8, 4)
    .string('Số lượt nhắn tin')
    .style({ font: { color: 'red', size: 13 } });
  ws2
    .cell(8, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws2
    .cell(9, 4)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });
  ws2
    .cell(9, 6)
    .number(5)
    .style({ font: { size: 13 } });

  // thống kê theo năm
  ws3
    .cell(2, 4, 2, 5, true)
    .string('Thống kê theo năm')
    .style({ font: { color: 'red', size: 15 } });

  ws3.column(4).setWidth(35);

  ws3
    .cell(4, 4)
    .string('Số lượt match')
    .style({ font: { color: 'red', size: 13 } });
  ws3
    .cell(4, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws3
    .cell(5, 4)
    .string('Thời gian hoạt động của người dùng')
    .style({ font: { color: 'red', size: 13 } });
  ws3
    .cell(5, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws3
    .cell(6, 4)
    .string('Số lượng người dùng hoạt động')
    .style({ font: { color: 'red', size: 13 } });
  ws3
    .cell(6, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws3
    .cell(7, 4)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });
  ws3
    .cell(7, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws3
    .cell(8, 4)
    .string('Số lượt nhắn tin')
    .style({ font: { color: 'red', size: 13 } });
  ws3
    .cell(8, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws3
    .cell(9, 4)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });
  ws3
    .cell(9, 6)
    .number(5)
    .style({ font: { size: 13 } });

  // thống kê theo 10 năm
  ws4
    .cell(2, 4, 2, 5, true)
    .string('Thống kê từ năm 2020 - 2030')
    .style({ font: { color: 'red', size: 15 } });

  ws4.column(4).setWidth(35);

  ws4
    .cell(4, 4)
    .string('Số lượt match')
    .style({ font: { color: 'red', size: 13 } });
  ws4
    .cell(4, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws4
    .cell(5, 4)
    .string('Thời gian hoạt động của người dùng')
    .style({ font: { color: 'red', size: 13 } });
  ws4
    .cell(5, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws4
    .cell(6, 4)
    .string('Số lượng người dùng hoạt động')
    .style({ font: { color: 'red', size: 13 } });
  ws4
    .cell(6, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws4
    .cell(7, 4)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });
  ws4
    .cell(7, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws4
    .cell(8, 4)
    .string('Số lượt nhắn tin')
    .style({ font: { color: 'red', size: 13 } });
  ws4
    .cell(8, 6)
    .number(5)
    .style({ font: { size: 13 } });

  ws4
    .cell(9, 4)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });
  ws4
    .cell(9, 6)
    .number(5)
    .style({ font: { size: 13 } });

  const fileName = v4();
  wb.write(`src/public/file/${fileName}.xlsx`);
  return fileName + '.xlsx';
};

module.exports = exportExcel;
