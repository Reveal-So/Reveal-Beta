// Un objeto Resource tiene un método read que nos devuelve el Payload
interface Resource<Payload> {
  read: () => Payload;
}

// Y vamos a manejar tres posible estados, pendiente, exitoso y error
type status = "pending" | "success" | "error";

// createResource recibe una función asíncrona (asyncFn) que devuelve una
// promesa con el Payload del recurso que pasamos como tipo de dato
// el resultado de createResource es un objeto Resource cuyo método read
// es el mismo Payload que pasamos a createResource
function createResource<Payload>(
  asyncFn: () => Promise<Payload>
): Resource<Payload> {
  // empezamos definiendo que status es pending
  let status: status = "pending";
  // y creamos una variable para guardar el resultado de asyncFn
  let result: any;
  // después ejecutamos asyncFn de inmediato y guardamos la promesa
  const promise = asyncFn().then(
    (r: Payload) => {
      // cuando se resuelva exitosamente la promesa cambiamos el status
      // a que fue un éxito y guardamos el resultado 
      status = "success";
      result = r;
    },
    (e: Error) => {
      // si la promesa se resuelve con un error cambiamos el status a error
      // y guardamos el error como resultado
      status = "error";
      result = e;
    }
  );
  // luego devolvemos nuestro objeto Resource
  return {
    read(): Payload {
      // dentro de `read vamos verificar el status
      switch (status) {
        case "pending":
          // si está pendiente hacemos un throw de la promesa
          // hacienod esto React va a saber que nuestro componente no está
          // listo para renderizarse y lo va a suspender
          throw promise;
        case "error":
          // si el status es error hacemos un throw del error, esto permite
          // usar error boundaries para manejar el error
          throw result;
        case "success":
          // por último, si fue un éxito devolvemos el resultado
          return result;
      }
    },
  };
}

// Primero, vamos a crear una cache de recursos de imagenes, esto nos permite
// evitar volver a pedir una imagen que ya pedimos antes
const cache = new Map<string, any>();

// luego vamos a crear una función loadImage, esta función recibe como source
// la URL de la imagen y devuelve un Resource
function loadImage(source: string): Resource<string> {
  // lo primero que hacemos es obtener el recurso usando el source como ID
  let resource = cache.get(source);
  // y si existe lo devolvemos inmediatemente, evitando crear otro recurso
  if (resource) return resource;
  // pero si no existe creamos un nuevo recurso
  // but if it's not we create a new resource
  resource = createResource<string>(
    () =>
      // en nuestra asyncFn devolvemos una promesa
      new Promise((resolve, reject) => {
        // dentro vamos a crear una instancia de Image
        const img = new window.Image();
        // y vamos a definir el source como el atributo src
        img.src = source;
        // después vamos a escuchar el evento load y resolver la promesa pasando
        // el source como valor
        img.addEventListener("load", () => resolve(source));
        // y también escuchamos el evento error y rechazamos la promesa con un
        // error diciendo que falló la carga de la imagen y el source
        img.addEventListener("error", () =>
          reject(new Error(`Failed to load image ${source}`))
          
        );
      })
  );
  // antes del return, vamos a guardar el recurso en nuestra cache
  cache.set(source, resource);
  // y ahora si lo devolvemos
  return resource;
}
//React.ImgHTMLAttributes<HTMLImageElement>
export function SuspenseImage(
  props: any
): JSX.Element {
  //console.log("src",props.src);
  loadImage(props.src).read();
  return <img {...props}  />;
}