console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");
});

Hooks.on("init", () => {
    game.settings.register("your-module-name", "selectedFolders", {
      name: "Selected Folders",
      hint: "Folders for asset processing",
      scope: "world",
      config: true,
      type: String,
      default: "",
    });
  });
  
  Hooks.on("renderSidebarTab", (app, html) => {
    if (app.options.id === "files") {
      // Add a button to initiate the process
      html.find(".directory-list").append(`<button id="process-assets">Process Assets</button>`);
  
      // Handle button click
      html.find("#process-assets").click(() => {
        // Open a dialog for folder selection
        new FolderSelectionForm().render(true);
      });
    }
  });
  
  class FolderSelectionForm extends FormApplication {
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        template: "path-to-your-template", // Create an HTML template for your form
        title: "Select Folders for Processing",
        id: "folder-selection-form",
        closeOnSubmit: true,
      });
    }
  
    getData() {
      return {
        folders: game.folders.entities,
      };
    }
  
    async _updateObject(event, formData) {
      const selectedFolders = formData["selected-folders"];
      // Save selected folders to settings
      await game.settings.set("your-module-name", "selectedFolders", selectedFolders);
  
      // Trigger your import, calculation, and update logic
      // You can use the selectedFolders array for processing
      YourModule.processAssets(selectedFolders);
    }
  }
  
  class YourModule {
    static async processAssets(selectedFolders) {
      // Implement your logic for asset import, calculations, and folder updates here
    }
  }
  