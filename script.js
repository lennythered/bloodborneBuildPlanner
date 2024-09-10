document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements setting up the initial stats and being able to update them
  const originSelect = document.querySelector('#origin-select');
  const vitalityInput = document.querySelector('#vitality');
  const enduranceInput = document.querySelector('#endurance');
  const strengthInput = document.querySelector('#strength');
  const skillInput = document.querySelector('#skill');
  const bloodtingeInput = document.querySelector('#bloodtinge');
  const arcaneInput = document.querySelector('#arcane');
  const upgradeLevelR1 = document.querySelector('#upgradeLevelRightWeapon1');
  const upgradeLevelR2 = document.querySelector('#upgradeLevelRightWeapon2');
  const upgradeLevelL1 = document.querySelector('#upgradeLevelLeftWeapon1');
  const upgradeLevelL2 = document.querySelector('#upgradeLevelLightWeapon2');
//Origin stats for the starting classes
  const originStats = {
    "Lone Survivor":      { vitality: 14, endurance: 11, strength: 11, skill: 10, bloodtinge: 7, arcane: 7 },
    "Milktoast":          { vitality: 11, endurance: 10, strength: 12, skill: 10, bloodtinge: 9, arcane: 8 },
    "Noble Scion":        { vitality: 7, endurance: 8, strength: 9, skill: 13, bloodtinge: 14, arcane: 9 },
    "Cruel Fate":         { vitality: 10, endurance: 12, strength: 10, skill: 9, bloodtinge: 5, arcane: 14 },
    "Violent Past":       { vitality: 12, endurance: 11, strength: 15, skill: 9, bloodtinge: 6, arcane: 7 },
    "Professional":       { vitality: 9, endurance: 12, strength: 9, skill: 15, bloodtinge: 7, arcane: 8 },
    "Military Veteran":   { vitality: 10, endurance: 10, strength: 14, skill: 13, bloodtinge: 7, arcane: 6 },
    "Waste of Skin":      { vitality: 10, endurance: 9, strength: 10, skill: 9, bloodtinge: 7, arcane: 9 },
    "Troubled Childhood": { vitality: 9, endurance: 14, strength: 9, skill: 13, bloodtinge: 6, arcane: 9 }
  };

  const weaponData = {
    sawCleaver: {
      name: 'Saw Cleaver',
      baseDamageByLevel : {
        0: { physical: 90},
        1: { physical: 99},
        2: { physical: 108},
        3: { physical: 117},
        4: { physical: 126},
        5: { physical: 135},
        6: { physical: 144},
        7: { physical: 153},
        8: { physical: 162},
        9: { physical: 171},
        10: { physical: 180}
        // done
      },
      scalingByLevel : {
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
        // done
      },
      statRequirements: {strength: 9, skill:9, arcane: 0, bloodtinge: 0} 
    },
    noWeapon : {
      name: 'No Weapon',
      baseDamageByLevel : {
        0: { physical: 25, arcane: 0, blood: 0 },
        1: { physical: 25, arcane: 0, blood: 0  },
        2: { physical: 25, arcane: 0, blood: 0  },
        3: { physical: 25, arcane: 0, blood: 0  },
        4: { physical: 25, arcane: 0, blood: 0  },
        5: { physical: 25, arcane: 0, blood: 0  },
        6: { physical: 25, arcane: 0, blood: 0  },
        7: { physical: 25, arcane: 0, blood: 0  },
        8: { physical: 25, arcane: 0, blood: 0  },
        9: { physical: 25, arcane: 0, blood: 0  },
        10: { physical: 25, arcane: 0, blood: 0  }
        // Done
      },
      scalingByLevel : {
        0: { strength: 2, skill: 2, arcane: 0, bloodtine: 0 },
        1: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        2: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        3: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        4: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        5: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        6: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        7: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        8: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        9: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  },
        10: { strength: 2, skill: 2, arcane: 0, bloodtine: 0  }
        // done
      },
      statRequirements: {strength: 0, skill:0, arcane: 0, bloodtinge: 0} 
    },
    hunterAxe : {
      name: 'Hunter Axe',
      baseDamageByLevel : {
        0: { physical: 98, arcane: 0 },
        1: { physical: 107, arcane: 0 },
        2: { physical: 116, arcane: 0 },
        3: { physical: 125, arcane: 0 },
        4: { physical: 134, arcane: 0 },
        5: { physical: 143, arcane: 0 },
        6: { physical: 152, arcane: 0 },
        7: { physical: 161, arcane: 0 },
        8: { physical: 170, arcane: 0 },
        9: { physical: 179, arcane: 0 },
        10: { physical: 196, arcane: 0 }
        // done
      },
      scalingByLevel : {
        0: { strength: 0.45, skill: 0.15, arcane: 0.33 },
        1: { strength: 0.47, skill: 0.17, arcane: 0.35 },
        2: { strength: 0.49, skill: 0.19, arcane: 0.37 },
        3: { strength: 0.51, skill: 0.21, arcane: 0.39 },
        4: { strength: 0.53, skill: 0.23, arcane: 0.41 },
        5: { strength: 0.55, skill: 0.25, arcane: 0.44 },
        6: { strength: 0.57, skill: 0.27, arcane: 0.46 },
        7: { strength: 0.59, skill: 0.29, arcane: 0.48 },
        8: { strength: 0.61, skill: 0.31, arcane: 0.50 },
        9: { strength: 0.63, skill: 0.33, arcane: 0.52 },
        10: { strength: 0.65, skill: 0.35, arcane: 0.55 }
        // Continue for all levels
      },
      statRequirements: {strength: 9, skill:8, arcane: 0, bloodtinge: 0} 
    },
    threadedCane : {
      name: 'Threaded Cane',
      baseDamageByLevel : {
        0: { physical: 78, arcane: 0 },
        1: { physical: 85, arcane: 0 },
        2: { physical: 92, arcane: 0 },
        3: { physical: 99, arcane: 0 },
        4: { physical: 106, arcane: 0 },
        5: { physical: 113, arcane: 0 },
        6: { physical: 120, arcane: 0 },
        7: { physical: 127, arcane: 0 },
        8: { physical: 134, arcane: 0 },
        9: { physical: 141, arcane: 0 },
        10: { physical: 156, arcane: 0 }
        // done
      },
      scalingByLevel : {
        0: { strength: 0.19, skill: 0.6, arcane: 0.43 },
        1: { strength: 0.20, skill: 0.63, arcane: 0.45 },
        2: { strength: 0.21, skill: 0.66, arcane: 0.47 },
        3: { strength: 0.22, skill: 0.69, arcane: 0.50 },
        4: { strength: 0.23, skill: 0.72, arcane: 0.52 },
        5: { strength: 0.24, skill: 0.75, arcane: 0.54 },
        6: { strength: 0.25, skill: 0.78, arcane: 0.56 },
        7: { strength: 0.26, skill: 0.81, arcane: 0.58 },
        8: { strength: 0.27, skill: 0.84, arcane: 0.61 },
        9: { strength: 0.28, skill: 0.87, arcane: 0.63 },
        10: { strength: 0.29, skill: 0.90, arcane: 0.65 }
        // done
      },
      statRequirements: {strength: 7, skill:9, arcane: 0, bloodtinge: 0} 
      //done
    },
    ludwigHolyBlade : {
      name: 'Ludwig\'s Holy Blade',
      baseDamageByLevel : {
        0: { physical: 100, arcane: 0 },
        1: { physical: 110, arcane: 0 },
        2: { physical: 120, arcane: 0 },
        3: { physical: 130, arcane: 0 },
        4: { physical: 140, arcane: 0 },
        5: { physical: 150, arcane: 0 },
        6: { physical: 160, arcane: 0 },
        7: { physical: 170, arcane: 0 },
        8: { physical: 180, arcane: 0 },
        9: { physical: 190, arcane: 0 },
        10: { physical: 200, arcane: 0 }
        //done
      },
      scalingByLevel : {
        0: { strength: 0.50, skill: 0.40, arcane: 0.49 },
        1: { strength: 0.53, skill: 0.44, arcane: 0.53 },
        2: { strength: 0.56, skill: 0.48, arcane: 0.57 },
        3: { strength: 0.59, skill: 0.52, arcane: 0.61 },
        4: { strength: 0.62, skill: 0.56, arcane: 0.64 },
        5: { strength: 0.65, skill: 0.60, arcane: 0.68 },
        6: { strength: 0.68, skill: 0.64, arcane: 0.72 },
        7: { strength: 0.71, skill: 0.68, arcane: 0.76 },
        8: { strength: 0.74, skill: 0.72, arcane: 0.80 },
        9: { strength: 0.77, skill: 0.76, arcane: 0.84 },
        10: { strength: 0.80, skill: 0.80, arcane: 0.88 }
        //done
      },
      statRequirements: {strength: 16, skill:12, arcane: 0, bloodtinge: 0} 
      //done
    },
    hunterPistol : {
      name: 'Hunter pistol',
      baseDamageByLevel : {
        0: { blood: 70},
        1: { blood: 79},
        2: { blood: 88},
        3: { blood: 97},
        4: { blood: 106},
        5: { blood: 115},
        6: { blood: 124},
        7: { blood: 133},
        8: { blood: 142},
        9: { blood: 151},
        10: { blood: 160}
        // done
      },
      scalingByLevel : {
        0: { bloodtinge: 0.45 },
        1: { bloodtinge: 0.49 },
        2: { bloodtinge: 0.53  },
        3: { bloodtinge: 0.57 },
        4: { bloodtinge: 0.61 },
        5: { bloodtinge: 0.65 },
        6: { bloodtinge: 0.69 },
        7: { bloodtinge: 0.73  },
        8: { bloodtinge: 0.77  },
        9: { bloodtinge: 0.81 },
        10: { bloodtinge: 0.85  }
        // done
      },
      statRequirements: {strength: 7, skill:9, arcane: 0, bloodtinge: 5} 
      //done
    },
    //id: 'hunterBlunderbuss', name:'Hunter Blunderbuss'
    hunterBlunderbuss : {
      name: 'Hunter Blunderbuss',
      baseDamageByLevel : {
        0: { blood: 20},
        1: { blood: 22},
        2: { blood: 25},
        3: { blood: 27},
        4: { blood: 30},
        5: { blood: 32},
        6: { blood: 35},
        7: { blood: 37},
        8: { blood: 40},
        9: { blood: 42},
        10: { blood: 45}
        // not done
      },
      scalingByLevel : {
        0: { bloodtinge: 0.50 },
        1: { bloodtinge: 0.55 },
        2: { bloodtinge: 0.60  },
        3: { bloodtinge: 0.65 },
        4: { bloodtinge: 0.70 },
        5: { bloodtinge: 0.75 },
        6: { bloodtinge: 0.80 },
        7: { bloodtinge: 0.86  },
        8: { bloodtinge: 0.90  },
        9: { bloodtinge: 0.95 },
        10: { bloodtinge: 1.00  }
        // not done
      },
      statRequirements: {strength: 7, skill:9, arcane: 0, bloodtinge: 5} 
      //done
    }
  }
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
    calculateAR();
    updateHealth();
    updateStamina();
    updateDiscovery();
    updateLevel();
    echosForNextLevel()
  });

  // Initialize the stats for the default selected origin
  if (originSelect && originSelect.value) {
    updateStatsForOrigin();
  }
 
  function updateLevel(){
    //initial state
    const vitality = parseInt(vitalityInput.value);
    const endurance = parseInt(enduranceInput.value);
    const strength = parseInt(strengthInput.value);
    const skill = parseInt(skillInput.value);
    const blood = parseInt(bloodtingeInput.value);
    const arcane = parseInt(arcaneInput.value);
    totalAttributeSum = vitality + endurance + strength + skill + blood + arcane;
    if (originSelect.value != 'Waste of Skin'){
      const offset = 60;
      const baseLevel = 10
      const level = baseLevel + totalAttributeSum - offset
      levelDisplay.textContent = level;
      return level;
    }
    else {
      const offset = 54;
      const baseLevel = 4;
      const level = baseLevel + totalAttributeSum - offset
      levelDisplay.textContent = level;
      return level;
    }
    
  }

  function echosForNextLevel(){
    if (updateLevel() == 4){
      nextLevelDisplay.textContent = 724;
    }
    else if (updateLevel() == 5){
      nextLevelDisplay.textContent = 741;
    }
    else if (updateLevel() == 6){
      nextLevelDisplay.textContent = 758;
    }
    else if (updateLevel() == 7){
      nextLevelDisplay.textContent = 775;
    }
    else if (updateLevel() == 8){
      nextLevelDisplay.textContent = 793;
    }
    else if (updateLevel() == 9){
      nextLevelDisplay.textContent = 811;
    }
    else if (updateLevel() == 10){
      nextLevelDisplay.textContent = 829;
    }
    else if (updateLevel() == 11){
      nextLevelDisplay.textContent = 847;
    }
    else if (updateLevel() == 12){
      nextLevelDisplay.textContent = 1039;
    }
    else if (updateLevel() == 13){
      nextLevelDisplay.textContent = 1238;
    }
    else if (updateLevel() >= 14){
      var currentLevel = updateLevel() +1;
      var nextLevel = ((0.02*currentLevel**3) + (3.06*currentLevel**2) + (105.6*currentLevel) -895);
      nextLevelDisplay.textContent = nextLevel;
    }
  }
//update the physical defense based on player level. This stat seems to have fairly random behaviour at lower levels
 function updatePhysicalDefense () {
  const level = updateLevel();
  var calculatedPhysicalDefense = 10;
  const physicalDefenseArray = [3,3,3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,2,3,3,3,2,3,3,2,3,2,3,3,2,
                                2,3,2,2,3,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0, 
                                1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
                                1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0];
                                
   if (level == 4 || level < 11){
    physicalDefenseDisplay.textContent = calculatedPhysicalDefense;
   }
   else if (level >= 11){
    var loopCount = level -10;
    for (let i = 0; i < loopCount; i++){
      calculatedPhysicalDefense += physicalDefenseArray[i];
    }
    physicalDefenseDisplay.textContent = calculatedPhysicalDefense;
   }
 }
  //displays for attributes 
  const nextLevelDisplay = document.getElementById('amountForNextLevel');
  const levelDisplay = document.getElementById('level');
  const hpDisplay = document.getElementById('HP');
  const staminaDisplay = document.getElementById('Stamina');
  const discoveryDisplay = document.getElementById('discovery');
  const physicalDefenseDisplay = document.getElementById("physicalDef");
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
  vitalityInput.addEventListener('input', function () {
    updateHealth();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
  });
  // Add event listener to update stamina on endurance change
  enduranceInput.addEventListener('input', function () {
    updateStamina();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
  });
  // Add event listener to update item discovery on arcane change
  arcaneInput.addEventListener('input', function () {
     updateDiscovery();
     updateLevel();
     echosForNextLevel();
     updatePhysicalDefense();
  });
  // Event listener to update strength's effect on AR
  strengthInput.addEventListener('input', function () {
    calculateAR();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
});
  // event listener to update skill's effect on AR
  skillInput.addEventListener('input', function () {
    calculateAR();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
 });
  // event listener to update blood tinges effect on AR
  bloodtingeInput.addEventListener('input', function () {
    calculateAR();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
});




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
  const bloodtinge = parseInt(bloodtingeInput.value);
  //console.log("Stat Requirements:", this.statRequirements);
  //console.log("Player Stats:", stats);
  return (
    strength >= this.statRequirements.strength &&
    skill >= this.statRequirements.skill &&
    arcane >= this.statRequirements.arcane &&
    bloodtinge >= this.statRequirements.bloodtinge
  );
  }
}

  // Initialize the upgrade level on page load
  function initializeUpgradeLevel() {
    const upgradeLevel = getSelectedUpgradeLevel(); // Initialize with current value
  }

  // Event listener for when the upgrade level is changed
  document.getElementById('upgradeLevelRightWeapon1').addEventListener('change', () => {
    getSelectedUpgradeLevel(); // Trigger when the upgrade level is changed
  });

  // Run initialization when the page loads
  window.addEventListener('load', initializeUpgradeLevel);

function getSelectedUpgradeLevel() {
  const upgradeLevelSelect = document.getElementById('upgradeLevelRightWeapon1');
  const selectedValue = upgradeLevelSelect.value; // Get the string value
  const upgradeLevel = parseInt(selectedValue); // Convert to integer
  return upgradeLevel;
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
const upgradeLevelRightWeapon1 = document.getElementById('upgradeLevelRightWeapon1');
const upgradeLevelRightWeapon2 = document.getElementById('upgradeLevelRightWeapon2');
const upgradeLevelLeftWeapon1 = document.getElementById('upgradeLevelLeftWeapon1');
const upgradeLevelLeftWeapon2 = document.getElementById('upgradeLevelLeftWeapon2');

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
  //console.log("Stats object:", statsCheck); // Debugging: log the stats object

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
  const weaponIdR1 = rhand1Select.value;
  const weaponIdR2 = rhand2Select.value;
  const weaponIdL1 = lhand1Select.value;
  const weaponIdL2 = lhand2Select.value;
  //console.log('upgrade level is: ', upgradeLevel);
  const weaponR1 = createWeaponInstance(weaponIdR1);
  const weaponR2 = createWeaponInstance(weaponIdR2);
  const weaponL1 = createWeaponInstance(weaponIdL1);
  const weaponL2 = createWeaponInstance(weaponIdL2);
  //console.log('weapon data is: ', weapon);

  if (weaponR1 || weaponR2 || weaponL1 || weaponL2) {
    // Do something with the weapon instance
    console.log('weapon equipped in right hand 1 is: ', weaponR1);
    console.log('weapon equipped in right hand 2 is: ', weaponR2);
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

//update weapon damage when different weapon is selected
rhand1Select.addEventListener('change', calculateAR);
rhand2Select.addEventListener('change', calculateAR);
lhand1Select.addEventListener('change', calculateAR);
lhand2Select.addEventListener('change', calculateAR);
//update weapon damage when upgrade level is changed
upgradeLevelRightWeapon1.addEventListener('change', calculateAR);
upgradeLevelRightWeapon2.addEventListener('change', calculateAR);
upgradeLevelLeftWeapon1.addEventListener('change', calculateAR);
upgradeLevelLeftWeapon2.addEventListener('change', calculateAR);
// Add event listeners to update when upgrade level is chosen
//upgradeLevelRightWeapon1.addEventListener('change', calculateAR());


////////////////////////////////////////////////////////Section below deals with AR calculations////////////////////////////////////////////////////////////////////////
//

function calculateStrengthAttributeSaturation () {
  const strength = parseInt(strengthInput.value);
  //console.log('strength in strengthattribute sautration calculation is: ', strength);
  if (strength >= 1 && strength <= 10){
     return strength*0.005;
  }
  if (strength > 10 && strength <= 25){
    return (0.05 + (strength - 10)*0.03);
    //console.log("strength atttribute is", strengthAttributeRating);
  }
  if (strength > 25 && strength <= 50){
    return  (0.5 + (strength - 25)*0.014);
    //console.log("strength atttribute is", strengthAttributeRating);
  } 
  if (strength > 50){
    return  (0.85 + (strength-50)*0.00306);
    //console.log("strength atttribute is", strengthAttributeRating);
  }

}

function calculateSkillAttributeSaturation () {
  const skill = parseInt(skillInput.value);
 // console.log('Skill in skillattribute sautration calculation is: ', skill);
  if (skill >= 1 && skill <= 10){
     return skill*0.005;
  }
  if (skill > 10 && skill <= 25){
    return (0.05 + (skill - 10)*0.03);
    //console.log("strength atttribute is", strengthAttributeRating);
  }
  if (skill > 25 && skill <= 50){
    return (0.5 + (skill - 25)*0.014);
    //console.log("strength atttribute is", strengthAttributeRating);
  } 
  if (skill > 50){
    return (0.85 + (skill-50)*0.00306);
    //console.log("strength atttribute is", strengthAttributeRating);
  }

}

function calculateBloodtingeAttributeSaturation() {
  const bloodtinge = parseInt(bloodtingeInput.value);
  // console.log('Skill in skillattribute sautration calculation is: ', skill);
   if (bloodtinge >= 1 && bloodtinge <= 10){
      return bloodtinge*0.005;
   }
   if (bloodtinge > 10 && bloodtinge <= 25){
     return (0.05 + (bloodtinge - 10)*0.03);
     //console.log("strength atttribute is", strengthAttributeRating);
   }
   if (bloodtinge > 25 && bloodtinge <= 50){
     return (0.5 + (bloodtinge - 25)*0.014);
     //console.log("strength atttribute is", strengthAttributeRating);
   } 
   if (bloodtinge > 50){
     return (0.85 + (bloodtinge-50)*0.00306);
     //console.log("strength atttribute is", strengthAttributeRating);
   }
}

function calculateAR() {
    //attribute saturation
    const strengthAttributeSaturation = calculateStrengthAttributeSaturation();
    const skillAttributeSaturation = calculateSkillAttributeSaturation();
    const bloodtingeAttributeSaturation = calculateBloodtingeAttributeSaturation();
  // Right hand 1 weapon
  const weaponIdR1 = rhand1Select.value; // Get selected weapon ID from dropdown
  const weaponR1 = createWeaponInstance(weaponIdR1);
  var upgradeLevelR1 = parseInt(upgradeLevelRightWeapon1.value);
  const damageAtLevelR1 = weaponR1.baseDamageByLevel[upgradeLevelR1].physical;
  const scalingAtLevelR1 = weaponR1.scalingByLevel[upgradeLevelR1];
  const strengthScalingR1 = scalingAtLevelR1.strength;
  const skillScalingR1 = scalingAtLevelR1.skill;
  const strengthBonusR1 = strengthAttributeSaturation*strengthScalingR1;
  const skillBonusR1 = skillAttributeSaturation*skillScalingR1;
  const totalARR1 = damageAtLevelR1 + ( damageAtLevelR1*strengthBonusR1 + damageAtLevelR1*skillBonusR1);
  weapon1RightHandAttackDisplay.textContent = totalARR1;

  // Right hand 2 weapon
  const weaponIdR2 = rhand2Select.value; // Get selected weapon ID from dropdown
  const weaponR2 = createWeaponInstance(weaponIdR2);
  var upgradeLevelR2 = parseInt(upgradeLevelRightWeapon2.value);
  const damageAtLevelR2 = weaponR2.baseDamageByLevel[upgradeLevelR2].physical;
  const scalingAtLevelR2 = weaponR2.scalingByLevel[upgradeLevelR2];
  const strengthScalingR2 = scalingAtLevelR2.strength;
  const skillScalingR2 = scalingAtLevelR2.skill;
  const strengthBonusR2 = strengthAttributeSaturation*strengthScalingR2;
  const skillBonusR2 = skillAttributeSaturation*skillScalingR2;
  const totalARR2 = damageAtLevelR2 + ( damageAtLevelR2*strengthBonusR2 + damageAtLevelR2*skillBonusR2);
  weapon2RightHandAttackDisplay.textContent = totalARR2;

  // Left hand 1 weapon 
  const weaponIdL1 = lhand1Select.value; // Get selected weapon ID from dropdown
  const weaponL1 = createWeaponInstance(weaponIdL1);
  var upgradeLevelL1 = parseInt(upgradeLevelLeftWeapon1.value);
  if (weaponIdL1 != 'noWeapon'){
    const damageAtLevelL1 = weaponL1.baseDamageByLevel[upgradeLevelL1].blood;
    const scalingAtLevelL1 = weaponL1.scalingByLevel[upgradeLevelL1];
    const bloodScalingL1 = scalingAtLevelL1.bloodtinge;
    const bloodBonusL1 = bloodtingeAttributeSaturation*bloodScalingL1;
    const totalARL1 = damageAtLevelL1 + ( damageAtLevelL1*bloodBonusL1);
    weapon1LeftHandAttackDisplay.textContent = totalARL1;
  }
  //case if the weapon is no weapon 
  else if (weaponIdL1 == 'noWeapon'){
    const damageAtLevelL1 = weaponL1.baseDamageByLevel[upgradeLevelL1].physical;
    const scalingAtLevelL1 = weaponL1.scalingByLevel[upgradeLevelL1];
    const strengthScalingL1 = scalingAtLevelL1.strength;
    const skillScalingL1 = scalingAtLevelL1.skill;
    const strengthBonusL1 = strengthAttributeSaturation*strengthScalingL1;
    const skillBonusL1 = skillAttributeSaturation*skillScalingL1;
    const totalARL1 = damageAtLevelL1 + ( damageAtLevelL1*strengthBonusL1 + damageAtLevelL1*skillBonusL1);
    weapon1LeftHandAttackDisplay.textContent = totalARL1;
  }

    // Left hand 2 weapon 
    const weaponIdL2 = lhand2Select.value; // Get selected weapon ID from dropdown
    const weaponL2 = createWeaponInstance(weaponIdL2);
   // console.log("weapon in left slot 2 is: ", weaponL2);
    var upgradeLevelL2 = parseInt(upgradeLevelLeftWeapon2.value);
    if ((weaponIdL2) && weaponIdL2 != 'noWeapon'){
      const damageAtLevelL2 = weaponL2.baseDamageByLevel[upgradeLevelL2].blood;
      const scalingAtLevelL2 = weaponL2.scalingByLevel[upgradeLevelL2];
      const bloodScalingL2 = scalingAtLevelL2.bloodtinge;
      const bloodBonusL2 = bloodtingeAttributeSaturation*bloodScalingL2;
      const totalARL2 = damageAtLevelL2 + ( damageAtLevelL2*bloodBonusL2);
      weapon2LeftHandAttackDisplay.textContent = totalARL2;
    }
    //case if the weapon is no weapon 
    else if (weaponIdL2 == 'noWeapon'){
      const damageAtLevelL2 = weaponL2.baseDamageByLevel[upgradeLevelL2].physical;
      const scalingAtLevelL2 = weaponL2.scalingByLevel[upgradeLevelL2];
      const strengthScalingL2 = scalingAtLevelL2.strength;
      const skillScalingL2 = scalingAtLevelL2.skill;
      const strengthBonusL2 = strengthAttributeSaturation*strengthScalingL2;
      const skillBonusL2 = skillAttributeSaturation*skillScalingL2;
      const totalARL2 = damageAtLevelL2 + ( damageAtLevelL2*strengthBonusL2 + damageAtLevelL2*skillBonusL2);
      weapon2LeftHandAttackDisplay.textContent = totalARL2;
    }
 
  
}

});
