export class UserModel{
    id: string = '';
    nome: string = '';
    sobrenome: string = '';
    pais: string = ''; //ENUM
    telefone: string = '';
    email: string = '';
    perfil: Array<string> = new Array(); //ENUM
    idioma: string = ''; //ENUM
    contatoPreferencial: string = ''; //ENUM
    dataCriacao: string = '';
    status: string = 'ATIVO'; //ENUM
}