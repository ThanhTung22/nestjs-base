'use strict'

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
module.exports = {
    prompt: ({prompter, args}) => {
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
                initial: list,
                choices: list
            }
        ])
            .then(answer => {
                //// For debugging
                // console.log(answer)
                return answer;
            })
    }
}

