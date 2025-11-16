import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CategoriesComponent } from './pages/categories/categories';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { RegisterComponent } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard';
import { ProductsComponent } from './pages/products/products';
import { BulkUploadComponent } from './pages/bulk-upload/bulk-upload';
import { ReportsComponent } from './pages/reports/reports';
import { DashboardOverviewComponent } from './pages/dashboard-overview/dashboard-overview';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'categories', component: CategoriesComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'bulk-upload', component: BulkUploadComponent },
            { path: 'reports', component: ReportsComponent },
            { path: 'dashboard', component: DashboardOverviewComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    { path: '**', redirectTo: '' }
];
