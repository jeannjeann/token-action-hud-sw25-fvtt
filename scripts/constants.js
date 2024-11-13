/**
 * Module-based constants
 */
export const MODULE = {
  ID: "token-action-hud-sw25",
};

/**
 * Core module
 */
export const CORE_MODULE = {
  ID: "token-action-hud-core",
};

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = "1.5";

/**
 * Action types
 */
export const ACTION_TYPE = {
  weapon: "TYPES.Item.weapon",
  battleweapon: "tokenActionHud.sw25.battleweapon",
  armor: "TYPES.Item.armor",
  accessory: "TYPES.Item.accessory",
  battle: "SW25.Battle",
  item: "TYPES.Item.item",
  magicpower: "SW25.Attributes.Magicpower",
  sorcerer: "SW25.Item.Spell.Sorcerer",
  conjurer: "SW25.Item.Spell.Conjurer",
  wizard: "SW25.Item.Spell.Wizard",
  priest: "SW25.Item.Spell.Priest",
  magitech: "SW25.Item.Spell.Magitech",
  fairy: "SW25.Item.Spell.Fairy",
  druid: "SW25.Item.Spell.Druid",
  daemon: "SW25.Item.Spell.Daemon",
  enhancearts: "TYPES.Item.enhancearts",
  magicalsong: "TYPES.Item.magicalsong",
  ridingtrick: "TYPES.Item.ridingtrick",
  alchemytech: "TYPES.Item.alchemytech",
  phasearea: "TYPES.Item.phasearea",
  tactics: "TYPES.Item.tactics",
  otherfeature: "TYPES.Item.otherfeature",
  check: "TYPES.Item.check",
  battlecheck: "tokenActionHud.sw25.battlecheck",
  combatability: "TYPES.Item.combatability",
  skill: "TYPES.Item.skill",
  raceability: "TYPES.Item.raceability",
  resource: "TYPES.Item.resource",
  monsterability: "TYPES.Item.monsterability",
  effect: "SW25.Effects",
  combatcontrol: "tokenActionHud.sw25.combatcontrol",
  loot: "SW25.Monster.Loot",
  utility: "tokenActionHud.utility",
  usedice: "SW25.Item.CheckB",
  usepower: "SW25.Item.PowerB",
  useeffect: "SW25.Item.EffectB",
  mpcost: "SW25.Mp",
  resourcecost: "SW25.Cost",
};

/**
 * Groups
 */
export const GROUP = {
  weapon: {
    id: "weapon",
    name: "TYPES.Item.weapon",
    type: "system",
  },
  battleweapon: {
    id: "battleweapon",
    name: "tokenActionHud.sw25.battleweapon",
    type: "system",
  },
  armor: {
    id: "armor",
    name: "TYPES.Item.armor",
    type: "system",
  },
  accessory: {
    id: "accessory",
    name: "TYPES.Item.accessory",
    type: "system",
  },
  battle: {
    id: "battle",
    name: "SW25.Battle",
    type: "system",
  },
  item: {
    id: "item",
    name: "TYPES.Item.item",
    type: "system",
  },
  magicpower: {
    id: "magicpower",
    name: "SW25.Attributes.Magicpower",
    type: "system",
  },
  sorcerer: {
    id: "sorcerer",
    name: "SW25.Item.Spell.Sorcerer",
    type: "system",
  },
  conjurer: {
    id: "conjurer",
    name: "SW25.Item.Spell.Conjurer",
    type: "system",
  },
  wizard: {
    id: "wizard",
    name: "SW25.Item.Spell.Wizard",
    type: "system",
  },
  priest: {
    id: "priest",
    name: "SW25.Item.Spell.Priest",
    type: "system",
  },
  magitech: {
    id: "magitech",
    name: "SW25.Item.Spell.Magitech",
    type: "system",
  },
  fairy: {
    id: "fairy",
    name: "SW25.Item.Spell.Fairy",
    type: "system",
  },
  druid: {
    id: "druid",
    name: "SW25.Item.Spell.Druid",
    type: "system",
  },
  daemon: {
    id: "daemon",
    name: "SW25.Item.Spell.Daemon",
    type: "system",
  },
  enhancearts: {
    id: "enhancearts",
    name: "TYPES.Item.enhancearts",
    type: "system",
  },
  magicalsong: {
    id: "magicalsong",
    name: "TYPES.Item.magicalsong",
    type: "system",
  },
  ridingtrick: {
    id: "ridingtrick",
    name: "TYPES.Item.ridingtrick",
    type: "system",
  },
  alchemytech: {
    id: "alchemytech",
    name: "TYPES.Item.alchemytech",
    type: "system",
  },
  phasearea: {
    id: "phasearea",
    name: "TYPES.Item.phasearea",
    type: "system",
  },
  tactics: {
    id: "tactics",
    name: "TYPES.Item.tactics",
    type: "system",
  },
  otherfeature: {
    id: "otherfeature",
    name: "TYPES.Item.otherfeature",
    type: "system",
  },
  check: {
    id: "check",
    name: "TYPES.Item.check",
    type: "system",
  },
  battlecheck: {
    id: "battlecheck",
    name: "tokenActionHud.sw25.battlecheck",
    type: "system",
  },
  combatability: {
    id: "combatability",
    name: "TYPES.Item.combatability",
    type: "system",
  },
  skill: {
    id: "skill",
    name: "TYPES.Item.skill",
    type: "system",
  },
  raceability: {
    id: "raceability",
    name: "TYPES.Item.raceability",
    type: "system",
  },
  resource: {
    id: "resource",
    name: "TYPES.Item.resource",
    type: "system",
  },
  monsterability: {
    id: "monsterability",
    name: "TYPES.Item.monsterability",
    type: "system",
  },
  effect: {
    id: "effect",
    name: "SW25.Item.EffectB",
    type: "system",
  },
  temporaryEffect: {
    id: "temporary-effect",
    name: "SW25.Effect.Temporary",
    type: "system",
  },
  passiveEffect: {
    id: "passive-effect",
    name: "SW25.Effect.Passive",
    type: "system",
  },
  combatControl: {
    id: "combatcontrol",
    name: "tokenActionHud.sw25.combatcontrol",
    type: "system",
  },
  loot: {
    id: "loot",
    name: "SW25.Monster.Loot",
    type: "system",
  },
  token: {
    id: "token",
    name: "tokenActionHud.token",
    type: "system",
  },
  utility: {
    id: "utility",
    name: "tokenActionHud.utility",
    type: "system",
  },
};

/**
 * Item types
 */
export const ITEM_TYPE = {
  weapon: { groupId: "weapon" },
  battleweapon: { groupId: "battleweapon" },
  armor: { groupId: "armor" },
  accessory: { groupId: "accessory" },
  battle: { groupId: "battle" },
  item: { groupId: "item" },
  magicpower: { groupId: "magicpower" },
  sorcerer: { groupId: "sorcerer" },
  conjurer: { groupId: "conjurer" },
  wizard: { groupId: "wizard" },
  priest: { groupId: "priest" },
  magitech: { groupId: "magitech" },
  fairy: { groupId: "fairy" },
  druid: { groupId: "druid" },
  daemon: { groupId: "daemon" },
  enhancearts: { groupId: "enhancearts" },
  magicalsong: { groupId: "magicalsong" },
  ridingtrick: { groupId: "ridingtrick" },
  alchemytech: { groupId: "alchemytech" },
  phasearea: { groupId: "phasearea" },
  tactics: { groupId: "tactics" },
  otherfeature: { groupId: "otherfeature" },
  check: { groupId: "check" },
  battlecheck: { groupId: "battlecheck" },
  combatability: { groupId: "combatability" },
  skill: { groupId: "skill" },
  raceability: { groupId: "raceability" },
  resource: { groupId: "resource" },
  combatcontrol: { groupId: "combatcontrol" },
  loot: { groupId: "loot" },
  monsterability: { groupId: "monsterability" },
  utility: { groupId: "utility" },
  effect: { groupId: "effect" },
};
