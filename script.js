document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements setting up the initial stats and being able to update them
  const originSelect = document.querySelector('#origin-select');
  const vitalityInput = document.querySelector('#vitality');
  const enduranceInput = document.querySelector('#endurance');
  const strengthInput = document.querySelector('#strength');
  const skillInput = document.querySelector('#skill');
  const bloodtingeInput = document.querySelector('#bloodtinge');
  const arcaneInput = document.querySelector('#arcane');
//Origin stats for the starting classes
  const originStats = {
    "Lone Survivor":      { vitality: 14, endurance: 11, strength: 11, skill: 10, bloodtinge: 7, arcane: 7 },
    "Milktoast":          { vitality: 9, endurance: 10, strength: 12, skill: 8, bloodtinge: 7, arcane: 5 },
    "Noble Scion":        { vitality: 7, endurance: 8, strength: 9, skill: 13, bloodtinge: 14, arcane: 9 },
    "Cruel Fate":         { vitality: 10, endurance: 12, strength: 10, skill: 9, bloodtinge: 5, arcane: 14 },
    "Violent Past":       { vitality: 12, endurance: 11, strength: 15, skill: 9, bloodtinge: 6, arcane: 7 },
    "Professional":       { vitality: 9, endurance: 12, strength: 9, skill: 15, bloodtinge: 7, arcane: 8 },
    "Military Veteran":   { vitality: 10, endurance: 10, strength: 14, skill: 13, bloodtinge: 7, arcane: 6 },
    "Waste of Skin":      { vitality: 10, endurance: 9, strength: 10, skill: 9, bloodtinge: 7, arcane: 9 },
    "Troubled Childhood": { vitality: 9, endurance: 14, strength: 9, skill: 13, bloodtinge: 6, arcane: 9 }
  };
//ensure no stats can go above 99
  function setMinMaxAttributes(stats) {
    vitalityInput.min = stats.vitality;
    vitalityInput.max = 99;
    enduranceInput.min = stats.endurance;
    enduranceInput.max = 99;
    strengthInput.min = stats.strength;
    strengthInput.max = 99;
    skillInput.min = stats.skill;
    skillInput.max = 99;
    bloodtingeInput.min = stats.bloodtinge;
    bloodtingeInput.max = 99;
    arcaneInput.min = stats.arcane;
    arcaneInput.max = 99;
  }
//update stats based on user input
  function updateStatsForOrigin() {
    const selectedOrigin = originSelect.value;
    const stats = originStats[selectedOrigin];

    if (stats) {
      // Set the input values and the minimum/maximum values
      vitalityInput.value = stats.vitality;
      enduranceInput.value = stats.endurance;
      strengthInput.value = stats.strength;
      skillInput.value = stats.skill;
      bloodtingeInput.value = stats.bloodtinge;
      arcaneInput.value = stats.arcane;

      setMinMaxAttributes(stats);
    }
  }

  function enforceMinMaxValue(input) {
    input.addEventListener('input', function() {
      if (parseInt(input.value) < parseInt(input.min)) {
        input.value = input.min; // Enforce the minimum value
      }
      if (parseInt(input.value) > parseInt(input.max)) {
        input.value = input.max; // Enforce the maximum value
      }
    });
  }

  // Enforce the minimum and maximum values on all inputs
  [vitalityInput, enduranceInput, strengthInput, skillInput, bloodtingeInput, arcaneInput].forEach(input => {
    enforceMinMaxValue(input);
  });

  // Update stats when the origin is changed
  originSelect.addEventListener('change', function() {
    updateStatsForOrigin();
  });

  // Initialize the stats for the default selected origin
  if (originSelect && originSelect.value) {
    updateStatsForOrigin();
  }
 
  const hpDisplay = document.getElementById('HP');
  const staminaDisplay = document.getElementById('Stamina');
  const discoveryDisplay = document.getElementById('discovery');
  //variable to manipulate the displayed right hand attack for weapon 1
  const weapon1RightHandAttackDisplay = document.getElementById("rAttack1");
  const weapon2RightHandAttackDisplay = document.getElementById("rAttack2");
  const weapon1LeftHandAttackDisplay = document.getElementById("lAttack1");
  const weapon2LeftHandAttackDisplay = document.getElementById("lAttack2");
    
  // Health calculation based on vitality
  function calculateHealth(vitality) {
      const HPchange = [20, 21, 21, 21, 22, 22, 21, 23, 16, 21, 23,25,26,28,28,29,30,30,32, 31,33,32,34,23,24, //32
                       23,23,23,23,22,22,21,21,21,20,20,19,19,18,16,16,15,11,8,9,9,9,9,9,9,9,9,8,9,9,9,8,9,9,  //66
                       8,9,8,9,8,9,8,9,8,8,9,8,8,8,9,8,8,8,8,8,7,8,8,7,8,7,8,7,7,7,7,6,6];                     //99
      var calculatedHealth = 511;
      //base case for lowest possible vitality value
      if(vitality == 7){
          calculatedHealth = 511;
          return calculatedHealth;
      }
          //all other cases
    if (vitality > 7) {
        loopCount = vitality - 7;
        for(let i =0; i< loopCount; i++){
            calculatedHealth += HPchange[i];
        }
        return calculatedHealth;
    }

  }
    
function calculateStamina(endurance){
    const staminaChange = [2,1,2,2,2,1,2,2,2,2,2,2,2,3,2,2,2,3,2,3,2,2,3,3,2,3,2,3,3,2,3,3, //soft cap at 40
                          0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,      //46,52,58,64,70 
                          0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1];       //76,82,88,94,99
    var calculatedStamina = 88;
    if (endurance == 8){
        calculatedStamina = 88;
        return calculatedStamina;
    }
    if (endurance > 8){
        loopCountEndurance = endurance - 8;
        for (let i=0; i< loopCountEndurance; i++){
            calculatedStamina += staminaChange[i];
        }
        return calculatedStamina;
    }
  }

  function calculateDiscovery(arcane) {
    var calculatedDiscovery = 100;
    const discoveryChange = [3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,4,3,3,3,3,3,4,2,2,2,2,2,2,2,2,2,2,2,1,2,3,2,2,2,2,1]; // levels 9 to 50 
    //min case
    if (arcane < 9) {
      return calculatedDiscovery;
    }
    // max case
    if (arcane >=50){
      calculatedDiscovery = 209;
      return calculatedDiscovery;
    }
    if (arcane >= 9 && arcane < 50){
      loopCountArcane = arcane - 8;
      for (let i=0; i < loopCountArcane; i++){
        calculatedDiscovery += discoveryChange[i];
      }
      return calculatedDiscovery;
    }
  }

//functions to update derived values
  function updateHealth() {
    const vitality = parseInt(vitalityInput.value); // Get vitality
    const health = calculateHealth(vitality);
    hpDisplay.textContent = health; // Update the HP display
  }
    function updateStamina(){
    const endurance = parseInt(enduranceInput.value); // Get endurance
    const stamina = calculateStamina(endurance);
    staminaDisplay.textContent = stamina; // Update the stamina display
    }
  function updateDiscovery(){
    const arcane = parseInt(arcaneInput.value);
    const discovery = calculateDiscovery(arcane);
    discoveryDisplay.textContent = discovery;
  }

  // Set initial health value
  updateHealth();
  updateStamina();

  // Add event listener to update health on vitality change
  vitalityInput.addEventListener('input', updateHealth);
  // Add event listener to update stamina on endurance change
  enduranceInput.addEventListener('input', updateStamina);
  // Add event listener to update item discovery on arcane change
  arcaneInput.addEventListener('input', updateDiscovery);

//////////////////////////////////////////////////This section handles the weapon select////////////////////////////////////////////////////////

//constructor for the weapon class
class Weapon {
  constructor(name, baseDamageByLevel, scalingByLevel, statRequirements) {
    this.name = name;
    this.baseDamageByLevel = baseDamageByLevel;
    this.scalingByLevel = scalingByLevel;
    this.statRequirements = statRequirements;
  }

meetsRequirements() {
  const strength = parseInt(strengthInput.value);
  const skill = parseInt(skillInput.value);
  const arcane = parseInt(arcaneInput.value);
  console.log("Stat Requirements:", this.statRequirements);
  //console.log("Player Stats:", stats);
  return (
    strength >= this.statRequirements.strength &&
    skill >= this.statRequirements.skill &&
    arcane >= this.statRequirements.arcane
  );
  }
}

function calculateAR() {
  //Attack Rating = Base Damage + (Base Damage * Attribute Scaling Ratio * Attribute Rating)
  const upgradeLevelR1 = document.getElementById("upgradeLevelRightWeapon1");
  const equippedWeaponR1 = document.getElementById("rhand1-select");
  console.log('rhand1Select:', rhand1Select);
  const baseDamage = equippedWeaponR1.baseDamage[upgradeLevelR1];
  const scaling = equippedWeaponR1.scaling[upgradeLevelR1];
  var strengthAttributeRating = this.strengthAttributeRating;
  console.log('Base Damage:', baseDamage); // Debugging: Output the base damage
  console.log('Scaling:', scaling); // Debugging: Output the scaling values
  console.log('Stats:', stats); // Debugging: Output the stats

  if (!baseDamage || !scaling) {
      console.error('Invalid upgrade level:', upgradeLevel);
      return 0; // Return 0 or an appropriate fallback value
  }

  //get the attribute rating, not sure on the best place way to do this but this will have to do
  //attribute scaling for strength
  if (stats.strength == 1 && stats.strength <= 10){
    strengthAttributeRating = stats.strength*0.005
  }
  if (stats.strength > 10 && stats.strength <= 25){
    strengthAttributeRating = 0.05 + (stats.strength - 10)*0.03;
    console.log("strength atttribute is", strengthAttributeRating);
  }
  if (stats.strength > 25 && stats.strength <= 50){
    strengthAttributeRating = 0.5 + (stats.strength - 25)*0.014;
    console.log("strength atttribute is", strengthAttributeRating);
  } 
  if (stats.strength > 50){
    strengthAttributeRating = 0.85 + (stats.strength-50)*0.00306;
    console.log("strength atttribute is", strengthAttributeRating);
  }
  const strengthBonus = stats.strength * scaling.strength*strengthAttributeRating;
  const skillBonus = stats.skill * scaling.skill;
  const arcaneBonus = stats.arcane * scaling.arcane;

  console.log('Strength Bonus:', strengthBonus); // Debugging: Output the strength bonus
  console.log('Skill Bonus:', skillBonus); // Debugging: Output the skill bonus
  console.log('Arcane Bonus:', arcaneBonus); // Debugging: Output the arcane bonus

  const totalAR = baseDamage.physical + strengthBonus + skillBonus + baseDamage.arcane + arcaneBonus;

  console.log('Total AR:', totalAR); // Debugging: Output the total AR

  return totalAR;
}

const weaponData = {
  sawCleaver: {
    name: 'Saw Cleaver',
    sawCleaverBaseDamage : {
      0: { physical: 90, arcane: 0 },
      1: { physical: 99, arcane: 0 },
      2: { physical: 108, arcane: 0 },
      3: { physical: 117, arcane: 0 },
      4: { physical: 126, arcane: 0 },
      5: { physical: 135, arcane: 0 },
      6: { physical: 144, arcane: 0 },
      7: { physical: 153, arcane: 0 },
      8: { physical: 162, arcane: 0 },
      9: { physical: 171, arcane: 0 },
      10: { physical: 180, arcane: 0 }
      // Continue for all levels
    },
    sawCleaverScaling : {
      0: { strength: 0.40, skill: 0.2, arcane: 0.33 },
      1: { strength: 0.42, skill: 0.22, arcane: 0.35 },
      2: { strength: 0.44, skill: 0.24, arcane: 0.37 },
      3: { strength: 0.46, skill: 0.26, arcane: 0.39 },
      4: { strength: 0.48, skill: 0.28, arcane: 0.41 },
      5: { strength: 0.50, skill: 0.30, arcane: 0.44 },
      6: { strength: 0.52, skill: 0.32, arcane: 0.46 },
      7: { strength: 0.54, skill: 0.34, arcane: 0.48 },
      8: { strength: 0.56, skill: 0.36, arcane: 0.40 },
      9: { strength: 0.58, skill: 0.38, arcane: 0.52 },
      10: { strength: 0.60, skill: 0.40, arcane: 0.55 }
      // Continue for all levels
    },
    statRequirements: {strength: 9, skill:9, arcane: 0} //I have changed this for editing 20 is not required.
  },
  noWeapon : {
    name: 'No Weapon',
    sawCleaverBaseDamage : {
      0: { physical: 90, arcane: 0 },
      1: { physical: 99, arcane: 0 },
      2: { physical: 108, arcane: 0 },
      3: { physical: 117, arcane: 0 },
      4: { physical: 126, arcane: 0 },
      5: { physical: 135, arcane: 0 },
      6: { physical: 144, arcane: 0 },
      7: { physical: 153, arcane: 0 },
      8: { physical: 162, arcane: 0 },
      9: { physical: 171, arcane: 0 },
      10: { physical: 180, arcane: 0 }
      // Continue for all levels
    },
    sawCleaverScaling : {
      0: { strength: 0.40, skill: 0.2, arcane: 0.33 },
      1: { strength: 0.42, skill: 0.22, arcane: 0.35 },
      2: { strength: 0.44, skill: 0.24, arcane: 0.37 },
      3: { strength: 0.46, skill: 0.26, arcane: 0.39 },
      4: { strength: 0.48, skill: 0.28, arcane: 0.41 },
      5: { strength: 0.50, skill: 0.30, arcane: 0.44 },
      6: { strength: 0.52, skill: 0.32, arcane: 0.46 },
      7: { strength: 0.54, skill: 0.34, arcane: 0.48 },
      8: { strength: 0.56, skill: 0.36, arcane: 0.40 },
      9: { strength: 0.58, skill: 0.38, arcane: 0.52 },
      10: { strength: 0.60, skill: 0.40, arcane: 0.55 }
      // Continue for all levels
    },
    statRequirements: {strength: 9, skill:9, arcane: 0} //I have changed this for editing 20 is not required.
  }
}


  // Define available weapons
 // Define available weapons
 const rightHandWeapons = [
  { id: 'noWeapon', name: 'No Weapon' },
  { id: 'sawCleaver', name: 'Saw Cleaver' },
  { id: 'hunterAxe', name: 'Hunter Axe' },
  { id: 'threadedCane', name: 'Threaded Cane' },
  { id: 'ludwigHolyBlade', name: 'Ludwig\'s Holy Blade' }
];

const leftHandWeapons = [
  { id: 'noWeapon', name: 'No Weapon' },
  { id: 'hunterPistol', name:'Hunter pistol'},
  {id: 'hunterBlunderbuss', name:'Hunter Blunderbuss'}

];

// Get dropdown elements
const rhand1Select = document.getElementById('rhand1-select');
const rhand2Select = document.getElementById('rhand2-select');
const lhand1Select = document.getElementById('lhand1-select');
const lhand2Select = document.getElementById('lhand2-select');

// Function to populate weapon options
function populateWeaponOptions() {
  // Get selected weapons
  const selectedRhand1 = rhand1Select.value;
  const selectedRhand2 = rhand2Select.value;
  const selectedLhand1 = lhand1Select.value;
  const selectedLhand2 = lhand2Select.value;

  // Clear current options
  rhand1Select.innerHTML = '';
  rhand2Select.innerHTML = '';
  lhand1Select.innerHTML = '';
  lhand2Select.innerHTML = '';

  // Function to create options
  function createRightOptions(excludeId, selectElement, selectedWeapon) {
      rightHandWeapons.forEach(weapon => {
          if (weapon.id !== excludeId || weapon.id === 'noWeapon') { // Exclude the weapon selected in the other dropdown
              const option = document.createElement('option');
              option.value = weapon.id;
              option.textContent = weapon.name;
              if (weapon.id === selectedWeapon) {
                  option.selected = true; // Keep the current selection
              }
              selectElement.appendChild(option);
          }
      });
  }

    // Function to create options
    function createLeftOptions(excludeId, selectElement, selectedWeapon) {
      leftHandWeapons.forEach(weapon => {
          if (weapon.id !== excludeId || weapon.id === 'noWeapon') { // Exclude the weapon selected in the other dropdown
              const option = document.createElement('option');
              option.value = weapon.id;
              option.textContent = weapon.name;
              if (weapon.id === selectedWeapon) {
                  option.selected = true; // Keep the current selection
              }
              selectElement.appendChild(option);
          }
      });
  }

  // Create options for right hand 1, excluding the weapon selected in right hand 2
  createRightOptions(selectedRhand2, rhand1Select, selectedRhand1);

  // Create options for right hand 2, excluding the weapon selected in right hand 1
  createRightOptions(selectedRhand1, rhand2Select, selectedRhand2);
    // Create options for right hand 1, excluding the weapon selected in right hand 2
    createLeftOptions(selectedLhand2, lhand1Select, selectedLhand1);

    // Create options for right hand 2, excluding the weapon selected in right hand 1
    createLeftOptions(selectedLhand1, lhand2Select, selectedLhand2);
}


function createWeaponInstance(weaponId) {
  const weaponInfo = weaponData[weaponId];

  if (!weaponInfo) {
    console.error("Weapon not found!");
    return null;
  }

  const weapon = new Weapon(
    weaponInfo.name,
    weaponInfo.baseDamageByLevel,
    weaponInfo.scalingByLevel,
    weaponInfo.statRequirements
  );

  const strengthCheck = parseInt(strengthInput.value);
  const skillCheck = parseInt(skillInput.value);
  const arcaneCheck = parseInt(arcaneInput.value);
  const statsCheck = { strengthCheck, skillCheck, arcaneCheck };
  console.log("Stats object:", statsCheck); // Debugging: log the stats object

  if (!weapon.meetsRequirements(statsCheck)) {
    console.warn(`${weapon.name} cannot be equipped. Stat requirements not met.`);
    return null;
  }

  return weapon;
}
// Function to handle weapon selection change
function handleWeaponChange() {
  populateWeaponOptions();
}
function handleWeaponSelect() {
  const weaponId = rhand1Select.value; // Get selected weapon ID from dropdown
  const upgradeLevel = document.getElementById('upgradeLevelRightWeapon1'); // Example upgrade level, can be dynamically set
  const weapon = createWeaponInstance(weaponId, upgradeLevel);

  if (weapon) {
    // Do something with the weapon instance
    console.log(`${weapon.name} has been equipped.`);
    console.log(`${weapon.sawCleaverBaseDamage} is the current base damage.`);
    console.log(`${weapon.sawCleaverScaling} is the current scaling.`);
  } else {
    console.log("Weapon not equipped due to unmet requirements or other issues.");
  }
}

// Add event listeners for when a weapon is selected
rhand1Select.addEventListener('change', handleWeaponSelect);
rhand2Select.addEventListener('change', handleWeaponSelect);
// Initialize options with "No Weapon" as default
populateWeaponOptions();

// Add event listeners to update options when selections change
rhand1Select.addEventListener('change', handleWeaponChange);
rhand2Select.addEventListener('change', handleWeaponChange);
lhand1Select.addEventListener('change', handleWeaponChange);
lhand2Select.addEventListener('change', handleWeaponChange);

// Add event listeners to update when upgrade level is chosen
upgradeLevelRightWeapon1.addEventListener('change', calculateAR());
////////////////////////////////////////////////////////Section below deals with AR calculations////////////////////////////////////////////////////////////////////////
//


function updateRightWeaponAttack1 ()  {
  const strength = parseInt(strengthInput.value);
  const skill = parseInt(skillInput.value);
  const arcane = parseInt(arcaneInput.value);
  const upgradeLevel = getElementById('upgradeLevelRightWeapon1');
  const stats = { strength, skill, arcane };

  // Calculate AR for Saw Cleaver at +2 upgrade level
  const totalAR = sawCleaver.calculateAR(upgradeLevel, stats);

  // Update the display with the calculated AR
  weapon1RightHandAttackDisplay.textContent = totalAR;
}

});
