import React from 'react'

import Bullet from './Bullet'
import Tank from './Tank'

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  A: 65,
  D: 68,
  W: 87,
  S: 83,
  SPACE: 32
};

export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 640,
      height: 640,
      context: null,
      keys : {
        left  : 0,
        right : 0,
        up    : 0,
        down  : 0,
        space : 0,
      },
      username: '',
      id: null 
    }
    this.tanks = []
    this.bullets = []
    this.socket = null
  }

  handleKeys(value, e){
    let keys = this.state.keys;
    let messageToServer = {
      user: this.username
    }
    if(e.keyCode === KEY.LEFT || e.keyCode === KEY.A) {
      messageToServer.key = 'LEFT'
      messageToServer.value = value
      keys.left   = value;
    }
    if(e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) {
      messageToServer.key = 'RIGHT'
      messageToServer.value = value
      keys.right  = value;
    }
    if(e.keyCode === KEY.UP || e.keyCode === KEY.W) {
      messageToServer.key = 'UP'
      messageToServer.value = value
      keys.up     = value;
    }
    if(e.keyCode === KEY.DOWN || e.keyCode === KEY.S) {
      messageToServer.key = 'DOWN'
      messageToServer.value = value
      keys.down = value;
    }
    if(e.keyCode === KEY.SPACE) {
      messageToServer.key = 'SHOOT'
      messageToServer.value = value
      keys.space = value;
    }

    //Not needed anymore beacouse we send data to server
    this.setState({
      keys : keys
    });

    //Only send if user pressed a button that we are interested in
    if(messageToServer.key) {
      this.socket.send(JSON.stringify(messageToServer))
    }
  }

  componentDidMount() {
    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));

    //Connecting to server
    this.socket = new WebSocket(process.env.SERVER_ADDRESS)
    this.socket.onopen = this.handleSuccessfulConnection.bind(this)
    this.socket.onmessage = this.handleMessage.bind(this)

    const context = this.refs.canvas.getContext('2d');
    const id = requestAnimationFrame(() => {this.update()});
    this.setState({ context: context, id: id });
    this.startGame();
    
  }

  handleSuccessfulConnection() {
    //TODO: Display that the connection to the server is succesfult, you can join to the game
  }

  handleMessage(event) {
    if (typeof event.data === String) {
      //TODO: Read response and refresh game state....
      //Handle end game
    }
  }

  startGame() {
    this.tanks.push(new Tank(10, 25, 33))
    this.tanks.push(new Tank(400, 222, 251))
    this.tanks.push(new Tank(110, 90, 11))
    this.tanks.push(new Tank(622, 122, 183))

    this.bullets.push(new Bullet(45, 99, this.refs.bulletImg))
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
    cancelAnimationFrame(this.state.id)
  }

  update() {
    const context = this.state.context;
    const keys = this.state.keys;

    context.save();

    // Background
    context.fillStyle = '#ccc';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, this.state.width, this.state.height);
    context.globalAlpha = 1;

    // Next set of asteroids
    if(this.tanks.length){
      this.tanks.forEach(tank => {
        tank.render(context)
      })
    }

    if(this.bullets.length){
      this.bullets.forEach(bullet => {
        bullet.render(context)
      })
    }

    // // Check for colisions
    // this.checkCollisionsWith(this.bullets, this.asteroids);
    // this.checkCollisionsWith(this.ship, this.asteroids);

    // // Remove or render
    // this.updateObjects(this.particles, 'particles')
    // this.updateObjects(this.asteroids, 'asteroids')
    // this.updateObjects(this.bullets, 'bullets')
    // this.updateObjects(this.ship, 'ship')

    context.restore();

    // Next frame
    requestAnimationFrame(() => {this.update()});
  }


  render() {
    return (
    <>
      <label>
        Name
      <input type="text"/>
      </label>
      <button>Connect</button>
      <canvas ref="canvas"
          width={this.state.width }
          height={this.state.height }
      />
      <div style={{ display: 'none'}}>
        <img src="/nandi.jpg" ref='bulletImg' alt=""/>
      </div>      
    </>
    )
  }
}