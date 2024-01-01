import classNames from "classnames";
import { useTranslation } from "react-i18next";

export function TextPill(props: {
  clickable?: boolean;
  text?: string;
  hideTextOnMobile?: boolean;
  hideButtonOnMobile?: boolean;
  backgroundClass?: string;
}) {
  const { t } = useTranslation();
// 
  return (
    <div
      className={classNames(
        "flex items-center space-x-2 rounded-full px-4 py-2 text-type-logo",
        props.backgroundClass ?? "bg-pill-background bg-opacity-50",
        props.clickable
          ? "transition-[transform,background-color] hover:scale-105 hover:bg-pill-backgroundHover hover:text-type-logo active:scale-95"
          : "",
        props.hideButtonOnMobile ? "hidden sm:block" : "",
      )}
    >
      <span
        className={[
          "font-semibold text-white",
          props.hideTextOnMobile ? "hidden sm:block" : "",
        ].join(" ")}
      >
        {t(props.text ? props.text : "")}
      </span>
    </div>
  );
}
