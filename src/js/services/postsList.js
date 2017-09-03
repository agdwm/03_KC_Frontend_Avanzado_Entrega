const $ = require("jquery");

export default class PostsList {
    
    constructor() {
        this.video = $(".video");
        this.iconLike = $(".fig-like_icon");
        //console.log(this.iconLike);
    }

    init() {
        let self = this;
        
        this.video.on("click", function(e) {
            self.playVideo($(this));
            return false;
        });
        
        this.iconLike.on("click", function(e) {
            e.preventDefault();
            self.clickIconLike($(this));
            return false;
        });
    }
    
    playVideo(anchor) {
        let video = anchor[0];
        video.paused ? video.play() : video.pause();
    }

    clickIconLike(anchor) {
        let emptyHeart = anchor.find(".glyphicon-heart-empty").toggleClass("active");
        let fillHeart = anchor.find(".glyphicon-heart").toggleClass("active fill");
    }
}