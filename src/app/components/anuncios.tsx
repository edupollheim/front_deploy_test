import './anuncios.css';

const Anuncios = () => {
    const title = "Informações";
    const textos = {
      anuncio1: {
        title: "Cerimônia",
        text: "Nós sabemos como o dia pode ser corrido, mas a cerimônia é um momento especial que não queremos que você perca! O início será às 10h e pedimos que chegue com antecedência para que todos possam aproveitar esse instante conosco. Contamos com sua pontualidade para tornar nosso dia ainda mais inesquecível.",
      },
      anuncio2: {
        title: "Recepção",
        text: "Depois da cerimônia, teremos um almoço preparado com todo carinho, seguido por brincadeiras e atividades para manter o clima leve e divertido. Venha com energia para aproveitar cada momento conosco!",
      },
    };
  
    return (
      <div className="flex justify-between items-center h-screen p-6 bg-[#fffaf6]">
        {/* Coluna de anúncios à esquerda */}
        <div className="flex-1 pr-6 pt-2">
          <h1 className="text-[4rem] font-thin titulo mt-[-4.5rem] text-[#d6b293] text-center lg:text-[10rem] letter">{title}</h1>
  
          {/* Renderizando os anúncios */}
          {Object.keys(textos).map((key) => {
            const anuncio = textos[key as keyof typeof textos];
            return (
              <div key={key} className="mt-6 
              font-letras   
              lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center 
              sm:text-center sm:items-center sm:justify-center
              md:text-center md:items-center md:justify-center">
                <h2 className="text-2xl font-semibold estilo-sub-titulo text-[#d6b293] justify-center items-center flex">{anuncio.title}</h2>
                <p className="mt-2 text-lg estilo-texto max-w-lg text-center">{anuncio.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default Anuncios;
  