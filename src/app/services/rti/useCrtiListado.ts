import jsonPlaceholderAPI from "@/app/api/rti/jsonPlaceholderAPI"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const usePost = ()=>{
    return useQuery<IUser[], AxiosError>({queryKey: ['posts'], queryFn: jsonPlaceholderAPI.getPost})
}

export const useComentariosById = (postId: number | null)=>{
    return useQuery<IComentarios[], Error>({queryKey: ['comentarios', postId],queryFn: ()=> jsonPlaceholderAPI.getComentariosById(postId), enabled: !!postId})
}

export const usePostById = (postId: number)=>{
    return useQuery<IUser, AxiosError>({queryKey: ['post', postId],queryFn: ()=> jsonPlaceholderAPI.getPostById(postId), enabled: !!postId})
}

export const useActualizarPostById = () => {
    return useMutation<IUser, AxiosError, { postId: number, postData: Partial<IUser> }>({mutationFn: (params) =>
      jsonPlaceholderAPI.actualizarPostById(params.postId, params.postData)}
    );
};

export const useEliminarPostById = ()=>{
    return useMutation<IUser,Error, {postId: number}>({ mutationFn: (params)=>jsonPlaceholderAPI.eliminarPostById(params.postId)})
}