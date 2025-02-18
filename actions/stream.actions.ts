'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error('User is not logged in');
  if (!apiKey) throw new Error('API key is not set');
  if (!apiSecret) throw new Error('API secret is not set');

  const client = new StreamClient(apiKey, apiSecret);

  // const vailidity = Math.round(new Date().getTime() / 1000) + 60 * 60;

  // const issued = Math.floor(Date.now() / 1000) + 60 * 60;

  // Calculate the current time in seconds
  const now = Math.floor(Date.now() / 1000);

  // Set the token to expire in 1 hour (3600 seconds)
  const exp = now + 3600;

  //   const payload = { user_id: user.id, issued, vailidity };
  //   const token = client.generateUserToken(payload);
  const token = client.createToken(user.id, exp, now);

  return token;
};
