describe('Blog app', () => {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'root',
            username: 'root',
            password: 'sekret'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('root')
            cy.get('#password').type('sekret')
            cy.get('#login-button').click()

            cy.contains('root logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('root')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')

            cy.get('html').should('not.contain', 'root logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function () {
            cy.login({ username: 'root', password: 'sekret' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('Zhanghu Zhao')
            cy.get('#url').type('http://blogurl.com')
            cy.get('#create-button').click()

            cy.contains('a blog created by cypress')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'a blog created by cypress',
                    author: 'Zhanghu Zhao',
                    url: 'http://blogurl.com'
                })
            })

            it('A blog can be liked', function () {
                cy.get('.titleAndAuthor').contains('view').click()
                cy.get('.blogLikes').should('contain', 'likes 0')
                cy.get('#like-button').click()
                cy.get('.blogLikes').should('contain', 'likes 1')
            })

            it('A blog can be removed by its creator', function () {
                cy.get('.titleAndAuthor').contains('view').click()
                cy.get('#remove-button').click()
                cy.should('not.contain', 'a blog created by cypress')
            })
        })

        describe('and many blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'blog1 created by cypress',
                    author: 'Zhanghu Zhao',
                    url: 'http://blogurl.com',
                    likes: 1
                })

                cy.createBlog({
                    title: 'blog2 created by cypress',
                    author: 'Zhanghu Zhao',
                    url: 'http://blogurl.com',
                    likes: 2
                })

                cy.createBlog({
                    title: 'blog3 created by cypress',
                    author: 'Zhanghu Zhao',
                    url: 'http://blogurl.com',
                    likes: 3
                })

                cy.createBlog({
                    title: 'blog4 created by cypress',
                    author: 'Zhanghu Zhao',
                    url: 'http://blogurl.com',
                    likes: 4
                })

                cy.createBlog({
                    title: 'blog5 created by cypress',
                    author: 'Zhanghu Zhao',
                    url: 'http://blogurl.com',
                    likes: 5
                })
            })

            it('blogs are ordered by likes', function () {
                cy.get('.blog').eq(0).should('contain', 'blog5 created by cypress')
                cy.get('.blog').eq(1).should('contain', 'blog4 created by cypress')
                cy.get('.blog').eq(2).should('contain', 'blog3 created by cypress')
                cy.get('.blog').eq(3).should('contain', 'blog2 created by cypress')
                cy.get('.blog').eq(4).should('contain', 'blog1 created by cypress')
            })
        })

    })
})