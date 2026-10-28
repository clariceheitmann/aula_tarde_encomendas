const token = localStorage.getItem('token')

if(!token){
    return '../index.html'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) =>{
    e.preventDefault()

    const id = document.getElementById('id').value

    if(!id){
        resposta.innerHTML = '<p>Informe o código do motorista!</p>'
    }

    if(!confirm('Tem certeza de que deseja excluir este motorista?'))
        return

    fetch(`http://localhost:3000/motorista/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'authorization' : token
        }
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
        console.error('Erro ao excluir motorista!',err)
        resposta.innerHTML = '<p>Erro ao excluir motorista!</p>'
    })
})