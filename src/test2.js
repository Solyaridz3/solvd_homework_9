const array1 = [1, 2, 3];

const obj = {
    1: "asd",
    2: "qqwe",
};

console.log(Object.entries(obj).forEach(element => {
    console.log(element);
}));
