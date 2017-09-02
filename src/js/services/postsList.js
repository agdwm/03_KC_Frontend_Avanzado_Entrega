const $ = require("jquery");

export default class PostsList {
    
    constructor(video) {
        this.video = $(video);
    }

    init() {
        let self = this;
        
        this.video.on("click", function () {
            let anchor = $(this);
            self.playVideo(anchor);
            return false;
        });        
    }
    
    playVideo(anchor) {
        console.log("play");
        let video = anchor[0];
        video.paused ? video.play() : video.pause();
    }
}