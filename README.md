# Shopify Workflow 👛

### Tabla de contenido:

- [Estructura del Workflow.](#estructuraworkflow)
  - [El archivo theme.liquid](#themeliquid)
- [Secciones Nuevas.](#seccionesnuevas)
  - [Collection List Slider.](#collectionslider)
  - [Featured Product Slider.](#featuredslider)
- [Iniciar Proyecto.](#iniciarproyecto)
  - [Clonar Workflow.](#clonarproyecto)
  - [Instalar Dependencias.](#instalardependencias)
  - [Iniciar Desarrollo.](#iniciardesarrollo)



<a name="estructuraproyecto"></a>
#### Estructura del Workflow.

Archivos base de **Debut**, estos archivos son los que trae ya el tema por default.

```
  - assets/
  - config/
  - layout/
  - locales/
  - sections/
  - snippets/
  - templates/

```

Dentro de **```src/```** tenemos todos los archivos listos para el desarrollo.

```
  - src/
    - fonts/
    - img/
    - js/
      - index.js
      - lazysizes.js
      - match-media.js
      - password.js
      - theme.js
      - vendor.js
    - scss/
      - gm.base.scss
      - gm.cart.scss
      - gm.collection.scss
      - gm.footer.scss
      - gm.homepage.fold1.scss
      - gm.menu.scss
      - gm.pages.scss
      - gm.product.scss
      - gm.search.scss
      - theme.scss
```

**```- src/js/```**

**index.js** :

Esta version del workflow los archivos JavaScript tiene soporte para trabajar con modulos.

Asi que el archivo _index.js_ es el archivo de entrada, como se hace en frameworks y librerias tipo React, Vue y Angular.

Asi que todo lo que este dentro de este archivo se compilara en un bundle llamado ```bundle.min.js```.

Los .js restantes, son los que trea el tema **Debut**, pero se movieron al directorio de desarrollo para poder editarlos y asi al compilar se suben al directorio ```assets/``` ya minificados.

Si por alguna razon se complica el usar modulos dentro de _index.js_ se podria agregar entonces archivos .js dentro de ```src/js```.

Recuerda agregar la referencia en ```layout/theme.liquid```.

Por ejemplo:

```javascript
  <!--[if (gt IE 9)|!(IE)]><!--><script src="{{ 'tu_archivo.js' | asset_url }}" defer="defer"></script><!--<![endif]-->
  <!--[if lte IE 9]><script src="{{ 'tu_archivo.js' | asset_url }}"></script><![endif]-->
```

Dependiendo el funcionamiento de tu script es bueno cambiar el atributo ```defer="defer"``` o ```async="async"```.

**defer** : Es una opcion para no bloquear el render del HTML, ya que descarga el script al momento que renderea el HTML y al terminar este render ya se ejecuta el script.

**async** : Igual descarga el script cuando se esta ejecutando el render, pero este si bloquea, ya que al terminar de descargar ejecuta el script y pausa el rendereo del HTML, pasando la ejecucion del script continua ya el HTML render.

**```- src/scss/```**

**theme.scss** : Este archivo contiene los estilos por default de Debut, pero se movieron a este directorio para poder modificarlos y este ya se compila y minifica.

Todos los archivos que contiene el prefijo _**gm**.[nombre].scss_ son los archivos que creamos para las distintas secciones.

**gm.base.scss** : Este archivo contendra estilos globales que se requieran o algunos fixes que afecten igual de forma global.

Los archivos siguientes seran uno por cada seccion que se requiera. _cart_, _search_, _collection_, etc.

__gm.homepage.[foldN].scss__ : Estos archivos seran como lo dice su nombre de las secciones que se encuentran en la homepage.

**```- config.yml```**

Este archivo antes lo creabamos directamente con **ThemeKit** ahora ya lo tenemos por default solo hay que cambiar los datos.

**```- gulpfile.js```**


Dentro tenemos toda la configuracion de las tareas de compilacion u optimizacion de archivos JavaScript, SCSS, imagenes y fuentes.

<a name="themeliquid"></a>
#### El archivo theme.liquid

Dentro de estos archivos base existe uno en el cual se hicieron cambios, para la inclusion de archivos de estilos y script asi como un pequeño loader que espera la carga de todo el contenido.

```
  - layout
    - theme.liquid
```

En la linea [#L86](https://github.com/more-shopify/getmore-workflow/blob/develop/layout/theme.liquid#L86) se hace la referencia al ```bundle.min.js```

En la linea [#L43](https://github.com/more-shopify/getmore-workflow/blob/develop/layout/theme.liquid#L43) incluimos un snippet donde llamamos a los estilos ```snippets/gm-styles.liquid``` dentro estan las referencias y las intrucciones de como se hacen.

<a name="iniciarproyecto"></a>
#### Iniciar Proyecto.