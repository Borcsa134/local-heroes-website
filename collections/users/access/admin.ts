import type { Access } from 'payload';

const admin: Access = ({ req: { user } }) => {
  return user?.role === 'admin' ? true : false;
};

export default admin;
