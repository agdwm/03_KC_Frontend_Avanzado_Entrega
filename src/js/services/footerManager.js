const $ = require("jquery");

export default class FooterManager {
    
    constructor (scrollLink) {
        this.scrollLink = $(scrollLink);
    }

    init() {
        let self = this;

        this.scrollLink.on('click', function (e){
            self.scrollToTop(e);
        });
        /*$(window).scroll(function(){
            showScrollBtn();
        });*/

    }

    scrollToTop(e){
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: 0
        }, "slow");
        return false;
    }

    /* showScrollBtn() {
        $(window).scrollTop() > 500 ? $(".scroll-top").addClass("on") : $(".scroll-top").removeClass("on")
    }*/

}