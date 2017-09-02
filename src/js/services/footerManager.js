const $ = require("jquery");

export default class FooterManager {
    
    constructor (scrollLink) {
        this.scrollLink = $(scrollLink);
    }

    init() {
        let self = this;

        this.scrollLink.on('click', function (e){
            self.scrollToTop();
            return false;
        });
    }

    scrollToTop(){
        $('html, body').stop().animate({
            scrollTop: 0
        }, "slow");
    }
}