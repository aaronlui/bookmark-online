export default () => {
  const { env } = process;
  return {
    jwt: {
      secret: env.JWT_SECRET,
      expiresIn: env.JWT_EXPIRESIN,
      publicKey: env.JWT_PUBLICKEY,
    },
    database: {
      host: env.DATABASE_HOST,
      port: parseInt(env.DATABASE_PORT, 10) || 3306,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
    },
  };
};
