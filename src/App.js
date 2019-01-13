/**
 * Import dependencies
 */
import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import MyForm from './components/MyForm'

/**
 * Import styles
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.min.css'
import './index.css'

/**
 * REDUX
 */
import { store } from './store'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Row className="justify-content-center pt-5 pb-5 animated fadeIn">
            <Col lg="6" md="10" sm="8" className="form-layout">
              <MyForm />
            </Col>
          </Row>
        </Container>
      </Provider>
    )
  }
}

export default App
