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

app.post('/', (req, res) => {
    //console.log(req.body.queryResult);
    //let typeOfAdvice = req.body.queryResult;
    let tokenId = "a1b2c3"; //req.body.tokenId

    Patient.findOne({ tokenId: tokenId }, async (err, patient) => {
        switch (req.body.type) {
            case "foods":
                FoodAdvice.findById(patient.foodAdvice, (err, advice) => {
                    if (advice)
                        res.status(200).json({ fulfillmentText: advice.text });
                    else
                        res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                });
                break;
            case "rest":
                RestAdvice.findById(patient.restAdvice, (err, advice) => {
                    if (advice)
                        res.status(200).json({ fulfillmentText: advice.text });
                    else
                        res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                });
                break;
            case "activities":
                ActivitiesAdvice.findById(patient.activitiesAdvice, (err, advice) => {
                    if (advice)
                        res.status(200).json({ fulfillmentText: advice.text });
                    else
                        res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                });
                break
            case "hygiene":
                HygieneAdvice.findById(patient.hygieneAdvice, (err, advice) => {
                    if (advice)
                        res.status(200).json({ fulfillmentText: advice.text });
                    else
                        res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                });
                break;
            case "general":
                GeneralAdvice.findById(patient.generalAdvice, (err, advice) => {
                    if (advice)
                        res.status(200).json({ fulfillmentText: advice.text });
                    else
                        res.status(400).json({ response: "- ORIENTAÇÃO NÃO ENCONTRADA -" });
                });
                break;
            case "all":
                // ENDPOINT EXPERIMENTAL
                let advices = {
                    foods: '',
                    rest: '',
                    activities: '',
                    hygiene: '',
                    general: ''
                };
                await FoodAdvice.findById(patient.foodAdvice, (err, advice) => {
                    if (advice)
                        advices.foods = advice;
                });
                await RestAdvice.findById(patient.restAdvice, (err, advice) => {
                    if (advice)
                        advices.rest = advice;
                });
                await ActivitiesAdvice.findById(patient.activitiesAdvice, (err, advice) => {
                    if (advice)
                        advices.activities = advice;
                });
                await HygieneAdvice.findById(patient.hygieneAdvice, (err, advice) => {
                    if (advice)
                        advices.hygiene = advice;
                });
                await GeneralAdvice.findById(patient.generalAdvice, (err, advice) => {
                    if (advice)
                        advices.general = advice;
                });
                res.status(200).json({ fulfillmentText: advices });
                break;
            default:
                res.status(400).json({ response: "- TIPO DE ORIENTAÇÃO INVÁLIDO -" });
                break;
        }
    });
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