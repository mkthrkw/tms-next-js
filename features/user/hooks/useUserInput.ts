import { toast } from "react-toastify";
import { updateUser } from "../actions";
import { ActionState, User } from "../type";
import { UserSchemaType } from "../schema";
import { useRouter } from "next/navigation";

export const useUserInput = (user:User) => {
  const router = useRouter();

  const onSubmit = async (inputValues: UserSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateUser(initialState, inputValues);
    if(result.state === 'resolved') {
      toast.success('Update project success');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  return {onSubmit};
}