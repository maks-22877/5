// Список із 10 можливих клавіш
const availableKeys = ['a', 's', 'm', 'f', 'g', 'n', 'j', 'r', 'l', 'q'];

let activeKeyIndex = 0;

const symbolDisplay = document.getElementById('target-symbol');
const newGameBtn = document.getElementById('restart-btn');

// Оновлення відображення поточної клавіші
function updateKeyDisplay() {
  symbolDisplay.textContent = availableKeys[activeKeyIndex].toUpperCase();
}

// Запуск нової гри
function resetGame() {
  activeKeyIndex = Math.floor(Math.random() * availableKeys.length);
  updateKeyDisplay();
  
  PNotify.info({
    text: 'Гру перезапущено! Спробуйте вгадати нову клавішу.',
    delay: 2000
  });
}

// Обробник події keydown (перевірка натиснутої клавіші)
window.addEventListener('keydown', (event) => {
  const pressedKey = event.key.toLowerCase();
  const expectedKey = availableKeys[activeKeyIndex];

  if (pressedKey === expectedKey) {
    PNotify.success({
      text: 'Правильно! Чудова робота.',
      delay: 1500
    });

    // Перехід до наступної клавіші
    activeKeyIndex = (activeKeyIndex + 1) % availableKeys.length;
    updateKeyDisplay();
  } else {
    PNotify.error({
      text: `Помилка! Ви натиснули "${event.key}", а потрібно "${expectedKey.toUpperCase()}".`,
      delay: 1500
    });
  }
});

// Обробник події keypress (скасування дій за замовчуванням)
window.addEventListener('keypress', (event) => {
  event.preventDefault();
});

// Обробник для кнопки "Нова гра"
newGameBtn.addEventListener('click', resetGame);

// Початкова ініціалізація
updateKeyDisplay();