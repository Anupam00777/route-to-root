import * as Method from "./numerical_methods";

const screen = document.querySelector(".screen");
const startPage = document.querySelector(".startPage");
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
const hide_start_menu = () => {
  startPage.style.display = "none";
};

const show_start_menu = () => {
  startPage.style.display = "flex";
};
const load_start_menu = (obj) => {
  obj.forEach((node) => {
    let child = `<button type="button" title="${node.title}" id="${node.id}" class="
        w-[40%] min-w-[120px] h-max p-2 bg-blue-700 border-[3px] border-t-black border-l-black border-b-gray-500 border-r-gray-500 font-mono font-semibold text-lg text-clip text-center flex  items-center justify-center my-3 hover:bg-green-400 transition-[all]  duration-[1500]">${node.content}</button>`;
    startPage.innerHTML += child;
    object_buffer[node.id].button = document.querySelector(`#${node.id}`);
  });
};

load_start_menu([
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
]);

const reset = () => {
  window.location.reload();
};
restart.addEventListener("click", () => {
  reset();
});

bisection_method.addEventListener("click", () => {
  hide_start_menu();
  bisection();
});

const bisection = () => {
  let x = new Method.Bisection(screen, bisection);
  object_buffer.bisection_method.objects.push(x);
};
const false_position = () => {
  let x = new Method.Bisection(screen, bisection);
  object_buffer.bisection_method.objects.push(x);
  console.log(2);
};
const secant = () => {
  let x = new Method.Bisection(screen, bisection);
  object_buffer.bisection_method.objects.push(x);
  console.log(2);
};
const newton_raphson = () => {
  let x = new Method.Bisection(screen, bisection);
  object_buffer.bisection_method.objects.push(x);
  console.log(2);
};
const mullers = () => {
  let x = new Method.Bisection(screen, bisection);
  object_buffer.bisection_method.objects.push(x);
  console.log(2);
};
