export interface CURSOS {
    id: string;
    curso: string;
    Categoria: string;
    NroClases: Number;
    dificultad: string;
    descripcion: string;
  }
  export interface ICreateCursoPayload {
    curso: string | null;
    Categoria: string | null;
    NroClases: Number | null;
    dificultad: string | null;
    descripcion: string | null;
  }
