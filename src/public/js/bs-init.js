document.addEventListener('DOMContentLoaded', function() {

	let charts = document.querySelectorAll('[data-bss-chart]');

	for (let chart of charts) {
		chart.chart = new Chart(chart, JSON.parse(chart.dataset.bssChart));
	}
}, false);