import { Component } from '@angular/core';
import { Artist } from '../model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {

  constructor(private readonly httpClient: HttpClient,
    private readonly sanitizer: DomSanitizer) { 
      
    this.getArtists();
  }

  protected artists : Artist[] = [];

  private getArtists(): void {

    this.httpClient.get<Artist[]>('http://localhost:5678/irishMusic/artist').pipe(
      take(1)
      ).subscribe(
      (data) => {
        data.forEach((oneArtist) => {
          let objectURL = 'data:image/png;base64,' + oneArtist.photo;
          oneArtist.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });

        this.artists.push(... data);
      })
  }
}
