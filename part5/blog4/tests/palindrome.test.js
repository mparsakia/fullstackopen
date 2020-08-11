// ******************************************************************
// Palindrome check for tests
// ******************************************************************
// The first line: the test file imports the function 
// to be tested and assigns it to a variable called palindrome:

const palindrome = require('../utils/for_testing').palindrome

test('palindrome of a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of releveler', () => {
  const result = palindrome('releveler')

  expect(result).toBe('releveler')
})


/** RUN TESTS: npm test
 * Individual test cases are defined with the test function. 
 * The first parameter of the function is the test description as a string.
 * The second parameter is a function, that defines the functionality for the test case. 
 * 
 * First we execute the code to be tested, 
 * meaning that we generate a palindrome for the string react. 
 * Next we verify the results with the expect function.
 * 
 * Expect wraps the resulting value into an object that offers a collection 
 * of matcher functions,that can be used for verifying the correctness of the result.
 * 
 * Since in this test case we are comparing two strings, we can use the toBe matcher.
 */
