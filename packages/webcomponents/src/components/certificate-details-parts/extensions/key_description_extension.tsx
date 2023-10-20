/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { h, FunctionalComponent } from '@stencil/core';
import {
  NonStandardKeyDescription,
  AttestationApplicationId,
  AuthorizationList,
  IntegerSet,
  RootOfTrust,
} from '@peculiar/asn1-android';
import { Convert, BufferSourceConverter } from 'pvtsutils';
import { AsnParser } from '@peculiar/asn1-schema';

import { l10n, camelCaseToWords } from '../../../utils';
import { Extension } from '../../../crypto/extension';
import { RowValue, TableRowTable } from '../row';

import { BasicExtension } from './basic_extension';

interface IKeyDescriptionExtensionProps {
  extension: Extension<NonStandardKeyDescription>;
}

export const KeyDescriptionExtension:
FunctionalComponent<IKeyDescriptionExtensionProps> = (props) => {
  const { extension } = props;

  const renderRowValue = (data: Object) => Object.keys(data).map((keyName) => {
    const keyValue = data[keyName];
    let value: string | number | string[] = '';

    switch (true) {
      case typeof keyValue === 'string' || typeof keyValue === 'number':
        value = keyValue;
        break;

      case keyValue instanceof IntegerSet:
        value = keyValue.join(', ');
        break;

      case typeof keyValue === 'boolean':
        value = keyValue
          ? l10n.getString('yes')
          : l10n.getString('no');
        break;

      case Object.is(keyValue, null):
        value = 'NULL';
        break;

      case keyValue instanceof RootOfTrust:
        return [
          <RowValue
            name={camelCaseToWords(keyName)}
            value=""
          />,
          <TableRowTable>
            {renderRowValue(keyValue)}
          </TableRowTable>,
        ];

      case BufferSourceConverter.isBufferSource(keyValue):
        if (keyName === 'attestationApplicationId') {
          try {
            const parsed = AsnParser.parse(keyValue, AttestationApplicationId);

            if (parsed.packageInfos.length || parsed.signatureDigests.length) {
              return [
                <RowValue
                  name={camelCaseToWords(keyName)}
                  value=""
                />,
                Boolean(parsed.packageInfos) && (
                  <TableRowTable>
                    <RowValue
                      name={camelCaseToWords('packageInfos')}
                      value=""
                    />
                    {parsed.packageInfos.map((attestationPackageInfo) => (
                      <TableRowTable>
                        {renderRowValue(attestationPackageInfo)}
                      </TableRowTable>
                    ))}
                  </TableRowTable>
                ),
              ];
            }
          } catch (error) {
            //
          }
        }

        try {
          value = Convert.ToString(keyValue);
        } catch (error) {
          value = Convert.ToHex(keyValue);
        }

        break;

      default:
    }

    return (
      <RowValue
        name={camelCaseToWords(keyName)}
        value={value}
      />
    );
  });

  const renderAuthorizationList = (title: string, authorizationList: AuthorizationList[]) => {
    if (authorizationList.length === 0) {
      return null;
    }

    return [
      <RowValue
        name={title}
        value=""
      />,
      <TableRowTable>
        {authorizationList.map(renderRowValue)}
      </TableRowTable>,
    ];
  };

  return (
    <BasicExtension
      extension={extension}
    >
      <RowValue
        name={camelCaseToWords('attestationVersion')}
        value={extension.value.attestationVersion}
      />
      <RowValue
        name={camelCaseToWords('attestationSecurityLevel')}
        value={extension.value.attestationSecurityLevel}
      />
      <RowValue
        name={camelCaseToWords('keymasterVersion')}
        value={extension.value.keymasterVersion}
      />
      <RowValue
        name={camelCaseToWords('keymasterSecurityLevel')}
        value={extension.value.keymasterSecurityLevel}
      />
      <RowValue
        name={camelCaseToWords('attestationChallenge')}
        value={Convert.ToString(extension.value.attestationChallenge)}
      />
      <RowValue
        name={camelCaseToWords('uniqueId')}
        value={Convert.ToString(extension.value.uniqueId) || undefined}
      />
      {renderAuthorizationList(camelCaseToWords('softwareEnforced'), extension.value.softwareEnforced)}
      {renderAuthorizationList(camelCaseToWords('teeEnforced'), extension.value.teeEnforced)}
    </BasicExtension>
  );
};
