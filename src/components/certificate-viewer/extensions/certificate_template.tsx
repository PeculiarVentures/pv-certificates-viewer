import { CertificateTemplate } from '@peculiar/asn1-x509-microsoft';

import { Extension } from '../../../crypto/extension';
import { rowValue } from '../row_value';

import { basic } from './basic';

export function certificateTemplate(extension: Extension, value: CertificateTemplate) {
  return basic(
    extension,
    [
      rowValue(
        'Template ID',
        value.templateID,
      ),
      rowValue(
        'Template Major Version',
        value.templateMajorVersion,
      ),
      rowValue(
        'Template Minor Version',
        value.templateMinorVersion,
      ),
    ],
  );
}
