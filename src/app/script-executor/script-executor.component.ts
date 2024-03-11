import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Script, emptyScript } from '../model';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-script-executor',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './script-executor.component.html',
  styleUrl: './script-executor.component.scss'
})
export class ScriptExecutorComponent implements AfterViewInit {

  protected selectedScript = emptyScript;
  protected allScripts: Script[] = [];
  protected result: string = "";

  constructor(private readonly httpClient: HttpClient) { }

  ngAfterViewInit(): void {

    this.httpClient.get<Script[]>('http://localhost:5678/irishMusic/script').pipe(
      take(1)
      ).subscribe((scripts) =>  { 
      this.allScripts = scripts;
    });
  }

  protected loadScript() : void {

    if (!this.selectedScript.id) {
      this.selectedScript = emptyScript;
    }
    else {
      this.httpClient.get<Script>(`http://localhost:5678/irishMusic/script/${this.selectedScript.id}`).pipe(
        take(1)
      ).subscribe((script) => {
        this.selectedScript = script;
      })
    }
  }

  protected execute() : void {

    if (!this.selectedScript.id) {
      this.result = "";
    }
    else {
      this.httpClient.post<any>('http://localhost:5678/irishMusic/evaluateExpression', this.selectedScript.code).pipe(
        take(1)
      ).subscribe((result) => this.result = result);
    }
  }
}
