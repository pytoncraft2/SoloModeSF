const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Canyon',
};

export class CanyonScene extends Phaser.Scene {
  body: Phaser.Physics.Arcade.Body;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private health = 100
  private portal: any;
  private curve: any;
  private path: any;
  private graphics: any;
  private bullet: any;
  private groupeBullets: any;
  private charge: any;
  public events: Phaser.Events.EventEmitter;
  private yKey: Phaser.Input.Keyboard.Key;
  private zKey: Phaser.Input.Keyboard.Key;
  private rKey: Phaser.Input.Keyboard.Key;
  private rIsDown: any
  private eKey: Phaser.Input.Keyboard.Key;
  public follow: boolean;
  private mKey: Phaser.Input.Keyboard.Key;
  private aKey: Phaser.Input.Keyboard.Key;
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
  // private block1: Phaser.Physics.Arcade.Image;
  private block1: Phaser.Physics.Arcade.Image ;
  public block2: Phaser.Physics.Arcade.Image;
  public block3: Phaser.Physics.Arcade.Image;
  public block4: Phaser.Physics.Arcade.Image;
  public imageFakhear: any;
  // private barrelGroup: Phaser.GameObjects.Group;
  private info: Phaser.GameObjects.Text;
  public fakehear: Phaser.GameObjects.Text;
  public abonner: Phaser.GameObjects.Text;
  private zone: Phaser.GameObjects.Zone
  private barrelzone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone
  private gfx: any
  private lastHealth = 100

  constructor() {
    super(sceneConfig);
  }

  public init(data) {
    console.log(data)
  }

  public create(): void {

    this.cameras.main.fadeIn(1000);

    this.gfx = this.add.graphics();

    //PANNEL VIEWER (Twitch) + VIE
    this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(0);



    this.abonner = this.add.text(this.game.scale.width - 530, this.game.scale.height - 150, '❤️ Viewer: 400', { font: '23px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(0);
    this.fakehear = this.add.text(this.game.scale.height - 765, this.game.scale.height - 150, 'FAKHEAR', { font: '19px Georgia, "Goudy Bookletter 1911", Times, serif' }).setScrollFactor(0).setDepth(202).setAlpha(0);
    // this.fakehear = this.add.text(-300, 870, 'FAKHEAR', { font: '38px Arial' }).setScrollFactor(0).setDepth(203).setAlpha(1);
    this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(0);
    this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(0);
    this.graphics = this.add.graphics()
    this.setHealthBar(100)
    this.events = new Phaser.Events.EventEmitter()
    this.events.on('health-changed', this.handleHealthChanged, this)

    this.count = 0;
    this.follow = true;

    this.groupeBullets = this.physics.add.group();


    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setVelocityY(0);
    if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
    this.girlMap.body.allowGravity = false;
  }
    this.portal = this.add.image(-500, this.girlMap.y, 'portal').setDepth(200);
    this.physics.add.existing(this.portal);
    if (this.portal.body instanceof Phaser.Physics.Arcade.Body) {
      this.portal.body.allowGravity = false;
    }
    this.physics.add.overlap(this.girlMap, this.portal);

    this.imageFakhear = this.add.image(100, 870, 'profilPanel').setScale(0.6).setScrollFactor(0).setDepth(203);
    this.bullet = this.add.image(400, 100, 'bullet').setDepth(200);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey('SPACE');
    this.ctrlKey = this.input.keyboard.addKey('CTRL');
    this.aKey = this.input.keyboard.addKey('A');
    this.yKey = this.input.keyboard.addKey('Y');
    this.zKey = this.input.keyboard.addKey('Z');
    this.eKey = this.input.keyboard.addKey('E');
    this.rKey = this.input.keyboard.addKey('R');
    this.rIsDown = this.input.keyboard.checkDown(this.rKey, 250);



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
    if (this.zone.body instanceof Phaser.Physics.Arcade.Body) {
      this.zone.body.friction.x = 0;
      this.zone.body.allowGravity = false;
      this.zone.body.immovable = true;
      this.zone.depth = 30;
    }

    //collisions
    this.physics.add.collider(this.girlMap, this.zone);

    /**
     * FACE A UN TONNEAU: le joueur peut propulser le tonneau
     * @param  girl  verification de sa position
     * @param  block reconfiguration des parametres du tonneau (velocity, angularDrag...)
     */

    function girlMapBlockCollide(girl: Phaser.Physics.Arcade.Sprite, block: Phaser.Physics.Arcade.Image) {
      if (this.girlMap.anims.getFrameName().includes("attack4")
        && girl.depth > block.depth - 10 && girl.depth < block.depth + 10
      ) {
        block.x < girl.x ? block.setAngularVelocity(20).setVelocity(-300).setDragX(300).setAngularDrag(30) : block.setAngularVelocity(20).setVelocity(300).setDragX(300).setAngularDrag(30)
      }
    }

    function bulletEnnemyCollide(ennemy: Phaser.Physics.Arcade.Sprite, bullet:Phaser.Physics.Arcade.Image) {
      if(bullet.scale > 4) {
        this.killEnnemy(ennemy)
      } else if (ennemy.alpha < 0.2) {
        this.killEnnemy(ennemy)
      } else {
        ennemy.alpha -= 0.03
      }

      bullet.disableBody()
      bullet.destroy()
    }


    //[TOGGLE SUIVIE DU JOUEUR DE LA CAMERA]
    var following = this.yKey
    following.on('down', function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false) : (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    }, this)


    //ombre du joueur + protection
    this.ombre = this.add.ellipse(this.zone.x, this.zone.y - 30, 100, 20, 0x0009).setAlpha(0.5);
    this.protect = this.add.ellipse(this.zone.x, this.zone.y - 200, 1, 1, 0xeceae4).setAlpha(0);





    console.log(this.girlMap)

    // var cannonHead = this.add.image(130, 416, 'cannon_head').setDepth(1);
    // var cannon = this.add.image(130, 464, 'cannon_body').setDepth(1);
    var chick = this.physics.add.sprite(this.girlMap.x, this.girlMap.y - 50, 'barrel').setScale(0.1);
    var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
    var line = new Phaser.Geom.Line();
    var angle = 0;

    chick.disableBody(true, true);

    this.input.on('pointermove', function (pointer) {
        angle = Phaser.Math.Angle.BetweenPoints(this.girlMap, pointer);
        // cannonHead.rotation = angle;
        Phaser.Geom.Line.SetToAngle(line, this.girlMap.x, this.girlMap.y - 50, angle, 128);
        gfx.clear().strokeLineShape(line);
    }, this);

    this.input.on('pointerup', function () {
        chick.enableBody(true, this.girlMap.x, this.girlMap.y - 50, true, true);
        this.physics.velocityFromRotation(angle, 600, chick.body.velocity);
    }, this);

    // x, y, xRadius, yRadius, startAngle, endAngle, clockwise, rotation
    // var curve;

    this.graphics = this.add.graphics();

this.path = { t: 0, vec: new Phaser.Math.Vector2() };

    this.curve = new Phaser.Curves.Ellipse(400, 300, 100, 260, 0, 180, false);
    this.tweens.add({
        targets: this.path,
        t: 1,
        ease: 'Linear',
        duration: 4000,
        repeat: -1
    });

    //  By adjusting the radius you can create a spiral effect



  }


  public killEnnemy(ennemy) {
    ennemy.setTintFill(0xffffff).setActive(false).setFrame(0)
    this.tweens.add({
      targets: ennemy,
      alpha: 0,
      y: -100,
      repeat: 0,
      duration: 900,
      onComplete: () => (ennemy.destroy(), ennemy['ennemyzone'].destroy()),
    })
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

    this.portal.rotation += 0.01

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


    this.protect.x = this.girlMap.x
    this.protect.y = this.girlMap.y

    /**
     * _________________
     * [LOGIQUE DU BOT] (déblacement en x/y et rotation selon position du joueur SEULEMENT si il est en vie)
     * @param  this.ennemy.active sprite ennemi non détruit
     * @param  this.ennemy sprite de l'ennemie
     * @param  this.ennemy.ennemyzone.y socle ennemie
     * @param  this.zone.y socle joueur
     * @param  distance distance entre le joueur et l'ennemie + attaque celon bouclier
     */


    /**
     * _________________
     * [ATTAQUE JOUEUR]
     * @param  this.aKey.isDown [description]
     * @return                  [description]
     */
    if (this.aKey.isDown) {
      this.girlMap.setVelocityX(0);
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
      this.girlMap['direction'] = 'left';
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
      this.girlMap['direction'] = 'right';
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
      // this.girlMap.setVelocityX(0);
      // if (closestEnnemy < 296) {
        // this.girlMap.anims.play('idle_attack');
      // } else {
        // this.girlMap.anims.play('idle_walk');
      // }
    }


    if (Phaser.Input.Keyboard.JustDown(this.zKey)) {

      this.bullet = this.groupeBullets.create(this.girlMap.x + 1, this.girlMap.y - 4, 'bullet').setScale(0.2);
      this.bullet.setCollideWorldBounds(true);
      this.bullet.body.allowGravity = false;

      this.charge = this.tweens.add({
        targets: this.bullet,
        scale: 8,
        paused: false,
        duration: 2000,
        repeat: 0
      });
    }

    if (Phaser.Input.Keyboard.JustUp(this.zKey)) {
      this.charge.stop()

      var coefDir;
      if (this.girlMap['direction'] == 'left') { coefDir = -1; } else { coefDir = 1 }
      this.bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
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
      // this.ennemy.on('animationcomplete', () => {
        // this.ennemy.anims.play('idle_attack', true)
      // })
    } else if (this.cursors.down.isDown && this.girlMap.body.touching.down) {
      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.y += 2;
        this.ombre.depth += 1;
        this.girlMap.depth += 1;
        this.ombre.y = this.zone.y - 30
        this.ombre.x = this.zone.x
        this.zone.y += 2;
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
     * [LOGIQUE PRESSION DE LA TOUCHE T]
     */
/*
    if (this.tKey.isDown) {
      if (this.ennemy.isTinted) {
        this.ennemy.clearTint();
      }
      else {
        this.ennemy.setTintFill(0xffffff);
      }
    }
    */

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
          this.scene.start('Game')
        },this);
      }
    }




    var dist = Phaser.Math.Distance.BetweenPoints(this.girlMap, this.bullet);
    var finalDist

    if(this.rKey.isDown) {

    // Phaser.Actions.RotateAround([this.girlMap] , {x:400,y:300}, 0.01 );
    // finalDist = dist < 200 ? dist : 200
    // console.log(dist)

    Phaser.Actions.RotateAroundDistance([this.girlMap], {x:this.bullet.x,y: this.bullet.y}, 0.09, 300);
    if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
    this.girlMap.body.allowGravity = false;
    // this.girlMap.setVelocity(0)
  }

    this.gfx.clear()
    .lineStyle(2, 0xff3300)
    .lineBetween(this.girlMap.x, this.girlMap.y, 400, 100)



    }

    if(this.rKey.isUp) {
      if (this.girlMap.body instanceof Phaser.Physics.Arcade.Body) {
        this.girlMap.body.allowGravity = true;
      }
    }

    this.graphics.clear();

    this.graphics.lineStyle(2, 0xffffff, 1);


    this.curve.draw(this.graphics, 64);

    this.curve.getPoint(this.path.t, this.path.vec);

    this.graphics.fillStyle(0xff0000, 1);
this.graphics.fillCircle(this.path.vec.x, this.path.vec.y, 8);
this.girlMap.x = this.path.vec.x
this.girlMap.y = this.path.vec.y


  }
}

//<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
