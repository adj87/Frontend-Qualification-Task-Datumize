/**
 * Import dependencies
 */

import React from 'react'
import { Form, Button, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers, fetchProjects, fetchRoles } from '../actions'
import UserGroup from './UserGroup'

class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.rolDefault = 'Viewer'
  }

  componentWillMount() {
    this.props.fetchUsers()
    this.props.fetchProjects()
    this.props.fetchRoles()

    //fetch all data
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
  /*   shouldComponentUpdate(newProps) {
    const usersLength = newProps.data.users.length

    //if users data are loaded then re-render the component
    if (usersLength > 0) {
      return true
    } else {
      return false
    }
  } */

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

  render() {
    const { users } = this.props.data
    console.log(users.length)

    if (users.length > 0) {
      return (
        <Form className="mt-4" onSubmit={this.handleSubmit}>
          <p className="text-muted font-italic">
            Please, for each user select a rol for each project
          </p>

          <Row>
            {users.map((user, index) => {
              return <UserGroup user={user} key={`user-${index}`} />
            })}

            <Button color="primary" size="lg" block type="submit">
              Save
            </Button>
          </Row>
        </Form>
      )
    } else {
      return null
    }
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
