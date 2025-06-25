module.exports = (sequelize, DataTypse) =>{
  const Note = sequelize.define(
    "Note",{
      title:{
        type: DataTypse.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypse.STRING,
        defaultValue: "",
      },
      tag: {
        type: DataTypse.STRING,
        defaultValue: ""
      },

    },
    {tableName: "notes"}
  )
  return Note;
}

