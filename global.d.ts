declare module 'react-cytoscapejs' {
  import * as React from 'react';
  import { Core, ElementDefinition, Stylesheet, LayoutOptions } from 'cytoscape';

  interface CytoscapeComponentProps {
    elements: ElementDefinition[] | { nodes: ElementDefinition[]; edges: ElementDefinition[] };
    style?: React.CSSProperties;
    layout?: LayoutOptions;
    stylesheet?: Stylesheet[];
    cy?: (cy: Core) => void;
    className?: string;
  }

  const CytoscapeComponent: React.FC<CytoscapeComponentProps>;

  export default CytoscapeComponent;
}

declare module "cytoscape-cose-bilkent" {
  import cytoscape from "cytoscape";
  const register: (cy: typeof cytoscape) => void;
  export default register;
}

declare module "cytoscape-dagre" {
  import cytoscape from "cytoscape";
  const register: (cy: typeof cytoscape) => void;
  export default register;
}

declare module "cytoscape-klay" {
  import cytoscape from "cytoscape";
  const register: (cy: typeof cytoscape) => void;
  export default register;
}
