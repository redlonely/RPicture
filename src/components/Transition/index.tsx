import { Transition } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const TransitionComponent = ({ isVisible }: { isVisible: boolean }) => (
  <Transition in={isVisible} timeout={duration}></Transition>
);

export default TransitionComponent;
