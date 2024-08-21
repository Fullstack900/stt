// components/MainLayout.tsx
import {
  FunctionComponent,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";
import { Inter } from "next/font/google";
import classNames from "classnames";
import { Button } from "@/components/Button";
import { Person } from "@/utils/common/person";
import Skeleton from "@/components/Skeleton";
import { ProfileCard } from "@/components/ProfileCard";
import useCurrentTime from "@/hooks/useCurrentTime";
import useLogPersonDetails from "@/hooks/useLogPersonDetails"; // Import the custom hook
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [personData, setPersonData] = useState<any>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const currentTime = useCurrentTime(); // Get current time

  useLogPersonDetails(personData, currentTime); // Use the custom hook

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // Redirect to the sign-in page
    } else {
    }
  }, [status]);

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after the component mounts
  }, []);

  const handleButtonClick = async (person: Person) => {
    console.log(`Button clicked: ${person}`);

    setError(null);
    setPersonData(null);

    if (selectedPerson === person) {
      setSelectedPerson(null);
      return;
    }

    setSelectedPerson(person);
    setLoading(true);

    try {
      const response = await fetch(`/api/person?person=${person}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      setPersonData(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/signin" }); // Redirect to sign-in page after logout
  };

  return (
    <main
      className={classNames(
        inter.className,
        "h-screen w-screen",
        "flex flex-col justify-center items-center",
      )}
    >
      {/* Display Current Time only after mount */}
      {isMounted && (
        <div className={classNames("mb-4", "text-lg font-medium")}>
          Current Time: {currentTime}
        </div>
      )}

      {/* Buttons */}
      <div className={classNames("flex gap-2")}>
        {Object.values(Person).map((person) => (
          <Button
            key={person}
            onClick={() => handleButtonClick(person)}
            disabled={loading && selectedPerson !== person}
            selected={selectedPerson == person}
          >
            {person}
          </Button>
        ))}
      </div>

      {/* Other content */}
      <div className={classNames("mt-4")}>
        {loading && <Skeleton />}
        {error && <p className="text-red-500">{error}</p>}
        {personData && (
          <ProfileCard
            name={personData.name}
            title={personData.title}
            profilePictureUrl={personData.profilePictureUrl}
            backgroundImageUrl={personData.backgroundImageUrl}
            followers={personData.followers}
            following={personData.following}
            companies={personData.companies}
          />
        )}
      </div>

      <button
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  );
};
