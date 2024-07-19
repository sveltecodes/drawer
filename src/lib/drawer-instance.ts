import type DefaultOverlay from "./default-overlay.svelte";
import { DrawerConfig } from "./drawer-config";
import { DrawerManager } from "./drawer-manager";

export class DrawerInstance<T> {
  public manager: DrawerManager;
  public config: DrawerConfig<T>;
  public element?: HTMLElement;
  public overlay: DefaultOverlay;
  public constructor(config: DrawerConfig<T>) {
    this.config = new DrawerConfig<T>(config);
  }
}
