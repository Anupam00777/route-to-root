import { layout } from "./layout";

class Bisection extends layout {
  constructor(parent, callback = null) {
    super(parent);
    this.solve_btn.addEventListener("click", () => {
      this.solve();
    });
    this.soln = "";
    this.x3_input.setAttribute("disabled", true);
    this.eqn;
    this.x0;
    this.x1;
    this.x2;
    this.f0;
    this.f1;
    this.f2;
    this.an;
    this.stopping_criterion;
    this.iteration_num = 0;
    this.cBack = callback;
  }
  callback(c) {
    c();
  }
  clear_attributes() {
    this.iteration_num = 0;
  }
  x_0(x1, x2) {
    return eval(`(${x1} + ${x2}) / 2`);
  }

  fx(v) {
    return this.calculate(this.eqn, [{ var: "x", val: `(${v})` }]);
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
        this.x0 = this.x_0(this.x1, this.x2);
        return !(this.fx(this.x0) < E && this.fx(this.x0) > 0);
        break;
      case 3:
        return (
          this.calculate(`(x2-x1)/x2`, [
            {
              var: "x1",
              val: `(${this.x1})`,
            },
            {
              var: "x2",
              val: `(${this.x2})`,
            },
          ]) > E
        );
        break;
    }
  }
  iteration(c, n) {
    let s = eval(c);
    let E = eval(n);
    let temp = {
      x: { var: "", this: "", to_this: "", val: 0 },
      f: { var: "", this: "", to_this: "", val: 0 },
    };
    this.write_to_screen(`<b>ITERATION 1 :</b><br>`);
    while (this.stop(s, E)) {
      this.iteration_num++;
      this.x0 = this.x_0(this.x1, this.x2);
      this.f0 = this.fx(this.x0);
      this.f1 = this.fx(this.x1);
      this.f2 = this.fx(this.x2);
      if (this.iteration_num != 1) {
        if (temp.x.var == "x1") {
          this.write_to_screen(
            `<b>ITERATION ${this.iteration_num} :</b><br>x<sub>2</sub> = ${this.x2}<br>f(x<sub>2</sub>) = ${this.f2}<br>${temp.x.this}= ${temp.x.to_this} = ${temp.x.val}<br>${temp.f.this} = ${temp.f.to_this} = ${temp.f.val}<br><br>`
          );
        } else if (temp.x.var == "x2") {
          this.write_to_screen(
            `<b>ITERATION ${this.iteration_num} :</b><br>x<sub>1</sub> = ${this.x1}<br>f(x<sub>1</sub>) = ${this.f1}<br>${temp.x.this}= ${temp.x.to_this} = ${temp.x.val}<br>${temp.f.this} = ${temp.f.to_this} = ${temp.f.val}<br><br>`
          );
        }
      }
      this.write_to_screen(
        `x<sub>0</sub> = (x<sub>1</sub> + x<sub>2</sub>)/2<br>x<sub>0</sub> = (${this.x1} + ${this.x2})/2<br>x<sub>0</sub> = ${this.x0}<br><br>f(x<sub>0</sub>) = ${this.eqn}<br>f(x<sub>0</sub>) = ${this.f0}<br><br>`
      );
      if (this.f0 == 0) {
        this.print_ans(this.x0);
        return;
      }
      if (this.f1 * this.f0 < 0) {
        this.write_to_screen(
          `Since f(x<sub>0</sub>)*f(x<sub>1</sub>) < 0, the root lies between interval (${this.x0}, ${this.x1})<br><br>`
        );
        this.x2 = this.x0;
        temp.x = {
          var: `x2`,
          this: `x<sub>2</sub>`,
          to_this: `x<sub>0</sub>`,
          val: this.x0,
        };
        temp.f = {
          var: `f2`,
          this: `f(x<sub>2</sub>)`,
          to_this: `f(x<sub>0</sub>)`,
          val: this.f0,
        };
      } else if (this.f0 * this.f2 < 0) {
        this.write_to_screen(
          `Since f(x<sub>0</sub>)*f(x<sub>2</sub>) < 0, the root lies between interval (${this.x0}, ${this.x2})<br><br>`
        );
        this.x1 = this.x0;
        temp.x = {
          var: `x1`,
          this: `x<sub>1</sub>`,
          to_this: `x<sub>0</sub>`,
          val: this.x0,
        };
        temp.f = {
          var: `f1`,
          this: `f(x<sub>1</sub>)`,
          to_this: `f(x<sub>0</sub>)`,
          val: this.f0,
        };
      }
    }
    this.print_ans(this.x0);
  }

  solve() {
    this.soln = "";
    this.clear_ans();
    this.clear_attributes();
    this.eqn = this.equation_container.value;
    console.log(this.eqn);
    if (this.eqn == "" || this.stopNo_container.value == "") {
      return;
    }
    this.x1 = this.x1_input.value;
    this.x2 = this.x2_input.value;
    this.write_to_screen(`Given:<br>&emsp;f(x) = ${this.eqn}<br><br>`);
    console.log(this.x1, this.x2);
    if (this.x1 == "" || this.x2 == "") {
      this
        .write_to_screen(`Since x1 and x2 are not given, we will find the interval using following formula:<br>We know that:<br><br>|x<sub>max</sub><sup>*</sup>| = <span style="white-space: nowrap;">
            &radic;<span class="border-t border-black">&nbsp;(a<sub>n-1</sub>/a<sub>n</sub>)<sup>2</sup> - 2(a<sub>n-2</sub>/a<sub>n</sub>)&nbsp;</span>
            </span><br><br>`);
      this.an = this.find_coefficient(this.eqn);
      console.log(this.an);
      this
        .write_to_screen(`|x<sub>max</sub><sup>*</sup>| = <span style="white-space: nowrap;">
            &radic;<span class="border-t border-black">&nbsp;(${this.an[1]}/${this.an[0]})<sup>2</sup> - 2(${this.an[2]}/${this.an[0]})&nbsp;</span>
            </span><br><br>`);

      let temp = this.calculate("((a1/a0)^2-2(a2/a0))^(1/2)", [
        { var: "a0", val: `(${this.an[0]})` },
        { var: "a1", val: `(${this.an[1]})` },
        { var: "a2", val: `(${this.an[2]})` },
      ]);
      this.x1 = temp <= 0 ? temp : -temp;
      this.x2 = temp > 0 ? temp : -temp;
      this.write_to_screen(
        `|x<sub>max</sub><sup>*</sup>| = ${this.x2}<br><br>Therefore we have the interval (${this.x1}, ${this.x2}).<br><br>x<sub>1</sub> = ${this.x1} , x<sub>2</sub> = ${this.x2}<br><br>`
      );
    } else {
      if (this.fx(this.x1) * this.fx(this.x2) > 0) {
        this.write_to_screen(
          `<b style="color: red;"><i>Given interval does not bracket the roots as f(x<sub>1</sub>)*f(x<sub>2</sub>)>0</i></b>`
        );
        return;
      }
      this.write_to_screen(
        `&emsp;x<sub>1</sub> = ${this.x2}<br>&emsp;x<sub>2</sub> = ${
          this.x2
        }<br>&emsp;f(x<sub>1</sub>) = ${this.fx(
          this.x1
        )}<br>&emsp;f(x<sub>2</sub>) = ${this.fx(this.x2)}<br><br>`
      );
    }
    this.stopping_criterion = this.stopCr_container.value;
    this.iteration(this.stopping_criterion, this.stopNo_container.value);
  }
}

export { Bisection };
