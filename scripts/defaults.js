import { GROUP } from "./constants.js";

/**
 * Default layout and groups
 */
export let DEFAULTS = null;

Hooks.once("tokenActionHudCoreApiReady", async (coreModule) => {
  const groups = GROUP;
  Object.values(groups).forEach((group) => {
    group.name = coreModule.api.Utils.i18n(group.name);
    group.listName = `${game.i18n.localize(
      "tokenActionHud.sw25.group"
    )}: ${coreModule.api.Utils.i18n(group.listName ?? group.name)}`;
  });
  const groupsArray = Object.values(groups);
  DEFAULTS = {
    layout: [
      {
        nestId: "check",
        id: "check",
        name: coreModule.api.Utils.i18n("SW25.Check"),
        groups: [
          { ...groups.check, nestId: "check_check" },
          { ...groups.skill, nestId: "check_skill" },
        ],
      },
      {
        nestId: "battle",
        id: "battle",
        name: coreModule.api.Utils.i18n("SW25.Battle"),
        groups: [
          { ...groups.battle, nestId: "battle_battle" },
          { ...groups.battlecheck, nestId: "battle_battlecheck" },
          { ...groups.battleweapon, nestId: "battle_battleweapon" },
        ],
      },
      {
        nestId: "feature",
        id: "feature",
        name: coreModule.api.Utils.i18n("SW25.Features"),
        groups: [
          { ...groups.raceability, nestId: "feature_raceability" },
          { ...groups.combatability, nestId: "feature_combatability" },
          { ...groups.enhancearts, nestId: "feature_enhancearts" },
          { ...groups.magicalsong, nestId: "feature_magicalsong" },
          { ...groups.ridingtrick, nestId: "feature_ridingtrick" },
          { ...groups.alchemytech, nestId: "feature_alchemytech" },
          { ...groups.phasearea, nestId: "feature_phasearea" },
          { ...groups.tactics, nestId: "feature_tactics" },
        ],
      },
      {
        nestId: "monsterability",
        id: "monsterability",
        name: coreModule.api.Utils.i18n("TYPES.Item.monsterability"),
        groups: [
          { ...groups.monsterability, nestId: "monsterability_monsterability" },
        ],
      },
      {
        nestId: "spell",
        id: "spell",
        name: coreModule.api.Utils.i18n("SW25.Spells"),
        groups: [
          { ...groups.magicpower, nestId: "spell_magicpower" },
          { ...groups.sorcerer, nestId: "spell_sorcerer" },
          { ...groups.conjurer, nestId: "spell_conjurer" },
          { ...groups.wizard, nestId: "spell_wizard" },
          { ...groups.priest, nestId: "spell_priest" },
          { ...groups.magitech, nestId: "spell_magitech" },
          { ...groups.fairy, nestId: "spell_fairy" },
          { ...groups.druid, nestId: "spell_druid" },
          { ...groups.daemon, nestId: "spell_daemon" },
        ],
      },
      {
        nestId: "effect",
        id: "effect",
        name: coreModule.api.Utils.i18n("SW25.Effectslong"),
        groups: [
          { ...groups.temporaryEffect, nestId: "effect_temporary-effect" },
          { ...groups.passiveEffect, nestId: "effect_passive-effect" },
        ],
      },
      {
        nestId: "inventory",
        id: "inventory",
        name: coreModule.api.Utils.i18n("SW25.Items"),
        groups: [
          { ...groups.item, nestId: "inventory_item" },
          { ...groups.weapon, nestId: "inventory_weapon" },
          { ...groups.armor, nestId: "inventory_armor" },
          { ...groups.accessory, nestId: "inventory_accessory" },
        ],
      },
      {
        nestId: "utility",
        id: "utility",
        name: coreModule.api.Utils.i18n("tokenActionHud.utility"),
        groups: [
          { ...groups.token, nestId: "utility_token" },
          { ...groups.utility, nestId: "utility_utility" },
        ],
      },
    ],
    groups: groupsArray,
  };
});
