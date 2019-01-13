export default (state, { type, payload }) => {
  switch (type) {
    case 'FETCH_API_USERS':
      return { ...state, users: payload }

    case 'FETCH_API_PROJECTS':
      return { ...state, projects: payload }

    case 'FETCH_API_ROLES':
      return { ...state, roles: payload }

    case 'CHANGE_VALUES_FORM':
      let newState = { ...state }
      const { user, project, value } = payload

      if (!newState['formDataValues'][user])
        newState['formDataValues'][user] = {}

      newState['formDataValues'][user][project] = value
      return newState

    default:
      return state
  }
}
