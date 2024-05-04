import { auth } from "@/auth";
import { CardWithForm } from "@/components/CardWithForm";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className=" bg-orange-100 drop-shadow-lg shadow-xl min-h-[120vh]">
      <section className="flex flex-col justify-center py-10">
        <h1 className="text-5xl text-center text-black p-4 rounded-sm font-bold text-shadow">
          Diwata Pet Overload
        </h1>
      </section>
      <section className="flex flex-row gap-10 flex-wrap justify-center">
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
        <CardWithForm />
      </section>
    </div>
  );
}
