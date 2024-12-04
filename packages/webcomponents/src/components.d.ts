/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AttributeCertificateProp } from "./components/attribute-certificate-viewer/attribute-certificate-viewer";
import { ButtonMenuGroup } from "./components/button-menu/button-menu";
import { X509Certificate, X509Certificates } from "./crypto";
import { CertificateProp } from "./components/certificate-viewer/certificate-viewer";
import { ICertificate } from "./components/certificates-viewer/certificates-viewer";
import { CrlProp } from "./components/crl-viewer/crl-viewer";
import { CsrProp } from "./components/csr-viewer/csr-viewer";
export { AttributeCertificateProp } from "./components/attribute-certificate-viewer/attribute-certificate-viewer";
export { ButtonMenuGroup } from "./components/button-menu/button-menu";
export { X509Certificate, X509Certificates } from "./crypto";
export { CertificateProp } from "./components/certificate-viewer/certificate-viewer";
export { ICertificate } from "./components/certificates-viewer/certificates-viewer";
export { CrlProp } from "./components/crl-viewer/crl-viewer";
export { CsrProp } from "./components/csr-viewer/csr-viewer";
export namespace Components {
    interface PeculiarAttributeCertificateViewer {
        /**
          * Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
         */
        "authKeyIdParentLink"?: string;
        /**
          * Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
         */
        "authKeyIdSiblingsLink"?: string;
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate": AttributeCertificateProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
         */
        "subjectKeyIdChildrenLink"?: string;
        /**
          * Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://some.com/{{subjectKeyId}}
         */
        "subjectKeyIdSiblingsLink"?: string;
    }
    interface PeculiarButtonMenu {
        "groups": ButtonMenuGroup[];
    }
    interface PeculiarCertificateChainViewer {
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificates": X509Certificates;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
    }
    interface PeculiarCertificateDecoder {
        /**
          * The example certificate value for decode and show details. Use PEM or DER.
         */
        "certificateExamples"?: {
    title: string;
    value: string;
  }[];
        /**
          * The default certificate value for decode and show details. Use PEM or DER.
         */
        "certificateToDecode"?: string;
    }
    interface PeculiarCertificateViewer {
        /**
          * Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
         */
        "authKeyIdParentLink"?: string;
        /**
          * Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
         */
        "authKeyIdSiblingsLink"?: string;
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate": CertificateProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Issuer DN link. **NOTE**: HTML component attribute must be `issuer-dn-link`.
         */
        "issuerDnLink"?: string;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
         */
        "subjectKeyIdChildrenLink"?: string;
        /**
          * Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://some.com/{{subjectKeyId}}
         */
        "subjectKeyIdSiblingsLink"?: string;
    }
    interface PeculiarCertificatesViewer {
        /**
          * List of certificates values for decode and show in the list. <br /> **NOTE**: If you do not provide a `name` value when invocing the component it will take the first Subject CN value. <br /> **NOTE**: If you do not provide a `tests` this column will be ommited from the rendered page. <br /> **NOTE**: If the supplied certificates are self-signed the issuer column will be ommited.
         */
        "certificates": ICertificate[];
        /**
          * Use filter in the list when search is changed.
         */
        "filterWithSearch": boolean;
        /**
          * Use highlight chapters in the list when search is changed.
         */
        "highlightWithSearch": boolean;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
    }
    interface PeculiarCircularProgress {
        /**
          * Width/height of progress circle.
         */
        "size": number;
        /**
          * Stroke width of progress bar circle.
         */
        "width": number;
    }
    interface PeculiarCrlViewer {
        /**
          * Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
         */
        "authKeyIdParentLink"?: string;
        /**
          * Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
         */
        "authKeyIdSiblingsLink"?: string;
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate": CrlProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Issuer DN link. **NOTE**: HTML component attribute must be `issuer-dn-link`.
         */
        "issuerDnLink"?: string;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
    }
    interface PeculiarCsrViewer {
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate": CsrProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
         */
        "subjectKeyIdChildrenLink"?: string;
        /**
          * Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://some.com/{{subjectKeyId}}
         */
        "subjectKeyIdSiblingsLink"?: string;
    }
    interface PeculiarHighlightWords {
        "search": string;
    }
    interface PeculiarTextHider {
    }
}
export interface PeculiarCertificateDecoderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPeculiarCertificateDecoderElement;
}
export interface PeculiarCertificatesViewerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPeculiarCertificatesViewerElement;
}
declare global {
    interface HTMLPeculiarAttributeCertificateViewerElement extends Components.PeculiarAttributeCertificateViewer, HTMLStencilElement {
    }
    var HTMLPeculiarAttributeCertificateViewerElement: {
        prototype: HTMLPeculiarAttributeCertificateViewerElement;
        new (): HTMLPeculiarAttributeCertificateViewerElement;
    };
    interface HTMLPeculiarButtonMenuElement extends Components.PeculiarButtonMenu, HTMLStencilElement {
    }
    var HTMLPeculiarButtonMenuElement: {
        prototype: HTMLPeculiarButtonMenuElement;
        new (): HTMLPeculiarButtonMenuElement;
    };
    interface HTMLPeculiarCertificateChainViewerElement extends Components.PeculiarCertificateChainViewer, HTMLStencilElement {
    }
    var HTMLPeculiarCertificateChainViewerElement: {
        prototype: HTMLPeculiarCertificateChainViewerElement;
        new (): HTMLPeculiarCertificateChainViewerElement;
    };
    interface HTMLPeculiarCertificateDecoderElementEventMap {
        "successParse": string;
        "clearCertificate": void;
    }
    interface HTMLPeculiarCertificateDecoderElement extends Components.PeculiarCertificateDecoder, HTMLStencilElement {
        addEventListener<K extends keyof HTMLPeculiarCertificateDecoderElementEventMap>(type: K, listener: (this: HTMLPeculiarCertificateDecoderElement, ev: PeculiarCertificateDecoderCustomEvent<HTMLPeculiarCertificateDecoderElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLPeculiarCertificateDecoderElementEventMap>(type: K, listener: (this: HTMLPeculiarCertificateDecoderElement, ev: PeculiarCertificateDecoderCustomEvent<HTMLPeculiarCertificateDecoderElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLPeculiarCertificateDecoderElement: {
        prototype: HTMLPeculiarCertificateDecoderElement;
        new (): HTMLPeculiarCertificateDecoderElement;
    };
    interface HTMLPeculiarCertificateViewerElement extends Components.PeculiarCertificateViewer, HTMLStencilElement {
    }
    var HTMLPeculiarCertificateViewerElement: {
        prototype: HTMLPeculiarCertificateViewerElement;
        new (): HTMLPeculiarCertificateViewerElement;
    };
    interface HTMLPeculiarCertificatesViewerElementEventMap {
        "detailsOpen": X509Certificate;
        "detailsClose": void;
    }
    interface HTMLPeculiarCertificatesViewerElement extends Components.PeculiarCertificatesViewer, HTMLStencilElement {
        addEventListener<K extends keyof HTMLPeculiarCertificatesViewerElementEventMap>(type: K, listener: (this: HTMLPeculiarCertificatesViewerElement, ev: PeculiarCertificatesViewerCustomEvent<HTMLPeculiarCertificatesViewerElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLPeculiarCertificatesViewerElementEventMap>(type: K, listener: (this: HTMLPeculiarCertificatesViewerElement, ev: PeculiarCertificatesViewerCustomEvent<HTMLPeculiarCertificatesViewerElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLPeculiarCertificatesViewerElement: {
        prototype: HTMLPeculiarCertificatesViewerElement;
        new (): HTMLPeculiarCertificatesViewerElement;
    };
    interface HTMLPeculiarCircularProgressElement extends Components.PeculiarCircularProgress, HTMLStencilElement {
    }
    var HTMLPeculiarCircularProgressElement: {
        prototype: HTMLPeculiarCircularProgressElement;
        new (): HTMLPeculiarCircularProgressElement;
    };
    interface HTMLPeculiarCrlViewerElement extends Components.PeculiarCrlViewer, HTMLStencilElement {
    }
    var HTMLPeculiarCrlViewerElement: {
        prototype: HTMLPeculiarCrlViewerElement;
        new (): HTMLPeculiarCrlViewerElement;
    };
    interface HTMLPeculiarCsrViewerElement extends Components.PeculiarCsrViewer, HTMLStencilElement {
    }
    var HTMLPeculiarCsrViewerElement: {
        prototype: HTMLPeculiarCsrViewerElement;
        new (): HTMLPeculiarCsrViewerElement;
    };
    interface HTMLPeculiarHighlightWordsElement extends Components.PeculiarHighlightWords, HTMLStencilElement {
    }
    var HTMLPeculiarHighlightWordsElement: {
        prototype: HTMLPeculiarHighlightWordsElement;
        new (): HTMLPeculiarHighlightWordsElement;
    };
    interface HTMLPeculiarTextHiderElement extends Components.PeculiarTextHider, HTMLStencilElement {
    }
    var HTMLPeculiarTextHiderElement: {
        prototype: HTMLPeculiarTextHiderElement;
        new (): HTMLPeculiarTextHiderElement;
    };
    interface HTMLElementTagNameMap {
        "peculiar-attribute-certificate-viewer": HTMLPeculiarAttributeCertificateViewerElement;
        "peculiar-button-menu": HTMLPeculiarButtonMenuElement;
        "peculiar-certificate-chain-viewer": HTMLPeculiarCertificateChainViewerElement;
        "peculiar-certificate-decoder": HTMLPeculiarCertificateDecoderElement;
        "peculiar-certificate-viewer": HTMLPeculiarCertificateViewerElement;
        "peculiar-certificates-viewer": HTMLPeculiarCertificatesViewerElement;
        "peculiar-circular-progress": HTMLPeculiarCircularProgressElement;
        "peculiar-crl-viewer": HTMLPeculiarCrlViewerElement;
        "peculiar-csr-viewer": HTMLPeculiarCsrViewerElement;
        "peculiar-highlight-words": HTMLPeculiarHighlightWordsElement;
        "peculiar-text-hider": HTMLPeculiarTextHiderElement;
    }
}
declare namespace LocalJSX {
    interface PeculiarAttributeCertificateViewer {
        /**
          * Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
         */
        "authKeyIdParentLink"?: string;
        /**
          * Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
         */
        "authKeyIdSiblingsLink"?: string;
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate"?: AttributeCertificateProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
         */
        "subjectKeyIdChildrenLink"?: string;
        /**
          * Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://some.com/{{subjectKeyId}}
         */
        "subjectKeyIdSiblingsLink"?: string;
    }
    interface PeculiarButtonMenu {
        "groups"?: ButtonMenuGroup[];
    }
    interface PeculiarCertificateChainViewer {
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificates"?: X509Certificates;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
    }
    interface PeculiarCertificateDecoder {
        /**
          * The example certificate value for decode and show details. Use PEM or DER.
         */
        "certificateExamples"?: {
    title: string;
    value: string;
  }[];
        /**
          * The default certificate value for decode and show details. Use PEM or DER.
         */
        "certificateToDecode"?: string;
        /**
          * Emitted when the certificate has been removed.
         */
        "onClearCertificate"?: (event: PeculiarCertificateDecoderCustomEvent<void>) => void;
        /**
          * Emitted when the certificate has been successfully parsed.
         */
        "onSuccessParse"?: (event: PeculiarCertificateDecoderCustomEvent<string>) => void;
    }
    interface PeculiarCertificateViewer {
        /**
          * Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
         */
        "authKeyIdParentLink"?: string;
        /**
          * Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
         */
        "authKeyIdSiblingsLink"?: string;
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate"?: CertificateProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Issuer DN link. **NOTE**: HTML component attribute must be `issuer-dn-link`.
         */
        "issuerDnLink"?: string;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
         */
        "subjectKeyIdChildrenLink"?: string;
        /**
          * Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://some.com/{{subjectKeyId}}
         */
        "subjectKeyIdSiblingsLink"?: string;
    }
    interface PeculiarCertificatesViewer {
        /**
          * List of certificates values for decode and show in the list. <br /> **NOTE**: If you do not provide a `name` value when invocing the component it will take the first Subject CN value. <br /> **NOTE**: If you do not provide a `tests` this column will be ommited from the rendered page. <br /> **NOTE**: If the supplied certificates are self-signed the issuer column will be ommited.
         */
        "certificates"?: ICertificate[];
        /**
          * Use filter in the list when search is changed.
         */
        "filterWithSearch"?: boolean;
        /**
          * Use highlight chapters in the list when search is changed.
         */
        "highlightWithSearch"?: boolean;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Emitted when the user close certificate details modal.
         */
        "onDetailsClose"?: (event: PeculiarCertificatesViewerCustomEvent<void>) => void;
        /**
          * Emitted when the user open certificate details modal.
         */
        "onDetailsOpen"?: (event: PeculiarCertificatesViewerCustomEvent<X509Certificate>) => void;
    }
    interface PeculiarCircularProgress {
        /**
          * Width/height of progress circle.
         */
        "size"?: number;
        /**
          * Stroke width of progress bar circle.
         */
        "width"?: number;
    }
    interface PeculiarCrlViewer {
        /**
          * Authority Key Identifier extension parent link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.subject_key_id:%20{{authKeyId}}
         */
        "authKeyIdParentLink"?: string;
        /**
          * Authority Key Identifier extension siblings link. <br /> **NOTE**: `{{authKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{authKeyId}}
         */
        "authKeyIdSiblingsLink"?: string;
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate"?: CrlProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Issuer DN link. **NOTE**: HTML component attribute must be `issuer-dn-link`.
         */
        "issuerDnLink"?: string;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
    }
    interface PeculiarCsrViewer {
        /**
          * The certificate value for decode and show details. Use PEM or DER.
         */
        "certificate"?: CsrProp;
        /**
          * If `true` - component will show split-button to download certificate as PEM or DER.
         */
        "download"?: boolean;
        /**
          * Mobile media query string to control screen view change. <br /> **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
          * @example  (max-width: 900px)
         */
        "mobileMediaQueryString"?: string;
        /**
          * Subject Key Identifier extension children link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://censys.io/certificates?q=parsed.extensions.authority_key_id:%20{{subjectKeyId}}
         */
        "subjectKeyIdChildrenLink"?: string;
        /**
          * Subject Key Identifier extension siblings link. <br /> **NOTE**: `{{subjectKeyId}}` will be replaced to value from the extension.
          * @example  https://some.com/{{subjectKeyId}}
         */
        "subjectKeyIdSiblingsLink"?: string;
    }
    interface PeculiarHighlightWords {
        "search"?: string;
    }
    interface PeculiarTextHider {
    }
    interface IntrinsicElements {
        "peculiar-attribute-certificate-viewer": PeculiarAttributeCertificateViewer;
        "peculiar-button-menu": PeculiarButtonMenu;
        "peculiar-certificate-chain-viewer": PeculiarCertificateChainViewer;
        "peculiar-certificate-decoder": PeculiarCertificateDecoder;
        "peculiar-certificate-viewer": PeculiarCertificateViewer;
        "peculiar-certificates-viewer": PeculiarCertificatesViewer;
        "peculiar-circular-progress": PeculiarCircularProgress;
        "peculiar-crl-viewer": PeculiarCrlViewer;
        "peculiar-csr-viewer": PeculiarCsrViewer;
        "peculiar-highlight-words": PeculiarHighlightWords;
        "peculiar-text-hider": PeculiarTextHider;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "peculiar-attribute-certificate-viewer": LocalJSX.PeculiarAttributeCertificateViewer & JSXBase.HTMLAttributes<HTMLPeculiarAttributeCertificateViewerElement>;
            "peculiar-button-menu": LocalJSX.PeculiarButtonMenu & JSXBase.HTMLAttributes<HTMLPeculiarButtonMenuElement>;
            "peculiar-certificate-chain-viewer": LocalJSX.PeculiarCertificateChainViewer & JSXBase.HTMLAttributes<HTMLPeculiarCertificateChainViewerElement>;
            "peculiar-certificate-decoder": LocalJSX.PeculiarCertificateDecoder & JSXBase.HTMLAttributes<HTMLPeculiarCertificateDecoderElement>;
            "peculiar-certificate-viewer": LocalJSX.PeculiarCertificateViewer & JSXBase.HTMLAttributes<HTMLPeculiarCertificateViewerElement>;
            "peculiar-certificates-viewer": LocalJSX.PeculiarCertificatesViewer & JSXBase.HTMLAttributes<HTMLPeculiarCertificatesViewerElement>;
            "peculiar-circular-progress": LocalJSX.PeculiarCircularProgress & JSXBase.HTMLAttributes<HTMLPeculiarCircularProgressElement>;
            "peculiar-crl-viewer": LocalJSX.PeculiarCrlViewer & JSXBase.HTMLAttributes<HTMLPeculiarCrlViewerElement>;
            "peculiar-csr-viewer": LocalJSX.PeculiarCsrViewer & JSXBase.HTMLAttributes<HTMLPeculiarCsrViewerElement>;
            "peculiar-highlight-words": LocalJSX.PeculiarHighlightWords & JSXBase.HTMLAttributes<HTMLPeculiarHighlightWordsElement>;
            "peculiar-text-hider": LocalJSX.PeculiarTextHider & JSXBase.HTMLAttributes<HTMLPeculiarTextHiderElement>;
        }
    }
}
