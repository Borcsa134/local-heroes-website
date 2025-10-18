import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

interface Props {
  session: Session | null;
}

export default function LoginButton(props: Props) {
  const { session } = props;

  return (
    <button
      className="text-primary cursor-pointer hover:opacity-80 text-sm md:text-base"
      onClick={() => (!session?.user ? signIn('discord', { redirectTo: '/profile' }) : signOut({ redirectTo: '/' }))}
    >
      {!session?.user ? 'Bejelentkezés' : 'Kijelentkezés'}
    </button>
  );
}
