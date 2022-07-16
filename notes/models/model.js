module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("notes", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      userEmail: {
        type: Sequelize.STRING
      }

    });
    return Note
};