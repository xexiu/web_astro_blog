---
title: "La Evolución de HTTP: desde el nacimiento de la web hasta HTTP/3"
excerpt: Descubre la historia y evolución de HTTP, desde sus inicios hasta
  HTTP/3. ¡Entiende cómo la web cambió!
author: Sergiu Mironescu
tags:
  - Historia del Protocolo HTTP
  - Evolución de HTTP
  - Versiones de HTTP
  - Impacto de HTTP en la Web
category: GENERAL
date: 2023-10-30T07:03:35.230Z
featured_image:
  src: /src/images/https.jpeg
  alt: http to https
---
## Todo lo que necesitas saber sobre HTTP

HTTP es el protocolo que todos los desarrolladores web deben conocer, ya que impulsa toda la web. Conocer HTTP puede definitivamente ayudarte a desarrollar mejores aplicaciones.

En este artículo, discutiremos qué es HTTP, cómo surgió, dónde se encuentra hoy y cómo llegamos hasta aquí.

### ¿Qué es HTTP?

Primero lo primero, ¿qué es HTTP? HTTP es un protocolo de comunicación de la capa de aplicación basado en TCP/IP que estandariza cómo los clientes y servidores se comunican entre sí. Define cómo se solicita y transmite contenido a través de Internet. Es un protocolo de capa de aplicación, lo que significa que es simplemente una capa de abstracción que estandariza cómo los hosts (clientes y servidores) se comunican. HTTP depende de TCP/IP para enviar solicitudes y respuestas entre el cliente y el servidor. De forma predeterminada, se utiliza el puerto TCP 80, pero también se pueden utilizar otros puertos. HTTPS, por otro lado, utiliza el puerto 443.

### HTTP/0.9 - El protocolo original (1991)

La primera versión documentada de HTTP fue HTTP/0.9, que se presentó en 1991. Fue el protocolo más simple de todos; tenía un solo método llamado GET. Si un cliente tenía que acceder a una página web en el servidor, habría hecho la solicitud simple como se muestra a continuación:

```sh
GET /index.html
```

Y la respuesta del servidor habría sido así:

```txt
(response body)
(connection closed)
```

Es decir, el servidor recibía la solicitud, respondía con HTML y, tan pronto como se transfería el contenido, se cerraba la conexión.

* No había encabezados.
* `GET` era el único método permitido.
* La respuesta debía ser HTML.

Como puedes ver, el protocolo no era más que un paso intermedio para lo que vendría después.

### HTTP/1.0 - 1996

En 1996, se desarrolló la siguiente versión de HTTP, es decir, HTTP/1.0, que mejoró significativamente la versión original.

A diferencia de HTTP/0.9, que estaba diseñado solo para respuestas HTML, HTTP/1.0 podía manejar otros formatos de respuesta como imágenes, archivos de video, texto plano o cualquier otro tipo de contenido. Se agregaron más métodos (POST y HEAD), se cambiaron los formatos de solicitud/respuesta, se agregaron encabezados HTTP a ambas solicitudes y respuestas, se introdujeron códigos de estado para identificar la respuesta, se introdujo el soporte para conjuntos de caracteres, tipos multipartes, autorización, almacenamiento en caché, codificación de contenido y más.

Así es cómo podría haber lucido una solicitud y respuesta HTTP/1.0 de muestra:

```sh
GET / HTTP/1.0
Host: cs.fyi
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
Accept: /
```

Como puedes ver, junto con la solicitud, el cliente también envió su información personal y el tipo de respuesta requerida. Mientras que en HTTP/0.9, el cliente no podía enviar esta información porque no había encabezados.

La respuesta de ejemplo a la solicitud anterior podría haber sido similar a esto:

```txt
HTTP/1.0 200 OK
Content-Type: text/plain
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84

(cuerpo de respuesta)
(conexión cerrada)
```

En el inicio de la respuesta se encuentra HTTP/1.0 (HTTP seguido del número de versión), luego está el código de estado 200 seguido de la frase de estado (o descripción del código de estado). En esta nueva versión, los encabezados de solicitud y respuesta se mantuvieron como codificados en ASCII, pero el cuerpo de respuesta podría ser de cualquier tipo, como imágenes, videos, HTML, texto plano o cualquier otro tipo de contenido. Entonces, ahora el servidor podía enviar cualquier tipo de contenido al cliente; no mucho después de la introducción, el término "Hipertexto" en HTTP se convirtió en un nombre inapropiado. HMTP o Protocolo de transferencia de hipertexto habría tenido más sentido, pero supongo que nos quedamos con el nombre de por vida.

Una de las principales desventajas de HTTP/1.0 era que no se podían tener múltiples solicitudes por conexión. Es decir, cada vez que un cliente necesitaba algo del servidor, tenía que abrir una nueva conexión TCP y después de que se cumplía la solicitud, la conexión se cerraba. Y para cualquier otra necesidad, tenía que ser en una nueva conexión. ¿Por qué es esto malo? Bueno, imaginemos que visitas una página web que tiene 10 imágenes, 5 hojas de estilo y 5 archivos de JavaScript, lo que suma 20 elementos que deben cargarse cuando se realiza la solicitud a esa página. Dado que el servidor cierra la conexión tan pronto como se cumple la solicitud, habría una serie de 20 conexiones separadas en las que cada uno de los elementos se serviría uno por uno en sus conexiones individuales. Este gran número de conexiones resulta en una seria disminución del rendimiento, ya que requerir una nueva conexión TCP impone una penalización significativa de rendimiento debido al apretón de manos de tres vías seguido de un inicio lento.

### Apretón de manos de tres vías (three-way handshake)

En su forma más simple, el apretón de manos de tres vías significa que todas las conexiones TCP comienzan con un apretón de manos de tres vías en el que el cliente y el servidor comparten una serie de paquetes antes de comenzar a compartir datos de la aplicación.

* SYN - El cliente elige un número aleatorio, digamos x, y lo envía al servidor.
* SYN ACK - El servidor reconoce la solicitud enviando un paquete ACK de vuelta al cliente, que está compuesto por un número aleatorio, digamos y, elegido por el servidor y el número x+1, donde x es el número que envió el cliente.
* ACK - El cliente incrementa el número y recibido del servidor y envía un paquete ACK de vuelta con el número y+1.

Una vez que se completa el apretón de manos de tres vías, la compartición de datos entre el cliente y el servidor puede comenzar. Es importante destacar que el cliente puede comenzar a enviar los datos de la aplicación tan pronto como envía el último paquete ACK, pero el servidor todavía debe esperar a que llegue este último paquete ACK para estar seguro de que el cliente está listo para recibir datos.

El apretón de manos de tres vías es un proceso de negociación que tiene lugar al comienzo de una conexión TCP y es necesario para establecer la conexión y asegurarse de que ambas partes están listas para enviar y recibir datos. Este proceso de negociación agrega latencia y recursos de red, lo que lo convierte en un proceso costoso en términos de rendimiento.

### HTTP/1.1 - 1997

Para superar el problema de un rendimiento pobre debido al apretón de manos de tres vías y abrir y cerrar conexiones para cada solicitud, en 1997, HTTP/1.1 se introdujo.

Con HTTP/1.1, se permitió tener múltiples solicitudes en una sola conexión. En lugar de abrir y cerrar una conexión para cada solicitud, el cliente podría enviar muchas solicitudes a un servidor utilizando la misma conexión. El cliente no tendría que esperar a que una solicitud se cumpla antes de enviar la siguiente. El servidor también podría enviar muchas respuestas a las solicitudes del cliente en la misma conexión. El rendimiento mejoró drásticamente, ya que no se necesitaba un apretón de manos de tres vías para cada solicitud. El servidor no tenía que cerrar la conexión tan pronto como una solicitud se cumplía; en lugar de eso, podía mantener la conexión abierta y usarla para enviar más datos. Esto redujo significativamente la sobrecarga debida al apretón de manos de tres vías, que era un cuello de botella para HTTP/1.0.

### Sin embargo, no todo era perfecto

Aunque HTTP/1.1 superó muchos problemas de rendimiento de HTTP/1.0, no fue la solución ideal. HTTP/1.1 sigue siendo un protocolo de texto, lo que significa que todos los datos deben ser interpretados y procesados como texto, incluso las imágenes, videos y otros archivos binarios. Esto es ineficiente en términos de uso de ancho de banda y recursos del servidor. Además, las solicitudes y respuestas aún se bloquean una con la otra, lo que significa que, a menos que se utilicen múltiples conexiones, el cliente debe esperar a que una solicitud se cumpla antes de enviar la siguiente. Esto también puede causar problemas de rendimiento en un mundo en rápido movimiento.

### HTTP/2 - 2015

Para abordar los problemas restantes y seguir mejorando el rendimiento, HTTP/2 se introdujo en 2015. HTTP/2 es una gran mejora con respecto a HTTP/1.1 y lleva el rendimiento de la web a un nivel completamente nuevo.

Una de las características más importantes de HTTP/2 es el soporte para la multiplexación, lo que significa que se pueden enviar múltiples solicitudes y respuestas en una sola conexión en paralelo. En lugar de bloquear cada solicitud hasta que se complete, el cliente puede enviar múltiples solicitudes en cualquier momento y el servidor puede responder con las respectivas respuestas en el mismo orden en que se recibieron. La multiplexación reduce significativamente la sobrecarga de red y mejora drásticamente el rendimiento, especialmente en conexiones de alta latencia.

Otra característica importante es el soporte para la compresión de encabezados. Los encabezados HTTP suelen ser redundantes y pueden ocupar una gran cantidad de ancho de banda. HTTP/2 permite que los encabezados se compriman, lo que reduce la cantidad de datos enviados en cada solicitud y respuesta.

También se mejora el manejo de los flujos prioritarios. Esto significa que las solicitudes y respuestas se pueden etiquetar con un peso y prioridad, lo que permite que las solicitudes importantes se entreguen antes que las menos importantes. Esto es especialmente útil para cargar rápidamente las partes visibles de una página web.

En general, HTTP/2 ofrece un mejor rendimiento en comparación con HTTP/1.1 y es el protocolo de elección para la mayoría de los sitios web modernos.

### HTTP/3 - 2020

En 2020, HTTP/3 se introdujo como el sucesor de HTTP/2. La mayor diferencia es que HTTP/3 utiliza QUIC (Protocolo de Internet rápido de conexión segura) en lugar de TCP como protocolo de transporte. Esto permite conexiones más rápidas y confiables, especialmente en redes con alta latencia. HTTP/3 también mejora la multiplexación y el manejo de flujos prioritarios y ofrece un rendimiento general mejorado. Está diseñado para el futuro de la web y se espera que sea ampliamente adoptado.

### Conclusión

Entonces, en resumen, HTTP es el protocolo que impulsa la web. Comenzó con HTTP/0.9 y ha evolucionado hasta HTTP/3, mejorando el rendimiento, la eficiencia y la velocidad en cada iteración. Con HTTP/3, la web es más rápida y segura que nunca. Con suerte, este artículo te ayudó a comprender la historia de HTTP y por qué es tan importante en el mundo del desarrollo web. ¡Ahora puedes ser un experto en HTTP y sorprender a tus amigos con tu conocimiento!

Recuerda que la World Wide Web es una red global de servidores web y navegadores, y HTTP es el lenguaje que utilizan para comunicarse. HTTP se ha vuelto más rápido y eficiente con el tiempo, y estas mejoras hacen que la web sea más rápida y más confiable para todos nosotros. Espero que esta introducción te haya ayudado a comprender mejor cómo funciona este lenguaje de comunicación de la web. ¡Sigue explorando y aprendiendo sobre el emocionante mundo del desarrollo web!

Puedes consultar más en la web [MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)

