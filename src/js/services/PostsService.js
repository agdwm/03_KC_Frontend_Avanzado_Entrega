//PostsService {} únicamente ENVIA y RECIBE datos, no hace nada con ellos
export default class PostsService {
    
    constructor(url){
        this.url = url;
    }

    // Obtener listado de artículos GET
    //list recibe 2 parametros (2 funciones callback): posts() y error()
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear un comentario
    //¿Cómo diferenciamos si queremos actualizar o crear un recurso?
    //Por el ID
    save(comment, successCallback, errorCallback) {
        //Cuando "actualizamos" un recurso SÍ pasamos el ID porque el ID del recurso ya existe.
        if (comment.id){
            this.update(comment, successCallback, errorCallback);
        //Cuando "creamos" un nuevo recurso NO pasamos el ID porque no existe aún y lo crea automáticamente el servidor.
        } else {
            this.create(comment, successCallback, errorCallback);
        }
    }

    // Crear un comentario
    create(comment, successCallback, errorCallback) {
        $.ajax({
            //al crear un recurso NO pasamos Id xq eso lo gestiona el servidor automáticamente
            url: this.url,
            method: 'post',
            //Pasamos los datos del recurso en JSON
            data: comment,
            success: successCallback,
            error: errorCallback
        });
    }

    // Obtener el detalle de un artículo GET + id song
    getDetail(postId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${postId}`,
            success: successCallback,
            error: errorCallback
        });
    }
    
    // Actualizar un comentario
    update(post, successCallback, errorCallback) {
        $.ajax({
            //al actualizar un recurso pasamos el ID
            url: `${this.url}${post.id}`,
            method: 'put',
            //Pasamos los datos del recurso en JSON
            data: post,
            success: successCallback,
            error: errorCallback
        });
    }

    // Eliminar un artículo (postsService.delete(4, response => {}, error => {}))
    delete(postId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${postId}`,// "/posts/id"
            //si no especificamos "method", en ajax x defecto es "get"
            method: 'delete',
            success: successCallback,
            error: errorCallback
        });    
    }
}