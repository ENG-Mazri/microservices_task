const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = db.User;
const Op = db.Sequelize.Op;
const {isValidUser} = require('./utils.js')

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.description) {
        res.status(400).send({
          message: "Content can't be empty"
        });
        return;
      }else{
        // Create a note
        const note = {
          title: req.body.title,
          description: req.body.description
        };
  
        try {
            // Save note in the database
            const data = await User.create(note)
            res.send({message:"Note added successfully!"})        
        } catch (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
        }

      }
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  const email = req.query.email;
  const condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
  try {
    const data = await User.findAll({ where: condition })
    res.send(data)
    
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    }) 
  }
};

// Find a single user with an id
exports.findOne = async (req, res) => {
  const id = req.params.id
  try {
    const data = await User.findByPk(id)
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find user with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving user with id=" + id
    });
  }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const num = await User.update(req.body, {where: { id: id }})
  if(num==1){
    res.send({message: "User was updated successfully."})
  }else{
    res.send({message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`})
  }
};

// Delete a user with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await User.destroy({where: { id: id }})
    if(num==1){
      res.send({message: "User was deleted successfully!"})
    }else{
      res.send({message: `Cannot delete user with id=${id}. Maybe user was not found!`})
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete user with id=" + id
    });
  }
};

// Delete all users from the database.
exports.deleteAll = async (req, res) => {
  try {
    const nums = await User.destroy({where: {},truncate: false})
    res.send({ message: `${nums} Users were deleted successfully!` });
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all users."
    });
  }
};
