//Seleciona elementos do formulário.
const form = document.getElementById("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")


//Captura o evento de input para formatar o valor 
amount.oninput = () => {
  //Obtém o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "")

  //Transforma o valor em centavos.
  value = Number(value) / 100

  //Atualiza o valor do input.
  amount.value = formatCurrencyBRL(value) 
}

function formatCurrencyBRL(value){
  //formata o valor no padrão BRL (Real Brasileiro).
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

//Captura o envento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  event.preventDefault()

  //Cria um objeto com os detalhes na nova despesa 
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[ category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  //Chama a função que irá adicionar o itm na lista
  expenseAdd(newExpense)
}

//Adiciona um novo item na lista 
function expenseAdd(newExpense) {
  try{
    //Cria elemento para adicionar na lista
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //Cria o ícone da categoria 
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Cria o ícone da categforia despesa .
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //cria o nome da despesa.
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona name e category na div das informaçoes da despesa.
    expenseInfo.append(expenseName, expenseCategory)

    //Cria o valor da despesa 
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`
    
    //Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    //Adiciona as informações no item 
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //Adiciona o item na lista 
    expenseList.append(expenseItem)

    //limpa o formúlario para adicionar novo item
    formClear()

    //Atualiza os totais.
    updateTotals()

  } catch(error) {
    alert( "Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

//Atualiza os totais 
function updateTotals(){
  try{
    //Recupera todos os itens (li) da lista (ul).
    const items = expenseList.children
    
    //Atualiza a quantidade de itens da lista.
    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    //Variavel para incrementar o total.
    let total = 0

    //Percorre cada item da lista 
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      //remove caracteres não numéricos e substitui a vírgula pelo ponto.
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      //Converte o valor para float.
      value = parseFloat(value)

      //Verifica se é um número válido.
      if(isNaN(value)){
        return alert(
        "Não foi possível calcular o total. O valor não parece ser um número."
        )
      }

      //Incrementar o valor total.
      total += Number(value)
    }

    //Cria a span para adicionar o R$ formatado.
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    //Limpa o conteúdodo elemento.
    expenseTotal.innerHTML = ""

    //Adiciona o simbolo da moeda e o valor
    expenseTotal.append(symbolBRL, total)
  }catch (error) {
    console.log(error)
    alert ("Não foi possível atualizar os totais.")
  }
}

//Evento que captura o clique nos eventos da lista.
expenseList.addEventListener("click", function (event){
  //Verifica se o elemento clicado é o ícone de remover.
  if (event.target.classList.contains("remove-icon")){
    //Obtem a li pai do elemento clicado.
    const item = event.target.closest(".expense")

    //remove item da lista.
    item.remove()
  }

  //atualiza os totais.
  updateTotals()
})

function formClear(){
  //limpa os inputs
  expense.value = ""
  category.value = ""
  amount.value = ""

  //Coloca o foco no input de amount.
  expense.focus()
}