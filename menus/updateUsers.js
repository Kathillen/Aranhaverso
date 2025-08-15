// ATUALIZAÇÃO DE USUÁRIO 

import { userManeger } from '../usersControl/users.js';
import {log, select, isCancel, text} from "@clack/prompts";
import { listUsersMenu } from './listUsers.js';
import chalk from "chalk"; 

export async function updateUsersMenu(username){ 

    const user = userManeger.users.get(username); 

    const formatedDate = new Date(user.createdAt).toLocaleString(); // para ter a data formatada e poder ser exibida
    const status = userManeger.colorStatus(user.status);

    log.info([
        `Usuário: ${user.username}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgBlue(formatedDate)}`
    ].join("\n")) // join para exibir os intens do array com uma quebra de linha
    const selected  = await select({
        message: "Qual será seu próximo destino?:",
        options: [
            {label: "Alterar username", value:"username"},
            {label: "Alterar status", value:"status"},
            {label: "Deletar", value:"delete"},
            {label: "Voltar", value:"back"},
        ]
    }) 
    if(isCancel(selected)){
        listUsersMenu();
        return;
    }

    switch(selected){
        case"delete":{
            userManeger.users.delete(username); 
            userManeger.save()
        }
        case"back":{
            listUsersMenu(); // volta para o menu de listar users
            return;
        }
        case "username":{
            const oldUserName = user.username; // criado no inicio do código

            const newUserName = await text ({
                message: "Digite o novo nome do usuário:",
                validate(input){ // para validar oque o usuario esta digitando sem que ele precise clicar em enter
                    if(userManeger.users.has(input)){
                        return "Já existe uma aranha com esse username, tente novamente!";
                    }
                }
            });
            if(isCancel(newUserName)){
                updateUsersMenu(oldUserName); // se  o usuario cancelar, ira voltar para o  nome antigo e as alterações do name não serão salvas
                return;
            }
            userManeger.users.delete(oldUserName); // deleta o username antigo
            const updatedUsername = { ...user, username: newUserName} // espalha no map de user o novo username
            userManeger.users.set(newUserName, updatedUsername); 
            userManeger.save(); 
            updateUsersMenu(newUserName); // chama a função novamente para atualizar o menu com o novo nome
            return;
        }
        case "status":{
            const userStatus = [
                "Usuário ativo",
                "Usuário inativo"
            ]
            const options = userStatus
            .filter(status => status !== user.status)  // para filtrar todos os status que são diferentes do status que já está
            .map(status => ({ label: status, value: status})) // para cada um dos status será criado uma opção para o prmpt de select
            
            const status = await select({
                message: "Selecione o novo status do usuário:",
                options // isto é uma short sintaxe, já que ja existe as opçoes em forma de variavel, é so passar elas aqui pra dentro
            })
            if(isCancel(status)){
                updateUsersMenu(username);
            return;
            }
            userManeger.users.set(username, {...user, status}) 
            userManeger.save(); // salva as alterações no arquivo json
            updateUsersMenu(username); // chama a função novamente para atualizar o menu com o novo status
            return;
        
        }
    }
}
