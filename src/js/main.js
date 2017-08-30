window.$ = window.jQuery = require("jquery"); //Hace jQuery accesible públicamente

import HeaderManager from "./services/headerManager";


const headerManager = new HeaderManager("#nav-icon");
headerManager.init();