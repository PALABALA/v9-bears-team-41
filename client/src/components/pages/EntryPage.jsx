import React, { Component } from 'react';
const ReactMarkdown = require('react-markdown');

class EntryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markdownString: '# This is a header\n\nAnd this is a paragraph'
        };
    }

    async componentDidMount() {
        const entryName = window.location.search.substring(1).toLowerCase();
        console.log(entryName);

        // const url = 'https://gist.githubusercontent.com/Robbertdk/348939c16bae20b80edc/raw/360985914320ee79cf813855d49264a841d8dd57/markdown-dummy';
        const url = 'http://localhost:3001/' + entryName;

        try {
            const response = await fetch(url);
            if (!response.ok) { throw new Error(response.statusText); }
            const text = await response.text();
            this.setState({ markdownString: text });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { markdownString } = this.state;
        return (
            <div className="EntryPage">
                <p>This is the entry page</p>
                <ReactMarkdown
                    source={markdownString}
                    escapeHtml={false}
                />
            </div>
        );
    }
}

export default EntryPage;
