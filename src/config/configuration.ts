export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    postgres: process.env.POSTGRES_URL,
  },
});
