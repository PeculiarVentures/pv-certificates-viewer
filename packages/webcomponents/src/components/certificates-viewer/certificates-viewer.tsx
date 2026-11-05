/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, h, Prop, State, Watch, Host, Event, EventEmitter } from '@stencil/core';
import { OIDs } from '../../constants/oids';
import { X509Certificate, type ICertificateJSON } from '../../crypto';
import { firstCommonName } from '../../crypto/fields/name';
import { Button } from '../_shared/button';
import { CertificateSummary } from '../_shared/certificate-summary';
import {
  DownloadIcon,
  LinkIcon,
  DetailsIcon,
  ArrowBottomIcon,
  ArrowTopIcon,
  CrossIcon,
} from '../_shared/icons';
import { Typography } from '../_shared/typography';

export interface ICertificate {
  value: string;
  name?: string | ((certificate: X509Certificate) => string);
  tests?: {
    valid?: string;
    revoked?: string;
    expired?: string;
  };
}

interface ICertificateDecoded {
  body: X509Certificate;
  json: ICertificateJSON;
  sha1: string;
  issuerCommonName: string;
  signatureAlgorithm: string;
  /** Lower-cased text the search filter matches against. */
  searchText: string;
  tests?: ICertificate['tests'];
  name?: ICertificate['name'];
}

const TEST_URL_LABELS = { valid: 'Valid', revoked: 'Revoked', expired: 'Expired' } as const;

@Component({
  tag: 'peculiar-certificates-viewer',
  styleUrl: 'certificates-viewer.scss',
  shadow: true,
})
export class CertificatesViewer {
  private isHasRoots = false;

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
  @Prop() filterWithSearch = true;

  /**
   * Use highlight chapters in the list when search is changed.
   */
  @Prop() highlightWithSearch = true;

  /**
   * Emitted when the user open certificate details modal.
   */
  @Event() detailsOpen!: EventEmitter<X509Certificate>;

  /**
   * Emitted when the user close certificate details modal.
   */
  @Event() detailsClose!: EventEmitter<void>;

  @State() search = '';

  @State() certificatesDecoded: ICertificateDecoded[] = [];

  @State() expandedRow?: number;

  @State() certificateSelectedForDetails?: X509Certificate;

  @State() isDecodeInProcess = true;

  componentWillLoad() {
    void this.certificatesDecodeAndSet();
  }

  @Watch('certificates')
  watchCertificates(newValue: ICertificate[], oldValue: ICertificate[]) {
    /**
     * Prevent rerender after set the same `certificates` prop.
     */
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      void this.certificatesDecodeAndSet();
    }
  }

  async certificatesDecodeAndSet() {
    this.isDecodeInProcess = true;
    let hasRoots = false;
    const data: ICertificateDecoded[] = [];

    if (!Array.isArray(this.certificates)) {
      this.isDecodeInProcess = false;
      this.certificatesDecoded = data;
      this.isHasRoots = hasRoots;

      return;
    }

    for (const certificate of this.certificates) {
      try {
        const decoded = new X509Certificate(certificate.value);
        const json = decoded.toJSON();
        const { 'SHA-1': sha1 = '' } = await decoded.getThumbprints(['SHA-1']);
        const item: ICertificateDecoded = {
          body: decoded,
          json,
          sha1,
          issuerCommonName: firstCommonName(json.issuer),
          signatureAlgorithm: OIDs[json.signature.algorithm] || json.signature.algorithm,
          searchText: '',
          tests: certificate.tests,
          name: certificate.name,
        };

        item.searchText = [
          item.signatureAlgorithm,
          item.issuerCommonName,
          this.getCertificateName(item),
          sha1,
        ]
          .join(' ')
          .toLowerCase();
        data.push(item);
        hasRoots ||= json.isRoot;
      } catch (error) {
        console.error('Error certificate parse:', error);
      }
    }

    this.isHasRoots = hasRoots;
    this.certificatesDecoded = data;
    this.isDecodeInProcess = false;
  }

  private getCertificateName(certificate: ICertificateDecoded) {
    if (typeof certificate.name === 'function') {
      return certificate.name(certificate.body);
    }

    return certificate.name || certificate.body.commonName;
  }

  private handleClickDownloadAsPem(certificate: ICertificateDecoded) {
    certificate.body.download('pem', this.getCertificateName(certificate));
  }

  private handleClickDownloadAsDer(certificate: ICertificateDecoded) {
    certificate.body.download('der', this.getCertificateName(certificate));
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

    this.expandedRow = isExpandedRowClicked ? undefined : index;
  }

  private handleSearch = (event: Event) => {
    const target = event.target as HTMLInputElement;

    this.search = target.value.trim();
  };

  private getMaxColSpanValue() {
    let colSpan = 5;

    if (!this.isHasRoots) {
      colSpan += 1;
    }

    return colSpan;
  }

  private renderCertificateButtonActions(certificate: ICertificateDecoded) {
    const testURLs = (['valid', 'revoked', 'expired'] as const)
      .filter((kind) => certificate.tests?.[kind])
      .map((kind) => ({
        text: TEST_URL_LABELS[kind],
        href: certificate.tests?.[kind],
        startIcon: <LinkIcon />,
      }));

    return (
      <peculiar-button-menu
        class="button_table_cell"
        groups={[
          {
            title: 'Preview certificate',
            options: [
              {
                text: 'View details',
                startIcon: <DetailsIcon />,
                onClick: () => this.handleClickDetails(certificate.body),
              },
            ],
          },
          {
            title: 'Download options',
            options: [
              {
                text: 'Download PEM',
                startIcon: <DownloadIcon />,
                onClick: () => this.handleClickDownloadAsPem(certificate),
              },
              {
                text: 'Download DER',
                startIcon: <DownloadIcon />,
                onClick: () => this.handleClickDownloadAsDer(certificate),
              },
            ],
          },
          ...(testURLs.length ? [{ title: 'Test URLs', options: testURLs }] : []),
        ]}
      />
    );
  }

  private renderExpandedRow(certificate: ICertificateJSON) {
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
    const searchHighlight = this.highlightWithSearch ? this.search : '';
    const content: HTMLElement[][] = [];

    this.certificatesDecoded.forEach((certificate, index) => {
      const isExpandedRow = index === this.expandedRow;
      const publicKeyValue = certificate.signatureAlgorithm;

      if (this.filterWithSearch && this.search) {
        if (certificate.searchText.indexOf(this.search.toLowerCase()) === -1) {
          return;
        }
      }

      // One markup for both layouts: under 900px of component width the styles stack the cells and
      // show each cell's label (see the @container rules).
      content.push([
        <tr
          class={{ certificate_row: true, m_expanded: isExpandedRow }}
          key={certificate.sha1}
        >
          <td class="cell_expand">
            <Button
              startIcon={isExpandedRow ? <ArrowTopIcon /> : <ArrowBottomIcon />}
              class="button_table_cell expand_button"
              onClick={this.handleClickRow.bind(this, index)}
            />
          </td>
          {!this.isHasRoots && (
            <td class="cell_data">
              <Typography
                color="gray-9"
                class="cell_label"
              >
                {'Issuer'}
              </Typography>
              <Typography>
                <peculiar-highlight-words search={searchHighlight}>
                  {certificate.issuerCommonName}
                </peculiar-highlight-words>
              </Typography>
            </td>
          )}
          <td class="cell_data">
            <Typography
              color="gray-9"
              class="cell_label"
            >
              {'Name'}
            </Typography>
            <Typography>
              <peculiar-highlight-words search={searchHighlight}>
                {this.getCertificateName(certificate)}
              </peculiar-highlight-words>
            </Typography>
          </td>
          <td class="cell_data">
            <Typography
              color="gray-9"
              class="cell_label"
            >
              {'Public Key'}
            </Typography>
            <Typography>
              <peculiar-highlight-words search={searchHighlight}>
                {publicKeyValue}
              </peculiar-highlight-words>
            </Typography>
          </td>
          <td class="cell_data">
            <Typography
              color="gray-9"
              class="cell_label"
            >
              {'Fingerprint'}
              &nbsp; (SHA-1)
            </Typography>
            <Typography>
              <peculiar-highlight-words search={searchHighlight}>
                {certificate.sha1}
              </peculiar-highlight-words>
            </Typography>
          </td>
          <td class="cell_actions">{this.renderCertificateButtonActions(certificate)}</td>
        </tr>,
        isExpandedRow && this.renderExpandedRow(certificate.json),
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
          aria-hidden="true"
          onClick={this.handleModalClose}
        />
        <div
          class="modal_container"
          role="dialog"
          part="presentation_container"
        >
          <header class="modal_header">
            <Typography variant="h4">{'Certificate Details'}</Typography>
            <Button
              startIcon={<CrossIcon />}
              onClick={this.handleModalClose}
            />
          </header>
          <div class="modal_content">
            <peculiar-certificate-viewer certificate={this.certificateSelectedForDetails} />
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
          type="search"
          value=""
          class="input_search t-b3 c-black"
          disabled={!this.certificatesDecoded.length}
          placeholder="Search"
          onInput={this.handleSearch}
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
          <Typography variant="b1">There are no certificates available.</Typography>
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
          <Typography variant="b1">
            No results found for &ldquo;
            {this.search}
            &ldquo;
          </Typography>
        </td>
      </tr>
    );
  }

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
      <Host>
        {this.renderSearch()}
        <table>
          <thead>
            <tr>
              <th />
              {!this.isHasRoots && (
                <th class="col_issuer">
                  <Typography variant="s2">{'Issuer'}</Typography>
                </th>
              )}
              <th class="col_name">
                <Typography variant="s2">{'Name'}</Typography>
              </th>
              <th class="col_public_key">
                <Typography variant="s2">{'Public Key'}</Typography>
              </th>
              <th class="col_fingerprint">
                <Typography variant="s2">
                  {'Fingerprint'}
                  &nbsp; (SHA-1)
                </Typography>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>

        {this.renderCertificateDetailsModal()}
        {this.isDecodeInProcess && this.renderLoadingState()}
      </Host>
    );
  }
}
