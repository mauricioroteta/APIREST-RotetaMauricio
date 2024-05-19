export interface CURSOSxALUMNO {
  idClass: string;
  clasesPresente: number;
  puntos: number;
}

export interface ALUMNOS {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  activo: boolean;
  avatar: string;
  clases: CURSOSxALUMNO[];
}

export interface ICreateAlumnoPayload {
  nombre: string | null;
  apellido: string | null;
  telefono: string | null;
  email: string | null;
  activo: boolean | null;
  avatar: string | null;
  clases: CURSOSxALUMNO[] | null;
}
