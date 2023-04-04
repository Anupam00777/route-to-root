import { layout } from "./layout.js";

class NewtonRaphson extends layout {
  constructor(parent, buffer_array = undefined, callback = null) {
    super(parent);
    this.soln = "";
    this.x2_input.setAttribute("disabled", true);
    this.x3_input.setAttribute("disabled", true);
    this.x2_input.remove();
    this.x3_input.remove();
    let elem = document.createElement("div");
    elem.setAttribute("class", "flex items-center justify-center z-10 col-start-5 col-span-4 row-start-2");
    this.derivative_input = document.createElement("input");
    this.derivative_input.setAttribute("class", "w-full lowercase h-full border-0 text-center outline-0");
    this.derivative_input.setAttribute("type", "text");
    this.derivative_input.setAttribute("placeholder", "Derivative of eqn");
    this.derivative_input.setAttribute("id", `difn${layout_num}`);
    elem.appendChild(this.derivative_input);
    this.que.appendChild(elem); 
    this.solve_btn.addEventListener("click", () => { 
      try{
        this.solve();
      }catch{
        this.write_to_screen(`<b style="color: red;">Something went wrong. Please check your Equation again and retry or try to guess values of x<sub>0</sub> and x<sub>1</sub> correctly.</b>`);
      }
    });
    this.eqn; 
    this.x0;
    this.x1; 
    this.f0;
    this.df0;
    this.f1;
    this.df1;
    this.an;
    this.stopping_criterion;
    this.iteration_num = 0;
    this.cBack = callback;
    buffer_array.push(this); 
    this.derivative;
    if(layout_num == 1) {
    this.launch_dialogue(`<h1 class="my-auto mt-2 text-xl text-center">How to use</h1><br>1. Type the Equation correctly in the Equation field with 'x' as the variable.Use '^' for power like x^2 for x<sup>2</sup>. No need to put '= 0' at last.<br>2. Leave the Derivative field to automatically find derivative OR type it yourself.<br>3. Leave x<sub>1</sub> field empty to auto select initial value OR type the value yourself<br>4. Select Stopping Criteria from the drop-down and put in the value in below field. Enter N (Ex. 10) for number of iterations OR E (Ex. 0.001).<br>4. Click on solve to start solving.`)};
  
  }
  callback(c) {
    c();
  }
  clear_attributes() {
    this.iteration_num = 0; 
  }
  next_x(x0,f0,df0) {
    return this.calculate(`(x)-((y)/(z))`, [
      {
        var:"x",
        val:x0
      },{
        var:"y",
        val:f0
      },{
        var:"z",
        val:df0
      }
    ]);
  }

  fx(v) {
    return this.calculate(this.eqn, [{ var: "x", val: v }]);
  }
  dfx(v) {
    return this.calculate(this.derivative, [{ var: "x", val: v }]);
  }

  write_to_screen(s) {
    this.soln += s;
    this.write_ans(this.soln);
  }
  print_ans(r) {
    this.write_to_screen(
      `<i style="color: lime;"><b>Approximate root of the Equation is ${r}.</b></i><br>`
    );
    this.callback(this.cBack);
  }
  stop(s, E) {
      this.x1 = this.next_x(this.x0, this.f0, this.df0);
    switch (s) {
      case 1:
        return this.iteration_num < E;
        break;
      case 2:
        return !(this.fx(this.x1) < E && this.fx(this.x1) > 0);
        break;
      case 3: 
        return (
          this.calculate(`((y)-(x))/(y)`, [
            {
              var: "x",
              val: this.x0,
            },
            {
              var: "y",
              val: this.x1,
            },
          ]) > E
        );
        break;
    }
  }
  iteration(c, n) {
    let s = Number(c);
    let E = Number(n); 
    this.write_to_screen(`<b>ITERATION 1 :</b><br>`);
    while (this.stop(s, E)) {
      this.iteration_num++;
      if(this.iteration_num > 1000){
        this.write_to_screen( `<b style="color: red;">Interrupted. Iterations are currently capped at 1000.</b>`); 
        break;
      }
      if (this.iteration_num != 1) { 
          this.write_to_screen(
            `<b>ITERATION ${this.iteration_num} :</b><br>x<sub>0</sub> = x<sub>1</sub> = ${this.x1}<br><br>`
          );
          this.x0=this.x1; 
        }
      this.f0 = this.fx(this.x0);
      this.df0 = this.dfx(this.x0); 
      this.write_to_screen(
        `x<sub>1</sub> = x<sub>0</sub> - f(x<sub>0</sub>)/f'(x<sub>0</sub>)<br>x<sub>1</sub> = x<sub>0</sub> - ${this.eqn}/${this.derivative}<br>x<sub>1</sub> = ${this.x0} - (${this.f0})/(${this.df0})<br>x<sub>1</sub> = ${this.x1}<br><br>f(x<sub>0</sub>) = ${this.eqn}<br>f(x<sub>0</sub>) = ${this.f0}<br><br>f'(x<sub>0</sub>) = ${this.derivative}<br>f'(x<sub>0</sub>) = ${this.df0}<br><br>`
      );
      if (this.fx(this.x1) == 0) {
        this.print_ans(this.x1);
        return;
      }
    }
    this.print_ans(this.x1);
  }

  solve() { 
    this.soln = "";
    this.clear_ans();
    this.clear_attributes();
    this.eqn = this.equation_container.value.toLowerCase().replace(/\s/g, "");   
    this.derivative = this.derivative_input.value.toLowerCase().replace(/\s/g, "");
    if(this.derivative != ""){
    if(!this.validate(this.derivative, ['x'])){
        this.write_to_screen( `<b style="color: red;">Please recheck the derivative of Equation.</b>`);
        return;
    };
}else{
this.derivative = this.differentiate_eqn(this.eqn, "x"); 
} 
    if (this.eqn == "" || this.stopNo_container.value == "") {
        this.write_to_screen( `<b style="color: red;">Please enter an Equation.</b>`);
      return;
    }else if(this.derivative == "0"){
        this.write_to_screen( `<b style="color: red;">Derivative equation cannot be ${this.derivative}.</b>`);
        return;
    }else if(this.derivative == false){
        this.write_to_screen( `<b style="color: red;">Connect to internet to calculate the Derivative OR put in the value of derivative correctly. If you are connected, check your connection.</b>`);
      return;
    }else if(!this.validate(this.eqn, ['x'])){
      this.write_to_screen( `<b style="color: red;">Something went wrong. Please check the Equation again and retry.</b>`);
      return;
    }else { 
        switch (this.stopCr_container.value) {
            case '1':
                this.stopNo_container.value = (Number(this.stopNo_container.value).toFixed());
                if(Number(this.stopNo_container.value) <= 0){
                    this.write_to_screen(`<b style="color:red;">N must be greater than 0</b>`);
                    return;
                }
                break;
            case '2': 
                if(Number(this.stopNo_container.value) <= 0){
                    this.write_to_screen(`<b style="color:red;">E must be greater than 0</b>`);
                    return;
                }
                break;
            case '3':
                if(Number(this.stopNo_container.value) <= 0){
                    this.write_to_screen(`<b style="color:red;">E must be greater than 0</b>`);
                    return;
                }
                break; 
        } 
    }
    this.x0 = this.x1_input.value;
    this.x0=this.x0.replace(/\s/g, ""); 
    this.write_to_screen(`Given:<br>&emsp;f(x) = ${this.eqn}<br>&emsp;f'(x) = ${this.derivative}<br><br>`); 
    if (this.x0 == "") {
        this.x0 = 0; 
        this.f0 = this.fx(this.x0);
        this.df0 = this.dfx(this.x0);
      this
        .write_to_screen(`Since x<sub>0</sub> is not given, let us assume: <br>&emsp;x<sub>0</sub> = ${this.x0}<br>&emsp;f(x<sub>0</sub>) = ${this.f0}<br>&emsp;f'(x<sub>0</sub>) = ${this.df0}<br><br>`);  
      if (
        !this.checknum(this.x0) ||
        !this.checknum(this.df0) ||
        this.df0 == "0"
      ) {
        this.write_to_screen(
          `<b style="color: red;">Something went wrong. Please check again and retry or try to guess values of x<sub>0</sub> and derivative yourselves.</b>`
        );
        return;
      }
    } else {
        this.f0 = this.fx(this.x0);
        this.df0 = this.dfx(this.x0);
      this.write_to_screen(
        `&emsp;x<sub>0</sub> = ${this.x0}<br>&emsp;f(x<sub>0</sub>) = ${this.f0}<br>&emsp;f'(x<sub>0</sub>) = ${this.df0}<br><br>`
      );
    }
    if (this.f0 == 0) {
        this.print_ans(this.x0);
        return;
      }
    this.stopping_criterion = this.stopCr_container.value;
    this.iteration(this.stopping_criterion, this.stopNo_container.value); 
  }
}

export { NewtonRaphson };
