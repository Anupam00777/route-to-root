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
        this.stopping_criterion;
        this.iteration_num = 0;
    }
    x_0(x1,x2){
        return (x1+x2)/2;
    }
    find_x_max(){
        let a= this.eqn.split("x"); 
    }
    solve(){
        this.eqn = this.equation_container.value;
        this.x1 = this.x1_input.value;
        this.x2 = this.x2_input.value;
        console.log(this.x1)
        if(this.x1 == '' || this.x2 == ''){
            this.find_x_max();
        }
        this.x0 = this.x_0(this.x1, this.x2);
        this.stopping_criterion = this.stopCr_container.value; 
        
    }
}

export {Bisection};