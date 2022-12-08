# DropItLikeIsHot

## Description

A light weight dropdown for simple needs. <br>
As much as possible DropItLikeIsHot doesn't hold its own state, but rather it needs to be handled by its parent, this way is essayer to customize behavior.

<br>

## Features

- customizable with your own styles
- accepts your own async function
- debounce api requests when user types
- optimized items rendering in case of large list of options
- render dropdown's flyout above the input in case it is out of view port

<br>

## Requirements

- use the component in a **react app**, and event better if it is in a **typescript** environment

<br>

## Installation

```sh
npm install --save 'drop-it-like-is-hot'
```

<br>

## Usage

```javascript
import { DropItLikeIsHot } from "drop-it-like-is-hot";
import "drop-it-like-is-hot/dist/style.css";

export default function App() {
  const [value, setValue] = useState("");

  const optionsCallback = useCallback(
    (searchString: string) =>
      fetch(`https://example.com?searchAtrribute=${searchString}`)
        .then((r) => r.json())
        .then((data: { id: string; name: string }[]) => {
          return data
            .map(({ id, name }) => ({ id, label: name }))
        }),
    []
  );

  return (
    <div className="App">
      <DropItLikeIsHot
        value={value}
        onChange={(value) => setValue(value)}
        onSelect={(_, label) => setValue(label)}
        optionsCallback={optionsCallback}
      />
    </div>
  );
}
```
Replace your "fetch" with your api call, what is important that the "optionsCallback" return a Promise that resolves with and array that have the following structure:
```json
{
    "id": "string",
    "label": "string"
}
```

<br>

## Playground
You can check directly the component on code sandbox:<br>
[An Internal Link](https://codesandbox.io/s/drop-it-like-is-hot-5yibxb?file=/src/App.tsx)

<br>

## Component Props
| Name | Type | Required | Default | Description |
| ------ | ------ | ------ | ------ | ------ |
| value | string | yes | none | makes the field in dropdown a controlled input
| label | string | no | none | render above the field a label for dropdown
| className | string | no | none | pass a css class at the root div element of the dropdown, meant for customization |
| placeholder | string | no | none | field`s placeholder
| onChange | (value: string, event: ChangeEvent\<HTMLInputElement\>) => void | yes | none | needed for changing the input value from the parent component as this own doesn't hold his own state |
| onSelect | (id: string, label: string) => void | yes | none | needed to change inputs value when clicking on an option, as it is not handled by it own state |
| optionsCallback | (searchString: string) => Promise\<Options\> | yes | none | needed to fill the flyout with options, the Option type is exported by the library. This needs to be a async function |

<br>

# About this repo
This a repo that can build it self as a library of components, here is the npm link: https://www.npmjs.com/package/drop-it-like-is-hot.<br>
Checkout the following file, for how the to publish to npm:
```
/.github/workflows/publish.yml
```

<br>

## Technologies
- Typescript
- ReactJS
- Vite
- React Testing Library
- CI/CD with GitHub Actions

<br>

## Running locally
First you need to install [NodeJS](https://nodejs.org/en/download/) on your local machine. Then open a terminal and follow the next steps:

```sh
git clone https://github.com/StefanRadusi/drop-it-like-is-hot
cd drop-it-like-is-hot
npm install
npm run dev
```
After that open a browser and go to: http://localhost:5173/