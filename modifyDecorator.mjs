#!/usr/bin/env node

import { Project, SyntaxKind } from "ts-morph";
import chalk from "chalk";
import yargs from "yargs";

const defaultPath = "**/!(*.d).ts";

// Set up yargs to parse command-line arguments
const argv = yargs()
  .option("path", {
    alias: "p",
    description: " Specify paths for migration",
    type: "string",
    default: defaultPath,
  })
  .help()
  .alias("help", "h").argv;

const path =
  process.argv.slice(2).at(0)?.split("=")?.slice(1)?.join() ?? defaultPath;

// Initialize the project
const project = new Project();

// Add source files to the project
// project.addSourceFilesAtPaths("src/**/*.ts");

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
  console.log(chalk.yellow(`📁 Total: ${allSourceFiles.length} Files Found`)); // Yellow text with folder emoji

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

console.log(chalk.green("🚀 Migration Started...")); // Green text with rocket emoji
// Run the function
modifyPropertyDecorator();
