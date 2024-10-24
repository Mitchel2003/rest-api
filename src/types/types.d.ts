import 'mailtrap';

declare module 'mailtrap/dist/types/api/projects' {
  export type Permissions = {
    can_read: boolean;
    can_update: boolean;
    can_destroy: boolean;
    can_leave: boolean;
  }
}