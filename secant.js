import { layout } from "./layout.js";

class Secant extends layout {
  constructor(parent, buffer_array = undefined, callback = null) {
    super(parent);
    this.solve_btn.addEventListener("click", () => {
      try{
        this.solve();
      }catch{
        this.write_to_screen(`<b style="color: red;">Something went wrong. Please check your Equation again and retry or try to guess values of x<sub>1</sub> and x<sub>2</sub> correctly.</b>`);
      }
    });
    this.soln = "";
    this.x3_input.setAttribute("disabled", true);
    this.eqn;
    this.x3;
    this.x1;
    this.x2;
    this.f3;
    this.f1;
    this.f2;
    this.an;
    this.stopping_criterion;
    this.iteration_num = 0;
    this.cBack = callback;
    buffer_array.push(this); 
  }
  callback(c) {
    c();
  }
  clear_attributes() {
    this.iteration_num = 0; 
  }
  next_x(x1, x2, f1, f2) {
    return this.calculate(`(x2)-(((f2)*((x2)-(x1)))/((f2)-(f1)))`, [
      {
        var:"x1",
        val:x1
      },{
        var:"x2",
        val:x2
      },{
        var:"f1",
        val:f1
      },{
        var:"f2",
        val:f2
      }
    ]);
  }

  fx(v) {
    return this.calculate(this.eqn, [{ var: "x", val: v }]);
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
        this.x3 = this.next_x(this.x1, this.x2, this.f1, this.f2);
        return !(this.fx(this.x3) < E && this.fx(this.x3) > 0);
        break;
      case 3:
        return (
          this.calculate(`((x2)-(x1))/(x2)`, [
            {
              var: "x1",
              val: this.x1,
            },
            {
              var: "x2",
              val: this.x2,
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
      if (this.iteration_num != 1) { 
          this.write_to_screen(
            `<b>ITERATION ${this.iteration_num} :</b><br>x<sub>1</sub> = x<sub>2</sub> = ${this.x2}<br>x<sub>2</sub> = x<sub>3</sub> = ${this.x3}<br>f(x<sub>1</sub>) = f(x<sub>2</sub>) = ${this.f2}<br>f(x<sub>2</sub>) = f(x<sub>3</sub>) = ${this.f3}<br><br>`
          );
          this.x1=this.x2;
          this.x2=this.x3;
        }
      this.f1 = this.fx(this.x1);
      this.f2 = this.fx(this.x2);
      this.x3 = this.next_x(this.x1, this.x2, this.f1, this.f2);
      this.f3 = this.fx(this.x3);
      this.write_to_screen(
        `x<sub>3</sub> = x<sub>2</sub> - f(x<sub>2</sub>)(x<sub>2</sub>-x<sub>1</sub>)/f(x<sub>2</sub>)-f(x<sub>1</sub>)<br>x<sub>3</sub> = ${this.x2} - ${this.f2}(${this.x2} - ${this.x1})/(${this.f2} - ${this.f1})<br>x<sub>3</sub> = ${this.x3}<br><br>f(x<sub>3</sub>) = ${this.eqn}<br>f(x<sub>3</sub>) = ${this.f3}<br><br>`
      );
      if (this.f3 == 0) {
        this.print_ans(this.x3);
        return;
      }
    }
    this.print_ans(this.x3);
  }

  solve() {
    this.soln = "";
    this.clear_ans();
    this.clear_attributes();
    this.eqn = this.equation_container.value;  
    if (this.eqn == "" || this.stopNo_container.value == "") {
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
    this.x1 = this.x1_input.value;
    this.x2 = this.x2_input.value;
    this.write_to_screen(`Given:<br>&emsp;f(x) = ${this.eqn}<br><br>`); 
    if (this.x1 == "" || this.x2 == "") {
        this.x1 = 0;
        this.x2 = 1;
        this.f1 = this.fx(this.x1);
        this.f2 = this.fx(this.x2);
      this
        .write_to_screen(`Since x<sub>1</sub> and x<sub>2</sub> are not given, let us assume: <br>&emsp;x<sub>1</sub> = ${this.x1}<br>&emsp;x<sub>2</sub> = ${this.x2}<br>&emsp;f(x<sub>1</sub>) = ${this.f1}<br>&emsp;f(x<sub>2</sub>) = ${this.f2}<br><br>`);  
      if (
        !this.checknum(this.x1) ||
        !this.checknum(this.x2) ||
        this.x1 == this.x2
      ) {
        this.write_to_screen(
          `<b style="color: red;">Something went wrong. Please check again and retry or try to guess values of x<sub>1</sub> and x<sub>2</sub> yourselves.</b>`
        );
        return;
      }
    } else {
        this.f1 = this.fx(this.x1);
        this.f2 = this.fx(this.x2);
      this.write_to_screen(
        `&emsp;x<sub>1</sub> = ${this.x1}<br>&emsp;x<sub>2</sub> = ${
          this.x2
        }<br>&emsp;f(x<sub>1</sub>) = ${this.f1}<br>&emsp;f(x<sub>2</sub>) = ${this.f2}<br><br>`
      );
    }
    if (this.f1 == 0) {
        this.print_ans(this.x1);
        return;
      } else if (this.f2 == 0) {
        this.print_ans(this.x2);
        return;
      }
    this.stopping_criterion = this.stopCr_container.value;
    this.iteration(this.stopping_criterion, this.stopNo_container.value); 
  }
}

export { Secant };
