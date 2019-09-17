const BULLET_SIZE = 50

export default class Bullet {
  constructor(x, y, img) {
    this.img = img
    this.x = x 
    this.y = y
  }

  setPosition(x, y) {
    this.x = x
    this.y = y
  }
  
  render(context) {
    context.save()
    context.drawImage(this.img, this.x, this.y, BULLET_SIZE, BULLET_SIZE)
    context.fill()
    context.restore()
  }
}