import React from "react";

interface ClickOutsideProps {
  open: Boolean;
  setClose: Function;
  clickableInside?: Boolean;
}

const ClickOutside: React.FC<ClickOutsideProps> = ({
  children,
  open,
  setClose,
  clickableInside,
}) => {
  const node = React.useRef<HTMLSpanElement>(null);

  const handleClick = (e: any) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }
    // outside click
    setClose(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [node]);

  return <span ref={node}>{open && children}</span>;
};

ClickOutside.defaultProps = {
  clickableInside: false,
};

export default ClickOutside;
