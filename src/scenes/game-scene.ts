import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  body: Phaser.Physics.Arcade.Body;
  public speed = 200;


  public cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  public yKey: Phaser.Input.Keyboard.Key;
  public aKey: Phaser.Input.Keyboard.Key;
  public tKey: Phaser.Input.Keyboard.Key;
  public keyObj: Phaser.Input.Keyboard.Key
  public keyObj2: Phaser.Input.Keyboard.Key
  public keyObj3: Phaser.Input.Keyboard.Key
  private spaceBar: Phaser.Input.Keyboard.Key
  // public followed: Phaser.Input.Keyboard.Key;
  public ennemy: Phaser.Physics.Arcade.Sprite;
  public girlMap: Phaser.Physics.Arcade.Sprite;
  public follow: boolean;
  private zone: Phaser.GameObjects.Zone
  public map: any;



  private doors: Phaser.Physics.Arcade.Image;
  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.follow = true;
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setVelocityY(203);
    this.ennemy = this.physics.add.sprite(356, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.5).setDragX(-100).setImmovable(false)
    this.girlMap.setScale(0.4)
    this.ennemy.setScale(0.4)
    this.ennemy.anims.play('walk', true)
    this.add.image(940, 390, 'bg').setDepth(-54);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey('SPACE');
    this.yKey = this.input.keyboard.addKey('Y');
    this.aKey = this.input.keyboard.addKey('A');
    this.tKey = this.input.keyboard.addKey('T');

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 4 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "goback",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'dos', start: 1, end: 7 }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "front",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'face', start: 1, end: 5 }),
      frameRate: 6,
      repeat: 0
    });
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 1, end: 5 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'jump', start: 0, end: 5 }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: "idle_walk",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'walk', start: 5, end: 5 }),
      frameRate: 1,
      repeat: -1
    });

    this.anims.create({
      key: "idle_attack",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 1 }),
      frameRate: 1,
      repeat: -1
    });

    this.zone = this.add.zone(956, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.zone);
    this.physics.world.enableBody(this.zone);

    this.zone.body.friction.x = 0;
    this.zone.body.allowGravity = false;
    this.zone.body.immovable = true;
    this.zone.depth = 30;
    this.physics.add.collider(this.girlMap, this.zone);
    this.ennemy.anims.play('walk', true)

    var collider = this.physics.add.overlap(this.girlMap, this.ennemy, function(e: Phaser.Physics.Arcade.Sprite, n: Phaser.Physics.Arcade.Sprite) {
      this.ennemy.body.stop();
      this.ennemy.anims.play('attack')
      this.ennemy.on('animationcomplete', () => {
        this.ennemy.anims.play('walk')
        e.setAlpha(0.4)

        this.goToTarget()
        this.stopTarget()
      })
    }, null, this);

    this.goToTarget()
  }

  public goToTarget() {
    this.physics.accelerateToObject(this.ennemy, this.girlMap, 200, 200, 200)
  }

  public stopTarget() {
    this.physics.add.overlap(this.girlMap, this.ennemy)
  }

  public update(): void {
    if (this.cursors.left.isDown) {
      this.girlMap.setVelocityX(-300);
      this.zone.x = this.girlMap.x;
      this.girlMap.flipX = true;

      this.girlMap.anims.play('walk', true);
    }
    else if (this.cursors.right.isDown) {
      this.girlMap.setVelocityX(300);
      this.zone.x = this.girlMap.x;

      this.girlMap.flipX = false;
      this.girlMap.anims.play('walk', true);
    }
    else if (this.spaceBar.isDown) {

      if (!this.girlMap.anims.getFrameName().includes("jump")) {
        this.girlMap.anims.play('jump');
        this.ennemy.on('animationcomplete', () => {
          this.ennemy.anims.play('walk')
        })

      }
      if (this.girlMap.body.touching.down) {
        this.girlMap.setVelocityY(-530);
      }

    }
    else {
      this.girlMap.setVelocityX(0);

      this.girlMap.anims.play('idle_walk');
    }
  }
}
