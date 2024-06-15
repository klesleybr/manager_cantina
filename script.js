const formRetiro = document.getElementById("form_retiro");

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
    const dataAtual = `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
 


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

    let conteudoCsv = "Data e Hora,Família,Nome do Retirante,Email,Telefone,Produto,Preço (R$),Quantidade,Total (R$),Confirmação\n";
    dadosForm.forEach(row => {
        conteudoCsv += `${row.dataAtual},${row.familia},${row.nome},${row.email},${row.telefone},${row.descricao},${row.preco},${row.quantidade},${row.preco * row.quantidade},${row.confirma}\n`;
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