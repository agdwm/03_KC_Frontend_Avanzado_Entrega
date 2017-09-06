window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import HeaderManager from "./services/headerManager";
import FooterManager from "./services/footerManager";
import PostsService from "./services/PostsService";
import PostsListManager from "./services/PostsListManager";
import PostFormManager from "./services/PostFormManager";

import PubSub from 'pubsub-js';

const headerManager = new HeaderManager();
headerManager.init();

const footerManager = new FooterManager("#js_scroll-link");
footerManager.init();

const postsService = new PostsService("/posts/");

const postsListManager = new PostsListManager("#posts-list", postsService, PubSub);
postsListManager.init();

const postFormManager = new PostFormManager("#post-form", postsService, PubSub);
postFormManager.init();