import './styles.css';

export interface IHelloWorld {
  text: string;
}

export const HelloWorld = ({ text }: IHelloWorld) => {
  return <div className="component">This is text: {text}</div>;
};
