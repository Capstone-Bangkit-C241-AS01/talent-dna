/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  Modal,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useNavigate, useHistory } from "react-router-dom";
import axios from 'axios';

export default function AssessmentPage() {
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [fullNameFocus, setFullNameFocus] = React.useState(false);
  const [miniModal, setMiniModal] = React.useState(false);
  const [assessmentAnswer, setAssessmentAnswer] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);
    // Specify how to clean up after this effect:
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

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!eventName.trim()) {
  //     newErrors.event_name = "Event Name cannot be empty";
  //   }

  //   if (!description.trim()) {
  //     newErrors.description = "Event Description cannot be empty";
  //   }

  //   if (!location.trim()) {
  //     newErrors.event_location = "Event location cannot be empty";
  //   }

  //   if (endDate < startDate) {
  //     newErrors.date = "End Date must be greater than Start Date";
  // }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    setMiniModal(true);
  };

  const confirmSubmit = async (e) => {
    setMiniModal(false);

    // TODO : PANGGIL API POST UNTUK SUBMIT ASSESSMENT
    // navigate("/result");

    try {

        const response = await axios.post('103.190.215.154/api', assessmentAnswer);
        // history.push('/result', { response: response.data })

    } catch (error) {
        console.error('Error:', error);
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
                      
                        <InputGroup
                          className={classnames({
                            "input-group-focus": fullNameFocus,
                          })}
                        >
                          <Col>
                          <p className="category">Name</p>
                          <Input defaultValue="" placeholder="Insert your name" type="text" />
                          <br></br>
                          <p className="category">Answers</p>
                          <Input
                            placeholder="Insert the assessment answers"
                            type="textarea"
                          />
                          </Col>
                        </InputGroup>
                        


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
                      <Button color="default" className="mr-4" onClick={() => navigate(-1)}>Back</Button>
                      <Button color="primary" type="submit">Submit</Button>
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
