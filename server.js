const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const router = express.Router();

router.get('/random',(req, res, next) =>{
    const randomElement = getRandomElement(quotes);
    res.status(200).send({quote: {randomElement}});

})

router.get('/',(req,res,next)=>{
    if(req.query.person){
        const author = req.query.person;
        const result = quotes.filter(quote =>{
            return quote["person"] === author;
        });
        if(result.length > 0){
            res.status(200).send({quote: {result}});
        }else{
            res.status(200).send({quote: []});
        }
    }else {
        res.status(200).send({quote: {quotes}});
    }

});

router.post('/',(req, res, next)=>{
    if(req.query.person && req.query.quote){
        const newQuote = {quote :req.query.quote, person: req.query.person};
        quotes.push(newQuote);
        res.status(201).send({quote: {newQuote}});
    }else{
        res.status(400).send();
    }
})

app.use('/api/quotes',router);

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(4001, ()=>{
    console.log(`Server started on port ${PORT}`);
    }
)
