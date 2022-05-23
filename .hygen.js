const pluralize = require('pluralize')
module.exports = {
    templates: `${__dirname}/.hygen`,
    helpers: {
        /**
         * Class name
         * */
        createDtoClassName(name) {
            return `Create${this.className(name)}Dto`;
        },
        getPageResponseDtoClassName(name) {
            return `GetPage${this.className(name)}ResponseDto`;
        },
        getRequestDtoClassName(name) {
            return `Get${this.className(name)}RequestDto`;
        },
        getResponseDtoClassName(name) {
            return `Get${this.className(name)}ResponseDto`;
        },
        updateDtoClassName(name) {
            return `Update${this.className(name)}Dto`;
        },
        constantClassName(name) {
            return `${this.className(name)}Constant`;
        },
        controllerClassName(name) {
            return `${this.className(name)}Controller`;
        },
        entityClassName(name) {
            return `${this.className(name)}Entity`;
        },
        interfaceClassName(name) {
            return `I${this.className(name)}`;
        },
        mockClassName(name) {
            return `${this.className(name)}Mock`;
        },
        moduleClassName(name) {
            return `${this.className(name)}Module`;
        },
        serviceClassName(name) {
            return `${this.className(name)}Service`;
        },

        /**
         * File name
         * */
        createDtoFileName(name) {
            return `create-${this.fileName(name)}.dto`;
        },
        getPageResponseDtoFileName(name) {
            return `get-page-${this.fileName(name)}-page-response.dto`;
        },
        getRequestDtoFileName(name) {
            return `get-${this.fileName(name)}-request.dto`;
        },
        getResponseDtoFileName(name) {
            return `get-${this.fileName(name)}-response.dto`;
        },
        updateDtoFileName(name) {
            return `update-${this.fileName(name)}.dto`;
        },
        constantFileName(name) {
            return `${this.fileName(name)}.constant`;
        },
        controllerFileName(name) {
            return `${this.fileName(name)}.controller`;
        },
        entityFileName(name) {
            return `${this.fileName(name)}.entity`;
        },
        interfaceFileName(name) {
            return `${this.fileName(name)}.interface`;
        },
        mockFileName(name) {
            return `${this.fileName(name)}.mock`;
        },
        moduleFileName(name) {
            return `${this.fileName(name)}.module`;
        },
        serviceSpecFileName(name) {
            return `${this.fileName(name)}.service.spec`;
        },
        serviceFileName(name) {
            return `${this.fileName(name)}.service`;
        },

        /**
         * Utils
         * */
        fileName(name) {
            return this.changeCase.kebabCase(name).toLowerCase();
        },
        className(name) {
            return this.changeCase.pascalCase(name);
        },
        variableName(name) {
            return this.changeCase.camelCase(name);
        },
        entityPluralName(name){
            return pluralize(this.fileName(name))
        }
    },
}
