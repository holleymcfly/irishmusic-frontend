import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Artist, Event, Venue } from '../model';
import { Observable, forkJoin, map, mergeMap, take} from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  
  protected events$ : Observable<Event[]>;

  constructor(private readonly httpClient: HttpClient) { 
    this.events$ = this.getFullEvents();
  }

  getFullEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:5678/irishMusic/event').pipe(
      mergeMap((events) => {

        const events$: Observable<Event>[] = events.map((event) => {

          const artist$ = this.httpClient.get<Artist>(`http://localhost:5678/irishMusic/artist/${event.artistId}`);
          const venue$ = this.httpClient.get<Venue>(`http://localhost:5678/irishMusic/venue/${event.venueId}`);

          // combine additional service calls
          return forkJoin([artist$, venue$]).pipe(
            map(([artist, venue]) => {
              return { ...event, artist: artist, venue: venue };
            })
          );
        });

        // combine to one single Observable
        return forkJoin(events$);
      }),
      take(1)
    );
  }
}
