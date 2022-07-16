const db = require("../models");
const Note = db.Note;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");


// Create and Save a new note

exports.create = async (req, res) => {
  const cookie = req.headers.cookie
    if(cookie){
        const token = cookie.split('=')[1]
        const decoded = jwt.decode(token, {complete: true})
        const payload = decoded.payload
        const email = payload.email

        if (!req.body.description) {
          res.status(400).send({
            message: "Content can't be empty"
          });
          return;
        }else{
          
          // Create a note
          const note = {
            title: req.body.title,
            description: req.body.description,
            userEmail: email
          };
    
          try {
            // Save note in the database
            const data = await Note.create(note)
            res.send({message:"Note added successfully!"})       
          } catch (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the user."
            });
          }
        }

    }else{
        res.send("Login first, or sign up if you haven't yet.")
    }
    
};

// Retrieve all notes from the database.
exports.findAll = async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  try {
    const data = await Note.findAll({ where: condition })
    res.send(data)
    
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    }) 
  }
};

// Find a single note with an id
exports.findOne = async (req, res) => {
  const id = req.params.id
  try {
    const data = await Note.findByPk(id)
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find note with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving note with id=" + id
    });
  }
};

// Update a note by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const num = await Note.update(req.body, {where: { id: id }})
  if(num==1){
    res.send({message: "Note was updated successfully."})
  }else{
    res.send({message: `Cannot update note with id=${id}. Maybe note was not found or req.body is empty!`})
  }
};

// Delete a note with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await Note.destroy({where: { id: id }})
    if(num==1){
      res.send({message: "Note was deleted successfully!"})
    }else{
      res.send({message: `Cannot delete note with id=${id}. Maybe note was not found!`})
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete note with id=" + id
    });
  }
};

// Delete all notes from the database.
exports.deleteAll = async (req, res) => {
  try {
    const nums = await Note.destroy({where: {},truncate: false})
    res.send({ message: `${nums} Notes were deleted successfully!` });
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all notes."
    });
  }
};

// Find all published notes by user

exports.findAllPublished = async (req, res) => {
  const cookie = req.headers.cookie
    if(cookie){
        const token = cookie.split('=')[1]
        const decoded = jwt.decode(token, {complete: true})
        const payload = decoded.payload
        const email = payload.email
        try {
          const data = await Note.findAll({ where: { userEmail: email } })
          res.send(data)
        } catch (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving notes."
          });
        }
    }else{
      res.send("Login first, or sign up if you haven't yet.")
    }
};
