const token = localStorage.getItem('token')

if(!token){
    return '../index.html'
}

const btn_listar = document.getElementById('btn_listar')
const resposta = document.getElementById('resposta')

btn_listar.addEventListener('click', (e) =>{
    e.preventDefault()


    fetch(`http://localhost:3000/entregas`,{
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
        console.error('Erro ao listar entregas!',err)
        resposta.innerHTML = '<p>Erro ao listar entregas!</p>'
    })
})

function criarTbody(dados){
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${el.codEntrega | el.id}`
        corpo += `<td>${el.cidadeDestino}`
        corpo += `<td>${el.statusAtual}`
        corpo += `<td>${el.data}`
        corpo += `<td>${el.hora}`
        corpo += `<td>${el.idCarga}`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead(){
    return `
    <thead>
        <tr>
            <th>Código da Entrega</th>
            <th>Cidade Destino</th>
            <th>Status Atual</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Código da Carga</th>
        </tr>
    </thead>
    `
}