import { getUser } from "@/features/user/actions";

export default async function Page() {

  const user = await getUser();

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is Setting page.tsx</h1>
        {(user)
          ? (
            <div className="max-w-md mx-auto">
              <table className="table">
                <tbody>
                  {Object.keys(user).map((key) => {
                    return (
                      <tr>
                        <th>{key}</th>
                        <td>{user[key]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
          : (
            <div className="flex">
              <p>{'user is not found'}</p>
            </div>
          )
        }
      </div>
    </>
  );
}