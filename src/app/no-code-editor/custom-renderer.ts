import * as Blockly from 'blockly';
import { ConstantProvider } from 'blockly/core/renderers/geras/constants';
import { CustomConstantsProvider } from './custom-constants-provider';

export class CustomRenderer extends Blockly.geras.Renderer {
  constructor(name: string) {
    super(name);
  }

  override makeConstants_(): ConstantProvider {
    return new CustomConstantsProvider();
  }
}
