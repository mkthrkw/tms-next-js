import { getUser } from "@/features/user/actions";
import { UserAvatarForm } from "@/features/user/forms/AvatarForm";
import { UserUpdateForm } from "@/features/user/forms/UpdateForm";

export default async function Page() {

  const user = await getUser();

  function dateToDisplayString(date: Date){
    return new Date(date).toLocaleString("ja-JP",{
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24時間表記
    });
  }

  return (
    <>
      <div className="p-8 w-full h-full">
        <h1 className="text-4xl text-center mb-10">This is Setting page.tsx</h1>
        {(user)
          ? (
            <div className="max-w-md mx-auto">
              <UserAvatarForm user={user} />
              <UserUpdateForm user={user} />
              <div className="mt-10 p-4 rounded-2xl border-4 border-base-content/30">
                <h2 className="text-xl text-center">その他の情報</h2>
                <label className="label">ID</label>
                <div className="mb-4">{ user.id }</div>
                <label className="label">最終ログイン</label>
                <div className="mb-4">{ dateToDisplayString(user.last_login) }</div>
                <label className="label">作成日時</label>
                <div className="mb-4">{ dateToDisplayString(user.created_at) }</div>
                <label className="label">更新日時</label>
                <div className="mb-4">{ dateToDisplayString(user.updated_at) }</div>
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