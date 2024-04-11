import database from './envs/database.config';
import jwtConfig from './envs/jwt.config';
// import uploadConfig from './envs/upload.config';
// import awsConfig from './envs/aws.config';

export const configuration = async (): Promise<any> => {
  return {
    db: database(),
    jwt: jwtConfig(),
    // upload: uploadConfig(),
    // aws: awsConfig(),
  };
};
