import DefaultOverlay from "./default-overlay.svelte";
import type { DrawerConfig } from "./drawer-config";
import { DrawerInstance } from "./drawer-instance";

export class DrawerManager {
  private drawers: { [name: string]: DrawerInstance<any> } = {};

  public open(config: DrawerConfig<any>) {
    this.drawers[config.id] = new DrawerInstance(config);
    this.drawers[config.id].manager = this;
    this.drawers[config.id].overlay = new DefaultOverlay({
      target: document.body,
      props: {
        instance: this.drawers[config.id]
      }
    });
  }

  public close(id: string) {
    this.drawers[id].overlay.$destroy();
    delete this.drawers[id];
  }
}
