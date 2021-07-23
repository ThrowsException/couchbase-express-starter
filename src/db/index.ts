import { connect, Cluster } from "couchbase";

let cluster: Cluster;
connect("couchbase://localhost", {
  username: "admin",
  password: "password",
}).then((cbCluster) => (cluster = cbCluster));

export const get = async <T>(key: string): Promise<T> => {
  return cluster
    .bucket("data")
    .defaultCollection()
    .get(key)
    .then((item) => item.content as T);
};
