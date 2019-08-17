const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pedidoSchema = new Schema({
    sanduiche: String,
    pao: String,
    queijo: String,
    vegetal: String,
    molho: String,
    bebida: [String]
});
const Pedido = mongoose.model('Pedido', pedidoSchema);

app.get('/', (req, res) => {
    Pedido.findOne({ pao: 'Gergelim' }, (err, pedido) => {
        console.log(pedido);
    });
    res.status(200).json(pedido);
});

app.post('/', (req, res) => {
    let pedido = new Pedido({
        sanduiche: req.body.queryResult.parameters["sanduiche"],
        pao: req.body.queryResult.parameters["pao"],
        queijo: req.body.queryResult.parameters["queijo"],
        vegetal: req.body.queryResult.parameters["vegetal"],
        molho: req.body.queryResult.parameters["molho"],
        bebida: req.body.queryResult.parameters["bebida"]
    });
    console.log("");
    console.log("Pedido em Sanduicheria Subway:");
    console.log("     Tipo do Sanduíche: ", pedido.sanduiche);
    console.log("     Tipo do Pão: ", pedido.pao);
    console.log("     Queijos: ", pedido.queijo);
    console.log("     Vegetais: ", pedido.vegetal);
    console.log("     Molhos: ", pedido.molho);
    console.log("     Bebida: ", pedido.bebida);
    // TODO fazer alguma persistência no futuro?
    setPedido(pedido);
    res.status(200).json({
        fulfillmentText: "Seu pedido foi anotado com sucesso!"
    });
});

mongoose.connect('mongodb://localhost:27017/testing', { useNewUrlParser: true }).then(() => {
    const server = app.listen(process.env.PORT || 5000, () => {
        console.log('Servidor rodando na porta %d.', server.address().port);
    });
}).catch(() => {
    console.log("ERRO: Impossível conectar ao Banco de Dados.")
});
function setPedido(pedido) {
    pedido.save().then(() => { console.log("SAVED") });
}