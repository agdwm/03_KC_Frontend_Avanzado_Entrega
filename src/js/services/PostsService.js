/*No haría falta hacer un require de jquery en este archivo ya que se está importando en el main.js.
De hecho Browserify solo va a importar jquery 1 vez
Pero de este modo sabemos lo que significa "$" */
const $ = require("jquery");

//SongsService {} únicamente ENVIA y RECIBE datos, no hace nada con ellos
export default class PostsService {
    
    constructor(url){
        this.url = url;
    }

    // Obtener listado de canciones GET
    //list recibe 2 parametros (2 funciones callback): songs() y error()
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Crear o actualizar una canción
    //¿Cómo diferenciamos si queremos actualizar o crear un recurso?
    //Por el ID
    save(post, successCallback, errorCallback) {
        //Cuando actualizamos un recurso SI pasamos el ID porque el ID del recurso ya existe.
        if (post.id){
            this.update(post, successCallback, errorCallback);
        //Cuando creamos un nuevo recurso NO pasamos el ID porque no existe aún y lo gestiona automáticamente el servidor.
        } else {
            this.create(post, successCallback, errorCallback);
        }
    }

    // Crear una canción
    create(post, successCallback, errorCallback) {
        $.ajax({
            //al crear un recurso NO pasamos Id xq eso lo gestiona el servidor automáticamente
            url: this.url,
            method: 'post',
            //Pasamos los datos del recurso en JSON
            data: post,
            success: successCallback,
            error: errorCallback
        });
    }

    // Obtener el detalle de una canción GET + id song
    getDetail(postId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${postId}`,
            success: successCallback,
            error: errorCallback
        });
    }
}