import Image from 'next/image';

const Home = () => {
  const env = process.env.NODE_ENV || 'Unspecified';

  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen'>
      <Image
        src='/vb-logo.svg'
        alt='BSN Logo'
        className='w-40 h-40'
        width={160}
        height={160}
        priority
      />
      <h1>
        The{' '}
        <span className='text-victory-red'>
          <b>HEART</b>
        </span>{' '}
        of the game
      </h1>
      <p>
        Running mode: <span className='font-bold uppercase'>{env}</span>
      </p>
    </div>
  );
};

export default Home;
