// Criação de novos usuários

import {log, text, isCancel} from "@clack/prompts"

// importando de outros documentos
import {userManeger} from "../usersControl/users.js"; 
import { mainMenu } from "./menu.js";

export async function createUsers(){
    let username;

    do {
        username = await text ({
            message: "Digite o username:"
        })
        if( userManeger.users.has(username)){ // verificando se já existe um usuário com esse nome
            log.error("Já existe um user com esse nome, tente novamente!"); 
        }
    } while(userManeger.users.has(username)); // enquanto existir um user com este nome, irá continuar exibindo o prompt
    
    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }

    const user = { 
        username,
        status : "Usuário ativo", 
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj json
    }

    userManeger.create(user) // Para criar um novo user

    log.success("Usuário criado om sucesso!"); // exibe uma mensagem de sucesso
    setTimeout(() => mainMenu() , 1000) // depois de um segundo. leva o usuaria de volta para a função principal
}