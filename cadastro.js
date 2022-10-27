/* Para iniciar o banco de dados com os produtos já inseridos, favor, clicar no botão amarelo da página de cadastro */

var produtos = []
if (localStorage.getItem('produtos')) {
    produtos = JSON.parse(localStorage.getItem('produtos'))
}

function cadastrarProduto() {
    if (localStorage.getItem('produtos')) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    let obj = 0
    let nomeProduto = ""
    let categoria = ""
    let preco = ""
    let estoque = ""
    nomeProduto = document.getElementById('nomeProduto').value
    categoria = document.getElementById('categoria').value
    preco = document.getElementById('preco').value
    estoque = document.getElementById('estoque').value

    if (validar(nomeProduto, categoria, preco, estoque)) {
        obj = {
            nomeProduto: nomeProduto,
            categoria: categoria,
            preco: preco,
            estoque: estoque
        }
        produtos.push(obj)
        console.log(obj)
        localStorage.setItem('produtos', JSON.stringify(produtos))
    }
    mostrarTabela()
}

function sucesso() {
    document.getElementById("sucesso").setAttribute("class", "w-100 btn btn-success btn-lg")
    document.getElementById("sucesso").innerHTML = "Sucesso"
    setTimeout(() => {
        document.getElementById("sucesso").setAttribute("class", "w-100 btn btn-primary btn-lg")
        document.getElementById("sucesso").innerHTML = "Cadastrar"
    }, 4000)
}

function mostrarTabela() {
    let produtos = []
    if (localStorage.getItem('produtos') != null) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    let txt = ''
    for (let i = 0; i < produtos.length; i++) {
        txt += `<tr>
                        <td>${produtos[i].nomeProduto}</td>
                        <td>${produtos[i].categoria}</td>
                        <td>${produtos[i].preco}</td>
                        <td>${produtos[i].estoque}</td>
                        <td><button id="bte${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Editar</button>
                        <button id="btd${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Deletar</button></td>
                    </tr>`
    }
    document.getElementsByTagName('tbody')[0].innerHTML = txt
    for (let i = 0; i < produtos.length; i++) {
        document.getElementById(`bte${i}`).setAttribute('onclick', `editar(${i})`)
        document.getElementById(`btd${i}`).setAttribute('onclick', `deletar(${i})`)
    }
}

function editar(i) {
    let produtos = []
    if (localStorage.getItem('produtos') != null) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    let novoNomeProduto = prompt("Novo nome do produto", produtos[i].nomeProduto)
    let novaCategoria = prompt("Novo nome do produto", produtos[i].categoria)
    let novoPreco = prompt("Novo nome do produto", produtos[i].preco)
    let estoque = prompt("Novo nome do produto", produtos[i].estoque)

    if (validar(nomeProduto, categoria, preco, estoque)) {
        let obj = 0
        obj = {
            nomeProduto: novoNomeProduto,
            categoria: novaCategoria,
            preco: novoPreco,
            estoque: estoque
        }
        produtos[i] = obj
        localStorage.setItem('produtos', JSON.stringify(produtos))
    }
    mostrarTabela()
}

function deletar(i) {
    let produtos = []
    if (localStorage.getItem('produtos') != null) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    produtos.splice(i, 1)
    localStorage.setItem('produtos', JSON.stringify(produtos))
    mostrarTabela()
}

function validar(nomeProduto, categoria, preco, estoque) {
    if (nomeProduto != "" && categoria != "" && preco != "" && estoque != "") {
        if (estoque > 1) {
            for (let i = 0; i < produtos.length; i++) {
                if (nomeProduto.toLowerCase() == produtos[i].nomeProduto.toLowerCase()) {
                    console.log(produtos[i].nomeProduto)
                    erro()
                    document.getElementById("erro").innerHTML = "Produto já cadastrado"
                    return false
                }
            }
            sucesso()
            mostrarTabela()
            return true
        } else {
            erro()
            document.getElementById("erro").innerHTML = "O estoque precisa ser maior que zero!"
            return false
        }
    } else {
        erro()
        document.getElementById("erro").innerHTML = "Inserir todos os dados"
        return false
    }
}

function erro() {
    document.getElementById("erro").hidden = false
    setTimeout(() => {
        document.getElementById("erro").hidden = true
    }, 10000)
}




function montarBanco() {
    let obj = [{nomeProduto: "Queijo Brie", categoria: "Laticínios", preco: "10.90", estoque: "10"},
    {nomeProduto: "Queijo Goda", categoria: "Laticínios", preco: "12.60", estoque: "10"},
    {nomeProduto: "Queijo Gorgonzola", categoria: "Laticínios", preco: "12.90", estoque: "10"},
    {nomeProduto: "Queijo Parmesão", categoria: "Laticínios", preco: "20.20", estoque: "10"},
    {nomeProduto: "Queijo Provolone", categoria: "Laticínios", preco: "22.00", estoque: "10"},
    {nomeProduto: "Leite Integral", categoria: "Laticínios", preco: "13.50", estoque: "10"},
    {nomeProduto: "Leite Desnatado", categoria: "Laticínios", preco: "21.80", estoque: "10"},
    {nomeProduto: "Leite de Soja", categoria: "Laticínios", preco: "9.90", estoque: "10"},
    {nomeProduto: "Kefir", categoria: "Laticínios", preco: "9.90", estoque: "10"},
    {nomeProduto: "Leite Fermentado", categoria: "Laticínios", preco: "10.00", estoque: "10"},
    {nomeProduto: "Queijo Prato", categoria: "Laticínios", preco: "11.00", estoque: "10"},

    {nomeProduto: "Salame Basco", categoria: "Cárneos", preco: "22.80", estoque: "10"},
    {nomeProduto: "Salame Italiano", categoria: "Cárneos", preco: "2.70", estoque: "10"},
    {nomeProduto: "Panceta", categoria: "Cárneos", preco: "10.90", estoque: "10"},
    {nomeProduto: "Paleta", categoria: "Cárneos", preco: "11.00", estoque: "10"},
    {nomeProduto: "Picanha", categoria: "Cárneos", preco: "20.90", estoque: "10"},
    {nomeProduto: "Maminha", categoria: "Cárneos", preco: "12.60", estoque: "10"},
    {nomeProduto: "Peito de Frango", categoria: "Cárneos", preco: "13.90", estoque: "10"},
    {nomeProduto: "Asa de Frango", categoria: "Cárneos", preco: "13.50", estoque: "10"},
    {nomeProduto: "Presunto", categoria: "Cárneos", preco: "14.70", estoque: "10"},
    {nomeProduto: "Lombo", categoria: "Cárneos", preco: "15.40", estoque: "10"},

    {nomeProduto: "Coca", categoria: "Bebidas", preco: "5.90", estoque: "10"},
    {nomeProduto: "Fanta Uva", categoria: "Bebidas", preco: "3.60", estoque: "10"},
    {nomeProduto: "Fanta Laranja", categoria: "Bebidass", preco: "3.90", estoque: "10"},
    {nomeProduto: "Redbull", categoria: "Bebidas", preco: "3.80", estoque: "10"},
    {nomeProduto: "Burn", categoria: "Bebidas", preco: "3.60", estoque: "10"},
    {nomeProduto: "Monster", categoria: "Bebidas", preco: "4.80", estoque: "10"},
    {nomeProduto: "Skol", categoria: "Bebidas", preco: "3.90", estoque: "10"},
    {nomeProduto: "Original", categoria: "Bebidas", preco: "3.40", estoque: "10"},
    {nomeProduto: "Pepci", categoria: "Bebidas", preco: "3.90", estoque: "10"},
    {nomeProduto: "Vinho", categoria: "Bebidas", preco: "2.30", estoque: "10"}]
   
    localStorage.setItem('produtos', JSON.stringify(obj))
}
 