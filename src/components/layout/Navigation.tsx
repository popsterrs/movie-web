import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { NoUserAvatar, UserAvatar } from "@/components/Avatar";
import { IconPatch } from "@/components/buttons/IconPatch";
import { Icons } from "@/components/Icon";
import { LinksDropdown } from "@/components/LinksDropdown";
import { Lightbar } from "@/components/utils/Lightbar";
import { useAuth } from "@/hooks/auth/useAuth";
import { BlurEllipsis } from "@/pages/layouts/SubPageLayout";
import { conf } from "@/setup/config";
import { useBannerSize } from "@/stores/banner";

import { BrandPill } from "./BrandPill";
import { CardPill } from "./CardPill";

export interface NavigationProps {
  bg?: boolean;
  noLightbar?: boolean;
  doBackground?: boolean;
}

export function Navigation(props: NavigationProps) {
  const bannerHeight = useBannerSize();
  const { loggedIn } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      {/* lightbar */}
      {!props.noLightbar ? (
        <div
          className="absolute inset-x-0 top-0 flex h-[88px] items-center justify-center"
          style={{
            top: `${bannerHeight}px`,
          }}
        >
          <div className="absolute inset-x-0 -mt-[22%] flex items-center sm:mt-0">
            <Lightbar />
          </div>
        </div>
      ) : null}

      {/* backgrounds - these are seperate because of z-index issues */}
      <div
        className="fixed z-[20] pointer-events-none left-0 right-0 top-0 min-h-[150px]"
        style={{
          top: `${bannerHeight}px`,
        }}
      >
        <div
          className={classNames(
            "fixed left-0 right-0 h-32 flex items-center",
            props.doBackground
              ? "bg-background-main border-b border-utils-divider border-opacity-50"
              : null,
          )}
        >
          {props.doBackground ? (
            <div className="absolute w-full h-full inset-0 overflow-hidden">
              <BlurEllipsis positionClass="absolute" />
            </div>
          ) : null}
          <div className="opacity-0 absolute inset-0 block h-32 pointer-events-auto" />
          <div
            className={`${
              props.bg ? "opacity-100" : "opacity-0"
            } absolute inset-0 block h-24 bg-background-main transition-opacity duration-300`}
          >
            <div className="absolute -bottom-24 h-24 w-full bg-gradient-to-b from-background-main to-transparent" />
          </div>
        </div>
      </div>

      {/* content */}
      <div
        className="fixed pointer-events-none left-0 right-0 z-[60] top-0 min-h-[150px] flex items-center"
        style={{
          top: `${bannerHeight}px`,
        }}
      >
        <div className={classNames("fixed left-0 right-0 flex items-center")}>
          <div className="px-7 py-5 relative z-[60] flex flex-1 justify-between items-center">
            <div className="flex items-center space-x-1.5 ssm:space-x-3 pointer-events-auto">
              <Link
                className="block tabbable rounded-full text-xs ssm:text-base"
                to="/"
              >
                <BrandPill clickable />
              </Link>
              <a
                href={conf().DISCORD_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-white tabbable rounded-full"
              >
                <IconPatch icon={Icons.DISCORD} clickable downsized />
              </a>
              <a
                href={conf().GITHUB_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-xl text-white tabbable rounded-full"
              >
                <IconPatch icon={Icons.GITHUB} clickable downsized />
              </a>
            </div>

            <div className="relative pointer-events-auto">
              <LinksDropdown>
                {loggedIn ? <UserAvatar withName /> : <NoUserAvatar />}
              </LinksDropdown>
            </div>
          </div>
        </div>

        <div className="fixed pointer-events-none -translate-x-2/4 left-1/2">
          <CardPill clickable hideCardOnMobile>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xl text-white tabbable rounded-full"
            >
              <span className="font-medium text-base text-white">
                {t("navigation.menu.home")}
              </span>
            </a>
            <a
              href="/discover"
              target="_blank"
              rel="noreferrer"
              className="text-xl text-white tabbable rounded-full"
            >
              <span className="font-medium text-base text-white">
                {t("navigation.menu.discover")}
              </span>
            </a>
          </CardPill>
        </div>
      </div>
    </>
  );
}
