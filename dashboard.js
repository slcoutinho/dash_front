let chart;

function preencheDropdown(parceiros) {
    const ddlParceiros = document.getElementById("ddlParceiros");
    parceiros.forEach(parceiro => {
        ddlParceiros.innerHTML += `<a class="dropdown-item" href="#" onclick="exibeDashParceiro(${parceiro.id})">${parceiro.nome}</a>`;
    });
}

function exibeDashParceiro(id) {
    fetch(`http://localhost:8088/agentesfinanceiros/${id}/dashboard`)
        .then(res => res.json())
        .then(res => preencheChart(res));
}

function preencheChart({ statusOk, statusFalha, statusFraude, nome }) {
    document.querySelector(".dropdown-toggle").innerHTML = nome;
    const ctxP = document.getElementById("chart").getContext('2d');
    const chartData = {
        type: 'pie',
        data: {
            labels: [`Ok (${statusOk})`, `Falha (${statusFalha})`, `Fraude (${statusFraude})`],
            datasets: [{
                data: [statusOk, statusFalha, statusFraude],
                backgroundColor: ["#32CD32", "#F7464A", "#F7A64A"],
                hoverBackgroundColor: ["#2AB91E", "#FF5A5E", "#F7C64A"],
            }],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 20,
                },
            },
        },
    };
    if (!chart) {
        chart = new Chart(ctxP, chartData);
    } else {
        chart.data.datasets[0].data = [statusOk, statusFalha, statusFraude];
        chart.data.labels = [`Ok (${statusOk})`, `Falha (${statusFalha})`, `Fraude (${statusFraude})`];
        chart.update();
    }
}
