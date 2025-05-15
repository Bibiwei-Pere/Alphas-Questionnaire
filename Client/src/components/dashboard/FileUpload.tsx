"use client";
import { ArrowUpFromLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";

export const AvatarUpload = ({ avatar, setAvatar }: any) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) setAvatar(event.target.files[0]);
  };

  return (
    <div className='w-full flex gap-[25px] h-full justify-between mt-3'>
      <div className='flex flex-col gap-2'>
        <p className='text-black'>Profile picture</p>

        <div className='flex gap-4'>
          <div className='custom-input relative flex max-w-[200px] p-4 rounded-md bg-white text-black border border-gray-200 shadow-sm hover:bg-blue-900 hover:border-blue-900 hover:text-white'>
            <ArrowUpFromLineIcon className='w-4 mr-2' />

            {avatar ? "Change Image" : "Upload Image"}
            <input
              id='file-upload'
              name='file-upload'
              type='file'
              className='absolute inset-0 w-full h-full border-4 opacity-0 z-50'
              accept='image/png, image/jpeg, image/gif'
              onChange={handleFileChange}
            />
          </div>
          {avatar && (
            <Button variant={"outline"} type='button' className='text-red-700 w-auto' onClick={() => setAvatar(null)}>
              Remove
            </Button>
          )}
        </div>
        <Label className='text-gray-500'>Up to 10MB, at least 500x500px</Label>
      </div>
    </div>
  );
};
