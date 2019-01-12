/**
 * Import dependencies
 */
import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import MyForm from './MyForm'

/**
 * Import styles
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center pt-5 ">
          <Col lg="6" md="10" sm="8" className="form-layout">
            <MyForm />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
