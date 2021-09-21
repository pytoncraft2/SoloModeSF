import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload(): void {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;

    const progressBarHeight = 100;
    const progressBarWidth = 400;

    const progressBarContainer = this.add.rectangle(
      halfWidth,
      halfHeight,
      progressBarWidth,
      progressBarHeight,
      0x000000,
    );
    const progressBar = this.add.rectangle(
      halfWidth + 20 - progressBarContainer.width * 0.5,
      halfHeight,
      10,
      progressBarHeight - 20,
      0x888888,
    );

    const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
    const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
    const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

    this.load.on('progress', (value:any) => {
      progressBar.width = (progressBarWidth - 30) * value;

      const percent = value * 100;
      percentText.setText(`${percent}%`);
    });

    this.load.on('fileprogress', (file:any) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();

      this.scene.start('MainMenu');
    });

    this.loadAssets();
  }

  /**
   * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
   * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
   * is currently active, so they can be accessed anywhere.
   */
  private loadAssets() {
    // Load sample assets
    this.load.image('bg', 'assets/fond/streetOfRage.png');
    // this.load.image('doors', 'assets/fond/doors.png');
    this.load.image('bg2', 'assets/fond/bgMenu.png');
    this.load.atlas('ennemy', 'assets/personnages/dessinatrice2/dessinatrice2.png', 'assets/personnages/dessinatrice2/dessinatrice2_atlas.json');
    this.load.atlas('dessinatrice1', 'assets/personnages/dessinatrice1/dessinatrice1.png', 'assets/personnages/dessinatrice1/dessinatrice1_atlas.json');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('barrel', 'assets/barrel.png')
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('profilPanel', 'assets/profilPanel.png');
//     this.load.spritesheet('bird', 'assets/personnages/bird/bird.png', {
// frameWidth: 240,
// frameHeight:320
// })

    // Source: Open Game Art
    // this.load.image('girl', 'assets/sprites/dessinatrice1_.png');
  }
}
