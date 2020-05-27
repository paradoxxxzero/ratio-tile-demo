import './index.sass'

import RatioTile from './ratio-tile'

class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.t0 = new Date().getTime()
    this.size()
  }
  get w() {
    return this.canvas.getBoundingClientRect().width
  }
  get h() {
    return this.canvas.getBoundingClientRect().height
  }
  size() {
    this.canvas.width = innerWidth
    this.canvas.height = innerHeight
  }
}

const canvas = new Canvas()
addEventListener('resize', () => {
  canvas.size()
  requestAnimationFrame(draw)
})

const tile = new RatioTile(canvas)

addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowUp') {
    tile.upRatio()
  } else if (key === 'ArrowDown') {
    tile.downRatio()
  }
  tile.render()
})

const draw = () => {
  tile.render()
  // requestAnimationFrame(draw);
}
draw()
