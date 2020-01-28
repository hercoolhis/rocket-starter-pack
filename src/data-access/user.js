const mongoose = require("mongoose"),
User = require("../models/user");


const createUser = async (payload) => {
    let createdUser = await User.create(payload);

    return createdUser;
}

const findUser = async (query) => {
    let requestedUser = await User.find(query);

    return requestedUser;
}

module.exports = {
    createUser,
    findUser
}
