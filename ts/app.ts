
//const alunos: any = []

const formAluno: any = document.querySelector('#form-aluno')
const 

formAluno?.addEventListener('submit', (evt: Event)=>{
    evt.preventDefault()

    const dadosForm = new FormData(formAluno)

    const aluno = {
        nome: dadosForm.get('nome-aluno'),
        datanascimento: dadosForm.get('nascimento-add'),
        sexo: dadosForm.get('sexo-add'),
        ano: dadosForm.get('ano-add'),
        turma: dadosForm.get('turma-add'),
        matricula: dadosForm.get('matricula-add'),
        nota01: dadosForm.get('nota01-add'),
        nota02: dadosForm.get('nota02-add'),
        nota03: dadosForm.get('nota03-add'),
    }

    console.log(aluno)

    

    formAluno.reset() 
})

