const MODULE_ID = "ptg2e-infinite-sparks";
const MODULE_TITLE = "PTG2e Infinite Sparks";
const REQUIRED_SYSTEM_ID = "part-time-gods";

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "warnOnWrongSystem", {
    name: "PTG2EInfiniteSparks.Settings.WarnOnWrongSystem.Name",
    hint: "PTG2EInfiniteSparks.Settings.WarnOnWrongSystem.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });

  console.info(`${MODULE_TITLE} | Initialized`);
});

Hooks.once("ready", () => {
  const warnOnWrongSystem = game.settings.get(MODULE_ID, "warnOnWrongSystem");

  if (warnOnWrongSystem && game.system?.id !== REQUIRED_SYSTEM_ID && game.user?.isGM) {
    ui.notifications.warn(game.i18n.localize("PTG2EInfiniteSparks.Notifications.WrongSystem"));
  }

  console.info(`${MODULE_TITLE} | Ready`);
});

