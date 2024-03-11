import * as Blockly from 'blockly';
import { CategoryInfo, StaticCategoryInfo } from 'blockly/core/utils/toolbox';

export interface CategoryStyleInfo {
    icon: string;
    name: string;
}

export const categoryStyles: { [key: string]: CategoryStyleInfo } = {
    logic_category: { icon: 'settings', name: 'Logische<br>Ausdrücke' },
    loop_category: { icon: 'repeat', name: 'Schleifen' },
    math_category: { icon: 'calculate', name: 'Mathematische<br>Ausdrücke' },
    text_category: { icon: 'edit_note', name: 'Text' },
    list_category: { icon: 'list', name: 'Listen' },
    colour_category: { icon: 'palette', name: 'Farben' },
    variable_category: { icon: 'abc', name: 'Basis-<br>variablen' },
    procedure_category: { icon: 'functions', name: 'Funktionen' },
    events_category: { icon: 'table_view', name: 'Events' },
    search_category: { icon: 'search', name: 'Geschäftsobjekt-<br>suche' },
  };

export class CustomCategory extends Blockly.ToolboxCategory {

    categoryIcon?: HTMLSpanElement;
    categoryLabel?: HTMLSpanElement;

    constructor(categoryDef: CategoryInfo, toolbox: Blockly.IToolbox, opt_parent: Blockly.ICollapsibleToolboxItem) {

        if (categoryDef.categorystyle) {
            (categoryDef as StaticCategoryInfo).name = categoryStyles[categoryDef.categorystyle].name;
          }

        super(categoryDef, toolbox, opt_parent);
    }

    protected override createLabelDom_(name: string): Element {
        this.categoryLabel = document.createElement('label');
        this.categoryLabel.className = 'blocklyTreeLabel';
    
        const parts = name.split('<br>');
        if (parts.length === 2) {
          this.categoryLabel.appendChild(this.createSpan(parts[0]));
          this.categoryLabel.appendChild(this.createSpan(parts[1]));
        } else {
          this.categoryLabel.appendChild(this.createSpan(name));
        }
        return this.categoryLabel;
      }

    protected override createIconDom_(): Element {
        const style = this.toolboxItemDef_.categorystyle;
        let iconName = '';
        if (!style) {
            iconName = 'cancel';
        }
        else {
            iconName = categoryStyles[style].icon;
        }

        this.categoryIcon = this.createSpan(iconName);
        this.categoryIcon.className = 'blockly-category-icon';
        this.categoryIcon.style.color = 'black';
        return this.categoryIcon;
    }

    private createSpan(text: string): HTMLSpanElement {
        const span = document.createElement('span');
        span.textContent = text;
        span.style.display = 'flex';
        span.style.justifyContent = 'center';
        return span;
    }
} 