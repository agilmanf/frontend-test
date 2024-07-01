import { Link, MetaFunction, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Cookies from "es-cookie";

import Input from "~/components/Input";

import { loginAccount } from "~/lib/api/auth";
import { LoginInput } from "~/types/auth";
import { DefaultResponseData } from "~/types/shared";

export const meta: MetaFunction = () => {
  return [{ title: "Login - My Todoist App" }];
};

type LoginResponse = DefaultResponseData<{ token: string }>;

export default function LoginPage() {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <section className="bg-white container mx-auto shadow-lg max-w-lg w-full min-h-[200px] rounded-xl p-5">
        <h1 className="font-bold text-2xl">Login ke Akun</h1>

        <form
          onSubmit={handleSubmit(async (form) => {
            setIsLoading(true);

            const res = (await loginAccount({
              body: form as LoginInput,
            })) as LoginResponse;

            if (res.errorMessage || !res.data.token) {
              setError(res.errorMessage);
              setIsLoading(false);
              return;
            }

            Cookies.set("authorization", `Bearer ${res.data.token}`);
            navigate("/");
          })}
          className="mt-5 flex flex-col gap-4"
        >
          <Input
            label="Username"
            placeholder="Masukan username"
            required
            {...register("username")}
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
            disabled={!formState.isValid || !formState.isDirty || isLoading}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Masuk
          </button>
        </form>

        <Link
          className="flex justify-end text-sm mt-4 text-blue-500 hover:underline"
          to="/register"
        >
          Belum punya akun? daftar disini
        </Link>
      </section>
    </>
  );
}
