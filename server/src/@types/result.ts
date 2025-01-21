type Success<T> = {
	success: true;
	data: T;
};

type Failure = {
	success: false;
	error: Error;
};

export type Result<T> = Success<T> | Failure;
