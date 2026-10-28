const token = localStorage.getItem('token')

if(!token){
    return '../index.html'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', (e) =>{
    e.preventDefault()


    fetch(`http://localhost:3000/motoristas`,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'authorization' : token
        },
    })
    .then(res => {
        if(!res.ok){
            localStorage.clear()
            alert('Sessão expirada! Faça o login novamente!')
            location.href = '../index.html'
            throw new Error('Sessão expirada!')
        }
    })
    .then(dados => {
        if(dados.message){
            resposta.innerHTML = `<p>${dados.message}</p>`
        }else{
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
            `
        }
    })
    .catch((err)=>{
        console.error('Erro ao listar motoristas!',err)
        resposta.innerHTML = '<p>Erro ao listar motoristas!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${el.codMotorista | el.id}`
        corpo += `<td>${el.nome}`
        corpo += `<td>${el.cnh}`
        corpo += `<td>${el.cpf}`
        corpo += `<td>${el.telefone}`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código do Motorista</th>
            <th>Nome</th>
            <th>CNH</th>
            <th>CPF</th>
            <th>Telefone</th>
        </tr>
    </thead>
    `
}