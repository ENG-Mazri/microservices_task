module.exports = (noteDB,userDB, Sequelize) => {
    const Note = noteDB.define("notes", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
    return Note
};