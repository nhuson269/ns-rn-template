/**
 * A "modern" sleep statement.
 *
 * @param ms The number of milliseconds to wait.
 */
export function delay(ms: number) {
  return new Promise((resolve: any | PromiseLike<any>) =>
    setTimeout(resolve, ms),
  );
}
