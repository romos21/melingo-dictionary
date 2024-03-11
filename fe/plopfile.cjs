module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?'
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{name}}/index.tsx',
                templateFile: 'plop-templates/component.ts.hbs',
            },
        ],
    });
    plop.setGenerator('page', {
        description: 'Create page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your page name?'
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{name}}/index.tsx',
                templateFile: 'plop-templates/component.ts.hbs',
            },
        ],
    });
};