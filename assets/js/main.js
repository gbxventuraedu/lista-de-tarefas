// Seleciona elementos do DOM
const inputTarefa = document.querySelector(".input-nova-tarefa");
const btnTarefa = document.querySelector(".btn-add-tarefa");
const tarefas = document.querySelector(".tarefas");

// Cria um novo elemento <li>
const criaLi = () => {
  const li = document.createElement("li");
  return li;
};

// Adiciona uma nova tarefa à lista
const criaTarefa = (textoInput) => {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvarTarefas();
};

// Adiciona tarefa ao pressionar Enter
inputTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode === 13 && inputTarefa.value) {
    criaTarefa(inputTarefa.value);
  }
});

// Limpa o input
const limpaInput = () => {
  inputTarefa.value = "";
  inputTarefa.focus();
};

// Cria botão de apagar para cada tarefa
const criaBotaoApagar = (li) => {
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute("class", "apagar");
  botaoApagar.setAttribute("title", "Apagar esta tarefa.");
  li.appendChild(botaoApagar);
  salvarTarefas();
};

// Adiciona tarefa ao clicar no botão
btnTarefa.addEventListener("click", () => {
  if (inputTarefa.value) {
    criaTarefa(inputTarefa.value);
  }
});

// Evento para remover tarefa ao clicar no botão apagar
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    salvarTarefas();
  }
});

// Salva as tarefas no localStorage
const salvarTarefas = () => {
  const liTarefas = tarefas.querySelectorAll("li");
  const listaDeTarefas = [];
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJson = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJson);
};

const adicionaTarefasSalvar = () => {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);
  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
};
adicionaTarefasSalvar();
