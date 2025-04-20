import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Obrigado pelo presente!</title>
        <meta name="description" content="Agradecemos pelo presente recebido" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center">
          <h1 className="text-4xl font-extrabold text-[#d6b293] mb-4">Muito obrigado!</h1>
          <p className="text-[#d6b293] mb-6">
            Seu presente foi recebido com muito carinho e fará toda a diferença! 🎁
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    </>
  );
}