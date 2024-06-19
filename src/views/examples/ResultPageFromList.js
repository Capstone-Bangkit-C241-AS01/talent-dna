/*!
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)
* Coded by Creative Tim

=========================================================
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Badge
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

const ResultPageFromList = () => {
  const [resultData, setResultData] = useState('');
  const [topTalents, setTopTalents] = useState([]);
  const [topTalentsDesc, setTopTalentsDesc] = useState('');
  const [bottomTalents, setBottomTalents] = useState([]);
  const [bottomTalentsDesc, setBottomTalentsDesc] = useState('');
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
        try {
          const response = await axios.get(`https://talentdna.cloud/api/data/${id}/`);
              setResultData(response.data);
              setTopTalents(response.data.top_10_talents);
              setTopTalentsDesc(response.data.top_talent_description);
              setBottomTalents(response.data.bottom_5_talents);
              setBottomTalentsDesc(response.data.bottom_talent_description);
              setJobs(response.data.job_recommendations);
            
        } catch (error) {
          console.error('Error:', error);
        }
      }
    fetchResult();
  }, [id]);

  const [toggledIndex, setToggledIndex] = useState(null);

  const toggleDesc = (index) => {
    setToggledIndex(toggledIndex === index ? null : index);
  };

  const formatTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <IndexNavbar />
      <div className="section section-typo">
      <img alt="..." className="path" src={require("assets/img/path1.png")} />
      <Container>
        <br></br>
        <h1 className="h1-result text-center">Result</h1>
        <h2 className="mt-5">Name&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp; {resultData.name}</h2>
        <hr className="line-info" />
        <h1 className="title">
          Your{" "}
          <span className="text-info">Top 10 Talents</span>
        </h1>
        <div id="typography">
        {topTalents.map((topTalent, i) => ( 
          <Row>
            <Col md="3" className="text-center">
              {i+1 < 10 ? (
                <h5 className="text-on-back">0{i+1}</h5>
              ):
              <h5 className="text-on-back">{i+1}</h5>
              }
            </Col>
            <Col md="9">
              <div className="typography-line">
                <h2 className="mt-4" style={{textTransform: "capitalize"}}>
                  {topTalent.name}
                </h2>  
                <Button
                className="btn-simple btn-round ml-5 mt-3"
                color="success"
                style={{ pointerEvents:"none", alignSelf: "flex-start" }}
                >{`${(topTalent.strength * 100).toFixed(0)}%`}
                </Button>
              </div>
            </Col>
          </Row>
        ))}
        
          <Card>
            <h2 className="title ml-5">Summary</h2>
              <CardBody>
              <p className="mx-4 mb-4" style={{fontSize:"20px"}}>
              {formatTextWithLineBreaks(topTalentsDesc)}
            </p>
              </CardBody>     
          </Card>
        </div>
    
        <div className="space-50" />
        
        <hr className="line-warning" />
        <h1 className="title">
          Your{" "}
          <span className="text-warning">Bottom 5 Talents</span>
        </h1>
        <div id="typography">
        {bottomTalents.map((bottomTalent, i) => ( 
          <Row>
            <Col md="3" className="text-center">
                <h5 className="text-on-back">0{i+1}</h5>
            </Col>
            <Col md="9">
              <div className="typography-line">
                <h2 className="mt-4" style={{textTransform: "capitalize"}}>
                  {bottomTalent.name}
                </h2>  
                <Button
                className="btn-simple btn-round ml-5 mt-3"
                color="danger"
                style={{ pointerEvents:"none", alignSelf: "flex-start" }}
                >{`${(bottomTalent.strength * 100).toFixed(0)}%`}
                </Button>
              </div>
            </Col>
          </Row>
        ))}
          <Card>
            <h2 className="title ml-5">Summary</h2>
              <CardBody>
              <p className="mx-4 mb-4" style={{fontSize:"20px"}}>
              {formatTextWithLineBreaks(bottomTalentsDesc)}
            </p>
              </CardBody>     
          </Card>
        </div>

        <div className="space-50" />
        
        <hr className="line-primary" />
        <h1 className="title">
          <span className="text-primary">5 Suitable Jobs </span>
          For You  
        </h1>
        <Container>
            <Row>
              <Col md="12">
              {jobs.map((job, i) => (
                <Card className="card-coin card-plain">
                  <CardBody>
                    <Col md="12">
                      <div>
                        <Row>
                          <h5 className="text-on-back ml-4">0{i+1}</h5>
                          <h3 className="mt-4 ml-4">
                            {job.job}
                          </h3> 
                          <Button onClick={() => toggleDesc(i)} className="btn-icon btn-round ml-auto mt-4 mr-4">
                          {toggledIndex === i ? "△" : "▽"}
                          </Button>
                        </Row>
                      </div>
                      </Col>
                    {toggledIndex === i && (
                      <div>
                        <Badge color="info" className="ml-4">Job Tasks</Badge>
                        <p className="ml-4" style={{ fontSize: '16px' }}>
                          {formatTextWithLineBreaks(job.tasks)}
                        </p>
                        <br></br>
                        <Badge color="success" className="ml-4">Work Styles</Badge>
                        <p className="ml-4" style={{ fontSize: '16px' }}>
                          {formatTextWithLineBreaks(job.work_styles)}
                        </p>
                      </div>
                    )}
                    
                  </CardBody>
                </Card>
              ))}
              </Col>
            </Row>
            <div className="space-50" />
            <Row className="text-center">
              <Col md='12'>
              <Button color="default" className="mr-4 text-center" onClick={() => navigate("/")}>Back to Homepage</Button>
              </Col>
            </Row>
        </Container>
        
      </Container>
    </div>
    </>
  );
}

export default ResultPageFromList;