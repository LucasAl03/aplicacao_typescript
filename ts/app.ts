
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

function CalcularIdade(nasciData) {
    var nascimentoData = new Date(nasciData)

    var nascimentoDataDia = nascimentoData.getDate();
    var nascimentoDataMes = nascimentoData.getMonth();
    var nascimentoDataAno = nascimentoData.getFullYear();

    var dataHoje = new Date();
    var diaHoje = dataHoje.getDate();
    var mesHoje = dataHoje.getMonth();
    var anoHoje = dataHoje.getFullYear();

    var idade = 0;

    if (mesHoje > nascimentoDataMes) {
        idade = anoHoje - nascimentoDataAno;
    } else if (mesHoje === nascimentoDataMes) {
        idade = diaHoje >= nascimentoDataDia ? anoHoje - nascimentoDataAno : anoHoje - nascimentoDataAno - 1;
    } else {
        idade = anoHoje - nascimentoDataAno - 1;
    }

    return idade;
}

const formAluno = document.querySelector<HTMLFormElement>('#form-aluno')
const cardsLista = document.querySelector('#cards-lista')
const cardAluno = document.querySelector('#card-aluno')

formAluno?.addEventListener('submit', (evt: Event)=>{
    evt.preventDefault()

    const dadosForm = new FormData(formAluno)
    
    const nasciData = dadosForm.get('nascimento-add');

    const aluno = {
        nome: dadosForm.get('nome-aluno'),
        datanascimento: dadosForm.get('nascimento-add'),
        idade: CalcularIdade(nasciData),
        sexo: dadosForm.get('sexo-add'),
        ano: dadosForm.get('ano-add'),
        turma: dadosForm.get('turma-add'),
        matricula: dadosForm.get('matricula-add'),
        nota01: Number (dadosForm.get('nota01-add')),
        nota02: Number(dadosForm.get('nota02-add')),
        nota03: Number(dadosForm.get('nota03-add')),
        media: (Number(dadosForm.get('nota01-add')) + Number(dadosForm.get('nota02-add')) + Number(dadosForm.get('nota03-add'))) / 3
    }
    
    addAluno(aluno)

    console.log(aluno)

    formAluno?.reset() 
})

const addAluno = (objAluno)=>{
    alunos.push(objAluno)

    listAluno()
}

const listAluno = () => {
    cardsLista?.innerHTML = ''
    

    obj.forEach((elem, i) => {
        cardAluno.innerHTML += `` 
    })
}