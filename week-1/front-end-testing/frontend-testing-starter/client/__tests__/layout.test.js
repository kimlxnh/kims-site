const {renderDOM} = require('./helpers')
//variables need to be global for it to be accessed
let dom
let document
describe('index.html', () => {
//hooks - beforeAll, beforeEach, afterAll, afterEach
    beforeEach(async() => {
        dom = await renderDOM('./index.html')
        document = await dom.window.document; 
    })
    it('has a button with the correct message', () => {
        const btn = document.querySelector('button')
        expect(btn).toBeTruthy
        expect(btn.innerHTML).toBe('Click me')
    })
    it('h1 is empty when the website loads', () => {
        const h1 = document.querySelector('h1')
        expect(h1).toBeTruthy
        expect (h1.innerHTML).toContain('')
    })

    it ('displays morning when the btn is clicked', () => {
        const btn = document.querySelector('button')
        btn.click()
        const h1 = document.querySelector('h1')
        expect(h1.innerHTML).toBe('morning')
    })
    it ('displays dark mode when the darkmode button is clicked', () => {
        const body = document.querySelector('body')
        const darkModeBtn = document.querySelector('#dark-mode')

        darkModeBtn.click()
        //alternatively this line does the same as above
        //darkModeBtn.dispatchEvent(new dom.window.Event('click));
        expect(body.className).toBe('dark-mode')
    })
    it ('adds the name to the h1', () => {
        const form = document.querySelector('form')
        const h1 = document.querySelector('h1')

        const input = document.querySelector('#name')
        input.value = 'Kim'
        form.dispatchEvent(new dom.window.Event('submit'));
            expect (h1.innerHTML).toContain(input.value)
    })

    it ('switches back to light mode', () => {
        const body = document.querySelector('body')
        const darkModeBtn = document.querySelector ('#dark-mode')
        darkModeBtn.click()
        darkModeBtn.click()
        expect(body.className).toBe('')
    })

})

//overall test will only pass when all the test passes in here