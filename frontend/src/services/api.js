//Api calls for data fetching
export const getProducts = async (category) => {
    try {

        if (category) {
            let response = await fetch(`https://mern-ecommerce-application-t0c8.onrender.com/api/products?category=${category}`);
            return response.json();
        }
        else {

            let response = await fetch("https://mern-ecommerce-application-t0c8.onrender.com/api/products/")
            return response.json();
        }
    } catch (error) {
        console.log("error in getProducts api : ", error.message);
        return error.message;
    }

};

export const getProduct = async (id) => {
    try {
        let response = await fetch(`https://mern-ecommerce-application-t0c8.onrender.com/api/products/${id}`)
        console.log("in getProduct api : ", response);
        return response.json();
    } catch (error) {
        console.log("error in getProducts api : ", error.message);
        return error.message;
    }

};

export const updateProduct = async (
    id,
    formData
) => {

    try {

        const response = await fetch(
            `https://mern-ecommerce-application-t0c8.onrender.com/api/products/${id}`,
            {
                method: "PUT",
                body: formData
            }
        );

        const data =
            await response.json();

        console.log(
            "updated product:",
            data
        );

        return data;

    } catch (error) {

        console.log(
            "error updating product:",
            error.message
        );

    }

};

export const searchByName = async (name) => {
    try {
        let response = await fetch(`https://mern-ecommerce-application-t0c8.onrender.com/api/products/search?name=${name}`);
        let data = await response.json();
        console.log("in api :", data);
        return data;
    } catch (error) {
        console.log("error updating product : ", error.message);
    }
};

export const deleteProduct = async (id) => {

    const response = await fetch(
        `https://mern-ecommerce-application-t0c8.onrender.com/api/products/${id}`,
        {
            method: "DELETE"
        }
    );

    return response.json();
};

export const signupCustomer = async (custData) => {
    try {
        const response = await fetch(`https://mern-ecommerce-application-t0c8.onrender.com/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(custData)
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("signup api error:", error.message);
    }
}


export const loginCustomer = async (custData) => {
    try {
        const response = await fetch(`https://mern-ecommerce-application-t0c8.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(custData)
        })
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("signup api error:", error.message);
    }
}

export const createOrder = async (orderData) => {
   try {
    let response = await fetch("https://mern-ecommerce-application-t0c8.onrender.com/api/orders",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(orderData)
    });
    return response.json();
   } catch (error) {
     console.log(
            "create order api error :",
            error.message
        );
   }
}

export const getCustomerOrders = async (customerId) => {
    try {

        const response = await fetch(
            `https://mern-ecommerce-application-t0c8.onrender.com/api/orders/${customerId}`
        );

        return response.json();

    } catch (error) {

        console.log(
            "error fetching orders:",
            error.message
        );

    }
};

export const getDashboardStats = async () => {

        const response =
            await fetch(
                "https://mern-ecommerce-application-t0c8.onrender.com/api/admin/stats"
            );

        return response.json();
};

export const createProduct = async (formData) => {

    try {

        const response = await fetch(
            "https://mern-ecommerce-application-t0c8.onrender.com/api/products",
            {
                method: "POST",
                body: formData
            }
        );

        return await response.json();

    } catch (error) {

        console.log(
            "error creating product:",
            error.message
        );
    }
};