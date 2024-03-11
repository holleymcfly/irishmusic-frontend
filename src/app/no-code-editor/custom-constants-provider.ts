import * as Blockly from 'blockly';

export class CustomConstantsProvider extends Blockly.geras.ConstantProvider {
  constructor() {
    super();

    this.ADD_START_HATS = true;
  }
}
