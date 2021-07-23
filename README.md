# Couchbase connections

I wanted to see what calling getBucket and defaultCollection did and if there was any traffic

it doesn't appear there is.

I ran `sudo tcpdump -i lo0 dst port 11210` locally in terminal and then in another terminal did this

```js
let { connect } = require("couchbase");
let c;
connect("couchbase://localhost", {
  username: "admin",
  password: "password",
}).then((c) => (c = cl));

// then run this a bunch of times and watch tcpdump output
c.getBucket().defaultCollection();
```

tcpdump doesn't really show any added traffic until you start doing `.get` or `.insert` commands so it appears they are safe to keep calling. The only other call that sends traffic is the actual connect.
