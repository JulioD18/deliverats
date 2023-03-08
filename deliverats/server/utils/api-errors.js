/**
 * Generic error handler used by all endpoints.
 * @param {Response} res The http response object
 * @param {number} status The status code
 * @param {string} message The error message
 * @returns The response object with the error message
 */
export function apiError(res, status, message) {
  return res.status(status).json({ error: message });
}

/**
 * Error handler used when a parameter is missing.
 * @param {Response} res The http response object
 * @param {string[]} params The list of the missing parameters
 * @returns The response object with the error message
 */
export function missingParamsError(res, params) {
  return apiError(
    res,
    400,
    `Missing required parameters: ${params.join(", ")}.`
  );
}

/**
 * Checks if the request contains all the required parameters.
 * @param {Request} req The http request object
 * @param {string[]} params The list of parameters to check
 * @param {string} section The section of the request to check (body, query, params)
 * @returns An array of missing parameters or null if all parameters are present
 */
export function findMissingParams(req, params, section = "body") {
  const missingParams = params.filter((param) => !req[section][param]);
  if (missingParams.length > 0) {
    return missingParams;
  } else {
    return null;
  }
}

/**
 * Error handler used when a resource is not found.
 * @param {Response} res The http response object
 * @param {string} type The type of the resource
 * @param {number} id The id of the resource
 * @returns The response object with the error message
 */
export function notFoundError(res, type, id) {
  return apiError(res, 404, `The ${type} with id ${id} does not exist.`);
}
