'use client';

import { createProject } from "../actions";
import CommonModal from "@/components/modals/CommonModal";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ActionState } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectSchemaType } from "../schema";

export default function ProjectCreateForm() {

  const {
    register,
    handleSubmit,
    formState:{ isSubmitting, errors },
  } = useForm<ProjectSchemaType>({
      mode: 'onBlur',
      resolver: zodResolver(projectSchema),
  });
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);

  const onSubmit = async (inputValues: ProjectSchemaType) => {
    const initialState:ActionState = {
      state: 'pending',
      message: '',
    }
    const result =  await createProject(initialState, inputValues);
    if(result.state === 'resolved') {
      toast.success('Create project success');
      router.refresh();
      dialog.current?.close();
    }
    if (result.state === 'rejected') {
      toast.error(result.message);
    }
  }

  const text = "プロジェクト名と説明を入力してください。";
  
  return (
    <>
      <button className="btn btn-outline" onClick={ () => dialog.current?.showModal() }>
        +プロジェクト作成
      </button>
      <CommonModal
        dialog={dialog}
        title="プロジェクト作成"
        text={text}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
          <button className="btn btn-primary mt-4" disabled={isSubmitting}>作成</button>
        </form>
      </CommonModal>
    </>
  )
}