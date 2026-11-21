import { Routes } from '@angular/router';
export const routes:Routes=[{path:'',loadComponent:()=>import('./home').then(module=>module.Home),title:'Nexo | Tecnologia bem estruturada para seu negócio'},{path:'**',redirectTo:''}];
