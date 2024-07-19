import type { ComponentType } from "svelte";
import type DefaultOverlay from "./default-overlay.svelte";

export class DrawerConfig<T> {
  public id: string;
  public open?: boolean;
  public placement: 'left' | 'right' | 'top' | 'bottom';
  public component: ComponentType;
  public overlay?: DefaultOverlay;
  public data?: T;

  public constructor(obj: DrawerConfig<T>) {
    Object.assign(this, obj);
  }
}