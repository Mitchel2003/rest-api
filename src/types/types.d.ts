import 'mailtrap';
import PermissionsApi from 'mailtrap/dist/lib/api/resources/Permissions';
import ProjectsApi from 'mailtrap/dist/lib/api/resources/Projects';

// Definimos nuestra propia versión de Permissions
interface Permissions {
  can_read: boolean;
  can_update: boolean;
  can_destroy: boolean;
  can_leave: boolean;
}

// Definimos nuestra propia versión de Inbox
interface Inbox {
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

// Definimos nuestra propia versión de Project
interface Project {
  id: number;
  name: string;
  share_links: {
    admin: string;
    viewer: string;
  };
  inboxes: Inbox[];
  permissions: Permissions;
}

// Extendemos el módulo 'mailtrap' para incluir nuestras definiciones
declare module 'mailtrap' {
  export { Permissions, Inbox, Project };
  
  // Redefinimos ProjectsApi para usar nuestra versión de Project
  export class ProjectsApi {
    create(projectName: string): Promise<Project>;
    getList(): Promise<Project[]>;
    getById(projectId: number): Promise<Project>;
    update(projectId: number, updatedName: string): Promise<Project>;
    delete(projectId: number): Promise<Project>;
  }
}

// Aseguramos que PermissionsApi use nuestra versión de Permissions
declare module 'mailtrap/dist/lib/api/resources/Permissions' {
  export default class PermissionsApi {
    // Métodos que usan nuestra versión de Permissions
  }
}

// Exportamos nuestros tipos para uso en otros archivos si es necesario
export { Permissions, Inbox, Project };