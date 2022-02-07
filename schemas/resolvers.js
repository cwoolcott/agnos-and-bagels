const { School, Class, Professor, MenuItems, Order, TaxCategory } = require('../models');
const utils = require('../utils');


const resolvers = {
  Query: {
    allOrders: async () => {
      let orders = Order.find({}).populate('menuItems').populate({
        path: 'menuItems',
        populate: 'taxCategory'
      })

      for (let i = 0; i < orders.length; i++) {
        const { discount, subTotal, taxes, total } = utils.makeTotal(orders[i]);
        order[i].subTotal = subTotal;
        order[i].taxes = taxes;
        order[i].total = total;
        order[i].discount = discount;
      }

      return orders

    },
    orderById: async (parent, { id }) => {
      let orderSummary = await Order.findById(id).populate('menuItems').populate({
        path: 'menuItems',
        populate: 'taxCategory'
      })

      //Use Util to Calc Subtotal
      const { discount, subTotal, taxes, total } = utils.makeTotal(orderSummary);

      //For Return 
      orderSummary.subTotal = subTotal;
      orderSummary.taxes = taxes;
      orderSummary.total = total;
      orderSummary.discount = discount;

      return orderSummary;
    },

    orderByEmail: async (parent, { email }) => {
      let orderSummary = await Order.findOne({ email: email }).populate('menuItems').populate({
        path: 'menuItems',
        populate: 'taxCategory'
      })

      //Use Util to Calc Subtotal
      const { discount, subTotal, taxes, total } = utils.makeTotal(orderSummary);

      //For Return 
      orderSummary.subTotal = subTotal;
      orderSummary.taxes = taxes;
      orderSummary.total = total;
      orderSummary.discount = discount;

      return orderSummary;
    },
    menuItems: async () => {
      return await MenuItems.find({}).populate('taxCategory')
    },
    schools: async () => {
      return await School.find({}).populate('classes').populate({
        path: 'classes',
        populate: 'professor'
      });
    },

  },
  Mutation: {
    addOrder: async (parent, { email, menuItems }) => {
      let newOrder = await Order.create({ email, menuItems });

      // Do Tax Calucations
      let orderSummary = await Order.findById(newOrder.id).populate('menuItems').populate({
        path: 'menuItems',
        populate: 'taxCategory'
      })

      //Use Util to Calc Subtotal
      const { discount, subTotal, taxes, total } = utils.makeTotal(orderSummary);

      //For Model 
      newOrder.subTotal = subTotal;
      newOrder.taxes = taxes;
      newOrder.total = total;
      newOrder.discount = discount;

      //For Return 
      orderSummary.subTotal = subTotal;
      orderSummary.taxes = taxes;
      orderSummary.total = total;
      orderSummary.discount = discount;

      await newOrder.save();

      return orderSummary;
    },
    deleteOrder: async (parent, { id }) => {
      return await Order.remove(
        { _id: id }
      )
    },

    addSchool: async (parent, { name, location, studentCount }) => {
      return await School.create({ name, location, studentCount });
    },
    updateClass: async (parent, { id, building }) => {
      return await Class.findOneAndUpdate(
        { _id: id },
        { building },
        { new: true });
    },
    deleteClass: async (parent, { id }) => {
      return await Class.remove(
        { _id: id }
      )
    }
  }
}

module.exports = resolvers;
