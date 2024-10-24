// import 'mailtrap';
// import { Inbox } from 'mailtrap/dist/types/api/inboxes';

export namespace Mailtrap {

  export namespace Permissions {
    export type Permissions = {
      can_read: boolean;
      can_update: boolean;
      can_destroy: boolean;
      can_leave: boolean;
    }
  }

  // export namespace Project {
  //   export type Permissions = {
  //     can_read: boolean;
  //     can_update: boolean;
  //     can_destroy: boolean;
  //     can_leave: boolean;
  //   }

  //   export type permissions = Permissions;
  // }
}

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