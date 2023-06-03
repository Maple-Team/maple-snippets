import React from 'react'

/**
 * MAX TEXTURE SIZE
 * @returns
 */
export function useCaps() {
  const caps = React.useMemo(() => {
    const gl = document.createElement('canvas').getContext('webgl')
    return gl
      ? {
          MAX_TEXTURE_SIZE: gl.getParameter(gl.MAX_TEXTURE_SIZE),
          MAX_VIEWPORT_DIMS: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
        }
      : null
  }, [])

  return caps
}
/**
 * 屏幕颜色深度
 * @returns
 */
export function CurrentColorDepth() {
  const val = `${window.screen.colorDepth}bit`
  // {Math.pow(2, window.screen.colorDepth).toLocaleString()} colors
  return val
}

/**
 * FPS信息
 * @returns
 */
export function FPSCounter() {
  // eslint-disable-next-line
    let [retryCount, setRetryCount] = React.useState(0);

  const [fps, setFps] = React.useState<number | null>(null)
  // eslint-disable-next-line
    let [isCalculatingFps, setisCalculatingFps] = React.useState(true);
  React.useEffect(() => {
    let startTime: number | null = null
    let lastUpdateTime: number | null = null
    let frameCount = 0
    const runForSeconds = 0.5
    const updateInterval = 0.25

    let id = requestAnimationFrame(loop)

    function loop() {
      // start these at this moment on the first frame for better accuracy
      if (startTime === null) startTime = Date.now()
      if (lastUpdateTime === null) lastUpdateTime = Date.now()

      frameCount++

      const t = Date.now()
      const elapsedMs = t - startTime
      const estFps = (frameCount / elapsedMs) * 1000
      if (t > startTime + runForSeconds * 1000) {
        setFps(estFps)
        setisCalculatingFps(false)
        return
      }

      if (t > lastUpdateTime + updateInterval * 1000) {
        lastUpdateTime = Date.now()
        setFps(estFps)
      }

      id = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(id)
    }
  }, [retryCount])

  const fpsRounded = fps?.toFixed() || null

  return fpsRounded !== null ? `~${fpsRounded}fps` : '...'
}

/**
 * 当前屏幕分辨率
 * @returns
 */
export function currentResolution() {
  return `${window.screen.width * window.window.devicePixelRatio} x ${window.screen.height * window.devicePixelRatio}px`
}
