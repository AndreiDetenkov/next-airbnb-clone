'use client'

import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { FC, useCallback } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

export const ImageUpload: FC<ImageUploadProps> = ({ value, onChange }): JSX.Element => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )
  return (
    <CldUploadWidget onUpload={handleUpload} uploadPreset="ncfbxvmy" options={{ maxFiles: 1 }}>
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="hover:opacity-70tra relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-200 p-20 text-neutral-400 transition"
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to upload</div>
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image src={value} alt="Upload" style={{ objectFit: 'cover' }} fill />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}
