<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Obrigado!</title>
</head>
<body>
    <?php 
        $familia = $_POST["familia"];
        $nome = $_POST["nome"];
        $email= $_POST["email"];
        $telefone = $_POST["telefone"];
        $produto = $_POST["produto"];
        $quantidade = $_POST["quantidade"];
        $confirmacao = $_POST["confirmacao"];
        $dados = [$familia, $nome, $email, $telefone, $produto, $quantidade, $confirmacao];

        $f = fopen("database.csv", "a");
        fputcsv($f, $dados);
        fclose($f);
    ?>

    <?php echo "Obrigado pelos registros!" ?>

    <a href="index.html">Retornar ao formulário.</a>
    
</body>
</html>



