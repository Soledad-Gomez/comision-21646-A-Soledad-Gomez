import { PostModel } from "../models/Posts.js"

//controlador para crear las vista
export const ctrlView = async (req, res) => {
    try {
        const posts = await PostModel.findAll();
        res.render("index.ejs", {posts})
console.log("ctrlview")
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        })
        
    }
}


//controlador para  traer todas las publicaciones
export const ctrlGetPost = async (req, res) => {
    try {
        const post = await PostModel.findAll();
        if (!post) return res.status(404)
        return res.status(200).json(post)
    
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        })
        
    }

}

//controlador para crear una publicación
export const ctrlcreatePost =  async (req, res) => {
    try {
        const newPost = await PostModel.create(req.body)
        return res.status(201).json(newPost)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        
    })
}

}

//controlador para modificar una publicación
export const ctrlUpdatePost = async (req, res) => {
    const {id} = req.params

    try {
        const post = await PostModel.findByPk(id)

        if (!post) {
            return res.status(404).json({
                message: "Publicación no encontrada"
            })
        }
        post.update(req.body)
        return res.status(200).json(post)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Error server"
        }) 
        
    }

}
 //control para eliminar una publicación
export const ctrlDeletePost = async(req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const postDeleted = await PostModel.destroy({
            where: {
                id: id
            }
        })
        if (!postDeleted) {
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