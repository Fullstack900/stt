// hooks/useLogPersonDetails.ts
import { useEffect } from "react";
import { useLogContext } from "@/context/LogContext"; // Adjust the import path if necessary

export default function useLogPersonDetails(
  personData: any,
  currentTime: string,
) {
  const { enableLogs } = useLogContext(); // Get enableLogs from context

  useEffect(() => {
    if (enableLogs && personData) {
      console.log(
        `Person Details: ${JSON.stringify(personData)}, Current Time: ${currentTime}`,
      );
    }
  }, [personData, enableLogs, currentTime]); // Only re-run when personData or enableLogs changes
}
