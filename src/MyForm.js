/**
 * Import dependencies
 */

import React from 'react'
import { Form, Col, Input, FormGroup, Label, Button, Row } from 'reactstrap'
//import { PropTypes } from 'prop-types'

class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      roles: [],
      projects: []
    }
  }

  async componentDidMount() {
    //fetch all data
    const users = await fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => data)

    const roles = await fetch('http://localhost:3000/roles')
      .then(response => response.json())
      .then(data => data)

    const projects = await fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => data)

    this.setState({ users, roles, projects })
  }

  handleChange = e => {
    console.log(JSON.stringify(this.state))
  }

  //check whether form is valid or not
  /*     const { passwordValid, userNameValid } = this.state

    if ((passwordValid, userNameValid)) {
      this.setState({ formValid: true })
    }
  } */

  /*   handleSubmit = e => {
    e.preventDefault()
    this.setState({ submittedBefore: true })
  } */
  renderFormGroup = user => {
    const { projects, roles } = this.state
    return (
      <Col xs={12}>
        <h2>{user.name}</h2>
        {projects.map(project => {
          return (
            <FormGroup>
              <Label for="exampleEmail">{project.name}</Label>
              <Input
                type="select"
                name={`${user.name}-${project.name}`}
                onChange={() => this.handleChange}
              >
                {roles.map((rol, index) => (
                  <option key={index} value={rol.name}>
                    {rol.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          )
        })}
        <div class="dropdown-divider mb-5 mt-5" />
      </Col>
    )
  }

  render() {
    const { users } = this.state
    return (
      <Form className="mt-4">
        <p class="text-muted font-italic">
          Please, for each user select a rol for each project
        </p>
        <Row>
          {users.length > 0 &&
            users.map(user => {
              return this.renderFormGroup(user)
            })}

          <Button color="primary" size="lg" block>
            Save
          </Button>
        </Row>
      </Form>
    )
  }
}

/* const mapStateToProps = (state, ownProps) => {
  return {
    error: state.signIn.error,
    fetching: state.signIn.fetching,
    success: state.signIn.success
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // goToAccount:  () => dispatch(push('/account')),
    // goToRegister: () => dispatch(push('/register')),
    signIn: fields => dispatch(SignInActions.request(fields))
  }
} */

/* const ConnectedSignInForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm) */

export default MyForm
