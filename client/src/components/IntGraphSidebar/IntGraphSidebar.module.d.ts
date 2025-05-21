declare namespace IntGraphSidebar {
    export interface IntGraphSidebar {
      columnSidebar: string;
      rowSidebar: string;
    }
  }

declare const IntGraphSidebarScssModule: IntGraphSidebar.IntGraphSidebar & {
    /** WARNING: Only available when "css-loader" is used without "style-loader" or "mini-css-extract-plugin" */
    locals: IntGraphSidebar.IntGraphSidebar;
  };

  export = IntGraphSidebarScssModule;
