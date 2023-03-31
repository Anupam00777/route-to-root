import * as Method from "./numerical_methods.js";

const startPage = document.querySelector(".startPage");
const screen = document.querySelector(".screen"); 
const restart = document.querySelector("#restart");
let object_buffer = {
  bisection_method: {
    objects: [],
    button: "",
  },
  false_position_method: {
    objects: [],
    button: "",
  },
  secant_method: {
    objects: [],
    button: "",
  },
  newton_raphson_method: {
    objects: [],
    button: "",
  },
  mullers_method: {
    objects: [],
    button: "",
  },
};
const btnObjects = [
  {
    id: "bisection_method",
    content: "Bisection Method",
    title: "Bisection Method",
  },
  {
    id: "false_position_method",
    content: "False Position Method",
    title: "False Position Method",
  },
  {
    id: "secant_method",
    content: "Secant Method",
    title: "Secant Method",
  },
  {
    id: "newton_raphson_method",
    content: "Newton Raphson Method",
    title: "Newton Raphson Method",
  },
  {
    id: "mullers_method",
    content: "Mullers Method",
    title: "Mullers Method",
  },
];
const hide_start_menu = () => {
  document.querySelector(".startPage").style.display = "none";
  restart.style.display = 'flex';
};

const show_start_menu = () => {
  document.querySelector(".startPage").style.display = "flex";
  restart.style.display = 'none';
  load_start_menu(btnObjects);
};
const load_start_menu = (obj) => {
  startPage.innerHTML = "";
  obj.forEach((node) => {
    let child = document.createElement("button");
    child.setAttribute("class", "w-[40%] min-w-[200px] h-max p-2 bg-[#ff9933] border-[3px] border-t-black border-l-black border-b-gray-500 border-r-gray-500 shadow-black shadow-lg font-mono font-semibold text-lg text-clip text-center flex  items-center justify-center my-3 hover:bg-green-400 transition-[all]  duration-[1500]");
    child.setAttribute("type", "button");
    child.setAttribute("id", node.id);
    child.setAttribute("title", node.title);
    child.innerHTML = node.content;
    startPage.appendChild(child);
    object_buffer[node.id].button = document.querySelector(`#${node.id}`); 

  });
  document.querySelector("#bisection_method").addEventListener("click", () => {
    hide_start_menu();
    bisection();
  });
  document.querySelector(`#false_position_method`).addEventListener("click", () => {
    hide_start_menu();
    false_position();
  });
  document.querySelector(`#secant_method`).addEventListener("click", () => {
    hide_start_menu();
    secant();
  });
  document.querySelector(`#newton_raphson_method`).addEventListener("click", () => {
    hide_start_menu();
    newton_raphson();
  });
};

const reset = () => {  
  object_buffer.bisection_method.objects.forEach(obj => {
    obj.destroy();
  });
  object_buffer.bisection_method.objects=[];

  object_buffer.false_position_method.objects.forEach(obj => {
    obj.destroy(); 
  })
  object_buffer.false_position_method.objects=[];

  object_buffer.secant_method.objects.forEach(obj => {
    obj.destroy(); 
  })
  object_buffer.secant_method.objects=[];

  object_buffer.newton_raphson_method.objects.forEach(obj => {
    obj.destroy(); 
  }) 
  object_buffer.newton_raphson_method.objects=[];
  show_start_menu();
};
restart.addEventListener("click", () => {
  reset();
});

const bisection = () => {
  let x = new Method.Bisection(screen,object_buffer.bisection_method.objects, bisection); 
};
const false_position = () => {
  let x = new Method.False_Position(screen,object_buffer.false_position_method.objects, false_position); 
};
const secant = () => {
  let x = new Method.Secant(screen,object_buffer.secant_method.objects, secant);  
};
const newton_raphson = () => {
  let x = new Method.NewtonRaphson(screen,object_buffer.newton_raphson_method.objects, newton_raphson); 
};
// const mullers = () => {
//   let x = new Method.Bisection(screen, bisection);
//   object_buffer.bisection_method.objects.push(x); 
// };

////////////main/////////

window.onload=(show_start_menu(btnObjects));