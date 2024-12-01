
document.addEventListener("DOMContentLoaded", function () {
    
    const produtos = [
      { id: 1, nome: "Dipirona", preco: 10.00 },
      { id: 2, nome: "Dorflex", preco: 20.00 },
      { id: 3, nome: "Doril", preco: 30.00 },
      { id: 4, nome: "Doripan", preco: 40.00 },
     
    ];
  
  
    const carrinho = [];
  
    // function p atualizar os itens do carrinho
    function atualizarItensCarrinho() {
      const containerItensCarrinho = document.getElementById("cartItems");
      containerItensCarrinho.innerHTML = ""; // limpa os itens d antes
  
      let subtotal = 0;

      for (const item of carrinho) {

        const linhaItem = document.createElement("tr");
        linhaItem.innerHTML = `
          <td>${item.quantidade}x</td>
          <td>${item.produto.nome}</td>
          <td>R$ ${item.produto.preco.toFixed(2)}</td>
        `;

        containerItensCarrinho.appendChild(linhaItem);
        subtotal += item.quantidade * item.produto.preco;
      }
  
      // atualiza p preço c desconto
      document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2)}`;
  
      const total = calcularTotal(subtotal);

      document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
    }
  
    // function p calcular o preço c desconto
    function calcularTotal(subtotal) {

      if (subtotal >= 80) {
        return subtotal * 0.9; 
      }
      return subtotal;

    }
  
    // function p add item no carrinho
    function adicionarAoCarrinho(idProduto, quantidade) {

      const produto = produtos.find((p) => p.id === idProduto);
      if (produto) {

        const itemExistente = carrinho.find((item) => item.produto.id === idProduto);

        if (itemExistente) {
          itemExistente.quantidade += quantidade; // isso atualiza a quantidade se o item já tiver no carrinho

        } else {
          carrinho.push({ produto, quantidade }); // add outro item
        }
        atualizarItensCarrinho(); 
      }
    }
  
    // aq define que quando o evento "clicar" no botão de add ao carrinho acontecer, será efetivado
    document.getElementById("addProductButton").addEventListener("click", function () {

      const idProduto = parseInt(document.getElementById("productSelect").value);

      const quantidade = parseInt(document.getElementById("quantityInput").value);

      if (quantidade > 0) {
        adicionarAoCarrinho(idProduto, quantidade);
      }
    });
  
    // identifica as opções (os remédios) com id e agrega um valor a eles
    const selectProduto = document.getElementById("productSelect");
    produtos.forEach(produto => {

      const opcao = document.createElement("option");
      opcao.value = produto.id;

      opcao.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
      selectProduto.appendChild(opcao);
    });
  });
