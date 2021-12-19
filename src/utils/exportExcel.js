// Require library
let xl = require('excel4node');
let { v4 } = require('uuid');
let moment = require('moment');

let exportExcel = (data, dataMonths, dataYears, listUser, obj) => {
  const { totalUser, totalMale, totalFeMale, totalReport, facilities } = data;
  const { totalReportByFacility } = obj;
  const {
    totalMatchMonths,
    totalReportMonths,
    totalBlockMonths,
    totalMatchPendingMonths,
  } = dataMonths;
  const {
    totalMatchYears,
    totalReportYears,
    totalBlockYears,
    totalMatchPendingYears,
  } = dataYears;

  // Create a new instance of a Workbook class
  let wb = new xl.Workbook();

  // Add Worksheets to the workbook
  let ws = wb.addWorksheet('Tất cả');
  let ws2 = wb.addWorksheet('Tháng');
  let ws4 = wb.addWorksheet('Năm');
  let wUsers = wb.addWorksheet('Danh sách người dùng');
  let wFacilities = wb.addWorksheet('Thống kê theo cơ sở');

  // Create a reusable style
  let style = wb.createStyle({
    font: {
      color: '#FF0800',
      size: 12,
    },
  });

  ws.cell(2, 2, 2, 5, true)
    .string('Thống kê')
    .style({ font: { color: 'red', size: 15 } });

  ws.column(1).setWidth(25);
  ws.column(2).setWidth(15);
  ws.column(3).setWidth(15);
  ws.column(4).setWidth(15);

  ws.cell(4, 1)
    .string('Tổng số người dùng')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(5, 1)
    .number(totalUser)
    .style({ font: { size: 13 } });

  ws.cell(4, 2)
    .string('Sinh viên nam')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(5, 2)
    .number(totalMale)
    .style({ font: { size: 13 } });

  ws.cell(4, 3)
    .string('Sinh viên nữ')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(5, 3)
    .number(totalFeMale)
    .style({ font: { size: 13 } });

  ws.cell(4, 4)
    .string('Số phiếu báo cáo')
    .style({ font: { color: 'red', size: 13 } });
  ws.cell(5, 4)
    .number(totalReport)
    .style({ font: { size: 13 } });

  // thống kê theo tháng
  ws2
    .cell(2, 1, 2, 5, true)
    .string('Thống kê theo tháng của năm 2021')
    .style({ font: { color: 'red', size: 15 } });

  ws2.column(1).setWidth(35);

  ws2
    .cell(3, 2)
    .string('Tháng 1')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 3)
    .string('Tháng 2')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 4)
    .string('Tháng 3')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 5)
    .string('Tháng 4')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 6)
    .string('Tháng 5')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 7)
    .string('Tháng 6')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 8)
    .string('Tháng 7')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 9)
    .string('Tháng 8')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 10)
    .string('Tháng 9')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 11)
    .string('Tháng 10')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 12)
    .string('Tháng 11')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(3, 13)
    .string('Tháng 12')
    .style({ font: { color: 'red', size: 13 } });

  ws2
    .cell(4, 1)
    .string('Số lượt kết bạn thành công')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalMatchMonths.length; i++) {
    ws2
      .cell(4, 2 + i)
      .number(totalMatchMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws2
    .cell(5, 1)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalReportMonths.length; i++) {
    ws2
      .cell(5, 2 + i)
      .number(totalReportMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws2
    .cell(6, 1)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalBlockMonths.length; i++) {
    ws2
      .cell(6, 2 + i)
      .number(totalBlockMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws2
    .cell(7, 1)
    .string('Số lượt gửi lời mời kết bạn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalMatchPendingMonths.length; i++) {
    ws2
      .cell(7, 2 + i)
      .number(totalMatchPendingMonths[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  // thống kê theo 10 năm
  ws4
    .cell(2, 1, 2, 5, true)
    .string('Thống kê từ năm 2020 - 2030')
    .style({ font: { color: 'red', size: 15 } });

  ws4.column(1).setWidth(35);

  ws4
    .cell(3, 2)
    .string('Năm 2021')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 3)
    .string('Năm 2022')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 4)
    .string('Năm 2023')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 5)
    .string('Năm 2024')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 6)
    .string('Năm 2025')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 7)
    .string('Năm 2026')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 8)
    .string('Năm 2027')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 9)
    .string('Năm 2028')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 10)
    .string('Năm 2029')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(3, 11)
    .string('Năm 2030')
    .style({ font: { color: 'red', size: 13 } });

  ws4
    .cell(4, 1)
    .string('Số lượt kết bạn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalMatchYears.length; i++) {
    ws4
      .cell(4, 2 + i)
      .number(totalMatchYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws4
    .cell(5, 1)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalReportYears.length; i++) {
    ws4
      .cell(5, 2 + i)
      .number(totalReportYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws4
    .cell(6, 1)
    .string('Số lượt chặn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalBlockYears.length; i++) {
    ws4
      .cell(6, 2 + i)
      .number(totalBlockYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  ws4
    .cell(7, 1)
    .string('Số lượt gửi lời mời kết bạn')
    .style({ font: { color: 'red', size: 13 } });

  for (let i = 0; i < totalMatchPendingYears.length; i++) {
    ws2
      .cell(7, 2 + i)
      .number(totalMatchPendingYears[i])
      .style({ font: { color: 'black', size: 13 } });
  }

  wUsers.column(2).setWidth(35);
  wUsers.column(3).setWidth(20);
  wUsers.column(4).setWidth(20);
  wUsers.column(5).setWidth(20);
  wUsers.column(6).setWidth(20);
  wUsers.column(7).setWidth(20);
  wUsers.column(8).setWidth(20);
  wUsers.column(9).setWidth(20);
  wUsers.column(10).setWidth(20);
  wUsers.column(11).setWidth(20);
  wUsers.column(12).setWidth(20);
  wUsers.column(13).setWidth(20);
  wUsers.column(14).setWidth(20);
  wUsers.column(15).setWidth(20);

  wUsers
    .cell(1, 3)
    .string('Danh sách người dùng')
    .style({ font: { color: 'red', size: 15 } });

  wUsers
    .cell(2, 1)
    .string('STT')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 2)
    .string('Email')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 3)
    .string('Họ tên')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 4)
    .string('Vai trò')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 5)
    .string('Số điện thoại')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 6)
    .string('Giới tính')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 7)
    .string('Ngày sinh')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 8)
    .string('Sở thích')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 9)
    .string('Cơ sở')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 10)
    .string('Chuyên ngành')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 11)
    .string('Khóa học')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 12)
    .string('Báo cáo')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 13)
    .string('Trạng thái')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 14)
    .string('Ngày tạo')
    .style({ font: { color: 'black', size: 13 } });

  wUsers
    .cell(2, 15)
    .string('Ngày cập nhật')
    .style({ font: { color: 'black', size: 13 } });

  for (let i = 0; i < listUser.length; i++) {
    const keys = Object.keys(listUser[i]);
    for (let j = 0; j < keys.length; j++) {
      const type = typeof listUser[i][keys[j]];
      if (type === 'number') {
        wUsers
          .cell(i + 3, j + 1)
          .number(listUser[i][keys[j]])
          .style({ font: { color: 'black', size: 13 } });
      } else {
        wUsers
          .cell(i + 3, j + 1)
          .string(listUser[i][keys[j]])
          .style({ font: { color: 'black', size: 13 } });
      }
    }
  }

  // Thống kê theo cơ sở

  wFacilities
    .cell(1, 3)
    .string('Thống kê theo cơ sở')
    .style({ font: { color: 'red', size: 15 } });

  wFacilities.column(1).setWidth(19);

  for (let i = 0; i < facilities.length; i++) {
    wFacilities.column(i + 2).setWidth(28);
    wFacilities
      .cell(2, i + 2)
      .string(facilities[i])
      .style({ font: { color: 'black', size: 13 } });

    const totalUser = listUser.filter(
      (val) => val.facilities === facilities[i],
    );
    wFacilities
      .cell(3, i + 2)
      .number(totalUser.length)
      .style({ font: { color: 'black', size: 13 } });

    const totalUserMale = listUser.filter(
      (val) => val.facilities === facilities[i] && val.gender === 'Nam',
    );
    wFacilities
      .cell(4, i + 2)
      .number(totalUserMale.length)
      .style({ font: { color: 'black', size: 13 } });

    const totalUserFeMale = listUser.filter(
      (val) => val.facilities === facilities[i] && val.gender === 'Nữ',
    );
    wFacilities
      .cell(5, i + 2)
      .number(totalUserFeMale.length)
      .style({ font: { color: 'black', size: 13 } });

    if (facilities[i] in totalReportByFacility) {
      wFacilities
        .cell(6, i + 2)
        .number(totalReportByFacility[facilities[i]])
        .style({ font: { color: 'black', size: 13 } });
    }
  }

  wFacilities
    .cell(3, 1)
    .string('Tổng số người dùng')
    .style({ font: { color: 'black', size: 13 } });

  wFacilities
    .cell(4, 1)
    .string('Sinh viên nam')
    .style({ font: { color: 'black', size: 13 } });

  wFacilities
    .cell(5, 1)
    .string('Sinh viên nữ')
    .style({ font: { color: 'black', size: 13 } });

  wFacilities
    .cell(6, 1)
    .string('Số lượt báo cáo')
    .style({ font: { color: 'black', size: 13 } });

  let fileName = `PolyDating-Thống kê-${moment().unix()}`;
  wb.write(`src/public/files/${fileName}.xlsx`);
  return fileName + '.xlsx';
};

module.exports = exportExcel;
