import { populateInfiniteSparksCompendiums } from "./data/premade-compendiums.mjs";

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

  game.settings.register(MODULE_ID, "autoPopulateCompendiums", {
    name: "PTG2EInfiniteSparks.Settings.AutoPopulateCompendiums.Name",
    hint: "PTG2EInfiniteSparks.Settings.AutoPopulateCompendiums.Hint",
    scope: "world",
    config: true,
    restricted: true,
    type: Boolean,
    default: true
  });

  const module = game.modules.get(MODULE_ID);
  if (module) {
    module.api = {
      populateCompendiums: populateInfiniteSparksCompendiums
    };
  }

  console.info(`${MODULE_TITLE} | Initialized`);
});

Hooks.once("ready", async () => {
  const warnOnWrongSystem = game.settings.get(MODULE_ID, "warnOnWrongSystem");

  if (warnOnWrongSystem && game.system?.id !== REQUIRED_SYSTEM_ID && game.user?.isGM) {
    ui.notifications.warn(game.i18n.localize("PTG2EInfiniteSparks.Notifications.WrongSystem"));
  }

  if (game.user?.isGM && game.settings.get(MODULE_ID, "autoPopulateCompendiums")) {
    await populateInfiniteSparksCompendiums();
  }

  console.info(`${MODULE_TITLE} | Ready`);
});
