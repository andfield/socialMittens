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

    //if action is UPDATE
    if(action.type === "UPDATE"){
        return {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following
        }
    }

    if(action.type === "UPDATEPICTURE"){
        return {
            ...state,
            profilePicture : action.payload
        }
    }

    //else return the original state.
    return state
}