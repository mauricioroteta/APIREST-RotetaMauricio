export interface CURSOSxALUMNO {
  id: number;
  clasesPresente: number;
  puntos: number;
}

export interface ALUMNOS {
  id: Number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  activo: boolean;
  avatar: string;
  cursosA?: CURSOSxALUMNO[];
}
