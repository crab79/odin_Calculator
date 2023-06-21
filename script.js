const add = function(...nums) {
	let result = 0;
  for (let i=0; i<nums.length; i++) {
    result += nums[i]; 
  }
  return result;
};

const subtract = function(...nums) {
	let result = nums[0];
  for (let i=1; i<nums.length; i++) {
    result -= nums[i]; 
  }
  return result;
};

const sum = function(nums) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    if (typeof nums[i] === 'number' && !isNaN(nums[i])) {
      result += nums[i];
    }
  }
  return result;
};


const multiply = function(...nums) {
	let result = nums[0];
  for (let i=1; i<nums.length; i++) {
    result *= nums[i]; 
  }
  return result;
};

const power = function(...nums) {
  let result = 1;
  for (let i=0; i<nums[1]; i++) {
    result *= nums[0]; 
  }
  return result;
};

const factorial = function(num) {
  let result = 1;
  for (let i=1; i<=num; i++) {
    result *= i; 
  }
  return result;
};