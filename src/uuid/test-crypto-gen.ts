import { randomUUID } from "crypto";
for (let index = 0; index < 10_000_000; index++) {
  randomUUID();
}
