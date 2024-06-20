/*!
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)
* Coded by Creative Tim

=========================================================
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

const ResultPage = () => {
  const [resultData, setResultData] = useState('');
  const [topTalents, setTopTalents] = useState([]);
  const [topTalentsDesc, setTopTalentsDesc] = useState('');
  const [bottomTalents, setBottomTalents] = useState([]);
  const [bottomTalentsDesc, setBottomTalentsDesc] = useState('');
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,);

  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setResultData(location.state.data);
        setTopTalents(location.state.data.top_10_talents);
        setTopTalentsDesc(location.state.data.top_talent_description);
        setBottomTalents(location.state.data.bottom_5_talents);
        setBottomTalentsDesc(location.state.data.bottom_talent_description);
        setJobs(location.state.data.job_recommendations);
      } catch (error) {
          console.error('Error:', error);
      }
    };
    fetchResult();
  }, [location]);

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
        <hr className="line-info" />
        <h1 className="title">
          Your{" "}
          <span className="text-info">Top 10 Talents</span>
        </h1>
        <div id="typography" style={{ display: 'flex', padding: '0px' }}>
        <Col md="5" xs="12">
        {topTalents.map((topTalent, i) => ( 
          <Row>
            <Col md="1" xs="12" className="text-center">
              {i+1 < 10 ? (
                <h5 className="text-on-back">0{i+1}</h5>
              ):
              <h5 className="text-on-back">{i+1}</h5>
              }
            </Col>
            <Col>
              <div className="typography-line">
                <h3 className="mt-2 ml-5" style={{textTransform: "capitalize"}}>
                  {topTalent.name}
                </h3>  
                <Button
                className="btn-simple btn-round ml-5 mt-2"
                color="success"
                style={{ pointerEvents:"none", alignSelf: "flex-start" }}
                >{`${(topTalent.Strength * 100).toFixed(0)}%`}
                </Button>
              </div>
              </Col>
          </Row>
        ))}
        </Col>
        <Col md="7" xs="12" >
                {/* Top Talent Bar Chart */}
                <div className="bar-charts-container" style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '800px', height: '840px' }}>
                  <Bar
                    data={{
                      labels: topTalents.map((data) => data.name),
                      datasets: [
                        {
                          label: "",
                          data: topTalents.map((data) => data.Strength),
                          backgroundColor: [
                            '#6A1B9A', '#9C27B0', '#CE93D8', '#F3E5F5', '#F8BBD0', '#FF80AB','#FF4081', '#C51162', '#880E4F', '#910B2B'
                          ],
                          borderRadius: 0,
                          barPercentage: 0.7
                        },
                      ],
                    }}
                    const options = {{
                      indexAxis:'y',
                      maintainAspectRatio: false, // Allows custom size
                      scales: {
                        x: {
                          grid: {
                            drawOnChartArea: false, // Disable grid lines on the x-axis
                          },
                          display: false
                        },
                        y: {
                          grid: {
                            drawOnChartArea: false, // Disable grid lines on the y-axis
                          },
                          display: false,
                          
                        },
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                    }}
                  />
                  </div>
                </div>
              </Col>
          </div>
          <Card>
            <h2 className="title ml-5">Summary</h2>
              <CardBody>
              <p className="mx-4 mb-4" style={{fontSize:"20px"}}>
              {formatTextWithLineBreaks(topTalentsDesc)}
            </p>
              </CardBody>     
          </Card>
    
        <div className="space-50" />
        
        <hr className="line-warning" />
        <h1 className="title">
          Your{" "}
          <span className="text-warning">Bottom 5 Talents</span>
        </h1>
        <div id="typography" style={{ display: 'flex', padding: '0px' }}>
        <Col md="5" xs="12">
        {bottomTalents.map((bottomTalent, i) => ( 
          <Row>
            <Col md="1" xs="12" className="text-center">
                <h5 className="text-on-back">0{i+1}</h5>
            </Col>
            <Col>
              <div className="typography-line">
                <h3 className="mt-2 ml-5" style={{textTransform: "capitalize"}}>
                  {bottomTalent.name}
                </h3>  
                <Button
                className="btn-simple btn-round ml-5 mt-2"
                color="danger"
                style={{ pointerEvents:"none", alignSelf: "flex-start" }}
                >{`${(bottomTalent.Strength * 100).toFixed(0)}%`}
                </Button>
              </div>
            </Col>
          </Row>
        ))}
        </Col>
        <Col md="7" xs="12" >
                {/* Bottom Talent Bar Chart */}
                <div className="bar-charts-container" style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '800px', height: '410px' }}>
                  <Bar
                    data={{
                      labels: bottomTalents.map((data) => data.name),
                      datasets: [
                        {
                          label: "",
                          data: bottomTalents.map((data) => data.Strength),
                          backgroundColor: [
                            '#6A1B9A', '#9C27B0', '#CE93D8', '#F3E5F5', '#F8BBD0', '#FF80AB','#FF4081', '#C51162', '#880E4F', '#910B2B'
                          ],
                          borderRadius: 0,
                          barPercentage: 0.7
                        },
                      ],
                    }}
                    const options = {{
                      indexAxis:'y',
                      maintainAspectRatio: false, // Allows custom size
                      scales: {
                        x: {
                          grid: {
                            drawOnChartArea: false, // Disable grid lines on the x-axis
                          },
                          display: false
                        },
                        y: {
                          grid: {
                            drawOnChartArea: false, // Disable grid lines on the y-axis
                          },
                          display: false,
                          
                        },
                      },
                      plugins: {
                        legend: {
                          display: false
                        }
                      },
                    }}
                  />
                  </div>
                </div>
              </Col>
        </div>
          <Card>
            <h2 className="title ml-5">Summary</h2>
              <CardBody>
              <p className="mx-4 mb-4" style={{fontSize:"20px"}}>
              {formatTextWithLineBreaks(bottomTalentsDesc)}
            </p>
              </CardBody>     
          </Card>

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
                          <h5 className="text-on-back ml-4 mt-2">0{i+1}</h5>
                          <h3 className="mt-4 ml-4">
                            {job.Job}
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
                          {formatTextWithLineBreaks(job.Tasks)}
                        </p>
                        <br></br>
                        <Badge color="success" className="ml-4">Work Styles</Badge>
                        <p className="ml-4" style={{ fontSize: '16px' }}>
                          {formatTextWithLineBreaks(job["Work Styles"])}
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

export default ResultPage;