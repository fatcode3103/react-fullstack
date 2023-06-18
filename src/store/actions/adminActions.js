import actionTypes from "./actionTypes";
import { getAllCodeApi, createNewUserApi, getAllUsersApi, deleteUserApi, editUserApi } from "../../services/userService"; 
import { toast } from "react-toastify";


//fetch gender
export const fecthGenderStart = () => {
    return async (dispatch) => {
        dispatch({type: actionTypes.FETCH_GENDER_START})
        try{
            let res = await getAllCodeApi("GENDER")
            if(res && res.status === 200){
                dispatch(fecthGenderSuccess(res.data.data))
            }else{ 
                dispatch(fecthGenderFailed())
            }
        }catch(e){
            console.log("Fecth Gender Start Error: ", e)
            dispatch(fecthGenderFailed())
        }
    }
}

export const fecthGenderSuccess = (genderData) => {
    return {
        type: actionTypes.FETCH_GENDER_SUCCESS,
        payload: genderData,
    }
}

export const fecthGenderFailed = () => {
    return {
        type: actionTypes.FETCH_GENDER_FAILED,
    }
}

// fetch position
export const fetchPositionStart = () => {
    return async (dispatch) => {
        dispatch({type: actionTypes.FETCH_POSITION_START})
        try{
            let res = await getAllCodeApi("POSITION")
            if(res && res.status === 200){
                dispatch(fetchPositionSuccess(res.data.data))
            }else{ 
                dispatch(fetchPositionFailed())
            }
        }catch(e){
            console.log("Fecth Position Start Error: ", e)
            dispatch(fetchPositionFailed())
        }
    }
}

export const fetchPositionSuccess = (positionData) => {
    return {
        type: actionTypes.FETCH_POSITION_SUCCESS,
        payload: positionData,
    }
}

export const fetchPositionFailed = () => {
    return {
        type: actionTypes.FETCH_POSITION_FAILED,
    }
}

// fetch role
export const fetchRoleStart = () => {
    return async (dispatch) => {
        dispatch({type: actionTypes.FETCH_ROLE_START})
        try{
            let res = await getAllCodeApi("ROLE")
            if(res && res.status === 200){
                dispatch(fetchRoleSuccess(res.data.data))
            }else{ 
                dispatch(fetchRoleFailed())
            }
        }catch(e){
            console.log("Fecth Role Start Error: ", e)
            dispatch(fetchRoleFailed())
        }
    }
}

export const fetchRoleSuccess = (roleData) => {
    return {
        type: actionTypes.FETCH_ROLE_SUCCESS,
        payload: roleData,
    }
}

export const fetchRoleFailed = () => {
    return {
        type: actionTypes.FETCH_ROLE_FAILED,
    }
}

// save user

export const saveUserStart = (data) => {
    return async (dispatch) => {
        dispatch({type: actionTypes.SAVE_USER_START})
        try{
            let res = await createNewUserApi(data)
            if(res && res.status === 200){
                toast.success('Save user successfully !')
                dispatch(saveUserSuccess())
            }else{ 
                toast.error('Save user failed !')
                dispatch(saveUserFailed())
            }
        }catch(e){
            console.log("Save User Failed Error: ", e)
            toast.error('Save user failed !')
            dispatch(saveUserFailed())
        }
    }
}

export const saveUserSuccess = () => {
    return {
        type: actionTypes.SAVE_USER_SUCCESS,
    }
}

export const saveUserFailed = () => {
    return {
        type: actionTypes.SAVE_USER_FAILED,
    }
}

//get all user

export const fetchAllUserStart = (id) => {
    return async (dispatch) => {
        dispatch({type: actionTypes.FETCH_ALL_USER_START})
        try{
            let res = await getAllUsersApi(id)
            if(res && res.status === 200){
                dispatch(fetchAllUserSuccess(res.data.users.reverse()))
            }else{ 
                dispatch(fetchAllUserFailed())
            }
        }catch(e){
            console.log("Fetch All User Error: ", e)
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ALL_USER_SUCCESS,
        payload: data,
    }
}

export const fetchAllUserFailed = () => {
    return {
        type: actionTypes.FETCH_ALL_USER_FAILED,
    }
}

//delete user

export const deleteUserStart = (userId) => {
    return async(dispatch) => {
        dispatch({type: actionTypes.DELETE_USER_START})
        try{
            let res = await deleteUserApi(userId)
            console.log("check res delete: >>>", res)
            if(res && res.status === 200){
                dispatch(deleteUserSuccess())
                toast.success("Delete user successfully !")
            }else{
                dispatch(deleteUserFailed())
            }
        }catch(e){
            console.log("Delete User Failed Error: ", e)
            dispatch()//
        }
    }
}

export const deleteUserSuccess = () => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS
    }
}

export const deleteUserFailed = () => {
    return {
        type: actionTypes.DELETE_USER_FAILED
    }
}

// update user

export const updateUserStart = (userEdit) => {
    return async(dispatch) => {
        dispatch({type: actionTypes.UPDATE_USER_START})
        try{
            let res = editUserApi(userEdit)
            if(res && res.status === 200){
                dispatch(updateUserSuccess())
            }else{
                dispatch(updateUserFailed())
            }
        }catch(e){
            console.log(e)
            dispatch(updateUserFailed())
        }
    }
}

export const updateUserSuccess = () => {
    return {
        type: actionTypes.UPDATE_USER_SUCCESS,
    }
}

export const updateUserFailed = () => {
    return {
        type: actionTypes.UPDATE_USER_FAILED
    }
}