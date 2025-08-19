// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function (source: youtube, "Theo - t3․gg")
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}



// Other function, very similar (source: youtube, "Web Dev Simplified")
export async function catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
  return promise
    .then(data => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error: Error) => {
      return [error]}
    )
}
