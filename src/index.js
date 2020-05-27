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

const screenRatioText = document.getElementById('screen-ratio')
const tileRatioText = document.getElementById('tile-ratio')
const canvas = new Canvas()
screenRatioText.textContent = (canvas.w / canvas.h).toPrecision(6)
addEventListener('resize', () => {
  canvas.size()
  screenRatioText.textContent = (canvas.w / canvas.h).toPrecision(6)
  requestAnimationFrame(draw)
})

const tile = new RatioTile(canvas)
tileRatioText.textContent = tile.ratio.toPrecision(6)

addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowUp') {
    tile.upRatio()
  } else if (key === 'ArrowDown') {
    tile.downRatio()
  }
  tileRatioText.textContent = tile.ratio.toPrecision(6)
  tile.render()
})

const draw = () => {
  tile.render()
  // requestAnimationFrame(draw);
}
draw()
