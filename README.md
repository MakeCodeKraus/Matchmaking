# Actividad 2 - Comunicacion WebSockets

**Objetivo:**
Esta actividad entenderemos cómo funciona la comunicación en tiempo real en aplicaciones web y cómo pueden implementarla en un proyecto práctico utilizando WebSockets 

**Metodo:**
En esta actividad, construiremos un sistema sencillo de matchmaking utilizando websockets.  Crearemos un servidor websockets utilizando Node.js y la librería socket.io, y se suministrara un código base para la realización de la actividad, el cual cuenta con el desarrollo del cliente completo

**Actividades:**


- El servidor debe recibir un nombre de usuario por parte del cliente
* El servidor de matchmaking debe almacenar una lista de los usuarios conectados, mantenerla actualizada y compartirla con los clientes conectados
+ No deberían existir dos usuarios conectados con el mismo nombre de usuario
- El servidor debe implementar un mecanismo para recibir el evento "searchMatch" de los cliente y "emparejar" 2 usuarios enviándoles el mensjae "matchReady"
* El servidor le debe permitir al usuario cancelar la búsqueda de la partida con el evento "stopSearchMatch"
