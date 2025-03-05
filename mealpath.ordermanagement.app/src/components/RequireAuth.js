import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

const RequireAuth = ({ allowedRoles }) => {
    const {userStore} = useStore();
    //const { auth } = useAuth();
    //const location = useLocation();

    if(userStore.isLoggedIn){
    const userRoles = userStore.getCurrentUserRoles(userStore.user);
      return (
        userRoles.find(role => allowedRoles.includes(role))
        ? <Outlet />
        : <Navigate to='/unauthorized' />
      
      );
    }
    else{
      return (
        <Navigate to="/login" />
      );
    }
}

export default observer(RequireAuth);
