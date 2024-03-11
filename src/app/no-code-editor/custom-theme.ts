import * as Blockly from 'blockly';

export const CustomTheme = {

    name: 'custom-theme',
    base: Blockly.Themes.Zelos,
    categoryStyles: {
        events_category: { colour: '#FF00FF' },
    },
    blockStyles: {
        events_blocks: { colourPrimary: "#FF00FF" },
    },
    componentStyles: {
        workspaceBackgroundColour: '#fff',
        toolboxBackgroundColour: '#d0d0d0',
        toolboxForegroundColour: '#000',
    },
};
