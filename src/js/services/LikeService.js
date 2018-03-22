export default class LikeService {

    constructor(){}

    toggleFillIconLike($this, boolean){
        let fillHeart = $this.find(".glyphicon-heart").toggleClass("active fill", boolean);
    }

    toggleEmptyIconLike($this, boolean){
        let emptyHeart = $this.find(".glyphicon-heart-empty").toggleClass("active", boolean);   
    }

    saveLikeInBrowser(postId, $this){
        localStorage.setItem(postId, "<3");
        this.toggleFillIconLike($this, true);
        this.toggleEmptyIconLike($this, false);
    }

    removeLikeFromBrowser(postId, $this){
        localStorage.removeItem(postId);
        this.toggleFillIconLike($this, false);
        this.toggleEmptyIconLike($this, true);
    }

    saveOrRemoveLike(postId, $this) {
        if(typeof(Storage) !== "undefined") {
            if(!localStorage.getItem(postId)){
                this.saveLikeInBrowser(postId, $this);
            }else{
                this.removeLikeFromBrowser(postId, $this);
            }
        }else {
            alert("El navegador no permite localStorage... :(");
        }
    }

    checkLikedButton(posts){

        let i = "";
        let len = localStorage.length;
        let key = "";
        let value = "";
        let listPostLiked = [];
        let post_id = "";

        for (i=0; i<len; i++) {
            key = localStorage.key(i);
            value = localStorage[key];
            if (value === "<3") {
                listPostLiked.push(key);
            }
        }

        posts.reduce((ids, post) => {
            post_id = post.post_id;
            post_id = post_id.toString();
            if (jQuery.inArray(post_id, listPostLiked) !== -1 ){
                let postLiked = $(`article[data-id="${post_id}"]`).find(".fig-like_icon");
                this.toggleFillIconLike(postLiked, true);
                this.toggleEmptyIconLike(postLiked, false);
            }
        }, []);
    }
}