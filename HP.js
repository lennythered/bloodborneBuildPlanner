// script.js

document.addEventListener('DOMContentLoaded', function() {
  const vitalityInput = document.getElementById('vitality');
  const hpDisplay = document.getElementById('HP');

  // Example base health calculation based on vitality
  function calculateHealth(vitality) {
    return vitality * 10; // Example calculation: HP is 10 times the vitality
  }

  function updateHealth() {
    const vitality = parseInt(vitalityInput.value) || 300; // Get vitality or default to 0
    const health = calculateHealth(vitality);
    hpDisplay.textContent = health; // Update the HP display
  }

  // Set initial health value
  updateHealth();

  // Add event listener to update health on vitality change
  vitalityInput.addEventListener('input', updateHealth);
});
