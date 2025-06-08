---
title: "Seis conceptos esenciales para entender la Inteligencia Artificial Generativa"
description: "Descubre de forma sencilla qué son los prompts, tokens, ventanas de contexto, alucinaciones y el aprendizaje en contexto en IA generativa. Aprende a dominar el lenguaje de la inteligencia artificial para aprovecharla mejor."
pubDate: 2025-05-15 
heroImage: '/src/assets/images/blog/hero/01.jpg'
imageAlt: 'Red abstracta de conexiones neuronales representando la inteligencia artificial'
tags: ["IA", "tops"] 
readingTime: 15
---

# Seis conceptos esenciales para entender la Inteligencia Artificial Generativa

La Inteligencia Artificial (IA) está transformando el mundo, y un avance como este viene siempre acompañado de un aluvión de nuevos términos, definiciones y (cómo no) anglicismos. Puede ser abrumador, pero dominar el vocabulario fundamental de la Inteligencia Artificial Generativa (IAG) no es tan complicado como parece.

En este post te explico cinco conceptos esenciales —de forma sencilla y con ejemplos prácticos— para que entiendas mejor cómo funcionan herramientas como ChatGPT, DALL·E o Gemini. ¿Listo para descubrir qué es un token, una ventana de contexto o una alucinación de la IA? ¡Vamos allá!

## 1. Inteligencia Artificial Generativa

Todos tenemos ya una idea más o menos vaga de lo que es la Inteligencia Artificial, pero entonces ¿qué es la Inteligencia Artificial Generativa (IAG), y en qué se diferencia de la IA *normal*? La IAG es un subtipo de IA diseñado para crear nuevos contenidos: textos, imágenes, vídeos, audios, código de programación, y mucho más. Lo logra tras haberse entrenado con cantidades masivas de datos, aprendiendo patrones y probabilidades que le permiten generar resultados originales.

**Inteligencia Artificial Generativa vs. Inteligencia Artificial Predictiva**  
Si decimos que la IAG es un subtipo de IA, será que hay más subtipos, ¿verdad?. ¡Efectivamente! No toda la IA es generativa. A diferencia de la IAG, que es capaz de *generar* resultados, existe la Inteligencia Artificial Predictiva, cuyo objetivo no es *crear* sino *clasificar* o *predecir* a partir de datos. Por ejemplo:
- Una IA predictiva puede analizar una foto de una planta y decirte qué especie es.
- Una IAG puede generar una imagen completamente nueva de una planta que no existe, inspirándose en millones de ejemplos.


## 2. ¿Qué es un *prompt* en Inteligencia Artificial Generativa?

El concepto de prompt va de la mano de la IAG. Si quieres que la IAG te genere algo, tendrás que pedírselo, ¿no? Un prompt es la petición o instrucción, una entrada (generalmente de texto) que es elaborada e introducida por el usuario para que la IA te devuelva un resultado. Llevándolo a la analogía con Internet y Google, un prompt para la IA es como tu búsqueda en Google introducida en la barra del buscador. Solo que el resultado no es algo que ha *encontrado* en internet, sino que lo ha *generado* en el momento, basado en el conocimiento que ha adquirido en su entrenamiento previo.

**La importancia de un buen prompt:**  
Un buen prompt puede ser la diferencia entre una respuesta inservible y una increíble. Hay toda una ciencia para escribir el prompt óptimo (literalmente, hasta está surgiendo una nueva profesión, la *ingeniería de prompts*). ¡Pero esto es tan importante que tendremos un post solo para hablar de los mejores prompts de IA!


## 3. ¿Qué significa *token* en IA?

Un token es una unidad mínima de información que la IA utiliza para procesar el lenguaje. Puede ser una palabra completa, un fragmento de palabra, un signo de puntuación o un espacio. 

Imagina que escribimos un prompt en ChatGPT, por ejemplo: *"¿Qué es lo que puede hacer la Inteligencia Artificial Generativa concretamente?"*. 
La IA inmediatamente troceará nuestro texto en tokens y a cada token le un identificador numérico basado en su frecuencia y relevancia.

Cada modelo, cada IA (ChatGPT, Gemini, Claude, DeepSeek, etc) tiene su propio modelo tokenizador, y además tokeniza de forma distinta cada idioma. Una palabra, aunque exista en dos idiomas, puede tener más peso o importancia en uno de ellos.

**¿Y en imágenes, audio o video?**
Cuando el contenido no es texto, el principio es similar:
- En audio, los tokens pueden representar fragmentos sonoros semánticos (como "voz femenina", "música de piano" o "rugido de león2") o acústicos (como un tono grave o un pitido).
- En imágenes, los modelos suelen dividirlas en pequeños parches de píxeles (por ejemplo, cuadrículas de 16x16 píxeles) para analizarlas como tokens visuales.
<!-- añadir figurea con imagen y audio toekinzado  --> 

**¿Por qué es importante?**  
De algún modo, los tokens son la estructura básica que el modelo de lenguaje utilizará para traducir nuestro lenguaje natural, a su lenguaje de computación. Para que la IA te entienda, tiene que traducir nuestro prompt desde nuestro lenguaje natural (en el que nos comunicamos los humanos, independientemente del idioma), en una secuencia de tokens que luego procesará.


## 4. Ventana de contexto

**¿Qué es?:**  
La ventana de contexto en una IAG es la cantidad máxima de información que la IA puede tener en cuenta al mismo tiempo para generar una respuesta. Es como la “memoria a corto plazo” de la IA: solo puede “ver” y procesar un número limitado de tokens a la vez. ¿Y cómo se sabe cuánta es esa cantidad? La unidad de medida ya la conocemos: en tokens. Cada modelo tiene una limitación de la cantidad de tokens que puede memorizar, y generar en cada respuesta.

**Para entenderlo mejor:**  
Imagina que estás hablando con alguien que solo puede recordar las últimas 20 frases de la conversación. Si le preguntas algo sobre lo que dijiste hace 30 frases, ya no lo recordará. Lo mismo le pasa a la IA: si le das un texto muy largo, solo podrá tener en cuenta la parte que cabe en su ventana de contexto.

Por ejemplo, si la ventana de contexto de un modelo es de 4000 tokens, solo podrá analizar y responder usando esos 4000 tokens más recientes. Si tu conversación o documento es más largo, la IA “olvidará” lo que queda fuera de ese límite.

**Por qué es importante:**  
La ventana de contexto determina cuánta información puede manejar la IA de una sola vez. Si necesitas que la IA tenga en cuenta muchos detalles o instrucciones, es importante que todo esté dentro de ese límite de tokens. Si te pasas, la IA puede perder información relevante y dar respuestas menos precisas o coherentes. Saber cuál es la ventana de contexto de un modelo te permitirá adaptarte y optimizar tus interacciones, quizá ahorrando tokens si es necesario o manteniendo reciente la información que quieres que el modelo recuerde.


## 5. *¿Qué es una alucinación en un modelo de IA?

En el contexto de la IAG, una alucinación es cuando la IA genera información incorrecta, inventada o que no existe en la realidad, aunque suene convincente o parezca verdadera. Es decir, la IA “se lo inventa” porque no encuentra datos suficientes o porque interpreta mal la información disponible.

**Veámoslo con un ejemplo:**  
Imagina que le preguntas a ChatGPT: “¿Quién ganó el Mundial de fútbol en 2023?” y la éste responde: “Lo ganó Brasil”, cuando en realidad no fue así. O le pides una cita famosa y te da una frase que suena real, pero ningún personaje histórico la dijo. En ambos casos, la IA está “alucinando”: te da una respuesta fabricada, no basada en hechos reales.

**Por qué es importante:**  
Las alucinaciones pueden llevar a errores graves si confiamos ciegamente en las respuestas de la IA, sobre todo en temas sensibles como salud, educación, finanzas, un tema legal... Por eso, nunca hay que dar por sentado que la información que la IA proporciona es verdadera, y contrastar la información obtenida.

<!--- Poner una captura de un chat o una imagen--->

## 6. Aprendizaje en Contexto (*In-Context Learning*)

Este último término es algo más avanzado pero igualmente importante. El aprendizaje en contexto es la capacidad que tienen los modelos de IAG para aprender de la información que se les proporciona directamente en una conversación o interacción, sin necesidad de ser reentrenados. El modelo adapta sus respuestas basándose únicamente en los datos que recibe en el momento, dentro de su ventana de contexto.

**Ejemplo sencillo:**  
Imagina que quieres que una IA te hable como si fuera un chef experto en cocina italiana. No necesitas modificar su entrenamiento. Basta con darle un prompt como: *"Actúa como un chef italiano especializado en cocina tradicional. Responde a todas mis preguntas sobre recetas como si fueras uno"*. Desde ese momento, aunque la IA no haya sido programada explícitamente para ser chef, se comportará como uno dentro de esa conversación.

<!-- representer el ejemplo del cocinero quizá, o hacer uno mejor -->

**¿Por qué es importante?**  
Gracias al Aprendizaje en Contexto, las IAGs son extremadamente versátiles. Puedes personalizar sus respuestas, adaptarlas a diferentes estilos, tonos o tareas, simplemente dándoles ejemplos o instrucciones dentro del propio prompt, sin necesidad de reentrenarlas. De hecho cada vez más modelos te permiten personalizar la *personalidad* del chat con el que hablas, e incluso pueden recordar información o conversaciones más allá de la ventana de contexto. Esto es lo que se conoce como *memoria*, pero eso ya lo veremos en otro post!

---

## Conclusión

La Inteligencia Artificial Generativa ha traído consigo un nuevo universo de posibilidades… y también un nuevo lenguaje que aprender.  
Entender conceptos como prompt, token, ventana de contexto, alucinación o aprendizaje en contexto es como aprender las reglas de un nuevo idioma: cuanto más las interiorices, más podrás construir con ellas. Realmente una vez las conoces, ves son reglas bastante intuitivas, pero poderosas que te ayudarán a usar mejor estas herramientas, y a aprovchar todo su potencial.

Aprender este lenguaje te da un superpoder: usar la IA de manera consciente, creativa y potente.

---

## ¿Seguimos aprendiendo juntos?

¿Te ha resultado útil esta guía de conceptos?  
Te invito a seguir explorando el mundo de la IA conmigo. Suscríbete al blog para no perderte los próximos posts, donde aprenderemos a escribir mejores prompts, descubrir nuevos modelos de IA y sacarles todo el partido de manera práctica y humana.

<!-- Call to action a mi newsletter -->