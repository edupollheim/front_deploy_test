"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import casal from "../images/casal.webp";
import Divider from "@/app/components/divider";

interface ImageData {
  id: number;
  base64: string;
}

export default function SobreNos() {
    const [images, setImages] = useState<ImageData[]>([]);

    // Função para buscar as imagens da API
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/photos");
          console.log(response.data); // Confirma se os dados estão corretos
          setImages(response.data);
        } catch (error) {
          console.error("Erro ao buscar imagens:", error);
        }
      };

      fetchImages();
    }, []);

    return (
      <div className="flex flex-col">
        {/* Seção dos Noivos */}
        <section className="flex flex-col items-center justify-center min-h-screen mt-[-5.5rem] p-4 md:p-8 -z-10">
          <h1
            className="text-3xl md:text-4xl font-semibold mb-6 text-[#b6b187]"
            style={{ fontFamily: "Italiana" }}
          >
            Os Noivos
          </h1>
          <div className="w-full px-4 md:px-8 mt-10">
            <div className="p-4 rounded-lg">
              <p
                className="text-center text-lg text-[#b6b187]"
                style={{ fontFamily: "Italiana" }}
              >
                “Foi o Senhor que fez isto, e é maravilhoso aos nossos olhos” <br />
                Salmos 118:23
              </p>
            </div>
          </div>

          {/* Seção de Fotos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {images.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={`data:image/jpeg;base64,${image.base64}`}
                  alt={`Foto ${image.id}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </section>
    </div>
    );
  }
