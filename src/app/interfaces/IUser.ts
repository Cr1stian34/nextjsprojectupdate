interface IUser {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface IComentarios {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

interface IParamsGetPost extends Partial<IUser> {}

interface IActualizarPost extends Partial<IUser>{}