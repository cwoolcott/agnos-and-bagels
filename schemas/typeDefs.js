const { gql } = require('apollo-server-express');

const typeDefs = gql`

type MenuItems {
    _id: ID
    name: String!
    description: String
    price: Float
    taxCategory: TaxCategory
    promotion: String
  }

  type Order {
    _id: ID
    email: String
    createdAt: Float
    orderReadyTime: Float
    menuItems: [MenuItems]
    subTotal: Float
    discount: Float
    taxes: Float
    total: Float
    notification: Boolean
  }

  type TaxCategory {
    _id: ID
    description: String
    taxRate: Float
  }
  
  type School {
    _id: ID
    name: String
    location: String
    studentCount: Int
    classes: [Class]
  }

  type Class {
    _id: ID
    name: String
    building: String
    creditHours: Int
    professor: Professor
  }

  type Professor {
    _id: ID
    name: String
    officeHours: String
    officeLocation: String
    studentScore: Float
    classes: [Class]
  }

  type Query {
    orderById(id: ID!): Order
    orderByEmail(email: String!): Order
    menuItems: [MenuItems]
    allOrders: [Order]
    schools: [School]
    classes: [Class]
    professors: [Professor]
    class(id: ID!): Class
  }

  type Mutation {
    addOrder(email: String!, menuItems: [String]!): Order
    deleteOrder(id: ID!) : Order
    addSchool(name: String!, location: String!, studentCount: Int!): School
    updateClass(id: ID!, building: String!): Class
    deleteClass(id: ID!) : Class
  }
`;

module.exports = typeDefs;
