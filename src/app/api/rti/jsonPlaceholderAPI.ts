import axios from "axios"

const jsonPlaceholderAPI = {
    getPost: async ()=>{
        const response =  await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data as IUser[];
    },
    getComentariosById: async (postId: number | null)=>{
        const responde = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        return responde.data as IComentarios[];
    },
    getPostById: async (postId: number)=>{
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        return response.data as IUser;
    },
    actualizarPostById: async (postId: number, data: IActualizarPost)=>{
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, data)
        return response.data as IUser
    },
    eliminarPostById: async (postId: number)=>{
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        return response.data
    }
}

export default jsonPlaceholderAPI;