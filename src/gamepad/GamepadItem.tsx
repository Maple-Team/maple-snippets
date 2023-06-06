import styled from '@emotion/styled'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { parseControllerId } from '../util/codes'
import { colors, mobile } from '../widgets'
import { StandardGamepad } from './ControllerArt'
import { GamepadActually } from './gamepadType'
import { buttonValue } from './gamepadUtils'
import { JoystickDebugger } from './JoystickDebugger'

const AxesItemEl = styled.div`
  display: inline-flex;
  margin: 0 15px 5px 0;
  line-height: 1;
`

const AxesValue = styled.div`
  display: block;
  margin-top: 3px;
  overflow: hidden;
  white-space: nowrap;
`

// const BitDepthValue = styled(AxesValue)`
//   font-size: 75%;
// `;

const AxesLabel = styled.label`
  color: ${colors.buttonText};
  font-size: 75%;
  opacity: 0.6;
`

const SectionEl = styled.div`
  margin: 20px 0;
`

export function GamepadItem({ gamepad }: { gamepad: GamepadActually | null }) {
  const [showCircularity, setShowCircularity] = React.useState(false)

  if (!gamepad) {
    return (
      <h2>
        <FontAwesomeIcon
          icon={faSyncAlt}
          spin={true}
          color="#d7d"
          style={{ marginRight: 10 }}
        />{' '}
        Connect your gamepad and press buttons to begin...
      </h2>
    )
  }

  // const pointsRef = React.useRef<Record<number, number>>({});

  let metadata = parseControllerId(gamepad.id)
  // let v = gamepad.axes[0];
  // pointsRef.current[v] ||= 0;
  // pointsRef.current[v] += 1;

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex' }}>
        <div>
          <h2 style={{ marginBottom: 0 }}>{metadata.knownController?.name || gamepad.id}</h2>
          {metadata.knownController && <h3 style={{ marginBottom: 0 }}>{gamepad.id}</h3>}
          <SectionEl>
            <AxisItem
              nVal={0}
              label="INDEX"
              value={gamepad.index}
            />
            <AxisItem
              nVal={0}
              label="CONNECTED"
              value={gamepad.connected ? 'Yes' : 'No'}
            />
            <AxisItem
              nVal={0}
              label="MAPPING"
              value={mappingString(gamepad.mapping)}
            />
            <AxisItem
              nVal={0}
              label="TIMESTAMP"
              value={formatFloat(gamepad.timestamp, 5)}
            />
          </SectionEl>

          <SectionEl>
            <AxisItem
              nVal={0}
              label="Pose"
              value={gamepad.pose && Object.keys(gamepad.pose).length > 0 ? 'Yes' : 'n/a'}
            />
            <AxisItem
              nVal={0}
              label="HapticActuators"
              value={gamepad.hapticActuators && Object.keys(gamepad.hapticActuators).length > 0 ? 'Yes' : 'n/a'}
            />
            <AxisItem
              nVal={0}
              label="Hand"
              value={gamepad.hand ? gamepad.hand : 'n/a'}
            />
            <AxisItem
              nVal={0}
              label="DisplayId"
              value={(gamepad as any).displayId != null ? (gamepad as any).displayId : 'n/a'}
            />
            <AxisItem
              nVal={0}
              label="Vibration"
              value={gamepad.vibrationActuator ? 'Yes' : 'n/a'}
            />
            {gamepad && gamepad.vibrationActuator && (
              <AxesItemElVib onClick={() => testVibration(gamepad)}>
                <div>
                  <AxesLabel>Test</AxesLabel>
                  <AxesValue>Vibration</AxesValue>
                </div>
              </AxesItemElVib>
            )}
          </SectionEl>

          <SectionEl>
            {gamepad.buttons.map((button, i) => (
              <AxisItem
                key={i}
                label={'B' + i}
                value={formatFloat(buttonValue(button), 2)}
                valueTrue={buttonValue(button)}
                nVal={Math.abs(buttonValue(button))}
                style={buttonStyle}
                isAxes
                axesC={1}
                axesCoef={-1}
              />
            ))}
          </SectionEl>

          <SectionEl>
            {gamepad.axes.map((axis, i) => (
              <AxisItem
                nVal={axis}
                key={i}
                label={'AXIS ' + i}
                value={formatFloat(axis, 5)}
                valueTrue={axis}
                style={axisStyle}
                isAxes
                axesC={0.5}
                axesCoef={0.5}
              />
            ))}
          </SectionEl>

          {gamepad.mapping === 'standard' && (
            <>
              <div style={{ marginLeft: -10 }}>
                <JoystickDebugger
                  key={'l' + showCircularity}
                  showCircularity={showCircularity}
                  point={{ x: gamepad.axes[0], y: gamepad.axes[1] }}
                />
                <JoystickDebugger
                  key={'r' + showCircularity}
                  showCircularity={showCircularity}
                  point={{ x: gamepad.axes[2], y: gamepad.axes[3] }}
                />
              </div>

              <div>
                <p style={{ fontSize: '75%', opacity: 0.5 }}>Diagnostics:</p>
                <label>
                  <input
                    type="checkbox"
                    checked={showCircularity}
                    onChange={(e) => setShowCircularity(e.currentTarget.checked)}
                  />{' '}
                  Test Circularity{' '}
                  {showCircularity && <span style={{ opacity: 0.5 }}>(spin joysticks slowly to test)</span>}
                </label>
              </div>
            </>
          )}
        </div>

        {hasGamepadArt(gamepad) && (
          <GamepadArtWrap>
            <GamepadArt gamepad={gamepad} />
          </GamepadArtWrap>
        )}
      </div>

      {/* {metadata.knownController?.embed && (
          <div style={{ marginTop: 20 }}>{metadata.knownController.embed}</div>
        )} */}
    </div>
  )
}

const GamepadArtWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  ${mobile} {
    display: none;
  }
`

const buttonStyle = { width: '50px' }
const axisStyle = { width: '80px' }

function GamepadArt({ gamepad }: { gamepad: GamepadActually }) {
  // if (/playstation/.test(gamepad.id)) {
  //   <Dualshock gamepad={gamepad} />;
  // }

  // else, if we have the right number of buttons and axes, assume its an xbox-like
  // console.log(gamepad.buttons.length, gamepad.axes.length);
  if (hasGamepadArt(gamepad)) {
    return (
      <StandardGamepad
        gamepad={gamepad}
        width={350}
      />
    )
  }

  // give up
  return null
}

const barH = 35
const barW = 5

const AxisItem = React.memo(
  (props: {
    label: string
    value: number | string
    valueTrue?: number
    nVal: number
    style?: React.CSSProperties
    isAxes?: boolean
    axesC?: number
    axesCoef?: number
  }) => {
    // const maxPrec = React.useRef(1);

    let axes: React.ReactNode = null

    // let i = 0;
    // for (; i < 64; i++) {
    //   if (((props.valueTrue || 0) * Math.pow(2, i)) % 1 === 0) {
    //     break;
    //   }
    // }
    // maxPrec.current = Math.max(maxPrec.current, i);

    if (props.isAxes) {
      let c = props.axesC !== undefined ? props.axesC : 0
      let coef = props.axesCoef !== undefined ? props.axesCoef : 1

      axes = (
        <svg style={buttonSvgStyle}>
          <line
            x1={barW * 0.5}
            y1={c * barH}
            x2={barW * 0.5}
            y2={(props.nVal * coef + c) * barH}
            strokeWidth={barW}
            stroke={colors.buttonAxes}
          ></line>
        </svg>
      )
    }

    return (
      <AxesItemEl style={props.style}>
        {axes}
        <div>
          <AxesLabel>{props.label}</AxesLabel>
          <AxesValue>{props.value}</AxesValue>
          {/* <AxesValue>{maxPrec.current}</AxesValue> */}
        </div>
      </AxesItemEl>
    )
  }
)

const buttonSvgStyle = {
  position: 'relative' as const,
  width: barW,
  borderRight: '5px solid white',
  height: barH,
  background: colors.buttonBarBg,
}

const AxesItemElVib = styled(AxesItemEl)`
  cursor: pointer;
  color: purple;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`

function hasGamepadArt(gamepad: GamepadActually) {
  // return gamepad.buttons.length === 17 && gamepad.axes.length === 4;

  return gamepad.axes.length === 4
}

function mappingString(mapping: GamepadMappingType) {
  return mapping || 'n/a'
}

function formatFloat(n: number, places: number) {
  var m = Math.pow(10, places)
  return '' + parseFloat('' + Math.round(n * m) / m).toFixed(places)
}

function testVibration(gamepad: GamepadActually) {
  if (gamepad && gamepad.vibrationActuator) {
    gamepad.vibrationActuator.playEffect('dual-rumble', {
      startDelay: 0,
      duration: 1000,
      weakMagnitude: 1.0,
      strongMagnitude: 1.0,
    })
  }
}
