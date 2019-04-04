module.exports = {
    message: {
        log: require("./message/log.js"),
        update: require("./message/update.js"),
        delete: require("./message/delete.js"),
        point: require("./message/point.js"),
        check: require("./message/check.js"),
    },
    ready: {
        index: require("./ready/index.js"),
    },
    guild: {
        member: {
            add: require("./guild/member/add.js"),
            remove: require("./guild/member/remove.js"),
        },
    },
    connect: {
        disconnect: require("./connect/disconnect.js"),
        reconnecting: require("./connect/reconnecting.js"),
    },
    debug: {
        index: require("./debug/index.js"),
    },
    error: {
        index: require("./error/index.js"),
    },
    warn: {
        index: require("./warn/index.js"),
    },
};
