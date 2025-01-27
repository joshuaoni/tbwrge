import { useState } from "react";

type HTMLFormElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLButtonElement;
type HTMLFormChangeEvent = React.ChangeEvent<HTMLFormElements>;
type SubmitEvent =
  | React.MouseEvent<HTMLFormElements>
  | React.FormEvent<HTMLFormElement>;
type Key<T> = keyof T;

export function useForm<T>(
  initialState: T,
  onSubmit: (val: T) => Promise<void> | void
) {
  const [formData, setFormData] = useState(initialState);

  function setFormField<K extends Key<T>>(field: K, value: T[K]) {
    setFormData((prevState: any) => {
      const state = { ...prevState };
      state[field] = value;
      return state;
    });
  }

  function handleChange(e: HTMLFormChangeEvent) {
    const target = e.target;
    setFormField(target.name as Key<T>, target.value as T[Key<T>]);
  }

  function resetForm() {
    setFormData(initialState);
  }

  async function handleSubmit(e?: SubmitEvent) {
    e!.preventDefault();

    onSubmit(formData);
  }

  return { formData, setFormField, handleChange, handleSubmit, resetForm };
}
