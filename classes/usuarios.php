<?php

Class Usuario
{
    private $pdo;
    public funcion conectar($nome,$host,$login,$senha)
    {
        global $pdo;
        try {
            $pdo = new PDO("mysql:dbname=".$nome.";host=".$host,$login,$senha);

        } catch (PDOException $e) {
            global $msgErro = $e->getMessage();
        }
    }
    public funcion cadastrar($login,$email,$senha)
    {
        global $pdo;
        $sql = $pdo->prepare("SELECT login_usuario FROM USUARIO WHERE email = :e");
        $sql->bindValue(":e",$email);
        $sql->execute();
        if($sql->rowCount() > 0){
            return false;
        }
        else{
            $sql = $pdo->prepare("INSERT INTO USUARIOS (login_usuario, email, senha) values (:l,:e,:s)");
            $sql->bindValue(":l",$login_usuario);
            $sql->bindValue(":e",$email);
            $sql->bindValue(":s",$senha);
            $sql->execute();
            return true;
        
            }
    }
    public funcion logar($login,$senha)
    {
        global $pdo;

        $sql = $pdo->prepare("SELECT login_usuario FROM USUARIOS WHERE login_usuario = :l AND senha = :s");
        $sql->bindValue(":l",$login_usuario);
        $sql->bindValue(":s",$senha);   
        $sql->execute();
        if($sql->rowCount() > 0)
        {
            $dado = $sql->fetch();
        session_start();
        $_SESSION['login_usuario'] =  $dado['id_usuario'];
        return true;
         }
        else()
        {

        }
    }
}




?>