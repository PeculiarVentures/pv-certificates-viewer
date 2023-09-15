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
} from '@stencil/core';

import { X509Certificate } from '../../crypto';
import { OIDs } from '../../constants/oids';
import { l10n } from '../../utils';
import { Typography } from '../typography';
import { CertificateSummary } from '../certificate-summary';
import { Button } from '../button';

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

  @State() search: string = '';

  @State() certificatesDecoded: ICertificateDecoded[] = [];

  @State() expandedRow?: number;

  @State() certificateSelectedForDetails?: X509Certificate;

  @State() isDecodeInProcess: boolean = true;

  /**
   * Emitted when the user open certificate details modal.
   */
  @Event() detailsOpen!: EventEmitter<X509Certificate>;

  /**
   * Emitted when the user close certificate details modal.
   */
  @Event() detailsClose!: EventEmitter<void>;

  private isHasRoots: boolean = false;

  componentWillLoad() {
    this.certificatesDecodeAndSet();
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

  private handleClickDownloadAsPem(certificate: ICertificateDecoded, event: MouseEvent) {
    event.stopPropagation();

    certificate.body.downloadAsPEM(certificate.name || certificate.body.commonName);
  }

  private handleClickDownloadAsDer(certificate: ICertificateDecoded, event: MouseEvent) {
    event.stopPropagation();

    certificate.body.downloadAsDER(certificate.name || certificate.body.commonName);
  }

  private handleClickDetails = (certificate: X509Certificate, event: MouseEvent) => {
    event.stopPropagation();

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

  private getMaxColSpanValue() {
    let colSpan = 5;

    if (!this.isHasRoots) {
      colSpan += 1;
    }

    return colSpan;
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

  private renderContentState() {
    const searchHighlight = this.highlightWithSearch
      ? this.search
      : '';
    const content = [];

    this.certificatesDecoded.forEach((certificate, index) => {
      const isExpandedRow = index === this.expandedRow;
      const publicKeyValue = OIDs[certificate.body.signature.algorithm]
        || certificate.body.signature.algorithm;
      const isHasTestURLs = certificate.tests
        && (certificate.tests.expired || certificate.tests.revoked || certificate.tests.valid);

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
              onClick={this.handleClickRow.bind(this, index)}
              startIcon={(
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                >
                  <path
                    stroke="var(--pv-color-gray-10)"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="m19.222 12.778-3.851 4.279a.2.2 0 0 1-.297 0l-3.852-4.28"
                  />
                </svg>
              )}
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
            <peculiar-button-menu
              class="button_table_cell"
              groups={[
                {
                  title: 'Preview certificate',
                  options: [
                    {
                      text: 'View details',
                      startIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="31"
                          fill="none"
                        >
                          <path
                            fill="var(--pv-color-secondary)"
                            d="M6.71 19.79a1 1 0 0 0-.33-.21 1 1 0 0 0-.76 0 1 1 0 0 0-.33.21 1 1 0 0 0-.21.33 1 1 0 0 0 .21 1.09c.097.088.209.16.33.21a.94.94 0 0 0 .76 0 1.15 1.15 0 0 0 .33-.21 1 1 0 0 0 .21-1.09 1 1 0 0 0-.21-.33ZM10 11.5h14a1 1 0 0 0 0-2H10a1 1 0 0 0 0 2Zm-3.29 3.29a1 1 0 0 0-1.09-.21 1.15 1.15 0 0 0-.33.21 1 1 0 0 0-.21.33.94.94 0 0 0 0 .76c.05.121.122.233.21.33.097.088.209.16.33.21a.94.94 0 0 0 .76 0 1.15 1.15 0 0 0 .33-.21 1.15 1.15 0 0 0 .21-.33.94.94 0 0 0 0-.76 1 1 0 0 0-.21-.33ZM24 14.5H10a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2ZM6.71 9.79a1 1 0 0 0-.33-.21 1 1 0 0 0-1.09.21 1.15 1.15 0 0 0-.21.33.94.94 0 0 0 0 .76c.05.121.122.233.21.33.097.088.209.16.33.21a1 1 0 0 0 1.09-.21 1.15 1.15 0 0 0 .21-.33.94.94 0 0 0 0-.76 1.15 1.15 0 0 0-.21-.33ZM24 19.5H10a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"
                          />
                        </svg>
                      ),
                      onClick: (event) => this.handleClickDetails(certificate.body, event),
                    },
                  ],
                },
                {
                  title: 'Download options',
                  options: [
                    {
                      text: 'Download PEM',
                      startIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="none"
                        >
                          <path
                            fill="var(--pv-color-secondary)"
                            d="M21 12h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1h2c.6 0 1-.4 1-1s-.4-1-1-1H9c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3Zm-9.7 5.7 3 3c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3-3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L16 17.6V6c0-.6-.4-1-1-1s-1 .4-1 1v11.6l-1.3-1.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4Z"
                          />
                        </svg>
                      ),
                      onClick: (event) => this.handleClickDownloadAsPem(certificate, event),
                    },
                    {
                      text: 'Download DER',
                      startIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="none"
                        >
                          <path
                            fill="var(--pv-color-secondary)"
                            d="M21 12h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H9c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1h2c.6 0 1-.4 1-1s-.4-1-1-1H9c-1.7 0-3 1.3-3 3v7c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3v-7c0-1.7-1.3-3-3-3Zm-9.7 5.7 3 3c.2.2.4.3.7.3.3 0 .5-.1.7-.3l3-3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L16 17.6V6c0-.6-.4-1-1-1s-1 .4-1 1v11.6l-1.3-1.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4Z"
                          />
                        </svg>
                      ),
                      onClick: (event) => this.handleClickDownloadAsDer(certificate, event),
                    },
                  ],
                },
                ...(isHasTestURLs ? [{
                  title: 'Test URLs',
                  options: [
                    ...(certificate.tests?.valid ? [{
                      text: 'Valid',
                      href: certificate.tests.valid,
                      startIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="31"
                          fill="none"
                        >
                          <path
                            fill="var(--pv-color-secondary)"
                            d="M21 14.32a1 1 0 0 0-1 1v7.18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H8a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Zm3.92-8.2a1 1 0 0 0-.54-.54A1 1 0 0 0 24 5.5h-6a1 1 0 1 0 0 2h3.59l-10.3 10.29a1.002 1.002 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L23 8.91v3.59a1 1 0 0 0 2 0v-6a1.001 1.001 0 0 0-.08-.38Z"
                          />
                        </svg>
                      ),
                    }] : []),
                    ...(certificate.tests?.revoked ? [{
                      text: 'Revoked',
                      href: certificate.tests.revoked,
                      startIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="31"
                          fill="none"
                        >
                          <path
                            fill="var(--pv-color-secondary)"
                            d="M21 14.32a1 1 0 0 0-1 1v7.18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H8a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Zm3.92-8.2a1 1 0 0 0-.54-.54A1 1 0 0 0 24 5.5h-6a1 1 0 1 0 0 2h3.59l-10.3 10.29a1.002 1.002 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L23 8.91v3.59a1 1 0 0 0 2 0v-6a1.001 1.001 0 0 0-.08-.38Z"
                          />
                        </svg>
                      ),
                    }] : []),
                    ...(certificate.tests?.expired ? [{
                      text: 'Expired',
                      href: certificate.tests.expired,
                      startIcon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="31"
                          fill="none"
                        >
                          <path
                            fill="var(--pv-color-secondary)"
                            d="M21 14.32a1 1 0 0 0-1 1v7.18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H8a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Zm3.92-8.2a1 1 0 0 0-.54-.54A1 1 0 0 0 24 5.5h-6a1 1 0 1 0 0 2h3.59l-10.3 10.29a1.002 1.002 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L23 8.91v3.59a1 1 0 0 0 2 0v-6a1.001 1.001 0 0 0-.08-.38Z"
                          />
                        </svg>
                      ),
                    }] : []),
                  ],
                }] : []),
              ]}
            />
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
              startIcon={(
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                >
                  <path
                    fill="var(--pv-color-gray-9)"
                    fill-rule="evenodd"
                    d="m16.37 15 5.442 5.44c.25.252.25.663 0 .914l-.459.457a.646.646 0 0 1-.913 0L15 16.371l-5.44 5.44a.648.648 0 0 1-.915 0l-.457-.457a.649.649 0 0 1 0-.913L13.63 15 8.188 9.56a.649.649 0 0 1 0-.914l.457-.457a.648.648 0 0 1 .915 0l5.44 5.44 5.44-5.44a.646.646 0 0 1 .913 0l.46.457c.25.25.25.662 0 .913L16.37 15Z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            />
          </header>
          <div class="modal_content">
            <peculiar-certificate-viewer
              certificate={this.certificateSelectedForDetails}
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

  private renderBody() {
    if (this.isDecodeInProcess) {
      return null;
    }

    if (!this.certificatesDecoded.length) {
      return this.renderEmptyState();
    }

    const contentState = this.renderContentState();

    if (this.search && !contentState.length) {
      return this.renderEmptySearchState();
    }

    return contentState;
  }

  private handleSearch = (event: any) => {
    this.search = event.target.value.trim();
  };

  render() {
    return (
      <Host>
        {this.renderSearch()}
        <table>
          <thead>
            <tr>
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
              <th />
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
          </tbody>
        </table>

        {this.renderCertificateDetailsModal()}
        {this.isDecodeInProcess && this.renderLoadingState()}
      </Host>
    );
  }
}
