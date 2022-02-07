const db = require('../config/connection');
const { MenuItems, School, Class, Professor, Order, TaxCategory } = require('../models');

const schoolData = require('./schoolData.json');
const classData = require('./classData.json');
const professorData = require('./professorData.json');
const menuItemsData = require('./menuItemsData.json');
const orderData = require('./orderData.json');
const taxCategoryData = require('./taxCategoryData.json');

db.once('open', async () => {
  // clean database
  await MenuItems.deleteMany({});
  await School.deleteMany({});
  await Class.deleteMany({});
  await Professor.deleteMany({});
  await Order.deleteMany({});
  await TaxCategory.deleteMany({});

  // bulk create each model
  const schools = await School.insertMany(schoolData);
  const classes = await Class.insertMany(classData);
  const professors = await Professor.insertMany(professorData);
  const menuItems = await MenuItems.insertMany(menuItemsData);
  const orders = await Order.insertMany(orderData);
  const taxCategories = await TaxCategory.insertMany(taxCategoryData);

  //assign TaxCodes
  for (item of menuItems) {

    for (taxCode of taxCategories) {
      if (taxCode.type == item.taxType) {
        item.taxCategory = taxCode._id;
      }
    }
    await item.save();
  }

  for (newOrder of orders) {

    //Add two random Items to orders
    const tempMenuItemOne = menuItems[Math.floor(Math.random() * menuItems.length)];
    const tempMenuItemTwo = menuItems[Math.floor(Math.random() * menuItems.length)];

    newOrder.menuItems.push(tempMenuItemOne._id, tempMenuItemTwo._id);
    await newOrder.save();
  }

  for (newClass of classes) {

    // randomly add each class to a school
    const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    tempSchool.classes.push(newClass._id);
    await tempSchool.save();

    // randomly add a professor to each class
    const tempProfessor = professors[Math.floor(Math.random() * professors.length)];
    newClass.professor = tempProfessor._id;
    await newClass.save();

    // reference class on professor model, too
    tempProfessor.classes.push(newClass._id);
    await tempProfessor.save();
  }

  console.log('all done!');
  process.exit(0);
});
