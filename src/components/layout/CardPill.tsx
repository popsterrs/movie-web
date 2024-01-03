import classNames from "classnames";

export function CardPill(props: {
  clickable?: boolean;
  text?: string;
  hideCardOnMobile?: boolean;
  backgroundClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        "flex items-center space-x-6 rounded-full px-8 py-2 text-type-logo",
        props.backgroundClass ?? "bg-pill-background bg-opacity-50",
        props.clickable
          ? "transition-[transform,background-color] hover:scale-105 hover:bg-pill-backgroundHover hover:text-type-logo active:scale-95"
          : "",
        props.hideCardOnMobile ? "hidden sm:block" : "",
      )}
    >
      {props.children}
    </div>
  );
}
