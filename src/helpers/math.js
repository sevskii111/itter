export const solveItter = (matrix, eps) => {
  const n = matrix.length;
  const teta = (matrix) => {
    let t = 0;
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let j = 0; j < n; j++) {
        s += Math.abs(matrix[i][j]);
      }
      s /= matrix[i][i];
      t = Math.max(t, s);
    }
    return t - 1;
  };

  const norma = (x, y) => {
    let d = 0;
    let s = 0;
    for (let i = 0; i < n; i++) {
      s = Math.abs(x[i] - y[i]);
      d = Math.max(s, d);
    }
    return d;
  };

  const step = (x, y) => {
    for (let i = 0; i < n; i++) {
      y[i] = -matrix[i][n];
      for (let j = 0; j < n; j++) {
        y[i] += matrix[i][j] * x[j];
      }
      y[i] = x[i] - y[i] / matrix[i][i];
    }
  };

  const t = teta(matrix);
  let x1;
  let x2 = new Array(n).fill(0);
  let i = 0;
  do {
    x1 = [...x2];
    x2 = [];
    step(x1, x2);
    console.log([i, ...x1, norma(x1, x2)].join(","), norma(x1, x2));
    i++;
  } while (norma(x1, x2) > (eps * (1 - t)) / t);
  return { theta: t, solution: x2 };
};
