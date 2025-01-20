export default () => ({
  port: Number(process.env.APP_PORT),
  database: {
    url: process.env.DB_CONNECTION_STRING,
  },
});
