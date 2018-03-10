window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import HeaderManager from "./services/headerManager";
import FooterManager from "./services/footerManager";
import PostsService from "./services/PostsService";
import PostsListManager from "./services/PostsListManager";
import LikeService from "./services/LikeService";
import DateService from "./services/DateService";
import PostCommentsManager from "./services/PostCommentsManager";
import PostFormManager from "./services/PostFormManager";

import PubSub from 'pubsub-js';

const headerManager = new HeaderManager();
const footerManager = new FooterManager("#js_scroll-link");

const likeService = new LikeService();
const dateService = new DateService();
const postsService = new PostsService("/posts/");
const commentsService = new PostsService("/comments/");

const postsListManager = new PostsListManager("#posts-list", postsService, likeService, dateService, PubSub);
const postCommentsManager = new PostCommentsManager("#post-comments", commentsService, PubSub);
const postFormManager = new PostFormManager("#post-form", commentsService, PubSub);


$(function(){
    //on load
    headerManager.init();
    footerManager.init();
    postsListManager.init();
    postCommentsManager.init();
    postFormManager.init();

    //on scroll
    $(document).on('scroll', function(){
        postCommentsManager.scroll();
    })
});