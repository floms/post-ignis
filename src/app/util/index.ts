import * as R from 'ramda';


export const merge = (a: any) => R.mergeDeepRight(a);


export const get = (obj: any) => (path: string, def: any = undefined) => R.pathOr(def, path.split('.'), obj);

export const env = (raw: any) => {
  try {
    return JSON.parse(raw);
  } catch (error) {
    const result = {};
    const lines = `${raw}`.split('\n');
    for (const line of lines) {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      if (match) {
        const [_, key, value] = match;
        result[key.trim()] = value.trim();
      }
    }
    return result;
  }
};
