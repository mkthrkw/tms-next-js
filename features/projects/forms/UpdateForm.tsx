"use client";

import { ActionState, ProjectDetail } from "../type";
import { updateProject } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectSchemaType } from "../schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProjectUpdateForm(
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

  const onSubmit = async (data: ProjectSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result = await updateProject(initialState, projectDetail.id, data);
    if(result.state === 'resolved') {
      toast.success('Update project success');
      router.refresh();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label className="label">プロジェクト名</label>
      <input
        {...register('name',{value:projectDetail.name})}
        className="input input-bordered mb-4"
      >
      </input>
      <label className="label">プロジェクトの説明</label>
      <textarea
        {...register('description',{value:projectDetail.description})}
        className="textarea h-24 textarea-bordered mb-4"
      ></textarea>
      <button className="btn btn-primary">更新</button>
    </form>
  )
}