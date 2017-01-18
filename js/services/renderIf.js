module.exports = renderIf;

function renderIf(condition, content) {
    if (condition) {
        return content;
    }
        return null;
}
