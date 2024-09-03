/*console.log('weapon loaded');

class Weapon {
  constructor(name, baseDamageByLevel, scalingByLevel) {
    this.name = name;
    this.baseDamageByLevel = baseDamageByLevel;
    this.scalingByLevel = scalingByLevel;
  }

  calculateAR(upgradeLevel, stats) {
    const baseDamage = this.baseDamageByLevel[upgradeLevel];
    const scaling = this.scalingByLevel[upgradeLevel];

    const strengthBonus = stats.strength * scaling.strength;
    const skillBonus = stats.skill * scaling.skill;
    const arcaneBonus = stats.arcane * scaling.arcane;

    const totalPhysicalAR = baseDamage.physical + strengthBonus + skillBonus;
    const totalArcaneAR = baseDamage.arcane + arcaneBonus;

    return totalPhysicalAR + totalArcaneAR;
  }
}

const sawCleaverBaseDamage = {
  0: { physical: 90, arcane: 0 },
  1: { physical: 110, arcane: 0 },
  2: { physical: 130, arcane: 0 },
  // Continue for all levels
};

const sawCleaverScaling = {
  0: { strength: 1.0, skill: 0.6, arcane: 0 },
  1: { strength: 1.1, skill: 0.65, arcane: 0 },
  2: { strength: 1.2, skill: 0.7, arcane: 0 },
  // Continue for all levels
};

//variable to manipulate the displayed right hand attack for weapon 1
const weapon1RightHandAttack = document.getElementById("rAttack1");
// Create a new weapon instance
const sawCleaver = new Weapon("Saw Cleaver", sawCleaverBaseDamage, sawCleaverScaling);

  // Get stats from HTML input fields
  const strength = parseInt(document.getElementById('strength').value);
  const skill = parseInt(document.getElementById('skill').value);
  const arcane = parseInt(document.getElementById('arcane').value);

  // Define player stats
  const stats = { strength, skill, arcane };

// Calculate AR for Saw Cleaver at +2 upgrade level
const totalAR = sawCleaver.calculateAR(2, stats);

strengthInput.addEventListener('input', calculateAR);
// Add event listener to update stamina on endurance change
skillInput.addEventListener('input', calculateAR);
// Add event listener to update item discovery on arcane change
arcaneInput.addEventListener('input', calculateAR);

console.log(`Total AR for ${sawCleaver.name} at +2: ${totalAR}`); */
