import { Project, SyntaxKind } from "ts-morph";


// Initialize the project
const project = new Project();

// Add source files to the project
// project.addSourceFilesAtPaths("src/**/*.ts");

const LIT_DECORATORS = ['property','query','queryAll','queryAssignedElements','queryAssignedNodes','state'];

// Add source files to the project

// Function to modify the @property decorator
export function modifyPropertyDecorator(path) {

    project.addSourceFilesAtPaths(path);
    const allSourceFiles = project.getSourceFiles();
    console.log(`Total:${allSourceFiles.length} File Found..`);
    // Iterate through all source files in the project
    allSourceFiles.forEach(sourceFile => {
        // Find all property declarations
        const propertyDeclarations = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyDeclaration);

        propertyDeclarations.forEach(propertyDeclaration => {
            const decorators = propertyDeclaration.getDecorators();

            decorators.forEach((decorator) => {
                if(LIT_DECORATORS.includes(decorator.getFullName())){
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
// modifyPropertyDecorator();


