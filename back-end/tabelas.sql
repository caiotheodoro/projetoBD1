CREATE TABLE USUARIO (
    loginUsuario varchar(15) primary key,
    senhaUsuario varchar(50),
    emailUsuario varchar(50)
);

CREATE TABLE CANECA (
    nomeCaneca varchar(50) primary key,
    categoriaCaneca varchar(50),
    donoCaneca varchar(15),
    foreign key (donoCaneca) REFERENCES USUARIO(loginUsuario)
);

CREATE TABLE SUBCATEGORIA (
    categoriaCaneca varchar(50),
    subCategoriaCaneca varchar(50),
    primary key(categoriaCaneca,subCategoriaCaneca),
    foreign key (categoriaCaneca) REFERENCES CANECA(categoriaCaneca)
);




