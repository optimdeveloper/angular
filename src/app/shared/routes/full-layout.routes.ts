import { Routes, RouterModule } from '@angular/router';
import { UsersEditComponent } from 'app/corporativo/users-edit/users-edit.component';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'corporativo',
    loadChildren: () => import('../../corporativo/corporativo.module').then(m => m.CorporativoModule)
  },
  {
    path: 'corporativo/detalle/:id',
    component: UsersEditComponent,
    data: {
      title: 'detalle'
    }
  }
];
