import { Link, MetaFunction } from "@remix-run/react";
import { useForm } from "react-hook-form";

import Input from "~/components/Input";

export const meta: MetaFunction = () => {
  return [{ title: "Sign Up - My Todoist App" }];
};

export default function SignUpPage() {
  const { register, handleSubmit, formState } = useForm();

  return (
    <main className="bg-blue-50 h-full min-h-screen py-10">
      <section className="bg-white container mx-auto shadow-lg max-w-lg w-full min-h-[200px] rounded-xl p-5">
        <h1 className="font-bold text-2xl">Pendaftaran Akun</h1>

        <form
          onSubmit={handleSubmit((form) => {
            console.log(form);
          })}
          className="mt-5 flex flex-col gap-4"
        >
          <Input
            label="Nama"
            placeholder="Masukan nama"
            {...register("nama", { required: true })}
          />

          <Input
            label="Email"
            placeholder="Masukan email"
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukan password"
            {...register("password")}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Masukan confirm password"
            {...register("confirmRegister")}
          />

          <button
            type="submit"
            disabled={!formState.isValid || !formState.isDirty}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Daftar
          </button>
        </form>

        <Link
          className="flex justify-end text-sm mt-4 text-blue-500 hover:underline"
          to="/signin"
        >
          Sudah punya akun? login disini
        </Link>
      </section>
    </main>
  );
}
