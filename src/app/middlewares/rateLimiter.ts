import { createClient } from 'redis';
import config from '../config';
import { NextFunction, Request, Response } from 'express';

const redisClient = createClient({
  username: config.redisUser,
  password: config.redisPassword,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
  },
});

class RedisRateLimiterHandler {
  public async connect() {
    await redisClient.connect();
  }

  public rateLimiter() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const ipAddress = req.ip;
      const redisId = `${req.originalUrl}/${ipAddress}`;

      const requests = await redisClient.incr(redisId);
      if (requests === 1) {
        await redisClient.expire(redisId, 60);
      }

      if (requests > 5) {
        return res.status(429).json({
          success: false,
          message: 'ERROR:Too many requests',
        });
      }
      next();
    };
  }
}

export default RedisRateLimiterHandler;
