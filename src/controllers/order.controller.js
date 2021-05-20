import Order from '../models/order.model';
import OrderModel from '../models/order.model'

const addOrderItems = async (req, res) => {
   const { orderItems, shippingAddress, totalPrice } = req.body
   if (orderItems.length === 0) {
      res.status(400).send('Your Cart is Empty')
   } else {
      const order = new Order({
         userIde: req.user._id,
         orderItems,
         shippingAddress,
         totalPrice
      });
      const createdOrder = await order.save();
      res.status(201).send(createdOrder)
   };
};

module.exports = addOrderItems
