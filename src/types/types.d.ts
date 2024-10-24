// import 'mailtrap';

// Aseguramos que PermissionsApi use nuestra versión de Permissions
// declare module 'mailtrap/dist/lib/api/resources/Permissions' {
//   export default class PermissionsApi {
//     // Métodos que usan nuestra versión de Permissions
//   }
// }
// import { Inbox } from 'mailtrap/dist/types/api/inboxes';

declare module 'mailtrap/dist/types/api/projects.d.ts' {

  export type Permissions = {
    can_read: boolean;
    can_update: boolean;
    can_destroy: boolean;
    can_leave: boolean;
  }

  export namespace Project {
    export type permissions = Permissions;
  }
}