/**
 * Import dependencies
 */

import React from 'react'
import { Form, Col, Input, FormGroup, Label, Button, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers, fetchProjects, fetchRoles } from './actions'

import { url } from './config'

class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.data
    this.rolDefault = 'Viewer'
  }

  async componentDidMount() {
    //fetch all data
    this.props.fetchUsers()
    this.props.fetchProjects()
    this.props.fetchRoles()
    /*     const users = await fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(data => data)

    const roles = await fetch('http://localhost:3000/roles')
      .then(response => response.json())
      .then(data => data)

    const projects = await fetch('http://localhost:3000/projects')
      .then(response => response.json())
      .then(data => data)

    const relations = {}
    users.forEach(user => {
      relations[user.name] = {}
      projects.forEach(
        project => (relations[user.name][project.name] = this.rolDefault)
      )
    }) */

    //this.setState({ users, roles, projects, relations })
  }

  handleChange = e => {
    const selectedOption = e.target
    const user = selectedOption.name.split('-')[0]
    const project = selectedOption.name.split('-')[1]
    const value = selectedOption.value

    const newState = { ...this.state }
    newState['relations'][user][project] = value
    this.setState({ ...newState })
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.state.relations
    fetch('http://localhost:3000/relations', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
  }

  renderFormGroup = user => {
    const { projects, roles } = this.props.data
    return (
      <Col xs={12}>
        <h2>{user.name}</h2>
        {projects.map((project, index) => {
          //add some cool effects style
          const seconds = ((index + 1) / 10) * 2 + 's'
          const style = { animationDelay: seconds }

          return (
            <FormGroup className="fadeIn animated" style={style}>
              <Label for="exampleEmail">{project.name}</Label>
              <Input
                type="select"
                name={`${user.name}-${project.name}`}
                onChange={this.handleChange}
                defaultValue={this.rolDefault}
              >
                {roles.map((rol, index) => {
                  return (
                    <option key={index} value={rol.name}>
                      {rol.name}
                    </option>
                  )
                })}
                ) )}
              </Input>
            </FormGroup>
          )
        })}
        <div className="dropdown-divider mb-5 mt-5" />
      </Col>
    )
  }

  render() {
    const { users } = this.props.data
    return (
      <Form className="mt-4" onSubmit={this.handleSubmit}>
        <p className="text-muted font-italic">
          Please, for each user select a rol for each project
        </p>

        <Row>
          {users.length > 0 &&
            users.map(user => {
              return this.renderFormGroup(user)
            })}

          <Button color="primary" size="lg" block type="submit">
            Save
          </Button>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: {
      users: state.users,
      projects: state.projects,
      roles: state.roles,
      relations: state.relations
    }
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUsers: bindActionCreators(fetchUsers, dispatch),
  fetchProjects: bindActionCreators(fetchProjects, dispatch),
  fetchRoles: bindActionCreators(fetchRoles, dispatch)
})

const ConnectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyForm)

export default ConnectedForm
