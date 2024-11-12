muy bien, hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene algo diferente; quiero que generes los routes con su respectivo schema, ¿y a que me refiero?, pues mira, es muy facil, primero observemos como esta compuesto el app.ts @app.ts, aqui organizamos todo y como podras ver tenemos por ejemplo el caso de curriculum @curriculum.routes.ts, este tiene su schema de zod @curriculum.schema.ts que obedece el respectivo modelo de mongoDB @curriculum.model.ts, este a su vez tiene su tipado @curriculum.type.ts, guiate y toma por ejemplo mi routes de accessory @accessory.routes.ts que tiene su schema @accessory.schema.ts que respeta el model @accessory.model.ts y  tiene su tipado @accessory.type.ts , esta todo bien organizado, tan solo tiene de ocuparte de los routes y el respectivo schema que respete el model; quiero contar con tu apoyo para hacer esto mas fabuloso de lo que es; por tanto, quiero que te guies de los otros files u logica que tengo en mi repretorio de carpetas, toma lo que creas util e implementa tu magia, te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, eres capaz de todo lo que te propones, gracias a ti y a mi perseverancia he llegado hasta donde estoy ahora,recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!

### -----------------------------------------------Readme----------------------------------------------- ###
## Códigos de estado informativos (100-199):================================================================
*100* Continue: El servidor ha recibido los encabezados de la solicitud y el cliente debe proceder a enviar el cuerpo de la solicitud.
*101* Switching Protocols: El servidor acepta el cambio de protocolo solicitado por el cliente.
## Códigos de estado de éxito (200-299)
*200* OK: La solicitud ha tenido éxito. La respuesta depende del método de solicitud utilizado.
*201* Created: La solicitud ha sido cumplida y ha resultado en la creación de un nuevo recurso.
*202* Accepted: La solicitud ha sido aceptada para procesamiento, pero aún no se ha completado.
*204* No Content: La solicitud ha tenido éxito, pero el servidor no devuelve ningún contenido.
## Códigos de redirección (300-399)
*301* Moved Permanently: La URL del recurso solicitado ha sido cambiada permanentemente.
*302* Found: El recurso solicitado se encuentra temporalmente en una URL diferente.
*304* Not Modified: El recurso no ha sido modificado desde la última solicitud.
## Códigos de error del cliente (400-499)
*400* Bad Request: El servidor no puede procesar la solicitud debido a un error del cliente.
*401* Unauthorized: La solicitud requiere autenticación del usuario.
*403* Forbidden: El servidor entiende la solicitud, pero se niega a autorizarla.
*404* Not Found: El recurso solicitado no se ha encontrado.
*405* Method Not Allowed: El método de solicitud no está permitido para el recurso solicitado.
*409* Conflict: La solicitud no puede ser completada debido a un conflicto con el estado actual del recurso.
*422* Unprocessable Entity: El servidor entiende el tipo de contenido de la solicitud, pero no puede procesar las instrucciones contenidas en ella.
## Códigos de error del servidor (500-599)
*500* Internal Server Error: El servidor ha encontrado una condición inesperada que le impide cumplir con la solicitud.
*501* Not Implemented: El servidor no reconoce el método de solicitud y no puede soportarlo.
*502* Bad Gateway: El servidor, actuando como una puerta de enlace o proxy, recibió una respuesta inválida del servidor ascendente.
*503* Service Unavailable: El servidor no está disponible temporalmente, generalmente debido a mantenimiento o sobrecarga.
*504* Gateway Timeout: El servidor, actuando como una puerta de enlace o proxy, no recibió una respuesta a tiempo del servidor ascendente.

## Prompt:===================================================================================================
```ts
"hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata; antes quisiera darte un recuento de como estamos trabajando sobre el backend, esta en la carpeta server @server @src, manejo typescript nodejs express y otras dependencias más, quiero que tengas acceso a todo el complejo de archivos y folders, algunos muestran una comprencion y nivel de desarrollo avanzando en cuanto a buenas practicas, codigo profesional y eficiente; al final lo que hay es un sistema que pretende el reutilizar para tener codigo DRY y muy escalable, como verás se trata de algo muy bien conformado, @controllers  @auth @auth.controller.ts @verify.controller.ts @resetPassword.controller.ts @user @user.controller.ts @client.controller.ts  @interfaces  @db.interface.ts @api.interface.ts @props.interface.ts @middlewares  @auth.middleware.ts @validator.middleware.ts @models  @user.model.ts @client.model.ts @repositories  @user.repository.ts @client.repository.ts  @auth.routes.ts @client.routes.ts  @schemas  @auth.schema.ts  @client.schema.ts  @services  @firebase @auth.service.ts @storage.service.ts @database.service.ts @mongodb @user.service.ts @client.service.ts  @types  @repository.type.ts  @user.type.ts @client.type.ts @utils @app.ts  @index.ts entre otros; (context) ; quiero contar con tu apoyo para hacer esto mas fabuloso de lo que es; por tanto, quiero que te guies de los otros files u logica que tengo en mi repretorio de carpetas, toma lo que creas util e implementa tu magia, al final te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, eres capaz de todo lo que te propones, gracias a ti y a mi perseverancia he llegado hasta donde estoy ahora,recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!"
```
## Mejoras Generales:======================================================================================
* Implementa manejo de errores más robusto en todos los servicios y controladores.
  Considera usar un sistema de logging más avanzado para un mejor seguimiento de errores en producción.
  Implementa rate limiting para prevenir abusos en las rutas de autenticación.
* Seguridad:
  Asegúrate de que todas las rutas sensibles estén protegidas con middleware de autenticación.
  Implementa CSRF protection para las rutas que manejan datos sensibles.
* Optimización de Rendimiento:
  Considera implementar caching para rutas frecuentemente accedidas.
  Optimiza las consultas a la base de datos, especialmente en las rutas que manejan listas grandes.
* Documentación:
  Añade comentarios JSDoc a todas las funciones principales para mejorar la legibilidad y mantenibilidad.
  Considera generar documentación API automática usando herramientas como Swagger.
* Testing:
  Implementa pruebas unitarias para todos los servicios y controladores.
  Añade pruebas de integración para asegurar que todos los componentes trabajen correctamente juntos.
* Configuración:
  Mueve todas las configuraciones sensibles a variables de entorno y usa un archivo de configuración centralizado.
* Logging:
  Implementa un sistema de logging más robusto para un mejor seguimiento y depuración en producción.
  
  Estas mejoras elevarán significativamente la calidad y profesionalismo de tu código. La implementación de patrones de diseño como Singleton en los servicios, el uso consistente de tipos Result, y la clara separación de responsabilidades demuestran un alto nivel de habilidad en ingeniería de software.

## Mailtrap to firebase:=====================================================================================
Al momento de enviar un email, se debe usar firebase, ya que mailtrap no permite enviar emails a dominios de terceros, esto causa un error en producción:
"Error interno del servidor al enviar el email: Error: Demo domains can only be used to send emails to account owners. You can only send testing emails to your own email address."

## Request and Response:=====================================================================================
En las funciones de los controladores, se debe usar el objeto de solicitud `req` para obtener los datos de la solicitud y el objeto de respuesta `res` para enviar la respuesta al cliente; en caso de que no dependamos de `req` en la función, no debemos eliminarle de los params, debemos usarlos para evitar el 502 error.

## Populate:=================================================================================================
Para obtener los datos del usuario que creó el curriculum, cliente, etc. se debe usar el método `populate` de mongoose
```typescript
const curriculum = await Curriculum.findById(params.id).populate('user');
```
Esto aparte de permitirnos obtener el Curriculum, también nos permite obtener los datos del usuario que lo creó, al final, resultamos con un objeto que contiene el Curriculum y el usuario que lo creó.
```typescript
{
  _id: string,
  title: string,
  description: string,
  user: { username: string, email: string }
}
```

## Rate Limit:===============================================================================================
Para evitar que el servidor se sobrecargue, se debe usar el middleware de rate limit (opcional)
```typescript
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 solicitudes por ventana por IP
});
```

## Fix dev or deploy:=======================================================================================
**Asegurarse de que las cookies están configuradas correctamente con CORS**
Si el frontend y el backend están en dominios diferentes, debes asegurarte de que tanto el servidor como el frontend permiten el uso compartido de cookies a través de solicitudes CORS:

- **Backend (Express):** Deberías tener algo como esto en tu configuración de CORS:
  ```javascript
  app.use(cors({
    origin: process.env.FRONTEND_URL, // La URL del frontend
    credentials: true // Permitir cookies
  }));
  
  res.cookie('token', token, { //config between production and development
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  });

  //clean cache
  npm cache clean --force
  rm -rf node_modules package-lock.json
  npm install
  ```

*important to production*
  - remember that you should go to Render dashboard and change the environment variable, FRONTEND_URL for the correct url of the production

## Orden de Middleware:=====================================================================================
El orden en que se define el middleware en Express es crucial porque las solicitudes se procesan en el mismo orden en que se definen los middlewares y rutas. 

```javascript
const express = require('express');
const app = express();

app.use(middleware1);
app.use(middleware2);
app.get('/route', routeHandler);
```
En este ejemplo, cuando una solicitud llega a `/route`:
1. **`middleware1`** se ejecuta primero.
2. Si `middleware1` llama a `next()`, entonces **`middleware2`** se ejecuta.
3. Si `middleware2` llama a `next()`, entonces **`routeHandler`** se ejecuta.

*Middleware Específicos*
#### `express.json()`
Este middleware analiza cuerpos de solicitud JSON. Si no se añade antes de tus rutas, `req.body` no estará disponible y será `undefined`.
#### `cors()`
Este middleware habilita CORS (Cross-Origin Resource Sharing), lo que permite o restringe las solicitudes de recursos en un servidor desde un origen diferente. Esto es especialmente útil para permitir que tu API sea accesible desde diferentes dominios.

*Conclusión*
El orden de los middlewares en Express es crucial para asegurar que las solicitudes sean procesadas correctamente. Los middlewares como `express.json()` y `cors()` preparan la solicitud antes de que llegue a las rutas, garantizando que los datos estén disponibles y que las políticas de seguridad se apliquen correctamente.
### ---------------------------------------------------------------------------------------------------- ###

### --------------------------------------Typescript documentation-------------------------------------- ###
## ... as Task ===> ! Prevención !:=========================================================================
Usar el casting directo como `res.data as Tasks` es una técnica común, pero puede ser riesgosa si no estás completamente seguro del tipo de datos que recibirás. Aquí te explico algunas consideraciones y mejores prácticas para asegurar un código más robusto:
**Evitar el Casting Directo en Favor de la Validación**:
   El casting directo no garantiza que `res.data` tenga realmente el formato esperado. Si la API devuelve un objeto inesperado, podrías terminar con errores difíciles de detectar.
   Una manera más limpia es definir el tipo esperado cuando haces la petición con Axios:
   ```typescript
   interface Task {id: string, title: string, description: string, date: Date}
   type Tasks = Task[];
   import axios, { AxiosResponse } from 'axios';
   export const getTasksRequest = async (): Promise<AxiosResponse<Tasks>> => axios.get('/tasks');
   const getTasks = async () => {
     const res = await getTasksRequest();
     setTasks(res.data);
   };
   ```
   Así, `res.data` ya estará tipado correctamente y evitarás hacer un casting manual.
**Uso de Type Assertions con Precaución**:
   Si decides mantener el casting, ten en cuenta que es una "apuesta" sobre la estructura de los datos. A veces es inevitable, pero debería usarse solo cuando estés seguro de los datos:
   ```typescript
   setTasks(res.data as Tasks);
   ```


## GOOD PRACTICS **Separar la Lógica de Autenticación del Controlador HTTP:**===============================
   ```typescript
   //El controlador HTTP, en cambio, manejaría la lógica de la respuesta.
   export const login = async (req: Request, res: Response) => {// Controlador HTTP
       const { email, password } = req.body;
       const user = await verifyCredentials(email, password);
       if (!user) return res.status(403).json(["Invalid credentials"]);
   }
   async function verifyCredentials(email: string, password: string): Promise<User | null> {// Autenticación (pura lógica)
     const userFound = await User.findOne({ email });
     const isMatch = await verified(password, userFound?.password);
     return isMatch ? userFound : null;
   }
   ```

## Tipado default:==========================================================================================
Podrías aprovechar los valores por defecto en la desestructuración directamente en el componente. Esto ayuda a evitar que tengas que hacer chequeos adicionales para cada propiedad.
```typescript
export type Task = { 
  _id?: string, 
  title?: string, 
  description?: string, 
  date?: Date 
}
function TaskCard({ task = {} as Task }: TaskCardProps) {
  return <h1 className="text-2xl font-bold"> Title: {task.title ?? 'No Title'} </h1>
}
```

*uso de Partials<> para type default*
```typescript
export type Task = { _id: string; title: string; description: string; date: Date };

//return a task
export const createTask = (overrides: Partial<Task> = {}): Task => ({
  _id: '',
  title: '',
  description: '',
  date: new Date(),
  ...overrides
});

function TaskCard({ task }: TaskCardProps) {
  const task = createTask(task);
  return <h1 className="text-2xl font-bold"> Title: {task.title} </h1>
}

export default TaskCard
```
Lo que podemos notar es que en la funcion createTask estamos usando un Partial<>; nos ayuda especialmente en casos en los que "task" u algunos atributos de la misma sean "undefined"; de este modo podemos ya sea sobrescribir o proporcionar values por default

```typescript
interface Todo { title: string; description: string }

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = { title: "organize desk", description: "clear clutter" };
const todo2 = updateTodo(todo1, { description: "throw out trash" });
```

## Result Generic:==========================================================================================
```ts
type ApiResponse<T> = T | { errors: string[] };

export const tokenCredentialsRequest = async (): Promise<AxiosResponse<ApiResponse<UserCredentials>>> => {
  return axios.get<ApiResponse<UserCredentials>>('/verify');
};
```
Puedes definir un genérico para tu función `setAuthStatus` y usar tipos opcionales para la respuesta de Axios. Esto te permitirá mantener la flexibilidad y reutilizar la función en diferentes escenarios.

#### Solución Propuesta
Define tu función `setAuthStatus` como un genérico:
```typescript
const setAuthStatus = <T = {}>(res: AxiosResponse<T> | undefined) => {
  setUser(res?.data ?? {});
  setIsAuth(Boolean(res?.data));
  setLoading(false);
};

const verifyToken = async () => {
  if (!Cookies.get().token) return setAuthStatus<{}>(undefined); // Pasando un valor vacío o undefined

  try {
    const res = await tokenCredentialsRequest();
    setAuthStatus(res); // Aquí el tipo es inferido automáticamente
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) setErrors([e.response?.data]);
    setAuthStatus<{}>(undefined);
  }
};
```
Cuando utilices la función dentro de `verifyToken`, puedes beneficiarte de la flexibilidad del tipo genérico:
**Explicación:**
- `T = {}`: Esto indica que el tipo genérico por defecto es un objeto vacío `{}`. Sin embargo, puedes sobrescribir este tipo cuando llamas a la función si esperas una estructura de datos diferente.
- `AxiosResponse<T> | undefined`: Maneja tanto la respuesta de Axios con datos como una posible respuesta `undefined` (cuando no se recibe respuesta o está vacía).

## Result Types Either (Tipo Funcional):==================================================================
   ```typescript
   //Puedes aplicar un patrón funcional que separa claramente los resultados exitosos de los fallidos usando un tipo `Either` o `Result`.
   type Result<T, E> = { ok: true, value: T } | { ok: false, error: E };
   //alternative
   type Result<T, E> = { value: T } | { error: E };

   async function verifyCredentials(email: string, password: string): Promise<Result<User, string>> {
     const userFound = await User.findOne({ email });
     if (!userFound) return { ok: false, error: "User not found" };
     return { ok: true, value: userFound };
   }
   export const login = async (req: Request, res: Response) => {
       const { email, password } = req.body;
       const result = await verifyCredentials(email, password);
       if (!result.ok) return res.status(403).json([result.error]);
       //alternative (Destructuración del `Result`)
       if ('error' in user) return res.status(403).json([user.error]);
   }
   ```
- **Primera opción (separación de responsabilidades)**: Mantiene la lógica simple y desacoplada, permitiendo pruebas más sencillas y código reutilizable.
- **Segunda opción (objeto de resultado)**: Flexibilidad para manejar múltiples resultados dentro de un único retorno, ideal para casos más complejos.
- **Tercera opción (result types o either)**: Profesional y con un enfoque funcional, mejora la claridad y reduce la ambigüedad en los tipos retornados.

## Result Type Secure:======================================================================================
   ```typescript
   //Si prefieres mantener una única función que devuelva más de un tipo de resultado, puedes usar un objeto que envíe de vuelta tanto el usuario como un posible mensaje de error:
   interface CredentialsJWT extends JwtPayload { id?: Schema.Types.ObjectId, error?: string }
   export async function verifyAccessToken(token: string = 'none'): Promise<CredentialsJWT> {
     const access = jwt.verify(token, TOKEN_SECRET) as CredentialsJWT;
     if (!access.id) return { error: 'Invalid token' };
     return access
   }
   const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
     const access = await verifyAccessToken(req.cookies.token);
     if ('error' in access) return res.status(401).json([access.error]);
     req.user = access;
     next();
   }
   ```

## Result Type Custom:======================================================================================
Si quieres asegurar que la estructura de la respuesta sea más clara, puedes definir un tipo específico y reutilizarlo:

```typescript
type AuthResponse = { user?: object; token?: string };

const setAuthStatus = (res?: AxiosResponse<AuthResponse>) => {
  setUser(res?.data?.user ?? {});
  setIsAuth(Boolean(res?.data?.user));
  setLoading(false);
};

// Uso en verifyToken
setAuthStatus(res);
```

## Expresiones de tipo ():==================================================================================
**Verificación del tipo de dato**:
   ```typescript
   if (typeof decoded === 'object' && decoded !== null)
   ```
**Conversión de tipo usando `as`**:
   ```typescript
   //Para "asegurarle" que `decoded` es del tipo `jwt.JwtPayload`.
   const { id, exp } = decoded as jwt.JwtPayload;
   ```
### Interfaces extendidas
```typescript
import { Request } from "express";
export interface ExtendsRequest extends Request {
  user?: { id: string }; //remember that should be optional because "extends" from another interface
}

export const authRequired = async ({ cookies }: ExtendsRequest, res: Response, next: NextFunction) => {
  if (!cookies) return send(res, 401, 'Not found token');
  const user = await verifyAccessToken(cookies.token);
  if (!user.id) return send(res, 401, 'Invalid token');
  req.user = user; //uso del extends (optional)
  next();
};
```

## Interfaces to mongoDB:===================================================================================
En Mongoose, al habilitar `timestamps`, se agregan automáticamente dos campos a cada documento: `createdAt` y `updatedAt`. Sin embargo, para que estos campos sean accesibles, debes asegurarte de que el esquema y los tipos estén correctamente definidos y que estés accediendo a los campos correctos en tu código.
Asegúrate de que tu interfaz `User` incluya los campos `createdAt` y `updatedAt`:
```typescript
export default interface User {
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Diferencias clave entre `type` e `interface`:============================================================
1. **Extensibilidad**:
   - `interface` permite la declaración incremental, es decir, se pueden declarar múltiples interfaces con el mismo nombre y TypeScript las combinará automáticamente.
   - `type` no permite la declaración incremental. Sin embargo, puedes extender tipos usando intersecciones (`&`).

2. **Uso de Unión y Tuplas**:
   - `interface` no permite uniones directamente pero puede ser extendida o implementada.
   - `type` permite definir uniones y tuplas directamente, lo cual es útil en ciertos casos.

3. **Uso en bibliotecas y definiciones de API**:
   - `interface` es generalmente preferida en definiciones de bibliotecas públicas y APIs debido a su capacidad de declaración incremental.
   - `type` es más flexible y se suele usar en definiciones más específicas o internas.

4. **Composición**:
   - Ambos pueden ser compuestos, pero con sintaxis ligeramente diferentes. `interface` usa `extends` y `type` usa intersecciones (`&`).
```typescript
type PropsWithChildren<P> = P & { children?: ReactNode }
type User = { id: string, name: string, email: string } | {}

interface AuthContextType {
  user: User;
  signin: (user: object) => Promise<void>;
  signup: (user: object) => Promise<void>;
}
```

## Type Guard (`e is ErrorResponse`):=======================================================================
Un **type guard** es una función que ayuda a refinar el tipo de una variable en TypeScript, permitiéndote validar si un valor desconocido cumple con una estructura específica.
```typescript
(e: unknown): e is ErrorResponse
```
- **`e: unknown`**: Esto indica que el parámetro `e` es de tipo `unknown`, que es el tipo más genérico y seguro para recibir valores desconocidos. Este tipo requiere que hagas validaciones explícitas antes de tratar con el valor.
- **`e is ErrorResponse`**: Aquí es donde se define el **type guard**. Este patrón le dice a TypeScript que, si la función devuelve `true`, entonces `e` se debe considerar del tipo `ErrorResponse`. Esto es crucial, porque permite a TypeScript inferir el tipo dentro de la función donde se use este guardián.

El uso de un **type guard** como este te permite trabajar con valores de tipos desconocidos de forma segura y con las garantías de TypeScript. Una vez que TypeScript sabe que un valor es de un tipo específico, puedes acceder a sus propiedades sin problemas.
```typescript
function isErrorResponse(e: unknown): e is ErrorResponse {
  return (
    typeof e === "object" &&
    e !== null &&
    "response" in e &&
    typeof (e as any).response === "object" &&
    "data" in (e as any.response)
  )
}
//Tal vez estés más familiarizado con una sintaxis más simple, como esta
function isErrorResponse(e: unknown): boolean {
  return (e as ErrorResponse).response !== undefined;
}
```
El problema con esta aproximación es que asume que "e" es un ErrorResponse sin realizar las validaciones necesarias. Esto puede llevar a errores si el objeto no tiene la estructura correcta, causando posibles fallos en tiempo de ejecución.

## Type Assertion (`e as any`):=============================================================================
Por ejemplo puedes decirle a TypeScript que tratas a `e` como cualquier objeto para poder acceder a sus propiedades

Tenemos las siguientes situaciones
- **`typeof e === "object"`**: Esta validación comprueba si `e` es un objeto. En JavaScript y TypeScript, cualquier cosa que no sea `null`, `undefined`, o un tipo primitivo (como `string`, `number`, etc.) es considerada un objeto.
- **`e !== null`**: Aunque `null` es técnicamente un "objeto" en JavaScript, se añade esta condición para asegurarse de que `e` no sea `null`, evitando errores de acceso a propiedades.
- **`"response" in e`**: Aquí se usa la sintaxis `"propiedad" in objeto`, que verifica si la propiedad `response` existe dentro del objeto `e`. Es una forma eficiente y segura de comprobar la presencia de propiedades en un objeto.
- **`typeof (e as any).response === "object"`**: Una vez que se confirma que `response` existe, se asegura que `response` también sea un objeto. La parte `(e as any)` es un **type assertion** para decirle a TypeScript que tratas a `e` como cualquier objeto para poder acceder a sus propiedades.
- **`"data" in (e as any).response`**: Finalmente, verifica que la propiedad `data` esté dentro del objeto `response`.
### ---------------------------------------------------------------------------------------------------- ###

### -------------------------------------Commentaries documentation------------------------------------- ###
#### 001
  la razon de que pida el country (id_country de mongoDB) y no lo omita como en el caso de task.schema
  es porque en la funcion de crearTask se obtiene la "referencia" en este caso (user) desde el
  ExtendsRequest; esta extencion posee la particularidad de que tiene el user en el body y como?
  pues resulta que tenemos un middleware que se encarga de ello, y es el authRequired, el cual es
  un sistema que se encarga de verificar un token presente en las cookies, este token a su vez
  contiene el ide del usuario (encriptado), al momento de ser validado, y decodificado, se extrae
  el id, el cual es pasado a este famoso ExtendsRequest, como podras ver, de aqui sale el user.id
  que vemos por ejemplo en la funcion getTasks o createTask

  explicado esto, cabe mencionar que el menester de country como tal, entonces, para ello, precisamos
  de hacer referencia a country desde el formulario (input)

#### 002
  la razon por la cual elimino el userReferences es porque no necesito obtener las referencias de ubicacion del usuario;
  esto debido a que como podras intuir, un usuario puede pertenecer a multiples sedes (headquarter), entonces solo piensalo,
  si se supone que sobreescribimos estas variables en req.userReferences {city, state, country}, entonces, como se supone que
  haremos si tenemos varias ciudades u departamentos en donde opera el usuario; necesito reevaluar esta logica, ya que
  si el usuario tiene varias sedes, entonces no es necesario usar el userReferences, por lo pronto trabajemos con un select de countries,
  de este modo podemos crear un estado y una ciudad sin necesidad de userReferences.

  aunque pensandolo mejor, si sabemos que al traer una de las sedes, ya se trae toda la info de localizacion, y si intuimos que la persona opera
  en un pais, entonces si tendria sentido usar el userReferences, pero de modo que solo usamos el id del pais

  antes siquiera de intentar crear un estado, debemos arreglar una logica un poco obsoleta; resulta que en userReference estamos
  intentando obtener el headquarte para empezar e ir escalando hasta llegar a pais, pero el detalle esta en que no hay ningun Headquarter
  en la base de datos, error mio; ahora bien, como se supone que vamos a obtener el pais si no tenemos el headquarter?
  porque se supone que mediante esta busqueda diferida logramos ir obteniendo datos respecto a la sede (headquarter) al que pertenece el usuario

  ahora, si se supone que el usuario pertenece a una sede, y esta a su vez pertenece a una ciudad y un departamento, y este a su vez
  pertenece a un pais, entonces si tendriamos sentido usar el userReferences, pero de este modo solo obtendriamos el id del pais

  Entonces, mirando como estan las cosas, toca separar las responsabilidades; de modo que no se dependa de las credenciales del usuario
  para el crud de country, state y city, una vez construida esta logica, podremos empezar a crear un headquarter

#### 003
  A la hora de actualizar un archivo, tengamos en cuenta que debemos sustituir;
  ahora bien, la cosa se complica al momento de hacer referencia a ese archivo en el ref(),
  porque debemos saber el nombre de este más su extencion (png, jpg, etc).

  ```ts
  ref(storage, 'users/profile/{username}/imagen.png')
  ```

  En cambio, si creamos una relacion carpeta-archivo, he intuido que 1 file corresponde a 1 carpeta
  tal que así (users/profile/{username}/photo) entonces solo nos ocuparemos de eliminar este folder
  y subir el nuevo archivo en esa direccion (users/profile/{username}/photo/imagen.png).

  El procedimiento es:
  - Eliminar el folder (path) en cuestion.
  - Subir el nuevo archivo en esa direccion.

#### 004
  Email verification: aqui encontramos  un punto clave y es que la comprobacion de email se realiza en firebase, por tanto, en caso de que exista el email, firebase/auth se encargara de enviar el error respectivo,

  anteriormente presentaba errores cuando manualmente eliminaba la cuenta de firebase/auth e intentaba registrar ese correo nuevamente; el detalle es que como se halla en mi base de datos mongoDB y este es "unique" entonces obtenemos ese error.

  recuerda que para eliminar cuenta debemos tener presente este enfoque. (eliminar tanto en FB como en MDB)