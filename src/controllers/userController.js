 import express from 'express';
import userEntity from '../entities/user.js';
import { AppDataSource } from '../database/data-source.js';
import { Like } from 'typeorm'; 

const route = express.Router();

const userRepository = AppDataSource.getRepository(userEntity);


route.post("/", async(request, response) => {
    
    const {name, email, password, typeUser} = request.body;
    if (name.lenght <1){
        return response.status(400).send({"response": "O nome do usuário é obrigatório!"});
    } 
    if (!email){
        return response.status(400).send({"response": "O email do usuário é obrigatório!"});
    }
    if (!email.includes("@")){
        return response.status(400).send({"response": "O email do usuário é inválido!"});
    }

    if (password.lenght < 6){
        return response.status(400).send({"response": "A senha do usuário é obrigatória!"});
    }

    if (typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM"){
        return response.status(400).send({"response": "O tipo do usuário é obrigatório!"});
    }

    const newUser = userRepository.create({
        name,
        email,
        password,
        typeUser: typeUser.toUpperCase()
    });
    try {
    await userRepository.save(newUser);
    }
    catch (err) {
        return response.status(500).send({"response": `Houve um erro: ${err}`});
    }
     return response.status(201).send({"response": `O usuário ${name} foi cadastrado com sucesso!`});

});

route.get("/", async(request, response) => {
    try {
       const Users = await userRepository.find();
        return response.status(200).send({"response":Users});}
    catch (err) {
        return response.status(500).send({"response": `Houve um erro: ${err}`});
    }
});

route.get("/:name", async(request, response) => {
    try {
        const {name} = request.params;
        const user = await userRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": user});
    }catch (err) {
        return response.status(500).send({"response": `Houve um erro: ${err}`});
    }
});

route.put("/", async(request, response) => {
    const {id, name, email, password, typeUser} = request.body;

    await userRepository.update({id, name, email, password, typeUser});

    response.status(200).send({"response": `Dados atualizados com sucesso!`});
});

route.delete("/:idUser", async(request, response) => {
    const {idUser} = request.params;

    //HARD DELETE
    //await userRepository.delete({id: idUser});
    
   

    //SOFT DELETE
    await userRepository.update({id: idUser}, {deletedAt: () => "Current_Timestamp"});

    return response.status(200).send({"response": "Usuário deletado com sucesso!"});

});

export default route;