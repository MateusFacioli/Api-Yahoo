import React, { Component } from 'react';
//import {Button, Collapse} from 'reactstrap';
import Headers from './components/Headers';
import Footer from './components/Footer';
import ButtonCollapse from './components/ButtonCollapse';
import Table from './components/Tables';
import Routes from './routes';
import api from './api';

// primeira forma por array function
// function App() {
//   return (
//     <div>
//     oi 
//     </div>
//   );
// }
//segunda forma por classe
// class App extends React.Component{
//   render (){
//     return (
//       <div>
//       </div>
//     );
//   }
// }

// inicio
// function App (props) {
//   return(
//     <div>
//     <Headers/>
//   <ButtonCollapse/>
//     <Table/>
//     <Footer/>
//    </div>    
//   );
// };

// routes
// function App(){
//   return(
//     <div>
//       <Routes/>
//     </div>
//   );
// };

//axios
class App extends Component{
  state = {
    stocks: [],
  }
  async componentDidMount(){
    //fazer dinamico pegar dado digitado
    const response= await api.get('');
    this.setState({stocks: response.data});
    //console.log(response.data);
  }

  render(){ 
    const {stocks}=this.state;
  return(
    <div>
      <h1>listar</h1>
      {stocks.map(stock=>(
        <p key={stock.show.id}>
          <li>titulo: {stock.show.name}</li>
          <li>url: {stock.show.url}</li>
      <li>rating: {stock.show.rating.average}</li>
      <li>type: {stock.show.type}</li>
        </p>
      ))}
    </div>
  );
  }
}

export default App;
