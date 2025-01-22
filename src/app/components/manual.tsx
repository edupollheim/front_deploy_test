import React from 'react';
import { CheckBadgeIcon, SpeakerXMarkIcon, NoSymbolIcon, ClockIcon, SparklesIcon, CameraIcon, MusicalNoteIcon, HandRaisedIcon, UsersIcon } from '@heroicons/react/24/solid'; // Importando ícones específicos

const Manual = () => {
  // Título e regras diretamente no componente
  const title = "Manual do bom convidado";
  const rules = [
    { text: 'Confirme sua presença!', icon: <CheckBadgeIcon className="w-6 h-6 text-[#637c8b]" /> },
    { text: 'Deixe seu celular no silencioso!', icon: <SpeakerXMarkIcon className="w-6 h-6 text-[#637c8b]" /> },
    { text: 'Convidado não convida!', icon: <NoSymbolIcon className="w-6 h-6 text-[#637c8b]" /> },
    { text: 'Traje esporte fino. Escolha sua roupa mais alegre e colorida!', icon: <SparklesIcon className="w-8 h-8 text-[#637c8b]" /> },
    { text: 'Seja pontual!', icon: <ClockIcon className="w-6 h-6 text-[#637c8b]" /> },
    { text: 'Não faça comentários negativos!', icon: <NoSymbolIcon className="w-6 h-6 text-[#637c8b]" /> },
    { text: 'Branco é a cor da noiva! Cuide com cores muito claras como bege ou off white também!', icon: <HandRaisedIcon className="w-12 h-12 text-[#637c8b]" /> },
    { text: 'Divirta-se muito!', icon: <MusicalNoteIcon className="w-6 h-6 text-[#637c8b]" /> },
    { text: 'Na cerimônia, pedimos que não use o celular, nossos fotógrafos irão cuidar disso! Mas na festa, tire fotos à vontade e compartilhe com a gente pelo app: Wedshots', icon: <CameraIcon className="w-20 h-20 text-[#637c8b]" /> },
    { text: 'Não saia sem se despedir dos noivos!', icon: <UsersIcon className="w-6 h-6 text-[#637c8b]" /> },
  ];

  return (
    <div className="p-6">
      <h1 className="text-[3.5rem] font-thin text-center mb-6 text-[#637c8b]" style={{fontFamily: "Fleur De Leah"}}>{title}</h1>
      <div className="flex flex-wrap gap-4">
        {rules.map((rule, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3">
            <div className="flex items-center justify-start p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
              {rule.icon} {/* Ícone da regra */}
              <span className="ml-3 font-['Inter'] font-thin">{rule.text}</span> {/* Texto da regra */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manual;
