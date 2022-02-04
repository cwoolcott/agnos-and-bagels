const { carsForSale } = require('../data/cars.js');

const resolvers = {
    Query: {
        allCars: () => {
            return carsForSale;
        },
        getCarById: (parent, args) => {
            const car = carsForSale.find(({ id }) => id == args.id);
            return car;
        },
        getSoldCars: (parent, args) => {
            const cars = carsForSale.filter(({ sold }) => sold == args.sold)
        }
    },
    Mutation: {
        addCar: (parent, args) => {
            const newCar = args;
            carsForSale.push(newCar);
            return newCar;
        }
    }
}

module.exports = resolvers;