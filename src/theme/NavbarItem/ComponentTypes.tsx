import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import Profile from "@site/src/components/Profile";
import LocaleDropdownNavbarItem from "./LocaleDropdownNavbarItem";

export default {
  ...ComponentTypes,
  localeDropdown: LocaleDropdownNavbarItem,
  "custom-profile": Profile,
};
