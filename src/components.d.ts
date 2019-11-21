/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  IAction,
} from './components/button-split/button-split';

export namespace Components {
  interface PvButton {
    'disabled': boolean;
    'fill': 'stroke' | 'fill';
  }
  interface PvButtonSplit {
    'actions': IAction[];
    'fill': 'stroke' | 'fill';
    'onClick': (event: MouseEvent) => void;
  }
  interface PvCertificateViewer {
    'certificate': string;
  }
  interface PvCertificatesViewer {
    'certificates': string;
  }
  interface PvTextHider {
    'opened': boolean;
    'text': string;
  }
}

declare global {


  interface HTMLPvButtonElement extends Components.PvButton, HTMLStencilElement {}
  var HTMLPvButtonElement: {
    prototype: HTMLPvButtonElement;
    new (): HTMLPvButtonElement;
  };

  interface HTMLPvButtonSplitElement extends Components.PvButtonSplit, HTMLStencilElement {}
  var HTMLPvButtonSplitElement: {
    prototype: HTMLPvButtonSplitElement;
    new (): HTMLPvButtonSplitElement;
  };

  interface HTMLPvCertificateViewerElement extends Components.PvCertificateViewer, HTMLStencilElement {}
  var HTMLPvCertificateViewerElement: {
    prototype: HTMLPvCertificateViewerElement;
    new (): HTMLPvCertificateViewerElement;
  };

  interface HTMLPvCertificatesViewerElement extends Components.PvCertificatesViewer, HTMLStencilElement {}
  var HTMLPvCertificatesViewerElement: {
    prototype: HTMLPvCertificatesViewerElement;
    new (): HTMLPvCertificatesViewerElement;
  };

  interface HTMLPvTextHiderElement extends Components.PvTextHider, HTMLStencilElement {}
  var HTMLPvTextHiderElement: {
    prototype: HTMLPvTextHiderElement;
    new (): HTMLPvTextHiderElement;
  };
  interface HTMLElementTagNameMap {
    'pv-button': HTMLPvButtonElement;
    'pv-button-split': HTMLPvButtonSplitElement;
    'pv-certificate-viewer': HTMLPvCertificateViewerElement;
    'pv-certificates-viewer': HTMLPvCertificatesViewerElement;
    'pv-text-hider': HTMLPvTextHiderElement;
  }
}

declare namespace LocalJSX {
  interface PvButton {
    'disabled'?: boolean;
    'fill'?: 'stroke' | 'fill';
  }
  interface PvButtonSplit {
    'actions'?: IAction[];
    'fill'?: 'stroke' | 'fill';
    'onClick'?: (event: MouseEvent) => void;
  }
  interface PvCertificateViewer {
    'certificate'?: string;
  }
  interface PvCertificatesViewer {
    'certificates'?: string;
  }
  interface PvTextHider {
    'onTextExpand'?: (event: CustomEvent<any>) => void;
    'opened'?: boolean;
    'text'?: string;
  }

  interface IntrinsicElements {
    'pv-button': PvButton;
    'pv-button-split': PvButtonSplit;
    'pv-certificate-viewer': PvCertificateViewer;
    'pv-certificates-viewer': PvCertificatesViewer;
    'pv-text-hider': PvTextHider;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'pv-button': LocalJSX.PvButton & JSXBase.HTMLAttributes<HTMLPvButtonElement>;
      'pv-button-split': LocalJSX.PvButtonSplit & JSXBase.HTMLAttributes<HTMLPvButtonSplitElement>;
      'pv-certificate-viewer': LocalJSX.PvCertificateViewer & JSXBase.HTMLAttributes<HTMLPvCertificateViewerElement>;
      'pv-certificates-viewer': LocalJSX.PvCertificatesViewer & JSXBase.HTMLAttributes<HTMLPvCertificatesViewerElement>;
      'pv-text-hider': LocalJSX.PvTextHider & JSXBase.HTMLAttributes<HTMLPvTextHiderElement>;
    }
  }
}


