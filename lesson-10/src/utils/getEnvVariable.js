export function getEnvVariable(name) {
  const value = process.env[name];

  if (typeof value === 'undefined') {
    throw Error(`Cannot read variable ${name} from process.env`);
  }

  return value;
}
