let btnPlay = document.querySelector('.play');
let btnPause = document.querySelector('.pause');
let btnReload = document.querySelector('.reload');
let timerId = document.getElementById('timer');
let breakId = document.getElementById('break');
let minuteTimer = document.getElementById('m_timer');
let secondTimer = document.getElementById('s_timer');
let minuteBreak = document.getElementById('m_break');
let secondBreak = document.getElementById('s_break');
let start;
let countTimer = document.getElementById('countTimer');
let count = document.getElementById('count');
let pCount = document.getElementById('countTimer');
let inputTimerId = document.getElementById('inputTimer');
let inputBreakId = document.getElementById('inputBreak');
let btnInputTimer = document.querySelector('.btnInputTimer');
let btnInputBreak = document.querySelector('.btnInputBreak');

minuteTimer.innerText = 25;
secondTimer.innerText = '00';
minuteBreak.innerText = 5;
secondBreak.innerText = '01';

btnPlay.addEventListener('click', () => {
  if (start === undefined) {
    start = setInterval(initPomodoro, 1000);
    hide(btnPlay);
    show(btnPause);
  } else {
    alert('O pomodoro já iniciou');
  }
});

btnPause.addEventListener('click', () => {
  clearInterval(start);
  start = undefined;
  hide(btnPause);
  show(btnPlay);
});

btnReload.addEventListener('click', () => {
  minuteTimer.innerText = 25;
  secondTimer.innerText = '00';
  minuteBreak.innerText = 5;
  secondBreak.innerText = 1;
  document.getElementById('count').innerText = 0;
  clearInterval(start);
  hide(btnPause);
  show(btnPlay);
});

btnInputTimer.addEventListener('click', (event) => {
  event.preventDefault();
  if (inputTimerId.value != '' && inputTimerId.value > 0) {
    minuteTimer.innerText = inputTimerId.value;
    secondTimer.innerText = '00';
  } else if (inputTimerId.value <= 0) {
    alert('Insira um valor maior ou igual a 1');
  }
});

btnInputBreak.addEventListener('click', (event) => {
  event.preventDefault();
  if (inputBreakId.value != '' && inputBreakId.value > 0) {
    minuteBreak.innerText = inputBreakId.value;
    secondBreak.innerText = '00';
  } else if (inputBreakId.value <= 0) {
    alert('Insira um valor maior ou igual a 1');
  }
});

function initPomodoro() {
  // decrementa o tempo do Pomodoro
  if (secondTimer.innerText != 0) {
    secondTimer.innerText--;
  } else if (minuteTimer.innerText != 0 && secondTimer.innerText == 0) {
    secondTimer.innerText = 59;
    minuteTimer.innerText--;
  }

  // adiciona um zero nos segundos
  if (secondTimer.innerText < 10 && secondTimer.innerText >= 0) {
    secondTimer.innerText = `0${secondTimer.innerText}`;
  }

  // decrementa o tempo do Break
  if (minuteTimer.innerText == 0 && secondTimer.innerText == 0) {
    hide(timerId);
    show(breakId);
    if (secondBreak.innerText != 0) {
      secondBreak.innerText--;
    } else if (minuteBreak != 0 && secondBreak.innerText == 0) {
      secondBreak.innerText = 59;
      minuteBreak.innerText--;
    }
    // adiciona um zero no segundos
    if (secondBreak.innerText < 10 && secondBreak.innerText >= 0) {
      secondBreak.innerText = `0${secondBreak.innerText}`;
    }
  }

  // Quando os Pomodoro e Break zerarem, inicia novamente e adiciona no contador
  if (
    minuteTimer.innerText == 0 &&
    secondTimer.innerText == 0 &&
    minuteBreak.innerText == 0 &&
    secondBreak.innerText == 0
  ) {
    minuteTimer.innerText = inputTimerId.value != '' ? inputTimerId.value : 25;
    secondTimer.innerText = '00';
    minuteBreak.innerText = inputBreakId.value != '' ? inputTimerId.value : 5;
    secondBreak.innerText = '00';

    if (count.innerText > 1) {
      show(countTimer);
      pCount.innerText = ' Completados';
    }

    +count.innerText++;
    show(countTimer);
    hide(breakId);
    show(timerId);
  }
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}
