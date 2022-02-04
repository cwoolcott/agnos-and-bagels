const { gql } = require('apollo-server-express');

const typeDefs = gql`
    #Pretty Cool COmments!
    type Cars {
        id: ID
        make: String
        model: String
        sold: Boolean
    }

    #Query
    type Query {
        allCars: [Cars],
        getCarById(id:ID!): Cars
        getSoldCars(sold:Boolean!): [Cars]
    }

    #Mutation
    type Mutation {
        addCar(id: Int!, make: String!, model: String!, price: Int!, image: String!, sold: Boolean! ): Cars
    }
`;

module.exports = typeDefs;

