import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install({
  onUpdateReady: (): void => {
    OfflinePluginRuntime.applyUpdate();
  },
  onUpdated: (): void => {
    location.reload();
  }
});
