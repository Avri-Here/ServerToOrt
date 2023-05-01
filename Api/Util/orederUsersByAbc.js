function orederUsersByAbc(sorted) {
    const orderArry = sorted.sort((a, b) => a.localeCompare(b))
    let comper = " ";
    orderArry.forEach(element => {
        comper = comper + element;
    });
    return comper;
}
module.exports = orederUsersByAbc;
