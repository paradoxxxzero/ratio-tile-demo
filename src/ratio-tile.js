export default class RatioTile {
  constructor(canvas) {
    this.canvas = canvas

    this.ratio = 0.2
    this.ratioStep = 0.01
    this.tileNumber = 50
  }

  tile(box, index, last) {
    return new Array(index + 1).fill().reduce((area, _, i) => {
      // If it's the last iteration
      if (index === i) {
        // If it's the last window, it takes all the remaining space
        if (last) {
          return area
        }
        // Otherwise it's a simple split from available space
        if (area.width > area.height) {
          return {
            x: area.x,
            y: area.y,
            width: area.width * this.ratio,
            height: area.height,
          }
        }
        return {
          x: area.x,
          y: area.y,
          width: area.width,
          height: area.height * this.ratio,
        }
      }
      // If it's a normal iteration compute remaining space atfer split
      if (area.width > area.height) {
        return {
          x: area.x + area.width * this.ratio,
          y: area.y,
          width: area.width * (1 - this.ratio),
          height: area.height,
        }
      }
      return {
        x: area.x,
        y: area.y + area.height * this.ratio,
        width: area.width,
        height: area.height * (1 - this.ratio),
      }
    }, box)
  }

  upRatio() {
    this.ratio = Math.min(1, this.ratio + this.ratioStep)
  }
  downRatio() {
    this.ratio = Math.max(0, this.ratio - this.ratioStep)
  }

  render() {
    this.canvas.ctx.fillStyle = `rgb(0, 0, 0)`
    // this.canvas.ctx.globalCompositeOperation = 'source-in'
    this.canvas.ctx.fillRect(0, 0, this.canvas.w, this.canvas.h)
    new Array(this.tileNumber).fill().forEach((_, i) => {
      const { x, y, width, height } = this.tile(
        { x: 0, y: 0, width: this.canvas.w, height: this.canvas.h },
        i,
        i === this.tileNumber - 1
      )
      const hue = ~~((i * 73) % 360)
      this.canvas.ctx.fillStyle = `hsl(${hue}, 50%, 75%)`
      this.canvas.ctx.fillRect(x, y, width, height)
    })
  }
}
