import UIManager from './UIManager';

//PostsList SOLO recorre los artículos y los pinta
export default class PostsListManager extends UIManager{

    constructor(elementSelector, postsService, likeService, dateService, pubSub) {
        super(elementSelector); //llamamos al constructor de la clase UIManager
        this.postsService = postsService;
        this.likeService = likeService;
        this.dateService = dateService;
        this.pubSub = pubSub;

        this.video = $(".video");
        this.iconLike = $(".fig-like_icon");
    }

    init() {
        this.loadPosts();
        this.openDetail();

        let self = this;

        this.element.on("click", ".video", function(e)  {
            let $this = $(this);
            self.playVideo($this);
            return false;
        });

        this.element.on("click", ".fig-like_icon", function(e)  {
            let $this = $(this);
            let postId = $this.closest(".post-item").data("id");
            self.likeService.saveOrRemoveLike(postId, $this);
            return false;
        });
    }

    openDetail(){
        this.element.on("click", ".fig-content", function(e)  {
            window.location.href = `./detail.html`;
        })
    }

    playVideo($this){
        let video = $this[0];
        video.paused ? video.play() : video.pause();
    }

    //loadPost() solo carga los artículos
    loadPosts(){
        //PostsService.list(post => {},  error => {});
        /*Llamamos al método "list()" del objeto "postService" y le pasamos 2 funciones callback que gestionará 
        el objeto en caso de éxito o error de la llamada Ajax.*/
        this.postsService.list(
            posts => {
                //Comprobamos si hay artículos
                if (posts.length == 0) {
                    //Mostramos el estado vacío
                    this.setEmpty();
                } else {
                    //Componemos el html con todos los artículos
                    //this.dateService.getDates(posts);
                    this.renderPosts(posts);
                    this.likeService.checkLikedButton(posts);
                    //Quitamos el mensaje de cargando y mostramos la lista de artículos
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
            let post_date = this.dateService.getDates(post)
            html += this.renderPost(post, post_date)
        }
        //Metemos el HTML en el div que contiene los artículos
        this.setIdealHtml(html);
    }

    //renderiza una único artículo
    renderPost(post, post_date) {
        var post_img = post.post_img;
        var author_img = post.author_img;
        var post_src_type = post.post_src_type;
        var srcset = "";
        var htmlPartial = "";

        //Imagenes por defecto tanto para el post como para el autor
        if (post_img === "") {
            post_img = "img/lorem.jpg";
            //srcset = ' srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }else{}

        if (author_img === "") {
            author_img = "img/author_lorem.jpg";
            //srcset = ' srcset="img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w"';
        }else{}

        if (post_src_type === "video" )
            htmlPartial =  `<div class="fig-vid_frame">
                    <div class="video-wrapper">
                        <video class="video" width="100%" height="100%" preload="auto" controls poster="img/preview_little.jpg">
                            <source src="/video/little_talks.m4v" type="video/mp4">
                        </video>
                    </div>
                </div>`;
        else {
            htmlPartial = `<div class="fig-img_frame">
                    <img class="img-responsive" src="${post_img}" alt="Fotografía de manos tatuadas">
                </div>`;
        }

        return `<div class="col-xs-12 col-sm-6 col-md-4">
                <article class="post-item" data-id="${post.post_id}">
                    <figure>
                    ${htmlPartial}
                        <figcaption class="figcaption">
                            <div class="fig-content">
                                <div class="fig-header">
                                    <p>
                                        <span class="fig-header_type">${post.post_type}</span>
                                        <span class="fig-header_date">${post_date}</span>
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
                                            <img src="${author_img}" class="img-responsive" alt="imagen de perfil">
                                        </div>
                                    </div>
                                    <div class="fig-author_details">
                                        <div class="fig-author_name">
                                            <h5>${post.author_name}</h5>
                                        </div>
                                        <p class="fig-author_comments">
                                            <a href="./detail.html#anchor-comments">Comentarios: <span class="fig-comments_num">${post.post_comments_num}</span>
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
                </article>
            </div>`;
        }
}