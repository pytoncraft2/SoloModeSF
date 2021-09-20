import * as Phaser from 'phaser';
import Scenes from './scenes';
import MoveToPlugin from 'phaser3-rex-plugins/plugins/moveto-plugin.js';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,
  plugins: {
    global: [{
        key: 'rexMoveTo',
        plugin: MoveToPlugin,
        start: true
    },
    ]
},

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 900 },
      debug: false,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
