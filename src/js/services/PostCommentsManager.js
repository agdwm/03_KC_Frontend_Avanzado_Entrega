import UIManager from './UIManager';

//PostCommentsManager pinta los comentarios
export default class PostCommentsManager extends UIManager{
    
    constructor(elementSelector, commentsService, pubSub) {
        super(elementSelector); //llamamos al constructor de la clase UIManager
        this.postsService = commentsService;
        this.pubSub = pubSub;
        this.postComments = $(elementSelector);
    }

    init(){

    }

    scroll(){
       this.checkScrollAndLoad();
    }

    checkScrollAndLoad() {
        let commentsPosTop = $(this.postComments).offset().top;
        let commentsHeight = $(this.postComments).outerHeight();
        let windowHeight = $(window).height();
        let windowScrollTop = $(window).scrollTop();

        //console.log((commentsPosTop-windowHeight) , windowScrollTop);

        if (windowScrollTop > (commentsPosTop+commentsHeight-windowHeight)){
            //console.log("MAyor");
            this.loadComments();
        }
    }

    loadComments() {
        this.postsService.list(
            comments => {
                if (comments.length == 0){
                    this.setEmpty();
                } else {
                    this.renderComments(comments);
                    this.setIdeal();
                }
            },
            error => {
                this.setError();
                console.log("ERROR al cargar los comentarios. :(", error);
            }
        )
    }

    renderComments(comments) {
        let html = "";
        for(let comment of comments){
            html += this.renderComment(comment)
        }
        this.setIdealHtml(html);
    }

    renderComment(comment) {

        return `<div class="comment-item">
        <div class="com-postNotes clearfix">
            <div class="com-author">
                <div class="com-author_img">
                    <div class="com-author_img_frame">
                        <img src="img/profiles/author-lorem-60px.jpg" class="img-responsive" alt="imagen de perfil">
                    </div>
                </div>
                <div class="com-author_details">
                    <div class="com-author_name">
                        <h5>${comment.name} ${comment.surname}</h5>
                    </div>
                    <p class="com-author_email">
                    ${comment.email}
                    </p>
                </div>
            </div>
        </div>
        <div class="com-text">
            ${comment.message}
        </div>
    </div>`;
    }
}