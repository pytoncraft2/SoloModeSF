const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Bedroom',
};

export class BedroomScene extends Phaser.Scene {
  body: Phaser.Physics.Arcade.Body;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private health = 100
  private doors: Phaser.Physics.Arcade.Image
  public events: Phaser.Events.EventEmitter;
  private yKey: Phaser.Input.Keyboard.Key;
  public follow: boolean;
  private mKey: Phaser.Input.Keyboard.Key;
  private nKey: Phaser.Input.Keyboard.Key;
  private aKey: Phaser.Input.Keyboard.Key;
  private eKey: Phaser.Input.Keyboard.Key;
  private pKey: Phaser.Input.Keyboard.Key;
  private tKey: Phaser.Input.Keyboard.Key;
  private zKey: Phaser.Input.Keyboard.Key;
  private ombre: Phaser.GameObjects.Ellipse
  private fullscreen: Phaser.GameObjects.Text;
  private protect: Phaser.GameObjects.Ellipse
  private pannelRight: Phaser.GameObjects.Rectangle
  private pannelBottom: Phaser.GameObjects.Rectangle
  private count: number;
  private ctrlKey: Phaser.Input.Keyboard.Key
  private cKey: Phaser.Input.Keyboard.Key
  private spaceBar: Phaser.Input.Keyboard.Key
  private ennemy: Phaser.Physics.Arcade.Sprite;
  private ennemy2: Phaser.Physics.Arcade.Sprite;
  private ennemy3: Phaser.Physics.Arcade.Sprite;
  private ennemy4: Phaser.Physics.Arcade.Sprite;
  private girlMap: Phaser.Physics.Arcade.Sprite;
  private graphics!: Phaser.GameObjects.Graphics;
  private portal: any;
  // private block1: Phaser.Physics.Arcade.Image;
  private block1: Phaser.Physics.Arcade.Image ;
  public block2: Phaser.Physics.Arcade.Image;
  public block3: Phaser.Physics.Arcade.Image;
  public block4: Phaser.Physics.Arcade.Image;
  public imageFakhear: any;
  private enemies: any;
  // private barrelGroup: Phaser.GameObjects.Group;
  private info: Phaser.GameObjects.Text;
  public fakehear: Phaser.GameObjects.Text;
  public abonner: Phaser.GameObjects.Text;
  private zone: Phaser.GameObjects.Zone
  private barrelzone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone
  private lastHealth = 100
  private firstTimeEnteringWorld: boolean

  constructor() {
    super(sceneConfig);
  }

  public init(data) {
    this.firstTimeEnteringWorld = data.firstime;
  }

  public create(): void {

    //LIMITE CAMERA
    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);
    this.cameras.main.fadeIn(2000);

    //PANNEL VIEWER (Twitch) + VIE
    this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);


    this.abonner = this.add.text(this.game.scale.width - 530, this.game.scale.height - 150, '❤️ Viewer: 400', { font: '23px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    this.fakehear = this.add.text(this.game.scale.height - 765, this.game.scale.height - 150, 'FAKHEAR', { font: '19px Georgia, "Goudy Bookletter 1911", Times, serif' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    this.fullscreen = this.add.text(this.game.scale.height + 190, this.game.scale.height - 190, ['↕']).setFontSize(58).setFontFamily('Trebuchet MS').setColor('#00ffff').setShadow(2, 2, "#333333", 2, true, true).setDepth(202);

    // this.fakehear = this.add.text(-300, 870, 'FAKHEAR', { font: '38px Arial' }).setScrollFactor(0).setDepth(203).setAlpha(1);
    this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(1);
    this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(1);
    this.graphics = this.add.graphics()
    this.setHealthBar(100)
    this.events = new Phaser.Events.EventEmitter()
    this.events.on('health-changed', this.handleHealthChanged, this)

    this.count = 0;
    this.follow = true;

    var size, velocity, girlPosition
    this.firstTimeEnteringWorld ?
      (size = 0.3,
        velocity = 203,
        girlPosition = { girlX: 956, girlY: 480, zoneX: 956, zoneY: 680 })
      : (size = 0,
        velocity = -200,
        girlPosition = { girlX: 530, girlY: 306, zoneX: 530, zoneY: 506 })

    this.girlMap = this.physics.add.sprite(girlPosition.girlX, girlPosition.girlY, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(size).setVelocityY(velocity);


    this.add.image(-300, 350, 'bedroom').setDepth(-204);
    this.doors = this.physics.add.image(-300, 280, 'doors').setDepth(40);

    if (this.doors.body instanceof Phaser.Physics.Arcade.Body) {
      this.doors.body.allowGravity = false;
      this.doors.body.immovable = true;
    }
    this.portal = this.add.image(530, 306, 'portal').setDepth(-200);
    // portal.setAngularVelocity(40)
    this.imageFakhear = this.add.image(100, 870, 'profilPanel').setScale(0.6).setScrollFactor(0).setDepth(203);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey('SPACE');
    this.ctrlKey = this.input.keyboard.addKey('CTRL');
    this.aKey = this.input.keyboard.addKey('A');
    this.eKey = this.input.keyboard.addKey('E');
    this.yKey = this.input.keyboard.addKey('Y');
    this.tKey = this.input.keyboard.addKey('T');
    this.pKey = this.input.keyboard.addKey('P');
    this.cKey = this.input.keyboard.addKey('C');
    this.mKey = this.input.keyboard.addKey('M');
    this.zKey = this.input.keyboard.addKey('Z');
    this.nKey = this.input.keyboard.addKey('N');




    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'attack', start: 1, end: 5 }),
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
      repeat: 0
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
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 1 }),
      frameRate: 1,
      repeat: 0
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames('dessinatrice1', { prefix: 'run', start: 1, end: 4 }),
      frameRate: 6,
      repeat: -1
    })

    //parametre du socle ennemie + socle joueur
    this.zone = this.add.zone(girlPosition.zoneX, girlPosition.zoneY, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);

    // this.barrelzone = this.add.zone(660, 880, 0, 0).setSize(300, 40).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.zone);
    if (this.zone.body instanceof Phaser.Physics.Arcade.Body) {
      this.zone.body.friction.x = 0;
      this.zone.body.allowGravity = false;
      this.zone.body.immovable = true;
      this.zone.depth = 30;
    }

    this.physics.add.existing(this.portal);
    if (this.portal.body instanceof Phaser.Physics.Arcade.Body) {
      this.portal.body.allowGravity = false;
    }
    this.physics.add.overlap(this.girlMap, this.portal);
    //collisions
    this.physics.add.collider(this.girlMap, this.zone);

    //[TOGGLE SUIVIE DU JOUEUR DE LA CAMERA]
    var following = this.yKey
    following.on('down', function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false) : (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    }, this)


    //ombre du joueur + protection
    this.ombre = this.add.ellipse(this.zone.x, this.zone.y - 30, 100, 20, 0x0009).setAlpha(0.5);
    this.protect = this.add.ellipse(this.zone.x, this.zone.y - 200, 1, 1, 0xeceae4).setAlpha(0);



    // Pleine ecran
    this.fullscreen.setInteractive().on('pointerup', function() {
      this.scale.isFullscreen ? this.scale.stopFullscreen() : this.scale.startFullscreen()
    }, this);



    if (!this.firstTimeEnteringWorld) {
      this.tweens.add({
        targets: this.girlMap,
        scale: 0.3,
        alpha: 1,
        repeat: 0,
        duration: 500,
      })
    }
  }


  /**
   * Changement de la barre de vie selon la valeur passé en parametre
   * @param  value vie en plus ou en moins
   * @return       Graphics en au à gauche
   */
  public setHealthBar(value: number) {
    const width = 500
    const percent = Phaser.Math.Clamp(value, 0, 100) / 100
    this.graphics.clear()
    this.graphics.fillStyle(0xd00b0b)
    this.graphics.fillRoundedRect(10, 10, width, 20, 5).setScrollFactor(0)
    if (percent > 0) {
      this.graphics.fillStyle(0x0ddb0d)
      this.graphics.fillRoundedRect(10, 10, width * percent, 20, 5)
    }
  }

  /**
   * Animation bar de vie + joueur quand il est attaqué
   * @param  value l'etat final de sa vie
   */

  private handleHealthChanged(value: number) {

    this.tweens.addCounter({
      from: this.lastHealth,
      to: value,
      duration: 200,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: tween => {
        const value = tween.getValue()
        this.setHealthBar(value)
      },
    })
    this.lastHealth = value

    this.tweens.addCounter({
      from: 150,
      to: 255,
      duration: 1000,
      onUpdate: (tween) => (
        this.girlMap.setTint(
          Phaser.Display.Color.GetColor(
            tween.getValue(),
            tween.getValue(),
            tween.getValue(),
          )
        )),
    })
  }

  public update(): void {
    this.portal.body.touching.none ?

      this.tweens.add({
        targets: this.portal,
        scale: 0.3,
        repeat: 0,
        duration: 900,
      }) :
      this.tweens.add({
        targets: this.portal,
        scale: 0.5,
        repeat: 1,
        duration: 900,
      });

    // this.portal.setAlpha(1);


    this.portal.rotation += 0.01

    this.protect.x = this.girlMap.x
    this.protect.y = this.girlMap.y

    /**
     * [FIN LOGIQUE BOT]
     * _________________
     */

    /**
     * _________________
     * [ATTAQUE JOUEUR]
     * @param  this.aKey.isDown [description]
     * @return                  [description]
     */
    if (Phaser.Input.Keyboard.JustDown(this.aKey)) {

      /**
       * Si le joueur est entrain de porter le tonneau: propulse le tonneau dans la direction donné
       * @param  !this.block1.body.allowGravity : tonneau surélevé
       */
      this.girlMap.setVelocityX(0);
      this.girlMap.anims.play("attack")
    }
    /**
     * [FIN ATTAQUE JOUEUR]
     * _________________
     */

    /**
     * [DEPLACEMENT GAUCHE - DROITE - SAUT]
     * @param  this.cursors touches directionnelle et espace:
     * _________________
     */

    else if (this.cursors.left.isDown) {
      this.zone.x = this.girlMap.x;
      this.ombre.x = this.zone.x
      this.ombre.y = this.zone.y - 30
      this.girlMap.flipX = true;
      if (this.ctrlKey.isDown) {
        this.girlMap.anims.play('run', true);
        this.girlMap.setVelocityX(-400);
      } else {
        this.girlMap.anims.play('walk', true);
        this.girlMap.setVelocityX(-300);
      }
    }
    else if (this.cursors.right.isDown) {
      this.zone.x = this.girlMap.x;
      this.ombre.x = this.zone.x
      this.ombre.y = this.zone.y - 30
      this.girlMap.flipX = false;
      if (this.ctrlKey.isDown) {
        this.girlMap.anims.play('run', true);
        this.girlMap.setVelocityX(400);
      } else {
        this.girlMap.anims.play('walk', true);
        this.girlMap.setVelocityX(300);
      }
    }
    else if (this.spaceBar.isDown) {
      if (!this.tweens.isTweening(this.ombre)) {
        this.tweens.add({
          targets: this.ombre,
          scaleX: 0.25,
          scaleY: 0.5,
          yoyo: true,
          repeat: 0,
          duration: 600,
        });
      }

      this.zone.x = this.girlMap.x;
      this.ombre.x = this.zone.x
      this.ombre.y = this.zone.y - 30

      if (!this.girlMap.anims.getFrameName().includes("jump") && this.girlMap.body.touching.down) {
        this.girlMap.anims.play('jump');
      }
      if (this.girlMap.body.touching.down) {
        this.girlMap.setVelocityY(-590);
      }
    }
    else {
      this.girlMap.setVelocityX(0);
      // if (closestEnnemy < 296) {
      // this.girlMap.anims.play('idle_attack');
      // } else {
      // this.girlMap.anims.play('idle_walk');
      // }
    }

    /**
     * [FIN DEPLACEMENT GAUCHE - DROITE - SAUT]
     * _________________
     */

    /**
     * _________________
     * [DEPLACEMENT HAUT - BAS ]
     * @param  this.cursors touches directionnelle et bar d'espace:
     */

    if (this.cursors.up.isDown && this.girlMap.body.touching.down) {
      this.zone.body.position.y -= 1.3
      this.ombre.depth -= 1;
      this.girlMap.depth -= 1;
      this.ombre.y = this.zone.y - 30
      this.ombre.x = this.zone.x
      this.girlMap.anims.play('goback', true);
    } else if (this.cursors.down.isDown && this.girlMap.body.touching.down) {
      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.y += 2;
        this.ombre.depth += 1;
        this.girlMap.depth += 1;
        this.ombre.y = this.zone.y - 30
        this.ombre.x = this.zone.x
        this.zone.y += 1.3;
        this.girlMap.anims.play('front', true);
      }
    }

    /**
     * [FIN DEPLACEMENT HAUT - BAS]
     * _________________
     */


    /**
     * [BOUCLIER + ANIMATION]
     */

    if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
      this.protect.alpha === 0.5 ?
        this.tweens.add({
          targets: this.protect,
          alpha: 0,
          repeat: 0,
          displayWidth: 1,
          displayHeight: 0,
          duration: 300,
          onComplete: function() { console.log('FIN'); arguments[1][0].setAlpha(0); },
        }) : this.tweens.add({
          targets: this.protect,
          alpha: 0.5,
          displayWidth: 220,
          displayHeight: 420,
          repeat: 0,
          duration: 300,
          onComplete: function() { console.log('FIN'); arguments[1][0].setAlpha(0.5); },
        })
    }

    /**
     * [TOGGLE AFFICHAGE + PANNEL VIEWER (Twitch)]
     */
    if (Phaser.Input.Keyboard.JustDown(this.mKey)) {
      this.pannelBottom.alpha === 1 ? (
        this.pannelRight.setAlpha(0),
        this.info.setAlpha(0),
        this.fakehear.setAlpha(0),
        this.abonner.setAlpha(0),
        this.imageFakhear.setAlpha(0),
        this.pannelBottom.setAlpha(0)
      ) : (
          this.pannelRight.setAlpha(1),
          this.info.setAlpha(1),
          this.abonner.setAlpha(1),
          this.fakehear.setAlpha(1),
          this.imageFakhear.setAlpha(1),
          this.pannelBottom.setAlpha(1)
        )
    }


    if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.body.allowGravity = false
      }
      this.tweens.add({
        targets: this.girlMap,
        scale: 0,
        alpha: 0,
        repeat: 0,
        duration: 500,
      })

      this.tweens.add({
        targets: this.ombre,
        scale: 0,
        alpha: 0,
        repeat: 0,
        duration: 500,
      })


      if (this.portal.body.touching.up) {
        this.cameras.main.fadeOut(500);
        this.cameras.main.once('camerafadeoutcomplete', function(camera) {
          this.firstTimeEnteringWorld = false;
          this.scene.start('Game')
        }, this);
      }
    }


    if (Phaser.Input.Keyboard.JustDown(this.nKey)) {
          this.scene.start('Canyon')
        }
  }
}
