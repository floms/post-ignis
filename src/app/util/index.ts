import * as R from 'ramda';


export const merge = (a: any) => R.mergeDeepRight(a);


export const get = (obj: any) => (path: string, def: any = undefined) => R.pathOr(def, path.split('.'), obj);