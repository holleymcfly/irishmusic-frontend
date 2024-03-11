import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as Blockly from 'blockly';
import { toolbox } from './toolbox';
import {javascriptGenerator} from 'blockly/javascript';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Script, emptyScript } from '../model';
import { map, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initializePlanEventBlock } from './blocks/planEvent';
import { CustomCategory } from './custom-category';
import { CustomTheme } from './custom-theme';
import { CustomRenderer } from './custom-renderer';

@Component({
  selector: 'app-no-code-editor',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  template: '',
  templateUrl: './no-code-editor.component.html',
  styleUrl: './no-code-editor.component.scss'
})
export class NoCodeEditorComponent implements AfterViewInit, OnDestroy {

  private workspace?: Blockly.WorkspaceSvg;

  protected selectedScript = emptyScript;

  protected allScripts: Script[] = [];

  constructor(private readonly httpClient: HttpClient) { }

  ngAfterViewInit(): void {

    Blockly.registry.register(
      Blockly.registry.Type.TOOLBOX_ITEM,
      Blockly.ToolboxCategory.registrationName,
      CustomCategory,
      true
    );

    Blockly.blockRendering.register('custom-renderer', CustomRenderer);

    this.workspace = Blockly.inject('blocklyDiv', {
      scrollbars: false,
      toolbox: toolbox,
      theme: CustomTheme,
      renderer: 'custom-renderer'
    });

    initializePlanEventBlock();
    
    this.workspace.addChangeListener(() => {
      if (this.selectedScript) {
        const code = javascriptGenerator.workspaceToCode(this.workspace);
        this.selectedScript.code = code;
        //  this.selectedScript.code = javascriptGenerator.workspaceToCode(this.workspace);
      }
    });

    this.httpClient.get<Script[]>('http://localhost:5678/irishMusic/script').pipe(
      take(1)
      ).subscribe((scripts) =>  { 
      this.allScripts = scripts;
      this.initWorkspace() 
    });
  }

  ngOnDestroy(): void {
    Blockly.registry.unregister('renderer', 'custom-renderer');
  }

  private initWorkspace(): void {
    if (this.selectedScript.workspace && this.workspace) {
      Blockly.serialization.workspaces.load(JSON.parse(this.selectedScript.workspace), this.workspace);
    }
    else {
      this.workspace?.clear();
    }
  }

  protected save() : void {

    if (this.selectedScript && this.workspace) {
      this.selectedScript.workspace = JSON.stringify(Blockly.serialization.workspaces.save(this.workspace));

      this.httpClient.put<Script>('http://localhost:5678/irishMusic/script', this.selectedScript).pipe(
        take(1)
      ).subscribe(() => this.loadAllScripts()
      );
    }
  }

  private loadAllScripts() : void {

    this.httpClient.get<Script[]>('http://localhost:5678/irishMusic/script').pipe(
      take(1)
      ).subscribe((scripts) =>  { 
      this.allScripts = scripts;
    });
  }

  protected loadScript() : void {;

    if (!this.selectedScript.id) {
      this.selectedScript = emptyScript;
      this.initWorkspace();
    }
    else {
      this.httpClient.get<Script>(`http://localhost:5678/irishMusic/script/${this.selectedScript.id}`).pipe(
        take(1)
      ).subscribe((script) => {
        this.selectedScript = script;
        this.initWorkspace();
      })
    }
  }

  protected new(): void {
    this.httpClient.post<Script>('http://localhost:5678/irishMusic/script', { name: 'neues Script'}).pipe(
      map((newScript) => {
        this.selectedScript = newScript;
        this.allScripts.push(newScript);
        this.loadScript();
      }),
      take(1)
    ).subscribe(() => this.initWorkspace());
  }

  protected delete(): void {

    if (this.selectedScript && this.selectedScript.id != -1) {
      
      this.httpClient.delete(`http://localhost:5678/irishMusic/script/${this.selectedScript.id}`).pipe(
        take(1)
      ).subscribe(() =>  {
        this.selectedScript = emptyScript;
        this.loadAllScripts();
        this.loadScript();
      });
    }
  }
}
