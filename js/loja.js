
const botoesPacote = document.querySelectorAll(".cartao-pacote");
const pacoteEscolhido = document.querySelector("#pacote-escolhido");
const totalPedido = document.querySelector("#total-pedido");
const continuarPedido = document.querySelector("#continuar-pedido");
const botoesPagamento = document.querySelectorAll(".opcao-pagamento");

// Seleção dos pacotes de VP
botoesPacote.forEach((botao) => {
    botao.setAttribute("aria-pressed", "false");

    botao.addEventListener("click", () => {
        botoesPacote.forEach((item) => {
            item.classList.remove("selecionado");
            item.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("selecionado");
        botao.setAttribute("aria-pressed", "true");

        pacoteEscolhido.textContent =
            `Gift card de ${botao.dataset.vp} VP`;

        totalPedido.textContent =
            `R$ ${botao.dataset.preco}`;

        continuarPedido.textContent = "Continuar ›";
        continuarPedido.classList.remove("desativado");

        continuarPedido.setAttribute("aria-disabled", "false");
    });
});

// Seleção do método de pagamento
botoesPagamento.forEach((botao) => {
    botao.setAttribute("aria-pressed", "false");

    botao.addEventListener("click", () => {
        botoesPagamento.forEach((item) => {
            item.classList.remove("selecionada");
            item.setAttribute("aria-pressed", "false");
        });

        botao.classList.add("selecionada");
        botao.setAttribute("aria-pressed", "true");
    });
});
