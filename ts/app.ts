const STORAGE_KEY = 'alunos';

interface Aluno {
    nome: FormDataEntryValue | null
    datanascimento: FormDataEntryValue | null
    idade: number
    sexo: FormDataEntryValue | null
    ano: FormDataEntryValue | null
    turma: FormDataEntryValue | null
    matricula: FormDataEntryValue | null
    nota01: number
    nota02: number
    nota03: number
    media: number
}

const alunos: Aluno[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

const mapaSexo: Record<string, string> = { M: 'Masculino', F: 'Feminino' };

const mapaAno: Record<string, string> = {
    '1': '1º ano - ensino fundamental I',
    '2': '2º ano - ensino fundamental I',
    '3': '3º ano - ensino fundamental I',
    '4': '4º ano - ensino fundamental I',
    '5': '5º ano - ensino fundamental I'
};

function CalcularIdade(nasciData: FormDataEntryValue | null): number {
    var nascimentoData = new Date(nasciData as string);

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

function formatarData(data: FormDataEntryValue | null): string {
    if (!data) return '';
    const d = new Date(data as string);
    return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

const formAluno = document.querySelector<HTMLFormElement>('#form-aluno');
const cardsLista = document.querySelector<HTMLElement>('#cards-lista');

function salvarAlunos(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function criarCardHTML(aluno: Aluno, index: number): string {
    const sexoTexto = mapaSexo[String(aluno.sexo)] ?? String(aluno.sexo ?? '');
    const anoTexto = mapaAno[String(aluno.ano)] ?? String(aluno.ano ?? '');

    return `
        <section id="cards-lista">
            <div class="card" data-index="${index}">
                <h3 id="aluno" class="card-aluno"">Nome do(a) Aluno(a): ${aluno.nome}</h3>
                <h3 id="data-nascimento" class="card-aluno"">Data de nascimento: ${formatarData(aluno.datanascimento)}</h3>
                <h3 id="sexo" class="card-aluno"">Sexo: ${sexoTexto}</h3>
                <h3 id="idade" class="card-aluno"">Idade: ${aluno.idade} anos</h3>
                <h3 id="ano" class="card-aluno"">Ano: ${anoTexto}</h3>
                <h3 id="turma" class="card-aluno"">Turma: ${aluno.turma}</h3>
                <h3 id="matricula" class="card-aluno"">Matrícula: ${aluno.matricula}</h3>
                <h3 id="nota01" class="card-aluno"">Nota 01: ${aluno.nota01.toFixed(2)}</h3>
                <h3 id="nota02" class="card-aluno"">Nota 02: ${aluno.nota02.toFixed(2)}</h3>
                <h3 id="nota03" class="card-aluno"">Nota 03: ${aluno.nota03.toFixed(2)}</h3>
                <h3 id="nota-media" class="card-aluno"">Média: ${aluno.media.toFixed(2)}</h3>

                <button class="button btn-edit" data-index="${index}">Editar</button>
                <button class="button btn-excl" data-index="${index}">Excluir</button>
            </div>
        </section>
    `;
}

function listAluno(): void {
    if (!cardsLista) return;

    cardsLista.innerHTML = alunos.map((aluno, index) => criarCardHTML(aluno, index)).join('');
}

const addAluno = (objAluno: Aluno): void => {

    alunos.push(objAluno);
    
    salvarAlunos();

    listAluno();
}

formAluno?.addEventListener('submit', (evt: Event) => {
    evt.preventDefault();

    const dadosForm = new FormData(formAluno);
    const nasciData = dadosForm.get('nascimento-add');

    const aluno: Aluno = {
        nome: dadosForm.get('nome-aluno'),
        datanascimento: nasciData,
        idade: CalcularIdade(nasciData),
        sexo: dadosForm.get('sexo-add'),
        ano: dadosForm.get('ano-add'),
        turma: dadosForm.get('turma-add'),
        matricula: dadosForm.get('matricula-add'),
        nota01: Number(dadosForm.get('nota01-add')),
        nota02: Number(dadosForm.get('nota02-add')),
        nota03: Number(dadosForm.get('nota03-add')),
        media: (Number(dadosForm.get('nota01-add')) + Number(dadosForm.get('nota02-add')) + Number(dadosForm.get('nota03-add'))) / 3
    };

    const matriculaDuplicada = alunos.some(item => item.matricula === dadosForm.get('matricula-add'));

    if (matriculaDuplicada) {
        alert('Já existe um aluno cadastrado com essa matrícula');
    } else {
        addAluno(aluno);
        formAluno?.reset();
    }
});

cardsLista?.addEventListener('click', (evt: Event) => {
    const target = evt.target as HTMLElement;
    const index = Number(target.dataset.index);

    if (target.classList.contains('btn-excl')) {
        alunos.splice(index, 1);
        salvarAlunos();
        listAluno();
    }

    if (target.classList.contains('btn-edit')) {
        console.log('Editar aluno', alunos[index]);
    }

});

listAluno();