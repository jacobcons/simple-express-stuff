// 1(a)
function zeckendorf(n) {
  m = largestFibLessThanOrEqualTo(n);
  if (n == m) {
    return [m];
  }
  return [m, ...zeckendorf(n - m)];
}

function largestFibLessThanOrEqualTo(n) {
  let a = 1;
  let b = 1;
  while (b <= n) {
    [a, b] = [b, a + b];
  }
  return a;
}
console.log(zeckendorf(process.argv[2]).join(" "));

// 1(b) 832040
console.log(largestFibLessThanOrEqualTo(1000000));
