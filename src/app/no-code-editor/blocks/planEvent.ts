import * as Blockly from 'blockly';
import { Block } from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

export const planEventBlockName = 'planEvent';

const FIELD_NAME_ARTIST_ID = 'artistId';
const FIELD_NAME_VENUE_ID = 'venueId';

export const initializePlanEventBlock = () => {

  Blockly.Blocks[planEventBlockName] = {
    init: function (this: Blockly.BlockSvg) {

        this.appendValueInput(FIELD_NAME_ARTIST_ID).appendField('Plan event with artist ID: ').setCheck(['Number']);
        this.appendValueInput(FIELD_NAME_VENUE_ID).appendField('and venue ID').setCheck(['Number']);

        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true);
        this.setTooltip(
            'Schedule event for the given artist and venue IDs.'
        );

        this.setColour("#FF00FF");
    },
  };

  javascriptGenerator.forBlock[planEventBlockName] = function (block: Block) {
    
    const artistId = javascriptGenerator.valueToCode(block, FIELD_NAME_ARTIST_ID, Order.MEMBER);
    const venueId = javascriptGenerator.valueToCode(block, FIELD_NAME_VENUE_ID, Order.MEMBER);

    return [`eventPlanning.planEvent(${artistId}L, ${venueId}L)`, Order.MEMBER];
  };
};
