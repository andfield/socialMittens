//Create an initial state for app which is empty
export const initialState=null


//create a reducer with current state and actions
export const reducer = (state, action) => {

    //if action is USER then return the changed state (action.payload)
    if(action.type === "USER"){
        return action.payload
    }
    if(action.type === "LOGOUT"){
        return null
    }
    //else return the original state.
    return state
}