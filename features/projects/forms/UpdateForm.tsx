"use client";

import { ProjectDetail } from "../type";
import { updateProject } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectSchemaType } from "../schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useActionHandler } from "@/hooks/useActionHandler";
import { LoadingDots } from "@/components/common/LoadingDots";

export function ProjectUpdateForm(
  {projectDetail}:{projectDetail:ProjectDetail}
) {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(projectSchema),
  });
  const router = useRouter();

  const { handleAction, isSubmitting } = useActionHandler({
    action: updateProject,
    onSuccess: () => {
      router.refresh();
    },
    onSuccessMessage: 'Update project success',
  });

  return (
    <>
      { isSubmitting && <LoadingDots /> }
      <form
        onSubmit={handleSubmit((inputValues) => handleAction(inputValues, projectDetail.id))}
        className="flex flex-col"
      >
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
        <button className="btn btn-primary mt-4">更新</button>
      </form>
    </>
  )
}