'use strict'

function toPascalCase(str) {
    return (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
}

function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function toKebabCase(str) {
    return str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, function (match) {
        return "-" + match.toLowerCase();
    });
}

const list = [
    'createDto',
    'getPageResponseDto',
    'getRequestDto',
    'getResponseDto',
    'updateDto',
    'constant',
    'controller',
    'entity',
    'interface',
    'mock',
    'serviceSpec',
    'service',
]

const initial = [
    'createDto',
    'getPageResponseDto',
    'getRequestDto',
    'getResponseDto',
    'updateDto',
    'constant',
    'controller',
    'entity',
    'interface',
    'mock',
    'serviceSpec',
    'service',
]

module.exports = {
    prompt: ({ prompter, args }) => {
        return prompter.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Name:',
                validate(value) {
                    if (!value.length) {
                        return 'Module must have a name.';
                    }
                    return true;
                },
            },
            {
                type: 'MultiSelect',
                name: 'blocks',
                message: 'Blocks:',
                initial: initial,
                choices: list.map(item => {
                    return {
                        name: toCamelCase(item),
                        value: toKebabCase(item)
                    }
                })
            }
        ])
            .then(answer => {
                //// For debugging
                // console.log(answer)
                return answer;
            })
    }
}

