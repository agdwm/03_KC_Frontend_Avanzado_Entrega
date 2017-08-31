window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import HeaderManager from "./services/headerManager";
import FooterManager from "./services/footerManager";


const headerManager = new HeaderManager("#js_nav-icon", "#js_nav-navigation", "#js_search-btn");
headerManager.init();

const footerManager = new FooterManager("#js_scroll-link");
footerManager.init();