## Aplicacion mern - Documentacion 

FrontEnd

Paginas necesarias en el proyecto 

1 Todos los Albumes - HOME
2 Creacion de albumes 
3 show de un album 
4 edicion de un album 
5 Agregar cancion al album
------
1 login 
2 sign up

# descripcion de las paginas 

1 Todos los Albumes
- tiene que tener un recuadro con la lista de todos los albumes
- los albumes deben mostrar los siguientes campos 
      - titulo
      - detalle -> boton de ver el album
      - modificar -> boton de editar el album 

2 Creacion del album 
 El formulario de creacion debe tener los siguientes campos 
- Titulo 
- Artista
- Fecha de Lanzamiento
- Género 
- Número de pistas 




3 Show de un album 
Debe mostrar dos cards 
- en el card de la izquierda debe mostrar los siguientes datos 
    - Artista 
    - Fecha de lanzamiento
    - Género
    - Numero de Pistas

- en el card de la derecha debe mostrar lo siguiente:
    - una lista de todas las canciones (las que tienen nombre)
    (tener en cuenta lo siguiente en caso de que en el nunmero de pistas muestre 10 pero solo 5 canciones tienen nombre, se debe mostrar 5/10)

abajo de las dos cards debe haber un boton de eliminar album 
(debe remover el album de la base de datos y redireccionar al inicio)


4 edicion de un album 
div de la izquierda 
- debe mostrar el mismo formulario de la creacion, pre-rellenados con los datos del album 
- aceptar la edicion debe redireccionar al show del album

div de la derecha 
- tiene que tener un card con un titulo de "Agregar canción al álbum"
y que abajo este el boton de Agregar cancion que redireccione a la pagina 5



5 Agregar canccion al album 
- solo se puede acceder a esa pagina desde la edicion

tendra dos cards
card de la izquierda
- tendra un input de "titulo de la cancion" el cual solo sera un input de texto para agregar un nombre de cancion que se agregara al album seleccionado 
- abajo del input tipo texto habra un input de tipo submit para agregar la cancion a la lista de canciones del album 

card de la derecha 
- se mostrara una lista de todas las canciones agregadas (para eso se tendra en cuenta la cantidad de canciones que deberia tener el album y la cantidad de canciones con nombres que ya hay 
ej, se asigno que el album tiene 10 canciones, ya agregamos 5 nombres de canciones, entonces solo se pueden agregar 5 más)




backend



en el modelo de Albumes debe tener los siguientes datos 
- Titulo 
- Artista
- Fecha de Lanzamiento
- Género 
- Número de pistas
- nombre de las canciones 
- id del usuario que creo