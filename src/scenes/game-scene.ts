const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  body: Phaser.Physics.Arcade.Body;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private health = 100
  public events: Phaser.Events.EventEmitter;
  private yKey: Phaser.Input.Keyboard.Key;
  public follow: boolean;
  private mKey: Phaser.Input.Keyboard.Key;
  private aKey: Phaser.Input.Keyboard.Key;
  private eKey: Phaser.Input.Keyboard.Key;
  private pKey: Phaser.Input.Keyboard.Key;
  private tKey: Phaser.Input.Keyboard.Key;
  private ombre: Phaser.GameObjects.Ellipse
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
  private portal2: any;
  // private block1: Phaser.Physics.Arcade.Image;
  private block1: Phaser.Physics.Arcade.Image ;
  public block2: Phaser.Physics.Arcade.Image;
  public block3: Phaser.Physics.Arcade.Image;
  public block4: Phaser.Physics.Arcade.Image;
  public imageFakhear: any;
  private barrels: any;
  private enemies: any;
  // private barrelGroup: Phaser.GameObjects.Group;
  private info: Phaser.GameObjects.Text;
  public fakehear: Phaser.GameObjects.Text;
  public abonner: Phaser.GameObjects.Text;
  private zone: Phaser.GameObjects.Zone
  private barrelzone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone
  private lastHealth = 100

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.cameras.main.fadeIn(1000);

    this.barrels = {}
    //LIMITE CAMERA
    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);

    //PANNEL VIEWER (Twitch) + VIE
    this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);


    this.abonner = this.add.text(this.game.scale.width - 530, this.game.scale.height - 150, '❤️ Viewer: 400', { font: '23px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    this.fakehear = this.add.text(this.game.scale.height - 765, this.game.scale.height - 150, 'FAKHEAR', { font: '19px Georgia, "Goudy Bookletter 1911", Times, serif' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    // this.fakehear = this.add.text(-300, 870, 'FAKHEAR', { font: '38px Arial' }).setScrollFactor(0).setDepth(203).setAlpha(1);
    this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(1);
    this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(1);
    this.graphics = this.add.graphics()
    this.setHealthBar(100)
    this.events = new Phaser.Events.EventEmitter()
    this.events.on('health-changed', this.handleHealthChanged, this)

    this.count = 0;
    this.follow = true;

    //creation du groupe de tonneaux
    this.barrels = this.physics.add.group({
      allowGravity: true,
      dragX: 800
    });

    this.enemies = this.physics.add.group({
      allowGravity: true,
      dragX: 800
    });

    //ajout des tonneaux dans le groupe
    this.block1 = this.barrels.create(350, 566, 'barrel').setScale(0.2).setBounce(0.5)
    this.block2 = this.barrels.create(682, 566, 'barrel').setScale(0.2);
    this.block3 = this.barrels.create(92, 566, 'barrel').setScale(0.2);
    this.block4 = this.barrels.create(462, 566, 'barrel').setScale(0.2);

    //ajout des ennemies dans le groupe
    // this.ennemy2 = this.enemies.create(350, 566, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setTintFill(0x310803, 0x311605).setVelocityY(203).setActive(true).setAlpha(1).setScale(0.2)
    // this.ennemy4 = this.enemies.create(950, 566, 'dessinatrice1', 'face2').setOrigin(0.5, 0.5).setTintFill(0x310803, 0x311605).setVelocityY(100).setActive(true).setAlpha(1).setScale(0.3)
    this.ennemy = this.enemies.create(0, 566, 'dessinatrice1', 'face2').setOrigin(0.5, 0.5).setTintFill(0x310803, 0x311605).setVelocityY(100).setActive(true).setAlpha(1).setScale(0.4)
    // this.ennemy = this.enemies.create(1270, 566, 'dessinatrice1', 'face2').setOrigin(0.5, 0.5).setTintFill(0x310803, 0x311605).setVelocityY(100).setActive(true).setAlpha(1).setScale(0.5)


    //
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setVelocityY(203);
    this.add.image(940, 390, 'bg').setDepth(-54).setVisible(false);
    this.portal = this.add.image(this.girlMap.x, this.girlMap.y, 'portal').setDepth(-200);
    this.portal2 = this.add.image(this.girlMap.x - 800, this.girlMap.y, 'portal').setDepth(-200).setTintFill(0x310803, 0x311605);
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
    this.zone = this.add.zone(956, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);

    // this.barrelzone = this.add.zone(660, 880, 0, 0).setSize(300, 40).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.zone);
    this.physics.add.existing(this.portal);
    this.physics.add.existing(this.portal2);
    if (this.zone.body instanceof Phaser.Physics.Arcade.Body) {
      this.zone.body.friction.x = 0;
      this.zone.body.allowGravity = false;
      this.zone.body.immovable = true;
      this.zone.depth = 30;
    }

    if (this.portal.body instanceof Phaser.Physics.Arcade.Body) {
      this.portal.body.allowGravity = false;
    }
    if (this.portal.body instanceof Phaser.Physics.Arcade.Body) {
      this.portal2.body.allowGravity = false;
    }

    //collisions
    this.physics.add.collider(this.girlMap, this.zone);
    this.physics.add.collider(this.barrels, this.enemies);

    // this.physics.add.overlap(
    //   this.girlMap,
    //   this.portal, function(player: Phaser.Physics.Arcade.Sprite, portal: Phaser.Physics.Arcade.Image) {
    //     // player.y < 399 ? portal.alpha = 0.5 : portal.alpha = 1
    //     portal.alpha = 0.4
    //   });
    // this.physics.add.overlap(
    //   this.girlMap,
    //   this.portal,
    //   girlMapPortalInteraction,
    //   null,
    //   this
    // );


    this.physics.add.overlap(this.girlMap, this.portal);
    this.physics.add.overlap(this.girlMap, this.portal2);

    this.physics.add.overlap(
      this.girlMap,
      this.barrels,
      girlMapBlockCollide,
      null,
      this
    );

    /**
     * FACE A UN TONNEAU: le joueur peut propulser le tonneau
     * @param  girl  verification de sa position
     * @param  block reconfiguration des parametres du tonneau (velocity, angularDrag...)
     */

//      function girlMapPortalInteraction(girl: Phaser.Physics.Arcade.Sprite, portal: Phaser.Physics.Arcade.Image) {
//        portal.setScale(0.5)
//        this.tweens.add({
//   targets: portal,
//   scale: 0.3,
//   repeat: 0,
//   duration: 900,
//   // onComplete: () => (this.ennemy.destroy(), this.ennemy['ennemyzone'].destroy()),
// });
//
//        // girl.setAlpha(0)
//        // console.log("ovverlap")
//      }

    function girlMapBlockCollide(girl: Phaser.Physics.Arcade.Sprite, block: Phaser.Physics.Arcade.Image) {
      if (this.girlMap.anims.getFrameName().includes("attack4")
        && girl.depth > block.depth - 10 && girl.depth < block.depth + 10
      ) {
        block.x < girl.x ? block.setAngularVelocity(20).setVelocity(-300).setDragX(300).setAngularDrag(30) : block.setAngularVelocity(20).setVelocity(300).setDragX(300).setAngularDrag(30)
      }
    }

    //[TOGGLE SUIVIE DU JOUEUR DE LA CAMERA]
    var following = this.yKey
    following.on('down', function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false) : (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    }, this)


    //ombre du joueur + protection
    this.ombre = this.add.ellipse(this.zone.x, this.zone.y - 30, 100, 20, 0x0009).setAlpha(0.5);
    this.protect = this.add.ellipse(this.zone.x, this.zone.y - 200, 1, 1, 0xeceae4).setAlpha(0);

    this.barrels.getChildren().forEach((barrel: Phaser.Physics.Arcade.Image) => {
      barrel['barrelzone'] = this.add.zone(barrel.x, barrel.y + 200, 0, 0).setSize(1000, 40).setOrigin(0.5, 0.5);
      var RandomRGB = Phaser.Display.Color.RandomRGB;
      barrel.setTint(RandomRGB().color, RandomRGB().color, RandomRGB().color)

      this.physics.add.existing(barrel['barrelzone']);
      if (barrel['barrelzone'].body instanceof Phaser.Physics.Arcade.Body) {
        barrel['barrelzone'].body.friction.x = 0;
        barrel['barrelzone'].body.allowGravity = false;
        barrel['barrelzone'].body.immovable = true;
        barrel['barrelzone'].depth = 30;
      }
      this.physics.add.collider(barrel['barrelzone'], barrel);
    })


    this.enemies.getChildren().forEach((ennemy: Phaser.Physics.Arcade.Sprite) => {
      ennemy['ennemyzone'] = this.add.zone(200, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
      this.physics.add.existing(ennemy['ennemyzone']);
      if (ennemy['ennemyzone'].body instanceof Phaser.Physics.Arcade.Body) {
        ennemy['ennemyzone'].body.friction.x = 0;
        ennemy['ennemyzone'].body.allowGravity = false;
        ennemy['ennemyzone'].body.immovable = true;
        ennemy['ennemyzone'].depth = 30;
      }
      this.physics.add.collider(ennemy, ennemy['ennemyzone']);
    })

   //  var target = new Phaser.Math.Vector2();
   //
   //  this.input.on('pointerdown', function (pointer) {
   //
   //    console.log("poointer")
   //   target.x = pointer.x;
   //   target.y = pointer.y;
   //   this.physics.moveToObject(this.girlMap, target, 5000);
   // },this)


    // this.input.on('pointerdown', function (pointer) {
    //
    //     target.x = pointer.x;
    //     target.y = pointer.y;
    //
    //     // Move at 200 px/s:
    //     this.physics.moveToObject(source, target, 200);
    //
    //     debug.clear().lineStyle(1, 0x00ff00);
    //     debug.lineBetween(0, target.y, 800, target.y);
    //     debug.lineBetween(target.x, 0, target.x, 600);
    //
    // }, this);


     // Move at 200 px/s:


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
              scale: 0.5,
              repeat: 0,
              duration: 900,
              // onComplete: () => (this.ennemy.destroy(), this.ennemy['ennemyzone'].destroy()),
            }) :
            this.tweens.add({
              targets: this.portal,
              scale: 1,
              repeat: 1,
              duration: 900,
              // onComplete: () => (this.ennemy.destroy(), this.ennemy['ennemyzone'].destroy()),
            });

    this.portal2.body.touching.none ?

            this.tweens.add({
              targets: this.portal2,
              scale: 0.5,
              repeat: 0,
              duration: 900,
              // onComplete: () => (this.ennemy.destroy(), this.ennemy['ennemyzone'].destroy()),
            }) :
            this.tweens.add({
              targets: this.portal,
              scale: 1,
              repeat: 1,
              duration: 900,
              // onComplete: () => (this.ennemy.destroy(), this.ennemy['ennemyzone'].destroy()),
            });



    // this.portal.setAlpha(1);


    this.portal.rotation += 0.01
    this.portal2.rotation -= 0.01

    this.protect.x = this.girlMap.x
    this.protect.y = this.girlMap.y
    let closestBarrel: any = this.physics.closest(this.girlMap, [this.block1, this.block2, this.block3, this.block4]);
    // let closestEnnemy: any = this.physics.closest(this.girlMap, [this.ennemy]);

    /**
     * _________________
     * [LOGIQUE DU BOT] (déblacement en x/y et rotation selon position du joueur SEULEMENT si il est en vie)
     * @param  this.ennemy.active sprite ennemi non détruit
     * @param  this.ennemy sprite de l'ennemie
     * @param  this.ennemy.ennemyzone.y socle ennemie
     * @param  this.zone.y socle joueur
     * @param  distance distance entre le joueur et l'ennemie + attaque celon bouclier
     */

    this.enemies.getChildren().forEach((ennemy: Phaser.Physics.Arcade.Sprite) => {
      if (ennemy.active) {
        var distance = Phaser.Math.Distance.BetweenPoints(this.zone, ennemy['ennemyzone']);
        if (distance < 1000) {
          if (ennemy['ennemyzone'].y !== this.zone.y) {
            if (this.zone.y < ennemy['ennemyzone'].y) {
              ennemy['ennemyzone'].y -= 1
            } else {
              ennemy['ennemyzone'].y += 1
            }
          }
          if (distance > 160 && ennemy.x < this.girlMap.x) {

            ennemy['ennemyzone'].x = ennemy.x
            ennemy.x += 4.5
            ennemy.flipX = false
            ennemy.play('walk', true)
          } else if (distance > 160 && ennemy.x > this.girlMap.x) {
            ennemy['ennemyzone'].x = ennemy.x
            ennemy.x -= 4.5
            ennemy.flipX = true
            ennemy.play('walk', true)
          } else {
            ennemy.play("attack", true)
            if (ennemy.anims.getFrameName().includes("attack4")) {

              if (this.protect.displayWidth === 1) {
                this.health = Phaser.Math.Clamp(this.health - 1, 0, 100)
                this.events.emit('health-changed', this.health)
              } else {
                //Diminuer la protection
              }
            }
          }
        } else {
          ennemy.play("idle_walk")
        }
      }
    });
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
    if (this.aKey.isDown) {

      /**
       * Si le joueur est entrain de porter le tonneau: propulse le tonneau dans la direction donné
       * @param  !this.block1.body.allowGravity : tonneau surélevé
       */

      if (!closestBarrel.body.allowGravity) {
        if (closestBarrel.body instanceof Phaser.Physics.Arcade.Body) {
          closestBarrel.body.allowGravity = true
          closestBarrel.setDepth(this.girlMap.depth)
          this.girlMap.flipX ? closestBarrel.setAngularVelocity(20).setVelocity(-900).setDragX(300).setAngularDrag(30) : closestBarrel.setAngularVelocity(200).setVelocity(900).setDragX(300).setAngularDrag(40)
        }
      }
      this.girlMap.setVelocityX(0);
      if (this.girlMap.anims.getFrameName().includes("attack4")
      /*
        && this.girlMap.depth < this.ennemy.depth + 10
        && this.girlMap.depth > this.ennemy.depth - 10 && closestEnnemy < 196*/) {
        if (this.count == 1) {
          if (this.ennemy.alpha < 0.3) {
            this.ennemy.setTintFill(0xffffff).setActive(false).setFrame(0)
            this.tweens.add({
              targets: this.ennemy,
              alpha: 0,
              y: -100,
              repeat: 0,
              duration: 900,
              onComplete: () => (this.ennemy.destroy(), this.ennemy['ennemyzone'].destroy()),
            });
          }
          this.ennemy.alpha -= 0.03
          this.count = 0;
        } else {
          this.count++
        }
      }
      this.girlMap.anims.play("attack", true)
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
      this.zone.body.position.y -= 2
      this.ombre.depth -= 1;
      this.girlMap.depth -= 1;
      this.ombre.y = this.zone.y - 30
      this.ombre.x = this.zone.x
      this.girlMap.anims.play('goback', true);
      this.ennemy.on('animationcomplete', () => {
        this.ennemy.anims.play('idle_attack', true)
      })
    } else if (this.cursors.down.isDown && this.girlMap.body.touching.down) {
      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.y += 2;
        this.ombre.depth += 1;
        this.girlMap.depth += 1;
        this.ombre.y = this.zone.y - 30
        this.ombre.x = this.zone.x
        this.zone.y += 2;
        this.girlMap.anims.play('front', true);
        this.ennemy.on('animationcomplete', () => {
          this.ennemy.anims.play('idle_attack', true)
        })

      }
    }

    /**
     * [FIN DEPLACEMENT HAUT - BAS]
     * _________________
     */

    /**
     * [LOGIQUE INTERACTION AVEC UN TONNEAU]
     * @param  Phaser.Input.Keyboard.JustDown verifie si la touche est pressé une fois
     * @param closestBarrel tonneau le plus proche
     * Porter et lacher le tonneau: activer/desactiver gravité
     *
     */

    if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
      if (closestBarrel.body.allowGravity) {
        console.log("allow")
        closestBarrel.setVelocityX(this.girlMap.body.velocity.x)
        if (closestBarrel.body instanceof Phaser.Physics.Arcade.Body) {
          closestBarrel.body.allowGravity = false
          closestBarrel.y = this.girlMap.y
        }
      } else if (!closestBarrel.body.allowGravity) {
        console.log("deny")
        closestBarrel.setVelocityX(this.girlMap.body.velocity.x)
        if (closestBarrel.body instanceof Phaser.Physics.Arcade.Body) {
          closestBarrel.body.allowGravity = true
          closestBarrel.setVelocityX(0)
          closestBarrel.setDepth(this.girlMap.depth)
          closestBarrel.setAngle(0)
          closestBarrel.barrelzone.y = this.zone.y
        }
      }
    }

    if (!closestBarrel.body.allowGravity) {
      closestBarrel.x = this.girlMap.x
      closestBarrel.y = this.girlMap.y
    }

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
     * [LOGIQUE PRESSION DE LA TOUCHE T]
     */

    if (this.tKey.isDown) {
      if (this.ennemy.isTinted) {
        this.ennemy.clearTint();
      }
      else {
        this.ennemy.setTintFill(0xffffff);
      }
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
      if (this.portal.body.touching.up) {
        this.cameras.main.fadeOut(500);
        this.cameras.main.once('camerafadeoutcomplete', function () {
          this.scene.start('Bedroom')
        },this);
      }

      if (this.portal2.body.touching.up) {
        this.cameras.main.fadeOut(500);
        this.cameras.main.once('camerafadeoutcomplete', function () {
          this.scene.start('Boss')
        },this);
      }
    }
  }
}

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
