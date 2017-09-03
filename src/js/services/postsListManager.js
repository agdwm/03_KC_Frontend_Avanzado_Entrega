import UIManager from './UIManager';

//PostsList SOLO recorre los artículos y los pinta
export default class PostsListManager extends UIManager{
    
    constructor(elementSelector, postsService, pubSub) {
        super(elementSelector); //llamamos al constructor de la clase UIManager
        this.postsService = postsService;
        this.pubSub = pubSub;

        this.video = $(".video");
        this.iconLike = $(".fig-like_icon");
    }

    init(post) {
        this.loadPosts();
        let self = this;

        
        this.video.on("click", function(e) {
            let $this = $(this);
            self.playVideo($this);
            return false;
        });
        
        this.iconLike.on("click", function(e) {
            e.preventDefault();
            let $this = $(this);
            self.clickIconLike($this);
            return false;
        });
    }
    
    playVideo($this) {
        let video = $this[0];
        video.paused ? video.play() : video.pause();
    }

    clickIconLike($this) {
        let emptyHeart = $this.find(".glyphicon-heart-empty").toggleClass("active");
        let fillHeart = $this.find(".glyphicon-heart").toggleClass("active fill");
    }

    //loadPost() solo carga las canciones
    loadPosts() {
        //PostsService.list(post => {},  error => {});
        /*Llamamos al método "list()" del objeto "postService" y le pasamos 2 funciones que gestionará 
        el objeto en caso de éxito o error de la llamada Ajax.*/
        this.postsService.list(
            posts => {
                //Comprobamos si hay canciones
                if (posts.length == 0) {
                    //Mostramos el estado vacío
                    this.setEmpty();
                } else {
                    //Componemos el html con todas las canciones
                    this.renderPosts(posts);
                    //Quitamos el mensaje de cargando y mostramos la lista de canciones
                    this.setIdeal();
                }
            },
            error => {
                //Mostramos el estado de error
                this.setError();
                //Hacemos log del error en la consola
                console.log("ERROR al cargar los artículos. :(", error);
            });

        //this.postsService.getDetail(5); //?
    }

    //renderPosts() PINTA los post en el html
    renderPosts(posts) {
        let html = "";
        for (let post of posts) {
            html += this.renderPost(post)
        }
        //Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }

    //renderiza una única canción
    renderPost(post) {
        let post_img = post.post_img;
        let author_img = post.author_img;
        let srcset = "";

        //Imágenes por defecto tanto para el post como para el autor
        if (post_img == "") {
            post_img = "img/lorem.jpg";
            //srcset = ' srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }

        if (author_img == "") {
            author_img = "img/author_lorem.jpg";
            //srcset = ' srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }

        return `<article data-id="${post.post_id}">
                    <figure>
                        <div class="fig-img_frame">
                            <img class="img-responsive" src="${post.post_img}" alt="">
                        </div>
                        <figcaption class="figcaption">
                            <div class="fig-content">
                                <div class="fig-header">
                                    <p>
                                        <span class="fig-header_type">${post.post_type}</span>
                                        <span class="fig-header_date">${post.post_date}</span>
                                    </p>
                                    <h2 class="fig-header_title">${post.post_title}</h2>
                                </div>
                                <div class="fig-body">
                                    <div class="fig-body_text">
                                        ${post.post_text}
                                    </div>
                                </div>
                            </div>
                            <div class="fig-postNotes clearfix">
                                <div class="fig-author">
                                    <div class="fig-author_img">
                                        <div class="fig-author_img_frame">
                                            <img src="${post.author_img}" class="img-responsive" alt="imagen de perfil">
                                        </div>
                                    </div>
                                    <div class="fig-author_details">
                                        <div class="fig-author_name">
                                            <h5>${post.author_name}</h5>
                                        </div>
                                        <p class="fig-author_comments">
                                            <a href="javascript:;">Comentarios: <span class="fig-comments_num">${post.post_comments_num}</span>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div class="fig-like">
                                    <div class="fig-like_icon">
                                        <p>
                                            <i class="glyphicon glyphicon-heart-empty active"></i>
                                            <i class="glyphicon glyphicon-heart"></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </article>`;
        }
}