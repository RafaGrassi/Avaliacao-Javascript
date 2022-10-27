/* Para iniciar o banco de dados com os produtos já inseridos, favor, clicar no botão amarelo da página de cadastro */


/* ------------------------------------------------------Parte da primeira tabela------------------------------------------------------ */

var produtos = []
if (localStorage.getItem('produtos')) {
    produtos = JSON.parse(localStorage.getItem('produtos'))
}

var carrinho = []
if (localStorage.getItem('carrinho')) {
    carrinho = JSON.parse(localStorage.getItem('carrinho'))
}

function adicionar(i) {
    var produtos = []
    if (localStorage.getItem('produtos')) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    var carrinho = []
    if (localStorage.getItem('carrinho')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }

    if (produtos[i].estoque == 0) {
        document.getElementById("erro").hidden = false
        document.getElementById("erro").setAttribute("class", "w-100 btn btn-warning btn-lg")
        document.getElementById("erro").innerHTML = "Produto fora de estoque"
        setTimeout(() => {
            document.getElementById("erro").hidden = true
        }, 5000)
        console.log("Acabou!!")
    } else {
        produtos[i].estoque--
        localStorage.setItem('produtos', JSON.stringify(produtos))

        console.log(produtos[i])

        if (checar(produtos[i].nomeProduto)) {
            for (let k = 0; k < carrinho.length; k++) {
                if (carrinho[k].nomeProduto.toLowerCase() == produtos[i].nomeProduto.toLowerCase()) {
                    carrinho[k].estoque++
                    console.log("Um item adicionado!")
                    localStorage.setItem('carrinho', JSON.stringify(carrinho))
                    break
                }
            }
            sucesso()
            mostrarTabela()
        } else {
            produtos[i].estoque = 1
            carrinho.push(produtos[i])
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            sucesso()
            mostrarTabela()
        }
    }
}

function checar(nome) {
    var carrinho = []
    if (localStorage.getItem('carrinho')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }
    for (let i = 0; i < carrinho.length; i++) {
        if (carrinho[i].nomeProduto.toLowerCase() == nome.toLowerCase()) {
            console.log("Produto já existe no carrinho")
            return true
        }
    }
    console.log("Produto ainda não existe no carrinho")
    return false
}


function sucesso() {
    document.getElementById("erro").hidden = false
    document.getElementById("erro").setAttribute("class", "w-100 btn btn-success btn-lg")
    document.getElementById("erro").innerHTML = "Sucesso"
    setTimeout(() => {
        document.getElementById("erro").hidden = true
    }, 5000)
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
                        <td><button id="bte${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Adicionar no carrinho</button>
                    </tr>`
    }
    document.getElementsByTagName('tbody')[0].innerHTML = txt
    for (let i = 0; i < produtos.length; i++) {
        document.getElementById(`bte${i}`).setAttribute('onclick', `adicionar(${i})`)
    }
}


/* ------------------------------------------------------Parte do carrinho------------------------------------------------------ */

function mostrarCarrinho() {
    let carrinho = []
    if (localStorage.getItem('carrinho') != null) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }
    let txt = ''
    for (let i = 0; i < carrinho.length; i++) {
        txt += `<tr>
                        <td>${carrinho[i].nomeProduto}</td>
                        <td>${carrinho[i].categoria}</td>
                        <td>${carrinho[i].preco}</td>
                        <td>${carrinho[i].estoque}</td>
                        <td><button id="bte${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Adicionar</button>
                        <button id="btd${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Subtrair</button></td>
                    </tr>`
    }
    document.getElementsByTagName('tbody')[0].innerHTML = txt
    for (let i = 0; i < carrinho.length; i++) {
        document.getElementById(`bte${i}`).setAttribute('onclick', `adicionarCarrinho(${i})`)
        document.getElementById(`btd${i}`).setAttribute('onclick', `subtrairCarrinho(${i})`)
    }
    total()
}

function adicionarCarrinho(i) {
    var produtos = []
    if (localStorage.getItem('produtos')) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    var carrinho = []
    if (localStorage.getItem('carrinho')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }

    let estoqueSobrando = ""

    for (let k = 0; k < produtos.length; k++) {
        if (produtos[k].nomeProduto.toLowerCase() == carrinho[i].nomeProduto.toLowerCase()) {
            estoqueSobrando = produtos[k].estoque
            break
        }
    }

    if (estoqueSobrando == 0) {
        document.getElementById("erro").hidden = false
        document.getElementById("erro").setAttribute("class", "w-100 btn btn-warning btn-lg")
        document.getElementById("erro").innerHTML = "Produto fora de estoque"
        setTimeout(() => {
            document.getElementById("erro").hidden = true
        }, 5000)
        console.log("Acabou!!")
    } else {
        carrinho[i].estoque++
        localStorage.setItem('carrinho', JSON.stringify(carrinho))

        console.log(carrinho[i])


        for (let k = 0; k < produtos.length; k++) {
            if (produtos[k].nomeProduto.toLowerCase() == carrinho[i].nomeProduto.toLowerCase()) {
                produtos[k].estoque--
                console.log("Um item adicionado!")
                localStorage.setItem('produtos', JSON.stringify(produtos))
                break
            }
        }
        sucesso()
        mostrarCarrinho()
        total()
    }

}

function subtrairCarrinho(i) {
    var produtos = []
    if (localStorage.getItem('produtos')) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }
    var carrinho = []
    if (localStorage.getItem('carrinho')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }

    carrinho[i].estoque--

    if (carrinho[i].estoque == 0) {
        deletar(i)
        total()
    } else {
        localStorage.setItem('carrinho', JSON.stringify(carrinho))
    }

    console.log(carrinho[i])

    for (let k = 0; k < produtos.length; k++) {
        if (produtos[k].nomeProduto.toLowerCase() == carrinho[i].nomeProduto.toLowerCase()) {
            produtos[k].estoque++
            console.log("Um item adicionado no estoque!")
            localStorage.setItem('produtos', JSON.stringify(produtos))
            break
        }
    }
    sucesso()
    mostrarCarrinho()
    total()
}

function deletar(i) {
    let carrinho = []
    if (localStorage.getItem('carrinho') != null) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }
    carrinho.splice(i, 1)
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    mostrarCarrinho()
}

function total() {
    var carrinho = []
    if (localStorage.getItem('carrinho')) {
        carrinho = JSON.parse(localStorage.getItem('carrinho'))
    }
    let total = 0
    for (let i = 0; i < carrinho.length; i++) {
        total += (parseFloat(carrinho[i].preco)) * (parseFloat(carrinho[i].estoque))
        total.toFixed(2)
    }
    console.log(total)
    document.getElementById("total").innerHTML = `Total da compra: R$ ${total}`
}

function erro() {
    document.getElementById("erro").hidden = false
    setTimeout(() => {
        document.getElementById("erro").hidden = true
    }, 10000)
}

/* ------------------------------------------------------Parte da Busca------------------------------------------------------ */

function procurar() {
    let produtos = []
    if (localStorage.getItem('produtos') != null) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }

    let txt = ''
    document.getElementsByTagName('tbody')[0].innerHTML = txt
    let procura = ""
    procura = document.getElementById('procura').value
    procura = procura.toLowerCase()
    console.log(procura)

    for (let i = 0; i < produtos.length; i++) {

        let termo = produtos[i].nomeProduto
        termo = termo.toLowerCase()

        if (termo.includes(procura)) {
            document.getElementsByTagName('tbody')[0].innerHTML += `<tr>
                        <td>${produtos[i].nomeProduto}</td>
                        <td>${produtos[i].categoria}</td>
                        <td>${produtos[i].preco}</td>
                        <td>${produtos[i].estoque}</td>
                        <td><button id="bte${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Adicionar no carrinho</button>
                    </tr>`
            document.getElementById(`bte${i}`).setAttribute('onclick', `adicionar(${i})`)

        }
    }
}

function categoria(cat) {
    let produtos = []
    if (localStorage.getItem('produtos') != null) {
        produtos = JSON.parse(localStorage.getItem('produtos'))
    }

    console.log(cat)

    let txt = ''
    document.getElementsByTagName('tbody')[0].innerHTML = txt
    let procura = ""
    procura = cat
    procura = procura.toLowerCase()
    console.log(procura)

    for (let i = 0; i < produtos.length; i++) {

        let termo = produtos[i].categoria
        termo = termo.toLowerCase()

        if (termo.includes(procura)) {
            document.getElementsByTagName('tbody')[0].innerHTML += `<tr>
                        <td>${produtos[i].nomeProduto}</td>
                        <td>${produtos[i].categoria}</td>
                        <td>${produtos[i].preco}</td>
                        <td>${produtos[i].estoque}</td>
                        <td><button id="bte${i}" type="button" class="btn btn-primary" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Adicionar no carrinho</button>
                    </tr>`
            document.getElementById(`bte${i}`).setAttribute('onclick', `adicionar(${i})`)

        }
    }
}

/* ------------------------------------------------------Parte da randomização da primeira tabela------------------------------------------------------ */

function aleatorio() {
    let table = document.getElementById("aleatorio")
    let rowsCollection = table.querySelectorAll("tr")
    let rows = Array.from(rowsCollection)
        .slice(1)
    randomizar(rows)
    for (const row of rows) {
        table.appendChild(row)
    }
}

function randomizar(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function primeiraTela() {
    mostrarTabela()
    aleatorio()
}

            