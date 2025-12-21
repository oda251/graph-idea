import React from "react";
import { useForm } from "react-hook-form";

export type IdeaFormValues = {
  title: string;
  description: string;
};

export const IdeaForm: React.FC<{
  onSubmit?: (v: IdeaFormValues) => void;
}> = ({ onSubmit }) => {
  const { register, handleSubmit, formState } = useForm<IdeaFormValues>({
    defaultValues: { title: "", description: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((v) => onSubmit?.(v))}
      className="p-4 flex flex-col gap-2"
    >
      <label className="text-sm">Title</label>
      <input
        {...register("title", { required: true })}
        className="border p-2 rounded"
      />

      <label className="text-sm">Description</label>
      <textarea
        {...register("description")}
        className="border p-2 rounded"
        rows={4}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          className="px-3 py-1 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
