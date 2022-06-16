import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div
          className="flex flex-col mt-24  items-center justify-center w-full"
          key={provider.name}
        >
          <div className="relative w-96 h-48">
            <Image
              src="https://www.vectorlogo.zone/logos/instagram/instagram-ar21.svg"
              layout="fill"
              alt=""
            />
          </div>

          <div className="text-xl break-words my-4 text-center">
            This is not a REAL app,it is a built for educational purposes only
          </div>
          <button
            className="p-4 w-52 mt-28 text-white bg-blue-500 rounded-2xl"
            onClick={() => signIn(provider.id ,{callbackUrl: '/'})}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
