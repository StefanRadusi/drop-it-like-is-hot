import { useCallback, useState } from 'react';

import { DropItLikeIsHot } from './components/DropItLikeIsHot/DropItLikeIsHot';

function App() {
  const [value, setValue] = useState('');

  const optionsCallback = useCallback(
    (searchString: string) =>
      fetch(`https://api.punkapi.com/v2/beers?beer_name=${searchString}`)
        .then((r) => r.json())
        .then((data: { id: string; name: string }[]) => {
          return data
            .map(({ id, name }) => ({ id, label: name }))
            .filter(({ label }) => label.toLowerCase().includes(searchString.toLowerCase()));
        }),
    [],
  );

  return (
    <div className="App">
      <DropItLikeIsHot
        label="Search beers"
        value={value}
        onChange={(value) => setValue(value)}
        onSelect={(_, label) => setValue(label)}
        optionsCallback={optionsCallback}
      />
    </div>
  );
}

export default App;
