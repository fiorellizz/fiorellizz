function calcularComissao() {
    const indicador = document.getElementById("indicador").value;

    //Porcentagens
    const porcentagemComissao = {
        vendedor: {
            pos: [0.155, 0.095, 0.025],
            controle: [0.105, 0.075, 0.025],
            fibra: [0.155, 0.095, 0.025],
            delta: [0.105, 0.075, 0.025],
            nn: [0.155, 0.095, 0.025],
            sva: [0.105, 0.075, 0.025],
            terminal1: [0.01, 0.007, 0.005],
            terminal2: [0.005, 0.004, 0.003],
            acessorio: [0.1, 0.075, 0.05]
        },
        gerenteloja: {
            pos: [0.08, 0.06, 0.01],
            controle: [0.07, 0.05, 0.01],
            fibra: [0.08, 0.06, 0.01],
            delta: [0.07, 0.05, 0.01],
            nn: [0.08, 0.06, 0.01],
            sva: [0.07, 0.05, 0.01],
            terminal1: [0.007, 0.0049, 0.0035],
            terminal2: [0.0035, 0.0025, 0.0018],
            acessorio: [0.035, 0.0263, 0.0175]
        },
        gerentecomercial: {
            pos: [0.04, 0.03, 0.015],
            controle: [0.03, 0.02, 0.015],
            fibra: [0.04, 0.03, 0.015],
            delta: [0.03, 0.02, 0.015],
            nn: [0.04, 0.03, 0.015],
            sva: [0.03, 0.02, 0.015],
            terminal1: [0.004, 0.0028, 0.0020],
            terminal2: [0.002, 0.0014, 0.001],
            acessorio: [0.02, 0.015, 0.01]
        },
        gerenteregional: {
            pos: [0.035, 0.02, 0.01],
            controle: [0.025, 0.02, 0.01],
            fibra: [0.035, 0.02, 0.01],
            delta: [0.025, 0.02, 0.01],
            nn: [0.035, 0.02, 0.01],
            sva: [0.025, 0.02, 0.01],
            terminal1: [0.0018, 0.0013, 0.0009],
            terminal2: [0.0009, 0.0006, 0.0005],
            acessorio: [0.0125, 0.0090, 0.0060]
        }
    };

    const servicos = ["pos", "controle", "fibra", "delta", "nn", "sva", "terminal1", "terminal2", "acessorio"];
    let comissaoReceita = 0;
    let comissaoReceitaAcelerada = 0;

    servicos.forEach(servico => {

        const meta = parseFloat(document.getElementById(`meta-${servico}`).value) || 0;
        const real = parseFloat(document.getElementById(`real-${servico}`).value) || 0;
        const tkm = parseFloat(document.getElementById(`tkm-${servico}`).value) || 0;
        let produtividade = meta ? real / meta : 0;

        let comissao = 0;
        let premiacao = 0;
        let receita = 0;

        receita = tkm * real;

        if (indicador === 'vendedor') {
            if (servico === 'pos' || servico === 'controle' || servico === 'delta' || servico === 'sva' || servico === 'nn' || servico === 'fibra') {
                comissao = receita * 0.025; // 2,5% da receita
            } else if (servico === 'terminal1') {
                comissao = receita * 0.0025; // 0,25% da receita
            } else if (servico === 'terminal2') {
                comissao = receita * 0.0015; // 0,15% da receita
            } else if (servico === 'acessorio') {
                comissao = receita * 0.025; // 2,5% da receita
            }
        } else if (indicador === 'gerenteloja') {
            if (servico === 'pos' || servico === 'controle' || servico === 'delta' || servico === 'sva' || servico === 'nn' || servico === 'fibra') {
                comissao = receita * 0.02; // 2% da receita
            } else if (servico === 'terminal1') {
                comissao = receita * 0.0018; // 0,18% da receita
            } else if (servico === 'terminal2') {
                comissao = receita * 0.0011; // 0,11% da receita
            } else if (servico === 'acessorio') {
                comissao = receita * 0.0088; // 0,88% da receita
            }
        } else {
            comissao = 0; // 0% para gerentes comerciais e regionais
        }

        // Calcula a premiação com base na produtividade para o indicador selecionado
        if(real === 0){
            comissao = 0;
            premiacao = 0;
        } else {
            if (indicador === 'gerentecomercial' || indicador === 'gerenteregional') {
                if (produtividade >= 1.2) {
                    premiacao = receita * porcentagemComissao[indicador][servico][0];
                } else if (produtividade >= 1) {
                    premiacao = receita * porcentagemComissao[indicador][servico][1];
                } else if (produtividade >= 0.7) {
                    premiacao = receita * porcentagemComissao[indicador][servico][2];
                }
            } else {
                // Calcula a premiação com base na produtividade para vendedor ou gerente de loja
                if (produtividade >= 1.2) {
                    premiacao = receita * porcentagemComissao[indicador][servico][0];
                } else if (produtividade >= 1) {
                    premiacao = receita * porcentagemComissao[indicador][servico][1];
                } else if (produtividade >= 0.8) {
                    premiacao = receita * porcentagemComissao[indicador][servico][2];
                }
            }
        }

        
        let premiacaoParaAcelerar = premiacao;

        // Aplicando aceleradores individuais e de equipe para os serviços móveis
        if (["pos", "controle", "delta", "nn", "sva"].includes(servico)) {
            const acelIndividualMovel = parseFloat(document.getElementById("acelindividualmovel").value) || 0;
            const acelEquipeMovel = parseFloat(document.getElementById("acelequipemovel").value) || 0;

            const valorAcelIndividualMovel = premiacaoParaAcelerar * (acelIndividualMovel / 100);
            const valorAcelEquipeMovel = premiacaoParaAcelerar * (acelEquipeMovel / 100);

            premiacaoParaAcelerar += valorAcelIndividualMovel + valorAcelEquipeMovel;
        }

        // Aplicando aceleradores individuais e de equipe para "Fibra"
        if (servico === "fibra") {
            const acelIndividualFixa = parseFloat(document.getElementById("acelindividualfixa").value) || 0;
            const acelEquipeFixa = parseFloat(document.getElementById("acelequipefixa").value) || 0;

            const valorAcelIndividualFixa = premiacaoParaAcelerar * (acelIndividualFixa / 100);
            const valorAcelEquipeFixa = premiacaoParaAcelerar * (acelEquipeFixa / 100);

            premiacaoParaAcelerar += valorAcelIndividualFixa + valorAcelEquipeFixa;
        }

        let comissaoPremiacaoServico = comissao + premiacaoParaAcelerar;

        comissaoReceita += comissao + premiacao;
        comissaoReceitaAcelerada += comissaoPremiacaoServico;

        // Atualiza a projeção de produtividade e a comissão para cada serviço
        document.getElementById(`projecao-${servico}`).innerText = (produtividade * 100).toFixed(2) + '%';
        document.getElementById(`receita-${servico}`).innerText = 'R$ ' + receita.toFixed(2);
        document.getElementById(`comissao-${servico}`).innerText = 'R$ ' + comissao.toFixed(2);
        document.getElementById(`premiacao-${servico}`).innerText = 'R$ ' + premiacao.toFixed(2);
    });

    // Exibe o resultado final
    document.getElementById("resultado").innerText = `Comissão + Premiação: R$ ${comissaoReceita.toFixed(2)}\nComissão + Premiação + TFP: R$ ${comissaoReceitaAcelerada.toFixed(2)}`;
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calcularComissao();
    }
});