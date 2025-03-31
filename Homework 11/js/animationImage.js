class animationImage {
    constructor(x, y) {
      this.sprite = new Sprite(x, y);
      this.sprite.scale = 0.4;
      this.sprite.rotationLock = true;
      this.sprite.collider = 'dynamic';
      this.sprite.diameter = 0.1;
      this.sprite.debug = true;
    }
  
    loadAnimation(name, anim) {
      this.sprite.addAnimation(name, anim);
    }
  
    drawAnimation(name) {
      this.sprite.changeAnimation(name);
    }
  
    updatePosition() {
      this.sprite.velocity.x = 0;
      this.sprite.velocity.y = 0;
  
      const speed = 3;
  
      if (keyIsDown(RIGHT_ARROW)) {
        this.sprite.velocity.x = speed;
        this.sprite.mirror.x = false;
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.sprite.velocity.x = -speed;
        this.sprite.mirror.x = true;
      }
      if (keyIsDown(UP_ARROW)) {
        this.sprite.velocity.y = -speed;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.sprite.velocity.y = speed;
      }
    }
  
    getCurrentAnimation() {
      return this.sprite;
    }
  
    isColliding(otherSprite) {
      return this.sprite.collides(otherSprite);
    }
  }
  