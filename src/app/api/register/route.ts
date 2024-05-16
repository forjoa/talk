import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongoDB } from '@/lib/db';
import User from '@/models/userModel';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToMongoDB();

    try {
      const data = await req.body;
      const username = data.username;
      const fullname = data.fullname;
      const password = data.password;

      // verify if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // create a new user and save it
      const newUser = new User({ username, fullname, password });
      await newUser.save();

      res.status(201).json({ message: 'User successfully created' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error while inserting user' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}