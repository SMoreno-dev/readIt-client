export const setCurrentUser = (user) =>({
    type: 'SET_USER',
    payload: user
})

export const setId = (id) => ({
    type: 'SET_ID',
    payload: id
})

export const logIn = () => ({
    type: 'LOG_IN'
})

export const logOut = () => ({
    type: 'LOG_OUT'
})

export const setText = (text) => ({
    type: 'SET_TEXT',
    payload: text
})