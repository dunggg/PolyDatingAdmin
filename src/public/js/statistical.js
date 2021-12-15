$(document).ready(function () {
  // get value emlement input statistical
  const totalMatch = $('input[name="totalMatch"]')[0];
  const totalMatchPending = $('input[name="totalMatchPending"]')[0];
  // const totalTimeActivityUser = $('input[name="totalTimeActivityUser"]')[0];
  const totalReport = $('input[name="totalReport"]')[0];
  // const totalMessage = $('input[name="totalMessage"]')[0];
  const totalBlock = $('input[name="totalBlock"]')[0];
  const data = $('input[name="data"]')[0];
  const titleChart = $('#titleChart');

  let labelString = '';

  if (data.value.split(',').length === 12) {
    labelString = 'Tháng';
  } else if (data.value.split(',').length === 11) {
    labelString = 'Năm';
  } else {
    labelString = 'Ngày';
  }

  const arrLabel = data.value.split(',').map((value) => Number(value));

  const arrTotalMatch = totalMatch.value
    .split(',')
    .map((value) => Number(value));
  const arrTotalMatchPending = totalMatchPending.value
    .split(',')
    .map((value) => Number(value));
  // const arrTotalTimeActivityUser = totalTimeActivityUser.value
  //   .split(',')
  //   .map((value) => Number(value));

  const arrTotalReport = totalReport.value
    .split(',')
    .map((value) => Number(value));

  // const arrTotalMessage = totalMessage.value
  //   .split(',')
  //   .map((value) => Number(value));

  const arrTotalBlock = totalBlock.value
    .split(',')
    .map((value) => Number(value));

  var ctx = $('#chart-line');
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrLabel,
      datasets: [
        {
          data: arrTotalMatch,
          label: 'Số lượt kết bạn thành công',
          borderColor: '#FF99FF',
          backgroundColor: '#FF99FF',
          fill: false,
        },
        {
          data: arrTotalMatchPending,
          label: 'Số lượt kết bạn đang chờ',
          borderColor: '#458af7',
          fill: true,
          backgroundColor: '#458af7',
        },
        // {
        //   data: arrTotalActivityUser,
        //   label: 'Số lượng người dùng hoạt động',
        //   borderColor: '#33FF33',
        //   fill: false,
        //   backgroundColor: '#33FF33',
        // },
        {
          data: arrTotalReport,
          label: 'Số lượt báo cáo',
          borderColor: '#FF9900',
          backgroundColor: '#FF9900',
          fill: false,
        },
        // {
        //   data: arrTotalMessage,
        //   label: 'Số lượt tin nhắn',
        //   borderColor: '#3cba9f',
        //   fill: true,
        //   backgroundColor: '#3cba9f',
        // },
        {
          data: arrTotalBlock,
          label: 'Số lượt chặn',
          borderColor: '#FF0000',
          fill: false,
          backgroundColor: '#FF0000',
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: `Thống kê ${titleChart[0].value}`,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString,
            },
            ticks: {
              major: {
                fontStyle: 'bold',
                fontColor: '#FF0000',
              },
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Số lượng',
            },
          },
        ],
      },
    },
  });

  // form input action
  const form = $('form');
  const btnSearch = $('#btnSearch')[0];
  const select = $('select');
  const input = $('form>input');
  const btnExport = $('#export')[0];
  const btnExport2 = document.getElementById('download');

  btnExport.addEventListener('click', async function () {
    try {
      const res = await fetch('http://localhost:3000/export-xlsx');
      const val = await res.json();
      btnExport2.href = `/public/files/${val}`;
      setTimeout(() => {
        btnExport2.click();
      }, 250);
    } catch (error) {
      console.log(error);
    }
  });

  btnSearch.addEventListener('click', function () {
    select[0].value.trim() === 'Lựa chọn cơ sở'
      ? input[0].remove()
      : (input[0].value = select[0].value);
    select[1].value.trim() === 'Lựa chọn ngành học'
      ? input[1].remove()
      : (input[1].value = select[1].value);
    select[2].value.trim() === 'Lựa chọn khóa học'
      ? input[2].remove()
      : (input[2].value = select[2].value);
    input[3].value = select[3].value;
    console.log(input[2], input[3]);
    form[0].submit();
  });
});
