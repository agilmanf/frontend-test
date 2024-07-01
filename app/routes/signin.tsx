import { Link, MetaFunction } from "@remix-run/react";

import Input from "~/components/Input";

export const meta: MetaFunction = () => {
  return [{ title: "Sign In - My Todoist App" }];
};

export default function SignInPage() {
  return (
    <main className="bg-blue-50 h-full min-h-screen py-10">
      <section className="bg-white container mx-auto shadow-lg max-w-lg w-full min-h-[200px] rounded-xl p-5">
        <h1 className="font-bold text-2xl">Login ke Akun</h1>

        <form className="mt-5 flex flex-col gap-4">
          <Input name="email" label="Email" placeholder="Masukan email" />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="Masukan password"
          />

          <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400">
            Masuk
          </button>
        </form>

        <Link
          className="flex justify-end text-sm mt-4 text-blue-500 hover:underline"
          to="/signup"
        >
          Belum punya akun? daftar disini
        </Link>
      </section>
    </main>
  );
}
