export class MenuModel {
  entries: MenuEntry[] | undefined;
}

export interface MenuEntry {
  id: number;
  code: string;
  name: string;
  icon?: string;
  isHidden?: boolean;
  routerLink?: string;
  items: MenuEntry[];
  active?: boolean;
  inherit_permissions?: boolean;
  access_roles?: number[];
}
