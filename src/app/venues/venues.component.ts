import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Venue } from '../model';
import { take } from 'rxjs';

@Component({
  selector: 'app-venues',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.scss'
})
export class VenuesComponent {

  constructor(private readonly httpClient: HttpClient) { 
    this.getArtists();
  }

  protected venues : Venue[] = [];

  private getArtists(): void {

    this.httpClient.get('http://localhost:5678/irishMusic/venue').pipe(
      take(1)).subscribe(
      (data) => {
        this.venues.push(... data as Venue[]);
      })
  }
}
