declare namespace InteractiveGraphNamespace {
    export interface IInteractiveGraphScss {
      intGraphFlexContainer: string;
      graphContainer: string;
      selectStateNote: string;
    }
  }

declare const InteractiveGraphScssModule: InteractiveGraphNamespace.IInteractiveGraphScss & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: InteractiveGraphNamespace.IInteractiveGraphScss;
  };

  export = InteractiveGraphScssModule;
