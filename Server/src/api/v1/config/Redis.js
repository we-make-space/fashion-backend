import { createClient} from "redis"

const client = createClient({
    username: 'default',
    password: 'p9E1Dkf416M3RsQdIClbPj4Rwt8AE8nP',
    socket: {
        host: 'redis-19759.c62.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 19759
    }
});
client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));



export const redisClient = client;