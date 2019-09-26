// function to copy object
function copy(obj) {
  const copy = Object.create(Object.getPrototypeOf(obj));
  const propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name) {
    const desc = Object.getOwnPropertyDescriptor(obj, name);
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}


const addToObject = function(obj, key, value, index) {
  // Create a temp object and index variable
  var temp = {};
  var i = 0;

  // Loop through the original object
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // If the indexes match, add the new item
      if (i === index && key && value) {
        temp[key] = value;
      }

      // Add the current item in the loop to the temp obj
      temp[prop] = obj[prop];

      // Increase the count
      i++;
    }
  }

  // If no index, add to the end
  if (!index && key && value) {
    temp[key] = value;
  }

  return temp;
};

let data = [
  { id: "1", animal: "dog", color: "black" },
  { id: "2", name: "Buddy", age: "7" },
  { id: "3", name: "Daisy", friends: ["cat", "dog"] },
  { id: "4", animal: "cat", hates: "dog" },
  { id: "5", name: "Smokey" },
  { id: "6", name: "Oscar", hobbyes: [{ chess: 2, football: 4 }] }
];

const exp1 = { name: "Buddy", age: "7" };
const exp2 = {
  name: "Oscar",
  hobbyes: [{ chess: 2, football: 4, racing: "???" }]
};
const exp3 = { name: "Smokey", 0: [] };

function fn(array, object) {
  let counter = 0;

  for (let [i, array_object] of array.entries()) {
    let obj2 = copy(array_object);
    delete obj2.id;

    if (JSON.stringify(obj2) === JSON.stringify(object)) {
      counter++;
      console.log(array_object.id);

      // if last index reached and exp object is not found in our object array
    } else if (i === data.length - 1 && counter === 0) {
      let generated_id = data.length + 1;
      let now = addToObject(object, 'id', generated_id.toString(), 0);
      array.push(now);
      break;
    }
  }
  console.log(array);
}

fn(data, exp1);
fn(data, exp2);
fn(data, exp3);