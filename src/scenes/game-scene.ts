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
  private girlMap: Phaser.Physics.Arcade.Sprite;
  private graphics!: Phaser.GameObjects.Graphics;
  private barrel: Phaser.Physics.Arcade.Image;
  private block1: Phaser.Physics.Arcade.Image;
  private block2: Phaser.Physics.Arcade.Image;
  private barrelGroup: Phaser.GameObjects.Group;
  private info: Phaser.GameObjects.Text;
  private zone: Phaser.GameObjects.Zone
  private barrelzone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone
  private lastHealth = 100

  constructor() {
    super(sceneConfig);
  }

  public create(): void {

    //LIMITE CAMERA
    this.cameras.main.setBounds(-2074, 0, 3574, 666);
    this.physics.world.setBounds(-2074, 0, 3574, 666);

    //PANNEL VIEWER (Twitch) + VIE
    this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(0);
    this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(0);
    this.graphics = this.add.graphics()
    this.setHealthBar(100)
    this.events = new Phaser.Events.EventEmitter()
    this.events.on('health-changed', this.handleHealthChanged, this)

    this.count = 0;
    this.follow = true;

    //creation du groupe de tonneaux
    this.barrelGroup = this.physics.add.group({
      allowGravity: true
    });

    this.block1 = this.barrelGroup.create(350, 672, 'barrel').setScale(0.2).setDepth(53).setBounce(0.5)
    this.block2 = this.barrelGroup.create(162, 240, 'barrel').setScale(0.2).setDepth(53);

    this.ennemy = this.physics.add.sprite(200, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setTintFill(0x310803, 0x311605).setVelocityY(203).setActive(true).setDragX(300);
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setVelocityY(203);
    this.add.image(940, 390, 'bg').setDepth(-54);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey('SPACE');
    this.ctrlKey = this.input.keyboard.addKey('CTRL');
    this.aKey = this.input.keyboard.addKey('A');
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
    this.barrelzone = this.add.zone(660, 880, 0, 0).setSize(3000, 40).setOrigin(0.5, 0.5);
    this.ennemyzone = this.add.zone(200, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.zone);
    this.physics.add.existing(this.ennemyzone);
    this.physics.add.existing(this.barrelzone);
    this.physics.add.existing(this.block1);
    if (this.zone.body instanceof Phaser.Physics.Arcade.Body) {
      this.zone.body.friction.x = 0;
      this.zone.body.allowGravity = false;
      this.zone.body.immovable = true;
      this.zone.depth = 30;
    }
    if (this.ennemyzone.body instanceof Phaser.Physics.Arcade.Body) {
      this.ennemyzone.body.friction.x = 0;
      this.ennemyzone.body.allowGravity = false;
      this.ennemyzone.body.immovable = true;
      this.ennemyzone.depth = 30;
    }
    if (this.barrelzone.body instanceof Phaser.Physics.Arcade.Body) {
      this.barrelzone.body.friction.x = 0;
      this.barrelzone.body.allowGravity = false;
      this.barrelzone.body.immovable = true;
      this.barrelzone.depth = 30;
    }

    //collisions
    this.physics.add.collider(this.girlMap, this.zone);
    this.physics.add.collider(this.barrelzone, this.barrelGroup);
    this.physics.add.collider(this.block1, this.ennemy);
    this.physics.add.collider(this.ennemy, this.ennemyzone);

    this.physics.add.overlap(
      this.girlMap,
      this.block1,
      girlMapBlockCollide,
      null,
      this
    );

    /**
     * FACE A UN TONNEAU: le joueur peut propulser le tonneau
     * @param  girl  verification de sa position
     * @param  block reconfiguration des parametres(velocity, angularDrag...)
     */

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

  }


  /**
   * Changement de la barre de vie selon la valeur passé en parametre
   * @param  value vie en plus ou en moins
   * @return       Graphics en au à gauche
   */
  public setHealthBar(value: number) {
    const width = 200
    const percent = Phaser.Math.Clamp(value, 0, 100) / 100
    this.graphics.clear()
    this.graphics.fillStyle(0x979797)
    this.graphics.fillRoundedRect(10, 10, width, 20, 5).setScrollFactor(0)
    if (percent > 0) {
      this.graphics.fillStyle(0x00ff00)
      this.graphics.fillRoundedRect(10, 10, width * percent, 20, 5)
    }
  }

  /**
   * Animation bar de vie + joueur quand il est attaqué
   * @param  value l'etat final de sa vie
   */

  private handleHealthChanged(value: number) {

    this.girlMap.setTint(0x8f1111);

    this.tweens.addCounter({
      from: this.lastHealth,
      to: value,
      duration: 200,
      ease: Phaser.Math.Easing.Sine.InOut,
      onUpdate: tween => {
        const value = tween.getValue()
        this.setHealthBar(value)
      },
      onComplete: () => this.girlMap.clearTint(),
    })

    this.lastHealth = value
  }

  public update(): void {

    let distance = Phaser.Math.Distance.BetweenPoints(this.zone, this.ennemyzone);
    this.protect.x = this.girlMap.x
    this.protect.y = this.girlMap.y

    /**
     * _________________
     * [LOGIQUE DU BOT] (déblacement en x/y et rotation selon le joueur)
     * @param  this.ennemy.active sprite ennemi non détruit
     * @param  this.ennemy sprite de l'ennemie
     * @param  this.ennemyzone.y socle ennemie
     * @param  this.zone.y socle joueur
     * @param  distance distance entre le joueur et l'ennemie + attaque celon bouclier
     */

    if (this.ennemy.active) {
      if (distance < 1000) {
        if (this.ennemyzone.y !== this.zone.y) {
          if (this.zone.y < this.ennemyzone.y) {
            this.ennemyzone.y -= 1
          } else {
            this.ennemyzone.y += 1
          }
        }
        if (distance > 160 && this.ennemy.x < this.girlMap.x) {

          this.ennemyzone.x = this.ennemy.x
          this.ennemy.x += 1.5
          this.ennemy.flipX = false
          this.ennemy.play('walk', true)
        } else if (distance > 160 && this.ennemy.x > this.girlMap.x) {
          this.ennemyzone.x = this.ennemy.x
          this.ennemy.x -= 1.5
          this.ennemy.flipX = true
          this.ennemy.play('walk', true)
        } else {
          if (this.ennemy.alpha > 0.3) {
            this.ennemy.play("attack", true)
          } else {
            this.ennemy.setFrame(0)
          }
          if (this.ennemy.anims.getFrameName().includes("attack4")) {

            if (this.protect.displayWidth === 1) {
              this.health = Phaser.Math.Clamp(this.health - 1, 0, 100)
              this.events.emit('health-changed', this.health)
            } else {
              //Diminuer la protection
            }
          }
        }
      } else {
        this.ennemy.play("idle_walk")
      }
    }
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

      if (!this.block1.body.allowGravity) {
        if (this.block1.body instanceof Phaser.Physics.Arcade.Body) {
          this.block1.body.allowGravity = true
          this.block1.setDepth(this.girlMap.depth)
          this.barrelzone.y = this.zone.y
          this.girlMap.flipX ? this.block1.setAngularVelocity(20).setVelocity(-900).setDragX(300).setAngularDrag(30) : this.block1.setAngularVelocity(200).setVelocity(900).setDragX(300).setAngularDrag(40)
        }
      }
      this.girlMap.setVelocityX(0);
      if (this.girlMap.anims.getFrameName().includes("attack4")
        && this.girlMap.depth < this.ennemy.depth + 10
        && this.girlMap.depth > this.ennemy.depth - 10 && distance < 196) {
        if (this.count == 1) {
          if (this.ennemy.alpha < 0.3) {
            this.ennemy.setTintFill(0xffffff)
            this.tweens.add({
              targets: this.ennemy,
              alpha: 0,
              y: -100,
              repeat: 0,
              duration: 900,
              onComplete: () => (this.ennemy.destroy(), this.ennemyzone.destroy()),
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
      if (distance < 296) {
        this.girlMap.anims.play('idle_attack');
      } else {
        this.girlMap.anims.play('idle_walk');
      }
    }

    /**
     * [FIN DEPLACEMENT GAUCHE - DROITE - SAUT]
     * _________________
     */

    /**
     * _________________
     * [DEPLACEMENT HAUT - BAS ]
     * @param  this.cursors touches directionnelle et espace:
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
      }
    }

    /**
     * [FIN DEPLACEMENT HAUT - BAS]
     * _________________
     */

    /**
     * [LOGIQUE INTERACTION AVEC UN TONNEAU]
     * @param  Phaser.Input.Keyboard.JustDown verifie si la touche est pressé une fois
     * Porter et lacher le tonneau
     *
     */
    if (Phaser.Input.Keyboard.JustDown(this.pKey)) {

      if (this.block1.body.allowGravity) {
        console.log("allow")
        this.block1.setVelocityX(this.girlMap.body.velocity.x)
        if (this.block1.body instanceof Phaser.Physics.Arcade.Body) {
          this.block1.body.allowGravity = false
          this.block1.y = this.girlMap.y
        }
      } else if (!this.block1.body.allowGravity) {
        console.log("deny")
        this.block1.setVelocityX(this.girlMap.body.velocity.x)
        if (this.block1.body instanceof Phaser.Physics.Arcade.Body) {
          this.block1.body.allowGravity = true
          this.block1.setVelocityX(0)
          this.block1.setDepth(this.girlMap.depth)
          this.block1.setAngle(0)
          this.barrelzone.y = this.zone.y
        }
      }
    }

    if (!this.block1.body.allowGravity) {
      this.block1.x = this.girlMap.x
      this.block1.y = this.girlMap.y
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
     * [TOGGLE AFFICHAGE + ANIMATION PANNEL VIEWER (Twitch)]
     */
    if (Phaser.Input.Keyboard.JustDown(this.mKey)) {
      this.pannelBottom.alpha === 1 ?
        this.tweens.add({
          targets: this.pannelBottom,
          alpha: 0,
          repeat: 0,
          duration: 300,
          onComplete: () => { this.pannelRight.setAlpha(0); this.info.setAlpha(0) },
        }) : this.tweens.add({
          targets: this.pannelBottom,
          alpha: 1,
          repeat: 0,
          duration: 300,
          onComplete: () => { this.pannelRight.setAlpha(1); this.info.setAlpha(1) },
        })
    }
  }
}
