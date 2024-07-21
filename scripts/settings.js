import { MODULE } from "./constants.js";

/**
 * Register module settings
 * Called by Token Action HUD Core to register Token Action HUD system module settings
 * @param {function} coreUpdate Token Action HUD Core update function
 */
export function register(coreUpdate) {
  game.settings.register(MODULE.ID, "displayBattleClickItem", {
    name:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayBattleCheck", {
    name:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayBattlePower", {
    name:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayBattleEffect", {
    name:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.battletab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });

  game.settings.register(MODULE.ID, "displayFeatureClickItem", {
    name:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayFeatureMP", {
    name:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayMP.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayMP.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayFeatureCheck", {
    name:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayFeaturePower", {
    name:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayFeatureEffect", {
    name:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.featuretab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });

  game.settings.register(MODULE.ID, "displaySpellClickItem", {
    name:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displaySpellMP", {
    name:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayMP.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayMP.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displaySpellCheck", {
    name:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displaySpellPower", {
    name:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displaySpellEffect", {
    name:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.spelltab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });

  game.settings.register(MODULE.ID, "displayItemClickItem", {
    name:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayItemCheck", {
    name:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayItemPower", {
    name:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayItemEffect", {
    name:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.itemtab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });

  game.settings.register(MODULE.ID, "displayMAClickItem", {
    name:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayClickItem.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayMACheck", {
    name:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayCheck.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayMAPower", {
    name:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayPower.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: false,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
  game.settings.register(MODULE.ID, "displayMAEffect", {
    name:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.name"),
    hint:
      game.i18n.localize("tokenActionHud.sw25.monsterabilitytab") +
      " : " +
      game.i18n.localize("tokenActionHud.sw25.settings.displayEffect.hint"),
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: (value) => {
      coreUpdate(value);
    },
  });
}
