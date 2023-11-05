export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jitsiSecret: process.env.JWT_SECRET_KEY,
  agentSecret: process.env.JWT_AGENT_SECRET,
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME
  },
  jwt: {
    iss: process.env.JWT_ISS,
    aud: process.env.JWT_AUD,
    sub: process.env.JWT_SUB,
    exp: process.env.JWT_EXPIRE_DAYS,
    room: '*'
  },
  infura: {
    apiKey: process.env.INFURA_API_KEY,
    apiSecret: process.env.INFURA_API_SECRET
  },
  relayz: {
    appName: process.env.APP_NAME,
    videoPath: process.env.RELAYZ_VIDEO_PATH,
    // TODO clarify and improve
    roomAllowed: true
  }
});
