import {Navigate} from "react-router-dom";

function AdminRoute({children}) {
    //get customer data from localstorage,if not found navigate to /admin/login ,if customer role is not admin redirect to / and return children

    let customer = JSON.parse(localStorage.getItem("customer"));
    if (!customer) {
        return <Navigate to="/admin/login"/>
    };
    if (customer.role !== "admin") {
        return <Navigate to="/"/>
    }
    return children;
}

export default AdminRoute;