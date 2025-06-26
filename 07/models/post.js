module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      fileName: {
        type: DataTypes.STRING,
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    },
    {
      tableName: "posts",
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };

  return Post;
};
