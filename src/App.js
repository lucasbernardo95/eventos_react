import React, { Component } from 'react';
import Header from './components/header/header';
import Contato from './components/contato/contato';

class App extends Component {
   
  constructor(props){
    super(props);
    this.state = {
      index: '',
      id_evento: 0, //se for diferente de 0 indica que está editando
      eventos: []
    }
    this.onSaveDate = this.onSaveDate.bind(this);
  }

  componentDidMount(){
    this.refs.nome.focus();
    let url = 'http://localhost:8080/evento';

    fetch(url)
        .then((response) => response.json()
            .then((dados) => {
                console.log(dados)
                this.setState({ eventos: dados });
            })
        ).catch(
        error => console.log(error)
        );
  }

  //Method for save or update evento
  onSaveDate = (e) =>{
      e.preventDefault();

      let eventoSave;

      let lista = this.state.eventos;
      let nome = this.refs.nome.value;
      let local = this.refs.local.value;
      let horario = this.refs.horario.value;
      let data = this.refs.data.value;

      if(this.state.id_evento === 0) { //new evento
          let newEvento = {
            nome, local, horario, data
          } 
          lista.push(newEvento);
          eventoSave = newEvento;
          eventoSave.id = 0;
      } else { //update evento
          let index = this.state.index;
         
          lista[index].nome = nome;
          lista[index].local = local;
          lista[index].horario = horario;
          lista[index].data = data;
          eventoSave = lista[index];
      }

      this.setState({
          eventos: lista,
          id_evento: 0
      }); //atualiza o valor do id para evitar bugs

      let url = new Request('http://localhost:8080/evento');
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventoSave)
      })
      .then(function(response) {   
          response.json().then(function(data) {
              console.log(data);
          });
      })
      this.refs.myForm.reset();
  }

  //Delete the selected evento
  onDeleteDate = (i) => {
      let eventoDelete = this.state.eventos[i];
      let lista = this.state.eventos;
      lista.splice(i, 1); //apaga o elemento da lista

      this.setState({
          eventos : lista
      });

      let url = 'http://localhost:8080/evento';

      fetch(url , {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eventoDelete)
      })
      .then(function(response) {
          if ( response.status !== 200 ) {
              console.log('Status Code: ' +  response.status);
              return;
          }
      
          response.json().then(function(data) {
              console.log(data);
          });
      })

  }

  //assigns the data of the selected event to change
  onEditDate = (i) => {
      let eventoEdit = this.state.eventos[i];
      this.refs.nome.value = eventoEdit.nome;
      this.refs.local.value = eventoEdit.local;
      this.refs.horario.value = eventoEdit.horario;
      this.refs.data.value = eventoEdit.data;
      this.setState({
        id_evento: eventoEdit.id,
        index: i
      });
  
      this.refs.nome.focus();
  }
 
  render() {

    var {eventos} = this.state;
    return (
      
      <div>

            <Header />
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                  <Contato/>

              </div>
              <div className="tab-pane fade show active container" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                  <form ref="myForm" className="myForm" >
                    <div className="row">
                        <div className="col">
                          <input ref="nome" type="text" className="form-control" placeholder="Nome do evento"></input>
                        </div>
                        <div className="col">
                          <input ref="local" type="text" className="form-control" placeholder="Local do evento"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                          <input ref="horario" type="text" className="form-control" placeholder="Horário"></input>
                        </div>
                        <div className="col">
                          <input ref="data" type="text" className="form-control" placeholder="Data"></input>
                        </div>
                    </div>
                    <button onClick={(e)=>this.onSaveDate(e)} className="btn btn-primary btn-lg btn-block">Salvar</button>
                  </form>


                    <table className="table table-hover table-dark">
                        <thead>
                          <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Local</th>
                            <th scope="col">Horário</th>
                            <th scope="col">Data</th>
                            <th>Ações</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          { eventos.map((evento, i) =>(
                              <tr key={evento.id_evento}>
                                <th scope="row">{evento.nome}</th>
                                <td>{evento.local}</td>
                                <td>{evento.horario}</td>
                                <td>{evento.data}</td>
                                <td>
                                  <pre>
                                    <button onClick={()=>this.onEditDate(i)} className="btn btn-primary">Editar</button>
                                  </pre>
                                </td>
                                <td>
                                <button onClick={()=>this.onDeleteDate(i)}  className="btn btn-primary">Excluir</button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>

              </div>
          </div>
        
      
      </div>
      
    );
  }
}

export default App;