$(document).ready(function () {
  // get value emlement input statistical
  let totalMatch = $('input[name="totalMatch"]')[0];
  let totalReport = $('input[name="totalReport"]')[0];
  let totalMessage = $('input[name="totalMessage"]')[0];
  let totalBlock = $('input[name="totalBlock"]')[0];
  let data = $('input[name="data"]')[0];
  let titleChart = $('#titleChart');

  let labelString = '';

  if (data.value.split(',').length === 12) {
    labelString = 'Tháng';
  } else if (data.value.split(',').length === 11) {
    labelString = 'Năm';
  } else {
    labelString = 'Ngày';
  }

  let arrLabel = data.value.split(',').map((value) => Number(value));

  let arrTotalMatch = totalMatch.value
    .split(',')
    .map((value) => Number(value));

  let arrTotalReport = totalReport.value
    .split(',')
    .map((value) => Number(value));

  let arrTotalMessage = totalMessage.value
    .split(',')
    .map((value) => Number(value));

  let arrTotalBlock = totalBlock.value
    .split(',')
    .map((value) => Number(value));

  let ctx = $('#chart-line');
  let myLineChart = new Chart(ctx, {
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

  // // form input action
  // let form = $('form');
  // let btnSearch = $('#btnSearch')[0];
  // let select = $('select');
  // let input = $('form>input');
  // btnSearch.addEventListener('click', function () {
  //   select[0].value.trim() === 'Lựa chọn cơ sở'
  //     ? input[0].remove()
  //     : (input[0].value = select[0].value);
  //   select[1].value.trim() === 'Lựa chọn ngành học'
  //     ? input[1].remove()
  //     : (input[1].value = select[1].value);
  //   select[2].value.trim() === 'Lựa chọn khóa học'
  //     ? input[2].remove()
  //     : (input[2].value = select[2].value);
  //   input[3].value = select[3].value;
  //   form[0].submit();
  // });
});
