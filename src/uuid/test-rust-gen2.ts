import { v4 } from "@napi-rs/uuid";

for (let index = 0; index < 10_000_000; index++) {
  v4();
}
