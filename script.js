document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const originSelect = document.querySelector('#origin-select');
  const vitalityInput = document.querySelector('#vitality');
  const enduranceInput = document.querySelector('#endurance');
  const strengthInput = document.querySelector('#strength');
  const skillInput = document.querySelector('#skill');
  const bloodtingeInput = document.querySelector('#bloodtinge');
  const arcaneInput = document.querySelector('#arcane');

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
          //most common starting case
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

  // Set initial health value
  updateHealth();
  updateStamina();

  // Add event listener to update health on vitality change
  vitalityInput.addEventListener('input', updateHealth);
  // Add event listener to update stamina on endurance change
    enduranceInput.addEventListener('input', updateStamina);
});