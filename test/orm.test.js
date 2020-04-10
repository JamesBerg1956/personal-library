const orm = require ("../config/orm.js");

describe("orm", () => {

    describe("innerJoin", () => {

        it("Should return a promise object", () =>{
            
            orm.innerJoin("authors", ["firstname", "lastname", "title", "coverPhoto"] , "books", "id", "authorId")
            .then(function(result){

                expect(result instanceof Promise).toEqual(true);

            }); 
        });
    });

    describe("innerJoinWhere", () => {

        it("should return a promise object", () => {

                orm.innerJoinWhere("authors", ["firstname", "lastname", "title", "coverPhoto"], "books", "id", "authorId", "title", "Harry Potter and the Sorcerer's Stone")
                .then(function(result){

                    expect(result instanceof Promise).toEqual(true);
    
                }); 
        });

    });

});