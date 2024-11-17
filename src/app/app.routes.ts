import { Routes } from '@angular/router';
import { GameListComponent } from './pages/game-list/game-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyListsComponent } from './pages/my-lists/my-lists.component';
import { GameDetailsComponent } from './pages/game-details/game-details.component';
import { MyListDetailsComponent } from './pages/my-list-details/my-list-details.component';

export const routes: Routes = [
    {path:'gameList', component: GameListComponent},
    {path:'home-page', component:HomePageComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'my-lists', component: MyListsComponent},    
    {path: 'gameDetails/:id', component: GameDetailsComponent},
    {path: 'my-list-details' , component: MyListDetailsComponent},
    
    
    
    
    
    
    
    // default routes
    {
        path: '', redirectTo:'/home-page' , pathMatch:'full'
    },
    {
        path: '**', component: NotFoundComponent
    }
];
