
const alunos: Aluno[] = []

interface Aluno {
    nome: FormDataEntryValue | null
    datanascimento: FormDataEntryValue | null
    sexo: FormDataEntryValue | null
    ano: FormDataEntryValue | null
    turma: FormDataEntryValue | null
    matricula: FormDataEntryValue | null
    nota01: number
    nota02: number
    nota03: number
}

const formAluno = document.querySelector<HTMLFormElement>('#form-aluno')

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
        nota01: Number (dadosForm.get('nota01-add')),
        nota02: Number(dadosForm.get('nota02-add')),
        nota03: Number(dadosForm.get('nota03-add')),
    }
    
    alunos.push(aluno)

    console.log(aluno)

    formAluno?.reset() 
})
