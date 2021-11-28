
Benchmark
```log
Benchmark 1: node dist/src/uuid/test-uuid-gen.js
  Time (mean ± σ):      8.065 s ±  0.092 s    [User: 7.991 s, System: 0.195 s]
  Range (min … max):    7.984 s …  8.211 s    10 runs

Benchmark 2: node dist/src/uuid/test-crypto-gen.js
  Time (mean ± σ):      2.609 s ±  0.008 s    [User: 2.586 s, System: 0.071 s]
  Range (min … max):    2.601 s …  2.625 s    10 runs

Benchmark 3: node dist/src/uuid/test-nanoid-gen.js
  Time (mean ± σ):      2.798 s ±  0.004 s    [User: 2.750 s, System: 0.128 s]
  Range (min … max):    2.792 s …  2.804 s    10 runs

Summary
  'node dist/src/uuid/test-crypto-gen.js' ran
    1.07 ± 0.00 times faster than 'node dist/src/uuid/test-nanoid-gen.js'
    3.09 ± 0.04 times faster than 'node dist/src/uuid/test-uuid-gen.js'
```