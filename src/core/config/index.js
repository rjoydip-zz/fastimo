class Config {
    constructor() {
        Object.assign(this, {
            "port": 8080,
            "host": "127.0.0.1",
            "bodyLimit": "100kb",
            "corsHeaders": ["Link"]
        });
    }
}

module.exports = Config;