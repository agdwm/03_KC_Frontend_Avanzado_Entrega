window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import HeaderManager from "./services/headerManager";
import FooterManager from "./services/footerManager";
import LikeManager from "./services/likeManager";
import BlogService from "./services/BlogService";
import PostsListManager from "./services/PostsListManager";
import DateService from "./services/DateService";
import PostCommentsManager from "./services/PostCommentsManager";
import PostFormManager from "./services/PostFormManager";

import PubSub from 'pubsub-js';
import Pagination from 'paginationjs';
import Paginator from './services/PaginationService';

const paginationService = new Paginator();
const dateService = new DateService();
const blogService = new BlogService("/posts/");
const commentsService = new BlogService("/comments/");

const headerManager = new HeaderManager();
const footerManager = new FooterManager("#js_scroll-link");
const likeManager = new LikeManager();
const postsListManager = new PostsListManager("#posts-list", blogService, dateService, likeManager, PubSub, paginationService);
const postCommentsManager = new PostCommentsManager("#post-comments", commentsService, PubSub);
const postFormManager = new PostFormManager("#post-form", commentsService, PubSub);


$(function(){
    //on load
    headerManager.init();
    footerManager.init();
    postsListManager.init();
    postCommentsManager.init();
    postFormManager.init();
});