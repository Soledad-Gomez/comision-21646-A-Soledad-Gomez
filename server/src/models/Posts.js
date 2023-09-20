import dataTypes from "sequelize";
import { sequelize } from "../config/database.js";

export const PostModel = sequelize.define('Post', {
    titulo: {
        type: dataTypes.STRING,
        allowNull: true
    },
    contenido: {
        type: dataTypes.STRING,
        allowNulld: false
    },
    enlace: {
        type: dataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
})