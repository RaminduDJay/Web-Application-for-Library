import { useAuthContext } from "./useAuthContext";

export const useLogout=()=>{
    const {dispatch}=useAuthContext()

    const logout=()=>{
        //removing token from local storage
        localStorage.removeItem('user')

        //updating auth context
        dispatch({type:'LOGOUT'})

    }

    return {logout}
}