CREATE DATABASE projetobd;
USE projetobd;

CREATE TABLE USUARIO (
    loginUsuario varchar(15) NOT NULL,
    senhaUsuario varchar(200) NOT NULL,
    emailUsuario varchar(200) NOT NULL,
	PRIMARY KEY(loginUsuario)
);
CREATE TABLE DADOS(
    loginUsuario varchar(15) NOT NULL,
    nome varchar(50),
    idade integer,
    foreign key (loginUsuario) REFERENCES USUARIO(loginUsuario)
);

CREATE TABLE ANOTACAO (
    titulo VARCHAR(50) PRIMARY KEY,
    texto VARCHAR(1000) NOT NULL,
    userAnotacao varchar(15) NOT NULL,
    foreign key (userAnotacao) REFERENCES USUARIO(loginUsuario)
);