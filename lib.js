"use strict";

let SVCNAME = "com.roonlabs.image:1";

function RoonApiImage(core) {
    this.core = core;
}

RoonApiImage.services = [ { name: SVCNAME } ];

RoonApiImage.prototype.get_image = function() {
    var i = 0;
    let image_key = arguments[i++];
    let opts = {};
    if (typeof(arguments[i]) != "function") opts = arguments[i++];
    let cb  = arguments[i++];
    opts = Object.assign({ image_key: image_key }, opts);
    this.core.moo.send_request(SVCNAME+"/get_image",
                               opts,
                               (msg, body) => {
                                   if (msg && msg.name == "Success") cb(false, msg.content_type, body);
                                   else cb(msg ? msg.name : "NetworkError");
                               });
};

exports = module.exports = RoonApiImage;
