import Iota from "./iota";
var nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
export default class Verify {
  static initial = (msg, sig, pk) => {
    try {
      return nacl.sign.detached.verify(dUTF(msg), d64(sig), d64(pk));
    } catch (e) {
      Error("Verifying inital claim threw an error");
      return e;
    }
  };
  static claim = async (msg, sig, issuerID) => {
    var issuer = await Iota.getBundles(issuerID, "I");
    return nacl.sign.detached.verify(dUTF(msg), d64(sig), d64(issuer.pk));
  };
}

const d64 = data => {
  return nacl.util.decodeBase64(data);
};

const e64 = data => {
  return nacl.util.encodeBase64(data);
};

const dUTF = data => {
  return nacl.util.decodeUTF8(data);
};

const eUTF = data => {
  return nacl.util.encodeUTF8(data);
};