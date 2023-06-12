import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routeProps: Routes = [
  {
    path: 'basic',
    title: 'Increment/Decrement',
    loadComponent: () => import('./basic/basic.component').then(c => c.HomeComponent),
    data: { icon: 'router' }
  },
  {
    path: 'todos',
    title: 'Todos',
    loadComponent: () => import('./todos/todos.component').then(c => c.TodosComponent),
    data: { icon: 'format_list_numbered' }
  }
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  ...routeProps,
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
