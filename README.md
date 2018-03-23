## Plataforma de artículos

### Poner a correr el proyecto:
#####Terminal 1 -> `npm install`

Para descargarnos a través de npm todas las dependencias del proyecto en la carpeta node_modules.

#####Terminal 2 -> `npm run server`
Para poner a correr el servidor "json-server".

#####Terminal 3 -> `gulp`

#####url -> ´localhost:3200´
Para visualizar la web en un navegador escribimos la url 'localhost:3200', que es la que hemos especificado en el archivo "package.json". 

## Detalles de la práctica:

### Enunciado:
Se pretende poner en práctica las habilidades adquiridas durante los dos promeros módulos del Bootcamp **construyendo un prototipo de front-end responsive**. Este prototipo deberá adaptarse a terminales móviles tablets y equipos de escritorio.

### Constará de las siguientes plantillas:
* **Listado de artículos:** donde se encontrará un listado de artículos de los cuales, haciendo click en cada uno de ellos se accedería a su plantilla de detalle.
* **Detalle de artículo:** plantilla a la que se accedería tras hacer click en un artículo en concreto del listado.

Como la finalidad de esta práctica es demostrar las habilidades de front-end, ***ambas plantillas serán estáticas***. Es decir, sea cual sea el artículo sobre el que se hace click en el listado de artículos, siempre se mostrará el mismo artículo de detalle. Por tanto, los contenidos de los artículos del listado tanto como los del artículo del detalle quedan completamente a elección del alumno.

### Requisitos de las plantillas:
Todas las plantillas deberán compartir:
* Cabecera
* Footer y
* Menú responsive

* En la **cabecera** se deberá mostrar:

	- El nombre de la plataforma (a elección del alumno).
	- Un input para poder realizar las búsquedas.
	- Un menú horizontal que contenga un listado de categorías temáticas (la idea, es que en un futuro, un usuario pueda hacer click en una categoría para ver sólo los artículos de esa categoría, pero no es objetivo de esta práctica).
	- Un enlace a la plantilla de login y 
	- Un enlace a la plantilla de registro.

* El **menú** deberá ser responsive, de manera que se adapte de la mejor manera posible a los diferentes tipos de dispositivos para los que se desea dar soporte.

* En el **pie de página** deberá mostrarse el nombre de la plataforma (a elección del alumno) así como un **enlace que permita subir a la parte superior de la página**.

Se deja a elección del alumno la posibilidad de incorporar más elementos a la cabecera o al pie de página.


### Requisitos de la plantilla de listado de artículos:
En la plantilla de listado de artículos se deberá mostrar un listado de 9-10 artículos donde al hacer click sobre uno de ellos se acceda a la plantilla de detalle de un artículo y cada arículo esté compuesto de:

* Un **título**
* Una **imagen o video** (opcional). Entre los 10 artículos que debe haber en esta plantilla de listado, al menos uno de ellos deberá mostrar una imagen, al menos uno deberá mostrar un placeholder (imagen por defecto) y al menos uno deberá mostrar un vídeo.
* Un **texto a modo de introducción** del artículo: se deberá mostrar el nombre del autor del artículo así como una foto de perfil. *Al menos dos de los artículos deberán mostrar una imagen de placeholder (es decir una imagen de sustitución, simulando que el autor del artículo no hubiera subido ninguna imagen como foto de perfil)*.
* La **fecha y hora** de publicación del artículo: esta fecha deberá mostrar:
	- El número de segundos que han pasado desde la fecha y hora de publicación en caso de haber sido hace menos de un minuto.
	- El número de minutos en caso de haber sido hace menos de una hora.
	- El número de horas en caso de haber sido hace menos de un día. 
	- El día de la semana, en caso de haberse publicado hace menos de una semana y 
	- La fecha y hora al completo, en cualquier otro caso
* Un **elemento de iteración** (icono o botón), que permita a un usuario indicar que le gusta el artículo.
* El **número de comentarios** que tiene el artículo. Al hacer click en el número de comentarios, se deberá cargar la plantilla de detalle de artículo mostrando directamente la zona de comentarios del artículo.

Además, al final del listado de artículos deberá existir una navegación que permita al usuario cargar artículos más antiguos o más recientes (dicho de otra manera: un **sistema de paginación**). En esta práctica no es necesario que la paginación sea funcional, ya que no disponemos de un backend que implemente dicha lógica.

#### Funcionalidad "me gusta"
Como en el listado de artículos existe un botón de "me gusta", se deberá implementar esa funcionalidad utilizando ***Web Storage*** de manera que, cuando un usuario haga click en el botón de "me gusta" de alguno de los artículos, esta información deberá quedar almancenada en el navegador del usuario.

### Requisitos del detalle de un artículo:
En la página de detalle de un artículo se deberán mostrar los mismos elementos que se mostraban en un artículo de la plantilla del listado de artículos (título, imagen...) pero con las siguientes modificaciones:

* Se mostrará una **imagen (no video)**
* Se mostrará el **contenido total del texto**. Es decir, se mostrará un texto de varios párrafos en lugar del "texto a modo de introducción" (ya que se trata del detalle de un artículo). En estos párrafos se deberán mostrar algunas palabras en negrita, algunas en cursiva y algún enlace.

Además de estos componentes, antes del pie de página se deberá mostrar un sistema de comentarios que se detalla a continuación. 

#### Sistema de comentarios:
Se desea tener un sistema de comentarios en la plantilla de detalle de un artículo, donde los usuarios puedan dejar sus comentarios acerca de un artículo. Este sistema de comentarios deberá mostrar la lista de comentarios y, al final, un formulario para que el usuario pueda dejar un comentario. 

Al tratarse de un prototipo, este sistema de comentarios se implementará utilizando ***jsonServer*** como "Backend", para persistir los datos.

La lista de comentarios se cargará asíncronamente mediante ***Ajax*** una vez el sistema de comentarios pasa a ser visible en la pantalla (de esta manera, el sistema cargará únicamente los comentarios cuando el usuario los vaya a ver). Por tanto, **se tendrán que gestionar los posibles estados de listado de comentarios** (vacío o sin comentarios, cargando comentarios, error en la carga de comentarios y éxito en la carga de comentarios).

Se deberá ***implemenar la funcionalidad de dejar un comentario***, mediante un formulario donde se solicite el nombre y apellidos del usuario que desea dejar el comentario, el e-mail y un campo de texto donde el usuario podrá escribir su comentario (con un máximo de 120 palabras). Antes de poder enviar el comentario, se deberán validar correctamente los datos. No se deberá permitir enviar el formulario si alguno de los campos es incorreco. Se deberán gestionar también los posibles errores que pueda haber en la comunicación con el servidor (como que el servidor no esté disponible) para mostrarlos debidamente al usuario.

**NOTA:** En un futuro, el sistema de comentarios se implementará con un backend diferente (no jsonServer). Por lo tanto, en un futuro esta funcionalidad se verá modificada por lo que se recomienda al alumno que tenga en cuenta esta restricción a la hora del diseño de la lógica de la funcionalidad.

### Consideraciones generales:
Se desea que la optimización del front-end sea máxima, por lo que se espera que el sitio web cargue de una manera rápida, realizando el menor número posible de peticiones HTTP, así como que todos los recursos que cargue el sitio web estén lo más optimizados posible (esto incluye hojas de estilo, archivos JavaScript e imágenes).

Se deberán cargar las **imágenes optimizadas para cada dispositivo**, por lo que se deberán tener imágenes optimizadas teniendo en cuenta el tamaño y DPR de los diferentes dispositivos.

El front-end deberá funcionar en los navegadores: Google Chrome, Mozilla Firefox e Internet Explorer 11 o superior.

Se permite el uso de cualquier librería, así como la elección de tecnologías a utilizar por parte del alumno para la realizacíon de la práctica.

Se recomienda el uso de algún sistema de automatización de tareas como **Gulp** o **Grunt**, así como el uso de preprocesadores de CSS tipo **LESS**, **SASS** O **Stylus**.


### Notas:
* Gestor de tareas: [gulp](https://gulpjs.com/)
* Preprocesador: [SASS](https://sass-lang.com/)
* Framework: [https://getbootstrap.com/](https://getbootstrap.com/)
* Plugin utilizado para la paginación: [http://pagination.js.org/](http://pagination.js.org/)
* Imágenes extraídas de: [https://unsplash.com/](https://unsplash.com/)
