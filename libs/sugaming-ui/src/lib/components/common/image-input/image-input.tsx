'use client';

import { ChangeEvent, useState } from 'react';
import { FaFileCirclePlus, FaImage } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import { Card } from '../server';

type Image = {
  file: File;
};

type ImageInputProps = {
  onChange: (images: Image[]) => void;
};

export function ImageInput({ onChange }: ImageInputProps) {
  const [images, setImages] = useState<Image[]>([]);

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newFiles = files.filter(
      (file) =>
        !images.find(
          (image) =>
            image.file.name === file.name &&
            image.file.lastModified === file.lastModified,
        ),
    );
    const newImages = newFiles.map((file) => ({
      file,
    }));
    onChange([...images, ...newImages]);
    setImages([...images, ...newImages]);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    draggedImage: Image,
  ) => {
    e.dataTransfer.setData('text/plain', draggedImage.file.name);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    droppedImage: Image,
  ) => {
    e.preventDefault();
    const draggedImageName = e.dataTransfer.getData('text/plain');
    setImages((prevState) => {
      const draggedImage = prevState.find(
        (image) => image.file.name === draggedImageName,
      );
      const droppedImageIndex = prevState.findIndex(
        (image) => image.file.name === droppedImage.file.name,
      );
      const newImages = prevState.filter(
        (image) => image.file.name !== draggedImageName,
      );

      if (draggedImage) {
        newImages.splice(droppedImageIndex, 0, draggedImage);
      }
      return newImages;
    });
  };

  return (
    <div
      className="grid grid-cols-3 gap-4 lg:grid-cols-5"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
    >
      <Card className="relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary">
        <FaFileCirclePlus size={24} />
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg, image/webp"
          multiple
          className="absolute inset-0 cursor-pointer opacity-0"
          name="images"
          onChange={addImages}
        />
      </Card>
      {images && (
        <>
          {Array.from(images).map((image) => (
            <Card
              key={image.file.name}
              className="relative flex aspect-square w-full cursor-move items-center justify-center rounded-lg border border-stroke bg-primary transition-colors hover:border-stroke-secondary hover:bg-stroke"
              draggable
              onDragStart={(e) => handleDragStart(e, image)}
              onDrop={(e) => handleDrop(e, image)}
            >
              <img
                draggable={false}
                src={URL.createObjectURL(image.file)}
                alt={image.file.name}
                className="absolute inset-0 h-full w-full rounded-lg object-cover"
              />
              <button
                onClick={() => {
                  setImages((prevState) =>
                    prevState
                      .filter(
                        (img) =>
                          img.file.name !== image.file.name &&
                          image.file.lastModified !== img.file.lastModified,
                      )
                      .map((img, index) => ({
                        ...img,
                        order: index + 1,
                      })),
                  );
                  onChange(images);
                }}
                type="button"
                className="absolute bottom-1 right-1 rounded-full border border-stroke bg-primary-foreground p-1 transition-colors hover:border-stroke-secondary"
              >
                <FaTrashAlt
                  size={16}
                  className="text-text-secondary transition-colors hover:text-blue"
                />
              </button>
            </Card>
          ))}

          {/*  fill the rest if no images */}
          {images.length < 4 &&
            Array.from(Array(4 - images.length).keys()).map((index) => (
              <Card
                key={index}
                className="relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary"
              >
                <FaImage size={24} />
                <input
                  type="file"
                  accept="image/jpeg, image/png, image/jpg, image/webp"
                  multiple
                  className="absolute inset-0 cursor-pointer opacity-0"
                  name="images"
                  onChange={addImages}
                />
              </Card>
            ))}
          {images.length !== 5 && (
            <Card className="relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary lg:hidden">
              <FaImage size={24} />
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/webp"
                multiple
                className="absolute inset-0 cursor-pointer opacity-0"
                name="images"
                onChange={addImages}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}
