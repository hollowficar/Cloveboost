const formularioPedido = document.querySelector("#formulario-pedido");
const eloAtual = document.querySelector("#elo-atual");
const eloDesejado = document.querySelector("#elo-desejado");
const resumoPedido = document.querySelector("#resumo-pedido");
const erroPedido = document.querySelector("#erro-pedido");
const acoesPedido = document.querySelector("#acoes-pedido");
const estimativaValor = document.querySelector("#estimativa-valor");
const estimativaDetalhe = document.querySelector("#estimativa-detalhe");

const precosPorDivisao = [300, 600, 900, 3000, 5000, 9000, 16000];
const formatadorMoeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
});

function calcularEstimativa(atual, desejado) {
    if (desejado <= atual) {
        return { erro: "O elo desejado precisa ser maior que o elo atual." };
    }

    if (desejado > 21) {
        return { negociavel: true };
    }

    let total = 0;
    const divisoes = desejado - atual;

    for (let rank = Math.max(atual + 1, 1); rank <= desejado; rank += 1) {
        const indiceFaixa = Math.floor((rank - 1) / 3);
        total += precosPorDivisao[indiceFaixa];
    }

    return { total, divisoes };
}

function atualizarEstimativa() {
    erroPedido.textContent = "";
    acoesPedido.hidden = true;

    if (eloAtual.value === "" || eloDesejado.value === "") {
        estimativaValor.textContent = "Selecione seus elos";
        estimativaDetalhe.textContent = "O valor é calculado por divisão, conforme a tabela.";
        return null;
    }

    const atual = Number(eloAtual.value);
    const desejado = Number(eloDesejado.value);
    const estimativa = calcularEstimativa(atual, desejado);

    if (estimativa.erro) {
        estimativaValor.textContent = "Elo inválido";
        estimativaDetalhe.textContent = estimativa.erro;
        return estimativa;
    }

    if (estimativa.negociavel) {
        estimativaValor.textContent = "Imortal+ sob consulta";
        estimativaDetalhe.textContent = "Esse elo é negociável. Entre em contato para confirmar o orçamento.";
        return estimativa;
    }

    estimativaValor.textContent = formatadorMoeda.format(estimativa.total / 100);
    estimativaDetalhe.textContent = `${estimativa.divisoes} ${estimativa.divisoes === 1 ? "divisão" : "divisões"} até o elo desejado.`;
    return estimativa;
}

eloAtual.addEventListener("change", atualizarEstimativa);
eloDesejado.addEventListener("change", atualizarEstimativa);

formularioPedido.addEventListener("submit", (evento) => {
    evento.preventDefault();
    erroPedido.textContent = "";
    acoesPedido.hidden = true;

    const estimativa = atualizarEstimativa();

    if (!estimativa || estimativa.erro) {
        erroPedido.textContent = estimativa?.erro || "Selecione seu elo atual e o elo desejado.";
        eloDesejado.focus();
        return;
    }

    const dados = new FormData(formularioPedido);
    const nome = String(dados.get("nome")).trim();
    const contato = String(dados.get("contato")).trim();
    const atualTexto = eloAtual.selectedOptions[0].textContent;
    const desejadoTexto = eloDesejado.selectedOptions[0].textContent;
    const observacoes = String(dados.get("observacoes")).trim();
    const valorTexto = estimativa.negociavel
        ? "valor sob consulta (Imortal+)"
        : `estimativa de ${formatadorMoeda.format(estimativa.total / 100)}`;

    resumoPedido.textContent = `Solicitação de ${nome}: ${atualTexto} → ${desejadoTexto}, ${valorTexto}. Contato: ${contato}.${observacoes ? ` Observações: ${observacoes}` : ""}`;
    acoesPedido.hidden = false;
});
