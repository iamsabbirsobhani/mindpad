import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function Note() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      {(await isAuthenticated()) ? (
        <div>
          <h1>Authenticated Page</h1>
          <h2>{user.given_name}</h2>
          <p>{user.email}</p>
          <LogoutLink>Log out</LogoutLink>
        </div>
      ) : (
        <p>Please sign in or register!</p>
      )}
    </>
  );
}
