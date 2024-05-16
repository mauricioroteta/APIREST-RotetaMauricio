export interface iClasesAlumno {
  id: number;
  clasesPresente: number;
  puntos: number;
}

export interface CLASES {
  id: number;
  idCurso: number;
  fechaIni: Date;
  horaIni:  string;
  horaFin: string;
}
