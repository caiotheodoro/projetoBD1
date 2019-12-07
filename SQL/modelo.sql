create database projeto_bd;

use projeto_bd;

CREATE TABLE CANECA(
id_redacao INTEGER ,
texto VARCHAR(8000) NOT NULL,
login_usuario INTEGER,
FOREIGN KEY (login_usuario) REFERENCES USUARIO(login_usuario),
PRIMARY KEY (id_redacao)
);

CREATE TABLE USUARIO(
login_usuario VARCHAR(16) NOT NULL,
email VARCHAR(30) NOT NULL, 
senha VARCHAR(16) NOT NULL,
PRIMARY KEY (login_usuario)
);
