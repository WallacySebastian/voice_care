const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const adviceSchema = new Schema({
    keys: [String],
    text: String
}, { collection: "advices" });
const Advice = mongoose.model('Advice', adviceSchema);

const foodAdviceSchema = new Schema({
    text: String
}, { collection: "foodAdvices" })
const FoodAdvice = mongoose.model('FoodAdvice', foodAdviceSchema);

const restAdviceSchema = new Schema({
    text: String
}, { collection: "restAdvices" })
const RestAdvice = mongoose.model('RestAdvice', restAdviceSchema);

const activitiesAdviceSchema = new Schema({
    text: String
}, { collection: "activitiesAdvices" })
const ActivitiesAdvice = mongoose.model('ActivitiesAdvice', activitiesAdviceSchema);

const hygieneAdviceSchema = new Schema({
    text: String
}, { collection: "hygieneAdvices" })
const HygieneAdvice = mongoose.model('HygieneAdvice', hygieneAdviceSchema);

const generalAdviceSchema = new Schema({
    text: String
}, { collection: "generalAdvices" })
const GeneralAdvice = mongoose.model('GeneralAdvice', generalAdviceSchema);

const patientSchema = new Schema({
    name: String,
    tokenId: String,
    registerDoc: String,
    diseases: [String],
    foodAdvice: String,
    restAdvice: String,
    activitiesAdvice: String,
    hygieneAdvice: String,
    generalAdvice: String
}, { collection: "patients" });
const Patient = mongoose.model('Patient', patientSchema);

app.post('/', async (req, res) => {
    console.log(req.body);
    let tokenId = "a1b2c3"; //req.body.tokenId
    //let type = "generalOrientation";

    if (!req.body.queryResult.parameters["wishes"]) {
        Patient.findOne({ tokenId: tokenId }, async (err, patient) => {
            if (patient) {
                switch (req.body.queryResult.parameters.orientacao1) {
                    case "alimentação":
                        FoodAdvice.findById(patient.foodAdvice, (err, advice) => {
                            if (advice)
                                res.status(200).json({ fulfillmentText: advice.text });
                            else
                                res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                        });
                        break;
                    case "repouso":
                        RestAdvice.findById(patient.restAdvice, (err, advice) => {
                            if (advice)
                                res.status(200).json({ fulfillmentText: advice.text });
                            else
                                res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                        });
                        break;
                    case "atividades":
                        ActivitiesAdvice.findById(patient.activitiesAdvice, (err, advice) => {
                            if (advice)
                                res.status(200).json({ fulfillmentText: advice.text });
                            else
                                res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                        });
                        break
                    case "higiene":
                        HygieneAdvice.findById(patient.hygieneAdvice, (err, advice) => {
                            if (advice)
                                res.status(200).json({ fulfillmentText: advice.text });
                            else
                                res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                        });
                        break;
                    case "gerais":
                        GeneralAdvice.findById(patient.generalAdvice, (err, advice) => {
                            if (advice)
                                res.status(200).json({ fulfillmentText: advice.text });
                            else
                                res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                        });
                        break;
                    default:
                        res.status(400).json({ response: "- TIPO DE ORIENTAÇÃO INVÁLIDO -" });
                        break;
                }
            }
            else {
                let patient = new Patient({
                    name: "anonym",
                    tokenId: req.body.responseId,
                    registerDoc: "doc-" + req.body.responseId,
                    diseases: ["câncer", "hipertensão"],
                    foodAdvice: "5d57edf55fc6e931c1f8e80f",
                    restAdvice: "5d57ee235fc6e931c1f8e810",
                    activitiesAdvice: "5d57ee3d5fc6e931c1f8e811",
                    hygieneAdvice: "5d57ee725fc6e931c1f8e813",
                    generalAdvice: "5d57ee5a5fc6e931c1f8e812"
                });
                console.log("Inserindo um novo Paciente");
                patient.save()
                    .then(() => {
                        console.log("- INSERIDO NO DB COM SUCESSO -");
                        res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
                    })
                    .catch((err) => {
                        console.log("- ERRO AO INSERIR NO DB -");
                        console.error(err)
                        res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
                    });
            }
        });
    }
    else {
        let arr = req.body.queryResult.parameters["wishes"];
        Advice.find({}, async (err, advices) => {
            let resp = [];
            await advices.forEach(async (advice) => {
                let aux = true;
                if (arr.length > Math.floor(advice.keys.length / 2)) {
                    await arr.forEach((item) => {
                        if (!advice.keys.includes(item)) {
                            aux = false;
                        }
                    });
                    if(aux)
                        resp.push(advice)
                }
            });
            if (resp.length > 0) {
                console.log("returned: ", resp[0].text);
                res.status(200).json({ fulfillmentText: resp[0].text });
            }
            else {
                res.status(400).json({ fulfillmentText: "Lamento mas não encontramos nenhuma orientação em nosso banco de dados." });
            }
        });
    }
});

app.post('/advices', (req, res) => {
    let advice = new Advice({
        keys: req.body.queryResult.parameters["keys"],
        text: req.body.queryResult.parameters["text"]
    });
    console.log("Inserção de uma nova advice:")
    console.log("Keys: ", advice.keys);
    console.log("Text: ", advice.text);
    advice.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/advices/foods', (req, res) => {
    let advice = new FoodAdvice({
        text: req.body.text
    });
    console.log("Inserindo uma nova orientação de Alimentação");
    advice.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/advices/rest', (req, res) => {
    let advice = new RestAdvice({
        text: req.body.text
    });
    console.log("Inserindo uma nova orientação de Repouso");
    advice.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/advices/activities', (req, res) => {
    let advice = new ActivitiesAdvice({
        text: req.body.text
    });
    console.log("Inserindo uma nova orientação de Atividades");
    advice.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/advices/hygiene', (req, res) => {
    let advice = new HygieneAdvice({
        text: req.body.text
    });
    console.log("Inserindo uma nova orientação de Higiene");
    advice.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/advices/general', (req, res) => {
    let advice = new GeneralAdvice({
        text: req.body.text
    });
    console.log("Inserindo uma nova orientação de âmbito Geral");
    advice.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/users/create', (req, res) => {
    let patient = new Patient({
        name: req.body.patient.name,
        tokenId: req.body.patient.tokenId,
        registerDoc: req.body.patient.registerDoc,
        diseases: req.body.patient.diseases,
        foodAdvice: req.body.patient.foodAdvice,
        restAdvice: req.body.patient.restAdvice,
        activitiesAdvice: req.body.patient.activitiesAdvice,
        hygieneAdvice: req.body.patient.hygieneAdvice,
        generalAdvice: req.body.patient.generalAdvice
    });
    console.log("Inserindo um novo Paciente");
    patient.save()
        .then(() => {
            console.log("- INSERIDO NO DB COM SUCESSO -");
            res.status(201).json({ response: "- INSERIDO NO DB COM SUCESSO -" });
        })
        .catch((err) => {
            console.log("- ERRO AO INSERIR NO DB -");
            console.error(err)
            res.status(400).json({ response: "- ERRO AO INSERIR NO DB -" });
        });
});

app.post('/users/update', (req, res) => {
    Patient.findOneAndUpdate(req.query, req.body.patient, {}, (err, patient) => {
        if (patient) {
            res.status(200).json({ response: "- ATUALIZAÇÃO EFETUADA COM SUCESSO -", obj: patient });
        }
        else {
            res.status(400).json({ response: "- ERRO AO ATUALIZAR DB -" });
        }
    });
});

app.post('/users/delete', (req, res) => {
    Patient.findOneAndRemove(req.query, (err, patient) => {
        if (patient) {
            res.status(200).json({ response: "- DELETE EFETUADO COM SUCESSO -", obj: patient });
        }
        else {
            res.status(400).json({ response: "- ERRO AO DELETAR DO DB -" });
        }
    });
});

app.get('/users', (req, res) => {
    Patient.findOne(req.query, (err, patient) => {
        if (patient) {
            res.status(200).json(patient);
        }
        else {
            console.error(err);
            res.status(400).json({ response: "- NENHUM PACIENTE ENCONTRADO -" });
        }
    });
});

mongoose.connect('mongodb://localhost:27017/devdb', { useNewUrlParser: true }).then(() => {
    const server = app.listen(process.env.PORT || 5000, () => {
        console.log('Servidor rodando na porta %d.', server.address().port);
    });
}).catch(() => {
    console.log("ERRO: Impossível conectar ao Banco de Dados.")
});