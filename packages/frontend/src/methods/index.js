
function clearMainStyles() {
    const styleSheet = Array.from(document.styleSheets).find(({ href }) => href.includes('main'));
    if (styleSheet) {
        while (styleSheet.cssRules.length !== 0) {
            styleSheet.deleteRule(styleSheet.cssRules.length - 1);
        }
    }
}

function insertNewStyles(rules) {
    const style = document.createElement('style');
    style.styleSheet.cssText = rules;
    document.head.appendChild('link');
}

export function evalMethod() {
    return Promise.all([
        fetch('/1.0.0/static/js/main.2de9c4f5.js', { method: 'GET' }),
        fetch('/1.0.0/static/css/main.2de9c4f5.css', { method: 'GET' }),
    ])
    .then((results) => results.map((response) => response.text()))
    .then(([scripts, styles]) => {
        clearMainStyles();
        insertNewStyles(styles);
        eval(scripts);

    });
}