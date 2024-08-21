import { MainLayout } from "@/layouts/MainLayout";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const Home: NextPage = () => {
  return <MainLayout />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
