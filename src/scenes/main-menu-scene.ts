import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.add
      .text(100, 50, 'This is a sample main menu. Click the "Start" button below to run your game.', {
        color: '#FFFFFF',
      })
      .setFontSize(24);

    new MenuButton(this, 100, 150, 'Start Game', () => {
      this.scene.start('Bedroom', {firstime: true});
    });
    new MenuButton(this, 320, 150, 'Pleine écran', () => {
      this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()
    });


  }
}
