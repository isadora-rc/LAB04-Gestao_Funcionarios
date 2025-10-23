//classe funcionário
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._id = Date.now();      // ID único
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._salario = salario;
    }

    //getters
    get id() { return this._id; }
    get nome() { return this._nome; }
    get idade() { return this._idade; }
    get cargo() { return this._cargo; }
    get salario() { return this._salario; }

    //setters
    set nome(n) { this._nome = n; }
    set idade(i) { this._idade = i; }
    set cargo(c) { this._cargo = c; }
    set salario(s) { this._salario = s; }

    //metodo toString
    toString() {
        return `${this._nome} - ${this._idade} anos - Cargo: ${this._cargo} - Salário: R$ ${this._salario}`;
    }
}

//classe controller
class FuncionarioController {
    constructor() {
        this.funcionarios = [];
        this.editando = null;
        this.init();
    }

    init() {
        document.getElementById("salvar").addEventListener("click", (e) => {
            e.preventDefault();
            this.salvar();
        });

        //botoes de relatório
        document.getElementById("relSalario").addEventListener("click", () => this.mostrarSalarioMaior5000());
        document.getElementById("relMedia").addEventListener("click", () => this.mostrarMediaSalarial());
        document.getElementById("relCargos").addEventListener("click", () => this.mostrarCargosUnicos());
        document.getElementById("relNomes").addEventListener("click", () => this.mostrarNomesMaiusculo());
    }

    salvar() {
        const nome = document.getElementById("nome").value;
        const idade = document.getElementById("idade").value;
        const cargo = document.getElementById("cargo").value;
        const salario = Number(document.getElementById("salario").value);

        if (this.editando !== null) {
            //usar setters no objeto existente
            const f = this.funcionarios[this.editando];
            f.nome = nome;
            f.idade = idade;
            f.cargo = cargo;
            f.salario = salario;
            this.editando = null;
        } else {
            const funcionario = new Funcionario(nome, idade, cargo, salario);
            this.funcionarios.push(funcionario);
        }

        this.atualizarTabela();
        this.limparFormulario();
    }

    atualizarTabela() {
        const tabela = document.getElementById("tabela");
        tabela.innerHTML = "";

        this.funcionarios.forEach((funcionario, index) => {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = funcionario.nome;
            row.insertCell(2).innerText = funcionario.idade;
            row.insertCell(3).innerText = funcionario.cargo;
            row.insertCell(4).innerText = funcionario.salario;

            const cellAcoes = row.insertCell(5);

            const botaoEditar = document.createElement("button");
            botaoEditar.innerText = "Editar";
            botaoEditar.type = "button";
            botaoEditar.addEventListener("click", () => this.editar(index));
            cellAcoes.appendChild(botaoEditar);

            const botaoExcluir = document.createElement("button");
            botaoExcluir.innerText = "Excluir";
            botaoExcluir.type = "button";
            botaoExcluir.addEventListener("click", () => this.excluir(index));
            cellAcoes.appendChild(botaoExcluir);
        });
    }

    limparFormulario() {
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('cargo').value = '';
        document.getElementById('salario').value = '';
    }

    editar(index) {
        const funcionario = this.funcionarios[index];
        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('idade').value = funcionario.idade;
        document.getElementById('cargo').value = funcionario.cargo;
        document.getElementById('salario').value = funcionario.salario;
        this.editando = index;
    }

    excluir(index) {
        this.funcionarios = this.funcionarios.filter((_, i) => i !== index);
        this.atualizarTabela();
    }

    //relatorios
    
    mostrarSalarioMaior5000 = () => {
        const lista = this.funcionarios.filter(f => f.salario > 5000);
        const div = document.getElementById("resultado");
        div.innerHTML = `<b>Funcionários com salário > 5000:</b><br>` +
            (lista.length > 0 ? lista.map(f => f.toString()).join("<br>") : "Nenhum");
    }

    mostrarMediaSalarial = () => {
        if (this.funcionarios.length === 0) return alert("Nenhum funcionário cadastrado.");
        const media = this.funcionarios.reduce((acc, f) => acc + f.salario, 0) / this.funcionarios.length;
        document.getElementById("resultado").innerHTML = `<b>Média salarial:</b> R$ ${media.toFixed(2)}`;
    }

    mostrarCargosUnicos = () => {
        const cargos = [...new Set(this.funcionarios.map(f => f.cargo))];
        document.getElementById("resultado").innerHTML = `<b>Cargos únicos:</b> ${cargos.join(", ")}`;
    }

    mostrarNomesMaiusculo = () => {
        const nomes = this.funcionarios.map(f => f.nome.toUpperCase());
        document.getElementById("resultado").innerHTML = `<b>Nomes em maiúsculo:</b> ${nomes.join(", ")}`;
    }
}

//inicializa o controller
const controller = new FuncionarioController();
