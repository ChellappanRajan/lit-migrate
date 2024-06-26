#!/usr/bin/env node

import { Project, SyntaxKind } from "ts-morph";
import chalk from "chalk";

const defaultPath = "**/!(*.d).ts";
const path =
  process.argv.slice(2).at(0)?.split("=")?.slice(1)?.join() ?? defaultPath;

// Initialize the project
const project = new Project();


const LIT_DECORATORS = [
  "property",
  "query",
  "queryAll",
  "queryAssignedElements",
  "queryAssignedNodes",
  "state",
];

// Add source files to the project
project.addSourceFilesAtPaths(path);

// Function to modify the @property decorator
function modifyPropertyDecorator() {
  const allSourceFiles = project.getSourceFiles();
  console.log(chalk.yellow(`📁 Total: ${allSourceFiles.length} Files Found`)); 

  // Iterate through all source files in the project
  allSourceFiles.forEach((sourceFile) => {
    // Find all property declarations
    const propertyDeclarations = sourceFile.getDescendantsOfKind(
      SyntaxKind.PropertyDeclaration
    );

    propertyDeclarations.forEach((propertyDeclaration) => {
      const decorators = propertyDeclaration.getDecorators();

      decorators.forEach((decorator) => {
        if (LIT_DECORATORS.includes(decorator.getFullName())) {
          if (propertyDeclaration.hasQuestionToken()) {
            propertyDeclaration.setHasQuestionToken(false);
            const typeNode = propertyDeclaration.getTypeNode();
            const typeText = typeNode ? typeNode.getText() : "any";
            propertyDeclaration.toggleModifier("accessor", true);
            propertyDeclaration.setType(`${typeText} | undefined`);
          } else {
            propertyDeclaration.toggleModifier("accessor", true);
          }
        }
      });
    });

    // Save the modified source file
    sourceFile.saveSync();
  });
  console.log(chalk.green("🎉 Migration Completed..."));
}

console.log(chalk.green("🚀 Migration Started..."));
// Run the function
modifyPropertyDecorator();
