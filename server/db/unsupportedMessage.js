export default (featureName) =>
  `Attempted to use '${featureName}' but DB type MongoDB doesn't support it`;
