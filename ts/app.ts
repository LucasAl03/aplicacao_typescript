const alunos = []

const formAluno = document.querySelector('#form-aluno')

formAluno.addEventListener('submit', (evt)=>{
    evt.preventDefault()

    formAluno.reset()
})