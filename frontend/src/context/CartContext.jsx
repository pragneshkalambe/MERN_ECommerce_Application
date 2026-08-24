import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

export const CartContext = createContext();
function CartProvider({ children }) {
    const [cartItems, setcartItems] = useState(() => {
        let cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : []

    });


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems])

    //adding products to cart
    function AddToCart(items) {
        console.log("items : ", items);

        //check to prevent duplicate items adding to cart
        let productExist = cartItems.some(item => item._id === items._id);
        if (productExist) {
            toast.info("Quantity increased - (Max limit:5)");

            //loop through previuos items,find the specific cart and return updated object
            setcartItems(prev =>
                prev.map((item) => item._id === items._id ? {
                    ...item,
                    quantity: item.quantity < 5 ? item.quantity + 1 : item.quantity
                }
                    : item)
            );

            return;
        }
        else {
            items = {
                ...items,
                quantity: 1
            };
            setcartItems(prev => [...prev, items]);
            toast.success("product added to cart");

        }

    }

    function RemoveFromCart(id) {
        console.log("id in removefromcart: ", id);

        setcartItems(prevItems =>
            prevItems.filter(item => item._id !== id)
        );
        toast.error("product removed from cart");
    }

    //increase and decrese quantity
    function IncreaseQty(id) {

        const existingItem = cartItems.find(
            item => item._id === id
        );

        if (existingItem.quantity >= 5) {
            toast.error("Maximum quantity reached:5");
            return;
        }
        setcartItems(prev =>
            prev.map((item) => item._id === id ? {
                ...item,
                quantity: item.quantity < 5 ? item.quantity + 1 : item.quantity
            }
                : item
            )
        )
    };

    function DecreaseQty(id) {
        const existingItem = cartItems.find(
            item => item._id === id
        );
        if (existingItem.quantity <= 1){
            toast.error("Minimum quantity is 1");
        } 
        setcartItems(prev => prev.map((item) => item._id === id ?
            {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity
            }
            : item))
    };

    function ClearCart() {
        // localStorage.removeItem("cart");
        setcartItems([]);
    }
    console.log("cart items in context:",cartItems)

    let value = { cartItems, AddToCart, RemoveFromCart, IncreaseQty, DecreaseQty ,ClearCart};
    return (
        <>
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartProvider