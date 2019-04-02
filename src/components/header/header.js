
// Importando o React
import React from "react";


const Header = () => (
<ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="col-sm">
    <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Gerenciamento</a>
  </li>
  <li className="col-sm">
    <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Contato</a>
  </li>
</ul>

);

export default Header;