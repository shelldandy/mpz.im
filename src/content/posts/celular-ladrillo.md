---
author: mike3run
comments: true
date: 2015-03-02 16:15:33+00:00
layout: Post
link: http://www.miguel.click/blog/2015/03/02/converti-mi-celular-en-un-ladrillo-y-lo-regrese-a-la-vida/
slug: converti-mi-celular-en-un-ladrillo-y-lo-regrese-a-la-vida
title: Convertí mi celular en un ladrillo… y lo regresé a la vida
wordpress_id: 11297
categories:
- Article
---

Acabo de vivir una serie de situaciones de muy alto estrés geek, pero ciertamente han sido de mucho aprendizaje. En pocas palabras mi One sufrió un “Hard Brick” o “Ladrillo Duro” en el sentido de lo que le pasó. Permítanme contarles la historia.


## El inicio del fin…


Todo comenzó hace 2 días cuando [MKBHD](https://www.youtube.com/user/marquesbrownlee) subió un video nuevo a su canal hablando del OnePlus One y Cyanogenmod 12…

https://www.youtube.com/watch?v=UUBDiUy2824

Luego de ver el video me entró la emoción y recordé mi experiencia con Lollipop en mi One a finales de Enero. Pero por cuestiones logísticas decidí regresar a KitKat por el tema de la batería y algunos módulos de Xposed.
Sin embargo, en el vídeo fue mencionado que si instalaba también el Kernel de Franco el rendimiento del celular se volvía on-point lo cual sonó bastante adecuado. Así que claro, instalé CM12 obvio haciendo un backup en TWRP antes.


## Las tristezas


Mala fue mi sorpresa al ver que en CM12 mi celular se estaba calentando mucho todo el tiempo y en general mi tiempo de pantalla encendida (SOT) me estaba durando como 4 horas, cosa que antes era 6 o más sin complicaciones.
Por lo tanto pues como chico listo que hizo su backup decidí regresar a CM11s en un solo click y todo funcionó correctamente… Excepto por una cosa…
Pude notar que mi logo de inicio al arrancar el celular había vuelto al stock de OnePlus lo cual no me gustó mucho pues a finales de Enero le había flasheado uno personalizado muy minimalista y elegante que incluso compartí en [Instagram](https://instagram.com/p/yh5l51Lq4T/)

http://instagram.com/p/yh5l51Lq4T/



-Pues estuvo super fácil instalarlo, quien sabe por que se quitó pero se lo pongo de nuevo antes de irme a hacer ejercicio y en lo que se reinicia me camino al gym… - pensé de manera inocente.

Tomé mi One lo conecté por USB a mi Mac, abrí mi Terminal pusé el celular en modo Fastboot y le flashee el nuevo boot logo. Noté algo moderadamente diferente en el modo fastboot de mi celular pero pues equis somos chavos…

    
    <code>./fastboot flash LOGO logo.bin
    </code>


Listo. Ahora solo me queda escribir…

    
    <code>./fastboot reboot
    </code>


-Y listo- pensé…


## La tensión


-OK, celular ya quedó todo, ya puedes prenderte…
*Pausa incómoda, la pantalla no prende… :(
-Creo que ya pasó mucho rato, porque no prende…
-OK chance y no detectó bien el comando

    
    <code>./fastboot reboot
    
    *No devices attached*
    </code>


-No mamar… ¿¿¿¿qué está pasando???? Bueno vamos a ponerlo en modo recovery y ya restauro otra vez… _No pasa nada…_
-Holy fuck!!! Y que tal si lo pongo en fastboot forzado?? Venga! Encendido+Volúmen Arriba… _No pasa nada_
-WTF!! Que pasa si dejo apretado el botón de encendido mucho mucho tiempo… _Luego de 20 largos segundos el celular emite una débil vibración pero la pantalla no enciende y no pasa nada…_

Era como sentir el corazón moribundo de mi celular en mis manos. No podía creer que me estuviera pasando eso, si no había chance de error o si?
Una rápida búsqueda en xdadevelopers me arrojó la siguiente situación:

    
    <code>Hardware brick
    A hardware bricked OPO has nothing but a black screen (nothing ever comes on the screen, not even a boot logo), it might vibrate when a power button is pressed and held for 20 seconds, has no Recovery partition, no adb mode, and no fastboot partition. The device might be detected in Linux and you might be able to even send commands to it. In Windows, the bricked OPO should be detected as QHSUSB_BULK USB. You might have a bricked OPO as a result of flashing a kernel meant for a different device (or a ROM meant for another device that included a kernel), tinkering with the boot logo or bootloader, or your attempt of unlocking the bootloader resulted in corrupting the boot partition.
    </code>


-No puede ser! En verdad acabo de matar a mi One sniff… Lo conseguí convertí un equipo de última generación maravilla moderna en un sucio pisapapeles de $6,500, wau…

Pero aún seguía sin entender que había causado que mi celular cayese en ese estado tan deplorable, si nos ponemos a pensar no hice nada que no hubiese hecho en el pasado, ¿o si? me metí a la página de XdaDevelopers nuevamente [justo en el tópico de la animación minimalista](http://forum.xda-developers.com/oneplus-one/themes-apps/bootlogo-bootanimation-one-t2886047) y para mi horror leo justo lo que me temía…

![Oh, snap](http://cloud.miguel.click/image/3E0936121p2v/Captura%20de%20pantalla%202015-03-02%20a%20las%200.51.20.png)

Ahora había aprendido a la mala algo: Aunque había hecho un restore con mi Backup a CM11 parecía ser que el hecho de haber actualizado en un inicio actualizó en si mismo la arquitectura del fastboot. Osea aunque mi One había vuelto a su estado original, su verdadero corazón era ahora CM12 haciendo que lo que le flashee fuese efectivamente lo mismo que tomar una pistola y dispararle a quemarropa…


## Piensa, piensa, piensa…


-OK, estoy en un lío, creo que no me sirve de nada ponerme a llorar. Me relajaré escuchando un poco de música… Ah ya no puedo. Bueno investigo que hacer rápidamente… Chin tampoco puedo. Debo al menos avisar que estoy sin celular… Solo por Telegram, damn. Bueno mejor me apuro…
Luego de andar pensando un rato se me ocurrió que seguramente este tipo de situaciones aunque son muy precarias, seguro les pasó a algunos otros desarrolladores y por lo mismo algo ha de haber en internet que me ayude a salir de mi precaria situación, por lo que me dirijo primero a los foros de OnePlus para buscar ayuda en el tema de un briqueo duro.
Luego de unos momentos [llegué a un tópico prometedor](https://forums.oneplus.net/threads/solution-how-i-recovered-my-oneplus-one-from-hard-brick.184927/) y decidí leerlo con cuidado.

Aparentemente existe una última barrera de comunicación entre la computadora y el One que va más allá del fastboot (yo solía creer que esa era ya de a deveras The Last Frontier, pero no), la última barrera se comunica de manera directa con el procesador Qualcomm, es decir literalmente hablándole al corazón o cerebro del celular como lo quieran ver.
Esto es una herramienta de desarrolladores, y como el celular es chino pues obviamente estaba en chino e integrado al ROM que usan allá llamado Color OS muy distinto al CyanogenMod que tenemos acá.

Como fuera necesitaba Windows cosa que no tenía pero como si tengo una licencia válida de Windows 8.1 y de Parallels Desktop pues me puse a instalarlos a lo loco en mi iMac. Mientras eso ocurría investigué más y encontré en XDA-Developers [una herramienta](http://forum.xda-developers.com/oneplus-one/general/tool-oneplusrecovery-tool-v1-0-restore-t2991851/) que sirve precisamente para automatizar el proceso que leí en los foros de OnePlus incluso en 20% inglés (que es un gran avance contra 0% jaja) eso complementado con [los drivers para que la computadora se conectase al célular.](https://www.dropbox.com/s/vgujdut93m341qm/Qualcomm%202012.rar?dl=0)

Pero ahora había otro problema: aunque si detectaba el chip la computadora no podía comunicarse realmente con él pues resulta que Windows 7 para arriba bloquean la instalación de drivers desconocidos cosa que se semi-soluciona con este procedimiento que [**enlazo aquí**](http://www.howtogeek.com/167723/how-to-disable-driver-signature-verification-on-64-bit-windows-8.1-so-that-you-can-install-unsigned-drivers/).
Una vez logrado eso debemos abrir la terminal de Windows (cmd.exe) en modo de Administrador y ejecutar los siguiente 2 comandos en orden y reiniciar la computadora una vez más.

    
    <code>bcdedit.exe -set loadoptions DDISABLE_INTEGRITY_CHECKS
    
    bcdedit.exe -set TESTSIGNING ON
    </code>


Ahora si la herramienta descargada pudo reconocer mi celular y en cuestión de minutos estaba de vuelta con CyanogenMod 11s - 44s. Por lo que instantes después se actualizó a la 05Q y ya ahí procedí a rootear y ya de una vez flashear bien mi logo minimalista.

En fin, espero les haya gustado la historia. Ahora saben que a menos que se rompa su entrada USB o procesador practicamente siempre se puede rescatar un OnePlus One, oda a los Geeks. No se si se pueda algo así de complejo en un Samsung o cualquier otro Android, ya ni de chiste digo iPhone porque pues no.

Never Settle.
