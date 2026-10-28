const token = localStorage.getItem('token')

if(!token){
    return '../index.html'
}

const btn_atualizar = document.getElementById('btn_atualizar')
const resposta = document.getElementById('resposta')

btn_atualizar.addEventListener('click', (e) =>{
    e.preventDefault()

    const valores = {
        cidadeDestino: document.getElementById('cidadeDestino').value,
        statusAtual: document.getElementById('statusAtual').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: document.getElementById('idCarga').value,
    }

    fetch(`http://localhost:3000/entrega`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'authorization' : token
        },
        body: JSON.stringify(valores)
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
        resposta.innerHTML = `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao atualizar entrega!',err)
        resposta.innerHTML = '<p>Erro ao atualizar entrega!</p>'
    })
})