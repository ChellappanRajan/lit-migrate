import { Project, SyntaxKind } from "ts-morph";

// Initialize the project
const project = new Project();

// Add source files to the project
// project.addSourceFilesAtPaths("src/**/*.ts");

// Add source files to the project
project.addSourceFilesAtPaths("./*.ts");

// Function to modify the @property decorator
function modifyPropertyDecorator() {
    // Iterate through all source files in the project
    project.getSourceFiles().forEach(sourceFile => {
        // Find all property declarations
        const propertyDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyDeclaration);

        propertyDeclarations.forEach(propertyDeclaration => {
            const decorators = propertyDeclaration.getDecorators();

            decorators.forEach(decorator => {
                const callExpression = decorator.getExpression();
                // propertyDeclaration.setType(`${callExpression.getText()}`);

                if(decorator.getFullName() === 'property'){
                    if(propertyDeclaration.hasQuestionToken()){
                        propertyDeclaration.setHasQuestionToken(false);
                        const typeNode = propertyDeclaration.getTypeNode(); 
                        const typeText = typeNode ? typeNode.getText() : "any";
                        propertyDeclaration.toggleModifier("accessor",true);
                        propertyDeclaration.setType(`${typeText} | undefined`);
                    }else{
                        propertyDeclaration.toggleModifier("accessor",true);
                    }
                }
                if(decorator.getFullName() === 'query'){
                    if(propertyDeclaration.hasQuestionToken()){
                        propertyDeclaration.setHasQuestionToken(false);
                        const typeNode = propertyDeclaration.getTypeNode(); 
                        const typeText = typeNode ? typeNode.getText() : "any";
                        propertyDeclaration.toggleModifier("accessor",true);
                        propertyDeclaration.setType(`${typeText} | undefined`);
                    }else{
                        propertyDeclaration.toggleModifier("accessor",true);
                    }
                }

                if(decorator.getFullName() === 'queryAll'){
                    if(propertyDeclaration.hasQuestionToken()){
                        propertyDeclaration.setHasQuestionToken(false);
                        const typeNode = propertyDeclaration.getTypeNode(); 
                        const typeText = typeNode ? typeNode.getText() : "any";
                        propertyDeclaration.toggleModifier("accessor",true);
                        propertyDeclaration.setType(`${typeText} | undefined`);
                    }else{
                        propertyDeclaration.toggleModifier("accessor",true);
                    }
                }
                if(decorator.getFullName() === 'queryAssignedElements'){
                    if(propertyDeclaration.hasQuestionToken()){
                        propertyDeclaration.setHasQuestionToken(false);
                        const typeNode = propertyDeclaration.getTypeNode(); 
                        const typeText = typeNode ? typeNode.getText() : "any";
                        propertyDeclaration.toggleModifier("accessor",true);
                        propertyDeclaration.setType(`${typeText} | undefined`);
                    }else{
                        propertyDeclaration.toggleModifier("accessor",true);
                    }
                }
                if(decorator.getFullName() === 'queryAssignedNodes'){
                    if(propertyDeclaration.hasQuestionToken()){
                        propertyDeclaration.setHasQuestionToken(false);
                        const typeNode = propertyDeclaration.getTypeNode(); 
                        const typeText = typeNode ? typeNode.getText() : "any";
                        propertyDeclaration.toggleModifier("accessor",true);
                        propertyDeclaration.setType(`${typeText} | undefined`);
                    }else{
                        propertyDeclaration.toggleModifier("accessor",true);
                    }
                }
                if(decorator.getFullName() === 'state'){
                    if(propertyDeclaration.hasQuestionToken()){
                        propertyDeclaration.setHasQuestionToken(false);
                        const typeNode = propertyDeclaration.getTypeNode(); 
                        const typeText = typeNode ? typeNode.getText() : "any";
                        propertyDeclaration.toggleModifier("accessor",true);
                        propertyDeclaration.setType(`${typeText} | undefined`);
                    }else{
                        propertyDeclaration.toggleModifier("accessor",true);
                    }
                }

                
                
                
            
            });
        });

        // Save the modified source file
        sourceFile.saveSync();
    });
}

// Run the function
modifyPropertyDecorator();

