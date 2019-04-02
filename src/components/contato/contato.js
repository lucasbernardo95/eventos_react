import React from "react";
import foto from './img/imgPerfil.jpg';

const Contato = () => (
    <div className="container" >
        <div className="box">
            <img src={foto} alt="foto" className="foto"/>
        </div>
        <div className="card-body">
            <h5 className="card-title">Assis Lucas Romão Bernardo</h5>
            <p className="card-text"></p>
        </div>
            <ul className="list-group list-group-flush">
            <li className="list-group-item">Telefone: 84 99177-0750</li>
            <li className="list-group-item">E-mail: lucasbernardo95@gmail.com</li>
        </ul>
        <div className="card-body">
            <a href="https://github.com/lucasbernardo95" className="card-link">GitHub</a>
            <a href="http://lattes.cnpq.br/1517443053913446" className="card-link">Currículo Lattes</a>
        </div>
        
  </div>
);

export default Contato;