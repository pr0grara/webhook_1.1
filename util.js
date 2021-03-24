 const numPicker = () => {
    var num = Math.floor(Math.random() * 74) + 48;
    return num;
 }
 
const idGenerator = () => {
    var id = "A-"
    while (id.length < 12) {
        var num = numPicker();
        while (num > 57 && num < 65 || num > 90 && num < 97) num = numPicker();
        id = id + String.fromCharCode(num);
    }
    return id;
}

module.exports = idGenerator;