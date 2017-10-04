var Sequelize = require('sequelize')
var db = new Sequelize('postgres://localhost:5432/trip-planner-spa', {
  logging: false
});

const Place = db.define('place', {
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.ARRAY(Sequelize.FLOAT),
        allowNull: false
    },
});

const Hotel = db.define('hotel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    num_stars: {
        type: Sequelize.FLOAT,
        validate: {min: 1, max: 5}
    },
    amenities: {
        type: Sequelize.STRING
    }
});

const Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age_range: {
        type: Sequelize.STRING
    }
})

const Restaurant = db.define('restaurant', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine : {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.INTEGER,
        validate: {min: 1, max: 5}
    }
})


Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);


module.exports = {
    Activity: Activity,
    Restaurant: Restaurant,
    Hotel: Hotel,
    Place: Place,
    db:db
}
