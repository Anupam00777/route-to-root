import { calculator } from "./calculator";
export class layout extends calculator {
  constructor(parent) {
    super();
    globalThis.layout_num =
      globalThis.layout_num == undefined ? 0 : globalThis.layout_num;
    layout_num++;
    this.parent = parent;
    this.container;
    this.que;
    this.ans;
    this.equation_container;
    this.stopCr_container;
    this.solve_btn;
    this.append_layout();
  }

  write_ans(str) {
    this.ans.innerHTML = str;
  }

  clear_ans() {
    this.ans.innerHTML = "";
  }

  append_layout() {
    let container = `<div id="layout${layout_num}" class="flex w-full h-max flex-col border-t-2 py-2" >
        </div>`;
    let que = `<div id="que${layout_num}" class="grid w-full grid-cols-10 grid-rows-2 h-max min-h-[70px] text-sm text-center text-clip content-center border-b">

        <div class="flex items-center justify-center col-start-1 col-span-2 row-start-1 border border-black w-full bg-slate-400 font-bold cursor-pointer my-[2px]">Que No.${layout_num}} </div>

        <div class="flex items-center justify-center  col-start-3 col-span-6 row-start-1 ">

        <input type="text" id="eqn${layout_num}" class="w-full h-full border-0 text-center outline-0" placeholder="Write your Equation here">

        </div> 

        <div class="flex items-center justify-center  col-start-9 col-span-2 row-start-1 row-span-1 w-full">
        <select title="Stop Criterion" id="stopCr${layout_num}" class="w-full overflow-hidden" >
        <option value="1">Iterations <= N</option>
        <option value="2">f(x) < E</option>
        <option value="3">(x<sub>i+1</sub>-x<sub>i</sub>)/x<sub>i+1</sub> < E</option> 
        </select>
        </div>
        
        <div class="flex items-center justify-center  col-start-9 col-span-2 row-start-2 border-t">
        <input type="number" id="stopNo${layout_num}" placeholder="E or N" class="w-[70%] h-full border-0 text-center outline-0" ></div> 

        <button id="solve${layout_num}" class="flex items-center justify-center  col-start-1 col-span-2 row-start-2 border border-black bg-green-400 w-full  font-bold cursor-pointer my-[2px]">Solve</button>

        <div class="flex items-center justify-center  col-start-3 col-span-2 row-start-2 border-r">x1:
        <input type="number" id="x1${layout_num}" placeholder="x1" class="w-[70%] h-full border-0 text-center outline-0" ></div> 

        <div class="flex items-center justify-center  col-start-5 col-span-2 row-start-2 border-r">x2:
        <input type="number" id="x2${layout_num}" placeholder="x2" class="w-[70%] h-full border-0 text-center outline-0" ></div>  

        <div class="flex items-center justify-center  col-start-7 col-span-2 row-start-2 ">x3:
        <input type="number" id="x3${layout_num}" placeholder="x3" class="w-[70%] h-full border-0 text-center outline-0" ></div> 
        </div>`;

    let ans = `<div id="ans${layout_num}" class="w-full pl-8 h-max py-2 text-sm text-clip">
        </div>`;

    this.parent.innerHTML += container;
    this.container = document.querySelector(`#layout${layout_num}`);
    this.container.innerHTML += que;
    this.container.innerHTML += ans;

    this.que = document.querySelector(`#que${layout_num}`);
    this.equation_container = document.querySelector(`#eqn${layout_num}`);
    this.stopCr_container = document.querySelector(`#stopCr${layout_num}`);
    this.stopNo_container = document.querySelector(`#stopNo${layout_num}`);
    this.x1_input = document.querySelector(`#x1${layout_num}`);
    this.x2_input = document.querySelector(`#x2${layout_num}`);
    this.x3_input = document.querySelector(`#x3${layout_num}`);
    this.solve_btn = document.querySelector(`#solve${layout_num}`);

    this.ans = document.querySelector(`#ans${layout_num}`);
  }
  destroy() {
    layout_num = 0;
    this.container.remove();
  }
}
