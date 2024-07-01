import { Link, MetaFunction, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "~/components/Input";
import { registerAccount } from "~/lib/api/auth";
import { RegisterInput } from "~/types/auth";

import { DefaultResponseData } from "~/types/shared";

export const meta: MetaFunction = () => {
  return [{ title: "Register - My Todoist App" }];
};

type RegisterResponse = DefaultResponseData<any>;

export default function RegisterPage() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <section className="bg-white container mx-auto shadow-lg max-w-lg w-full min-h-[200px] rounded-xl p-5">
        <h1 className="font-bold text-2xl">Pendaftaran Akun</h1>

        <form
          onSubmit={handleSubmit(async (form) => {
            setIsLoading(true);

            const res = (await registerAccount({
              body: form as RegisterInput,
            })) as RegisterResponse;

            if (res.errorMessage) {
              setError(res.errorMessage);
              setIsLoading(false);
              return;
            }

            toast("Pendaftaran akun berhasil", { type: "success" });
            navigate("/login");
          })}
          className="mt-5 flex flex-col gap-4"
        >
          <Input
            label="Username"
            placeholder="Masukan username"
            required
            {...register("username", { required: true })}
          />

          <Input
            label="Email"
            placeholder="Masukan email"
            required
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukan password"
            required
            {...register("password")}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={!formState.isValid || !formState.isDirty}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Daftar
          </button>
        </form>

        <Link
          className="flex justify-end text-sm mt-4 text-blue-500 hover:underline cursor-pointer"
          to="/login"
        >
          Sudah punya akun? login disini
        </Link>
      </section>
    </>
  );
}
