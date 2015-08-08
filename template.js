function template(fragment, element, text, comment, dynamic, createBindingClass) {
    return fragment([element('table', {
        'class': 'table table-striped latest-data'
    }, dynamic(element('repeat', {
        'as': 'db'
    }, element('tbody', {}, element('tr', {}, element('td', {
        'class': 'dbname'
    }, dynamic(text(), createBindingClass(void 0, function(context) {
        this.ref.nodeValue = this.view.get('db.name');
    })), text('')), comment('abba '), element('td', {
        'class': 'query-count'
    }, dynamic(element('span', {}, dynamic(text(), createBindingClass(void 0, function(context) {
        this.ref.nodeValue = this.options.modifiers.sampleLength(this.view.get('db'));
    })), text('')), createBindingClass(void 0, function(context) {
        this.setAttribute('class', this.options.modifiers.countClassName(this.options.modifiers.sampleLength(this.view.get('db'))));
    })), text('')), dynamic(element('repeat', {
        'as': 'q'
    }, dynamic(element('td', {}, dynamic(text(), createBindingClass(void 0, function(context) {
        this.ref.nodeValue = this.options.modifiers.formatElapsed(this.view.get('q.elapsed'));
    })), element('div', {
        'class': 'popover left'
    }, element('div', {
        'class': 'popover-content'
    }, dynamic(text(), createBindingClass(void 0, function(context) {
        this.ref.nodeValue = this.view.get('q.query');
    })), text('')), element('div', {
        'class': 'arrow'
    }), text('')), text('')), createBindingClass(void 0, function(context) {
        this.setAttribute('class', this.options.modifiers.elapsedClassName(this.view.get('q.elapsed')));
    })), text('')), createBindingClass(void 0, function(context) {
        this.setAttribute('each', this.view.get('db.topFiveQueries'));
    })), text('')), text('')), text('')), createBindingClass(void 0, function(context) {
        this.setAttribute('each', this.view.get('databases'));
    })), text(''))])
}
