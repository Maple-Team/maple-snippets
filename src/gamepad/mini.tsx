import styled from '@emotion/styled'
import React from 'react'
import { parseControllerId } from '../util/codes'
import { colors, mobile } from '../widgets'
import { GamepadActually } from './gamepadType'

export const Mini = React.memo(
  ({
    gamepad,
    isActive: isCurrent,
    idx,
    onClick,
  }: {
    gamepad: GamepadActually | null
    idx: number
    isActive: boolean
    onClick: (n: number) => void
  }) => {
    return (
      <MiniEl
        className={(isCurrent ? 'current ' : ' ') + (gamepad ? '' : 'no-gamepad')}
        onClick={(e) => onClick(idx)}
      >
        <MiniSlot>PLAYER {idx + 1}</MiniSlot>
        <MiniId>{gamepad ? parseControllerId(gamepad.id).knownController?.name || gamepad.id : 'None detected'}</MiniId>
        <MiniGamepadState gamepad={gamepad} />
      </MiniEl>
    )
  }
)

const MiniGamepadState = React.memo(({ gamepad }: { gamepad: GamepadActually | null }) => {
  if (!gamepad) return null

  return (
    <>
      <MiniButtonRow>
        {gamepad.axes.map((a, i) => (
          <MiniBtn
            key={i}
            style={{ opacity: 0.2 + 0.8 * Math.abs(a), width: 15 }}
          ></MiniBtn>
        ))}
      </MiniButtonRow>
      <MiniButtonRow>
        {gamepad.buttons.map((b, i) => (
          <MiniBtn
            key={i}
            style={{ opacity: 0.2 + 0.8 * b.value }}
          ></MiniBtn>
        ))}
      </MiniButtonRow>
    </>
  )
})

const MiniEl = styled.div`
  user-select: none;
  width: 25%;
  padding: 15px;
  cursor: pointer;
  border-left: 1px solid ${colors.gamepadMiniBorder};
  border-bottom: 1px solid ${colors.gamepadMiniBorder};

  &.current {
    background: white;
    border: none;
  }

  &.no-gamepad {
  }
`

export const MiniRow = styled.div`
  background: ${colors.gamepadMiniBg};
  display: flex;
  border-radius: 5px 5px 0 0;
  overflow: hidden;

  margin: -30px -30px 30px -30px;

  ${mobile} {
    margin: -15px -15px 15px -15px;
  }
`

const MiniSlot = styled.div`
  font-size: 75%;
  opacity: 0.6;
`

const MiniId = styled.div`
  font-weight: bold;

  .no-gamepad & {
    font-weight: normal;
  }
`

const MiniButtonRow = styled.div`
  display: flex;
`

// FIXME own named colors for this
const MiniBtn = styled.div`
  width: 5px;
  height: 5px;
  margin-right: 5px;
  margin-top: 5px;
  background: ${colors.joystickIndicator};
`
