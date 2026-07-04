export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

export function canvasFromImage(img, w, h) {
  const c = document.createElement('canvas')
  c.width = w || img.width
  c.height = h || img.height
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
  return c
}

export function applyFilter(ctx, w, h, fn) {
  const data = ctx.getImageData(0, 0, w, h)
  fn(data.data, w, h)
  ctx.putImageData(data, 0, 0)
}

export const processors = {
  resize(img, opts) {
    const scale = (opts.scale || 100) / 100
    const w = Math.round(img.width * scale)
    const h = Math.round(img.height * scale)
    return canvasFromImage(img, w, h)
  },
  rotate(img, opts) {
    const angle = (opts.angle || 0) * Math.PI / 180
    const c = document.createElement('canvas')
    const rad = Math.abs(angle)
    c.width = Math.abs(img.width * Math.cos(rad)) + Math.abs(img.height * Math.sin(rad))
    c.height = Math.abs(img.width * Math.sin(rad)) + Math.abs(img.height * Math.cos(rad))
    const ctx = c.getContext('2d')
    ctx.translate(c.width / 2, c.height / 2)
    ctx.rotate(angle)
    ctx.drawImage(img, -img.width / 2, -img.height / 2)
    return c
  },
  flip(img, opts) {
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.save()
    if (opts.direction === 'h') { ctx.translate(c.width, 0); ctx.scale(-1, 1) }
    else { ctx.translate(0, c.height); ctx.scale(1, -1) }
    ctx.drawImage(img, 0, 0)
    ctx.restore()
    return c
  },
  blur(img, opts) {
    const c = canvasFromImage(img)
    c.getContext('2d').filter = `blur(${opts.amount || 5}px)`
    c.getContext('2d').drawImage(img, 0, 0)
    return c
  },
  brightness(img, opts) {
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    ctx.filter = `brightness(${opts.amount || 100}%)`
    ctx.drawImage(img, 0, 0)
    return c
  },
  saturation(img, opts) {
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    ctx.filter = `saturate(${opts.amount || 100}%)`
    ctx.drawImage(img, 0, 0)
    return c
  },
  grayscale(img) {
    const c = canvasFromImage(img)
    applyFilter(c.getContext('2d'), c.width, c.height, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        const avg = d[i] * 0.3 + d[i+1] * 0.59 + d[i+2] * 0.11
        d[i] = d[i+1] = d[i+2] = avg
      }
    })
    return c
  },
  vintage(img) {
    const c = canvasFromImage(img)
    applyFilter(c.getContext('2d'), c.width, c.height, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i] = Math.min(255, d[i] * 1.1)
        d[i+1] = d[i+1] * 0.9
        d[i+2] = d[i+2] * 0.8
      }
    })
    return c
  },
  negative(img) {
    const c = canvasFromImage(img)
    applyFilter(c.getContext('2d'), c.width, c.height, (d) => {
      for (let i = 0; i < d.length; i += 4) { d[i] = 255-d[i]; d[i+1] = 255-d[i+1]; d[i+2] = 255-d[i+2] }
    })
    return c
  },
  emboss(img) {
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    const d = ctx.getImageData(0, 0, c.width, c.height)
    const out = ctx.createImageData(c.width, c.height)
    for (let y = 1; y < c.height - 1; y++) {
      for (let x = 1; x < c.width - 1; x++) {
        const i = (y * c.width + x) * 4
        const v = d.data[i] - d.data[i - 4] + 128
        out.data[i] = out.data[i+1] = out.data[i+2] = Math.max(0, Math.min(255, v))
        out.data[i+3] = 255
      }
    }
    ctx.putImageData(out, 0, 0)
    return c
  },
  ink(img) {
    const c = processors.grayscale(img)
    applyFilter(c.getContext('2d'), c.width, c.height, (d) => {
      for (let i = 0; i < d.length; i += 4) d[i] = d[i+1] = d[i+2] = d[i] > 128 ? 255 : 0
    })
    return c
  },
  warmth(img, opts) {
    const c = canvasFromImage(img)
    const warm = opts.amount || 0
    applyFilter(c.getContext('2d'), c.width, c.height, (d) => {
      for (let i = 0; i < d.length; i += 4) {
        d[i] = Math.min(255, d[i] + warm * 2)
        d[i+2] = Math.max(0, d[i+2] - warm)
      }
    })
    return c
  },
  watermark(img, opts) {
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    ctx.font = `${opts.size || 24}px sans-serif`
    ctx.fillStyle = `rgba(255,255,255,${opts.opacity || 0.5})`
    ctx.fillText(opts.text || '素盒工具箱', 20, c.height - 20)
    return c
  },
  compress(img, opts) {
    return canvasFromImage(img, Math.round(img.width * (opts.quality || 0.7)), Math.round(img.height * (opts.quality || 0.7)))
  },
  round(img, opts) {
    const r = opts.radius || 20
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    ctx.globalCompositeOperation = 'destination-in'
    ctx.beginPath()
    ctx.roundRect(0, 0, c.width, c.height, r)
    ctx.fill()
    return c
  },
  nineGrid(img) {
    const size = Math.min(img.width, img.height)
    const cell = Math.floor(size / 3)
    const canvases = []
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const c = document.createElement('canvas')
        c.width = c.height = cell
        c.getContext('2d').drawImage(img, col * cell, row * cell, cell, cell, 0, 0, cell, cell)
        canvases.push(c)
      }
    }
    return canvases
  },
  filter(img, opts) {
    const c = canvasFromImage(img)
    const ctx = c.getContext('2d')
    const filters = ['', 'grayscale(100%)', 'sepia(80%)', 'contrast(150%)', 'brightness(120%)', 'saturate(200%)', 'hue-rotate(90deg)', 'invert(100%)']
    ctx.filter = filters[opts.filterIdx || 0] || ''
    ctx.drawImage(img, 0, 0)
    return c
  },
  placeholder(opts) {
    const w = opts.width || 400, h = opts.height || 300
    const c = document.createElement('canvas')
    c.width = w; c.height = h
    const ctx = c.getContext('2d')
    ctx.fillStyle = opts.bg || '#e2e8f0'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = opts.color || '#94a3b8'
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(opts.text || `${w}×${h}`, w/2, h/2)
    return c
  },
  idPhoto(img) {
    const size = 295
    const c = document.createElement('canvas')
    c.width = size; c.height = Math.round(size * 1.4)
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, c.width, c.height)
    const scale = Math.max(c.width / img.width, c.height / img.height)
    const w = img.width * scale, h = img.height * scale
    ctx.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h)
    return c
  },
}

export function downloadCanvas(canvas, name = 'image.png', type = 'image/png', quality = 0.92) {
  const link = document.createElement('a')
  link.download = name
  link.href = canvas.toDataURL(type, quality)
  link.click()
}
