// 1 - 3

function createBook(title, author, read = false) {
  return {
    // shorthand syntax when prop & val have same name
    title,
    author,
    read,

    getDescription() {
      console.log(`${this.title} was written by ${this.author}. ` +
       `I ${this.read ? `have` : `haven't`} read it.`);
    },

    readBook() {
      this.read = true;
    }
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);

console.log(book1.read); // false
console.log(book2.read); // false
console.log(book3.read); // true

book1.readBook();
console.log(book1.read);
// book2.readBook();
// console.log(book2.read);

book1.getDescription();
book2.getDescription();
book3.getDescription();