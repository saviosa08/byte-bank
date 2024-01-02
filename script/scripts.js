import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dólar',
            data: [],
            borderWidth: 1
        }]
    },
});

// setInterval(() => conectaAPI(), 5000)
// async function conectaAPI() {
//     const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL")
//     const conectaTraduzido = await conecta.json()
//     let tempo = geraHorario();
//     let valor = conectaTraduzido.USDBRL.ask;
//     adiocionarDados(graficoParaDolar, tempo, valor);
//     imprimeCotacao("dolar", valor);
// }

function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()
    return horario;
}

geraHorario();

function adiocionarDados(grafico,legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", event =>{
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adiocionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById('graficoIene')
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    }
})

let workerIene = new Worker ("./script/workers/workerIene.js");
workerIene.postMessage('iene');
workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adiocionarDados(graficoParaIene, tempo, valor);
    selecionaCotacao("iene", valor);
})