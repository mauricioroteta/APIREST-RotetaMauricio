export type UsuarioRol = 'admin' | 'user';

export interface USUARIOS {
  id: Number;
  userName: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  activo: boolean;
  avatar: string;
  rol: string;
  password: string;
}

export interface CreateUSUARIOPayload {
  userName: string | null;
  nombre: string | null;
  apellido: string | null;
  telefono: string | null;
  email: string | null;
  activo: boolean | null;
  avatar: string | null;
  rol: string | null;
  password: string | null;
}
