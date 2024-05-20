export interface iClasesAlumno {
  id: string;
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
