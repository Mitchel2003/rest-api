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

  // Aseguramos que Inbox use la interfaz Permissions correctamente
  export interface Inbox {
    id: number;
    name: string;
    username: string;
    password: string;
    max_size: number;
    status: string;
    email_username: string;
    email_username_enabled: boolean;
    sent_messages_count: number;
    forwarded_messages_count: number;
    used: boolean;
    forward_from_email_address: string;
    project_id: number;
    domain: string;
    pop3_domain: string;
    email_domain: string;
    smtp_ports: number[];
    pop3_ports: number[];
    emails_count: number;
    emails_unread_count: number;
    last_message_sent_at: string | null;
    max_message_size: number;
    permissions: Permissions;
  }

  // Redefinimos Project para incluir Permissions
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

  

  // // Extendemos la definición del módulo principal de Mailtrap
  // export interface MailtrapClient {
  //   send(options: any): Promise<any>;
  //   // ... otros métodos ...
  // }
}

// Declaración global para asegurar que Permissions esté disponible en todo el proyecto
declare global {
  namespace Mailtrap {
    interface Permissions {
      can_read: boolean;
      can_update: boolean;
      can_destroy: boolean;
      can_leave: boolean;
    }
  }
}

// Exportamos Permissions para uso fuera del contexto de Mailtrap si es necesario
export type MailtrapPermissions = Mailtrap.Permissions;