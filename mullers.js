import {layout} from "./layout.js";

class Mullers extends layout {
  constructor(parent, buffer_array = undefined, callback = null) {
    super(parent);
    this.solve_btn.addEventListener("click", () => {
      try {
        this.solve();
      } catch (e) {
        console.log(e);
        this.write_to_screen(
          `<b style="color: red;">Something went wrong. Please check your Equation again and retry or recheck values of x<sub>1</sub>, x<sub>2</sub> and x<sub>3</sub>.</b>`
        );
      }
    });
    this.soln = "";
    this.eqn;
    this.x1;
    this.x2;
    this.x3;
    this.x4;
    this.f1;
    this.f2;
    this.f3;
    this.f4;
    this.a0;
    this.a1;
    this.a2;
    this.h1;
    this.h2;
    this.h4;
    this.d1;
    this.d2;
    this.D;
    this.an;
    this.stopping_criterion;
    this.iteration_num = 0;
    this.cBack = callback;
    buffer_array.push(this);
    if(layout_num == 1){
    this.launch_dialogue(`<h1 class="my-auto mt-2 text-xl text-center">How to use</h1><br>1. Type the Equation correctly in the Equation field with 'x' as the variable.Use '^' for power like x^2 for x<sup>2</sup>.<br>2. Enter x<sub>1</sub>, x<sub>2</sub> and x<sub>3</sub>.<br>3. Select Stopping Criteria from the drop-down and put in the value in below field. Enter N (Ex. 10) for number of iterations OR E (Ex. 0.001).<br>4. Click on solve to start solving.`)};
  }
  callback(c) {
    c();
  }
  clear_attributes() {
    this.iteration_num = 0;
  }
  a_1(d1, d2, h1, h2, D) {
    return (d2 * h1 * h1 - d1 * h2 * h2) / D;
  }
  a_2(d1, d2, h1, h2, D) {
    return (d1 * h2 - d2 * h1) / D;
  }
  h_4(a0, a1, a2) {
    let A0 = Number(a0);
    let A1 = Number(a1);
    let A2 = Number(a2);
    let num = -2 * A0;
    let x = (A1**2)-(4*A2*A0);
    let y = Math.sqrt(x);
    console.log(A0,A1,A2,x,y);
    let denom = A1+y > A1-y ? A1+y : A1-y; 
    return num / denom;
  }

  x_4(X1,X2,X3){
    let x1 = Number(X1);
    let x2 = Number(X2);
    let x3 = Number(X3);
    this.f1 = this.fx(x1);
    this.f2 = this.fx(x2);
    this.f3 = this.fx(x3);
    this.h1 = x1-x3;
    this.h2 = x2-x3;
    this.d1 = this.f1-this.f3;
    this.d2 = this.f2-this.f3;
    this.D = this.h1*this.h2*(this.h1-this.h2);
    this.a0 = this.f3;
    this.a1 = this.a_1(this.d1,this.d2,this.h1,this.h2,this.D);
    this.a2 = this.a_2(this.d1,this.d2,this.h1,this.h2,this.D);
    this.h4 = this.h_4(this.a0,this.a1,this.a2);
    this.x4 = x3 + this.h4;
    this.f4 = this.fx(this.x4);
  }

  fx(v) {
    return this.calculate(this.eqn, [{var: "x", val: v}]);
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
    switch (s) {
      case 1:
        return this.iteration_num < E;
        break;
      case 2: 
        return !(this.f4 < E && this.f4 > 0);
        break;
      case 3:
        return (
          this.calculate(`((y)-(x))/(y)`, [
            {
              var: "x",
              val: this.x3,
            },
            {
              var: "y",
              val: this.x4,
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
      if (this.iteration_num > 1000) {
        this.write_to_screen(
          `<b style="color: red;">Interrupted: Iterations are currently capped at 1000.</b><br>`
        );
        break;
      }
      if(!this.checknum(this.h4)){
        if(this.checknum(this.x4)){
        this.print_ans(this.x4);
        }else{
        this.write_to_screen(`<b style="color: red;">Something went wrong. Please recheck the values of x<sub>1</sub>, x<sub>2</sub> or x<sub>3</sub.</b><br>`);
        }
        return;
      }
      if (this.iteration_num != 1) { 
          this.write_to_screen(
            `<b>ITERATION ${this.iteration_num} :</b><br>x<sub>1</sub> = x<sub>2</sub> = ${this.x2}<br>x<sub>2</sub> = x<sub>3</sub> = ${this.x3}<br>x<sub>3</sub> = x<sub>4</sub> = ${this.x4}<br>f(x<sub>1</sub>) = f(<sub>2</sub>) = ${this.f2}<br>f(x<sub>2</sub>) = f(<sub>3</sub>) = ${this.f3}<br>f(x<sub>3</sub>) = f(<sub>4</sub>) = ${this.f4}<br><br>`
          ); 
          this.x1 = this.x2;
          this.x2 = this.x3;
          this.x3 = this.x4;
          this.x_4(this.x1,this.x2,this.x3);
          if(!this.checknum(this.h4)){
            this.print_ans(this.x3);
            return;
          }
      }
      this.write_to_screen(
        `h<sub>1</sub> = x<sub>1</sub> - x<sub>3</sub><br>h<sub>1</sub> = ${this.x1} - ${this.x3}<br>h<sub>1</sub> = ${this.h1}<br><br>h<sub>2</sub> = x<sub>2</sub> - x<sub>3</sub><br>h<sub>2</sub> = ${this.x2} - ${this.x3}<br>h<sub>2</sub> = ${this.h2}<br><br>d<sub>1</sub> = f(x<sub>1</sub>) - f(x<sub>3</sub>)<br>d<sub>1</sub> = ${this.f1} - ${this.f3}<br>d<sub>1</sub> = ${this.d1}<br><br>d<sub>2</sub> = f(x<sub>2</sub>) - f(x<sub>3</sub>)<br>d<sub>2</sub> = ${this.f2} - ${this.f3}<br>d<sub>2</sub> = ${this.d2}<br><br>D = h<sub>1</sub>h<sub>2</sub> - (h<sub>1</sub> - h<sub>2</sub>)<br>D = (${this.h1})(${this.h2}) - ((${this.h1}) - (${this.h2}))<br>D = ${this.D}<br><br>a<sub>0</sub> = f(x<sub>3</sub>)<br>a<sub>0</sub> = ${this.a0}<br><br>a<sub>1</sub> = (d<sub>2</sub>h<sub>1</sub><sup>2</sup> - d<sub>1</sub>h<sub>2</sub><sup>2</sup>)/D<br>a<sub>1</sub> = (${this.d2} * ${this.h1*this.h1} - ${this.d1} * ${this.h2*this.h2})/${this.D}<br>a<sub>1</sub> = ${this.a1}<br><br>a<sub>2</sub> = (d<sub>1</sub>h<sub>2</sub> - d<sub>2</sub>h<sub>1</sub>)/D<br>a<sub>2</sub> = (${this.d1} * ${this.h2} - ${this.d2} * ${this.h1})/${this.D}<br>a<sub>2</sub> = ${this.a2}<br><br>h<sub>4</sub> = (-2a<sub>0</sub>)/(a<sub>1</sub> &#177; <span style="white-space: nowrap;">
        &radic;<span class="border-t border-black">&nbsp;a<sub>1</sub><sup>2</sup> - 4a<sub>2</sub>a<sub>0</sub>&nbsp;</span>
        </span>)<br>h<sub>4</sub> = (-2*${this.a0})/(${this.a1} &#177; <span style="white-space: nowrap;">
        &radic;<span class="border-t border-black">&nbsp;${this.a1*this.a1} - 4*${this.a2}*${this.a0}&nbsp;</span>
        </span>)<br>h<sub>4</sub> = ${this.h4}<br><br>x<sub>4</sub> = x<sub>3</sub> + h<sub>4</sub><br>x<sub>4</sub> = ${this.x3} + ${this.h4}<br>x<sub>4</sub> = ${this.x4}<br><br>f<sub>4</sub> = ${this.eqn}<br>f<sub>4</sub> = ${this.f4}<br><br>`
      );
      if (this.f4 == 0) {
        this.print_ans(this.x4);
        return;
      }
      if (this.f1 * this.f4 < 0) {
        this.write_to_screen(
          `Since f(x<sub>0</sub>)*f(x<sub>1</sub>) < 0, the root lies between interval (${this.x4}, ${this.x1})<br><br>`
        );
      }
    }
    this.print_ans(this.x4);
  }

  solve() {
    //   console.log(1);
    this.soln = "";
    this.clear_ans();
    this.clear_attributes();
    this.eqn = this.equation_container.value.toLowerCase().replace(/\s/g, "");
    if (this.eqn == "" || this.stopNo_container.value == "") {
      return;
    } else if (!this.validate(this.eqn, ["x"])) {
      this.write_to_screen(
        `<b style="color: red;">Something went wrong. Please check the Equation again and retry.</b>`
      );
      return;
    } else {
      switch (this.stopCr_container.value) {
        case "1":
          this.stopNo_container.value = Number(
            this.stopNo_container.value
          ).toFixed();
          if (Number(this.stopNo_container.value) <= 0) {
            this.write_to_screen(
              `<b style="color:red;">N must be greater than 0</b>`
            );
            return;
          }
          break;
        case "2":
          if (Number(this.stopNo_container.value) <= 0) {
            this.write_to_screen(
              `<b style="color:red;">E must be greater than 0</b>`
            );
            return;
          }
          break;
        case "3":
          if (Number(this.stopNo_container.value) <= 0) {
            this.write_to_screen(
              `<b style="color:red;">E must be greater than 0</b>`
            );
            return;
          }
          break;
      }
    }
    this.x1 = this.x1_input.value;
    this.x1 = this.x1.replace(/\s/g, "");
    this.x2 = this.x2_input.value;
    this.x2 = this.x2.replace(/\s/g, "");
    this.x3 = this.x3_input.value;
    this.x3 = this.x3.replace(/\s/g, "");
    this.write_to_screen(`Given:<br>&emsp;f(x) = ${this.eqn}<br><br>`);
    if (this.x1 == "" || this.x2 == "" || this.x3 == "") { 
        this.write_to_screen(
          `<b style="color: red;"> Please enter all the values of x<sub>1</sub>, x<sub>2</sub> and x<sub>3</sub>.</b><br>`
        );
        return; 
    } else {
      if(!this.checknum(this.x1)||!this.checknum(this.x2)||!this.checknum(this.x3)){
        this.write_to_screen(
            `<b style="color: red;">Somwthing went wrong. Please check the values of x<sub>1</sub>, x<sub>2</sub> and x<sub>3</sub>.</b><br>`
          );
          return; 
      } 
      this.x_4(this.x1,this.x2,this.x3);
      this.write_to_screen(
        `&emsp;x<sub>1</sub> = ${this.x1}<br>&emsp;x<sub>2</sub> = ${
          this.x2
        }<br>&emsp;x<sub>3</sub> = ${
            this.x3
          }<br><br>f(x<sub>1</sub>) = ${this.eqn}<br>f(x<sub>1</sub>) = ${this.f1}<br>f(x<sub>2</sub>) = ${this.eqn}<br>f(x<sub>2</sub>) = ${this.f2}<br>f(x<sub>3</sub>) = ${this.eqn}<br>f(x<sub>3</sub>) = ${this.f3}<br><br>`
      );
    }
    this.stopping_criterion = this.stopCr_container.value;
    this.iteration(this.stopping_criterion, this.stopNo_container.value);
  
}
}
export {Mullers};
