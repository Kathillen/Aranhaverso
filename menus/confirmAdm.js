import { intro, text} from "@clack/prompts";
import chalk from "chalk";  

import { mainMenu } from "./menu.js";
import { PasswordAdm } from "./password.js";
import { userManeger } from "../usersControl/users.js";

export async function confirmAdm(){

    intro(chalk.blue.bold("🕷️ Para a segurança do aranhaverso preciso confirmar se você é realmente um aranha! 🕸️"));
    // verificando se o usuário está cadastrado no sistema 
    

        let username;

        username = await text ({
            message: "Qual nome você esconde por trás da sua identidade secreta?"
        })
        if (userManeger.users.has(username)){
            console.log(chalk.green.bold("Usuário encontrado! Agora precisamos confirmar seu cargo no Aranhaverso."));
            const cargo = await text({
                message:"Qual é a sua posição no Aranhaverso?",
                placeholder: 'Peter Supremo ou Spidey Supremo'
            })
            switch(cargo){
                case "Peter Supremo":{
                    intro(chalk.bgBlue("🕷️ Vamos ver se você é mesmo um Peter Supremo!"));
                    if(userManeger.users.get(username).position === cargo){
                        console.log("Parece que você realemnte é um Peter Supremo!");
                        return await PasswordAdm(username);
                    }
                    else{
                        console.log(chalk.red("Ops, parece que você não é um Peter Supremo. Você está voltando ao menu principal."));
                        setTimeout(() => mainMenu() , 1000);
                    }
                    break;
                }
                case "Spidey Supremo":{
                    intro(chalk.bgBlue("🕷️ Vamos ver se você é mesmo um Spidey Supremo!"));
                    if(userManeger.users.get(username).position === cargo){
                        console.log("Parece que você realemente é um Spidey Supremo!");
                        return await PasswordAdm(username);
                    }
                    else{
                        console.log(chalk.red("Ops, parece que você não é um Spidey Supremo. Tente novamente depois."));
                        process.exit(0);
                    }
                    break;
                }
                default:{
                    console.log(chalk.red("Ops, parece que você não é um aranha com privilégios de administrador. Você está voltando ao menu principal."));
                    setTimeout(() => mainMenu() , 1000);
                }
            
        }
    }

}