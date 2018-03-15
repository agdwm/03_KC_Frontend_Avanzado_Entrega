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

    renderPost_media(post_img, post_video, post_src_type){
        let post_media = "";

        if (post_img === "") {
            //Post default image
            post_media = `<div class="fig-img_frame">
                <div class="img-default">
                    <span class="fig-camera_icon">
                        <i class="glyphicon glyphicon-camera"></i></span>
                    </div>
            </div>`
        }else if(post_src_type === "image"){
            post_media = `
            <div class="fig-img_frame">
                <picture class="img-responsive">
                    <source 
                        media="(min-width:768px)"
                        srcset="${post_img}-360px.jpg 1x,
                                ${post_img}-768px.jpg 2x">
                    <source 
                        media="(min-width:640px)"
                        srcset="${post_img}-640px.jpg 1x,
                                ${post_img}-1280px.jpg 2x">
                    <source 
                        media="(min-width:481px)"
                        srcset="${post_img}-768px.jpg 1x,
                                ${post_img}-1500px.jpg 2x">
                    <source
                        media="(max-width:480px)"
                        srcset="${post_img}-480px.jpg 1x,
                                ${post_img}-960px.jpg 2x">

                    <!-- img tag for browsers that do not support picture element -->
                    <img class="img-responsive" 
                        src="${post_img}-768px.jpg"
                        alt=""/>
                </picture>
            </div>`;
        }else if(post_src_type === "video") {
            post_media =  `
            <div class="fig-vid_frame">
                <div class="video-wrapper">
                    <video class="video" width="100%" height="100%" preload="auto" controls poster="${post_img}-768px.jpg">
                        <source src="${post_video}.mp4" type="video/mp4">
                        <source src="${post_video}.m4v" type="video/m4v">
                        <source src="${post_video}.mov" type="video/mov">
                        <source src="${post_video}.wmv" type="video/wmv">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>`;
        }
        return post_media;
    }

    renderPost_author(author_img) {
        //Author default image
        if (author_img === "") {
            author_img = "img/profiles/author-lorem";
        }

        let post_author = `
        <picture>
            <source 
                srcset="${author_img}-60px.jpg 1x, 
                        ${author_img}-120px.jpg 2x">
            <img class="img-responsive" 
                src="${author_img}-120px.jpg" 
                alt="Imagen de perfil del usuario"/>
        </picture>`;

        return post_author;
    }

    //renderiza una único artículo
    renderPost(post, post_date) {
        let post_img = post.post_img;
        let post_video = post.post_video;
        let author_img = post.author_img;
        let post_src_type = post.post_src_type;
        let html_post_media = this.renderPost_media(post_img, post_video, post_src_type);
        let html_post_author = this.renderPost_author(author_img);

        return `<div class="col-xs-12 col-sm-6 col-md-4">
                <article class="post-item" data-id="${post.post_id}">
                    <figure>
                        ${html_post_media}
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
                                            ${html_post_author}
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