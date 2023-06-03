import React from 'react'
import { zip } from 'lodash-es'

function pollGamepads() {
  if (navigator.getGamepads) return navigator.getGamepads()
  else return []
}

export function GamepadList() {
  const [gamepads, setGamepads] = React.useState<(Gamepad | null)[]>([null, null, null, null])

  const gpRef = React.useRef(gamepads)
  gpRef.current = gamepads

  React.useEffect(() => {
    let done = false

    function onGamepadConnect(g: GamepadEventInit) {
      if (g.gamepad) console.log(g.gamepad)
    }

    window.addEventListener('gamepadconnected', onGamepadConnect)

    // this cleverness is necessary because chrome / ff don't have the same referential equality for the gamepad objects they hand over.
    let lastTimestamps: (number | undefined)[] = []

    function tick() {
      if (done) return
      const nextGamepadsFrame = pollGamepads()
      const nowTimestamps = nextGamepadsFrame.map((gp) => gp?.timestamp)
      const anyUpdated =
        nowTimestamps.length !== lastTimestamps.length ||
        zip(nowTimestamps, lastTimestamps).some((pair) => pair[0] !== pair[1])

      if (anyUpdated) setGamepads(nextGamepadsFrame)

      lastTimestamps = nowTimestamps

      window.requestAnimationFrame(tick)
      // window.setTimeout(() => tick(), 1000);
    }

    tick()

    return () => {
      done = true
      window.removeEventListener('gamepadconnected', onGamepadConnect)
    }
  }, [])

  console.log(gamepads)

  // }
}
