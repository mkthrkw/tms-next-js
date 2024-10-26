'use client';

import { createProject } from "../actions";
import { CommonModal } from "@/components/modals/CommonModal";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectSchemaType } from "../schema";
import { AsideButton } from "@/components/buttons/AsideButton";
import { useActionHandler } from "@/hooks/useActionHandler";

export function ProjectCreateForm() {

  const {
    register,
    handleSubmit,
    reset,
    formState:{ errors },
  } = useForm<ProjectSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(projectSchema),
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { handleAction, isSubmitting } = useActionHandler({
    action: createProject,
    onSuccess: () => {
      dialog.current?.close();
      reset();
      router.refresh();
    },
    onSuccessMessage: 'Create project success',
  });

  const text = "プロジェクト名と説明を入力してください。";
  
  return (
    <>
      <AsideButton onClick={ () => dialog.current?.showModal() }>
        +プロジェクト作成
      </AsideButton>
      <CommonModal
        dialog={dialog}
        title="プロジェクト作成"
        text={text}
        isSubmitting={isSubmitting}
      >
        <form
          onSubmit={handleSubmit((inputValues) => handleAction(inputValues))}
          className="flex flex-col"
        >
          <input
            {...register("name")}
            type="text"
            className="input input-bordered"
            placeholder="プロジェクト名"
          />
          {errors.name && <p className="text-error mt-1">{errors.name.message}</p>}
          <textarea
            {...register("description")}
            className="textarea h-24 textarea-bordered mt-4"
            placeholder="プロジェクトの説明"
          ></textarea>
          {errors.description && <p className="text-error mt-1">{errors.description.message}</p>}
          <button className="btn btn-primary mt-4">作成</button>
        </form>
      </CommonModal>
    </>
  )
}