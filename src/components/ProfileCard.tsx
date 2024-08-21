import React from "react";
import classNames from "classnames";
import { Company } from "@/utils/common/company";

interface ProfileCardProps {
  name: string;
  title: string;
  profilePictureUrl?: string; // URL for profile picture
  backgroundImageUrl?: string; // URL for background image
  followers: number;
  following: number;
  companies?: Company[];
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  profilePictureUrl = "blank-profile.webp", // Default profile picture
  backgroundImageUrl,
  followers,
  following,
  companies,
}) => {
  return (
    <div
      className={classNames(
        "relative",
        "bg-white border border-gray-300",
        "p-4 rounded-lg shadow-md",
        "w-[415px]",
        "min-h-[335px]",
      )}
    >
      {/* Background Image */}
      {backgroundImageUrl && (
        <div
          className={classNames("absolute top-0 left-0 w-full h-full")}
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3, // Add some opacity for better contrast
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Three Dots */}
      <div className={classNames("absolute top-8 right-5", "flex gap-1")}>
        <div className={classNames("w-1 h-1 rounded-full bg-gray-400")} />
        <div className={classNames("w-1 h-1 rounded-full bg-gray-400")} />
        <div className={classNames("w-1 h-1 rounded-full bg-gray-400")} />
      </div>

      {/* Card Content */}
      <div
        className={classNames(
          "relative z-10",
          "flex flex-col items-center justify-center h-full",
        )}
      >
        {/* Profile Picture */}
        <img
          src={profilePictureUrl}
          alt="Profile Image"
          className={classNames("w-24 h-24 rounded-full object-cover")}
        />
        {/* Name and Title */}
        <h2 className={classNames("text-xl font-semibold mt-2")}>{name}</h2>
        <p className={classNames("text-gray-600")}>{title}</p>

        {/* Followers and Following */}
        <div className={classNames("text-gray-600 mt-2")}>
          <p>Followers: {followers}</p>
          <p>Following: {following}</p>
          {companies && companies.length > 0 && (
            <div className={classNames("mt-2")}>
              <p>Companies:</p>
              <ul className="list-disc list-inside ml-4">
                {companies.map((company) => (
                  <li key={company.id}>{company.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className={classNames("flex gap-2 mt-4")}>
          <button
            className={classNames(
              "px-4 py-2 bg-blue-500 text-white rounded-lg",
            )}
          >
            Add Friend
          </button>
          <button
            className={classNames(
              "px-4 py-2 bg-white text-black border border-gray-300 rounded-lg",
            )}
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};
