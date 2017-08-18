export function transformError(error) {
  // Strips non JSON values like functions and returns simple object for passing to fromJS
  return JSON.parse(JSON.stringify(error))
}
