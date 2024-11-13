import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';

export const routes: Routes = [
    {path:'gameList', component: GameListComponent},
    {path:'home-page', component:HomePageComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'my-lists', component: MyListsComponent},    
    
    
    
    
    
    
    
    
    // default routes
    {
        path: '', redirectTo:'/home-page' , pathMatch:'full'
    },
    {
        path: '**', component: NotFoundComponent
    }
];
