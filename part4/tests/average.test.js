// ******************************************************************
// Average function check for tests
// ******************************************************************

const average = require('../utils/for_testing').average

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})


// There's a few things to notice about the tests that we just wrote. 
// We defined a describe block around the tests that was given the name average:
/*
    describe('average', () => {
      // tests
    })
*/
// As we will see later on describe blocks are necessary
// when we want to run some shared setup or teardown operations for a group of tests.

// Another thing to notice is that we wrote the tests in quite a compact way, 
// without assigning the output of the function being tested to a variable:
/*
  test('of empty array is zero', () => {
      expect(average([])).toBe(0)
  })
 
 */


