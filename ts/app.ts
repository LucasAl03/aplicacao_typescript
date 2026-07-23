//Variavel declarada para salvar e recuperar a lista de alunos na localStorage
const STORAGE_KEY = 'alunos';

//Aluno cadastrado com tipagem
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
    situacao: string
}

// Carrega os alunos salvos na localStorage
const alunos: Aluno[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

// Traduz o value do input radio para sexo
const mapaSexo: Record<string, string> = { M: 'Masculino', F: 'Feminino' };

// Traduz o value do select para ano do ensino fundamental
const mapaAno: Record<string, string> = {
    '1': '1º ano - ensino fundamental I',
    '2': '2º ano - ensino fundamental I',
    '3': '3º ano - ensino fundamental I',
    '4': '4º ano - ensino fundamental I',
    '5': '5º ano - ensino fundamental I'
};

// Função para verificar a situação do aluno se aprovado ou reprovado
function mediaAprova(media: number): string {
    if (media >= 6) {
        return 'Aprovado';
    } else {
        return 'Reprovado';
    }
}

// Calcula a idade atual do aluno
function CalcularIdade(nasciData: FormDataEntryValue | null): number {
    var nascimentoData = new Date(nasciData as string);

    // Coleta dia, mes e ano da ta de nascimento informado no form
    var nascimentoDataDia = nascimentoData.getDate();
    var nascimentoDataMes = nascimentoData.getMonth();
    var nascimentoDataAno = nascimentoData.getFullYear();

    // Coleta dia, mes e ano da data atual
    var dataHoje = new Date();
    var diaHoje = dataHoje.getDate();
    var mesHoje = dataHoje.getMonth();
    var anoHoje = dataHoje.getFullYear();

    var idade = 0;

    // Compara mes atual com o de nascimento, para saber se o aniverario desse ano ja aconteceu
    if (mesHoje > nascimentoDataMes) {
        idade = anoHoje - nascimentoDataAno;
    // Se mes atual igual ao mes nascimento, compara o dia de nascimento e o dia atual, se maior ou igual calcula ano atual menos o de nascimento, se menor calcula ano atual menos o de nascimento menos 1
    } else if (mesHoje === nascimentoDataMes) {
        idade = diaHoje >= nascimentoDataDia ? anoHoje - nascimentoDataAno : anoHoje - nascimentoDataAno - 1;
    // Calcula ano atual menos o de nascimento menos 1
    } else {
        idade = anoHoje - nascimentoDataAno - 1;
    }

    return idade;
}

// Formata a data de nascimento para o formato pt-br
function formatarData(data: FormDataEntryValue | null): string {
    if (!data) return '';
    const d = new Date(data as string);
    return d.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

// Pega o formulario do DOM
const formAluno = document.querySelector<HTMLFormElement>('#form-aluno');

// Pega a section cards-lista do DOM
const cardsLista = document.querySelector<HTMLElement>('#cards-lista');

// Salava a array de alunos na localStorage
function salvarAlunos(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

// Preenche os campos do formulario com os dados do aluno no card ao clicar o botão editar
function preencherFormulario(aluno: Aluno): void {
    if (!formAluno) return;

    (formAluno.querySelector('#nome-aluno') as HTMLInputElement).value = String(aluno.nome ?? '');
    (formAluno.querySelector('#nascimento-add') as HTMLInputElement).value = String(aluno.datanascimento ?? '');
    (formAluno.querySelector('#ano-add') as HTMLSelectElement).value = String(aluno.ano ?? '');
    (formAluno.querySelector('#turma-add') as HTMLSelectElement).value = String(aluno.turma ?? '');
    (formAluno.querySelector('#matricula-add') as HTMLInputElement).value = String(aluno.matricula ?? '');
    (formAluno.querySelector('#nota01-add') as HTMLInputElement).value = String(aluno.nota01 ?? '');
    (formAluno.querySelector('#nota02-add') as HTMLInputElement).value = String(aluno.nota02 ?? '');
    (formAluno.querySelector('#nota03-add') as HTMLInputElement).value = String(aluno.nota03 ?? '');

    const radioSexo = formAluno.querySelector<HTMLInputElement>(`input[name="sexo-add"][value="${aluno.sexo}"]`);
    if (radioSexo) radioSexo.checked = true;
}

// Cria um card para o aluno na array
function criarCardHTML(aluno: Aluno, index: number): string {
    // Converte os valores sexo e ano em texto usando os mapas ja declarados
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
                <h3 id="situacao" class="card-aluno situacao-${aluno.situacao.toLowerCase()}">Situação: ${aluno.situacao}</h3>

                <button id="btn-edit" class="button btn-edit" data-index="${index}">Editar</button>
                <button id="btn-excl" class="button btn-excl" data-index="${index}">Excluir</button>
            </div>
        </section>
    `;
}

// Mostra os cards de cada aluno no html
function listAluno(): void {
    if (!cardsLista) return;

    // Gera o card de cada aluno e adiciona ao container
    cardsLista.innerHTML = alunos.map((aluno, index) => criarCardHTML(aluno, index)).join('');
}

// Adiciona o novo aluno ao array, salva e atualiza a pagina
const addAluno = (objAluno: Aluno): void => {

    alunos.push(objAluno);
    
    salvarAlunos();

    listAluno();
}

// Evento dispara ao enviar o formulario
formAluno?.addEventListener('submit', (evt: Event) => {
    // Evita o evento padrão
    evt.preventDefault();

    // Captura os dados enviados ao formulario
    const dadosForm = new FormData(formAluno);
    const nasciData = dadosForm.get('nascimento-add');

    // Calculo para media das notas
    const media = (Number(dadosForm.get('nota01-add')) + Number(dadosForm.get('nota02-add')) + Number(dadosForm.get('nota03-add'))) / 3;

    // Montagem do objeto aluno com a tipagem de cada dado do formulario
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
        media: (Number(dadosForm.get('nota01-add')) + Number(dadosForm.get('nota02-add')) + Number(dadosForm.get('nota03-add'))) / 3,
        situacao: mediaAprova(media)
    };

    // Verifica se a matricula do aluno informada no formulario ja existe na array
    const matriculaDuplicada = alunos.some(item => item.matricula === dadosForm.get('matricula-add'));

    if (matriculaDuplicada) {
        // Impede o cadastro se a matricula ja existir
        alert('Já existe um aluno cadastrado com essa matrícula');
    } else {
        // Adiciona o aluno novo ou se editado, e limpa o formulario
        addAluno(aluno);
        formAluno?.reset();
    }
});

// Captura o evento de clique de botões na lista de cards
cardsLista?.addEventListener('click', (evt: Event) => {
    const target = evt.target as HTMLElement;4

    // Captura o indice do aluno que se associa ao botão clicado
    const index = Number(target.dataset.index);

    // Se o botão excluir for clicado, o card do aluno é removido
    if (target.classList.contains('btn-excl')) {
        alunos.splice(index, 1);
        salvarAlunos();
        listAluno();
    }

    // Botão editar clicado, remove o card do aluno, e joga os dados do aluno no formulario para edição
    if (target.classList.contains('btn-edit')) {
        const [alunoRemovido] = alunos.splice(index, 1);

        if (!alunoRemovido) return;

        salvarAlunos();
        listAluno();
        preencherFormulario(alunoRemovido);
    }
});

// Renderiza os cards de alunos salvos quando a pagina carrega
listAluno();