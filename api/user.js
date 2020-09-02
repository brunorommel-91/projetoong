const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    const save = async (req, res) => {
        const user = req.body
        const { name, ongname, endrua, endbairro, endcidade, endestado, email, password, cofirmPassword } = user

        app.db.connect(app.uri, function(err, client) {
        const collection = client.db(app.dbName).collection("users");
    
        collection.find({"email": email}).toArray(function (err, result) {
            if (result.length > 0) {
                res.status(400).send('Já existe um usuário com esse nome');
            } else {
                collection.insertOne(user, {w: 1}, function(err, records){
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.status(200).send('Usuário inserido com sucesso');
                    }
                })
            }
        })
        })
    }
    // const save = async (req, res) =>{
    //     const user = { ...req.body}
    //     if(req.params.id) user.id = req.params.id

    //     try{
    //         existsOrError(user.name, 'Nome nao Informado')
    //         existsOrError(user.ongname, 'Nome da ONG nao Informado')
    //         existsOrError(user.endrua, 'Rua nao Informada')
    //         existsOrError(user.endbairro, 'Bairro nao Informado')
    //         existsOrError(user.endcidade, 'Cidade nao Informada')
    //         existsOrError(user.endestado, 'Estado nao Informado')
    //         existsOrError(user.email, 'E-mail não informado')
    //         existsOrError(user.password, 'Senha não informada')
    //         existsOrError(user.confirmPassword, 'Confirmação de Senha Invalida')
    //         equalsOrError(user.password, user.confirmPassword, 'Senha não conferem')

    //         const userFromDB = await app.db('users')
    //             .where({ email: user.email }).first()
    //             if(!user.id) {
    //                 notExistsOrError(userFromDB, 'Usuario ja cadastrado')
    //             }
    //     }catch(msg) {
    //         return res.status(400).send(msg)
    //     }

    //     user.password = encryptPassword(user.password)
    //     delete user.confirmPassword

    //     if(user.id) {
    //         app.db('users')
    //              .update(user)
    //              .where({ id: user.id})
    //              .whereNull('deletedAt')
    //              .then(_ => res.status(204). send())
    //              .catch(err => res.status(500).send(err))
    //     }else{
    //         app.db('users')
    //             .insert(user)
    //             .then(_ => res.status(204).send())
    //             .catch(err => res.status(500).send(err))
    //     }
    // }

    const get = (req, res) => {
        app.db.connect(app.uri, function(err, client) {
            const collection = client.db(app.dbName).collection("users");
        
            collection.find().toArray(function (err, result) {
                res.status(200).send(result);
            })
        });
    }
    // const get = (req, res) => {
    //     app.db('users')
    //         .select('id', 'name', 'ongname', 'endrua', 'endbairro', 'endcidade', 'endestado', 'email', 'admin')
    //         .whereNull('deletedAt')
    //         .then(users => res.json(users))
    //         .catch(err => res.status(500).send(err))
    // }
    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'ongname', 'endrua', 'endbairro', 'endcidade', 'endestado', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            const rowsUpdated = await app.db ('users')
                .update({deletedAt: new Date ()})
                .where({ id: req.params.id})
            existsOrError(rowsUpdated, 'Usuario não foi encontrado.')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    
    }

    return { save, get, getById, remove }
}
