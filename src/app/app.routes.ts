import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    
    
    
    
    
    
    
    
    
    
    // default routes
    {
        path: '', redirectTo:'/homepage' , pathMatch:'full'
    },
    {
        path: '**', component: NotFoundComponent
    }
];
