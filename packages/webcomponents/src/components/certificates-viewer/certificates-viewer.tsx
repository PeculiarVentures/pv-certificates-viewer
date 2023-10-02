/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Component,
  h,
  Prop,
  State,
  Watch,
  Host,
  Event,
  EventEmitter,
  Build,
} from '@stencil/core';

import { X509Certificate } from '../../crypto';
import { OIDs } from '../../constants/oids';
import { l10n } from '../../utils';
import { Typography } from '../typography';
import { CertificateSummary } from '../certificate-summary';
import { Button } from '../button';
import {
  DownloadIcon,
  LinkIcon,
  DetailsIcon,
  ArrowBottomIcon,
  ArrowTopIcon,
  CrossIcon,
} from '../icons';

export interface ICertificate {
  value: string;
  name?: string;
  tests?: {
    valid?: string;
    revoked?: string;
    expired?: string;
  };
}

interface ICertificateDecoded {
  body: X509Certificate;
  tests?: ICertificate['tests'];
  name?: string;
}

@Component({
  tag: 'peculiar-certificates-viewer',
  styleUrl: 'certificates-viewer.scss',
  shadow: true,
})
export class CertificatesViewer {
  private isHasRoots: boolean = false;

  private mobileMediaQuery: MediaQueryList;

  /**
   * List of certificates values for decode and show in the list.
   * <br />
   * **NOTE**: If you do not provide a `name` value when
   * invocing the component it will take the first Subject CN value.
   * <br />
   * **NOTE**: If you do not provide a `tests` this column will be ommited from the rendered page.
   * <br />
   * **NOTE**: If the supplied certificates are self-signed the issuer column will be ommited.
   */
  @Prop() certificates: ICertificate[] = [];

  /**
   * Use filter in the list when search is changed.
   */
  @Prop() filterWithSearch: boolean = true;

  /**
   * Use highlight chapters in the list when search is changed.
   */
  @Prop() highlightWithSearch: boolean = true;

  /**
   * Mobile media query string to control screen view change.
   * <br />
   * **NOTE**: Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia.
   * @example
   *  (max-width: 900px)
   */
  @Prop({ reflect: false }) mobileMediaQueryString?: string = '(max-width: 900px)';

  /**
   * Emitted when the user open certificate details modal.
   */
  @Event() detailsOpen!: EventEmitter<X509Certificate>;

  /**
   * Emitted when the user close certificate details modal.
   */
  @Event() detailsClose!: EventEmitter<void>;

  @State() mobileScreenView: boolean = false;

  @State() search: string = '';

  @State() certificatesDecoded: ICertificateDecoded[] = [];

  @State() expandedRow?: number;

  @State() certificateSelectedForDetails?: X509Certificate;

  @State() isDecodeInProcess: boolean = true;

  private handleMediaQueryChange(event: MediaQueryListEvent) {
    this.mobileScreenView = event.matches;
  }

  componentWillLoad() {
    this.certificatesDecodeAndSet();

    if (Build.isBrowser) {
      this.mobileMediaQuery = window.matchMedia(this.mobileMediaQueryString);
      this.mobileMediaQuery.addEventListener('change', this.handleMediaQueryChange.bind(this));
      this.mobileScreenView = this.mobileMediaQuery.matches;
    }
  }

  disconnectedCallback() {
    this.mobileMediaQuery.removeEventListener('change', this.handleMediaQueryChange.bind(this));
  }

  @Watch('certificates')
  watchCertificates(newValue: ICertificate[], oldValue: ICertificate[]) {
    /**
     * Prevent rerender after set the same `certificates` prop.
     */
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.certificatesDecodeAndSet();
    }
  }

  async certificatesDecodeAndSet() {
    let hasRoots = false;

    if (!Array.isArray(this.certificates)) {
      return;
    }

    const data: ICertificateDecoded[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const certificate of this.certificates) {
      try {
        const decoded = new X509Certificate(certificate.value);

        await decoded.getThumbprint('SHA-1');

        data.push({
          body: decoded,
          tests: certificate.tests,
          name: certificate.name,
        });

        if (!hasRoots && decoded.isRoot) {
          hasRoots = true;
        }
      } catch (error) {
        console.error('Error certificate parse:', error);
      }
    }

    this.isHasRoots = hasRoots;
    this.isDecodeInProcess = false;
    this.certificatesDecoded = data;
  }

  // eslint-disable-next-line class-methods-use-this
  private handleClickDownloadAsPem(certificate: ICertificateDecoded) {
    certificate.body.downloadAsPEM(certificate.name || certificate.body.commonName);
  }

  // eslint-disable-next-line class-methods-use-this
  private handleClickDownloadAsDer(certificate: ICertificateDecoded) {
    certificate.body.downloadAsDER(certificate.name || certificate.body.commonName);
  }

  private handleClickDetails = (certificate: X509Certificate) => {
    this.certificateSelectedForDetails = certificate;
    this.detailsOpen.emit(certificate);
  };

  private handleModalClose = () => {
    this.certificateSelectedForDetails = undefined;

    this.detailsClose.emit();
  };

  private handleClickRow(index: number) {
    const isExpandedRowClicked = this.expandedRow === index;

    this.expandedRow = isExpandedRowClicked
      ? undefined
      : index;
  }

  private handleSearch = (event: any) => {
    this.search = event.target.value.trim();
  };

  private getMaxColSpanValue() {
    let colSpan = 5;

    if (!this.isHasRoots) {
      colSpan += 1;
    }

    return colSpan;
  }

  private renderCertificateButtonActions(certificate: ICertificateDecoded) {
    const isHasTestURLs = certificate.tests
        && (certificate.tests.expired || certificate.tests.revoked || certificate.tests.valid);

    return (
      <peculiar-button-menu
        class="button_table_cell"
        groups={[
          {
            title: l10n.getString('previewCertificate'),
            options: [
              {
                text: l10n.getString('viewDetails'),
                startIcon: <DetailsIcon />,
                onClick: () => this.handleClickDetails(certificate.body),
              },
            ],
          },
          {
            title: l10n.getString('downloadOptions'),
            options: [
              {
                text: l10n.getString('download.pem'),
                startIcon: <DownloadIcon />,
                onClick: () => this.handleClickDownloadAsPem(certificate),
              },
              {
                text: l10n.getString('download.der'),
                startIcon: <DownloadIcon />,
                onClick: () => this.handleClickDownloadAsDer(certificate),
              },
            ],
          },
          ...(isHasTestURLs ? [{
            title: l10n.getString('testURLs'),
            options: [
              ...(certificate.tests?.valid ? [{
                text: l10n.getString('valid'),
                href: certificate.tests.valid,
                startIcon: <LinkIcon />,
              }] : []),
              ...(certificate.tests?.revoked ? [{
                text: l10n.getString('revoked'),
                href: certificate.tests.revoked,
                startIcon: <LinkIcon />,
              }] : []),
              ...(certificate.tests?.expired ? [{
                text: l10n.getString('expired'),
                href: certificate.tests.expired,
                startIcon: <LinkIcon />,
              }] : []),
            ],
          }] : []),
        ]}
      />
    );
  }

  private renderExpandedRow(certificate: X509Certificate) {
    const colSpan = this.getMaxColSpanValue() - 2;

    return (
      <tr class="expanded_summary">
        <td />
        <td colSpan={colSpan}>
          <CertificateSummary
            certificate={certificate}
            showIssuer={!certificate.isRoot}
          />
        </td>
        <td />
      </tr>
    );
  }

  private renderCertificatesRows() {
    const searchHighlight = this.highlightWithSearch
      ? this.search
      : '';
    const content = [];

    this.certificatesDecoded.forEach((certificate, index) => {
      const isExpandedRow = index === this.expandedRow;
      const publicKeyValue = OIDs[certificate.body.signature.algorithm]
        || certificate.body.signature.algorithm;

      if (this.filterWithSearch && this.search) {
        const certificateStringForSearch = [
          publicKeyValue,
          certificate.body.issuerCommonName,
          certificate.name,
          certificate.body.commonName,
          certificate.body.thumbprints['SHA-1'],
        ]
          .join(' ')
          .toLowerCase();

        if (certificateStringForSearch.indexOf(this.search.toLowerCase()) === -1) {
          return;
        }
      }

      if (this.mobileScreenView) {
        content.push([
          <tr
            class={{
              certificate_row: true,
              m_expanded: isExpandedRow,
            }}
            key={certificate.body.thumbprints['SHA-1']}
          >
            <td>
              <table>
                <tbody>
                  {!this.isHasRoots && (
                    <tr>
                      <td>
                        <Typography variant="b2" color="gray-9">
                          {l10n.getString('issuer')}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="b2" color="black">
                          <peculiar-highlight-words search={searchHighlight}>
                            {certificate.body.issuerCommonName}
                          </peculiar-highlight-words>
                        </Typography>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>
                      <Typography variant="b2" color="gray-9">
                        {l10n.getString('name')}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="b2" color="black">
                        <peculiar-highlight-words search={searchHighlight}>
                          {certificate.name || certificate.body.commonName}
                        </peculiar-highlight-words>
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="b2" color="gray-9">
                        {l10n.getString('publicKey')}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="b2" color="black">
                        <peculiar-highlight-words search={searchHighlight}>
                          {publicKeyValue}
                        </peculiar-highlight-words>
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="b2" color="gray-9">
                        {l10n.getString('fingerprint')}
                        &nbsp; (SHA-1)
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="b2" color="black">
                        <peculiar-highlight-words search={searchHighlight}>
                          {certificate.body.thumbprints['SHA-1']}
                        </peculiar-highlight-words>
                      </Typography>
                    </td>
                  </tr>
                  {isExpandedRow && this.renderExpandedRow(certificate.body)}
                  <tr class="certificate_row_actions">
                    <td>
                      {this.renderCertificateButtonActions(certificate)}
                      <Button
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={this.handleClickRow.bind(this, index)}
                        startIcon={isExpandedRow ? <ArrowTopIcon /> : <ArrowBottomIcon />}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>,
        ]);

        return;
      }

      content.push([
        <tr
          class={{
            m_expanded: isExpandedRow,
          }}
          key={certificate.body.thumbprints['SHA-1']}
        >
          <td>
            <Button
              class="button_table_cell"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={this.handleClickRow.bind(this, index)}
              startIcon={isExpandedRow ? <ArrowTopIcon /> : <ArrowBottomIcon />}
            />
          </td>
          {!this.isHasRoots && (
            <td>
              <Typography>
                <peculiar-highlight-words search={searchHighlight}>
                  {certificate.body.issuerCommonName}
                </peculiar-highlight-words>
              </Typography>
            </td>
          )}
          <td>
            <Typography>
              <peculiar-highlight-words search={searchHighlight}>
                {certificate.name || certificate.body.commonName}
              </peculiar-highlight-words>
            </Typography>
          </td>
          <td>
            <Typography>
              <peculiar-highlight-words search={searchHighlight}>
                {publicKeyValue}
              </peculiar-highlight-words>
            </Typography>
          </td>
          <td>
            <Typography>
              <peculiar-highlight-words search={searchHighlight}>
                {certificate.body.thumbprints['SHA-1']}
              </peculiar-highlight-words>
            </Typography>
          </td>
          <td>
            {this.renderCertificateButtonActions(certificate)}
          </td>
        </tr>,
        isExpandedRow && this.renderExpandedRow(certificate.body),
      ]);
    });

    return content;
  }

  private renderCertificateDetailsModal() {
    if (!this.certificateSelectedForDetails) {
      return null;
    }

    return (
      <div
        class="modal_wrapper"
        role="presentation"
        aria-hidden="false"
        part="presentation"
      >
        <div
          class="modal_backdrop"
          onClick={this.handleModalClose}
          aria-hidden="true"
        />
        <div
          class="modal_container"
          role="dialog"
          part="presentation_container"
        >
          <header class="modal_header">
            <Typography
              variant="h4"
            >
              {l10n.getString('certificateDetails')}
            </Typography>
            <Button
              onClick={this.handleModalClose}
              startIcon={<CrossIcon />}
            />
          </header>
          <div class="modal_content">
            <peculiar-certificate-viewer
              certificate={this.certificateSelectedForDetails}
              mobileMediaQueryString={this.mobileMediaQueryString}
            />
          </div>
        </div>
      </div>
    );
  }

  private renderSearch() {
    if (!this.filterWithSearch && !this.highlightWithSearch) {
      return null;
    }

    return (
      <div class="search_section">
        <input
          onInput={this.handleSearch}
          type="search"
          value=""
          class="input_search t-b3 c-black"
          disabled={!this.certificatesDecoded.length}
          placeholder="Search"
        />
      </div>
    );
  }

  private renderEmptyState() {
    const colSpan = this.getMaxColSpanValue();

    return (
      <tr>
        <td
          class="status_wrapper"
          colSpan={colSpan}
        >
          <Typography
            variant="b1"
          >
            There are no certificates available.
          </Typography>
        </td>
      </tr>
    );
  }

  private renderEmptySearchState() {
    const colSpan = this.getMaxColSpanValue();

    return (
      <tr>
        <td
          class="status_wrapper"
          colSpan={colSpan}
        >
          <Typography
            variant="b1"
          >
            No results found for &ldquo;
            {this.search}
            &ldquo;
          </Typography>
        </td>
      </tr>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  private renderLoadingState() {
    return (
      <div class="loading_container">
        <peculiar-circular-progress />
      </div>
    );
  }

  private renderTableBody() {
    if (this.isDecodeInProcess) {
      return null;
    }

    if (!this.certificatesDecoded.length) {
      return this.renderEmptyState();
    }

    const certificatesRows = this.renderCertificatesRows();

    if (this.search && !certificatesRows.length) {
      return this.renderEmptySearchState();
    }

    return certificatesRows;
  }

  render() {
    return (
      <Host
        data-mobile-screen-view={String(this.mobileScreenView)}
      >
        {this.renderSearch()}
        <table>
          {!this.mobileScreenView && (
            <thead>
              <tr>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
                {!this.isHasRoots && (
                  <th class="col_issuer">
                    <Typography variant="s2">
                      {l10n.getString('issuer')}
                    </Typography>
                  </th>
                )}
                <th class="col_name">
                  <Typography variant="s2">
                    {l10n.getString('name')}
                  </Typography>
                </th>
                <th class="col_public_key">
                  <Typography variant="s2">
                    {l10n.getString('publicKey')}
                  </Typography>
                </th>
                <th class="col_fingerprint">
                  <Typography variant="s2">
                    {l10n.getString('fingerprint')}
                    &nbsp; (SHA-1)
                  </Typography>
                </th>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <th />
              </tr>
            </thead>
          )}
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>

        {this.renderCertificateDetailsModal()}
        {this.isDecodeInProcess && this.renderLoadingState()}
      </Host>
    );
  }
}
