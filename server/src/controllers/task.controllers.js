import { TaskModel } from "../models/Tasks.js"

//controlador para crear las vista
export const ctrlView = async (req, res) => {
    try {
        const tasks = await TaskModel.findAll();
        res.render("index.ejs", {tasks})
console.log("ctrlview")
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        })
        
    }
}


//controlador para  traer todas las publicaciones
export const ctrlGetTask = async (req, res) => {
    try {
        const task = await TaskModel.findAll();
        if (!task) return res.status(404)
        return res.status(200).json(task)
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        })
        
    }

}

//controlador para crear una publicación
export const ctrlcreateTask =  async (req, res) => {
    try {
        const newTask = await TaskModel.create(req.body)
        return res.status(201).json(newTask)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        
    })
}

}

//controlador para modificar una publicación
export const ctrlUpdateTask = async (req, res) => {
    const {id} = req.params

    try {
        const task = await TaskModel.findByPk(id)

        if (!task) {
            return res.status(404).json({
                message: "Publicación no encontrada"
            })
        }
        task.update(req.body)
        return res.status(200).json(task)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        }) 
        
    }

}
 //control para eliminar una publicación
export const ctrlDeleteTask = async(req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const taskDeleted = await TaskModel.destroy({
            where: {
                id: id
            }
        })
        if (!taskDeleted) {
            return res.status(404).json({
                message: "Publicación no encontrada"
            })
        }
        return res.status(200).json({
            message: "Publicación eliminada"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        }) 
    }
}