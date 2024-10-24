import 'mailtrap';
// import * as Inboxes from 'mailtrap/dist/types/api/inboxes';

declare module 'mailtrap/dist/types/api/projects' {
  export type Permissions = {
    can_read: boolean;
    can_update: boolean;
    can_destroy: boolean;
    can_leave: boolean;
  }

  // export type Permissions = {
  // }

  // export namespace Project {
  //   // Definir el tipo ShareLinks dentro del namespace
  //   type ShareLinks = {
  //     admin: string;
  //     viewer: string;
  //   };

  //   // Definir el tipo Permissions dentro del namespace
  //   type Permissions = {
  //     can_read: boolean;
  //     can_update: boolean;
  //     can_destroy: boolean;
  //     can_leave: boolean;
  //   };

  //   // Definir el tipo Project usando los tipos del mismo namespace
  //   export type Project = {
  //     id: number;
  //     name: string;
  //     share_links: ShareLinks;
  //     inboxes: Inbox[]; // Usar el tipo Inbox desde el namespace
  //     permissions: Permissions;  // Usar Permissions del mismo namespace
  //   };

  //   export {};
  // }
}


// export namespace Mailtrap {
//   export namespace Permissions {
//     export type Permissions = {
//       can_read: boolean;
//       can_update: boolean;
//       can_destroy: boolean;
//       can_leave: boolean;
//     }
//   }
// }

// declare module 'mailtrap/dist/types/api/projects.d.ts' {
//   export type Permissions = {
//     can_read: boolean;
//     can_update: boolean;
//     can_destroy: boolean;
//     can_leave: boolean;
//   }
//   export namespace Project {
//     export type permissions = Permissions;
//   }
// }