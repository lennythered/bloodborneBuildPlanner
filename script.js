document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements setting up the initial stats and being able to update them
  const originSelect = document.querySelector('#origin-select');
  const vitalityInput = document.querySelector('#vitality');
  const enduranceInput = document.querySelector('#endurance');
  const strengthInput = document.querySelector('#strength');
  const skillInput = document.querySelector('#skill');
  const bloodtingeInput = document.querySelector('#bloodtinge');
  const arcaneInput = document.querySelector('#arcane');
  const insightInput = document.querySelector('#insight');
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
    insightInput.min = 0;
    insightInput.max = 99;
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
  [vitalityInput, enduranceInput, strengthInput, skillInput, bloodtingeInput, arcaneInput, insightInput].forEach(input => {
    enforceMinMaxValue(input);
  });

  // Update stats when the origin is changed
  originSelect.addEventListener('change', function() {
    updateStatsForOrigin();
    calculateAR();
    calculateHealth();
    calculateStamina();
    calculateDiscovery();
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
      let roundednextLevel = Math.round(nextLevel);
      nextLevelDisplay.textContent = roundednextLevel;
    }
  }
//update the physical defense based on player level. This stat seems to have fairly random behaviour at lower levels
 function updatePhysicalDefense () {
  const level = updateLevel();
  const physicalDefenseArray = 
    [13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83, 86, 88, 91, 94, 97,
     100, 103, 106, 109, 112, 115, 117, 120, 123, 126, 129, 132, 134, 137, 140, 143, 145, 148, 151, 153, 156, 158, 161, 164, 166, 168, 171, 173, 175,
     178, 180, 181, 182, 183, 184, 185, 187, 188, 189, 190, 191, 192, 194, 195, 196, 197, 198, 199, 201, 202, 203, 204, 205, 206, 207, 208, 209, 211,
     212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 228, 229, 230, 231, 232, 232, 233, 234, 235, 236, 237, 238, 239, 240,
     241, 242, 243, 244, 244, 245, 246, 247, 248, 249, 249, 250, 251, 252, 252, 253, 254, 254, 255, 255, 255, 255, 255, 255, 255, 255, 255, 256, 256,
     256, 256, 256, 256, 256, 256, 256, 257, 257, 257, 257, 257, 257, 257, 257, 257, 258, 258, 258, 258, 258, 258, 258, 258, 258, 259, 259, 259, 259,
     259, 259, 259, 259, 259, 260, 260, 260, 260, 260, 260, 260, 260, 260, 261, 261, 261, 261, 261, 261, 261, 261, 261, 262, 262, 262, 262, 262, 262,
     262, 262, 262, 263, 263, 263, 263, 263, 263, 263, 263, 263, 264, 264, 264, 264, 264, 264, 264, 264, 264, 265, 265, 265, 265, 265, 265, 265, 265,
     265, 266, 266, 266, 266, 266, 266, 266, 266, 266, 267, 267, 267, 267, 267, 267, 267, 267, 267, 268, 268, 268, 268, 268, 268, 268, 268, 268, 269,
     269, 269, 269, 269, 269, 269, 269, 269, 270, 270, 270, 270, 270, 270, 270, 270, 270, 271, 271, 271, 271, 271, 271, 271, 271, 271, 272, 272, 272,
     272, 272, 272, 272, 272, 272, 273, 273, 273, 273, 273, 273, 273, 273, 273, 274, 274, 274, 274, 274, 274, 274, 274, 274, 275, 275, 275, 275, 275,
     275, 275, 275, 275, 276, 276, 276, 276, 276, 276, 276, 276, 276, 277, 277, 277, 277, 277, 277, 277, 277, 277, 278, 278, 278, 278, 278, 278, 278,
     278, 278, 279, 279, 279, 279, 279, 279, 279, 279, 279, 280, 280, 280, 280, 280, 280, 280, 280, 280, 281, 281, 281, 281, 281, 281, 281, 281, 281,
     282, 282, 282, 282, 282, 282, 282, 282, 282, 283, 283, 283, 283, 283, 283, 283, 283, 283, 284, 284, 284, 284, 284, 284, 284, 284, 284, 285, 285,
     285, 285, 285, 285, 285, 285, 285, 286, 286, 286, 286, 286, 286, 286, 286, 286, 287, 287, 287, 287, 287, 287, 287, 287, 287, 288, 288, 288, 288,
     288, 288, 288, 288, 288, 289, 289, 289, 289, 289, 289, 289, 289, 289, 290, 290, 290, 290, 290, 290, 290, 290, 290, 291, 291, 291, 291, 291, 291,
     291, 291, 291, 292, 292, 292, 292, 292, 292, 292, 292, 292, 293, 293, 293, 293, 293, 293, 293, 293, 293, 294, 294, 294, 294, 294, 294, 294, 294,
     294, 295, 295, 295, 295, 295, 295, 295, 295, 295, 296, 296, 296, 296, 296, 296, 296, 296, 296, 297, 297, 297, 297, 297, 297, 297, 297, 297, 298,
     298, 298, 298, 298, 298, 298, 298, 298, 299, 299, 299, 299, 299];

                                
   if (level == 4 || level < 11){
    var calculatedPhysicalDefense = 10;
    physicalDefenseDisplay.textContent = calculatedPhysicalDefense;
   }
   else if (level >= 11){
    var levelOffset = level -11;
    calculatedPhysicalDefense = physicalDefenseArray[levelOffset];
    physicalDefenseDisplay.textContent = calculatedPhysicalDefense;
   }
 }
 function calculateSlowPoisonRes () {
  endurance = parseInt(enduranceInput.value);
  slowPoisonResistanceArray = 
     [25, 27, 30, 36, 42, 48, 54, 60, 62, 65, 68, 70, 73, 76, 78, 81, 84, 86, 89, 92, 94, 97, 100, 100, 101, 102, 102, 103, 104,
     105, 105, 106, 107, 107, 108, 109, 110, 110, 111, 112, 113, 113, 114, 115, 115, 116, 117, 118, 118, 119, 120, 121, 121, 122, 123, 124, 124, 125, 126,
     126, 127, 127, 128, 129, 130, 131, 131, 132, 133, 134, 134, 135, 136, 136, 137, 138, 139, 139, 140, 141, 142, 142, 143, 144, 144, 145, 146, 147, 147,
     148, 149, 150];
   const levelOffset = endurance - 8;
    const calculatedPoisonRes = slowPoisonResistanceArray[levelOffset];
   slowPoisonDefenseDisplay.textContent = calculatedPoisonRes;
 }

 function calculateRapidPoisonRes () {
  endurance = parseInt(enduranceInput.value);
  const rapidPoisonResistanceArray = 
  [33, 36, 40, 44, 48, 52, 56, 60, 62, 65, 68, 70, 73, 76, 78, 81, 84, 86, 89, 92, 94, 97, 100, 100, 101, 102, 102, 103, 104, 105, 105, 106, 107, 107, 108,
     109, 110, 110, 111, 112, 113, 113, 114, 115, 115, 116, 117, 118, 118, 119, 120, 121, 121, 122, 123, 124, 124, 125, 126, 126, 127, 127, 128, 129, 130,
      131, 131, 132, 133, 134, 134, 135, 136, 136, 137, 138, 139, 139, 140, 141, 142, 142, 143, 144, 144, 145, 146, 147, 147, 148, 149, 150];
   const levelOffset = endurance - 8;
   const calculatedPoisonRes = rapidPoisonResistanceArray[levelOffset];
   rapidPoisonDefenseDisplay.textContent = calculatedPoisonRes;
 }

 function calculateFrenzyRes (){
  let insight = insightInput.value;
  const frenzyResArray = [97, 94, 92, 89, 86, 84, 81, 78, 76, 73, 70, 68, 65, 62, 60, 58, 57, 56, 54, 53, 52, 50, 49, 48, 46, 45, 44, 42, 41, 40, 38, 37, 36,
     34, 33, 32, 30, 29, 28, 26, 25, 24, 22, 21, 20, 19, 19, 19, 18, 18, 18, 18, 17, 17, 17, 17, 16, 16, 16, 16, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 13,
      12, 12, 12, 12, 11, 11, 11, 11, 10, 10, 10, 10];
  if (insight <= 15){
    var frenzyRes = 100;
    frenzyResDisplay.textContent = frenzyRes;
  }
  else if (insight >= 16){
    levelOffset = insight - 16;
    var frenzyRes = frenzyResArray[levelOffset];
    frenzyResDisplay.textContent = frenzyRes;
  }
 }

 function calculateBeastHood () {
  beastHoodArray = [300, 291, 282, 274, 265, 256, 248, 239, 230,222,213,204,196,
    187,178,170, 165, 160, 156, 151, 146, 142, 137, 132, 128, 123,
    118, 114, 109, 104, 100, 97, 94, 91, 88, 85, 82, 79, 76, 73,
    70, 67, 64, 61, 58, 55, 51, 49, 45, 43, 40, 37, 34, 31, 28,
    25, 22, 19, 16, 13, 10, 9,9,9,9,9,9,9,8,8,8,8,8,8,8,8,7,7,7,7,
    7,7,7,7,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5];
    const beastHoodArrayIndex = insightInput.value;
    const beastHood = beastHoodArray[beastHoodArrayIndex];
    beastHoodDisplay.textContent = beastHood;
 }

  //displays for attributes 
  const beastHoodDisplay = document.getElementById('beastHood');
  const frenzyResDisplay = document.getElementById('frenzyRes');
  const nextLevelDisplay = document.getElementById('amountForNextLevel');
  const levelDisplay = document.getElementById('level');
  const hpDisplay = document.getElementById('HP');
  const staminaDisplay = document.getElementById('Stamina');
  const discoveryDisplay = document.getElementById('discovery');
  const physicalDefenseDisplay = document.getElementById("physicalDef");
  const slowPoisonDefenseDisplay = document.getElementById("slowPoisonRes");
  const rapidPoisonDefenseDisplay = document.getElementById("rapidPoisonRes");
  const physicalAmountDisplay = document.getElementById("physicalAmount");
  const vsBluntDisplay = document.getElementById("vsBlunt");
  const vsThrustDisplay = document.getElementById("vsThrust");
  const bloodDefDisplay = document.getElementById("bloodDef");
  const arcaneDefDisplay = document.getElementById("arcaneDef");
  const fireDefDisplay = document.getElementById("fireDef");
  const boltDefDisplay = document.getElementById("boltDef");
    
  //variable to manipulate the displayed right hand attack for weapon 1
  const weapon1RightHandAttackDisplay = document.getElementById("rAttack1");
  const weapon2RightHandAttackDisplay = document.getElementById("rAttack2");
  const weapon1LeftHandAttackDisplay = document.getElementById("lAttack1");
  const weapon2LeftHandAttackDisplay = document.getElementById("lAttack2");
    
  // Health calculation based on vitality
  function calculateHealth() {
    const vitality = parseInt(vitalityInput.value);
      const HPArray =
       [511,530, 552, 573, 594, 616, 638, 659, 682, 698, 719, 742, 767, 793, 821, 849, 878, 908, 938, 970,
         1001, 1034, 1066, 1100, 1123, 1147, 1170, 1193, 1216, 1239, 1261, 1283, 1304, 1325, 1346, 1366,
          1386, 1405, 1424, 1442, 1458, 1474, 1489, 1500, 1508, 1517, 1526, 1535, 1544, 1553, 1562, 1571,
           1580, 1588, 1597, 1606, 1615, 1623, 1632, 1641, 1649, 1658, 1666, 1675, 1683, 1692, 1700, 1709,
            1717, 1725, 1734, 1742, 1750, 1758, 1767, 1775, 1783, 1791, 1799, 1807, 1814, 1822, 1830, 1837,
             1845, 1852, 1860, 1867, 1874, 1881, 1888, 1894, 1900];                     //99
       levelOffset = vitality - 7;
       const hp = HPArray[levelOffset];
       hpDisplay.textContent = hp;
  }
    
function calculateStamina(){
  const selectedSlot1 = slot1Select.value;
  const selectedSlot2 = slot2Select.value;
  const selectedSlot3 = slot3Select.value;
  endurance = parseInt(enduranceInput.value);
    const staminaArray = 
    [88,90, 91, 93, 95, 97, 98, 100, 102, 104, 106, 108, 110, 112, 115, 117, 119, 121, 124,
    126, 129, 131, 133, 136, 139, 141, 144, 146, 149, 152, 154, 157, 160, 160, 160, 160, 160, 160, 161, 161,
    161, 161, 161, 161, 162, 162, 162, 162, 162, 162, 163, 163, 163, 163, 163, 163, 164, 164, 164, 164, 164,
    164, 165, 165, 165, 165, 165, 165, 166, 166, 166, 166, 166, 166, 167, 167, 167, 167, 167, 167, 168, 168,
    168, 168, 168, 168, 169, 169, 169, 169, 169, 170];    
          levelOffset = endurance -8;    
    var calculatedStamina = staminaArray[levelOffset]
    const isStaminaRune = 
    (selectedSlot1 === 'antiClockwiseMetamorphosis1') || (selectedSlot2 === 'antiClockwiseMetamorphosis1') || (selectedSlot3 === 'antiClockwiseMetamorphosis1') ||
    (selectedSlot1 === 'antiClockwiseMetamorphosis2') || (selectedSlot2 === 'antiClockwiseMetamorphosis2') || (selectedSlot3 === 'antiClockwiseMetamorphosis2') ||
    (selectedSlot1 === 'antiClockwiseMetamorphosis3') || (selectedSlot2 === 'antiClockwiseMetamorphosis3') || (selectedSlot3 === 'antiClockwiseMetamorphosis3');
    console.log("stamina rune status ", isStaminaRune);
    
    if (isStaminaRune){
      let staminaMultiplier = 1.0;  // Start with a base multiplier of 1.0 (no change)

      // Check each selected slot and apply the multiplicative stamina bonus
      if (selectedSlot1 === 'antiClockwiseMetamorphosis1') staminaMultiplier *= 1.10;  // +10% stamina
      if (selectedSlot1 === 'antiClockwiseMetamorphosis2') staminaMultiplier *= 1.15;  // +15% stamina
      if (selectedSlot1 === 'antiClockwiseMetamorphosis3') staminaMultiplier *= 1.20;  // +20% stamina
  
      if (selectedSlot2 === 'antiClockwiseMetamorphosis1') staminaMultiplier *= 1.10;
      if (selectedSlot2 === 'antiClockwiseMetamorphosis2') staminaMultiplier *= 1.15;
      if (selectedSlot2 === 'antiClockwiseMetamorphosis3') staminaMultiplier *= 1.20;
  
      if (selectedSlot3 === 'antiClockwiseMetamorphosis1') staminaMultiplier *= 1.10;
      if (selectedSlot3 === 'antiClockwiseMetamorphosis2') staminaMultiplier *= 1.15;
      if (selectedSlot3 === 'antiClockwiseMetamorphosis3') staminaMultiplier *= 1.20;
      const staminaBonusPercentage = (staminaMultiplier - 1) * 100;
      calculatedStamina = calculatedStamina*staminaMultiplier;
      staminaDisplay.textContent = calculatedStamina;
      console.log("Total Stamina Bonus: " + staminaBonusPercentage.toFixed(2) + "%");
    }
    else {
    staminaDisplay.textContent = calculatedStamina;
    }
    }
  function calculateDiscovery() {
    arcane = parseInt(arcaneInput.value);
    const discoveryArray =
     [103, 106, 109, 112, 115, 118, 121, 124, 127, 131, 134, 137, 140, 143, 146, 150, 153,
      156, 159, 162, 165, 169, 171, 173, 175, 177, 179, 181, 183, 185, 187, 189, 191, 192,
      194, 197, 199, 201, 203, 205, 206];
    //min case
    if (arcane < 9) {
      const discovery = 100;
      discoveryDisplay.textContent = discovery;
    }
    // max case
    if (arcane >=50){
      const discovery = 209;
      discoveryDisplay.textContent = discovery;
    }
    if (arcane >= 9 && arcane < 50){
      const leveloffset = arcane - 9;
      var discovery = discoveryArray[leveloffset];
      discoveryDisplay.textContent = discovery;
    }
  }

  //insight input listner
  insightInput.addEventListener('input', function(){
    calculateBeastHood ();
    calculateFrenzyRes();
  });
  // Add event listener to update health on vitality change
  vitalityInput.addEventListener('input', function () {
    calculateHealth();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
  });
  // Add event listener to update stamina on endurance change
  enduranceInput.addEventListener('input', function () {
    calculateStamina();
    updateLevel();
    echosForNextLevel();
    updatePhysicalDefense();
    calculateSlowPoisonRes ();
    calculateRapidPoisonRes (); 
  });
  // Add event listener to update item discovery on arcane change
  arcaneInput.addEventListener('input', function () {
    calculateDiscovery();
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
  let totalARR1 = damageAtLevelR1 + ( damageAtLevelR1*strengthBonusR1 + damageAtLevelR1*skillBonusR1);
  let roundedARR1 = Math.round(totalARR1);
  weapon1RightHandAttackDisplay.textContent = roundedARR1;

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
  let roundedARR2 = Math.round(totalARR2);
  weapon2RightHandAttackDisplay.textContent = roundedARR2;

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
    let roundedARL1 = Math.round(totalARL1);
    weapon1LeftHandAttackDisplay.textContent = roundedARL1;
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
    let roundedARL1 = Math.round(totalARL1);
    weapon1LeftHandAttackDisplay.textContent = roundedARL1;
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
      let roundedARL2 = Math.round(totalARL2);
      weapon2LeftHandAttackDisplay.textContent = roundedARL2;
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
      let roundedARL2 = Math.round(totalARL2);
      weapon2LeftHandAttackDisplay.textContent = roundedARL2;
    }
}

////////////////////////////////////////Below deals with clothing and clothing defense reduction////////////////////////////////////////////////
class Attire {
  constructor(id, name, flatDefense, hiddenMultiplyer) {
    this.id = id;
    this.name = name;
    this.flatDefense = flatDefense;
    this.hiddenMultiplyer = hiddenMultiplyer;
  }
}

const attireData = {
  naked: new Attire('naked', "Naked", {
      physical: 0, blunt: 0, thrust: 0, blood: 0, arcane: 0, fire: 0, bolt: 0
    },
    {  
      physical: 1, blunt: 1, thrust: 1, blood: 1, arcane: 1, fire: 1, bolt: 1
    }
  ),
  hunterHat: new Attire('hunterHat', "Hunter Hat", {
      physical: 50, blunt: 50, thrust: 40, blood: 50, arcane: 20, fire: 50, bolt: 30
    },
    {  
      physical: 0.95, blunt: 0.95, thrust: 0.96, blood: 0.95, arcane: 0.98, fire: 0.95, bolt: 0.97
    }
  ),
  hunterGarb: new Attire('hunterGarb', "Hunter Garb", {
      physical: 110, blunt: 100, thrust: 80, blood: 110, arcane: 40, fire: 110, bolt: 70
    },
    {  
      physical: 0.89, blunt: 0.90, thrust: 0.92, blood: 0.89, arcane: 0.96, fire: 0.89, bolt: 0.93
    }
  ),
  hunterTrousers: new Attire('hunterTrousers', "Hunter Trousers", {
      physical: 60, blunt: 60, thrust: 50, blood: 60, arcane: 50, fire: 60, bolt: 50
    },
    {  
      physical: 0.94, blunt: 0.94, thrust: 0.95, blood: 0.94, arcane: 0.95, fire: 0.94, bolt: 0.95
    }
  ),
  hunterGloves: new Attire('hunterGloves', "Hunter Gloves", {
      physical: 50, blunt: 50, thrust: 50, blood: 50, arcane: 40, fire: 60, bolt: 50
    },
    {  
      physical: 0.95, blunt: 0.95, thrust: 0.95, blood: 0.95, arcane: 0.96, fire: 0.94, bolt: 0.95
    }
  )
};

function putOnHat (){
  const hatSelected = document.getElementById("head");
  const hatValues = hatSelected.value;
  const hat = attireData[hatValues];
  return hat;
}

function putOnShirt (){
   const chestSelected = document.getElementById("chest");
   const chestValues = chestSelected.value;
   const chest = attireData[chestValues];
   return chest;
 }

 function putOnGloves (){
   const gloveSelected = document.getElementById("hands");
   const gloveValues = gloveSelected.value;
   const gloves = attireData[gloveValues];
   console.log("gloves value is ", gloves.hiddenMultiplyer);
   return gloves;
 }

 function putOnPants (){
   const pantsSelected = document.getElementById("legs");
   const pantsValues = pantsSelected.value;
   const pants = attireData[pantsValues];
   return pants;
 }

function calculateClothingDefense (){
    // clothing physical defense stacks multiplicitively and is based on the formula:
    // 1000*(1 -(headHiddenMulitplier*chestHiddenMultiplier*glovesHiddenMultiplier*legsHiddenMultiplier*runes multiplier))
    // this also inclues runes
  const head = putOnHat();
  const chest = putOnShirt();
  const gloves = putOnGloves();
  const pants = putOnPants();
  //physical
  const headHiddenMultiplierPhys = head.hiddenMultiplyer.physical;
  const chestHiddenMultiplierPhys = chest.hiddenMultiplyer.physical;
  const glovesHiddenMultiplierPhys = gloves.hiddenMultiplyer.physical;
  const pantsHiddenMultiplierPhys = pants.hiddenMultiplyer.physical;
  let physicalReduction = (1000*(1-(headHiddenMultiplierPhys*chestHiddenMultiplierPhys*glovesHiddenMultiplierPhys*pantsHiddenMultiplierPhys)));
  let physicalReductionRounded = Math.floor(physicalReduction);
  physicalAmountDisplay.textContent = physicalReductionRounded;

  //blunt
  const headHiddenMultiplierBlunt = head.hiddenMultiplyer.blunt;
  const chestHiddenMultiplierBlunt = chest.hiddenMultiplyer.blunt;
  const glovesHiddenMultiplierBlunt = gloves.hiddenMultiplyer.blunt;
  const pantsHiddenMultiplierBlunt = pants.hiddenMultiplyer.blunt;
  let bluntReduction = (1000*(1-(headHiddenMultiplierBlunt*chestHiddenMultiplierBlunt*glovesHiddenMultiplierBlunt*pantsHiddenMultiplierBlunt)));
  let bluntReductionRounded = Math.floor(bluntReduction);
  vsBluntDisplay.textContent = bluntReductionRounded;

  //thurst
  const headHiddenMultiplierThrust = head.hiddenMultiplyer.thrust;
  const chestHiddenMultiplierThrust = chest.hiddenMultiplyer.thrust;
  const glovesHiddenMultiplierThrust = gloves.hiddenMultiplyer.thrust;
  const pantsHiddenMultiplierThrust = pants.hiddenMultiplyer.thrust;
  let thrustReduction = (1000*(1-(headHiddenMultiplierThrust*chestHiddenMultiplierThrust*glovesHiddenMultiplierThrust*pantsHiddenMultiplierThrust)));
  let thrustReductionRounded = Math.floor(thrustReduction);
  vsThrustDisplay.textContent = thrustReductionRounded;

  //blood
  const headHiddenMultiplierBlood = head.hiddenMultiplyer.blood;
  const chestHiddenMultiplierBlood = chest.hiddenMultiplyer.blood;
  const glovesHiddenMultiplierBlood = gloves.hiddenMultiplyer.blood;
  const pantsHiddenMultiplierBlood = pants.hiddenMultiplyer.blood;
  let bloodReduction = (1000*(1-(headHiddenMultiplierBlood*chestHiddenMultiplierBlood*glovesHiddenMultiplierBlood*pantsHiddenMultiplierBlood)));
  let bloodReductionRounded = Math.floor(bloodReduction);
  bloodDefDisplay.textContent = bloodReductionRounded;

  //arcane
  const headHiddenMultiplierArcane = head.hiddenMultiplyer.arcane;
  const chestHiddenMultiplierArcane = chest.hiddenMultiplyer.arcane;
  const glovesHiddenMultiplierArcane = gloves.hiddenMultiplyer.arcane;
  const pantsHiddenMultiplierArcane = pants.hiddenMultiplyer.arcane;
  let arcaneReduction = (1000*(1-(headHiddenMultiplierArcane*chestHiddenMultiplierArcane*glovesHiddenMultiplierArcane*pantsHiddenMultiplierArcane)));
  let arcaneReductionRounded = Math.floor(arcaneReduction);
  arcaneDefDisplay.textContent = arcaneReductionRounded;

  //fire
  const headHiddenMultiplierFire = head.hiddenMultiplyer.fire;
  const chestHiddenMultiplierFire = chest.hiddenMultiplyer.fire;
  const glovesHiddenMultiplierFire = gloves.hiddenMultiplyer.fire;
  const pantsHiddenMultiplierFire = pants.hiddenMultiplyer.fire;
  let fireReduction = (1000*(1-(headHiddenMultiplierFire*chestHiddenMultiplierFire*glovesHiddenMultiplierFire*pantsHiddenMultiplierFire)));
  let fireReductionRounded = Math.floor(fireReduction);
  fireDefDisplay.textContent = fireReductionRounded;
  //bolt
  const headHiddenMultiplierBolt = head.hiddenMultiplyer.bolt;
  const chestHiddenMultiplierBolt = chest.hiddenMultiplyer.bolt;
  const glovesHiddenMultiplierBolt = gloves.hiddenMultiplyer.bolt;
  const pantsHiddenMultiplierBolt = pants.hiddenMultiplyer.bolt;
  let boltReduction = (1000*(1-(headHiddenMultiplierBolt*chestHiddenMultiplierBolt*glovesHiddenMultiplierBolt*pantsHiddenMultiplierBolt)));
  let boltReductionRounded = Math.floor(boltReduction);
  boltDefDisplay.textContent = boltReductionRounded;

}
const head = document.getElementById('head');
head.addEventListener('change', function () {
  putOnHat();
  calculateClothingDefense ();
} );
const chest = document.getElementById('chest');
chest.addEventListener('change', function () {
  putOnShirt();
  calculateClothingDefense ();
});
const hands = document.getElementById('hands');
hands.addEventListener('change', function() {
  putOnGloves();
  calculateClothingDefense ();
});
const legs = document.getElementById('legs');
legs.addEventListener('change', function() {
  putOnPants();
  calculateClothingDefense ();
});

  ///////////////////////////////////////////////////////////Runes/////////////////////////////////////////////////////////
// Example list of Caryll Runes
const caryllRunes = [
  { id: 'noRune', name: 'No Rune', effect: 'No effect' },
  { id: 'oedonWrithe', name: 'Oedon Writhe', effect: 'Grants additional Quicksilver Bullets from visceral attacks' },
  { id: 'antiClockwiseMetamorphosis1', name: 'Anti-Clockwise Metamorphosis (1)', effect: 'Boosts max stamina +10%	' },
  { id: 'antiClockwiseMetamorphosis2', name: 'Anti-Clockwise Metamorphosis (2)', effect: 'Boosts max stamina +15%	' },
  { id: 'antiClockwiseMetamorphosis3', name: 'Anti-Clockwise Metamorphosis (3)', effect: 'Boosts max stamina +20%	' },
  { id: 'heir', name: 'Heir', effect: 'Increases Blood Echoes gained from visceral attacks' },
  { id: 'clawmark', name: 'Clawmark', effect: 'Increases the damage of visceral attacks' },
  { id: 'moon', name: 'Moon', effect: 'Increases Blood Echoes from defeated enemies' },
  { id: 'bloodRapture', name: 'Blood Rapture', effect: 'Restores HP after visceral attacks' }

];

function updateRuneEffect() {
  const selectedSlot1 = slot1Select.value;
  const selectedSlot2 = slot2Select.value;
  const selectedSlot3 = slot3Select.value;

  const runeEffectElement1 = document.getElementById('runeEffect1');
  const runeEffectElement2 = document.getElementById('runeEffect2');
  const runeEffectElement3 = document.getElementById('runeEffect3');

  // Find the corresponding rune objects from the caryllRunes array
  const rune1 = caryllRunes.find(rune => rune.id === selectedSlot1);
  const rune2 = caryllRunes.find(rune => rune.id === selectedSlot2);
  const rune3 = caryllRunes.find(rune => rune.id === selectedSlot3);

  // Update the text content with the effect of the selected runes
  runeEffectElement1.textContent = rune1 ? rune1.effect : 'No effect';
  runeEffectElement2.textContent = rune2 ? rune2.effect : 'No effect';
  runeEffectElement3.textContent = rune3 ? rune3.effect : 'No effect';
}

function createRuneOptions(excludeIds, selectElement, selectedRune) {
  caryllRunes.forEach(rune => {
      if (!excludeIds.includes(rune.id) || rune.id === 'noRune') {
          const option = document.createElement('option');
          option.value = rune.id;
          option.textContent = rune.name;
          option.title = rune.effect; // Tooltip with the rune's effect
          if (rune.id === selectedRune) {
              option.selected = true;
          }
          selectElement.appendChild(option);
      }
  });

  // Update rune effect when selection changes
  selectElement.addEventListener('change', function() {
      updateRuneEffect();
  });
}

function populateRuneOptions() {
  const selectedSlot1 = slot1Select.value;
  const selectedSlot2 = slot2Select.value;
  const selectedSlot3 = slot3Select.value;

  slot1Select.innerHTML = '';
  slot2Select.innerHTML = '';
  slot3Select.innerHTML = '';

  createRuneOptions([selectedSlot2, selectedSlot3], slot1Select, selectedSlot1);
  createRuneOptions([selectedSlot1, selectedSlot3], slot2Select, selectedSlot2);
  createRuneOptions([selectedSlot1, selectedSlot2], slot3Select, selectedSlot3);
}

const slot1Select = document.getElementById('slot1');
const slot2Select = document.getElementById('slot2');
const slot3Select = document.getElementById('slot3');

populateRuneOptions();

slot1Select.addEventListener('change', function() { 
  populateRuneOptions();
  calculateStamina();
}
);
slot2Select.addEventListener('change', function() { 
  populateRuneOptions();
  calculateStamina();
}
);
slot3Select.addEventListener('change', function() { 
  populateRuneOptions();
  calculateStamina();
}
);




});
