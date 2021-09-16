const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  body: Phaser.Physics.Arcade.Body;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
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
  private barrel: Phaser.Physics.Arcade.Image;
  private barrelGroup: Phaser.GameObjects.Group;
  private info: Phaser.GameObjects.Text;
  private zone: Phaser.GameObjects.Zone
  private ennemyzone: Phaser.GameObjects.Zone

  constructor() {
    super(sceneConfig);
  }

  public create(): void {

    //PANNEL VIEWER (Twitch)
    this.info = this.add.text(this.game.scale.width - 285, 20, 'Chat du stream', { font: '38px Arial' }).setScrollFactor(0).setDepth(202).setAlpha(1);
    this.pannelRight = this.add.rectangle(this.game.scale.width - 75, 200, 448, this.game.scale.height + 570, 0x1e1e1f).setScrollFactor(0).setDepth(201).setAlpha(1);
    this.pannelBottom = this.add.rectangle(1000, this.game.scale.height - 100, this.game.scale.width + 300, 200, 0x111112).setScrollFactor(0).setDepth(200).setAlpha(1);

    this.count = 0;

    this.barrelGroup = this.physics.add.group({
     allowGravity: false
   });

   // var ennemyGroup = {}
   var block1 = this.barrelGroup.create(150, 672, 'barrel').setVelocity(0).setScale(0.2).setImmovable(true);
   // var block2 = this.barrelGroup.create(162, 540, 'barrel').setVelocity(0).setScale(0.2).setImmovable(true).setDepth(0.5);
   // var block3 = this.barrelGroup.create(169, 700, 'barrel').setVelocity(0).setScale(0.2).setImmovable(true);


    this.ennemy = this.physics.add.sprite(200, 480, 'ennemy', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setTintFill(0x310803, 0x311605).setVelocityY(203);
    this.follow = true;
    this.girlMap = this.physics.add.sprite(956, 480, 'dessinatrice1', 'face1').setOrigin(0.5, 0.5).setScale(0.4).setVelocityY(203);
    // this.barrel = this.physics.add.image(1250, 680, 'barrel').setOrigin(0.5, 0.5).setScale(0.2).setDragX(200).setCollideWorldBounds(true)
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
    this.ennemyzone = this.add.zone(200, 780, 210, 210).setSize(150, 40).setOrigin(0.5, 0.5);
    this.physics.add.existing(this.zone);
    this.physics.add.existing(this.ennemyzone);
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

    //collisions
    this.physics.add.collider(this.girlMap, this.zone);
    this.physics.add.collider(this.girlMap, block1);
    this.physics.add.collider(this.ennemy, this.ennemyzone);

     //[TOGGLE SUIVIE DU JOUEUR DE LA CAMERA]
    var following = this.yKey
    following.on('down', function() {
      this.follow === true ? (this.cameras.main.startFollow(this.girlMap), this.follow = false) : (this.cameras.main.stopFollow(this.girlMap), this.follow = true)
    }, this)


    //ombre du joueur + protection
    this.ombre = this.add.ellipse(this.zone.x, this.zone.y - 30, 100, 20, 0x0009).setAlpha(0.5);
    this.protect = this.add.ellipse(this.zone.x, this.zone.y - 200, 1, 1, 0xeceae4).setAlpha(0);
  }
  public update(): void {

    let distance = Phaser.Math.Distance.BetweenPoints(this.zone, this.ennemyzone);
    this.protect.x = this.girlMap.x
    this.protect.y = this.girlMap.y

    /**
     * _________________
     * [LOGIQUE DU BOT] (déblacement en x/y et rotation selon le joueur)
     * @param  this.ennemy sprite de l'ennemie
     * @param  this.ennemyzone.y socle ennemie
     * @param  this.zone.y socle joueur
     * @param  distance distance entre le joueur et l'ennemie
     */
    if (this.ennemyzone.y !== this.zone.y) {
      if (this.zone.y < this.ennemyzone.y) {
        this.ennemyzone.y -= 1
      } else {
        this.ennemyzone.y += 1
      }
    }
    if (distance > 160 && this.ennemy.x < this.girlMap.x) {
      this.ennemyzone.x += 1.5
      this.ennemy.x += 1.5
      this.ennemy.flipX = false
      this.ennemy.play('walk', true)
    } else if (distance > 160 && this.ennemy.x > this.girlMap.x) {
      this.ennemyzone.x -= 1.5
      this.ennemy.x -= 1.5
      this.ennemy.flipX = true
      this.ennemy.play('walk', true)
    } else {
      this.ennemy.play("attack", true)
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
      this.girlMap.setVelocityX(0);
      // this.barrel.setImmovable(false)
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
              onComplete: function() { console.log('FIN'); arguments[1][0].setAlpha(0); },
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

      if (!this.girlMap.anims.getFrameName().includes("jump")) {
        this.girlMap.anims.play('jump');
        this.ennemy.on('animationcomplete', () => {
          this.ennemy.anims.play('walk')
        })
      }
      if (this.girlMap.body.touching.down) {
        this.girlMap.setVelocityY(-590);
      }
    }
    else {
      this.girlMap.setVelocityX(0);
      this.girlMap.anims.play('idle_walk');
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
      *
      */
    if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
      if (this.girlMap.depth > this.barrel.depth - 10
        && this.girlMap.depth < this.barrel.depth + 10) {
        // this.barrel.allowGravity = false
        // this.barrel.moveTo.moveTo(this.girlMap.x, this.girlMap.y - 340);
      }
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
          displayWidth: 0,
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
