export class calculator{
    constructor(){};
calculate(e, val){
    let eq = e;
    let reg;
    eq = eq.replace(/\s/g, "");
    val.forEach(element => {
        reg = new RegExp(`sin${element.var}`, "g");
        eq = eq.replace(reg, `(${Math.sin(element.val)})`);

        reg = new RegExp(`cos${element.var}`, "g");
        eq = eq.replace(reg, `(${Math.cos(element.val)})`);

        reg = new RegExp(`tan${element.var}`, "g");
        eq = eq.replace(reg,`(${ Math.tan(element.val)})`);

        reg = new RegExp(`sec${element.var}`, "g");
        eq = eq.replace(reg, `(${1/(Math.cos(element.val))})`);

        reg = new RegExp(`cosec${element.var}`, "g");
        eq = eq.replace(reg, `(${1/(Math.sin(element.val))})`);

        reg = new RegExp(`cot${element.var}`, "g");
        eq = eq.replace(reg, `(${1/(Math.tan(element.val))})`);
        
        reg = new RegExp(`log${element.var}`, "g");
        eq = eq.replace(reg, `(${Math.log10(element.val)})`);
    }); 
eq = eq.replace(/\^/g,"**");
eq = eq.replace(/e/g, Math.exp(1));
let ext = ['+', '-', '*','^','/'];
val.forEach(element => {
    while(eq.indexOf(`${element.var}`) != -1){
        if((!ext.includes(eq[eq.indexOf(`${element.var}`)-1]) || eq[eq.indexOf(`${element.var}`)-1] == '(') && eq.indexOf(`${element.var}`) != 0){
            eq = eq.slice(0, [eq.indexOf(`${element.var}`)]) + "*" + eq.slice([eq.indexOf(`${element.var}`)]);
        } 
        if((!ext.includes(eq[eq.indexOf(`${element.var}`)+1]) || eq[eq.indexOf(`${element.var}`)+1] == ')' ) && eq.indexOf(`${element.var}`) != eq.length-1){ 
            eq = eq.slice(0, [eq.indexOf(`${element.var}`)+1])+ "*" + eq.slice([eq.indexOf(`${element.var}`)+1]);
        } 
        reg = new RegExp(`${element.var}`);
        eq = eq.replace(reg, element.val);
    }
});
return eval(eq);
}
}

// const cc = new calculator();
// console.log(cc.calculate("x^2-4x-10",[
//     {var: "x", val: "(5)"}
// ]))