/*!
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)
* Coded by Creative Tim

=========================================================
*/
import React from "react";
import logo from 'assets/img/logo-ESQ-Talent-DNA.png';
import { useNavigate } from "react-router-dom";


// reactstrap components
import { Button, Container } from "reactstrap";

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <img src={logo}/>
          <h3 className="d-none d-sm-block">
            We help you identify your natural talents and recognize your potentials.
          </h3>
          <Button color="primary" size="lg" onClick={() => navigate("/fill-assessment")}>Start Assessment</Button>
        </div>
      </Container>
    </div>
  );
}
