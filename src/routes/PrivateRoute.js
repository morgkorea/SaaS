import { Navigate, useLocation } from 'react-router-dom';
import { APICore } from '../helpers/api/apiCore';

type PrivateRouteProps = {
    component: React.ComponentType,
    roles?: string,
};

/**
 * Private Route forces the authorization before the route can be accessed
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: RouteComponent, roles, ...rest }: PrivateRouteProps) => {
    let location = useLocation();
    const api = new APICore();

    const loggedInUser = api.getLoggedInUser();

    /**
     * not logged in so redirect to login page with the return url
     */

    if (api.isUserAuthenticated() === false) {
        return <Navigate to={'/account/login2'} state={{ from: location }} replace />;
    }
    // <삭제금지>
    // // check if route is restricted by role
    // if (roles && roles.indexOf(loggedInUser?.role) === -1) {
    //     // role not authorised so redirect to home page
    //     // 관리자 / 매니저 권한 분기 가능 예정,
    //     return <Navigate to={{ pathname: '/' }} />;
    // }

    return <RouteComponent />;
};

export default PrivateRoute;
