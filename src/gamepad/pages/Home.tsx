import React from 'react'
import { Helmet } from 'react-helmet-async'
import { times } from 'lodash'
import { GamepadList } from '../GamepadList'
import { AdCard, Article, Card, Main, Row } from '../widgets'
import type { GamepadArtSubset } from '../ControllerArt'
import { StandardGamepad } from '../ControllerArt'
import { useIsMobile } from '../hooks'
import { VenatusAd } from '../Venatus'

const MOCK_GAMEPAD: GamepadArtSubset = {
  axes: times(4).map(() => 0),
  buttons: times(17).map(() => 0 as any),
}

export function Home() {
  const isMobile = useIsMobile()
  return (
    <div>
      <Helmet>
        <title>Gamepad Tester - Check Controllers and Joysticks Online</title>
        <meta
          name="description"
          content="Displays info about all gamepads connected to your computer. Check buttons, joystick axes, drift, and more. Works with all controllers and joysticks in a modern browser."
        />
      </Helmet>

      <Main>
        <GamepadList />
        <Row>
          <AdCard>
            {isMobile ? (
              <VenatusAd
                key="mobile"
                placementId="61bc6d8a058691726d94b79a"
              />
            ) : (
              <VenatusAd
                key="desktop"
                placementId="61bc6d75ecb57460dc086e67"
              />
            )}
          </AdCard>
        </Row>

        <Row>
          <Card style={{ flexGrow: 1.7 }}>
            <Article>
              <h2>Gamepad Tester and Debugger</h2>
              <div style={{ float: 'right', marginLeft: 30, marginBottom: 30 }}>
                <StandardGamepad
                  gamepad={MOCK_GAMEPAD}
                  width={150}
                />
              </div>
              <p>
                When connected, this tool displays the current state of your gamepads, inputs, joysticks, and anything
                else that can be reported by the HTML5 Gamepad Api.
              </p>
              <p>This is also useful for debugging broken controllers, experimental hardware, and more.</p>
              <p>
                Other tools:{' '}
                <b>
                  {/* eslint-disable-next-line */}
                  <a
                    target="_blank"
                    href="https://whatsmygpu.com/"
                  >
                    What's My GPU?
                  </a>
                </b>
              </p>
            </Article>
          </Card>
        </Row>
      </Main>
    </div>
  )
}
