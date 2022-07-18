console.log('iosa')

const abrirContato = () =>{
    document.querySelector('.container').classList.add('active');
    document.querySelector('.novoContato').classList.add('active');
    limparInput()
    nomefocus()
}
const fecharContato = () =>{
    document.querySelector('.container').classList.remove('active');
    document.querySelector('.novoContato').classList.remove('active');
}

const limparInput = () => {
    document.querySelector('.nome').value = ''
    document.querySelector('.celular').value = ''
    document.querySelector('.email').value = ''
}

const nomefocus = () => {
    const nome = document.querySelector('.nome');
    nome.focus()
}

const getContato = () => JSON.parse(localStorage.getItem('contatos')) || [] // ler e savar oque leu
const setContato = (dbContato) => localStorage.setItem('contatos', JSON.stringify(dbContato)); // salvar / atualizar

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('editar')){
        const index = el.dataset.indice
        editarContato(index)
    } else if(el.classList.contains('apagar')){
        const index = el.dataset.indice
        excluirContato(index)
    }
});

const voltarNew = () =>{
    document.querySelector('.nome').dataset.index = 'new';
}

/* LAYOUT
-----------------------------------------------------------------------------------*/

const novoContato = () => {
    if(avalie()){
        const contato = {
            nome: document.querySelector('.nome').value,
            celular: document.querySelector('.celular').value,  
            email: document.querySelector('.email').value
        }
        const index = document.querySelector('.nome').dataset.index
        if(index === 'new'){
            creatContato(contato)
            atualizarTela()
            fecharContato()
        } else {
            updateContato(contato, index)
            atualizarTela()
            fecharContato()
            voltarNew()
        }
    }
}

const addContatoTela = (nome, celular, email, i) => {
    const tableTbody = document.querySelector('.table>tbody');
    const tr = document.createElement('tr');
    tr.innerHTML +=  `
        <td>${nome}</td>
        <td>${celular}</td>
        <td>${email}</td>
        <td>
            <button class="verde editar" data-indice=${i}>Editar</button>
            <button class="vermelho apagar" data-indice=${i}>Remover</button>
        </td>
    ` 
    tableTbody.appendChild(tr)
}

const editarContato = (index) => {
    abrirContato();

    const contato = readContato()[index];

    document.querySelector('.nome').value = contato.nome;
    document.querySelector('.celular').value = contato.celular;
    document.querySelector('.email').value = contato.email;
    document.querySelector('.nome').dataset.index = index;
}

const excluirContato = (index) =>{
    deleteContato(index);
    atualizarTela();
}



const avalie = () => {
    const nome = document.querySelector('.nome').value
    const celular = document.querySelector('.celular').value
    const email = document.querySelector('.email').value

    if(nome !== '' && celular !== '' && email !== ''){
        return true
    } 
}

const limparTela = ()=> {
    const tableTbody = document.querySelector('.table>tbody')
    tableTbody.innerHTML = ''
} 

const atualizarTela = () => {
    limparTela()
    const dbContato = getContato();
    for(let i = 0; i < dbContato.length; i++){
        let {nome, celular, email} = dbContato[i]
        addContatoTela(nome, celular, email, i) 
    }
}

atualizarTela()

/* CRUD
-----------------------------------------------------------------------------------*/

const deleteContato = (index) => {
    const dbContato = readContato();
    dbContato.splice(index, 1);
    setContato(dbContato);
}

const updateContato = (contato, index) =>{
    const dbContato = readContato();
    dbContato[index] = contato;
    setContato(dbContato);
}

const readContato = () => getContato()

const creatContato = (contato) =>{
    const dbContato = getContato();
    dbContato.push(contato);
    setContato(dbContato); 
}

/* EVENTOS
-----------------------------------------------------------------------------------*/

document.querySelector('.abrirContato').addEventListener('click', abrirContato);
document.querySelector('.fecharContato').addEventListener('click', fecharContato);
document.querySelector('.salvarContato').addEventListener('click', novoContato);
document.querySelector('.cancelar').addEventListener('click', fecharContato);




