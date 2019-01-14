/**
 * Import dependencies
 */

import React from 'react'
import { Form, Button, Row } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers, fetchProjects, fetchRoles } from '../actions'
import UserGroup from './UserGroup'

import { counterInputsFilled, url } from '../helpers'

class MyForm extends React.Component {
  //Since the data is stored in redux state there is no need to create an internal state nor a constructor

  componentWillMount() {
    this.props.fetchUsers()
    this.props.fetchProjects()
    this.props.fetchRoles()
  }

  handleSubmit = e => {
    e.preventDefault()
    const data = this.props.data.formDataValues
    fetch(`${url}/relations`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch(error => console.log('Error:', error))
      .then(response => console.log('Success:', JSON.stringify(response)))
  }

  render() {
    const { users, projects, roles, formDataValues } = this.props.data
    const amountOfInputs = projects.length * roles.length
    const amountOfInputsFilled = counterInputsFilled(formDataValues)
    const isDisabled = !(amountOfInputs === amountOfInputsFilled)

    if (users.length > 0 && projects.length > 0 && roles.length > 0) {
      return (
        <Form className="mt-4" onSubmit={this.handleSubmit}>
          <p className="text-muted font-italic">
            Please, for each user select a <b>rol</b> for each <b>project</b>
          </p>

          <Row>
            {users.map((user, index) => {
              return <UserGroup user={user} key={`user-${index}`} />
            })}

            <Button
              color="primary"
              size="lg"
              block
              type="submit"
              disabled={isDisabled}
            >
              Submit
            </Button>
          </Row>
        </Form>
      )
    } else {
      return <div>Cargando</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    data: {
      users: state.users,
      projects: state.projects,
      roles: state.roles,
      formDataValues: state.formDataValues
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
