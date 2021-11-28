import { uuidv4 } from "maple-uuid.darwin-x64.node";
for (let index = 0; index < 10_000_000; index++) {
  uuidv4();
}
