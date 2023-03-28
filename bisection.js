import { layout } from "./layout";

class Bisection extends layout{
    constructor(parent){
        super(parent);
        this.solve_btn.addEventListener("click", ()=>{this.solve()});
        this.soln = "";
        this.x3_input.setAttribute("disabled", true);
        this.eqn;
        this.x0;
        this.x1;
        this.x2; 
        this.an;
        this.stopping_criterion;
        this.iteration_num = 0;
    }
    x_0(x1,x2){
        return (x1+x2)/2;
    }
    
    write_to_screen(s){
        this.soln += s;
        this.write_ans(this.soln);
    }

    solve(){
        this.soln = '';
        this.clear_ans();
        this.eqn = this.equation_container.value;
        console.log( this.eqn)
        if(this.eqn == ''){return};
        this.x1 = this.x1_input.value;
        this.x2 = this.x2_input.value;
        this.write_to_screen(`Given:<br>&emsp;f(x) = ${this.eqn}<br><br>`);
        if(this.x1 == '' || this.x2 == ''){
            this.write_to_screen(`Since x1 and x2 are not given, we will find the interval using following formula:<br>We know that:<br><br>|x<sub>max</sub><sup>*</sup>| = <span style="white-space: nowrap;">
            &radic;<span class="border-t border-black">&nbsp;(a<sub>n-1</sub>/a<sub>n</sub>)<sup>2</sup> - 2(a<sub>n-2</sub>/a<sub>n</sub>)&nbsp;</span>
            </span><br><br>`)
            this.an = this.find_coefficient(this.eqn);
            console.log(this.an);
            this.write_to_screen(`|x<sub>max</sub><sup>*</sup>| = <span style="white-space: nowrap;">
            &radic;<span class="border-t border-black">&nbsp;(${this.an[1]}/${this.an[0]})<sup>2</sup> - 2(${this.an[2]}/${this.an[0]})&nbsp;</span>
            </span><br><br>`);

            let temp = (this.calculate("((a1/a0)^2-2(a2/a0))^(1/2)",[
                {var:"a0",val: this.an[0]},
                {var:"a1",val: this.an[1]},
                {var:"a2",val: this.an[2]}
            ]));
            this.x1 = temp <= 0 ? temp: -temp;
            this.x2 = temp > 0 ? temp: -temp;
            this.write_to_screen(`|x<sub>max</sub><sup>*</sup>| = ${this.x2}<br><br>Therefore we have the interval (${this.x1}, ${this.x2})<br><br>`);

        }
        this.x0 = this.x_0(this.x1, this.x2);
        this.stopping_criterion = this.stopCr_container.value; 
        
    }
}

export {Bisection};