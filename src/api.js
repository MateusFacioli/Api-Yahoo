 /* 
 https://www.alphavantage.co/documentation/
 OVERVIEW = dados fundamentais  
 INCOME_STATEMENT = declaração de renda  
 BALANCE_SHEET = balanço patrimonial 
 CASH_FLOW = fluxo de caixa
 EARNINGS = ganhos
 LISTING_STATUS = açoes e etfs
 CURRENCY_EXCHANGE_RATE = cotações
 GLOBAL_QUOTE  
 "01. symbol":"MSFT" "02. open":"151.6500" "03. high":"153.4200" "04. low":"151.0200" "05. price":"152.0600" "06. volume":"9425575" 
 "07. latest trading day":"2019-12-12" "08. previous close":"151.7000" "09. change":"0.3600" "10. change percent":"0.2373%"

 empresas brasil tem .sao no final
 */
import axios from 'axios';
const instance = axios.create({ //base para todas as consultas
    baseURL: 'https://alpha-vantage.p.rapidapi.com',
    headers: {
        'content-type':'application/octet-stream',
        'x-rapidapi-host':'alpha-vantage.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY
        
    }
});

export default {
stockTimeSeries: (symbol) =>instance({'method':'GET', 'url':'/query', 
'params': {'outputsize':'compact','datatype':'json', 'function':'TIME_SERIES_DAILY_ADJUSTED','symbol': symbol.toUpperCase()},
// compact=100 mais recentes ou full=20 anos        
// transformando todos os dados para o modelo que queremos ao inves de ficar muitos nós encadeado
        transformResponse: [function (data) {
            const json = JSON.parse(data)
            const dates = Object.keys(json['Time Series (Daily)']).reverse() //pega os indices do vetor e reverte 
            // dados para input no grafico
            const closePrices = dates.map(date => date = { date, close: Number(json['Time Series (Daily)'][date]['4. close'])})
            const adjusted = dates.map(date => date = { date, adjusted: Number(json['Time Series (Daily)'][date]['5. adjusted close'])})
            const symbol = json['Meta Data']['2. Symbol']
            const refreshed = json['Meta Data']['3. Last Refreshed']
            data = { 
                symbol, 
                refreshed, 
                closePrices, 
                adjusted
            }
            return data;
        }],
    }),
// search: (symbol) =>instance({'method':'GET','url':'/query',
// 'params': {'keywords': symbol.toUpperCase(),'datatype':'json','function': 'SYMBOL_SEARCH',},

//             transformResponse: [function (data) {
//                 const json = JSON.parse(data)
//                 const matches = json['bestMatches']['1. symbol']
//                 const name = json['bestMatches']['2. name']
//                 data = {
//                     matches, 
//                     name
//                 }
//                 return data;
//             }],
//         }),
dolar: ()=>instance({'method':'GET','url':'/query',
    params: {function: 'CURRENCY_EXCHANGE_RATE', to_currency: 'BRL', from_currency: 'USD'},

        transformResponse: [function (data) {
            //console.log('Transforming data...')
            const json = JSON.parse(data)
            const brltodol = json['Realtime Currency Exchange Rate']['5. Exchange Rate']
            const refreshed = json['Realtime Currency Exchange Rate']['6. Last Refreshed']
            data = {
                brltodol, 
                refreshed
            }
            return data;
        }],
    }),
euro: ()=>instance({'method':'GET','url':'/query',
    params: {function: 'CURRENCY_EXCHANGE_RATE', to_currency: 'BRL', from_currency: 'EUR'},

        transformResponse: [function (data) {
            //console.log('Transforming data...')
            const json = JSON.parse(data)
            const brltoeur = json['Realtime Currency Exchange Rate']['5. Exchange Rate']
            const refreshed = json['Realtime Currency Exchange Rate']['6. Last Refreshed']            
            data = {
                brltoeur,
                refreshed
            }
            return data;
        }],
    }),
btc: ()=>instance({'method':'GET', 'url':'/query', 
    params: {function: 'CURRENCY_EXCHANGE_RATE', to_currency: 'BRL', from_currency: 'BTC'},
        
        transformResponse: [function (data) {
            const json = JSON.parse(data)
            const brltobtc = json['Realtime Currency Exchange Rate']['5. Exchange Rate']
            const refreshed = json['Realtime Currency Exchange Rate']['6. Last Refreshed']
            data = { 
                brltobtc, 
                refreshed
            }
            return data;
        }],
    }),
}
/**
 search 65 usar 
 Array.from 38
 let responseData 75 APP
 criar componente linechart (ARQUIVO SEPARADO)
 mostrar 2 dados no grafico (duas linhas)
 dolar e euro  pegar dados quando atualiza pagina nao depender do botao

 */
