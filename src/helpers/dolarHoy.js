const request = require('request'),
helpers = {};

function getValue(data, offset, limit) {
    let value = [];
    for(let i = 0;i < limit;i++)
        value.push( data.charAt(offset+i) );
    return value;
}

function parseDollar(value) {
    let aux = 0;
    aux = parseInt( value[0] )*10 + parseInt( value[1] );
    aux += (parseInt( value[3] ) + parseInt( value[4] ))*0.1; // si el dólar está 78,50$, tomar los decimales sería -> '5' + '0' es 5. 5*0,1 es 0,50
    return aux;
}

helpers.dolarHoy = (req, view, next) => { // middleware
    const irrelevantCharacters = { // Caracteres existentes entre el final de la palabra "Dólar Libre" y el valor en sí, etc
        buy: {
            official: 48,
            blue: 48 
        }, 
        sell: {
            official: 97,
            blue: 97
        }
    };
    request('http://www.dolarhoy.com/', function (err, res, body) {
        const dollar = {
            buy: {
                official: parseDollar( getValue(body, body.search('Banco Nación')+'Banco Nación'.length+irrelevantCharacters.buy.official, 5) ),
                blue: parseDollar( getValue(body, body.search('Dólar Libre')+'Dólar Libre'.length+irrelevantCharacters.buy.blue, 5 ))
            },
            sell: {
                official: parseDollar( getValue(body, body.search('Banco Nación')+'Banco Nación'.length+irrelevantCharacters.sell.official, 5) ),
                blue: parseDollar( getValue(body, body.search('Dólar Libre')+'Dólar Libre'.length+irrelevantCharacters.sell.blue, 5 ))
            }
        };
        console.log(dollar);
        view.send(dollar);
    });
    next();
};

module.exports = helpers;

/*helpers.dolarHoy = (req, res, next) => { // middleware
    const irrelevantCharacters = { // Caracteres existentes entre el final de la palabra "Dólar Libre" y el valor en sí, etc
        buy: {
            official: 48,
            blue: 48 
        }, 
        sell: {
            official: 97,
            blue: 97
        }
    };
    const dollar = { // Model
        buy: {
            official: '',
            blue: ''
        },
        sell: {
            official: '',
            blue: ''
        }
    };
    request('http://www.dolarhoy.com/', function (err, res, body) {
        dollar = {
            buy: {
                official: parseDollar( getValue(body, body.search('Banco Nación')+'Banco Nación'.length+irrelevantCharacters.buy.official, 5) ),
                blue: parseDollar( getValue(body, body.search('Dólar Libre')+'Dólar Libre'.length+irrelevantCharacters.buy.blue, 5 ))
            },
            sell: {
                official: parseDollar( getValue(body, body.search('Banco Nación')+'Banco Nación'.length+irrelevantCharacters.sell.official, 5) ),
                blue: parseDollar( getValue(body, body.search('Dólar Libre')+'Dólar Libre'.length+irrelevantCharacters.sell.blue, 5 ))
            }
        };
    });
    res.send(dollar);
    next();
    //
};*/