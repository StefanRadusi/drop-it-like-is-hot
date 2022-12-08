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

<br>
<br>

# Deel interview answers
## What is the difference between Component and PureComponent?
In most cases you would use normal react components, but as a rule react will re-render a component if its parent has rendered. To squeeze some performance you can opt for a PureComponent which wil re-render only if the props or internal state has changed, and in case of props the comparison is shallow, meaning if you pass objects from parent to the child component, the child will not re-render if the content of the objects has changed. The fact that the comparison is shallow is problematic. For example if you pass an array from parent to child, and change something in the parent relative to this array the app will not update visually.

<br>

## Context + ShouldComponentUpdate might be dangerous.
With ShouldComponentUpdate you can pretty much stop the context prorogation from parent to child. For example if you have like Theme in your app and you use context to send color values throughout your components, if a parent component decides to use ShouldComponentUpdate and mess with the natural rendering of the component then any change in the Them will no be visible for child components of the parent component that uses ShouldComponentUpdate.

<br>

## Describe 3 ways to pass information from a component to its PARENT.
- pass function prop from parent to child as a callback and use its argument to pass data from child back to parent
- use context api, which basically can connect every component including parent and child
- Not recommended: use ref as is a mutable object

<br>

## Give 2 ways to prevent components from re-rendering.
- use shouldComponentUpdate and return false, but may still result in a re-rendering of the component.
- use memo function from react as wrapper on your function component, you can even have fine control to when should a the component render using the second argument of memo, the dependency array

<br>

## What is a fragment and why do we need it?
Fragment is react component that is no adding actually a DOM Element, just a Virtual DOM. Because React is imposing for a component to return a single node, in some cases you want to return more then one component. <br>
Follow the next example:
```jsx
export const Component1 = () => {
  return (
    <div>
      <Child1 />
      <Child2 />
    </div>
  )
}
```
If you want to export Child1 & Child2 without adding a div to DOM, you can right like this:
```jsx
export const Component1 = () => {
  return (
    <>
      <Child1 />
      <Child2 />
    </>
  )
}
```
Some component may, especially the own that are not develop by you may depend on the fact that its parent is a dom element, so by using fragment you may break the app.

<br>

## Give 3 examples of the HOC pattern.
- reuse the same behavior but on different components. For example if you have \<Input \> and a \<Textarea /> kind of components, instead of creating the error handling logic in both you can use a HOC to define the logic and wraps the components in it.
- use HOC to connect to a Context like Redux was doing back in the day :)
- use a HOC to define a set of predefine props that should be passed to the wrapped components

<br>

## What's the difference in handling exceptions in promises, callbacks and async...await.
| type | error handling | description  |  
| ------ | ------ | ------ |
| async,await | try {} catch {} | When throw new Error() we can catch it if we await the promise inside the try {} as long as we are in a async function and the promise must not trigger resolve before the throw. We can't catch it if the error was called in a different call stack, like being in a Timer callback function
| promise | .catch() | You can call reject() function to handle errors and reach .catch().When throw new Error() we can catch it if resolve was not called before throw or in callback function in a Timer. 