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
    { text: 'Na cerimônia, pedimos que não use o celular, nossos fotógrafos irão cuidar disso! Mas na festa, tire fotos à vontade e compartilhe com a gente pelo app: Wedshots', icon: <CameraIcon className="w-20 h-20 text-[#d6b293]" /> },
    { text: 'Não saia sem se despedir dos noivos!', icon: <UsersIcon className="w-6 h-6 text-[#d6b293]" /> },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">{title}</h1>
      <div className="flex flex-wrap gap-4">
        {rules.map((rule, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3">
            <div className="flex items-start p-4 bg-gray-100 rounded-lg border border-gray-300">
              {rule.icon} {/* Ícone da regra */}
              <span className="text-sm ml-3">{rule.text}</span> {/* Texto da regra */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manual;
