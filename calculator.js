export class calculator{
    constructor(){};

    find_coefficient(eq){
        try{
        let a= eq; 
        let obj = [0,0,0];
        let ext = ['+', '-', '*','/'];
        let n = 0;
        for (let i = 0; i < a.length; i++) {
            if(a[i] == 'x' && i > 0){
                for (let j = i-1; j >= 0; j--) {
                    if(ext.includes(a[j]) && j != i-1){
                        obj[n] = a.slice(j+1,i);
                        n++;
                        break;
                    }else if(j == 0){
                        obj[n] = a.slice(0,i);
                        n++;
                        break;
                    }else if(ext.includes(a[j]) && j == i-1){
                        obj[n] = 1;
                        n++;
                        break;
                    }
                }
            }
        }
        return obj;
        }catch {
            alert("Please write the Equation properly.");
            return 0;
        }
            }

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
for(let i = 0; i<eq.length; i++){
    if(eq[i] == '(' && eq[i-1] != '('){
        if((!ext.includes(eq[i-1])) && i != 0){
            eq = eq.slice(0, i) + "*" + eq.slice(i);
            i++;
        } 
    }else if(eq[i] == ')' && eq[i+1] != ')'){
        if((!ext.includes(eq[i+1])) && i != eq.length-1){ 
            eq = eq.slice(0, [i+1])+ "*" + eq.slice([i+1]);
            i++;
        }  
    }
     console.log(eq);
};
ext = ['+', '-', '*','^','/'];
val.forEach(element => {
    while(eq.indexOf(`${element.var}`) != -1){
        if((!ext.includes(eq[eq.indexOf(`${element.var}`)-1]) && eq[eq.indexOf(`${element.var}`)-1] == ')') && eq.indexOf(`${element.var}`) != 0){
            eq = eq.slice(0, [eq.indexOf(`${element.var}`)]) + "*" + eq.slice([eq.indexOf(`${element.var}`)]);
        } 
        if((!ext.includes(eq[eq.indexOf(`${element.var}`)+1]) && eq[eq.indexOf(`${element.var}`)+1] == '(' ) && eq.indexOf(`${element.var}`) != eq.length-1){ 
            eq = eq.slice(0, [eq.indexOf(`${element.var}`)+1])+ "*" + eq.slice([eq.indexOf(`${element.var}`)+1]);
        } 
        reg = new RegExp(`${element.var}`);
        eq = eq.replace(reg, element.val);
         console.log(eq);
    }
});
return eval(eq);
}
}

// const cc = new calculator();
// console.log(cc.calculate("x^2-4(x)-10",[
//     {var: "x", val: "(5-1)"}
// ]))