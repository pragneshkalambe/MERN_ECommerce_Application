import product from '../models/Product.js';
import order from '../models/Order.js';


export const getDashboardStats = async (req, res) => {
    try {
        //get totalProducts,orders and revenue data 

        let totalProducts = await product.countDocuments();

        let totalOrders = await order.countDocuments();

        let revenueData = await order.find();

        let totalRevenue =
            revenueData.reduce(
                (acc, order) =>
                    acc + order.totalAmount,
                0
            );

        res.status(200).json({
            totalProducts,
            totalOrders,
            totalRevenue
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}