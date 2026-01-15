 
import store from "../store/store.js";
 import { redirect } from "@tanstack/react-router";
 import { login } from "../store/slice/authSlice.js";
import { getCurrentUser } from "../api/user.api.js"

 export const checkAuths = async({context}) => {
    try {
        const {queryClient, store} = context
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser,
            retry: false,
        });
        if(!user) return false;

        store.dispatch(login(user));
        const {isAuthenticated} = store.getState().auth;
        if (! isAuthenticated) return false;
        return true;
    } catch (error) {
        return  redirect({to: '/auth',});
    }
    

    
 };