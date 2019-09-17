const TANK_COLOR = '#009900'
const TANK_SIZE  = 50

export default class Tank {
  constructor(x = 0, y = 0, rotation = 0) {
    this.x = x
    this.y = y
    this.rotation = rotation
  }

  setPosition(x, y, rotation) {
    this.x = x
    this.y = y
    this.rotation = rotation
  }

  render(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation * Math.PI / 180)
    context.lineWidth = 2
    context.fillStyle = TANK_COLOR
    context.fillRect(0,0, TANK_SIZE, TANK_SIZE)
    context.fillStyle = '#705737'
    context.fillRect(20, 25, 10, 50)
    context.beginPath()
    context.arc(25, 25, 18, 0, 2 * Math.PI)
    context.closePath()
    context.fill()
    context.restore()
  }
}