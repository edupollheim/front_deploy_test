import './anuncios.css';

const Anuncios = () => {
    const title = "Anúncios";
    const textos = {
      anuncio1: {
        title: "Cerimônia",
        text: "Nós sabemos como o dia pode ser corrido, mas a cerimônia é um momento especial que não queremos que você perca! O início será às 10h e pedimos que chegue com antecedência para que todos possam aproveitar esse instante conosco. Contamos com sua pontualidade para tornar nosso dia ainda mais inesquecível.",
      },
      anuncio2: {
        title: "Recepção",
        text: "Depois da cerimônia, vamos celebrar juntos com um delicioso churrasco! Teremos um almoço preparado com todo carinho, seguido por brincadeiras e atividades para manter o clima leve e divertido. Mais tarde, para fechar o dia com chave de ouro, serviremos um lanche da tarde com várias delícias. Venha com energia para aproveitar cada momento conosco!",
      },
    };
  
    return (
      <div className="flex justify-between items-center h-screen p-6 bg-[#fffaf6] dark:bg-[#1a1a1a]">
        {/* Coluna de anúncios à esquerda */}
        <div className="flex-1 pr-6 pt-2">
          <h1 className="text-[3.5rem] font-thin titulo mt-[-4.5rem] text-[#637c8b] text-center">{title}</h1>
  
          {/* Renderizando os anúncios */}
          {Object.keys(textos).map((key) => {
            const anuncio = textos[key as keyof typeof textos];
            return (
              <div key={key} className="mt-6 font-letras">
                <h2 className="text-2xl font-semibold estilo-sub-titulo text-[#637c8b]">{anuncio.title}</h2>
                <p className="mt-2 text-lg estilo-texto">{anuncio.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default Anuncios;
  