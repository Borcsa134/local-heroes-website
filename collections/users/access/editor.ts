import type { Access } from 'payload';

const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (user.role === 'admin') {
      return true;
    }
    return { id: { equals: user.id } };
  }

  return false;
};

export default editor;
