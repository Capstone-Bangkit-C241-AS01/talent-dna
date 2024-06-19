/*!
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)
* Coded by Creative Tim

=========================================================
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Col,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar.js";

export default function ListResultsPage() {
    const [search, setSearch] = useState("");
    const [staffs, setStaffs] = useState([]);
    const navigate = useNavigate();

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  useEffect(() => {
    axios
      .get(`https://talentdna.cloud/api/data/`)
      .then((res) => {
        setStaffs(res.data)
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const filterSearch = () => {
    const trimmedSearch = search.trim().toLowerCase();
  
    if (!trimmedSearch) {
      // console.log("Search is empty, returning all contacts.");
      return staffs;
    }

    return staffs.filter((staff) =>
      Object.values(staff).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  const highlightSearchText = (text) => {
    const trimmedSearch = search.trim().toLowerCase();
    // console.log("Original Text:", text);
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    // console.log("Text Parts:", parts);
    return parts.map((part, index) =>
      part.toLowerCase() === trimmedSearch ? (
        <span key={index} className="highlighted-text" style={{ backgroundColor: "yellow", fontWeight: "bold", color: "black" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path2"
            src={require("assets/img/path2.png")}
          />
          <img
            alt="..."
            className="shapes triangle"
            src={require("assets/img/triunghiuri.png")}
          />
          <img
            alt="..."
            className="shapes wave"
            src={require("assets/img/waves.png")}
          />
          <img
            alt="..."
            className="shapes squares"
            src={require("assets/img/patrat.png")}
          />
          <img
            alt="..."
            className="shapes circle"
            src={require("assets/img/cercuri.png")}
          />
          {/* <div className="content-center"> */}
          <div className="content">
          <Container>
            <Col md="12">
            <h1 className="text-center h1-result">TalentDNA Results</h1>
            </Col>

            <Col lg="3" sm="6" className="mt-5 mb-4">
              <InputGroup>
                <Input placeholder="Search" type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                        style={{ color: '#333333' }}
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>


            <Card className="w-100 p-3 card-register">
                <CardBody>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterSearch().map((staff, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{highlightSearchText(staff.name)}</td>
                        <td>{highlightSearchText(staff.job_recommendations[0].job)}</td>
                        <td>
                            <Button
                                className="btn-simple btn-round"
                                color="primary"
                                type="button"
                                onClick={() => navigate(`/result/${staff.id}`)}
                                >
                                See Result
                            </Button>
                        </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </CardBody>
            </Card>
            </Container>
           
          </div>
        </div>
        
      </div>
    </>
  );
}