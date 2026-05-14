let usuarios = [];
let editandoIndex = null;

document.getElementById("salvar").addEventListener("click", salvar);
document.getElementById("campoBusca").addEventListener("input", buscar);
document.getElementById("btnAZ").addEventListener("click", () => ordenar("AZ"));
document.getElementById("btnRecente").addEventListener("click", () => ordenar("recente"));
document.getElementById("filtrarTipo").addEventListener("change", buscar);

function salvar() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    if(nome === "" || idade === ""){
        alert("Por favor,preencha seu nome!")
        return;
    }
    
    if (editandoIndex === null) {
        usuarios.push({ nome, idade, data:new Date()});
    } else {
        usuarios[editandoIndex] = { nome, idade, data:usuarios[editandoIndex].data };
        editandoIndex = null;
    }
    limparCampos();
    listar();
}
function listar(listaParaExibir = usuarios) {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    listaParaExibir.forEach((user, index) => {
        lista.innerHTML += `
        <li>
        ${user.nome} - ${user.idade}
        <button onclick="editar(${index})">Editar</button>
        <button onclick="remover(${index})">Remover</button>
        </li>
        `;
    });
}
function editar(index) {
    const user = usuarios[index];

    document.getElementById("nome").value = user.nome;
    document.getElementById("idade").value = user.idade;

    editandoIndex = index;
}
function remover(index) {
    usuarios.splice(index, 1);
    listar();
}
function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
}
function buscar() {
    const termo = document.getElementById("campoBusca").value.toLowerCase();
    const tipo = document.getElementById("filtrarTipo").value;

    const listaFiltrada = usuarios.filter(user =>
        String(user[tipo]).toLowerCase().includes(termo)
    );
    listar(listaFiltrada);
}
function ordenar(criterio) {
    if (criterio === "AZ") {
        usuarios.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (criterio === "recente") {
        usuarios.sort((a, b) => new Date(b.data) - new Date(a.data));
    }
    listar();
}
listar();