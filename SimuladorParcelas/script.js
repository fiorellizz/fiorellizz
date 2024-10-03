function calcularParcelas() {
    const valorProduto = parseFloat(document.getElementById("valorProduto").value);
    
    if (isNaN(valorProduto) || valorProduto <= 0) {
        alert("Por favor, insira um valor válido para o produto.");
        return;
    }

    const taxas = [7.49, 8.49, 9.39, 10.34, 11.24, 12.17, 13.53, 14.51, 15.51, 16.54, 
                   17.25, 18.66, 19.76, 20.88, 22.05, 23.25, 24.47, 25.73];
    
    const tbody = document.querySelector("#tabelaParcelas tbody");
    tbody.innerHTML = "";

    taxas.forEach((taxa, index) => {
        const parcelas = index + 1;
        const montante = valorProduto * (1 + (taxa / 100));
        const parcela = montante / parcelas;

        const row = `<tr>
                        <td>${parcelas}x</td>  <!-- Quantidade de parcelas -->
                        <td>R$ ${montante.toFixed(2)}</td> <!-- Montante total -->
                        <td>R$ ${parcela.toFixed(2)}</td> <!-- Valor da parcela -->
                     </tr>`;
        
        tbody.innerHTML += row;
    });
}

document.getElementById("valorProduto").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calcularParcelas();
    }
});