import { login, redirectToNextPath } from "../actions";
import { toast } from "react-toastify";
import { AuthSchemaType } from "../schema";
import { ActionState } from "../type";


export const useOnSubmit = () => {

  const onSubmit = async (data: AuthSchemaType) => {
    const initialState: ActionState = {
      state: 'pending',
      message: '',
    };
    const result = await login(initialState, data);
    if(result.state === 'resolved') {
      toast.success('Login success');
      redirectToNextPath();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }

  return { onSubmit };
}