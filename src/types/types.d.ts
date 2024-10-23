import 'mailtrap';

// declare namespace MailtrapAPI {
//   export type Permissions = {
//     can_read: boolean;
//     can_update: boolean;
//     can_destroy: boolean;
//     can_leave: boolean;
//   }
// }

declare namespace Permissions {
  type Permissions = {
      can_read: boolean;
      can_update: boolean;
      can_destroy: boolean;
      can_leave: boolean;
    }
}

// declare namespace Permissions {
//   type can_read = boolean;
//   type can_update = boolean;
//   type can_destroy = boolean;
//   type can_leave = boolean;
// }