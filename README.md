Buscador de Wikipedia 

Una app web que permite buscar términos en Wikipedia usando la API de MediaWiki. Los resultados aparecen en la misma página y, además, el término buscado se almacena en una base de datos MySQL para hacer un seguimiento de las búsquedas. La app está hecha con HTML5, CSS3, JavaScript y PHP. 

Features 

- Búsqueda de términos en Wikipedia a través de la API pública. 
- Muestra de los resultados de forma sencilla y legible. 
- Persistencia de la búsqueda en base de datos MySQL. 
- Implementación de consultas preparadas en PHP (con PDO) para evitar la inyección de SQL. 

Requirements 

- [XAMPP](https://www. apachefriends.org/index. html) (junto a Apache y MySQL) configurado en tu local. 
- Navegador web actual (como Chrome, Firefox, y similares). 

Organización del proyecto 

La organización recomendada de las carpetas es la siguiente:

Wikipedia-Seeker/ 
├── index.html 
├── css/ 
│ └── style.css 
├── js/ 
│ └── main.js 
└── php/ 
    └── save_results.php
    └── config.php

Instalación y Configuración 

1. Clonar el proyecto en tu local. 

2. Ubicar el proyecto en XAMPP: 
- Mueve la carpeta del proyecto y colócala dentro de la carpeta `htdocs` de XAMPP. 
- En macOS: 
`/Applications/XAMPP/htdocs/` 
- En Windows: 
`C:\xampp\htdocs\` 

3. Configurar la base de datos: 
- Abre [phpMyAdmin](http://localhost/phpmyadmin) en el navegador. 
- Crea una nueva base de datos, por ejemplo, `seeker_db`. 
- Lanza la siguiente consulta SQL para crear la tabla que guardará las búsquedas: 
```sql 
CREATE TABLE search_history ( 
id INT AUTO_INCREMENT PRIMARY KEY, 
term VARCHAR(255) NOT NULL, 
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
); 
``` 

4. Preparar la conexión a la base de datos: 
- Abre el archivo `php/config. php` y confirma que las credenciales coincidan con las de tu XAMPP.
- Este archivo crea la conexión a la base de datos usando PDO y emplea consultas preparadas, lo que evita la inyección de SQL. 

5. Ejecutar el proyecto: 
- Abre el Panel de Control de XAMPP y verifica que los servicios Apache y MySQL estén funcionando. 
- Abre tu navegador y dirígete a: 
`http://localhost/nombre-proyecto/` 
(Asegúrate de utilizar el nombre correcto de la carpeta del proyecto). 

Uso 

- Escribe una palabra de búsqueda en el espacio de texto y pulsa el botón (🔍). 
- La aplicación hará una llamada a la API de Wikipedia y presentará los resultados en la misma ventana. 
- La búsqueda pasa por `php/save_results. php` y se almacenará en la tabla `search_history`. 
