## Plataforma de artículos
### Consta de 2 plantillas:
* Listado de artículos
* Detalle de artículo

### Requisitos de las plantillas:
* Cabecera y footer comunes
* Menú responsive

### Requisitos del listado de artículos:
* Título
* Imagen o video
* Texto introductorio
* Información del autor
* Fecha y hora de publicación
* Elemento de iteración (me gusta). Guardado mediante ***Web Storage*** en el navegador del usuario.
* Número de comentarios del artículo

### Requisitos del detalle de un artículo:
* Se mostrará una imagen (no video)
* Se mostrará el contenido total del texto.
* **Sistema de comentarios**:
    - Se implementará utilizando ***jsonServer*** como "Backend"
    - Se cargará asíncronamente mediante ***Ajax*** una vez pasa a ser visible en pantalla.
    - Se gestionarán los posibles estados de listado de comentarios.
    - Se deberá implementar la funcionalidad de dejar un comentario, mediante un formulario.

### Consideraciones generales:
* Optimización máxima de imágenes, javascript y css.
* Carga de las imágenes optimizada para cada dispositivo.
* Compatible con: Google Chrome, Mozilla Firefox e Internet Explorer 11 o superior. 
* Utilización de sistema de automatización de tareas como Gulp o Grunt.
* Uso de preprocesadores tipo: SASS, LESS o Stylus.
    