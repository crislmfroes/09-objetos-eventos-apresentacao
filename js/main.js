console.log('main');
const Notas = {
  notas: [],
  adiciona: function (nota) {
    let n = parseFloat(nota);
    if (isNaN(n) || n < 0 || n > 10) {
      throw 'Nota deve ser um valor numérico entre 0 e 10';
    }
    this.notas.push(n);
    this.notas.sort(function(a, b){
      return a - b;
    });
    this.atualizaView();
  },
  atualizaView: function () {
    let html = "";
    const div_notas = document.querySelector('div.notas');
    for (let nota of this.notas) {
      html += '<p>' + nota + '</p>';
    }
    div_notas.innerHTML = html;
    document.querySelector('div.media').innerText = this.media;
    document.querySelector('div.maior').innerText = this.maior;
    document.querySelector('div.menor').innerText = this.menor;
    document.querySelector('div.amplitude').innerText = this.amplitude;
    // document.querySelector('div.aprovados').innerText = this.aprovados;
    // document.querySelector('div.reprovados').innerText = this.reprovados;
    // if (this.aprovados > this.reprovados) {
    //   document.querySelector('div.aprovados').style.width = '100%';
    //   document.querySelector('div.reprovados').style.width = ((this.reprovados / this.aprovados) * 100) + '%';
    // } else {
    //   document.querySelector('div.aprovados').style.width = ((this.aprovados / this.reprovados) * 100) + '%';
    //   document.querySelector('div.reprovados').style.width = '100%';
    // }
    const medias = [2, 4, 7, 8, 10];
    let maior_indice = 0;
    let maior_quantidade = 0;
    for (let indice = 0; indice < medias.length; indice++) {
      let barra = document.querySelector('div.classe' + indice);
      let quantidade = this.range(medias[indice - 1], medias[indice]);
      if (quantidade > maior_quantidade) {
        maior_indice = indice;
        maior_quantidade = quantidade;
      }
      barra.innerText = quantidade;
    }
    for (let indice = 0; indice < medias.length; indice++) {
      let barra = document.querySelector('div.classe' + indice);
      let quantidade = this.range(medias[indice - 1], medias[indice]);
      barra.style.width = ((quantidade / maior_quantidade) * 100) + '%';
    }
    document.querySelector('div.mediana').innerText = this.mediana;
  },
  get media () {
    let soma = 0;
    for (let nota of this.notas) {
      soma += nota;
    }
    return soma / this.notas.length;
  },
  get mediana () {
    if (this.notas.length % 2 != 0) {
      return this.notas[parseInt(this.notas.length / 2)];
    } else {
      let primeiro = this.notas[parseInt(this.notas.length / 2) - 1];
      let segundo = this.notas[parseInt(this.notas.length / 2)];
      return (primeiro + segundo) / 2;
    }
  },
  get maior () {
    return this.notas[this.notas.length - 1];
  },
  get menor () {
    return this.notas[0];
  },
  get amplitude () {
    return this.maior - this.menor;
  },
  get aprovados () {
    // let aprovados = 0;
    // for (nota of this.notas) {
    //   if (nota >= 7) aprovados++;
    // }
    // return aprovados;
    return this.notas.filter((nota) => nota >= 7).length;
  },
  get reprovados () {
    // let reprovados = 0;
    // for (nota of this.notas) {
    //   if (nota < 7) reprovados++;
    // }
    // return reprovados;
    return this.notas.filter((nota) => nota < 7).length;
  },
  range: function(x, y) {
    if (!x) x = -1;
    return this.notas.filter((nota) => nota > x && nota <= y).length;
  }
};
const form = document.querySelector('div.dados form');
// Notas.atualizaView();
form.addEventListener('submit', function (event) {
  Notas.adiciona(this.nota.value);
  event.preventDefault();
});
