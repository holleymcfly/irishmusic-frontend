import { Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { VenuesComponent } from './venues/venues.component';
import { EventsComponent } from './events/events.component';
import { NoCodeEditorComponent } from './no-code-editor/no-code-editor.component';
import { ScriptExecutorComponent } from './script-executor/script-executor.component';

export const routes: Routes = [ 
    { path: 'artists', component: ArtistsComponent },
    { path: 'venues', component: VenuesComponent },
    { path: 'events', component: EventsComponent },
    { path: 'no-code', component: NoCodeEditorComponent },
    { path: 'script-executor', component: ScriptExecutorComponent }
];
