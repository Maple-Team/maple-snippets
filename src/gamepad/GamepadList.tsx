import { zip } from "lodash";
import React from "react";
import * as api from "../api";
import { Article, Card, Row } from "../widgets";
import { GamepadItem } from "./GamepadItem";
import { GamepadActually } from "./gamepadType";
import { Mini, MiniRow } from "./Mini";
// import { gamepadsMock } from "./gamepadMock";

function pollGamepads() {
  if (navigator.getGamepads) {
    return navigator.getGamepads();
  } else {
    return [];
  }
}

export function GamepadList() {
  const [gamepads, setGamepads] = React.useState<(Gamepad | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const gpRef = React.useRef(gamepads);
  gpRef.current = gamepads;

  const [currentIdx, setCurrentIdx] = React.useState(0);

  React.useEffect(() => {
    let done = false;

    function onGamepadConnect(g: GamepadEventInit) {
      if (g.gamepad) api.recordStats(g.gamepad as GamepadActually);
    }

    // @ts-ignore
    window.addEventListener("gamepadconnected", onGamepadConnect);

    // this cleverness is necessary because chrome / ff don't have the same referential equality for the gamepad objects they hand over.
    var lastTimestamps: (number | undefined)[] = [];

    function tick() {
      if (done) return;
      var nextGamepadsFrame = pollGamepads();
      var nowTimestamps = nextGamepadsFrame.map((gp) => gp?.timestamp);
      var anyUpdated =
        nowTimestamps.length !== lastTimestamps.length ||
        zip(nowTimestamps, lastTimestamps).some((pair) => pair[0] !== pair[1]);

      if (anyUpdated) setGamepads(nextGamepadsFrame);

      lastTimestamps = nowTimestamps;

      window.requestAnimationFrame(tick);
      // window.setTimeout(() => tick(), 1000);
    }

    tick();

    return () => {
      done = true;
      window.removeEventListener("gamepadconnected", onGamepadConnect);
    };
  }, []);

  // the actual list of gamepads is not a normal array yet
  var gamepadArr: (GamepadActually | null)[] = [].slice.call(gamepads) as any;

  // for local dev and testing, uncomment this
  // gamepadArr = gamepadsMock;

  const onClick = React.useCallback((n) => {
    setCurrentIdx(n);
  }, []);

  return (
    <>
      <Row>
        <Card>
          <MiniRow>
            {gamepadArr.map((g, idx) => (
              <Mini
                key={idx}
                gamepad={g}
                idx={idx}
                isActive={currentIdx === idx}
                onClick={onClick}
              />
            ))}
          </MiniRow>
          <Article>
            <GamepadItem gamepad={gamepadArr[currentIdx]} />
          </Article>
        </Card>
      </Row>
    </>
  );
  // }
}
