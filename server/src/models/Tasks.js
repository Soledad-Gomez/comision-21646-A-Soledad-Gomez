import dataTypes from "sequelize/lib/data-types";
import { sequelize } from "../config/database.js";

export const TaskModel = sequelize.define('Task', {
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