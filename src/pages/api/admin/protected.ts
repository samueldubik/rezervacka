import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || !session.user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Handle your protected logic here
  res.status(200).json({ message: 'This is a protected admin route' });
};

export default handler;
