
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Post = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    coverImage: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export default Post;