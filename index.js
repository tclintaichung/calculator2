const div = document.querySelectorAll('div');
const nav = document.querySelector('nav');
const divc = document.querySelector('#divc');
let cmds = "";

div.forEach((elem) => {
  elem.addEventListener('mouseover', (event) => {
    elem.style.background = "blue";
  });
  elem.addEventListener('mouseout', (event) => {
    if (elem.innerHTML === 'CE' || elem.innerHTML === 'AC') {
      elem.style.background = "red";
    } else {
      elem.style.background = "black";
    }
  });
  elem.addEventListener('click', (event) => {
    const cmd = event.target.innerHTML;
    if (cmd === 'AC') {
      cmds = "";
      event.target.innerHTML = 'CE';
    } else if (cmd === 'CE') {
      cmds = cmds.substring(0, cmds.length - 1);
    } else {
      cmds = cmds + cmd;
    }
    if (cmd === '=') {
      cmds += compute(cmds);
      divc.innerHTML = 'AC';
    }
    nav.innerHTML = cmds;
  });
});

function compute(cmds) {
  const operators = [];
  const operants = [];
  for (let i = 0; i < cmds.length; i++) {
    if (cmds[i] === '+' || cmds[i] === '-' || cmds[i] === '*' || cmds[i] === '/') {
      operators.push([i, cmds[i]]);
    }
  }
  let preIndex = 0;
  let index = 0;
  for (let i = 0; i < operators.length ; i++) {
    index = operators[i][0];
    operants.push(Number(cmds.slice(preIndex, index)));
    preIndex = index + 1;
  };
  operants.push(Number(cmds.slice(index+1, cmds.length - 1)));

  let result = 0;
  let noOper = operators.filter( oper => oper[1] === '*' || oper[1] === '/');
  while (noOper.length > 0) {
    for (let i = 0; i < operators.length; i++) {
      if (operators[i][1] === '*') {
        result = operants[i] * operants[i+1];
        operants.splice(i, 2, result);
        operators.splice(i, 1);
        break;
      } else if (operators[i][1] === '/') {
        result = operants[i] / operants[i+1];
        operants.splice(i, 2, result);
        operators.splice(i, 1);
        break;
      } 
    };
    noOper = operators.filter( oper => oper[1] === '*' || oper[1] === '/');
  }
  let j = 0;
  result = operants[j];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i][1] === '+') {
      j++;
      result += operants[j];
    } else if (operators[i][1] === '-') {
      j++;
      result -= operants[j];
    } 
  };
  return result.toFixed(3);
}