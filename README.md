This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


…or create a new repository on the command line
echo "# proyectoAngular" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/mauricioroteta/proyectoAngular.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/mauricioroteta/proyectoAngular.git
git branch -M main
git push -u origin main

## NOTAS PROPIAS

1. Creo el proyecto Angular => ng new Desafio01
2.  AppComponent: Este será el componente principal que contendrá todo el layout.
    Creo los otros 3 componentes:
      SidebarComponent: ng generate component sidebar
      ToolbarComponent: ng generate component toolbar
      alumnosComponent: ng generate component alumnos
3. En app-component creamos la estructura basica referenciando los 3 layouts anteriormente creados
4.  Importo en app.component.ts los componentes creados
    import { ToolbarComponent } from "./toolbar/toolbar.component";
    import { SidebarComponent } from "./sidebar/sidebar.component";
    import { alumnosComponent } from "./alumnos/alumnos.component";
5. Creo el contenido de cada componente en los html correspondiente.
6. Puedo correr el proyecto con ng serve
7. Proyecto git en https://github.com/mauricioroteta/angular-desafio01.git


Use https://www.mockaroo.com/ para generar el json

iconos = https://fonts.google.com/icons

paginador
npm install ngx-pagination --save
https://github.com/michaelbromley/ngx-pagination/blob/master/README.md


## Aplicacion subida a netlify
https://roteta-techschool.netlify.app/
