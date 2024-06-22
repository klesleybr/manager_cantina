const formRetiro = document.getElementById("form_retiro");

$(formRetiro).ready(function(){
    $("#telefone").mask('(00) 00000-0000');
});

function transformar(dataHora){
    if (dataHora < 10){
        return dataHora.toString().padStart(2, '0');
    }
    return dataHora
}

formRetiro.addEventListener("submit", function(event){
    event.preventDefault();
    
    const familia = document.getElementById("family").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("user_email").value;
    const telefone = document.getElementById("telefone").value;
    const produto = document.getElementById("product").value;
    const quantidade = document.getElementById("amount").value;
    const confirma = document.getElementById("confirm").value;
    
    let descricao = "";
    let preco = 0;
    if(produto == 1){
        descricao = "Sorvete";
        preco = 2;
    }
    else if(produto == 2){
        descricao = "Picolé";
        preco = 1.5;
    }
    else if(produto == 3){
        descricao = "Doce";
        preco = 1;
    }

    const data = new Date();
    diaAtual = transformar(data.getDate());
    mesAtual = transformar(data.getMonth() + 1);
    horaAtual = transformar(data.getHours());
    minutoAtual = transformar(data.getMinutes());
    segundoAtual = transformar(data.getSeconds());
    const dataAtual = `${diaAtual}-${mesAtual}-${data.getFullYear()} | ${horaAtual}:${minutoAtual}:${segundoAtual}`;
 


    let armazenarDados = localStorage.getItem("dadosForm");
    let dadosForm = armazenarDados ? JSON.parse(armazenarDados) : [];

    dadosForm.push({ dataAtual, familia, nome, email, telefone, descricao, preco, quantidade, confirma });

    localStorage.setItem("dadosForm", JSON.stringify(dadosForm));

    formRetiro.reset();
});

const linkDownload = document.getElementById("baixarCsv");
linkDownload.addEventListener("click", function (){
    let armazenarDados = localStorage.getItem("dadosForm");
    if(!armazenarDados){
        alert("Não há formulário disponível para download.");
        return;
    }
    let dadosForm = JSON.parse(armazenarDados);

    let conteudoCsv = "Data e Hora;Família;Nome do Retirante;Email;Telefone;Produto;Preço (R$);Quantidade;Total (R$);Confirmação\n";
    dadosForm.forEach(row => {
        conteudoCsv += `${row.dataAtual};${row.familia};${row.nome};${row.email};${row.telefone};${row.descricao};${row.preco.toString().replace(".",",")};${row.quantidade.toString().replace(".",",")};${(row.preco * row.quantidade).toString().replace(".",",")};${row.confirma}\n`;
    });

    const a = document.createElement("a");
    const blob = new Blob([conteudoCsv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "relatorio-retiro-2024.csv";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
});

const limparLocalStorage = document.getElementById("limparBD");
limparLocalStorage.addEventListener("click", function(){
    let confirmaLimpar = confirm("Você realmente deseja apagar os dados armazenados no Local Storage?");
    if (confirmaLimpar) localStorage.clear();
});