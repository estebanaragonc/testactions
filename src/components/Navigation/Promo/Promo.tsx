import { useState } from 'react';

import Icon from '@/components/Icon';

export const Promo = () => {
  const [activeText] = useState(
    'Lorem ipsum dolor sit amet hgytm , consectetur adipiscing elit. Quisquers'
  );
  return (
    <div className={''}>
      <button>
        <Icon name='arrow-left' />
      </button>
      <div>
        <p className={''}>{activeText}</p>
      </div>
      <button>
        <Icon name='arrow-right' />
      </button>
    </div>
  );
};
