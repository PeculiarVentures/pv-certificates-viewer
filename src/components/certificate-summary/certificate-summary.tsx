import { Component, Host, h, Prop } from '@stencil/core';
import dayjs from 'dayjs';

import { Certificate } from '../../utils/crypto';

@Component({
  tag: 'pv-certificate-summary',
  styleUrls: [
    '../../styles/reset.css',
    '../../styles/theme.css',
    '../../styles/system.css',
    'certificate-summary.css',
  ],
  shadow: true
})

export class CertificateSummary {
  @Prop() certificate: Certificate;
  @Prop() showIssuer: boolean = true;

  renderDN(item: Certificate['subject'] | Certificate['issuer']) {
    return Object.keys(item).map(subject => {
      return (
        <p class="dn_row">
          <span class="dn_name b3 text_black">{subject}</span>
          <span class="dn_value b3 text_black">{item[subject].value}</span>
        </p>
      )
    })
  }

  renderMetaData(item: Certificate) {
    return ([
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Serial number:</span>
        <span class="meta_value b3 text_black monospace">{item.serialNumber}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Version:</span>
        <span class="meta_value b3 text_black">{item.version}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Validity:</span>
        <span class="meta_value b3 text_black">{item.validity} days</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Issued:</span>
        <span class="meta_value b3 text_black">{dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm A')}</span>
      </p>,
      <p class="meta_row">
        <span class="meta_name text_grey_5 b3">Expired:</span>
        <span class="meta_value b3 text_black">{dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm A')}</span>
      </p>,
    ]);
  }

  renderCertificateSummary() {
    return (
      <div class={{
        basic_wrapper: true,
        is_only: !this.showIssuer,
      }}>
        <div class="basic_col">
          <p class="text_grey_5 b3 dn_row">
            Subject DN:
          </p>
          {this.renderDN(this.certificate.subject)}
        </div>
        {this.showIssuer && (
          <div class="basic_col stroke_grey_3_border">
            <p class="text_grey_5 b3 dn_row">
              Issuer DN:
            </p>
            {this.renderDN(this.certificate.issuer)}
          </div>
        )}
        <div class="basic_meta">
          {this.renderMetaData(this.certificate)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host>
        {this.renderCertificateSummary()}
      </Host>
    );
  }

}
