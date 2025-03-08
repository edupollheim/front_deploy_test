"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ImageData {
  id: number;
  base64: string;
}

interface CarouselProps {
  images: ImageData[];
  currentIndex: number;
  onClose: () => void;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Carousel: React.FC<CarouselProps> = ({ images, currentIndex, setCurrentIndex }) => {
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrevious]);

  return (
    <div className="absolute inset-0 transition-opacity duration-900 ease-in-out animate-fadeIn">
      <Image
        src={`data:image/jpeg;base64,${images[currentIndex].base64}`}
        alt={`Foto ${images[currentIndex].id}`}
        layout="fill"
        className="object-contain"
        quality={100}
        priority
      />
      <ArrowLongLeftIcon onClick={handlePrevious} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow w-12 h-12 text-black cursor-pointer"/>
      <ArrowLongRightIcon onClick={handleNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow w-12 h-12 text-black cursor-pointer"/>
    </div>
  );
};

export default function SobreNos() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Estado de loading

  // Função para buscar as imagens da API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true); // Ativa o loading antes da requisição
        const response = await axios.get("http://localhost:3001/api/photos");
        setImages(response.data);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      } finally {
        setLoading(false); // Desativa o loading após a requisição
      }
    };

    fetchImages();
  }, []);

  const handleOpen = (image: ImageData) => {
    setSelectedImage(image);
    setCurrentIndex(images.findIndex(img => img.id === image.id));
  }

  const handleClose = () => {
    setSelectedImage(null);
  }

  return (
    <div className="flex flex-col">
      {/* Seção dos Noivos */}
      <section className="flex flex-col items-center justify-center min-h-screen md:p-8 z-10 bg-[#fffaf6]">
        <h1
          className="text-[4rem] lg:text-[6rem] text-[#d6b293] letter"
          style={{ fontFamily: "Luxurious Script" }}
        >
          Os Noivos
        </h1>
        <div className="w-full px-4 md:px-8">
          <div className="p-4 rounded-lg">
            <p
              className="text-center text-[#637c8b] lg:text-xl font-thin"
              style={{ fontFamily: "Inter" }}
            >
              “Foi o Senhor que fez isto, e é maravilhoso aos nossos olhos” <br />
              Salmos 118:23
            </p>
          </div>
        </div>

        {/* Seção de Fotos */}
        {loading ? (
          // Spinner de carregamento
          <div className="flex justify-center items-center mt-10">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#b6b187] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {images.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg shadow-md hover:transform hover:scale-105 transition-transform">
                <Image
                  src={`data:image/jpeg;base64,${image.base64}`}
                  alt={`Foto ${image.id}`}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => handleOpen(image)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      
      <Dialog open={!!selectedImage} onOpenChange={handleClose}>
        <DialogContent className="p-0 max-w-[80vw] h-[80vh] flex items-center justify-center">
          <DialogTitle></DialogTitle>
          {selectedImage && (
            <Carousel 
              images={images} 
              currentIndex={currentIndex} 
              onClose={handleClose} 
              setCurrentIndex={setCurrentIndex}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
