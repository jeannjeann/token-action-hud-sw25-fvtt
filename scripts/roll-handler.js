export let RollHandler = null;

Hooks.once("tokenActionHudCoreApiReady", async (coreModule) => {
  /**
   * Extends Token Action HUD Core's RollHandler class and handles action events triggered when an action is clicked
   */
  RollHandler = class RollHandler extends coreModule.api.RollHandler {
    /**
     * Handle action click
     * Called by Token Action HUD Core when an action is left or right-clicked
     * @override
     * @param {object} event        The event
     * @param {string} encodedValue The encoded value
     */
    async handleActionClick(event, encodedValue) {
      const [actionTypeId, actionId] = encodedValue.split("|");

      const renderable = [
        "weapon",
        "battleweapon",
        "armor",
        "accessory",
        "item",
        "sorcerer",
        "conjurer",
        "wizard",
        "priest",
        "magitech",
        "fairy",
        "druid",
        "daemon",
        "enhancearts",
        "magicalsong",
        "ridingtrick",
        "alchemytech",
        "phasearea",
        "tactics",
        "combatability",
        "skill",
        "raceability",
        "resource",
        "check",
        "battlecheck",
        "monsterability",
      ];

      if (renderable.includes(actionTypeId) && this.isRenderItem()) {
        return this.renderItem(this.actor, actionId);
      }

      const knownCharacters = ["character"];

      // If single actor is selected
      if (this.actor) {
        await this.#handleAction(
          event,
          this.actor,
          this.token,
          actionTypeId,
          actionId
        );
        return;
      }

      const controlledTokens = canvas.tokens.controlled.filter((token) =>
        knownCharacters.includes(token.actor?.type)
      );

      // If multiple actors are selected
      for (const token of controlledTokens) {
        const actor = token.actor;
        await this.#handleAction(event, actor, token, actionTypeId, actionId);
      }
    }

    /**
     * Handle action hover
     * Called by Token Action HUD Core when an action is hovered on or off
     * @override
     * @param {object} event        The event
     * @param {string} encodedValue The encoded value
     */
    async handleActionHover(event, encodedValue) {}

    /**
     * Handle group click
     * Called by Token Action HUD Core when a group is right-clicked while the HUD is locked
     * @override
     * @param {object} event The event
     * @param {object} group The group
     */
    async handleGroupClick(event, group) {}

    /**
     * Handle action
     * @private
     * @param {object} event        The event
     * @param {object} actor        The actor
     * @param {object} token        The token
     * @param {string} actionTypeId The action type id
     * @param {string} actionId     The actionId
     */
    async #handleAction(event, actor, token, actionTypeId, actionId) {
      switch (actionTypeId) {
        case "weapon":
        case "battleweapon":
        case "armor":
        case "accessory":
        case "item":
        case "sorcerer":
        case "conjurer":
        case "wizard":
        case "priest":
        case "magitech":
        case "fairy":
        case "druid":
        case "daemon":
        case "enhancearts":
        case "magicalsong":
        case "ridingtrick":
        case "alchemytech":
        case "phasearea":
        case "tactics":
        case "combatability":
        case "skill":
        case "raceability":
        case "monsterability":
          this.#handleDefaultAction(event, actor, actionId);
          break;
        case "check":
        case "battlecheck":
          this.#handleCheckAction(event, actor, actionId);
          break;
        case "utility":
          this.#handleUtilityAction(token, actionId);
          break;
        case "mpcost":
          this.#handleMpcostAction(event, actor, actionId);
          break;
        case "usedice":
          this.#handleUsediceAction(event, actor, actionId);
          break;
        case "usepower":
          this.#handleUsepowerAction(event, actor, actionId);
          break;
        case "usedice1":
        case "usedice2":
        case "usedice3":
          this.#handleMonUsediceAction(event, actor, actionId, actionTypeId);
          break;
        case "useeffect":
          this.#handleUseeffectAction(event, actor, actionId);
          break;
        case "skillcheck":
          this.#handleSkillCheckAction(event, actor, actionId);
          break;
        case "battle":
          this.#handleBattleAction(event, actor, actionId);
          break;
        case "magicpower":
          this.#handleMagicPowerAction(event, actor, actionId);
          break;
        case "resource":
          this.#handleResourceAction(event, actor, actionId);
          break;
        case "effect":
          await this.#toggleEffect(event, actor, actionId);
          break;
      }
    }

    /**
     * Handle default action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleDefaultAction(event, actor, actionId) {
      const item = actor.items.get(actionId);
      item.roll();
    }

    /**
     * Handle check action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleCheckAction(event, actor, actionId) {
      const item = actor.items.get(actionId);
      switch (item.system.checkmethod) {
        case "normal":
        case "dice":
          item.system.clickitem = "dice";
          break;
        case "power":
          item.system.clickitem = "power";
          break;
      }
      await item.roll();
      item.system.clickitem = "all";
    }

    /**
     * Handle utility action
     * @private
     * @param {object} token    The token
     * @param {string} actionId The action id
     */
    async #handleUtilityAction(token, actionId) {
      switch (actionId) {
        case "endTurn":
          if (game.combat?.current?.tokenId === token.id) {
            await game.combat?.nextTurn();
          }
          break;
      }
    }

    /**
     * Handle direct action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleMpcostAction(event, actor, actionId) {
      const item = actor.items.get(actionId);
      let orgclickitem = item.system.clickitem;
      item.system.clickitem = "mpcost";
      await item.roll();
      item.system.clickitem = orgclickitem;
    }
    async #handleUsediceAction(event, actor, actionId) {
      const item = actor.items.get(actionId);
      let orgclickitem = item.system.clickitem;
      item.system.clickitem = "dice";
      await item.roll();
      item.system.clickitem = orgclickitem;
    }
    async #handleUsepowerAction(event, actor, actionId) {
      const item = actor.items.get(actionId);
      let orgclickitem = item.system.clickitem;
      item.system.clickitem = "power";
      await item.roll();
      item.system.clickitem = orgclickitem;
    }
    async #handleUseeffectAction(event, actor, actionId) {
      await onApplyEffect(actor, actionId);
    }
    async #handleMonUsediceAction(event, actor, actionId, actionTypeId) {
      const item = actor.items.get(actionId);
      const itemData = item.system;
      let roll, label, apply;
      switch (actionTypeId) {
        case "usedice1":
          roll = itemData.checkformula1 + "+" + itemData.checkbase1;
          label = item.name + " (" + itemData.label1 + ")";
          apply = itemData.applycheck1;
          break;
        case "usedice2":
          roll = itemData.checkformula2 + "+" + itemData.checkbase2;
          label = item.name + " (" + itemData.label2 + ")";
          apply = itemData.applycheck2;
          break;
        case "usedice3":
          roll = itemData.checkformula3 + "+" + itemData.checkbase3;
          label = item.name + " (" + itemData.label3 + ")";
          apply = itemData.applycheck3;
          break;
      }
      const dataset = { roll, label, apply };
      await onRoll(dataset, actor);
    }

    /**
     * Handle skillcheck action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleSkillCheckAction(event, actor, actionId) {
      const [checkabi, itemId] = actionId.split("-");
      const actorData = actor.system;
      let item = {};
      if (itemId == "advLevel") {
        let dex = actorData.abilities.dex.advbase;
        let agi = actorData.abilities.agi.advbase;
        let str = actorData.abilities.str.advbase;
        let vit = actorData.abilities.vit.advbase;
        let int = actorData.abilities.int.advbase;
        let mnd = actorData.abilities.mnd.advbase;
        item = {
          name: game.i18n.localize("SW25.Attributes.Advlevel"),
          system: {
            skillbase: {
              dex,
              agi,
              str,
              vit,
              int,
              mnd,
            },
          },
        };
      } else {
        item = await actor.items.get(itemId);
      }
      const itemData = item.system;

      let rolldata = "2d6+" + itemData.skillbase[checkabi];
      let abilityName = checkabi.charAt(0).toUpperCase() + checkabi.slice(1);
      let labeldata =
        item.name +
        "+" +
        game.i18n.localize("SW25.Ability." + abilityName + ".long") +
        game.i18n.localize("SW25.Ability.Bonus");

      const dataset = {
        roll: rolldata,
        label: labeldata,
        apply: "-",
      };
      await onRoll(dataset, actor);
    }

    /**
     * Handle battle action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleBattleAction(event, actor, actionId) {
      const actorData = actor.system;
      let rolldata, labeldata, pt, apply;
      switch (actionId) {
        case "hit":
          rolldata = actorData.itemhitformula + "+" + actorData.itemhitbase;
          labeldata =
            actorData.itemname +
            " (" +
            game.i18n.localize("SW25.Item.Weapon.Hit") +
            ")";
          apply = "-";
          break;
        case "power":
          rolldata = actorData.itempowerformula;
          labeldata =
            actorData.itemname +
            " (" +
            game.i18n.localize("SW25.Item.Power") +
            ")";
          pt = actorData.itempowertable;
          apply = "on";
          break;
        case "dodge":
          rolldata = "2d6+" + actorData.dodgebase;
          labeldata = game.i18n.localize("SW25.Item.Armor.Dodge");
          apply = "-";
          break;
      }
      const dataset = {
        roll: rolldata,
        label: labeldata,
        pt,
        apply,
      };

      if (actionId == "power") await onPowerRoll(dataset, actor);
      else await onRoll(dataset, actor);
    }
    /**
     * Handle magicpower action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleMagicPowerAction(event, actor, actionId) {
      const spelltype = actionId.split("-")[0];
      const actorData = actor.system;
      let rolldata, labeldata, pt, apply;
      switch (spelltype) {
        case "sorcerer":
          rolldata = "2d6+" + actorData.attributes.scpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Sorcerer");
          apply = "-";
          break;
        case "conjurer":
          rolldata = "2d6+" + actorData.attributes.cnpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Conjurer");
          apply = "-";
          break;
        case "wizard":
          rolldata = "2d6+" + actorData.attributes.wzpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Wizard");
          apply = "-";
          break;
        case "priest":
          rolldata = "2d6+" + actorData.attributes.prpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Priest");
          apply = "-";
          break;
        case "magitech":
          rolldata = "2d6+" + actorData.attributes.mtpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Magitech");
          apply = "-";
          break;
        case "fairy":
          rolldata = "2d6+" + actorData.attributes.frpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Fairy");
          apply = "-";
          break;
        case "druid":
          rolldata = "2d6+" + actorData.attributes.drpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Druid");
          apply = "-";
          break;
        case "daemon":
          rolldata = "2d6+" + actorData.attributes.dmpower;
          labeldata = game.i18n.localize("SW25.Item.Spell.Daemon");
          apply = "-";
          break;
      }
      const dataset = {
        roll: rolldata,
        label: labeldata,
        pt,
        apply,
      };

      await onRoll(dataset, actor);
    }

    /**
     * Handle resource action
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #handleResourceAction(event, actor, actionId) {
      const [manage, itemId] = actionId.split("-");
      const item = await actor.items.get(itemId);
      const itemData = item.system;
      let quantity;
      if (manage == "decrease") {
        quantity = itemData.quantity - 1;
      }
      if (manage == "increase") {
        quantity = itemData.quantity + 1;
      }
      await item.update({ "system.quantity": quantity });
    }

    /**
     * Toggle Effect
     * @private
     * @param {object} event    The event
     * @param {object} actor    The actor
     * @param {string} actionId The action id
     */
    async #toggleEffect(event, actor, actionId) {
      const effects =
        "find" in actor.effects.entries ? actor.effects.entries : actor.effects;
      let effect = effects.find((effect) => effect.id === actionId);

      // only allow deletion if effect is directly on this actor
      let internalEffect = true;

      // if the effect isn't directly on the actor, search all applicable effects for it
      if (!effect) {
        internalEffect = false;
        for (const e of actor.allApplicableEffects()) {
          if (e.id === actionId) {
            effect = e;
          }
        }
      }

      if (!effect) return;

      const isRightClick = this.isRightClick(event);

      if (isRightClick && internalEffect) {
        await effect.delete();
      } else {
        await effect.update({ disabled: !effect.disabled });
      }

      Hooks.callAll("forceUpdateTokenActionHud");
    }
  };
});

/**
 * Copied system functions
 **/

// _onRoll function
async function onRoll(dataset, actor) {
  // Handle rolls that supply the formula directly.
  if (dataset.roll) {
    const rollData = actor.getRollData();

    let roll = new Roll(dataset.roll, rollData);
    await roll.evaluate();

    let label = dataset.label ? `${dataset.label}` : "";

    let chatData = {
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: label,
      rollMode: game.settings.get("core", "rollMode"),
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      rolls: [roll],
    };

    let chatCritical = null;
    let chatFumble = null;
    if (roll.terms[0].total == 12) chatCritical = 1;
    if (roll.terms[0].total == 2) chatFumble = 1;

    let chatapply = dataset.apply;
    chatData.flags = {
      total: roll.total,
      apply: chatapply,
    };

    chatData.content = await renderTemplate(
      "systems/sw25/templates/roll/roll-check.hbs",
      {
        formula: roll.formula,
        tooltip: await roll.getTooltip(),
        critical: chatCritical,
        fumble: chatFumble,
        total: roll.total,
        apply: chatapply,
      }
    );

    ChatMessage.create(chatData);

    return roll;
  }
}

// _onPowerRoll function
async function onPowerRoll(dataset, actor) {
  const formula = dataset.roll;
  const powertable = dataset.pt;

  let roll = await game.sw25.powerRoll(formula, powertable);

  const chatLabel = `${dataset.label}`;
  let cValueFormula = "@" + roll.cValue;
  let halfFormula = "";
  let lethalTechFormula = "";
  let criticalRayFormula = "";
  let pharmToolFormula = "";
  let powupFormula = "";
  if (roll.cValue == 100) cValueFormula = "@13";
  if (roll.halfPow == 1) halfFormula = "h+" + roll.halfPowMod;
  if (roll.lethalTech != 0) lethalTechFormula = "#" + roll.lethalTech;
  if (roll.criticalRay > 0) criticalRayFormula = "$+" + roll.criticalRay;
  else if (roll.criticalRay != 0) criticalRayFormula = "$" + roll.criticalRay;
  if (roll.pharmTool != 0) pharmToolFormula = "tf" + roll.pharmTool;
  if (roll.powup != 0) powupFormula = "r" + roll.powup;

  let chatFormula =
    "k" +
    roll.power +
    cValueFormula +
    "+" +
    roll.powMod +
    lethalTechFormula +
    criticalRayFormula +
    pharmToolFormula +
    powupFormula +
    halfFormula;

  let chatPower = roll.power;
  let chatLethalTech = null;
  let chatCriticalRay = null;
  let chatPharmTool = null;
  let chatPowup = null;
  let chatResult = roll.eachPowerResult;
  let chatMod = roll.powMod;
  let chatHalf = null;
  let chatResults = roll.rawPowerResult;
  let chatTotal = roll.powerResult;
  let chatExtraRoll = null;
  let chatFumble = null;
  if (roll.halfPow == 1) chatHalf = roll.halfPowMod;
  if (roll.lethalTech != 0) chatLethalTech = roll.lethalTech;
  if (roll.criticalRay != 0) chatCriticalRay = roll.criticalRay;
  if (roll.pharmTool != 0) chatPharmTool = roll.pharmTool;
  if (roll.powup != 0) chatPowup = roll.powup;
  if (roll.rollCount > 0) chatExtraRoll = roll.rollCount;
  if (roll.fumble == 1) chatFumble = roll.fumble;

  let chatData = {
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: chatLabel,
    rollMode: game.settings.get("core", "rollMode"),
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    rolls: [roll.fakeResult],
  };

  let showhalf = true;
  let shownoc = true;
  if (roll.halfPow == 1) {
    showhalf = false;
    shownoc = false;
  }
  if (roll.cValue == 100 || chatExtraRoll == null) shownoc = false;
  let chatapply = dataset.apply;

  chatData.flags = {
    formula: chatFormula,
    tooltip: await roll.fakeResult.getTooltip(),
    power: chatPower,
    lethalTech: chatLethalTech,
    criticalRay: chatCriticalRay,
    pharmTool: chatPharmTool,
    powup: chatPowup,
    result: chatResult,
    mod: chatMod,
    half: chatHalf,
    results: chatResults,
    total: chatTotal,
    extraRoll: chatExtraRoll,
    fumble: chatFumble,
    orghalf: roll.halfPowMod,
    orgtotal: chatTotal,
    orgextraRoll: chatExtraRoll,
    showhalf: showhalf,
    shownoc: shownoc,
    apply: chatapply,
  };

  chatData.content = await renderTemplate(
    "systems/sw25/templates/roll/roll-power.hbs",
    {
      formula: chatFormula,
      tooltip: await roll.fakeResult.getTooltip(),
      power: chatPower,
      lethalTech: chatLethalTech,
      criticalRay: chatCriticalRay,
      pharmTool: chatPharmTool,
      powup: chatPowup,
      result: chatResult,
      mod: chatMod,
      half: chatHalf,
      results: chatResults,
      total: chatTotal,
      extraRoll: chatExtraRoll,
      fumble: chatFumble,
      showhalf: showhalf,
      shownoc: shownoc,
      apply: chatapply,
    }
  );

  ChatMessage.create(chatData);

  return roll;
}

// _onApplyEffect function
async function onApplyEffect(actor, actionId) {
  const item = actor.items.get(actionId);
  const orgActor = actor.name;
  const targetEffects = item.effects;
  const targetActorName = [];
  const transferEffectName = [];
  const targetedToken = game.user.targets;
  if (targetedToken.size === 0) {
    ui.notifications.warn(game.i18n.localize("SW25.Notargetwarn"));
    return;
  }

  // Target Actor
  const targetActors = [];
  targetedToken.forEach((token) => {
    targetActors.push(token.actor);

    // Actor name stock for chat message
    const actorName = token.actor.name;
    targetActorName.push({ actorName });
  });

  // Effect name stock for chat message
  targetEffects.forEach((effect) => {
    const effectName = effect.name;
    transferEffectName.push({ effectName });
  });

  // Apply
  const targetTokens = game.user.targets;
  const targetTokenId = Array.from(targetTokens, (target) => target.id);
  if (game.user.isGM) {
    targetActors.forEach((targetActor) => {
      targetEffects.forEach((effect) => {
        const transferEffect = duplicate(effect);
        transferEffect.disabled = false;
        transferEffect.sourceName = orgActor;
        targetActor.createEmbeddedDocuments("ActiveEffect", [transferEffect]);
      });
    });
  } else {
    game.socket.emit("system.sw25", {
      method: "applyEffect",
      targetTokens: targetTokenId,
      targetEffects: targetEffects,
      orgActor: orgActor,
    });
  }

  // Chat message
  const speaker = ChatMessage.getSpeaker({ actor: actor });
  let label = game.i18n.localize("SW25.Effectslong");
  let chatActorName = "";
  let chatEffectName = "";

  for (let i = 0; i < targetActorName.length; i++) {
    chatActorName += ">>> " + targetActorName[i].actorName + "<br>";
  }
  for (let i = 0; i < transferEffectName.length; i++) {
    chatEffectName += transferEffectName[i].effectName + "<br>";
  }

  let chatData = {
    speaker: speaker,
    flavor: label,
  };
  chatData.content = await renderTemplate(
    "systems/sw25/templates/roll/effect-apply.hbs",
    {
      targetActorName: chatActorName,
      transferEffectName: chatEffectName,
    }
  );

  ChatMessage.create(chatData);
}
