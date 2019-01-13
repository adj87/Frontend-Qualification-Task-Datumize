import axios from 'axios'
import { url } from '../config'

export const fetchUsers = users => ({
  type: 'FETCH_API_USERS',
  payload: axios(`${url}/users`)
})

export const fetchProjects = projects => ({
  type: 'FETCH_API_PROJECTS',
  payload: axios(`${url}/projects`)
})

export const fetchRoles = roles => ({
  type: 'FETCH_API_ROLES',
  payload: axios(`${url}/roles`)
})
