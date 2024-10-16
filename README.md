### ---------------------------------------------------------------------------------------------------- ###
## Comportamiento de classes dinamicas con Taildwind
  Tailwind CSS funciona de una manera particular cuando se trata de generar estilos en tiempo de compilación.
  *Purga de CSS:*
  Tailwind CSS utiliza un proceso de "purga" para eliminar las clases CSS no utilizadas en producción. Este proceso analiza tu código estático para determinar qué clases se están utilizando. Cuando generamos clases dinámicamente (como bg-${color}-${intensity}), Tailwind no puede detectarlas durante la fase de compilación.
  Solución potencial:
    
  Para resolver este problema, necesitamos asegurarnos de que Tailwind incluya estas clases en el CSS final. Hay varias formas de hacer esto:
  a. Safelist: Podemos añadir estas clases a la "safelist" en tu configuración de Tailwind. Esto le dice a Tailwind que incluya estas clases incluso si no las detecta en uso.
  b. Uso explícito: Otra opción es usar las clases de manera explícita en algún lugar de tu código, aunque sea en un comentario.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## usoControl en react-hook-form de manera profesional
  useController: Se usa cuando necesitas un control más granular sobre un campo específico. Es útil cuando estás creando componentes de campo personalizados reutilizables.

  useFormContext: Se utiliza para acceder al contexto del formulario en componentes anidados sin necesidad de pasar props manualmente.

  *1.* Análisis de ImageField.tsx:
    El ImageField utiliza useController porque es un componente de campo personalizado que maneja una lógica compleja (carga de imagen, vista previa, etc.). Esto permite un control preciso sobre el campo y su comportamiento.
  ```ts
    //Este enfoque es ideal para campos complejos que requieren una lógica personalizada.
    const { field } = useController({ name, control, defaultValue: null })
  ```
  *2.* Análisis de AccessoriesSection.tsx y IterableCardField.tsx:
    En AccessoriesSection, estás utilizando FormProvider y useForm:
  ```ts
    //Esto permite que IterableCardField acceda al contexto del formulario usando useFormContext:
    const methods = useForm<AccessoriesProps>();

    return (
      <FormProvider {...methods}>
        <IterableCardField {...props} />
      </FormProvider>
    )
  ```
  ```ts
    //Este enfoque es excelente para componentes que manejan múltiples campos relacionados, como en el caso de los accesorios iterables.
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });
  ```
  *4.* Consideraciones de rendimiento:
    useFormContext es más eficiente cuando tienes múltiples campos anidados, ya que evita el prop drilling.
    useController es más eficiente para campos individuales complejos, ya que permite un control más preciso sobre las re-renderizaciones.
  *5.* Tipado con AccessoriesProps:
    El uso de useForm<AccessoriesProps>() es una excelente práctica. Asegura que el formulario esté correctamente tipado, lo que mejora la seguridad del tipo y facilita el desarrollo.
  *6.* Recomendaciones profesionales:
    *a. Consistencia en el enfoque:*
      Usa useController para campos complejos individuales (como ImageField).
      Usa useFormContext con FormProvider para secciones con múltiples campos relacionados.
    *b. Optimización de rendimiento:*
      Considera usar React.memo en componentes de campo para evitar re-renderizaciones innecesarias.
      Utiliza useCallback para funciones que se pasan como props a componentes hijos.
    *c. Mejora en IterableCardField:*
      Podrías considerar usar useController dentro de IterableCardField para cada campo individual, lo que podría mejorar aún más el rendimiento:
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## prompt con contexto
hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata; antes quisiera darte un recuento de como estamos trabajando, mira, en mi proyecto react con typescript tengo un enfoque de arquitectura así (Layouts: contiene la parte mas externa de una page) (Pages: se alojan dentro de layout y es la pagina como tal que el usuario final consume) (Sections: se trata de Secciones que conforman la pagina, en mi caso en especifico, tengo una pagina para crear una hoja de vida de un equipo, entonces mis secciones son las diferentes partes de ese formato) (Components: estos son los componentes que al final se utilizan para construir la seccion, son reutilizables  y escalables lo cual incrementa el profesionalismo de mi app web); esto lo implemento gracias a este video que expica como esta arquitectura es la mejor en cuanto a escalabilidad, codigo dry, implementaciones u cambios de cara al tiempo y profesionalismo, quisiera compartirtelo; a continuacion adjunto las direcciones de las carpetas y archivos para que entiendas el contexto; @client  @src @sections @curriculum @interfaces @components @curriculum @utils  @reusables  @elements  @fields; al final lo que hay es un conjunto de secciones que usan componentes reutilizables para tener codigo DRY y muy escalable, como podras ver se trata de algo muy bien conformado, como podras notar si inspeccionas un poco la seccion de login u curriculum @AccessoriesSection.tsx @AccessoriesSection.tsx  @FormSection.tsx podras notar que empleo componentes reutilizables, muy escalables porque tengo algunos props opcionales y logro trabajar correctamente con esto porque se que pueden existir mas casos y al final es mejor hacer codigo dry, quiero que en mi @MaintenanceSection.tsx que corresponde a la seccion de diligenciamiento de mantenimiento de mi formato de Maintenance (al final es una vista) especificamente en las lineas 36 a 40, indico donde quiero el checkbox, se trata de un formato en constante reactividad, quiero implementar un mecanismo de que si la persona da click en "¿Equipo presenta falla?" entonces mostrar un text area para dar detalles; es algo intuitivo, no tan solo visual, sino tambien poder controlar este campo tal como uso en otras partes de mis secciones, que a pesar que son componentes separados, poder yo gestionarle el submit u interactual con los campos (por ejemplo en el caso en que quiero renderizar un input select con items que son consultados desde la base de datos), primeramente quiero trabajar que al hacer click en el checkbox entonces muestre este item u card que muestra un text field, es mas, ahora que lo analizo mejor, yo tengo un componente reutilizable de checkbox, pero el mecanismo que implementa es que le pasamos un atributo con un array de elementos y por cada uno de ellos hace un check @Checkbox.tsx no es la idea que planeo implementar, tampoco creo que podamos usarlo; entonces al final busco que me hagas un componente de check iterable completamente reactivo y amigable con el usuario, del mismo modo, al desactivar el checkbox este input desaparece, puedes guiarte de algunos modelos que poseo en mi proyecto tal como la generacion de cards iterables @Card.tsx que es utilizada en secciones del curriculu como @AccessoriesSection.tsx , aqui tambien estan algunos tipados @form.interface.ts @props.interface.ts @context.interface.ts , de igual modo, te doy permiso para que inspecciones cada parte de mi proyecto, sientete a gusto y opta por mejorarme cada dia mas, ese es mi deseo; por tanto, quiero que te guies de los otros componentes que tengo en mi repretorio de carpetas, mira los tipados en la carpeta interfaces @interfaces y todas las carpetas circundantes @components @curriculum @reusables  @elements  @@fields etc, al final te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!

## prompt optimo
  hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata; antes quisiera darte un recuento de como estamos trabajando, mira, en mi proyecto react con typescript tengo un enfoque de arquitectura así (Layouts: contiene la parte mas externa de una page) (Pages: se alojan dentro de layout y es la pagina como tal que el usuario final consume) (Sections: se trata de Secciones que conforman la pagina, en mi caso en especifico, tengo una pagina para crear una hoja de vida de un equipo, entonces mis secciones son las diferentes partes de ese formato) (Components: estos son los componentes que al final se utilizan para construir la seccion, son reutilizables  y escalables lo cual incrementa el profesionalismo de mi app web); esto lo implemento gracias a este video que expica como esta arquitectura es la mejor en cuanto a escalabilidad, codigo dry, implementaciones u cambios de cara al tiempo y profesionalismo, quisiera compartirtelo "............."; a continuacion adjunto las direcciones de las carpetas y archivos para que entiendas el contexto; @client  @src @sections @curriculum @interfaces @components @curriculum @utils @reusables @elements @fields; al final lo que hay es un conjunto de secciones que usan componentes reutilizables para tener codigo DRY y muy escalable, como podras ver se trata de algo muy bien conformado;  (context mistake)   ; por tanto, quiero que te guies de los otros componentes que tengo en mi repretorio de carpetas, mira los tipados en la carpeta interfaces @interfaces y todas las carpetas circundantes @components @curriculum @reusables @elements @fields etc, al final te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!

## Prompts
  *To backend*
  ```ts	
    "hasta ahora has sido muy profesional, me has dado las mejores implementaciones y el codigo mas impresionante, ahora se viene un verdadero reto, dejame explicarte de que se trata; antes quisiera darte un recuento de como estamos trabajando, mira, si analizamos meticulosamente @userReferences.middleware.ts podras notar que se trata de un middleware tal como el de authRequired @auth.middleware.ts usado en partes protegidas como @location.routes.ts o @task.routes.ts @auth.routes.ts, el detalle esta en que busco implementar mi controlador de location @location.controller.ts, si  puedes observar un poco, podras intuir que manejo varias colecciones de base de datos (mongoDB), esto es para el manejo de tablas como country, state"departamento" y city, al final ya sabras que estan corelacionadas entre si, por favor revisa los modelos para que observes las relaciones que existe @schemas @location.schema.ts @location.model.ts @model.interface.ts, entonces la idea es la siguiente; si yo desde el frontend accedo satisfactoriamente a mi api rest (backend) con alguna consulta o inclusive para crear algun dato nuevo (ciudad, departamento o pais) puedo reducir las redundancias, ya te  voy a explicar de que se trata; si se supone que  es una ruta protegida entonces podemos contar de inicio con el authRequired, el cual en breves lo que hace es autenticar la cookie token el cual representa el id de la persona logeada, a partir de aqui podemos trabajar con consultas compuestas, en las que buscamos datos referenciando a este usuario en concreto, caso ilustre es el controlador de task, ya que en este usamos el req.user para traer por ejemplo tareas especificas  de ese usuario etc @task.controller.ts, en este orden de ideas, podras notar que hago uso de un ExtendsRequest @request.interface.ts con el cual trabajo usando un opcional de "user", en esta keey guardo el id y de hay en adelante todo es  mas sencillo; ahora bien, si yo quisiese ppor ejemplo crear un pais, es tan simple como tan solo llenar el input de nombre del pais debido a que esta tabla no tiene ninguna dependencia u referencia a alguna otra coleccion de  mongoDB @location.model.ts, el reto surge cuando intentamos crear state u city, porque en estas evidenciamos la creacion de una referencia, por tanto, al crear algun dato precisamos de esta referencia; ahora bien, piensa en el frontend, si analizas bien mi proyecto y espero bien que lo hagas meticulosamente @server @src podras notar que para el creacion de una tarea @task.routes.ts @task.schema.ts @task.model.ts no necesito referenciar al usuario al que es referenciada esta tarea porque iternamente mediante el ExtendsRequest, logro hacer referencia al usuario y al final, hacer la relacion, @task.controller.ts , he aqui mi interes por  intentar hacer un middleware pero ahora para referencias del usuario "userReferences" por ello notas esta especie de codigo desordenado en @location.routes.ts y en el @userReferences.middleware.ts , es eso lo que intento, de alguna manera poder trabajar con este middleware, no se, es lo que se me ocurrio en haras de no estar haciendo consultas complejas, dejame decirte que en mi modelo de entidad relacion, tengo que para poder acceder al pais (la cual es la tabla mas alejada) tengo que antes, llegar a departamento (state) luego a ciudad (city), luego a sede (headquarter) y una vez aqui dado que una sede posee muchos usuarios y un usuario puede estar en varias sedes esta la tabla sede_ingeniero (engineer_headquarter) con el id de la sede y el id del ingeniero; entonces podras darte cuenta que es una red complicada, y si quiero manejar reactividad en mi aplicacion de la manera mas profesional posible tengo que tomar importancia a estos detalles, quiero que me brindes tu criterio de valor de la manera mas profesional, que si no es optimo hacer esto mediante un middleware me lo hagas saber, siente libre de hacer implementaciones u trabajar de las formas mas apropiadas y eficientes posibles, creeme que quiero hacer mi codigo cada vez mas escalable y profesional, de igual modo, te doy permiso para que inspecciones cada parte de mi proyecto, sientete a gusto y opta por mejorarme cada dia mas, ese es mi deseo; por tanto, quiero que te guies de los otros componentes que tengo en mi repretorio de carpetas, mira los tipados en la carpeta interfaces @server @src @interfaces y todas las carpetas circundantes @libs @models @schemas @utils @controllers @routes @middlewares  etc, al final te paso el concepto de lo que quiero implementar, algo reutilizable, escalable, profesional, y eficiente en cuanto codigo, esto para que mi CEO quede impresionado por mi profesionalismo; siempre opto por las maneras mas profesionales y esteticas de conseguirlo, recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructuracion u abstraccion tan bonita, !VAMOS, eres la mejor!"
  ```
  *To frontend*
  ```ts
    "siempre opto por las maneras mas profesionales y esteticas de conseguirlo, recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructurar datos tan bonita, !VAMOS!"
  ```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Azure Blob Storage - SAS connection
token SAS === sp=racwdl&st=2024-09-23T21:19:48Z&se=2030-09-24T05:19:48Z&spr=https&sv=2022-11-02&sr=c&sig=uwcjoEGYF8ju5Z%2B3oYCU%2B2k6K9SW46NNpbSob4O70dM%3D
URL SAS === https://gestionsaludcloud.blob.core.windows.net/data?sp=racwdl&st=2024-09-23T21:19:48Z&se=2030-09-24T05:19:48Z&spr=https&sv=2022-11-02&sr=c&sig=uwcjoEGYF8ju5Z%2B3oYCU%2B2k6K9SW46NNpbSob4O70dM%3D

Database: Considere crear índices en la columna "equipo_id" de "Caracteristicas_tecn" para optimizar las consultas.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## important to production
  - remember that you should go to Render dashboard and change the environment variable, FRONTEND_URL for the correct url of the production

  - remove (sameSite: 'none') in config cookies on controllers/auth.controller.ts
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
```ts
// implement on home page
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Types and generics extends in TypeScript
```typescript
// Definimos tipos para nuestras mutaciones
type MutationTypes = 'createOrUpdate' | 'delete';

// Definimos la estructura de los parámetros para cada tipo de mutación
type MutationParams<T extends MutationTypes> = 
  T extends 'createOrUpdate' ? { id: string; data: object } :
  T extends 'delete' ? { id: string } :
  never;

// Definimos el tipo de retorno para cada mutación
type MutationReturn<T extends MutationTypes> = 
  T extends 'createOrUpdate' ? Task :
  T extends 'delete' ? void :
  never;

export function useCustomMutation<T extends MutationTypes>(type: T) { /* something */}

const deleteMutation = useCustomMutation('delete');

const handleDelete = (id: string) => {
  deleteMutation.mutate({ id });
};
```
1. **Tipado fuerte**: TypeScript inferirá correctamente los tipos de parámetros y retorno para cada tipo de mutación.
2. **Flexibilidad**: Puedes agregar fácilmente nuevos tipos de mutaciones extendiendo los tipos `MutationTypes`, `MutationParams`, y `MutationReturn`.
3. **DRY (Don't Repeat Yourself)**: La lógica de invalidación de consultas está centralizada.
4. **Separación de preocupaciones**: Cada mutación tiene su propia lógica clara y separada.
5. **Fácil de usar**: Los consumidores del hook solo necesitan especificar el tipo de mutación que desean usar.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## selección específica en TypeScript
   ```typescript
    export const useFavoriteTask = create<FavoriteTaskState>((set) => ({
      favoriteTaskIds: [],
      addFavoriteTask: (id: string) => set((state) => ({
        favoriteTaskIds: [...state.favoriteTaskIds, id]
      })),
      removeFavoriteTask: (id: string) => set((state) => ({
        favoriteTaskIds: state.favoriteTaskIds.filter((e) => e !== id)
      }))
    }));

    // Seleccion especifica
    const addTaskStore = useFavoriteTask(state => state.addFavoriteTask);    

    //O desestructuracion predeterminada
    const { addFavoriteTask: addTaskStore, removeFavoriteTask: removeTaskStore } = useFavoriteTask();
   ```

Análisis:
1. Rendimiento: La primera forma es ligeramente más eficiente en términos de rendimiento. Zustand solo volverá a renderizar el componente si las propiedades específicas que seleccionaste cambian. Con la desestructuración completa, el componente podría re-renderizarse si cualquier parte del estado cambia, aunque no uses todas las propiedades.
2. Tipado: Ambas formas mantienen el tipado correcto en TypeScript, así que no hay preocupaciones en ese aspecto.
3. Claridad: La primera forma es más explícita sobre qué partes del estado se están utilizando, lo que puede hacer que el código sea más fácil de entender y mantener.
4. Errores en ejecución: No deberías experimentar errores en ejecución con ninguna de las dos formas, siempre y cuando uses las funciones correctamente (pasando el ID como lo estás haciendo).
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Zustand -> Handle local state
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

// Definición de tipos
interface Repo { id: number; name: string }
interface FavoriteReposState {
  favoriteRepos: Repo[];
  addFavoriteRepo: (repo: Repo) => void;
  removeFavoriteRepo: (repoId: number) => void;
  clearFavoriteRepos: () => void;
}

// Creación del store
export const useFavoriteReposStore = create<FavoriteReposState>()(
  devtools(
    persist(
      immer((set) => ({
        favoriteRepos: [],
        addFavoriteRepo: (repo) =>
          set((state) => {
            if (!state.favoriteRepos.some((r) => r.id === repo.id)) {
              state.favoriteRepos.push(repo);
            }
          }),
        removeFavoriteRepo: (repoId) =>
          set((state) => {
            state.favoriteRepos = state.favoriteRepos.filter((r) => r.id !== repoId);
          }),
        clearFavoriteRepos: () =>
          set((state) => {
            state.favoriteRepos = [];
          }),
      })),
      {
        name: 'favorite-repos-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

// Selector de ejemplo
  export const selectFavoriteReposCount = (state: FavoriteReposState) => state.favoriteRepos.length;

  const favoriteRepos = useFavoriteReposStore((state) => state.favoriteRepos);
  const addFavoriteRepo = useFavoriteReposStore((state) => state.addFavoriteRepo);
  const favoriteCount = useFavoriteReposStore(selectFavoriteReposCount);
```
1. **Uso de middlewares**:
   - `immer`: Permite escribir código "mutable" que se convierte en actualizaciones inmutables, lo que hace que el código sea más legible y menos propenso a errores.
   - `devtools`: Habilita la integración con Redux DevTools para una mejor depuración.
   - `persist`: Permite persistir el estado en el almacenamiento local del navegador.
2. **Acciones más robustas**: Hemos definido acciones para añadir, eliminar y limpiar repositorios favoritos, con lógica para evitar duplicados.
3. **Selector**: Hemos agregado un selector de ejemplo que demuestra cómo se pueden derivar datos del estado.
4. **Uso de immer**: Permite "mutar" el estado directamente dentro de las acciones, lo que hace que el código sea más intuitivo y fácil de leer.
5. **Persistencia**: El estado se guarda automáticamente en el almacenamiento local, lo que mejora la experiencia del usuario entre sesiones.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Example component function
```ts
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {errors.map((e, i) => (
        <div key={i} className="bg-red-500 text-white">{e}</div>
      ))}

      <form onSubmit={onSubmit}>
        <FormField
          label="Title"
          register={register}
          name="title"
          required
          error={errsForm.title}
        />

        <FormField
          label="Description"
          register={register}
          name="description"
          required
          error={errsForm.description}
          as="textarea"
        />

        <FormField
          label="Date"
          register={register}
          name="date"
          type="date"
        />

        <button 
          type="submit" 
          className="bg-indigo-500 px-3 py-2 mt-3 rounded-md"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

interface FormFieldProps { label: string; register: any; name: string; required?: boolean; error?: any; as?: 'input' | 'textarea'; type?: string }

const FormField: React.FC<FormFieldProps> = ({ label, register, name, required, error, as = 'input', type = 'text' }) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    {as === 'textarea' ? (
      <textarea
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        {...register(name, { required })}
      />
    ) : (
      <input
        type={type}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        {...register(name, { required })}
      />
    )}
    {error && <p className="text-red-500">{label} is required</p>}
  </div>
);

export default TaskForm;
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### uso de mutation (Query React)
Ahora que tienes la sobrecarga de funciones, puedes hacer que tu función `mutation` acepte esta mutación flexible. Además, desestructurar los parámetros y organizar el código siguiendo las mejores prácticas aumentará la legibilidad y profesionalidad.

```typescript
export type Mutation = {
  (task: object): Promise<Task>;
  (id: string, task: object): Promise<Task>;
};

const useCustomMutation = ( method: Mutation, queryKey: string ) => {
  const queryClient = useQueryClient();
  return (data: object, id?: string) => {
    const build = useMutation({
      mutationFn: () => id ? method(id, data) : method(data),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: [queryKey] }) }
    });
    build.mutate(data);
  };
};

const mutation = useCustomMutation(createTask, 'tasks');
mutation({ title: 'Nueva Tarea' });

const mutation = useCustomMutation(updateTask, 'tasks');
mutation({ title: 'Tarea Actualizada' }, '123');
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Cómo maneja el "caching" de datos y las solicitudes repetidas (pagina reactiva)
### ¿Qué es React Query?
React Query es una biblioteca que facilita el manejo de solicitudes de datos y caching en aplicaciones React. Su mayor fortaleza es cómo maneja el "caching" de datos y las solicitudes repetidas, lo que evita hacer llamadas redundantes al backend. También optimiza automáticamente el rendimiento al invalidar datos solo cuando es necesario.

### Ventajas de React Query
- **Manejo de caché eficiente**: Almacena automáticamente las respuestas y las reutiliza cuando es posible.
- **Actualizaciones automáticas**: Puedes mantener actualizada la UI automáticamente cuando los datos cambian en el servidor.
- **Minimización del uso de `useEffect`**: Reduce la necesidad de manejar manualmente los efectos secundarios en componentes.
- **Sincronización en segundo plano**: Refresca los datos en segundo plano sin interrumpir la UI.
- **Reintentos automáticos**: En caso de error, puede reintentar la solicitud sin necesidad de escribir lógica adicional.

### Cómo hacer un request con React Query
Aquí tienes un ejemplo que puedes ajustar a tu implementación de `getTasks`:

```tsx
import { useQuery } from 'react-query';
import TaskCard from './TaskCard';
import { getTasks } from '../api/tasks'; // asumiendo que tienes un servicio de API

function Tasks() {
  const { data: tasks, error, isLoading, isError } = useQuery('tasks', getTasks);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks: {error.message}</div>;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
```

### Desglose de la sintaxis
1. **`useQuery`**: Esta función toma dos parámetros clave: 
   - **Una clave única** (`'tasks'` en este caso), que identifica el "query" (consulta).
   - **Una función de solicitud** (`getTasks`), que define cómo obtener los datos desde tu backend.
2. **Estados del "query"**:
   - **`isLoading`**: Indica si la consulta aún está en progreso.
   - **`isError`**: Indica si hubo un error en la solicitud.
   - **`data`**: Contiene los datos de la consulta cuando esta se completa correctamente.

Este `getTasks` hace una solicitud HTTP utilizando Axios para obtener los datos. React Query almacenará esos datos en caché y los reutilizará si es necesario.

### Revalidación automática y "stale" data
React Query maneja los datos en diferentes fases:
- **Fresh (frescos)**: Datos recién cargados.
- **Stale (caducos)**: Datos que pueden estar desactualizados, pero siguen en caché.
- **Refetching (actualizando)**: Los datos son nuevamente solicitados.
Por ejemplo, cuando vuelves a la página de tareas, si los datos aún son "fresh", no se vuelve a hacer una solicitud HTTP, pero si son "stale", React Query hará una nueva solicitud en segundo plano.

### Configuraciones avanzadas con `useQuery`
Puedes personalizar la forma en que las solicitudes se manejan. Algunas opciones avanzadas:
```tsx
useQuery('tasks', getTasks, {
  staleTime: 5000,  // Tiempo antes de que los datos se consideren "caducos"
  cacheTime: 10000,  // Tiempo que los datos se guardan en caché
  refetchOnWindowFocus: true,  // Refresca los datos cuando la ventana gana el foco
  retry: 2,  // Reintenta la solicitud dos veces si falla
});
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Resolver Cookies
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
  ```
### ---------------------------------------------------------------------------------------------------- ###


### ---------------------------------------------------------------------------------------------------- ###
## Partials < >
```typescript
export type Task = { 
  _id: string; 
  title: string; 
  description: string; 
  date: Date;
};

export const createTask = (overrides: Partial<Task> = {}): Task => ({
  _id: '',
  title: '',
  description: '',
  date: new Date(),
  ...overrides
});

function TaskCard({ task }: TaskCardProps) {
  const taskWithDefaults = createTask(task);
  return (<h1 className="text-2xl font-bold"> Title: {taskWithDefaults.title} </h1>);
}

export default TaskCard;
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### 1. Uso de Default Values en el Tipado
Podrías aprovechar los valores por defecto en la desestructuración directamente en el componente. Esto ayuda a evitar que tengas que hacer chequeos adicionales para cada propiedad.
```typescript
export type Task = { 
  _id?: string, 
  title?: string, 
  description?: string, 
  date?: Date 
}
function TaskCard({ task = {} as Task }: TaskCardProps) {
  return (
    <h1 className="text-2xl font-bold"> Title: {task.title ?? 'No Title'} </h1>
    <div className="flex gap-x-2 items-center">
      <button onClick={() => deleteTask(task._id ?? '')}>Delete</button>
      <button>Edit</button>
    </div>
  )
}
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Usar Genéricos y Tipos Opcionales

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

## Usar Tipo Personalizado
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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Usar useNavigate() or <Navigate>
### Navigate (Componente):
Navigate es un componente de React Router que redirige automáticamente a una ruta específica cuando se renderiza.
Se usa principalmente cuando necesitas redirigir de forma declarativa, es decir, basado en condiciones dentro del JSX.
Es ideal cuando la redirección depende del resultado de una condición lógica directamente en la estructura de los componentes.
```typescript
if (!isAuth) return <Navigate to="/login" replace />;//El componente Navigate tiene la ventaja de ser conciso y declarativo, ideal para redirecciones inmediatas dentro de la estructura del JSX.
```
### useNavigate (Hook):
useNavigate es un hook de React Router que te permite realizar redirecciones de manera programática desde funciones y efectos (useEffect), dándote más control sobre cuándo y cómo ocurre la redirección.
Se usa principalmente cuando necesitas realizar una navegación como respuesta a eventos, funciones asíncronas, o después de ejecutar lógica adicional.
```typescript
useEffect(() => { if (isAuth) navigate('/tasks') }, [isAuth]);//useNavigate es muy útil en flujos complejos donde la redirección depende de múltiples factores que no puedes determinar solo con JSX.
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Uso de Casting (... as Task) ===> ! Prevención !
Usar el casting directo como `res.data as Tasks` es una técnica común, pero puede ser riesgosa si no estás completamente seguro del tipo de datos que recibirás. Aquí te explico algunas consideraciones y mejores prácticas para asegurar un código más robusto:
### 1. **Evitar el Casting Directo en Favor de la Validación**:
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
### 2. **Uso de Type Assertions con Precaución**:
   Si decides mantener el casting, ten en cuenta que es una "apuesta" sobre la estructura de los datos. A veces es inevitable, pero debería usarse solo cuando estés seguro de los datos:
   ```typescript
   setTasks(res.data as Tasks);
   ```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Tipificando las Respuestas en Express:
Es posible que desees controlar el tipo de datos que respondes en res.json. Considera definir una respuesta estructurada con interfaces:
```typescript
interface ResponseData { message: string, data?: string[] }
res.status(200).json({ message: messageFormat(tasks) } as ResponseData);
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Paso 1: Definir Tipos de Respuesta
```ts
interface UserCredentials {
  email: string;
  username: string;
}

import { AxiosResponse } from "axios";

export const tokenCredentialsRequest = async (): Promise<AxiosResponse<UserCredentials>> => axios.get<UserCredentials>('/verify');

//useEffect
useEffect(() => {
    try {
      const res = await tokenCredentialsRequest();
      setUser(res.data);
    } catch (e: unknown) {
      if (!axios.isAxiosError(e)) return;
      const errorResponse = e.response?.data as ErrorResponse;
      setErrors(errorResponse.errors)
    }
}, []);
```
### Tipo Condicional para la Respuesta
```ts
type ApiResponse<T> = T | { errors: string[] };

export const tokenCredentialsRequest = async (): Promise<AxiosResponse<ApiResponse<UserCredentials>>> => {
  return axios.get<ApiResponse<UserCredentials>>('/verify');
};
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Retorno de multiples resultados en un unico retorno
### Tipo seguro = res + error opcional
### Tipo funcional = (Result Types o either) => (boolean) + res + error
### Promise<something = {data? error?}>, Promise<Result<> = T | error>

### 1. **Separar la Lógica de Autenticación del Controlador HTTP:**
   ```typescript
   //El controlador HTTP, en cambio, manejaría la lógica de la respuesta.
   async function verifyCredentials(email: string, password: string): Promise<User | null> {// Autenticación (pura lógica)
     const userFound = await User.findOne({ email });
     const isMatch = await verified(password, userFound?.password);
     return isMatch ? userFound : null;
   }
   export const login = async (req: Request, res: Response) => {// Controlador HTTP
       const { email, password } = req.body;
       const user = await verifyCredentials(email, password);
       if (!user) return res.status(403).json(["Invalid credentials"]);
   }
   ```
### 2. **Retornar un Objeto de Resultado con un Tipo Seguro:**
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
### 3. **Uso de Result Types o Either (Tipo Funcional):**
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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Type Guard (`e is ErrorResponse`)
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

## Type Assertion (`e as any`)
Por ejemplo puedes decirle a TypeScript que tratas a `e` como cualquier objeto para poder acceder a sus propiedades

Tenemos las siguientes situaciones
- **`typeof e === "object"`**: Esta validación comprueba si `e` es un objeto. En JavaScript y TypeScript, cualquier cosa que no sea `null`, `undefined`, o un tipo primitivo (como `string`, `number`, etc.) es considerada un objeto.
- **`e !== null`**: Aunque `null` es técnicamente un "objeto" en JavaScript, se añade esta condición para asegurarse de que `e` no sea `null`, evitando errores de acceso a propiedades.
- **`"response" in e`**: Aquí se usa la sintaxis `"propiedad" in objeto`, que verifica si la propiedad `response` existe dentro del objeto `e`. Es una forma eficiente y segura de comprobar la presencia de propiedades en un objeto.
- **`typeof (e as any).response === "object"`**: Una vez que se confirma que `response` existe, se asegura que `response` también sea un objeto. La parte `(e as any)` es un **type assertion** para decirle a TypeScript que tratas a `e` como cualquier objeto para poder acceder a sus propiedades.
- **`"data" in (e as any).response`**: Finalmente, verifica que la propiedad `data` esté dentro del objeto `response`.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Diferencias clave entre `type` e `interface`
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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Códigos de estado informativos (100-199)
100 Continue: El servidor ha recibido los encabezados de la solicitud y el cliente debe proceder a enviar el cuerpo de la solicitud.
101 Switching Protocols: El servidor acepta el cambio de protocolo solicitado por el cliente.
### Códigos de estado de éxito (200-299)
200 OK: La solicitud ha tenido éxito. La respuesta depende del método de solicitud utilizado.
201 Created: La solicitud ha sido cumplida y ha resultado en la creación de un nuevo recurso.
202 Accepted: La solicitud ha sido aceptada para procesamiento, pero aún no se ha completado.
204 No Content: La solicitud ha tenido éxito, pero el servidor no devuelve ningún contenido.
### Códigos de redirección (300-399)
301 Moved Permanently: La URL del recurso solicitado ha sido cambiada permanentemente.
302 Found: El recurso solicitado se encuentra temporalmente en una URL diferente.
304 Not Modified: El recurso no ha sido modificado desde la última solicitud.
### Códigos de error del cliente (400-499)
400 Bad Request: El servidor no puede procesar la solicitud debido a un error del cliente.
401 Unauthorized: La solicitud requiere autenticación del usuario.
403 Forbidden: El servidor entiende la solicitud, pero se niega a autorizarla.
404 Not Found: El recurso solicitado no se ha encontrado.
405 Method Not Allowed: El método de solicitud no está permitido para el recurso solicitado.
409 Conflict: La solicitud no puede ser completada debido a un conflicto con el estado actual del recurso.
422 Unprocessable Entity: El servidor entiende el tipo de contenido de la solicitud, pero no puede procesar las instrucciones contenidas en ella.
### Códigos de error del servidor (500-599)
500 Internal Server Error: El servidor ha encontrado una condición inesperada que le impide cumplir con la solicitud.
501 Not Implemented: El servidor no reconoce el método de solicitud y no puede soportarlo.
502 Bad Gateway: El servidor, actuando como una puerta de enlace o proxy, recibió una respuesta inválida del servidor ascendente.
503 Service Unavailable: El servidor no está disponible temporalmente, generalmente debido a mantenimiento o sobrecarga.
504 Gateway Timeout: El servidor, actuando como una puerta de enlace o proxy, no recibió una respuesta a tiempo del servidor ascendente.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Uso de interfaz !IMPORTANT!
```typescript
import { Request } from "express";
export interface ExtendsRequest extends Request {
  user?: Auth; //remember that should be optional because "extends" from another interface
}
interface Auth {
  id: string;
}
```
### Ahora procedemos a lo siguiente...
```typescript
import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../libs/jwt";
import { ExtendsRequest } from "../interfaces/request.interface";

export const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not found token, auth denied" });
  const user = await verifyAccessToken(token) as { id: string };
  if (!user.id) return res.status(401).json({ message: "Invalid token" });
  req.user = user;
  next();
};
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Expresiones de tipo:
**Verificación del tipo de dato**:
   ```typescript
   if (typeof decoded === 'object' && decoded !== null)
   ```
   Aquí estamos verificando si el valor de `decoded` es un objeto y no es `null`.
   
**Conversión de tipo usando `as`**:
   ```typescript
   const { id, exp } = decoded as jwt.JwtPayload;
    //or 
   resolve(decoded as { id: string });
   ```
   Esta línea está utilizando TypeScript para "asegurarle" que `decoded` es del tipo `jwt.JwtPayload`.


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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
//See status
   ```powershell
   Get-ExecutionPolicy
   ```

//Unlock
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

//Lock
   ```powershell
   Set-ExecutionPolicy Restricted
   ```

### Orden de Middleware
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

### Middleware Específicos
#### `express.json()`
Este middleware analiza cuerpos de solicitud JSON. Si no se añade antes de tus rutas, `req.body` no estará disponible y será `undefined`.
#### `cors()`
Este middleware habilita CORS (Cross-Origin Resource Sharing), lo que permite o restringe las solicitudes de recursos en un servidor desde un origen diferente. Esto es especialmente útil para permitir que tu API sea accesible desde diferentes dominios.

### Conclusión
El orden de los middlewares en Express es crucial para asegurar que las solicitudes sean procesadas correctamente. Los middlewares como `express.json()` y `cors()` preparan la solicitud antes de que llegue a las rutas, garantizando que los datos estén disponibles y que las políticas de seguridad se apliquen correctamente.
### ---------------------------------------------------------------------------------------------------- ###
=======
## Types avanzed in TypeScript 🥵
```typescript
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { useTasks } from "../context/TaskContext";

// Definimos tipos para nuestras mutaciones
type MutationTypes = 'createOrUpdate' | 'delete';

// Definimos la estructura de los parámetros para cada tipo de mutación
type MutationParams<T extends MutationTypes> = 
  T extends 'createOrUpdate' ? { id: string; data: object } :
  T extends 'delete' ? { id: string } :
  never;

// Definimos el tipo de retorno para cada mutación
type MutationReturn<T extends MutationTypes> = 
  T extends 'createOrUpdate' ? Task :
  T extends 'delete' ? void :
  never;

export function useCustomMutation<T extends MutationTypes>(type: T): UseMutationResult<MutationReturn<T>, Error, MutationParams<T>> {
  const { createTask, updateTask, deleteTask } = useTasks();
  const queryClient = useQueryClient();

  const mutationFn = (params: MutationParams<T>): Promise<MutationReturn<T>> => {
    switch (type) {
      case 'createOrUpdate':
        const { id, data } = params as MutationParams<'createOrUpdate'>;
        return (id !== 'new' ? updateTask(id, data) : createTask(data)) as Promise<MutationReturn<T>>;
      case 'delete':
        const { id: deleteId } = params as MutationParams<'delete'>;
        return deleteTask(deleteId) as Promise<MutationReturn<T>>;
      default:
        throw new Error(`Unsupported mutation type: ${type}`);
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
```

Ahora, puedes usar este hook de la siguiente manera:

```typescript
// Para crear o actualizar una tarea
const createOrUpdateMutation = useCustomMutation('createOrUpdate');

// Para eliminar una tarea
const deleteMutation = useCustomMutation('delete');

// Uso en un componente
const handleSubmit = (data: object) => {
  createOrUpdateMutation.mutate({ id, data });
};

const handleDelete = (id: string) => {
  deleteMutation.mutate({ id });
};
```

Esta implementación tiene varias ventajas:

1. **Tipado fuerte**: TypeScript inferirá correctamente los tipos de parámetros y retorno para cada tipo de mutación.
2. **Flexibilidad**: Puedes agregar fácilmente nuevos tipos de mutaciones extendiendo los tipos `MutationTypes`, `MutationParams`, y `MutationReturn`.
3. **DRY (Don't Repeat Yourself)**: La lógica de invalidación de consultas está centralizada.
4. **Separación de preocupaciones**: Cada mutación tiene su propia lógica clara y separada.
5. **Fácil de usar**: Los consumidores del hook solo necesitan especificar el tipo de mutación que desean usar.

### ---------------------------------------------------------------------------------------------------- ###
  //add this for GPT4
  """necesito lograr esto de la manera mas profesional posible, usando patrones de diseño, optimizaciones de codigo y de rendimiento, eficiciencia en cuanto empleo de macanismos profesionales,
  
  siempre opto por las maneras mas profesionales y esteticas de conseguirlo, recuerda que siempre busco maneras de hacer mejor las cosas, necesito la forma mas optima en cuanto a rendimiento y escalabilidad, eficiente en cuanto a codigo y profesional en cuanto a empleo de codigo limpio, mejores practicas y patrones de diseño, por favor, dame lo mas profesional que tengas; que cuando el CEO vea mi codigo, se impresione por el modelo de desestructurar datos tan bonita, !VAMOS!"""
### ---------------------------------------------------------------------------------------------------- ###


Gracias por proporcionar el código detallado. Después de revisar, puedo identificar el problema principal y algunas áreas de mejora. Vamos a abordarlos uno por uno:

1. El error principal:
El error "Invalid hook call" se está produciendo porque estás llamando a un hook (useMutationCreateOrUpdate) dentro de la función `onSubmit`, que es un callback y no un componente de React o un hook personalizado. Los hooks solo pueden ser llamados en el nivel superior de un componente de React o dentro de otros hooks personalizados.

2. Solución al problema principal:
Debes mover la llamada a `useMutationCreateOrUpdate` al nivel superior de tu componente TaskForm. Luego, puedes usar la mutación retornada dentro de tu función `onSubmit`. Aquí tienes cómo podrías restructurar esa parte:

```typescript
function TaskForm() {
  // ... otros hooks y código ...

  const mutation = useMutationCreateOrUpdate(id);

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(schemaTask(values));
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/tasks');
    }
  }, [mutation.isSuccess, navigate]);

  // ... resto del componente ...
}
```

3. Observaciones adicionales y mejoras:

a. En tu archivo useTasks.ts, estás desestructurando `useTasks()` fuera de cualquier componente o hook. Esto también viola las reglas de los hooks. Deberías mover esa desestructuración dentro de cada función donde la necesites. Por ejemplo:

```typescript
export const useFetchTask = (id: string) => {
  const { getTask } = useTasks();
  return useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    enabled: id !== 'new'
  });
}
```

b. En tu componente TaskForm, podrías simplificar la lógica de carga y error utilizando el estado de la mutación:

```typescript
function TaskForm() {
  // ... otros hooks y código ...

  const mutation = useMutationCreateOrUpdate(id);
  const { data: task, error, isLoading } = useFetchTask(id);

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(schemaTask(values));
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      navigate('/tasks');
    }
  }, [mutation.isSuccess, navigate]);

  if (isLoading || mutation.isLoading) return <h1 className="font-bold text-2xl">Cargando...</h1>;
  if (error || mutation.error) return <div className="bg-red-600"><h1 className="text-white">{(error || mutation.error).message}</h1></div>;

  // ... resto del componente ...
}
```

c. En cuanto a tu pregunta sobre por qué no es viable tener funciones en módulos distintos y llamarlos de manera ordenada: Es totalmente viable y, de hecho, es una buena práctica para mantener tu código organizado. El problema no está en la organización de tus funciones, sino en cómo y dónde estás llamando a los hooks.

d. Considera usar un formulario controlado en lugar de react-hook-form si no necesitas todas sus características. Esto podría simplificar tu código aún más.

e. Para manejar errores de manera más consistente, podrías crear un componente de error reutilizable.

Implementando estos cambios, deberías resolver el error principal y mejorar la estructura general de tu aplicación. Recuerda siempre seguir las reglas de los hooks de React:

1. Solo llama a los hooks en el nivel superior de tu componente.
2. Solo llama a los hooks desde componentes de React o hooks personalizados.

Siguiendo estas reglas y las sugerencias anteriores, tu código debería funcionar correctamente y ser más mantenible.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## selección específica en TypeScript
   ```typescript
    export const useFavoriteTask = create<FavoriteTaskState>((set) => ({
      favoriteTaskIds: [],
      addFavoriteTask: (id: string) => set((state) => ({
        favoriteTaskIds: [...state.favoriteTaskIds, id]
      })),
      removeFavoriteTask: (id: string) => set((state) => ({
        favoriteTaskIds: state.favoriteTaskIds.filter((e) => e !== id)
      }))
    }));

    // Seleccion especifica
    const addTaskStore = useFavoriteTask(state => state.addFavoriteTask);    

    //O desestructuracion predeterminada
    const { addFavoriteTask: addTaskStore, removeFavoriteTask: removeTaskStore } = useFavoriteTask();
   ```

Análisis:
1. Rendimiento: La primera forma es ligeramente más eficiente en términos de rendimiento. Zustand solo volverá a renderizar el componente si las propiedades específicas que seleccionaste cambian. Con la desestructuración completa, el componente podría re-renderizarse si cualquier parte del estado cambia, aunque no uses todas las propiedades.
2. Tipado: Ambas formas mantienen el tipado correcto en TypeScript, así que no hay preocupaciones en ese aspecto.
3. Claridad: La primera forma es más explícita sobre qué partes del estado se están utilizando, lo que puede hacer que el código sea más fácil de entender y mantener.
4. Errores en ejecución: No deberías experimentar errores en ejecución con ninguna de las dos formas, siempre y cuando uses las funciones correctamente (pasando el ID como lo estás haciendo).
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Zustand -> Handle local state
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

// Definición de tipos
interface Repo { id: number; name: string }
interface FavoriteReposState {
  favoriteRepos: Repo[];
  addFavoriteRepo: (repo: Repo) => void;
  removeFavoriteRepo: (repoId: number) => void;
  clearFavoriteRepos: () => void;
}

// Creación del store
export const useFavoriteReposStore = create<FavoriteReposState>()(
  devtools(
    persist(
      immer((set) => ({
        favoriteRepos: [],
        addFavoriteRepo: (repo) =>
          set((state) => {
            if (!state.favoriteRepos.some((r) => r.id === repo.id)) {
              state.favoriteRepos.push(repo);
            }
          }),
        removeFavoriteRepo: (repoId) =>
          set((state) => {
            state.favoriteRepos = state.favoriteRepos.filter((r) => r.id !== repoId);
          }),
        clearFavoriteRepos: () =>
          set((state) => {
            state.favoriteRepos = [];
          }),
      })),
      {
        name: 'favorite-repos-storage',
        getStorage: () => localStorage,
      }
    )
  )
);

// Selector de ejemplo
  export const selectFavoriteReposCount = (state: FavoriteReposState) => state.favoriteRepos.length;

  const favoriteRepos = useFavoriteReposStore((state) => state.favoriteRepos);
  const addFavoriteRepo = useFavoriteReposStore((state) => state.addFavoriteRepo);
  const favoriteCount = useFavoriteReposStore(selectFavoriteReposCount);
```
1. **Uso de middlewares**:
   - `immer`: Permite escribir código "mutable" que se convierte en actualizaciones inmutables, lo que hace que el código sea más legible y menos propenso a errores.
   - `devtools`: Habilita la integración con Redux DevTools para una mejor depuración.
   - `persist`: Permite persistir el estado en el almacenamiento local del navegador.
2. **Acciones más robustas**: Hemos definido acciones para añadir, eliminar y limpiar repositorios favoritos, con lógica para evitar duplicados.
3. **Selector**: Hemos agregado un selector de ejemplo que demuestra cómo se pueden derivar datos del estado.
4. **Uso de immer**: Permite "mutar" el estado directamente dentro de las acciones, lo que hace que el código sea más intuitivo y fácil de leer.
5. **Persistencia**: El estado se guarda automáticamente en el almacenamiento local, lo que mejora la experiencia del usuario entre sesiones.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Example component function
```ts
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {errors.map((e, i) => (
        <div key={i} className="bg-red-500 text-white">{e}</div>
      ))}

      <form onSubmit={onSubmit}>
        <FormField
          label="Title"
          register={register}
          name="title"
          required
          error={errsForm.title}
        />

        <FormField
          label="Description"
          register={register}
          name="description"
          required
          error={errsForm.description}
          as="textarea"
        />

        <FormField
          label="Date"
          register={register}
          name="date"
          type="date"
        />

        <button 
          type="submit" 
          className="bg-indigo-500 px-3 py-2 mt-3 rounded-md"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

interface FormFieldProps { label: string; register: any; name: string; required?: boolean; error?: any; as?: 'input' | 'textarea'; type?: string }

const FormField: React.FC<FormFieldProps> = ({ label, register, name, required, error, as = 'input', type = 'text' }) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    {as === 'textarea' ? (
      <textarea
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        {...register(name, { required })}
      />
    ) : (
      <input
        type={type}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        {...register(name, { required })}
      />
    )}
    {error && <p className="text-red-500">{label} is required</p>}
  </div>
);

export default TaskForm;
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### uso de mutation (Query React)
Ahora que tienes la sobrecarga de funciones, puedes hacer que tu función `mutation` acepte esta mutación flexible. Además, desestructurar los parámetros y organizar el código siguiendo las mejores prácticas aumentará la legibilidad y profesionalidad.

```typescript
export type Mutation = {
  (task: object): Promise<Task>;
  (id: string, task: object): Promise<Task>;
};

const useCustomMutation = ( method: Mutation, queryKey: string ) => {
  const queryClient = useQueryClient();
  return (data: object, id?: string) => {
    const build = useMutation({
      mutationFn: () => id ? method(id, data) : method(data),
      onSuccess: () => { queryClient.invalidateQueries({ queryKey: [queryKey] }) }
    });
    build.mutate(data);
  };
};

const mutation = useCustomMutation(createTask, 'tasks');
mutation({ title: 'Nueva Tarea' });

const mutation = useCustomMutation(updateTask, 'tasks');
mutation({ title: 'Tarea Actualizada' }, '123');
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Cómo maneja el "caching" de datos y las solicitudes repetidas (pagina reactiva)
### ¿Qué es React Query?
React Query es una biblioteca que facilita el manejo de solicitudes de datos y caching en aplicaciones React. Su mayor fortaleza es cómo maneja el "caching" de datos y las solicitudes repetidas, lo que evita hacer llamadas redundantes al backend. También optimiza automáticamente el rendimiento al invalidar datos solo cuando es necesario.

### Ventajas de React Query
- **Manejo de caché eficiente**: Almacena automáticamente las respuestas y las reutiliza cuando es posible.
- **Actualizaciones automáticas**: Puedes mantener actualizada la UI automáticamente cuando los datos cambian en el servidor.
- **Minimización del uso de `useEffect`**: Reduce la necesidad de manejar manualmente los efectos secundarios en componentes.
- **Sincronización en segundo plano**: Refresca los datos en segundo plano sin interrumpir la UI.
- **Reintentos automáticos**: En caso de error, puede reintentar la solicitud sin necesidad de escribir lógica adicional.

### Cómo hacer un request con React Query
Aquí tienes un ejemplo que puedes ajustar a tu implementación de `getTasks`:

```tsx
import { useQuery } from 'react-query';
import TaskCard from './TaskCard';
import { getTasks } from '../api/tasks'; // asumiendo que tienes un servicio de API

function Tasks() {
  const { data: tasks, error, isLoading, isError } = useQuery('tasks', getTasks);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks: {error.message}</div>;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
```

### Desglose de la sintaxis
1. **`useQuery`**: Esta función toma dos parámetros clave: 
   - **Una clave única** (`'tasks'` en este caso), que identifica el "query" (consulta).
   - **Una función de solicitud** (`getTasks`), que define cómo obtener los datos desde tu backend.
2. **Estados del "query"**:
   - **`isLoading`**: Indica si la consulta aún está en progreso.
   - **`isError`**: Indica si hubo un error en la solicitud.
   - **`data`**: Contiene los datos de la consulta cuando esta se completa correctamente.

Este `getTasks` hace una solicitud HTTP utilizando Axios para obtener los datos. React Query almacenará esos datos en caché y los reutilizará si es necesario.

### Revalidación automática y "stale" data
React Query maneja los datos en diferentes fases:
- **Fresh (frescos)**: Datos recién cargados.
- **Stale (caducos)**: Datos que pueden estar desactualizados, pero siguen en caché.
- **Refetching (actualizando)**: Los datos son nuevamente solicitados.
Por ejemplo, cuando vuelves a la página de tareas, si los datos aún son "fresh", no se vuelve a hacer una solicitud HTTP, pero si son "stale", React Query hará una nueva solicitud en segundo plano.

### Configuraciones avanzadas con `useQuery`
Puedes personalizar la forma en que las solicitudes se manejan. Algunas opciones avanzadas:
```tsx
useQuery('tasks', getTasks, {
  staleTime: 5000,  // Tiempo antes de que los datos se consideren "caducos"
  cacheTime: 10000,  // Tiempo que los datos se guardan en caché
  refetchOnWindowFocus: true,  // Refresca los datos cuando la ventana gana el foco
  retry: 2,  // Reintenta la solicitud dos veces si falla
});
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Resolver Cookies
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
  ```
### ---------------------------------------------------------------------------------------------------- ###


### ---------------------------------------------------------------------------------------------------- ###
## Partials < >
```typescript
export type Task = { 
  _id: string; 
  title: string; 
  description: string; 
  date: Date;
};

export const createTask = (overrides: Partial<Task> = {}): Task => ({
  _id: '',
  title: '',
  description: '',
  date: new Date(),
  ...overrides
});

function TaskCard({ task }: TaskCardProps) {
  const taskWithDefaults = createTask(task);
  return (<h1 className="text-2xl font-bold"> Title: {taskWithDefaults.title} </h1>);
}

export default TaskCard;
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### 1. Uso de Default Values en el Tipado
Podrías aprovechar los valores por defecto en la desestructuración directamente en el componente. Esto ayuda a evitar que tengas que hacer chequeos adicionales para cada propiedad.
```typescript
export type Task = { 
  _id?: string, 
  title?: string, 
  description?: string, 
  date?: Date 
}
function TaskCard({ task = {} as Task }: TaskCardProps) {
  return (
    <h1 className="text-2xl font-bold"> Title: {task.title ?? 'No Title'} </h1>
    <div className="flex gap-x-2 items-center">
      <button onClick={() => deleteTask(task._id ?? '')}>Delete</button>
      <button>Edit</button>
    </div>
  )
}
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Usar Genéricos y Tipos Opcionales

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

## Usar Tipo Personalizado
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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Usar useNavigate() or <Navigate>
### Navigate (Componente):
Navigate es un componente de React Router que redirige automáticamente a una ruta específica cuando se renderiza.
Se usa principalmente cuando necesitas redirigir de forma declarativa, es decir, basado en condiciones dentro del JSX.
Es ideal cuando la redirección depende del resultado de una condición lógica directamente en la estructura de los componentes.
```typescript
if (!isAuth) return <Navigate to="/login" replace />;//El componente Navigate tiene la ventaja de ser conciso y declarativo, ideal para redirecciones inmediatas dentro de la estructura del JSX.
```
### useNavigate (Hook):
useNavigate es un hook de React Router que te permite realizar redirecciones de manera programática desde funciones y efectos (useEffect), dándote más control sobre cuándo y cómo ocurre la redirección.
Se usa principalmente cuando necesitas realizar una navegación como respuesta a eventos, funciones asíncronas, o después de ejecutar lógica adicional.
```typescript
useEffect(() => { if (isAuth) navigate('/tasks') }, [isAuth]);//useNavigate es muy útil en flujos complejos donde la redirección depende de múltiples factores que no puedes determinar solo con JSX.
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Uso de Casting (... as Task) ===> ! Prevención !
Usar el casting directo como `res.data as Tasks` es una técnica común, pero puede ser riesgosa si no estás completamente seguro del tipo de datos que recibirás. Aquí te explico algunas consideraciones y mejores prácticas para asegurar un código más robusto:
### 1. **Evitar el Casting Directo en Favor de la Validación**:
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
### 2. **Uso de Type Assertions con Precaución**:
   Si decides mantener el casting, ten en cuenta que es una "apuesta" sobre la estructura de los datos. A veces es inevitable, pero debería usarse solo cuando estés seguro de los datos:
   ```typescript
   setTasks(res.data as Tasks);
   ```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Tipificando las Respuestas en Express:
Es posible que desees controlar el tipo de datos que respondes en res.json. Considera definir una respuesta estructurada con interfaces:
```typescript
interface ResponseData { message: string, data?: string[] }
res.status(200).json({ message: messageFormat(tasks) } as ResponseData);
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Paso 1: Definir Tipos de Respuesta
```ts
interface UserCredentials {
  email: string;
  username: string;
}

import { AxiosResponse } from "axios";

export const tokenCredentialsRequest = async (): Promise<AxiosResponse<UserCredentials>> => axios.get<UserCredentials>('/verify');

//useEffect
useEffect(() => {
    try {
      const res = await tokenCredentialsRequest();
      setUser(res.data);
    } catch (e: unknown) {
      if (!axios.isAxiosError(e)) return;
      const errorResponse = e.response?.data as ErrorResponse;
      setErrors(errorResponse.errors)
    }
}, []);
```
### Tipo Condicional para la Respuesta
```ts
type ApiResponse<T> = T | { errors: string[] };

export const tokenCredentialsRequest = async (): Promise<AxiosResponse<ApiResponse<UserCredentials>>> => {
  return axios.get<ApiResponse<UserCredentials>>('/verify');
};
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Retorno de multiples resultados en un unico retorno
### Tipo seguro = res + error opcional
### Tipo funcional = (Result Types o either) => (boolean) + res + error
### Promise<something = {data? error?}>, Promise<Result<> = T | error>

### 1. **Separar la Lógica de Autenticación del Controlador HTTP:**
   ```typescript
   //El controlador HTTP, en cambio, manejaría la lógica de la respuesta.
   async function verifyCredentials(email: string, password: string): Promise<User | null> {// Autenticación (pura lógica)
     const userFound = await User.findOne({ email });
     const isMatch = await verified(password, userFound?.password);
     return isMatch ? userFound : null;
   }
   export const login = async (req: Request, res: Response) => {// Controlador HTTP
       const { email, password } = req.body;
       const user = await verifyCredentials(email, password);
       if (!user) return res.status(403).json(["Invalid credentials"]);
   }
   ```
### 2. **Retornar un Objeto de Resultado con un Tipo Seguro:**
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
### 3. **Uso de Result Types o Either (Tipo Funcional):**
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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
## Type Guard (`e is ErrorResponse`)
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

## Type Assertion (`e as any`)
Por ejemplo puedes decirle a TypeScript que tratas a `e` como cualquier objeto para poder acceder a sus propiedades

Tenemos las siguientes situaciones
- **`typeof e === "object"`**: Esta validación comprueba si `e` es un objeto. En JavaScript y TypeScript, cualquier cosa que no sea `null`, `undefined`, o un tipo primitivo (como `string`, `number`, etc.) es considerada un objeto.
- **`e !== null`**: Aunque `null` es técnicamente un "objeto" en JavaScript, se añade esta condición para asegurarse de que `e` no sea `null`, evitando errores de acceso a propiedades.
- **`"response" in e`**: Aquí se usa la sintaxis `"propiedad" in objeto`, que verifica si la propiedad `response` existe dentro del objeto `e`. Es una forma eficiente y segura de comprobar la presencia de propiedades en un objeto.
- **`typeof (e as any).response === "object"`**: Una vez que se confirma que `response` existe, se asegura que `response` también sea un objeto. La parte `(e as any)` es un **type assertion** para decirle a TypeScript que tratas a `e` como cualquier objeto para poder acceder a sus propiedades.
- **`"data" in (e as any).response`**: Finalmente, verifica que la propiedad `data` esté dentro del objeto `response`.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Diferencias clave entre `type` e `interface`
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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Códigos de estado informativos (100-199)
100 Continue: El servidor ha recibido los encabezados de la solicitud y el cliente debe proceder a enviar el cuerpo de la solicitud.
101 Switching Protocols: El servidor acepta el cambio de protocolo solicitado por el cliente.
### Códigos de estado de éxito (200-299)
200 OK: La solicitud ha tenido éxito. La respuesta depende del método de solicitud utilizado.
201 Created: La solicitud ha sido cumplida y ha resultado en la creación de un nuevo recurso.
202 Accepted: La solicitud ha sido aceptada para procesamiento, pero aún no se ha completado.
204 No Content: La solicitud ha tenido éxito, pero el servidor no devuelve ningún contenido.
### Códigos de redirección (300-399)
301 Moved Permanently: La URL del recurso solicitado ha sido cambiada permanentemente.
302 Found: El recurso solicitado se encuentra temporalmente en una URL diferente.
304 Not Modified: El recurso no ha sido modificado desde la última solicitud.
### Códigos de error del cliente (400-499)
400 Bad Request: El servidor no puede procesar la solicitud debido a un error del cliente.
401 Unauthorized: La solicitud requiere autenticación del usuario.
403 Forbidden: El servidor entiende la solicitud, pero se niega a autorizarla.
404 Not Found: El recurso solicitado no se ha encontrado.
405 Method Not Allowed: El método de solicitud no está permitido para el recurso solicitado.
409 Conflict: La solicitud no puede ser completada debido a un conflicto con el estado actual del recurso.
422 Unprocessable Entity: El servidor entiende el tipo de contenido de la solicitud, pero no puede procesar las instrucciones contenidas en ella.
### Códigos de error del servidor (500-599)
500 Internal Server Error: El servidor ha encontrado una condición inesperada que le impide cumplir con la solicitud.
501 Not Implemented: El servidor no reconoce el método de solicitud y no puede soportarlo.
502 Bad Gateway: El servidor, actuando como una puerta de enlace o proxy, recibió una respuesta inválida del servidor ascendente.
503 Service Unavailable: El servidor no está disponible temporalmente, generalmente debido a mantenimiento o sobrecarga.
504 Gateway Timeout: El servidor, actuando como una puerta de enlace o proxy, no recibió una respuesta a tiempo del servidor ascendente.
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Uso de interfaz !IMPORTANT!
```typescript
import { Request } from "express";
export interface ExtendsRequest extends Request {
  user?: Auth; //remember that should be optional because "extends" from another interface
}
interface Auth {
  id: string;
}
```
### Ahora procedemos a lo siguiente...
```typescript
import { Response, NextFunction } from "express";
import { verifyAccessToken } from "../libs/jwt";
import { ExtendsRequest } from "../interfaces/request.interface";

export const authRequired = async (req: ExtendsRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Not found token, auth denied" });
  const user = await verifyAccessToken(token) as { id: string };
  if (!user.id) return res.status(401).json({ message: "Invalid token" });
  req.user = user;
  next();
};
```
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
### Expresiones de tipo:
**Verificación del tipo de dato**:
   ```typescript
   if (typeof decoded === 'object' && decoded !== null)
   ```
   Aquí estamos verificando si el valor de `decoded` es un objeto y no es `null`.
   
**Conversión de tipo usando `as`**:
   ```typescript
   const { id, exp } = decoded as jwt.JwtPayload;
    //or 
   resolve(decoded as { id: string });
   ```
   Esta línea está utilizando TypeScript para "asegurarle" que `decoded` es del tipo `jwt.JwtPayload`.


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
### ---------------------------------------------------------------------------------------------------- ###

### ---------------------------------------------------------------------------------------------------- ###
//See status
   ```powershell
   Get-ExecutionPolicy
   ```

//Unlock
   ```powershell
   Set-ExecutionPolicy RemoteSigned
   ```

//Lock
   ```powershell
   Set-ExecutionPolicy Restricted
   ```

### Orden de Middleware
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

### Middleware Específicos
#### `express.json()`
Este middleware analiza cuerpos de solicitud JSON. Si no se añade antes de tus rutas, `req.body` no estará disponible y será `undefined`.
#### `cors()`
Este middleware habilita CORS (Cross-Origin Resource Sharing), lo que permite o restringe las solicitudes de recursos en un servidor desde un origen diferente. Esto es especialmente útil para permitir que tu API sea accesible desde diferentes dominios.

### Conclusión
El orden de los middlewares en Express es crucial para asegurar que las solicitudes sean procesadas correctamente. Los middlewares como `express.json()` y `cors()` preparan la solicitud antes de que llegue a las rutas, garantizando que los datos estén disponibles y que las políticas de seguridad se apliquen correctamente.
### ---------------------------------------------------------------------------------------------------- ###

### -------------------------------------------------Commentaries------------------------------------------------- ###
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