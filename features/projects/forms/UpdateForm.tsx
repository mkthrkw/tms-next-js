"use client";

import { ActionState, ProjectDetail } from "../type";
import { updateProject } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectSchemaType } from "../schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function ProjectUpdateForm(
  {projectDetail}:{projectDetail:ProjectDetail}
) {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProjectSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(projectSchema),
  });
  const router = useRouter();

  const onSubmit = async (inputValues: ProjectSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateProject(initialState, projectDetail.id, inputValues);
    if(result.state === 'resolved') {
      toast.success('Update project success');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message,{autoClose: 3000});
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="label">プロジェクト名</label>
      <input
        {...register('name',{value:projectDetail.name})}
        className="input input-bordered"
      />
      {errors.name && <p className="text-error text-xs mt-1">{errors.name.message}</p>}
      <label className="label mt-4">プロジェクトの説明</label>
      <textarea
        {...register('description',{value:projectDetail.description})}
        className="textarea h-24 textarea-bordered mb-4"
      />
      {errors.description && <p className="text-error text-xs mt-1">{errors.description.message}</p>}
      <button className="btn btn-primary mt-4" disabled={isSubmitting}>更新</button>
    </form>
  )
}