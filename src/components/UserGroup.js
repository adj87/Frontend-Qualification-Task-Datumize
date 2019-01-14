/**
 * Import dependencies
 */
import React from 'react'
import { Col, Input, FormGroup, Label } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeValuesForm } from '../actions'

function UserGroup({ data, user, changeValuesForm }) {
  const { projects, roles, formDataValues } = data

  return (
    <Col xs={12}>
      <h2>{user.name}</h2>
      {projects.map((project, index) => {
        //add some cool effects style
        const seconds = ((index + 1) / 10) * 2 + 's'
        const style = { animationDelay: seconds }

        return (
          <FormGroup
            className="fadeIn animated"
            style={style}
            key={`fomrgroup-${index}`}
          >
            <Label for="exampleEmail">{project.name}</Label>
            <Input
              type="select"
              name={`${user.name}-${project.name}`}
              onChange={e => {
                const selectedOption = e.target
                const usuario = selectedOption.name.split('-')[0]
                const project = selectedOption.name.split('-')[1]
                const value = selectedOption.value
                changeValuesForm({ user: usuario, project, value })
              }}
              value={
                formDataValues[user.name]
                  ? formDataValues[user.name][project.name]
                  : '---'
              }
            >
              {roles.map((rol, index) => {
                return (
                  <option key={index} value={rol.name}>
                    {rol.name}
                  </option>
                )
              })}
              <option>---</option>) )}
            </Input>
          </FormGroup>
        )
      })}
      <div className="dropdown-divider mb-5 mt-5" />
    </Col>
  )
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
  changeValuesForm: bindActionCreators(changeValuesForm, dispatch)
})

const UserGroupConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGroup)

export default UserGroupConnected
