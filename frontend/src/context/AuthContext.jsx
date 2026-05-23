import { useState, createContext, useContext } from 'react';
// import { CartContext } from './CartContext.jsx';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {

    const [token, settoken] = useState(localStorage.getItem("token"));
    // const {ClearCart} = useContext(CartContext);
    const [customer, setcustomer] = useState(() => {
        const savedCustomer =
            localStorage.getItem("customer");

        return savedCustomer
            ? JSON.parse(savedCustomer)
            : null;
    });

    const login = (token, customer) => {
        //save token ,update token state and save customer globally
        localStorage.setItem("token", token);

        localStorage.setItem(
            "customer",
            JSON.stringify(customer)
        );

        settoken(token);
        setcustomer(customer);
    };

const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    localStorage.removeItem("cart");

    settoken(null);
    setcustomer(null);

    // ClearCart();
};
    const isAuthenticated = !!token;

    let value = { token, customer, login, logout, isAuthenticated };

    return (
        <>
            <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

        </>
    )
}

export default AuthContextProvider