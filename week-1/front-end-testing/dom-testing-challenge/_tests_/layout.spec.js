/**
 * @jest-environment jsdom
 */

const { renderDOM } = require('./helpers');

let dom;
let document;

describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./index.html');
    document = await dom.window.document;
  })
  
  it('has a button', () => {
    const btn = document.querySelector('form button')
    expect(btn).toBeTruthy
    expect(btn.innerHTML).toBe("Submit")
  })

  it('h1 is empty when website loads', () => {
    const h1 = document.querySelector('h1')
    expect(h1).toBeTruthy
    expect(h1.innerHTML).toContain('')
  })

  it('adds the input value to the h1', () => {
    const form = document.querySelector('form')
    const h1 = document.querySelector('h1')
  
    const input = document.querySelector('#email')
    input.value = 'Kim'
    form.dispatchEvent(new dom.window.Event('submit'));
  
    expect(h1.innerHTML).toContain(input.value)
  })

  it('background colour is white', () => {
  const bgcolor = document.querySelector('#background');
  expect(bgcolor.style.backgroundColor).toBe('');
});
})