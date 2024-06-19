/*!
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)
* Coded by Creative Tim

=========================================================
*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Form,
  Input,
  Modal,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AssessmentPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [miniModal, setMiniModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [assessmentAnswer, setAssessmentAnswer] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (!assessmentAnswer.trim()) {
      newErrors.assessmentAnswer = "Answer cannot be empty";
    } else if (assessmentAnswer.length !== 180){
      newErrors.assessmentAnswer = "Please input the valid answer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setMiniModal(true);
    } else {
      console.log('Form validation failed');
    } 
  };

  const confirmSubmit = async (e) => {
    setMiniModal(false);
    setIsLoading(true);
    console.log(name);
    console.log(assessmentAnswer);

    try {

        const response = await axios.post('http://103.190.215.154:8000/api/', {
          name,
          string: assessmentAnswer
        });
        console.log("Assessment submitted successfully:", response.data);
        navigate('/result', { state: { data: response.data } });
    } catch (error) {
        console.error('Error:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
            <Card className="card-register">
                    <h1 className="text-center mt-5">Fill the Assessment</h1>
                    <Form className="form" onSubmit={(e) => onSubmit(e)}>
                    <CardBody>
                      
                          <Col>
                          <p className="category">Name</p>
                          <Input 
                            placeholder="Insert your name" 
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                            <span className="mt-0.5 text-danger text-xs">
                                {errors.name}
                            </span>
                            )}
                          <br></br>
                          <br></br>
                          <p className="category">Answers</p>
                          <Input
                            placeholder="Insert the assessment answers"
                            type="textarea"
                            style={{ paddingLeft: '10px' }}
                            onChange={(e) => setAssessmentAnswer(e.target.value)}
                          />
                          {errors.assessmentAnswer && (
                            <span className="mt-0.5 text-danger text-xs">
                                {errors.assessmentAnswer}
                            </span>
                          )}
                          </Col>


                        <Modal
                          modalClassName="modal-mini modal-primary modal-mini"
                          isOpen={miniModal}
                          toggle={() => setMiniModal(false)}
                        >
                          <div className="modal-body">
                            <p>Are you sure you want to submit assessment?</p>
                          </div>
                          <div className="modal-footer">
                            <Button className="btn-neutral" color="link" type="button" onClick={() => setMiniModal(false)}>
                              Cancel
                            </Button>
                            <Button
                              className="btn-neutral"
                              color="link"
                              onClick={confirmSubmit}
                              type="button"
                            >
                              Submit
                            </Button>
                          </div>
                        </Modal>
                      
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button color="default" className="mr-4" onClick={() => navigate(-1)}
                        disabled={isLoading}>Back</Button>
                      <Button color="primary" type="submit" disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Submit'}</Button>
                    </CardFooter>
                    </Form>
                  </Card>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>

            
          </div>
        </div>
      </div>
    </>
  );
}
