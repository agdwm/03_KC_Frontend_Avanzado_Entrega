window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import HeaderManager from "./services/headerManager";
import FooterManager from "./services/footerManager";
import PostsList from "./services/postsList";

const headerManager = new HeaderManager();
headerManager.init();

const footerManager = new FooterManager("#js_scroll-link");
footerManager.init();

const postsList = new PostsList();
postsList.init();