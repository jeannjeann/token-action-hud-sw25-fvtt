// System Module Imports
import { ACTION_TYPE, ITEM_TYPE } from "./constants.js";
import { Utils } from "./utils.js";

export let ActionHandler = null;

Hooks.once("tokenActionHudCoreApiReady", async (coreModule) => {
  /**
   * Extends Token Action HUD Core's ActionHandler class and builds system-defined actions for the HUD
   */
  ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
    /**
     * Build system actions
     * Called by Token Action HUD Core
     * @override
     * @param {array} groupIds
     */ a;
    async buildSystemActions(groupIds) {
      // Set actor and token variables
      this.actors = !this.actor ? this._getActors() : [this.actor];
      this.actorType = this.actor?.type;

      // Set items variable
      if (this.actor) {
        let items = this.actor.items;
        items = coreModule.api.Utils.sortItemsByName(items);
        this.items = items;
      }

      if (this.actorType === "character") {
        this.#buildCharacterActions();
      } else if (this.actorType === "monster") {
        this.#buildMonsterActions();
      } else if (!this.actor) {
        this.#buildMultipleTokenActions();
      }
    }

    /**
     * Build character actions
     * @private
     */
    #buildCharacterActions() {
      this.#buildInventory("weapon", "weapon");
      this.#buildInventory("battleweapon", "battleweapon");
      this.#buildInventory("armor", "armor");
      this.#buildInventory("accessory", "accessory");
      this.#buildInventory("item", "item");
      this.#buildInventory("sorcerer", "sorcerer");
      this.#buildInventory("conjurer", "conjurer");
      this.#buildInventory("wizard", "wizard");
      this.#buildInventory("priest", "priest");
      this.#buildInventory("magitech", "magitech");
      this.#buildInventory("fairy", "fairy");
      this.#buildInventory("druid", "druid");
      this.#buildInventory("daemon", "daemon");
      this.#buildInventory("enhancearts", "enhancearts");
      this.#buildInventory("magicalsong", "magicalsong");
      this.#buildInventory("ridingtrick", "ridingtrick");
      this.#buildInventory("alchemytech", "alchemytech");
      this.#buildInventory("phasearea", "phasearea");
      this.#buildInventory("tactics", "tactics");
      this.#buildInventory("combatability", "combatability");
      this.#buildInventory("raceability", "raceability");
      this.#buildCheck("check", "check");
      this.#buildCheck("battlecheck", "battlecheck");
      this.#buildSkill("skill", "skill");
      this.#buildBattle("battle", "battle");
      this.#buildMagicPower("magicpower", "magicpower");
      this.#buildEffects();
    }

    /**
     * Build monster actions
     * @private
     */
    #buildMonsterActions() {
      this.#buildMonsterAbility("monsterability", "monsterability");
      this.#buildInventory("sorcerer", "sorcerer");
      this.#buildInventory("conjurer", "conjurer");
      this.#buildInventory("wizard", "wizard");
      this.#buildInventory("priest", "priest");
      this.#buildInventory("magitech", "magitech");
      this.#buildInventory("fairy", "fairy");
      this.#buildInventory("druid", "druid");
      this.#buildInventory("daemon", "daemon");
      this.#buildEffects();
    }

    /**
     * Build multiple token actions
     * @private
     * @returns {object}
     */
    #buildMultipleTokenActions() {}

    /**
     * Build check
     * @private
     */
    async #buildCheck(actionType, group) {
      if (this.items.size === 0) return;

      const actionTypeId = actionType;
      const inventoryMap = new Map();

      for (const [itemId, itemData] of this.items) {
        const type = itemData.type;

        const typeMap = inventoryMap.get(type) ?? new Map();
        typeMap.set(itemId, itemData);
        inventoryMap.set(type, typeMap);
      }

      for (const [type, typeMap] of inventoryMap) {
        let groupId = ITEM_TYPE[type]?.groupId;

        if (type == "check" && actionType == "battlecheck")
          groupId = ITEM_TYPE[actionType]?.groupId;

        if (groupId != group) continue;

        const groupData = { id: groupId, type: "system" };

        // Get actions
        const actions = [...typeMap]
          .map(([itemId, itemData]) => {
            if (actionTypeId == "battlecheck" && !itemData.system.showbtcheck)
              return null;
            const id = itemId;
            const name = itemData.name;
            const actionTypeName = coreModule.api.Utils.i18n(
              ACTION_TYPE[actionTypeId]
            );
            const listName = `${
              actionTypeName ? `${actionTypeName}: ` : ""
            }${name}`;
            const encodedValue = [actionTypeId, id].join(this.delimiter);

            return {
              id,
              name,
              listName,
              encodedValue,
            };
          })
          .filter((action) => action !== null);

        // TAH Core method to add actions to the action list
        this.addActions(actions, groupData);
      }
    }

    /**
     * Build skill
     * @private
     */
    async #buildSkill(actionType, group) {
      if (this.items.size === 0) return;

      const actionTypeId = actionType;
      const inventoryMap = new Map();

      const parentGroupData = { id: "skill", type: "system" };
      const ability = ["dex", "agi", "str", "vit", "int", "mnd"];
      const typeId = "skillcheck";

      // Add Adventure level check
      const advskillcheckGroupData = {
        id: "skillcheck-Adv",
        name: coreModule.api.Utils.i18n("SW25.Attributes.Advlevel"),
        type: "system-derived",
        settings: { showTitle: false, customWidth: "500" },
      };
      this.addGroup(advskillcheckGroupData, parentGroupData);

      const abilityTypeName = coreModule.api.Utils.i18n("TYPES.Item.skill");
      const advId = "advLevel";
      const advName = coreModule.api.Utils.i18n("SW25.Attributes.Advlevel");
      const advListName = `${
        abilityTypeName ? `${abilityTypeName}: ` : ""
      }${advName}`;
      const advEncodedValue = [typeId, advId].join(this.delimiter);
      const advgroup = { id: "skillcheck-Adv", type: "system-derived" };
      const advAction = [
        {
          id: advId,
          name: advName,
          listName: advListName,
          encodedValue: advEncodedValue,
          cssClass: "active",
        },
      ];
      for (let i = 0; i < ability.length; i++) {
        let id = ability[i] + "-" + advId;
        let abilityName =
          ability[i].charAt(0).toUpperCase() + ability[i].slice(1);
        let name = coreModule.api.Utils.i18n(
          "SW25.Ability." + abilityName + ".abbr"
        );
        let listName = `${advName ? `${advName}: ` : ""}${name}`;
        let encodedValue = [typeId, id].join(this.delimiter);
        advAction.push({ id, name, listName, encodedValue });
      }
      this.addActions(advAction, advgroup);

      // Add Skill check
      for (const [itemId, itemData] of this.items) {
        const type = itemData.type;

        const typeMap = inventoryMap.get(type) ?? new Map();
        typeMap.set(itemId, itemData);
        inventoryMap.set(type, typeMap);
      }

      for (const [type, typeMap] of inventoryMap) {
        let groupId = ITEM_TYPE[type]?.groupId;
        if (groupId != group) continue;

        // Set groups and actions
        [...typeMap].forEach(([itemId, itemData]) => {
          // Add groups
          const groupId = "skillcheck-" + itemId;
          const groupName = itemData.name;
          const group = {
            id: groupId,
            name: groupName,
            type: "system-derived",
            settings: { showTitle: false, customWidth: "500" },
          };
          this.addGroup(group, parentGroupData);

          // Add actions
          const skillId = itemId;
          const skillName = itemData.name;
          const actionTypeName = coreModule.api.Utils.i18n(
            ACTION_TYPE[actionTypeId]
          );
          const skillListName = `${
            actionTypeName ? `${actionTypeName}: ` : ""
          }${skillName}`;
          const skillEncodedValue = [actionTypeId, skillId].join(
            this.delimiter
          );
          const skillgroup = { id: groupId, type: "system-derived" };
          const actions = [
            {
              id: skillId,
              name: skillName,
              listName: skillListName,
              encodedValue: skillEncodedValue,
              cssClass: "active",
            },
          ];
          for (let i = 0; i < ability.length; i++) {
            let id = ability[i] + "-" + skillId;
            let abilityName =
              ability[i].charAt(0).toUpperCase() + ability[i].slice(1);
            let name = coreModule.api.Utils.i18n(
              "SW25.Ability." + abilityName + ".abbr"
            );
            let listName = `${skillName ? `${skillName}: ` : ""}${name}`;
            let encodedValue = [typeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
          }
          this.addActions(actions, skillgroup);
        });
      }
    }

    /**
     * Build battle
     * @private
     */
    async #buildBattle(actionType, group) {
      if (this.items.size === 0) return;

      const actorData = this.actor.system;
      const actionTypeId = actionType;
      const actionTypeName = coreModule.api.Utils.i18n(
        ACTION_TYPE[actionTypeId]
      );
      const groupId = ITEM_TYPE[actionType]?.groupId;
      const groupData = { id: groupId, type: "system" };
      const battle = ["hit", "power", "dodge"];
      const actions = [];

      for (let i = 0; i < battle.length; i++) {
        let id = battle[i];
        let name = "";
        let info1 = {};
        switch (battle[i]) {
          case "hit":
            name = coreModule.api.Utils.i18n("SW25.Item.Weapon.Hit");
            info1 = { text: `${actorData.hitweapon}`, title: "baseitem" };
            break;
          case "power":
            name = coreModule.api.Utils.i18n("SW25.Item.Power");
            info1 = { text: `${actorData.hitweapon}`, title: "baseitem" };
            break;
          case "dodge":
            name = coreModule.api.Utils.i18n("SW25.Item.Armor.Dodge");
            info1 = { text: `${actorData.dodgeskill}`, title: "baseskill" };
            break;
        }
        let listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
        let encodedValue = [actionTypeId, id].join(this.delimiter);

        actions.push({ id, name, listName, encodedValue, info1 });
      }

      this.addActions(actions, groupData);
    }

    /**
     * Build magicpower
     * @private
     */
    async #buildMagicPower(actionType, group) {
      if (this.items.size === 0) return;

      const actionTypeId = actionType;
      const inventoryMap = new Map();
      const actionTypeName = coreModule.api.Utils.i18n(
        ACTION_TYPE[actionTypeId]
      );
      const groupId = ITEM_TYPE[actionType]?.groupId;
      const groupData = { id: groupId, type: "system" };
      const mp = [
        "sorcerer",
        "conjurer",
        "wizard",
        "priest",
        "magitech",
        "fairy",
        "druid",
        "daemon",
      ];

      let sc = false;
      let cn = false;
      let wz = false;
      let pr = false;
      let mt = false;
      let fr = false;
      let dr = false;
      let dm = false;
      for (const [itemId, itemData] of this.items) {
        const type = itemData.type;
        const typeMap = inventoryMap.get(type) ?? new Map();
        typeMap.set(itemId, itemData);
        inventoryMap.set(type, typeMap);
      }
      for (const [type, typeMap] of inventoryMap) {
        if (type == "spell") {
          for (const [itemId, itemData] of typeMap) {
            switch (itemData.system.type) {
              case "sorcerer":
                sc = true;
                break;
              case "conjurer":
                cn = true;
                break;
              case "wizard":
                wz = true;
                break;
              case "priest":
                pr = true;
                break;
              case "magitech":
                mt = true;
                break;
              case "fairy":
                fr = true;
                break;
              case "druid":
                dr = true;
                break;
              case "daemon":
                dm = true;
                break;
            }
          }
        }
      }

      const actions = [];
      for (let i = 0; i < mp.length; i++) {
        let id, name, listName, encodedValue;
        switch (mp[i]) {
          case "sorcerer":
            if (!sc) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Sorcerer");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "conjurer":
            if (!cn) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Conjurer");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "wizard":
            if (!wz) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Wizard");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "priest":
            if (!pr) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Priest");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "magitech":
            if (!mt) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Magitech");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "fairy":
            if (!fr) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Fairy");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "druid":
            if (!dr) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Druid");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
          case "daemon":
            if (!dm) break;
            id = mp[i] + "-" + actionTypeId;
            name = coreModule.api.Utils.i18n("SW25.Item.Spell.Daemon");
            listName = `${actionTypeName ? `${actionTypeName}: ` : ""}${name}`;
            encodedValue = [actionTypeId, id].join(this.delimiter);
            actions.push({ id, name, listName, encodedValue });
            break;
        }
      }

      this.addActions(actions, groupData);
    }

    /**
     * Build inventory
     * @private
     */
    async #buildInventory(actionType, group) {
      if (this.items.size === 0) return;

      // Settings
      switch (actionType) {
        case "battleweapon":
          this.displayClickItem = Utils.getSetting("displayBattleClickItem");
          this.displayCheck = Utils.getSetting("displayBattleCheck");
          this.displayPower = Utils.getSetting("displayBattlePower");
          this.displayEffect = Utils.getSetting("displayBattleEffect");
          break;
        case "raceability":
        case "combatability":
        case "enhancearts":
        case "magicalsong":
        case "ridingtrick":
        case "alchemytech":
        case "phasearea":
        case "tactics":
          this.displayClickItem = Utils.getSetting("displayFeatureClickItem");
          this.displayCheck = Utils.getSetting("displayFeatureCheck");
          this.displayPower = Utils.getSetting("displayFeaturePower");
          this.displayEffect = Utils.getSetting("displayFeatureEffect");
          break;
        case "sorcerer":
        case "conjurer":
        case "wizard":
        case "priest":
        case "magitech":
        case "fairy":
        case "druid":
        case "daemon":
          this.displayClickItem = Utils.getSetting("displaySpellClickItem");
          this.displayCheck = Utils.getSetting("displaySpellCheck");
          this.displayPower = Utils.getSetting("displaySpellPower");
          this.displayEffect = Utils.getSetting("displaySpellEffect");
          break;
        case "item":
        case "weapon":
        case "armor":
        case "accessory":
          this.displayClickItem = Utils.getSetting("displayItemClickItem");
          this.displayCheck = Utils.getSetting("displayItemCheck");
          this.displayPower = Utils.getSetting("displayItemPower");
          this.displayEffect = Utils.getSetting("displayItemEffect");
          break;
      }

      const actionTypeId = actionType;
      const inventoryMap = new Map();

      for (const [itemId, itemData] of this.items) {
        const type = itemData.type;

        const typeMap = inventoryMap.get(type) ?? new Map();
        typeMap.set(itemId, itemData);
        inventoryMap.set(type, typeMap);
      }

      for (const [type, typeMap] of inventoryMap) {
        let groupId = ITEM_TYPE[type]?.groupId;

        if (type == "weapon" && actionType == "battleweapon")
          groupId = ITEM_TYPE[actionType]?.groupId;

        if (type == "spell") {
          switch (actionType) {
            case "sorcerer":
            case "conjurer":
            case "wizard":
            case "priest":
            case "magitech":
            case "fairy":
            case "druid":
            case "daemon":
              groupId = ITEM_TYPE[actionType]?.groupId;
              break;
          }
        }

        if (groupId != group) continue;

        const groupData = { id: groupId, type: "system" };

        // Get actions
        const actions = [...typeMap]
          .map(([itemId, itemData]) => {
            const id = itemId;
            const name = itemData.name;
            const actionTypeName = coreModule.api.Utils.i18n(
              ACTION_TYPE[actionTypeId]
            );
            const listName = `${
              actionTypeName ? `${actionTypeName}: ` : ""
            }${name}`;
            const encodedValue = [actionTypeId, id].join(this.delimiter);
            const action = [];
            let baseaction = {
              id,
              name,
              listName,
              encodedValue,
            };
            if (itemData.type == "spell" && itemData.system.type != actionType)
              baseaction = null;
            if (this.displayClickItem && baseaction) action.push(baseaction);

            // Add direct action
            if (itemData.system?.usedice && baseaction) {
              const usediceActionTypeName = coreModule.api.Utils.i18n(
                ACTION_TYPE["usedice"]
              );
              const usediceListName = `${
                usediceActionTypeName ? `${usediceActionTypeName}: ` : ""
              }${name}`;
              const usediceEncodedValue = ["usedice", id].join(this.delimiter);
              const extraname = coreModule.api.Utils.i18n(
                ACTION_TYPE["usedice"]
              );
              const info1 = { text: `${name}`, title: "baseitem" };
              let usediceAction = {
                id: `${id}-usedice`,
                name: extraname,
                listName: usediceListName,
                encodedValue: usediceEncodedValue,
                info1,
              };
              if (this.displayCheck) action.push(usediceAction);
            }

            if (itemData.system?.usepower && baseaction) {
              const usepowerActionTypeName = coreModule.api.Utils.i18n(
                ACTION_TYPE["usepower"]
              );
              const usepowerListName = `${
                usepowerActionTypeName ? `${usepowerActionTypeName}: ` : ""
              }${name}`;
              const usepowerEncodedValue = ["usepower", id].join(
                this.delimiter
              );
              const extraname = coreModule.api.Utils.i18n(
                ACTION_TYPE["usepower"]
              );
              const info1 = { text: `${name}`, title: "baseitem" };
              let usepowerAction = {
                id: `${id}-usepower`,
                name: extraname,
                listName: usepowerListName,
                encodedValue: usepowerEncodedValue,
                info1,
              };
              if (this.displayPower) action.push(usepowerAction);
            }

            if (itemData.system?.useeffect && baseaction) {
              const useeffectActionTypeName = coreModule.api.Utils.i18n(
                ACTION_TYPE["useeffect"]
              );
              const useeffectListName = `${
                useeffectActionTypeName ? `${useeffectActionTypeName}: ` : ""
              }${name}`;
              const useeffectEncodedValue = ["useeffect", id].join(
                this.delimiter
              );
              const extraname = coreModule.api.Utils.i18n(
                ACTION_TYPE["useeffect"]
              );
              const info1 = { text: `${name}`, title: "baseitem" };
              let useeffectAction = {
                id: `${id}-useeffect`,
                name: extraname,
                listName: useeffectListName,
                encodedValue: useeffectEncodedValue,
                info1,
              };
              if (this.displayEffect) action.push(useeffectAction);
            }

            return action;
          })
          .flat();

        // TAH Core method to add actions to the action list
        this.addActions(actions, groupData);
      }
    }

    /**
     * Build monsterability
     * @private
     */
    async #buildMonsterAbility(actionType, group) {
      if (this.items.size === 0) return;

      // Settings
      this.displayClickItem = Utils.getSetting("displayMAClickItem");
      this.displayCheck = Utils.getSetting("displayMACheck");
      this.displayPower = Utils.getSetting("displayMAPower");
      this.displayEffect = Utils.getSetting("displayMAEffect");

      const actionTypeId = actionType;
      const inventoryMap = new Map();

      for (const [itemId, itemData] of this.items) {
        const type = itemData.type;

        const typeMap = inventoryMap.get(type) ?? new Map();
        typeMap.set(itemId, itemData);
        inventoryMap.set(type, typeMap);
      }

      for (const [type, typeMap] of inventoryMap) {
        let groupId = ITEM_TYPE[type]?.groupId;

        if (groupId != group) continue;

        const groupData = { id: groupId, type: "system" };

        // Get actions
        const actions = [...typeMap]
          .map(([itemId, itemData]) => {
            const id = itemId;
            const name = itemData.name;
            const actionTypeName = coreModule.api.Utils.i18n(
              ACTION_TYPE[actionTypeId]
            );
            const listName = `${
              actionTypeName ? `${actionTypeName}: ` : ""
            }${name}`;
            const encodedValue = [actionTypeId, id].join(this.delimiter);
            const action = [];
            let baseaction = {
              id,
              name,
              listName,
              encodedValue,
              cssClass: "active",
            };
            if (this.displayClickItem && baseaction) action.push(baseaction);

            // Add direct action
            if (itemData.system?.usedice1 && baseaction) {
              const usediceListName = `${itemData.system.label1}:${name}`;
              const usediceEncodedValue = ["usedice1", id].join(this.delimiter);
              const extraname = itemData.system.label1;
              const info1 = { text: `${name}`, title: "baseitem" };
              let usediceAction = {
                id: `${id}-usedice1`,
                name: extraname,
                listName: usediceListName,
                encodedValue: usediceEncodedValue,
                info1,
              };
              if (this.displayCheck) action.push(usediceAction);
            }

            if (itemData.system?.usedice2 && baseaction) {
              const usediceListName = `${itemData.system.label2}:${name}`;
              const usediceEncodedValue = ["usedice2", id].join(this.delimiter);
              const extraname = itemData.system.label2;
              const info1 = { text: `${name}`, title: "baseitem" };
              let usediceAction = {
                id: `${id}-usedice2`,
                name: extraname,
                listName: usediceListName,
                encodedValue: usediceEncodedValue,
                info1,
              };
              if (this.displayCheck) action.push(usediceAction);
            }

            if (itemData.system?.usedice3 && baseaction) {
              const usediceListName = `${itemData.system.label3}:${name}`;
              const usediceEncodedValue = ["usedice3", id].join(this.delimiter);
              const extraname = itemData.system.label3;
              const info1 = { text: `${name}`, title: "baseitem" };
              let usediceAction = {
                id: `${id}-usedice3`,
                name: extraname,
                listName: usediceListName,
                encodedValue: usediceEncodedValue,
                info1,
              };
              if (this.displayCheck) action.push(usediceAction);
            }

            if (itemData.system?.usepower && baseaction) {
              const usepowerActionTypeName = coreModule.api.Utils.i18n(
                ACTION_TYPE["usepower"]
              );
              const usepowerListName = `${
                usepowerActionTypeName ? `${usepowerActionTypeName}: ` : ""
              }${name}`;
              const usepowerEncodedValue = ["usepower", id].join(
                this.delimiter
              );
              const extraname = coreModule.api.Utils.i18n(
                ACTION_TYPE["usepower"]
              );
              const info1 = { text: `${name}`, title: "baseitem" };
              let usepowerAction = {
                id: `${id}-usepower`,
                name: extraname,
                listName: usepowerListName,
                encodedValue: usepowerEncodedValue,
                info1,
              };
              if (this.displayPower) action.push(usepowerAction);
            }

            if (itemData.system?.useeffect && baseaction) {
              const useeffectActionTypeName = coreModule.api.Utils.i18n(
                ACTION_TYPE["useeffect"]
              );
              const useeffectListName = `${
                useeffectActionTypeName ? `${useeffectActionTypeName}: ` : ""
              }${name}`;
              const useeffectEncodedValue = ["useeffect", id].join(
                this.delimiter
              );
              const extraname = coreModule.api.Utils.i18n(
                ACTION_TYPE["useeffect"]
              );
              const info1 = { text: `${name}`, title: "baseitem" };
              let useeffectAction = {
                id: `${id}-useeffect`,
                name: extraname,
                listName: useeffectListName,
                encodedValue: useeffectEncodedValue,
                info1,
              };
              if (this.displayEffect) action.push(useeffectAction);
            }

            return action;
          })
          .flat();

        // TAH Core method to add actions to the action list
        this.addActions(actions, groupData);
      }
    }

    /**
     * Build effect
     * @private
     */
    async #buildEffects() {
      const actionType = "effect";
      // Get effects
      const effects = new Map();
      for (const effect of this.actor.allApplicableEffects()) {
        effects.set(effect.id, effect);
      }
      // Exit if no effects exist
      if (effects.size === 0) return;
      // Map passive and temporary effects to new maps
      const passiveEffects = new Map();
      const temporaryEffects = new Map();
      // Iterate effects and add to a map based on the isTemporary value
      for (const [effectId, effect] of effects.entries()) {
        if (
          effect.isSuppressed ||
          (effect.parent?.system?.identified === false && !game.user.isGM)
        )
          continue;
        const isTemporary = effect.isTemporary;
        if (isTemporary) {
          temporaryEffects.set(effectId, effect);
        } else {
          passiveEffects.set(effectId, effect);
        }
      }
      await Promise.all([
        // Build passive effects
        this.buildEffects({
          groupData: { id: "passive-effect", type: "system" },
          actionData: passiveEffects,
          actionType,
        }),
        // Build temporary effects
        this.buildEffects({
          groupData: { id: "temporary-effect", type: "system" },
          actionData: temporaryEffects,
          actionType,
        }),
      ]);
    }

    /**
     * Build actions
     * @public
     * @param {object} data actionData, groupData, actionType
     * @param {object} options
     */
    async buildEffects(data, options) {
      const { actionData, groupData, actionType } = data;
      // Exit if there is no action data
      if (actionData.size === 0) return;
      // Exit if there is no groupId
      const groupId = typeof groupData === "string" ? groupData : groupData?.id;
      if (!groupId) return;
      // Get actions
      const actions = await Promise.all(
        [...actionData].map(
          async (item) => await this.#getEffect(actionType, item[1])
        )
      );
      // Add actions to action list
      this.addActions(actions, groupData);
    }

    /**
     * Get action
     * @private
     * @param {string} actionType
     * @param {object} entity
     * @param {object} options
     * @returns {object}
     */
    async #getEffect(actionType = "item", entity) {
      const id = entity.id ?? entity._id;
      let name = entity?.name ?? entity?.label;
      const actionTypeName =
        `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? "";
      const info1 = { text: entity.parent.name, title: "parent" };
      const listName = `${actionTypeName}${name}(${entity.parent.name})`;
      let cssClass = "";
      if (Object.hasOwn(entity, "disabled")) {
        const active = !entity.disabled ? " active" : "";
        cssClass = `toggle${active}`;
      }
      const encodedValue = [actionType, id].join(this.delimiter);
      return {
        id,
        name,
        encodedValue,
        cssClass,
        info1,
        listName,
      };
    }
  };
});
