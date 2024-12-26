"use client";
import UploadImage from "@/components/upload";
import { useEffect, useState } from "react";

/**
 * Page component for the home page.
 *
 * Fetches the list of images from the API and displays them in a grid.
 * Also renders the UploadImage component below the grid.
 *
 * @returns The JSX element for the home page.
 */
export default function Home() {
  const [images, setImages] = useState([]);

  const [reload, setReload] = useState(0);
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const { images } = await res.json();
      setImages(images);
    };

    fetchImages();
  }, [reload]);

  return (
    <section className="flex items-center justify-center gap-4 p-8 md:p-10 flex-1">
      <div className="flex flex-col flex-1 text-left justify-center align-center gap-8">
        <h1 className="text-4xl font-extrabold uppercase">Photo gallery App</h1>
        <div className="flex gap-4 md:flex-row flex-col">
          <UploadImage castMessage={() => setReload(reload + 1)} />
          <div className="p-4 border-1 border-gray-800 dark:border-gray-100 rounded-lg w-fit flex flex-col gap-4">
            <span className="font-bold">
              This is Nextjs app that is using NextUI. Simple photo gallery
              where you upload images and store them inside public/images
              folder.
            </span>
            <span>
              Simply upload image and it will automatically refetch and show it
              on the page.
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
          {images.map((src) => (
            <img
              key={src}
              src={src}
              alt="Photo"
              className="rounded object-cover object-bottom w-[250px] h-[250px] border-1 border-gray-400 dark:border-gray-100 shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
