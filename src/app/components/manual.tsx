import React from 'react';
import { CheckBadgeIcon, SpeakerXMarkIcon, NoSymbolIcon, ClockIcon, SparklesIcon, CameraIcon, MusicalNoteIcon, HandRaisedIcon, UsersIcon } from '@heroicons/react/24/solid'; // Importando ícones específicos

const Manual = () => {
  // Título e regras diretamente no componente
  const title = "Manual do bom convidado";
  const rules = [
    { text: 'Confirme sua presença!', icon: <CheckBadgeIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Deixe seu celular no silencioso!', icon: <SpeakerXMarkIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Convidado não convida!', icon: <NoSymbolIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Traje esporte fino. Escolha sua roupa mais alegre e colorida!', icon: <SparklesIcon className="w-8 h-8 text-[#d6b293]" /> },
    { text: 'Seja pontual!', icon: <ClockIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Não faça comentários negativos!', icon: <NoSymbolIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Branco é a cor da noiva! Cuide com cores muito claras como bege ou off white também!', icon: <HandRaisedIcon className="w-12 h-12 text-[#d6b293]" /> },
    { text: 'Divirta-se muito!', icon: <MusicalNoteIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Não saia sem se despedir dos noivos!', icon: <UsersIcon className="w-6 h-6 text-[#d6b293]" /> },
    { text: 'Na cerimônia, pedimos que seja discreto ao tirar fotos, para não atrapalhar nossos fotógrafos. Na festa fique a vontade e compartilhe tudo com a gente no app "Wedshots"!', icon: <CameraIcon className="w-20 h-20 text-[#d6b293]" /> },
  ];

  return (
    <div className="p-6">
      <div className="text-[3rem] md:text-[5rem] lg:text-[10rem]">
        <h1 className="font-light text-center mb-6 text-[#d6b293] letter" style={{fontFamily: "Luxurious Script"}}>{title}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-[80rem] lg:mx-auto">
        {rules.map((rule, index) => (
          <div key={index}>
            <div className="flex items-center justify-start p-4 bg-gray-100  rounded-lg border border-gray-300  lg:min-h-[7rem] text-black">
              {rule.icon} {/* Ícone da regra */}
              <span className="ml-3 font-['Inter'] font-light text-[1rem]">{rule.text}</span> {/* Texto da regra */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manual;
