
import {log, text, isCancel} from "@clack/prompts"

// importando de outros documentos
import {userManeger} from "../usersControl/users.js"; 
import { mainMenu } from "./menu.js";
import { intro } from "@clack/prompts";
import chalk from "chalk";

export async function existUser(){
    // Verifica se o usuário já existe no sistema
    // Se existir, exibe uma mensagem de boas-vindas
    // Se não existir, solicita o nome de usuário novamente
    let username;

    do {
        username = await text ({
            message: "Digite o seu username de aranha:"
        })
        if( userManeger.users.has(username)){ // verificando se já existe um usuário com esse nome
            intro(`${chalk.blue.bold(`🕷️ Olá, ${username}, você realmente é um aracnídeo!`)}`);
            console.log("Você já pode aproveitar o aranhaverso!")
        } else {
            console.log("Ops, parece que você não está cadastrado no aranhaverso. Tente novamente!");
        }
    } while(!userManeger.users.has(username)); 
        
    
        
    
    if(isCancel(username)){ 
        mainMenu() // chamando o menu principal
        return;
    }
}