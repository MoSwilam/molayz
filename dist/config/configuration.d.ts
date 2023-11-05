declare const _default: () => {
    port: number;
    jitsiSecret: string;
    agentSecret: string;
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        dbName: string;
    };
    jwt: {
        iss: string;
        aud: string;
        sub: string;
        exp: string;
        room: string;
    };
    infura: {
        apiKey: string;
        apiSecret: string;
    };
    relayz: {
        appName: string;
        videoPath: string;
        roomAllowed: boolean;
    };
};
export default _default;
