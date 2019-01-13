let initialState = {
  users: [],
  roles: [],
  projects: [],
  relations: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_API_USERS':
      return { ...state, users: payload }
      break
    case 'FETCH_API_PROJECTS':
      return { ...state, projects: payload }
      break
    case 'FETCH_API_ROLES':
      return { ...state, roles: payload }
      break

    default:
      return state
      break
  }
}
