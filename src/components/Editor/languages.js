// Load all (br)ace languages
function importAll (r) {
    r.keys().forEach(r);
}
importAll(require.context('brace/mode', true, /\.js$/));
