const alunos = [];
const formAluno = document.querySelector('#form-aluno');
formAluno?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const dadosForm = new FormData(formAluno);
    const aluno = {
        nome: dadosForm.get('nome-aluno'),
        datanascimento: dadosForm.get('nascimento-add'),
        sexo: dadosForm.get('sexo-add'),
        ano: dadosForm.get('ano-add'),
        turma: dadosForm.get('turma-add'),
        matricula: dadosForm.get('matricula-add'),
        nota01: Number(dadosForm.get('nota01-add')),
        nota02: Number(dadosForm.get('nota02-add')),
        nota03: Number(dadosForm.get('nota03-add')),
        media: (Number(dadosForm.get('nota01-add')) + Number(dadosForm.get('nota02-add')) + Number(dadosForm.get('nota03-add'))) / 3
    };
    alunos.push(aluno);
    console.log(aluno);
    formAluno?.reset();
});
//# sourceMappingURL=app.js.map