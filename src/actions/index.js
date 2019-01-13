import axios from 'axios'
import { url } from '../config'

export const fetchUsers = users => {
  return dispatch => {
    axios.get(`${url}/users`).then(users => {
      dispatch({
        type: 'FETCH_API_USERS',
        payload: users.data
      })
    })
  }
}

export const fetchProjects = projects => {
  return dispatch => {
    axios.get(`${url}/projects`).then(projects => {
      dispatch({
        type: 'FETCH_API_PROJECTS',
        payload: projects.data
      })
    })
  }
}

export const fetchRoles = roles => {
  return dispatch => {
    axios.get(`${url}/roles`).then(roles => {
      dispatch({
        type: 'FETCH_API_ROLES',
        payload: roles.data
      })
    })
  }
}

export function changeValuesForm(payload) {
  return {
    type: 'CHANGE_VALUES_FORM',
    payload: payload
  }
}
