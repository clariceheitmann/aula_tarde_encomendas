const token = localStorage.getItem('token')

if(!token){
    return '../index.html'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', (e) =>{
    e.preventDefault()


    fetch(`http://localhost:3000/cargas`,{
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
        console.error('Erro ao listar cargas!',err)
        resposta.innerHTML = '<p>Erro ao listar cargas!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${el.codCarga | el.id}`
        corpo += `<td>${el.descricao}`
        corpo += `<td>${el.peso}`
        corpo += `<td>${el.volume}`
        corpo += `<td>${el.codigoRastreio}`
        corpo += `<td>${el.idMotorista}`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código da Carga</th>
            <th>Descrição</th>
            <th>Peso</th>
            <th>Volume</th>
            <th>Código de Rastreio</th>
            <th>Código do Motorista</th>
        </tr>
    </thead>
    `
}