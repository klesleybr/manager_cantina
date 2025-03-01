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
    // const email = document.getElementById("user_email").value;
    // const telefone = document.getElementById("telefone").value;
    const produto = document.getElementById("product").value;
    const quantidade = document.getElementById("amount").value;
    const confirma = document.getElementById("confirm").value;
    
    let descricao = "";
    let preco = 0;
    if(produto == 1){
        descricao = "Refrigerante Coca-Cola Zero Lata 350 mL";
        preco = 6;
    }
    else if(produto == 2){
        descricao = "Refrigerante Schweppes Lata 350 mL";
        preco = 6.50;
    }
    else if(produto == 3){
        descricao = "Refrigerante Soda Lata 350 mL";
        preco = 5.50;
    }
    else if(produto == 4){
        descricao = "Refrigerante Guaraná Lata 350 mL";
        preco = 5.50;
    }
    else if(produto == 5){
        descricao = "Refrigerante Coca-Cola 2L";
        preco = 14;
    }
    else if(produto == 6){
        descricao = "Refrigerante Fanta 2L";
        preco = 12.50;
    }
    else if(produto == 7){
        descricao = "Refrigerante Kuait 2L";
        preco = 12.50;
    }
    else if(produto == 8){
        descricao = "Água com Gás Cristal 500 mL";
        preco = 4;
    }
    else if(produto == 9){
        descricao = "Água Tônica Antártica 350 mL";
        preco = 6;
    }
    else if(produto == 10){
        descricao = "Drops Freegells";
        preco = 2;
    }
    else if(produto == 11){
        descricao = "Drops Azedinho";
        preco = 1.80;
    }
    else if(produto == 12){
        descricao = "Chocolate Batom";
        preco = 2;
    }
    else if(produto == 13){
        descricao = "Salgadinho";
        preco = 1.50;
    }
    else if(produto == 14){
        descricao = "Pipoca Boni";
        preco = 0.80;
    }
    else if(produto == 15){
        descricao = "Pirulito";
        preco = 0.60;
    }
    else if(produto == 16){
        descricao = "Paçoca";
        preco = 1;
    }
    else if(produto == 17){
        descricao = "Lanche Goiabada";
        preco = 1.50;
    }
    else if(produto == 18){
        descricao = "Pastel";
        preco = 7;
    }
    else if(produto == 19){
        descricao = "Coxinha";
        preco = 7;
    }
    else if(produto == 20){
        descricao = "Cachorro Quente de Forno";
        preco = 7;
    }
    else if(produto == 21){
        descricao = "Suco de Goiaba 200 mL";
        preco = 2;
    }
    else if(produto == 22){
        descricao = "Suco de Manga 200 mL";
        preco = 2;
    }
    else{
        return 0;
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

    // dadosForm.push({ dataAtual, familia, nome, email, telefone, descricao, preco, quantidade, confirma });
    dadosForm.push({ dataAtual, familia, nome, descricao, preco, quantidade, confirma });

    localStorage.setItem("dadosForm", JSON.stringify(dadosForm));

    alert("Compra registrada!");
    formRetiro.reset();
});

const linkDownload = document.getElementById("baixarCsv");
linkDownload.addEventListener("click", function (){
    let armazenarDados = localStorage.getItem("dadosForm");
    if(!armazenarDados){
        alert("Não há relatório disponível para download.");
        return;
    }
    let dadosForm = JSON.parse(armazenarDados);

    // let conteudoCsv = "Data e Hora;Família;Nome do Retirante;Email;Telefone;Produto;Preço (R$);Quantidade;Total (R$);Confirmação\n";
    let conteudoCsv = "Data e Hora;Representante;Nome do Retirante;Produto;Preço (R$);Quantidade;Total (R$);Confirmação\n";
    dadosForm.forEach(row => {
        conteudoCsv += `${row.dataAtual};${row.familia};${row.nome};${row.descricao};${row.preco.toString().replace(".",",")};${row.quantidade.toString().replace(".",",")};${(row.preco * row.quantidade).toString().replace(".",",")};${row.confirma}\n`;
    });

    const a = document.createElement("a");
    const blob = new Blob([conteudoCsv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "relatorio-retiro-2025.csv";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
});

function requirePwd(event) {
    event.preventDefault;
    let correctPwd = "@wwjs09AX";
    let writedPwd = prompt("Informe a senha para prosseguir: ");

    if(writedPwd == correctPwd){
        return 1;
    }
    else if(writedPwd != null && writedPwd != correctPwd){
        alert("Senha incorreta!");
    }

    return 0;
}

const limparLocalStorage = document.getElementById("limparBD");
limparLocalStorage.addEventListener("click", function(){
    if(requirePwd("click") == 1){
        let confirmaLimpar = confirm("Você realmente deseja apagar os dados armazenados no Local Storage?");
        if (confirmaLimpar) {
            localStorage.clear();
            alert("Dados apagados!");

            formRetiro.reset();
        }
    } 
});