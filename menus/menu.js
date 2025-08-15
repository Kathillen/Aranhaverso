import {isCancel, outro, log, select, text} from "@clack/prompts";
import chalk from "chalk"
// imprtanto de outros doumentos
import { admMenu } from "./admControls.js";
import { createUsers } from "./newUser.js";
import { existUser } from "./player.js";

export async function mainMenu(){
    const option = await select({
        message: "Qual será sua escolha na teia do destino?",
        options: [
            {value: "adm", label: "Sou ADM do aranhaverso"},
            {value: "player", label: "Já estou cadastrado no aranhaverso"},
            {value: "register", label: "Ainda não sou um aracnídeo e quero me cadastrar"},
            {value: "exit", label: "Sair do aranhaverso"}
        ]
    })
    if(isCancel(option)) return;

    switch (option){
        case "adm":{
            console.log(`${chalk.red.bold("Então você é um  Peter Supremo, o guardião do aranhaverso!")}`)
            console.log(`${chalk.blue.bold("🕷️  Seja bem-vindo(a) ao painel de controle do aranhaverso!🕸️")}`)
            console.log;
            admMenu()
            return;
        }
        case "player":{
            
            console.log(`${chalk.blue.bold("🕷️  Seja bem-vindo(a) ao painel de usuários do aranhaverso!🕸️")}`)
            console.log(`${chalk.red.bold("Você é mesmo um  aracnídeo do aranhaverso?")}`)
            console.log;
            existUser();
            return;
        }
        case "register":{
            console.log(`${chalk.red.bold("Parece que você quer ser um novo aranha do aranhaverso!")}`)
            console.log(`${chalk.blue.bold("🕷️  Seja bem-vindo(a) ao ao nosso painel de cadastros!🕸️")}`)
            console.log;
            createUsers();
            return;
        }   
        case "exit":{
            outro(chalk.bgRed.rgb(0, 0, 0).bold("🕷️  Você está saindo do aranhaverso!🕸️"))
            process.exit(0)
        }
    } // fim do switch
}