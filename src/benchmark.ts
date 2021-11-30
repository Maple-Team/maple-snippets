import benny from "benny";

benny.suite(
  "Example",

  benny.add("Reduce two elements", () => {
    [1, 2].reduce((a, b) => a + b);
  }),

  benny.add("Reduce five elements", () => {
    [1, 2, 3, 4, 5].reduce((a, b) => a + b);
  }),

  benny.cycle(),
  benny.complete(),
  benny.save({ file: "reduce", version: "1.0.0" }),
  benny.save({ file: "reduce", format: "chart.html" })
);
