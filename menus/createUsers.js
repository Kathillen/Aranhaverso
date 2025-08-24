// Criação de novos usuários

import {log, text, isCancel, select} from "@clack/prompts"

// importando de outros documentos
import {userManeger} from "../usersControl/users.js"; 
import { mainMenu } from "./menu.js";
import { admMenu } from "./admControls.js";

export async function createUsers(){
    let username;
    let password;
    let position;
    do {
        username = await text ({
            message: "Digite o username:"
        })
        if( userManeger.users.has(username)){ // verificando se já existe um usuário com esse nome
            log.error("Opa, notei que já existe um aranha com esse nome, tente novamente!"); 
        }
    } while(userManeger.users.has(username)); // enquanto existir um user com este nome, irá continuar exibindo o prompt
    
    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }

        do {
        password = await text ({
            message: "Digite a senha que você deseja:"
        })
        if(password.length < 6 || password === username){ 
            log.error("Ei, sua senha precisa ter no mínimo 6 caracteres e sua senha não pode ser igual ao ser username, pilantra! SEJA CRIATIVO(A). Tente novamente!"); 
        } 
    } while(password.length < 6  || password === username ); 

        if(isCancel(password)){ 
            mainMenu()
            return;
        }
        position = await select({
            message: "Qual será a posição no Aranhaverso?",
            options: [
                {value: "Aracnídeo", label: "Aracnídeo - Membro comum do Aranhaverso"},
                {value: "Peter Supremo", label: "Peter Supremo - Membro com poderes avançados"},
            ]
        })

        const user = { 
        position,
        username,
        password, 
        status : "Usuário ativo", 
        createdAt: new Date().toISOString() // Para receber a data atual e salvar a data em um obj json
    }
    userManeger.create(user) // Para criar um novo user

    log.success("Usuário criado com sucesso!");
    
    setTimeout(() => mainMenu() , 3000) 
}