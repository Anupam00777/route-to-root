export class calculator {
  constructor() {}

  differentiate_eqn(eqn, v){
    try{
      let derivative = new math.derivative(eqn, v).toString().replace(/\s/g, "");
      return derivative;
    }catch{
      return false;
    }
  }

  validate(eq, array_of_var = []){
    eq = eq.toLowerCase();
    let inc = ['+','-','*','/','^','(',')'];
    eq = eq.replace(/\s/g, "");
    eq = eq.replace(/[0-9]/g, "");
    let reg = new RegExp(`sin`, "g");
      eq = eq.replace(reg, ``);

      reg = new RegExp(`cos`, "g");
      eq = eq.replace(reg, ``);

      reg = new RegExp(`tan`, "g");
      eq = eq.replace(reg, ``);

      reg = new RegExp(`sec`, "g");
      eq = eq.replace(reg, ``);

      reg = new RegExp(`cosec`, "g");
      eq = eq.replace(reg, ``);

      reg = new RegExp(`cot`, "g");
      eq = eq.replace(reg, ``);

      reg = new RegExp(`log`, "g");
      eq = eq.replace(reg, ``);
      
      reg = new RegExp(`e`, "g");
      eq = eq.replace(reg, ``);

      for (let i = 0; i < eq.length; i++) {
        if(!inc.includes(eq[i]) && !array_of_var.includes(eq[i])){
          return false;
        }
      }
      return true;
  }
  find_coefficient(eq) {
    try {
      let a = eq.toLowerCase().replace(/\s/g, "");
      let obj = [0, 0, 0];
      let ext = ["+", "-", "*", "/"];
      let n = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i] == "x" && i > 0) {
          for (let j = i - 1; j >= 0; j--) {
            if (ext.includes(a[j]) && j != i - 1) {
              obj[n] = `(${a[j] + a.slice(j + 1, i)})`;
              n++;
              break;
            } else if (j == 0) {
              obj[n] = a.slice(0, i);
              n++;
              break;
            } else if (ext.includes(a[j]) && j == i - 1) {
              obj[n] = `${a[j]}1`;
              n++;
              break;
            }
          } 
        } else if (a[i] == "x" && i == 0) {
          obj[n] = "1";
          n++; 
        }
      }
      return obj;
    } catch {
      alert("Please write the Equation properly.");
      return 0;
    }
  }

  checknum(test, range = null) {
    if (test == NaN || test == undefined) {
      if (range) {
        if (range[0] > test || range[1] < test) {
          return false;
        }
      }
      return false;
    }
    return true;
  }

  calculate(e, val) {
    let eq = e.toLowerCase();
    console.log(eq);
    let reg;
    eq = eq.replace(/\s/g, ""); 
    val.forEach((element) => {
      element.val = Number(element.val);
      reg = new RegExp(`sin${element.var}`, "g");
      eq = eq.replace(reg, `(${Math.sin(element.val)})`);

      reg = new RegExp(`cos${element.var}`, "g");
      eq = eq.replace(reg, `(${Math.cos(element.val)})`);

      reg = new RegExp(`tan${element.var}`, "g");
      eq = eq.replace(reg, `(${Math.tan(element.val)})`);

      reg = new RegExp(`sec${element.var}`, "g");
      eq = eq.replace(reg, `(${1 / Math.cos(element.val)})`);

      reg = new RegExp(`cosec${element.var}`, "g");
      eq = eq.replace(reg, `(${1 / Math.sin(element.val)})`);

      reg = new RegExp(`cot${element.var}`, "g");
      eq = eq.replace(reg, `(${1 / Math.tan(element.val)})`);

      reg = new RegExp(`log${element.var}`, "g");
      eq = eq.replace(reg, `(${Math.log10(element.val)})`);
    });
    eq = eq.replace(/\^/g, "**");
    eq = eq.replace(/e/g, `(${Math.exp(1)})`);
    let ext = ["+", "-", "*", "^", "/"];
    val.forEach((element) => {
      while (eq.indexOf(`${element.var}`) != -1) {
        if (
          !ext.includes(eq[eq.indexOf(`${element.var}`) - 1]) &&
          eq[eq.indexOf(`${element.var}`) - 1] == ")" &&
          eq.indexOf(`${element.var}`) != 0
        ) {
          eq =
            eq.slice(0, [eq.indexOf(`${element.var}`)]) +
            "*" +
            eq.slice([eq.indexOf(`${element.var}`)]);
        }
        if (
          !ext.includes(eq[eq.indexOf(`${element.var}`) + 1]) &&
          eq[eq.indexOf(`${element.var}`) + 1] == "(" &&
          eq.indexOf(`${element.var}`) != eq.length - 1
        ) {
          eq =
            eq.slice(0, [eq.indexOf(`${element.var}`) + 1]) +
            "*" +
            eq.slice([eq.indexOf(`${element.var}`) + 1]);
        }
        console.log(eq);
        reg = new RegExp(`${element.var}`);
        eq = eq.replace(reg, `(${element.val})`);
        console.log(eq);
      }
    });
    for (let i = 0; i < eq.length; i++) {
      if (eq[i] == "(" && eq[i - 1] != "(") {
        if (!ext.includes(eq[i - 1]) && i != 0) {
          eq = eq.slice(0, i) + "*" + eq.slice(i);
          i++;
        }
      } else if (eq[i] == ")" && eq[i + 1] != ")") {
        if (!ext.includes(eq[i + 1]) && i != eq.length - 1) {
          eq = eq.slice(0, [i + 1]) + "*" + eq.slice([i + 1]);
          i++;
        }
      } 
    } 
    console.log(eval(eq));
    return eval(eq);
  }
}

