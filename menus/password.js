import {text, isCancel, intro} from "@clack/prompts"
import chalk from "chalk";

// importando de outros documentos
import {userManeger} from "../usersControl/users.js"; 
import { createUsers } from "./newUser.js";
import { admMenu } from "./admControls.js";
import { mainMenu } from "./menu.js";



export async function Password(username){
        let tentativa = 0; 
        console.log("Mas antes de prosseguir, precisamos garantir que você é realmente um aranha.");
        do{
        const confirmPassword = await text({
            message: "Digite sua senha de aranha:"
        })
        if( userManeger.users.get(username).password === confirmPassword){
            intro(chalk.green.bold(`🕷️ Olá, ${username},acesso concedido! Bem-vindo ao Aranhaverso! 🕸️`));
            console.log(chalk.bgYellowBright.black.bold(`Você é um ${userManeger.users.get(username).position} do Aranhaverso!`));
        
            return;
        } else {
            console.log(chalk.red(`Senha incorreta! Tente novamente. Você tem ${3 - tentativa} tentativas restantes.`));
            tentativa++;
        }
    }while(tentativa <= 3)
            
            console.log(chalk.red("Você excedeu o número máximo de tentativas. Você está voltando ao menu principal."));
            setTimeout(() => mainMenu() , 1000);
            
        
        if(isCancel(Password)){
            mainMenu() // chamando o menu principal
            return;
        }
}

export async function PasswordAdm(username){
    
    let tentativa = 0; 
        console.log("Mas antes de prosseguir, preciso confirmar o seu código secreto.");
        do{
        const confirmPassword = await text({
            message: "Digite sua senha de aranha:"
        })
        if( userManeger.users.get(username).password === confirmPassword){
            intro(chalk.green.bold("🕷️ Acesso concedido! Bem-vindo ao painel de controle do Aranhaverso! 🕸️"));
            return true;
        } else {
            console.log(chalk.red(`Senha incorreta! Tente novamente. Você tem ${3 - tentativa} tentativas restantes.`));
            tentativa++;
        }
    }while(tentativa <= 3)
            
            console.log(chalk.red("Você excedeu o número máximo de tentativas. Você está voltando ao menu principal."));
            return false;
            
        
        if(isCancel(Password)){
            mainMenu() // chamando o menu principal
            return;
        }
}