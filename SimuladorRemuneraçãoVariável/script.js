function calcularComissao() {
    
    const porcentagemComissao = {
        vendedor: {
            pos: [0.155, 0.095, 0.025],
            controle: [0.105, 0.075, 0.025],
            fibra: [0.155, 0.095, 0.025],
            delta: [0.105, 0.075, 0.025],
            nn: [0.155, 0.095, 0.025],
            sva: [0.105, 0.075, 0.025],
            terminal: [0, 0, 0],
            terminal1: [0.0075, 0.0045, 0.0025],
            terminal2: [0.0035, 0.002, 0.001],
            terminal3: [0.009, 0.006, 0.004],
            acessorio: [0.075, 0.050, 0.025]
        },
        gerenteloja: {
            pos: [0.08, 0.06, 0.01],
            controle: [0.07, 0.05, 0.01],
            fibra: [0.08, 0.06, 0.01],
            delta: [0.07, 0.05, 0.01],
            nn: [0.08, 0.06, 0.01],
            sva: [0.07, 0.05, 0.01],
            terminal: [0, 0, 0],
            terminal1: [0.0052, 0.0031, 0.0017],
            terminal2: [0.0024, 0.0014, 0.0007],
            terminal3: [0.0060, 0.0040, 0.0025],
            acessorio: [0.0262, 0.0175, 0.0087]
        },
        gerentecomercial: {
            pos: [0.04, 0.03, 0.015],
            controle: [0.03, 0.02, 0.015],
            fibra: [0.04, 0.03, 0.015],
            delta: [0.03, 0.02, 0.015],
            nn: [0.04, 0.03, 0.015],
            sva: [0.03, 0.02, 0.015],
            terminal: [0, 0, 0],
            terminal1: [0.004, 0.0028, 0.0020],
            terminal2: [0.002, 0.0014, 0.001],
            terminal3: [0.0055, 0.0043, 0.0035],
            acessorio: [0.02, 0.015, 0.01]
        },
        gerenteregional: {
            pos: [0.035, 0.02, 0.01],
            controle: [0.025, 0.02, 0.01],
            fibra: [0.035, 0.02, 0.01],
            delta: [0.025, 0.02, 0.01],
            nn: [0.035, 0.02, 0.01],
            sva: [0.025, 0.02, 0.01],
            terminal: [0, 0, 0],
            terminal1: [0.0018, 0.0013, 0.0009],
            terminal2: [0.0009, 0.0006, 0.0005],
            terminal3: [0.0028, 0.0023, 0.0019],
            acessorio: [0.0125, 0.0090, 0.0060]
        }
    };

    const indicador = document.getElementById("indicador").value;
    const servicos = ["pos", "controle", "fibra", "delta", "nn", "sva", "terminal", "terminal1", "terminal2", "terminal3", "acessorio"];
    
    let apenasComissao = 0;
    let apenasPremiacaoComAcelerador = 0;
    let comissaoReceita = 0;
    let comissaoReceitaAcelerada = 0;

    servicos.forEach(servico => {

        let meta;

        if (servico === 'terminal1' || servico === 'terminal2' || servico === 'terminal3') {
            const metaTerminal = parseFloat(document.getElementById(`meta-terminal`).value) || 0;
            meta = metaTerminal;
        } else {
            meta = parseFloat(document.getElementById(`meta-${servico}`).value) || 0;
        }

        let real;

        if (servico === 'terminal') {
            const realTerminal1 = parseFloat(document.getElementById(`real-terminal1`).value) || 0;
            const realTerminal2 = parseFloat(document.getElementById(`real-terminal2`).value) || 0;
            const realTerminal3 = parseFloat(document.getElementById(`real-terminal3`).value) || 0;
            real = realTerminal1 + realTerminal2 + realTerminal3;
        } else {
            real = parseFloat(document.getElementById(`real-${servico}`).value) || 0;
        }

        const tkm = parseFloat(document.getElementById(`tkm-${servico}`).value) || 0;
        
        let produtividade;
        if (servico === 'terminal1' || servico === 'terminal2' || servico === 'terminal3') {
            const metaTerminal = parseFloat(document.getElementById(`meta-terminal`).value) || 0;
            const realTerminal1 = parseFloat(document.getElementById(`real-terminal1`).value) || 0;
            const realTerminal2 = parseFloat(document.getElementById(`real-terminal2`).value) || 0;
            const realTerminal3 = parseFloat(document.getElementById(`real-terminal3`).value) || 0;
            
            produtividade = metaTerminal ? (realTerminal1 + realTerminal2 + realTerminal3) / metaTerminal : 0;
        } else {
            produtividade = meta ? real / meta : 0;
        }

        let percent = 0;
        let comissao = 0;
        let premiacao = 0;
        let receita = 0;

        receita = tkm * real;

        if (indicador === 'vendedor') {
            if (servico === 'pos' || servico === 'controle' || servico === 'delta' || servico === 'sva' || servico === 'nn' || servico === 'fibra') {
                comissao = receita * 0.025; // 2,5% da receita
            } else if (servico === 'terminal') {
                comissao = receita * 0; // 0% da receita
            } else if (servico === 'terminal1') {
                comissao = receita * 0.0025; // 0,25% da receita
            } else if (servico === 'terminal2') {
                comissao = receita * 0.0015; // 0,15% da receita
            } else if (servico === 'terminal3') {
              comissao = receita * 0.0060; // 0,60% da receita
            } else if (servico === 'acessorio') {
                comissao = receita * 0.025; // 2,5% da receita
            }
        } else if (indicador === 'gerenteloja') {
            if (servico === 'pos' || servico === 'controle' || servico === 'delta' || servico === 'sva' || servico === 'nn' || servico === 'fibra') {
                comissao = receita * 0.02; // 2% da receita
            } else if (servico === 'terminal') {
                comissao = receita * 0; // 0,18% da receita
            } else if (servico === 'terminal1') {
                comissao = receita * 0.0018; // 0,18% da receita
            } else if (servico === 'terminal2') {
                comissao = receita * 0.0011; // 0,11% da receita
            } else if (servico === 'terminal3') {
              comissao = receita * 0.0035; // 0,35% da receita
            } else if (servico === 'acessorio') {
                comissao = receita * 0.0088; // 0,88% da receita
            }
        } else {
            comissao = 0; // 0% para gerentes comerciais e regionais
        }

        if(real === 0){
            comissao = 0;
            premiacao = 0;
            percent = 0;
        } else {
            if (indicador === 'gerentecomercial' || indicador === 'gerenteregional') {
                if (produtividade >= 1.2) {
                    premiacao = receita * porcentagemComissao[indicador][servico][0];
                    percent = porcentagemComissao[indicador][servico][0] * 100;
                } else if (produtividade >= 1) {
                    premiacao = receita * porcentagemComissao[indicador][servico][1];
                    percent = porcentagemComissao[indicador][servico][1] * 100;
                } else if (produtividade >= 0.7) {
                    premiacao = receita * porcentagemComissao[indicador][servico][2];
                    percent = porcentagemComissao[indicador][servico][2] * 100;
                }
            } else {
                if (produtividade >= 1.2) {
                    premiacao = receita * porcentagemComissao[indicador][servico][0];
                    percent = porcentagemComissao[indicador][servico][0] * 100;
                } else if (produtividade >= 1) {
                    premiacao = receita * porcentagemComissao[indicador][servico][1];
                    percent = porcentagemComissao[indicador][servico][1] * 100;
                } else if (produtividade >= 0.8) {
                    premiacao = receita * porcentagemComissao[indicador][servico][2];
                    percent = porcentagemComissao[indicador][servico][2] * 100;
                }
            }
        }
        
        let premiacaoParaAcelerar = premiacao;

        if (["pos", "controle", "delta", "nn", "sva"].includes(servico)) {
            const acelIndividualMovel = parseFloat(document.getElementById("acelindividualmovel").value) || 0;
            const acelEquipeMovel = parseFloat(document.getElementById("acelequipemovel").value) || 0;

            const valorAcelIndividualMovel = premiacaoParaAcelerar * (acelIndividualMovel / 100);
            const valorAcelEquipeMovel = premiacaoParaAcelerar * (acelEquipeMovel / 100);

            if (acelIndividualMovel !== 0){
                percent = percent + (percent * (acelIndividualMovel / 100));
            }
            if (acelEquipeMovel !== 0){
                percent = percent + (percent * (acelEquipeMovel / 100));
            }
            
            premiacaoParaAcelerar += valorAcelIndividualMovel + valorAcelEquipeMovel;
            premiacao += valorAcelIndividualMovel + valorAcelEquipeMovel;
        }

        if (servico === "fibra") {
            const acelIndividualFixa = parseFloat(document.getElementById("acelindividualfixa").value) || 0;
            const acelEquipeFixa = parseFloat(document.getElementById("acelequipefixa").value) || 0;

            const valorAcelIndividualFixa = premiacaoParaAcelerar * (acelIndividualFixa / 100);
            const valorAcelEquipeFixa = premiacaoParaAcelerar * (acelEquipeFixa / 100);

            if(acelIndividualFixa !== 0){
                percent = percent + (percent * (acelIndividualFixa / 100));
            }
            if (acelEquipeFixa !== 0){
                percent = percent + (percent + (acelEquipeFixa / 100));
            }

            premiacaoParaAcelerar += valorAcelIndividualFixa + valorAcelEquipeFixa;
            premiacao += valorAcelIndividualFixa + valorAcelEquipeFixa;
        }

        let comissaoPremiacaoServico = comissao + premiacaoParaAcelerar;

        apenasComissao += comissao;
        apenasPremiacaoComAcelerador += premiacaoParaAcelerar;
        comissaoReceita += comissao + premiacao;
        comissaoReceitaAcelerada += comissaoPremiacaoServico;

        if (servico === 'terminal') {
            document.getElementById(`real-${servico}`).innerText = real;
        }

        if (servico !== 'terminal') {
            document.getElementById(`projecao-${servico}`).innerText = (produtividade * 100).toFixed(2) + '%';
            document.getElementById(`receita-${servico}`).innerText = 'R$ ' + receita.toFixed(2);
            document.getElementById(`percent-${servico}`).innerText = percent.toFixed(2) + '%';
            document.getElementById(`comissao-${servico}`).innerText = 'R$ ' + comissao.toFixed(2);
            document.getElementById(`premiacao-${servico}`).innerText = 'R$ ' + premiacao.toFixed(2);
        }
        
    });

    document.getElementById("resultado").innerText = `Comissão: R$ ${apenasComissao.toFixed(2)}\nPremiação + TFP: R$ ${apenasPremiacaoComAcelerador.toFixed(2)}\nTotal Comissão + Premiação: R$ ${comissaoReceitaAcelerada.toFixed(2)}`;
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        calcularComissao();
    }
});

window.onload = function() {
    var modal = document.getElementById("modal");
    var okButton = document.getElementById("okButton");

    modal.style.display = "flex";

    okButton.onclick = function() {
        modal.style.display = "none";
    };
};

const confettiCount = 20;
const sequinCount = 10;

const gravityConfetti = 0.3;
const gravitySequins = 0.55;
const dragConfetti = 0.075;
const dragSequins = 0.02;
const terminalVelocity = 3;

const button = document.getElementById('button');
var disabled = false;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let cx = ctx.canvas.width / 2;
let cy = ctx.canvas.height / 2;

let confetti = [];
let sequins = [];

const colors = [
  { front : '#7b5cff', back: '#6245e0' }, // Purple
  { front : '#b3c7ff', back: '#8fa5e5' }, // Light Blue
  { front : '#5c86ff', back: '#345dd1' }  // Darker Blue
];

function randomRange(min, max) { return Math.random() * (max - min) + min; }

function initConfettoVelocity(xRange, yRange) {
  const x = randomRange(xRange[0], xRange[1]);
  const range = yRange[1] - yRange[0] + 1;
  let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
  if (y >= yRange[1] - 1) {
    y += (Math.random() < .25) ? randomRange(1, 3) : 0;
  }
  return {x: x, y: -y};
}

function Confetto() {
  this.randomModifier = randomRange(0, 99);
  this.color = colors[Math.floor(randomRange(0, colors.length))];
  this.dimensions = {
    x: randomRange(5, 9),
    y: randomRange(8, 15),
  };
  this.position = {
    x: randomRange(canvas.width/2 - button.offsetWidth/4, canvas.width/2 + button.offsetWidth/4),
    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
  };
  this.rotation = randomRange(0, 2 * Math.PI);
  this.scale = {
    x: 1,
    y: 1,
  };
  this.velocity = initConfettoVelocity([-9, 9], [6, 11]);
}
Confetto.prototype.update = function() {

  this.velocity.x -= this.velocity.x * dragConfetti;
  this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity);
  this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
  

  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;

  this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);    
};

function Sequin() {
  this.color = colors[Math.floor(randomRange(0, colors.length))].back;
  this.radius = randomRange(1, 2);
  this.position = {
    x: randomRange(canvas.width/2 - button.offsetWidth/3, canvas.width/2 + button.offsetWidth/3),
    y: randomRange(canvas.height/2 + button.offsetHeight/2 + 8, canvas.height/2 + (1.5 * button.offsetHeight) - 8),
  };
  this.velocity = {
    x: randomRange(-6, 6),
    y: randomRange(-8, -12)
  };
}
Sequin.prototype.update = function() {
  this.velocity.x -= this.velocity.x * dragSequins;
  this.velocity.y = this.velocity.y + gravitySequins;
  
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;   
};

function initBurst() {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetto());
  }
  for (let i = 0; i < sequinCount; i++) {
    sequins.push(new Sequin());
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  confetti.forEach((confetto, index) => {
    let width = (confetto.dimensions.x * confetto.scale.x);
    let height = (confetto.dimensions.y * confetto.scale.y);
    
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    confetto.update();
    
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
    
    ctx.fillRect(-width / 2, -height / 2, width, height);
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (confetto.velocity.y < 0) {
      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight);
    }
  });

  sequins.forEach((sequin, index) => {  
    ctx.translate(sequin.position.x, sequin.position.y);
    
    sequin.update();
    
    ctx.fillStyle = sequin.color;
    
    ctx.beginPath();
    ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (sequin.velocity.y < 0) {
      ctx.clearRect(canvas.width/2 - button.offsetWidth/2, canvas.height/2 + button.offsetHeight/2, button.offsetWidth, button.offsetHeight);
    }
  });

  confetti.forEach((confetto, index) => {
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
  });
  sequins.forEach((sequin, index) => {
    if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
  });

  window.requestAnimationFrame(render);
}

function clickButton() {
  if (!disabled) {
    disabled = true;
    button.classList.add('loading');
    button.classList.remove('ready');
    setTimeout(() => {
      calcularComissao();

      button.classList.add('complete');
      button.classList.remove('loading');

      setTimeout(() => {
        initBurst();
        setTimeout(() => {
          disabled = false;
          button.classList.add('ready');
          button.classList.remove('complete');
        }, 4000);
      }, 320);
    }, 1800);
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
}

window.addEventListener('resize', () => {
  resizeCanvas();
});

document.body.onkeyup = (e) => {
  if (e.keyCode == 13 || e.keyCode == 32) {
    clickButton();
  }
};

const textElements = button.querySelectorAll('.button-text');
textElements.forEach((element) => {
  const characters = element.innerText.split('');
  let characterHTML = '';
  characters.forEach((letter, index) => {
    characterHTML += `<span class="char${index}" style="--d:${index * 30}ms; --dr:${(characters.length - index - 1) * 30}ms;">${letter}</span>`;
  });
  element.innerHTML = characterHTML;
});

initBurst();
render();