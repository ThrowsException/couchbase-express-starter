import {
  connect as cbConnect,
  Cluster,
  ConnectOptions,
  GetOptions,
  InsertOptions,
  MutationResult,
  CouchbaseError,
  KeyValueErrorContext,
} from "couchbase";

let cluster: Cluster;
export const connect = async (connStr: string, opts: ConnectOptions) => {
  cluster
    ? cluster
    : (
        await cbConnect(connStr, opts).then(
          (cbCluster) => (cluster = cbCluster)
        )
      ).bucket("data");
};

export const get = async <T>(key: string, opts?: GetOptions): Promise<T> => {
  console.log(cluster);
  return cluster
    .bucket("data")
    .defaultCollection()
    .get(key, opts)
    .then((result) => result.content as T)
    .catch((e) => {
      if (e instanceof CouchbaseError) {
        if ((e.context as KeyValueErrorContext).status_code === 1) {
          return null as unknown as T;
        }
      }
      return Promise.reject(e);
    });
};

export const insert = async <T>(key: string, item: T, opts?: InsertOptions) => {
  return cluster
    .bucket("data")
    .defaultCollection()
    .insert(key, item, opts)
    .then((result) => ({
      ...item,
      result: {
        cas: result.cas,
        token: result.token,
      } as MutationResult,
    }));
};
