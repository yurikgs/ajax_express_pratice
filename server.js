
const express = require("express")
const server = express()

const NeDB = require("nedb")
const db = new NeDB( { filename: "tb_produtos", autoload: true } )


server.use(express.json())
server.use(express.urlencoded( {extended: true} ))

server.get("/produtos", (req, res) => {



    db.find("").exec( (err, dados) => {
        if(err) {
            console.log(err)
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json(dados)            
        }
        

    } )

})

server.get("/produtos/:id", (req, res) => {

    db.findOne({ _id: req.params.id }).exec((err, dados) => {
        if(err) {
            console.log(err)
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json(dados)
        }
        

    })

})

server.post("/produtos", (req, res) => {

    db.insert(req.body, (err, novoProduto) => {


        if(err) {
            console.log(err)
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(201).json({
                message: `Produto criado com sucesso!`,
                productInfo: novoProduto
            })
        }


    } ) 

})

server.put("/produtos/:id", (req, res) => {

    db.update({_id: req.params.id}, req.body, (err) => {

        if(err){
            console.log(err)
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json({
                message: `Produto numero ${req.params.id} atualizado cpom sucesso`,
                productInfo: req.body
            })
        }

    })

})

server.delete("/produtos/:id", (req, res) => {

    db.remove({_id: req.params.id}, (err) => {

        if(err) {
            console.log(err)
        } else {
            res.status(200).json({
                message: `O produto número ${req.params.id} foi excluído com sucesso`
            })
        }

    })

})

server.listen( 3000, () => console.log("Express server ON!") )
