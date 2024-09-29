import { getUser } from "@/features/user/actions";
import { UserAvatarForm } from "@/features/user/forms/AvatarForm";
import { UserUpdateForm } from "@/features/user/forms/UpdateForm";
import { User } from "@/features/user/type";
import { getDateTimeFullStyle } from "@/lib/tempo/actions";

export default async function Page() {

  const user:User = await getUser();

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is Setting page.tsx</h1>
        {(user)
          ? (
            <div className="max-w-md mx-auto">
              <UserAvatarForm user={user} />
              <UserUpdateForm user={user} />
              <div className="mt-10 p-4 rounded-2xl border-2 border-base-content/30 text-base-content/70">
                <h2 className="text-xl text-center">その他の情報</h2>
                <table className="table table-xs">
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{ user.id }</td>
                    </tr>
                    <tr>
                      <td>最終ログイン</td>
                      <td>{ getDateTimeFullStyle(user.last_login) }</td>
                    </tr>
                    <tr>
                      <td>作成日時</td>
                      <td>{ getDateTimeFullStyle(user.created_at) }</td>
                    </tr>
                    <tr>
                      <td>更新日時</td>
                      <td>{ getDateTimeFullStyle(user.updated_at) }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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