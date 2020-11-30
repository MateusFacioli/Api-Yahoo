// import React, { Component } from 'react';
// //import {Button, Collapse, Container} from 'reactstrap';
// import Headers from './components/Headers';
// import Footer from './components/Footer';
// import ButtonCollapse from './components/ButtonCollapse';
// import Table from './components/Tables';
// import Routes from './routes';
// import api from './api';
// import './App.css';

// // inicio
// // function App (props) {
// //   return(
// //     <div>
// //     <Headers/>
// //   <ButtonCollapse/>
// //     <Table/>
// //     <Footer/>
// //    </div>    
// //   );
// // };

// // routes
// // function App(){
// //   return(
// //     <div>
// //       <Routes/>
// //     </div>
// //   );
// // };


// class App extends Component{
//   state = {
//     stocks: [],
//   }
//   // async componentDidMount(){
//   //   //fazer dinamico pegar dado digitado
//   //   const response= await api.get('');
    
//   //   this.setState({stocks: response.data});
//   // }

//   render(){ 
//     const {stocks}=this.state;
//   return(
//     <div>
      
//       <h1>listar</h1>
//       <ul>USD:</ul>      
//       {/* {stocks.map(stock=>(
//         <ul key={stock.show.id}>
//           <li>titulo: {stock.show.name}</li>
//           <li>url: {stock.show.url}</li>
//       <li>rating: {stock.show.rating.average}</li>
//       <li>type: {stock.show.type}</li>
//         </ul>
//       ))} */}
//     </div>
//   );
//   }
// }

// export default App;

import React from 'react';
import api from './api';
import './App.css';
import Headers from './components/Headers';
import Footer from './components/Footer';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Label} from 'recharts';
import { getDefaultNormalizer } from '@testing-library/react';
import NumberFormat from 'react-number-format';
import ButtonCollapse from './components/ButtonCollapse';
const App = (props) => {
    // Create state variables hooks usar state sem criar classes
    let [responseData, setResponseData] = React.useState('');
    let [ticker, setTicker] = React.useState('');
    let [message, setMessage] = React.useState('');
    let [dolar, setDolar] = React.useState('');
    let [euro, setEuro] = React.useState('');
    let [btc, setBtc] = React.useState('');
    let [search, setSearch] = React.useState('');
    
    // obtem os dados das acoes  por parametros pela funçao que contem a chamada axios
    const fetchData = (e) => {
        e.preventDefault()
        setMessage('Loading...')
        api.stockTimeSeries(ticker)
        .then((response)=>{
            setResponseData(response.data)
            setMessage('')
        })
        // api.search(ticker)
        // .then((response)=>{
        //     setSearch(response.data)
        // })
        api.dolar()
        .then((response)=>{
            setDolar(response.data.brltodol)
        })
        api.euro()
        .then((response)=>{
            setEuro(response.data.brltoeur)
        })
        api.btc()
        .then((response)=>{
            setBtc(response.data.brltobtc)
        })
        .catch((error) => {
            setMessage('Error symbol not found')
            console.log(error)
        })
    }

     function FormatNumber({ value }) {
        return ( <NumberFormat value={value} displayType={'text'} thousandSeparator={true} /*prefix={'R$ '}*/ decimalScale={2} 
               /*renderText={formattedValue => <p>{formattedValue}</p>}*/ /* <--- Don't forget this!*/ /> 
               ); 
            }
    return (
        <div id="fundo">
            {/* <Headers/> */}
            <h1>Stock Market App</h1>
            <form onSubmit={fetchData}>
                <fieldset>
                    <legend>Search Stock Market</legend>
                    <label htmlFor="ticker">Enter stock ticker
                        <input
                            required name="ticker" id="ticker" type='text' placeholder='SPY'value={ticker}
                            onChange={(e) => setTicker(e.target.value)}/>
                    </label>
                    <button type='submit'>Search</button>
                </fieldset>
            </form> 
            <p>{message}</p>
           <p>USD:<span class="badge badge-pill badge-primary"><FormatNumber value={dolar}/></span> <br/>
           EUR:<span class="badge badge-pill badge-primary"><FormatNumber value={euro}/></span>  <br/>
           BTC:<span class="badge badge-pill badge-primary"><FormatNumber value={btc}/></span> <br/> </p>
           
            <h3>Symbol: {responseData ? responseData.symbol : ''}</h3>
            <p>Daily Time Series with Splits and Dividend Events</p>
            <small>Last Refresh: {responseData ? responseData.refreshed : ''}</small>

            <AreaChart width={700} height={300} data={responseData.closePrices} syncId="anyId" margin={{ top: 50, right: 20, left: 10, bottom: 5 }} >
                <XAxis padding={{left: 5, right: 5}} tickCount={10} angle={-60} height={90} dataKey="date" />
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip />
                <YAxis tickCount={10} type="number" width={80}> <Label value="Close Price" position="insideLeft" angle={270} /> </YAxis>
                <Area type="monotone" dataKey="close" stroke="#ff7300" yAxisId={0} />
        </AreaChart>
        <AreaChart width={700} height={300} data={responseData.adjusted} syncId="anyId" margin={{ top: 50, right: 20, left: 10, bottom: 5 }} >
        <XAxis padding={{left: 5, right: 5}} tickCount={10} angle={-60} height={90} dataKey="date" />
        <CartesianGrid stroke="#f5f5f5" />
          <Tooltip />
          <YAxis tickCount={10} type="number" width={80}> <Label value="Adjusted Price" position="insideLeft" angle={270} /> </YAxis>
          <Area type="monotone" dataKey="adjusted" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>    
        </div>
    )
}

export default App;

/*

app.get('/keyword/:search', (req, res) => {
    console.log("--------/keyword-----------"+req.params.s)
    let search = req.params.search;
    search = search.toLowerCase();
    res.setHeader('Content-Type', 'application/json');
    const g  =Ticker.TickerSymbols.filter( f => 
        (JSON.stringify(f).toLowerCase().indexOf(search) !== -1)
       )

    res.send(g)
    res.end()
})

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready On Server http://localhost:${port}`)
})
 */