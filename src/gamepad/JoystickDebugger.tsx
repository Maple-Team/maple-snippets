import styled from '@emotion/styled'
import Color from 'color'
import { clamp, mean } from 'lodash'
import * as React from 'react'
import { colors } from '../widgets'

let max = 1

let w = 157

const Wrap = styled.div`
  position: relative;
  height: ${w}px;
  width: ${w}px;
  display: inline-block;
  border: 10px solid rgba(0, 0, 0, 0);
`

let bucketSize = Math.PI / 16

export function JoystickDebugger({
  point,
  showCircularity,
}: {
  point: { x: number; y: number }
  showCircularity: boolean
}) {
  const points = React.useRef<{ x: number; y: number }[]>([])
  const circularityAngles = React.useRef<Record<number, number>>({})

  const circularityScore = Math.sqrt(mean(Object.values(circularityAngles.current).map((v) => Math.pow(1 - v, 2))))

  React.useEffect(() => {
    points.current.push(point)
    if (points.current.length > max) {
      points.current.shift()
    }

    let len = Math.sqrt(point.x * point.x + point.y * point.y)
    if (len > 0.2) {
      let theta = Math.atan2(point.y, point.x)
      let thetaRounded = Math.round(theta / bucketSize) * bucketSize
      if (thetaRounded === -Math.PI) thetaRounded = Math.PI
      circularityAngles.current[thetaRounded] ||= 0
      circularityAngles.current[thetaRounded] = Math.max(circularityAngles.current[thetaRounded], len)
    }
  }, [point])

  return (
    <Wrap>
      <svg
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 1,
        }}
      >
        <g transform={`translate(${w / 2} ${w / 2}) scale(0.95, 0.95)`}>
          <circle
            cx={0}
            cy={0}
            r={w / 2}
            fill="none"
            stroke={colors.joystickAxes}
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={-w / 2}
            x2={0}
            y2={w / 2}
            stroke={colors.joystickAxes}
            strokeWidth={1}
          />
          <line
            x1={-w / 2}
            y1={0}
            x2={w / 2}
            y2={0}
            stroke={colors.joystickAxes}
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={0}
            x2={w * (0.5 * point.x)}
            y2={w * (0.5 * point.y)}
            stroke={colors.joystickIndicator}
            strokeWidth={1}
          />
          <circle
            cx={w * (0.5 * point.x)}
            cy={w * (0.5 * point.y)}
            r={4}
            fill={colors.joystickIndicator}
          />
          {/* {points.current.map((p, i) => (
            <line
              key={i}
              x1={w * (0.5 * p.x)}
              y1={w * (0.5 * p.y)}
              x2={w * (0.5 * points.current[i + 1]?.x) || 0}
              y2={w * (0.5 * points.current[i + 1]?.y || 0)}
              stroke={colors.joystickIndicator}
            />
          ))} */}
          {showCircularity && (
            <>
              {Object.entries(circularityAngles.current).map(([k, v]) => {
                let outColor = 'hsla(360,90%,50%)'
                let inColor = 'hsla(120,90%,50%)'
                let goodColor = 'hsla(230,100%,50%)'
                let score = clamp((v - 1) * 5, -1, 1)
                let c =
                  score < 0
                    ? Color(goodColor).mix(Color(inColor), -score)
                    : Color(goodColor).mix(Color(outColor), score)
                return (
                  <polygon
                    key={k}
                    points={[
                      '0,0',
                      w * (0.5 * Math.cos(+k - bucketSize / 2) * v) +
                        ',' +
                        w * (0.5 * Math.sin(+k - bucketSize / 2) * v),
                      w * (0.5 * Math.cos(+k + bucketSize / 2) * v) +
                        ',' +
                        w * (0.5 * Math.sin(+k + bucketSize / 2) * v),
                    ].join(' ')}
                    fill={c.toString()}
                    opacity={0.5}
                  />
                )
              })}
              <text
                y={20}
                fill="white"
                alignmentBaseline="middle"
                textAnchor="middle"
                fontWeight="bold"
              >
                Avg Error:
              </text>
              <text
                y={40}
                fill="white"
                alignmentBaseline="middle"
                textAnchor="middle"
                fontWeight="bold"
                fontSize={24}
              >
                {(circularityScore * 100).toFixed(1)}%
              </text>
            </>
          )}
        </g>
      </svg>
    </Wrap>
  )
}
