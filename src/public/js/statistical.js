$(document).ready(function () {
  // get value emlement input statistical
  const totalMatch = $('input[name="totalMatch"]')[0];
  const totalActivityUser = $('input[name="totalActivityUser"]')[0];
  const totalTimeActivityUser = $('input[name="totalTimeActivityUser"]')[0];
  const totalReport = $('input[name="totalReport"]')[0];
  const totalMessage = $('input[name="totalMessage"]')[0];
  const totalBlock = $('input[name="totalBlock"]')[0];
  const data = $('input[name="data"]')[0];

  let labelString = '';

  if (data.value.split(',').length > 12) {
    labelString = 'Ngày';
  } else {
    labelString = 'Tháng';
  }

  const arrLabel = data.value.split(',').map((value) => Number(value));

  const arrTotalMatch = totalMatch.value
    .split(',')
    .map((value) => Number(value));
  const arrTotalActivityUser = totalActivityUser.value
    .split(',')
    .map((value) => Number(value));
  const arrTotalTimeActivityUser = totalTimeActivityUser.value
    .split(',')
    .map((value) => Number(value));

  const arrTotalReport = totalReport.value
    .split(',')
    .map((value) => Number(value));

  const arrTotalMessage = totalMessage.value
    .split(',')
    .map((value) => Number(value));

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
          label: 'Số lượt match',
          borderColor: '#FF99FF',
          backgroundColor: '#FF99FF',
          fill: false,
        },
        {
          data: arrTotalTimeActivityUser,
          label: 'Thời gian hoạt động của người dùng',
          borderColor: '#458af7',
          fill: true,
          backgroundColor: '#458af7',
        },
        {
          data: arrTotalActivityUser,
          label: 'Số lượng người dùng hoạt động',
          borderColor: '#33FF33',
          fill: false,
          backgroundColor: '#33FF33',
        },
        {
          data: arrTotalReport,
          label: 'Số lượt báo cáo',
          borderColor: '#FF9900',
          backgroundColor: '#FF9900',
          fill: false,
        },
        {
          data: arrTotalMessage,
          label: 'Số lượt tin nhắn',
          borderColor: '#3cba9f',
          fill: true,
          backgroundColor: '#3cba9f',
        },
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
        text: 'Thống kê',
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
});
