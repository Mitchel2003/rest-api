import 'mailtrap';

// Extendemos las definiciones de tipos para 'mailtrap'
declare module 'mailtrap' {
  // Declaramos la interfaz Permissions
  export interface Permissions {
    can_read: boolean;
    can_update: boolean;
    can_destroy: boolean;
    can_leave: boolean;
  }

  // Aseguramos que Project use la interfaz Permissions correctamente
  export interface Project {
    id: number;
    name: string;
    share_links: {
      admin: string;
      viewer: string;
    };
    inboxes: Inbox[];
    permissions: Permissions;
  }

  // Declaramos la interfaz Inbox para mantener la coherencia
  export interface Inbox {
    // ... otros campos ...
    permissions: Permissions;
  }
}

// Si necesitas usar Permissions fuera del contexto de mailtrap, puedes exportarlo así:
export type MailtrapPermissions = import('mailtrap').Permissions;
