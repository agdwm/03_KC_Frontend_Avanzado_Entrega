window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente


import PostsService from "./services/PostsService";
import HeaderManager from "./services/headerManager";
import FooterManager from "./services/footerManager";
import PostsListManager from "./services/postsListManager";
import PubSub from 'pubsub-js';

const postsService = new PostsService("/posts/");

const postsListManager = new PostsListManager("#posts-list", postsService, PubSub);
postsListManager.init();

const headerManager = new HeaderManager();
headerManager.init();

const footerManager = new FooterManager("#js_scroll-link");
footerManager.init();

