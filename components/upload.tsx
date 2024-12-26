import { Button } from "@nextui-org/button";
import React, { useState } from "react";

const UploadImage: React.FC<{
  castMessage: (message: string) => void;
}> = ({ castMessage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`File uploaded successfully: ${result.path}`);
        castMessage("File uploaded successfully");
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Upload failed: ${(error as Error).message}`);
    }
  };

  return (
    <div className="p-4 border-1 border-gray-800 dark:border-gray-100 rounded-lg w-full">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
          htmlFor="file_input">
          Upload image
        </label>
        <input
          className="block mb-8 w-fit text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          type="file"
        />

        <Button
          className="w-fit"
          type="submit"
          variant="shadow"
          color="default">
          Submit
        </Button>
      </form>
      {message && (
        <p
          className={
            message.includes("File uploaded successfully")
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadImage;
