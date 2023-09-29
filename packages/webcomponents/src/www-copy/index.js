(() => {
  // Constants.
  const CERTIFICATE_DECODER_ELEMENT = document.createElement('peculiar-certificate-decoder');
  const HISTORY = window.HistoryLibrary.createBrowserHistory();
  const searchParams = new URLSearchParams(window.location.search);

  // Listeners.
  CERTIFICATE_DECODER_ELEMENT.addEventListener('successParse', (event) => {
    HISTORY.replace(`?cert=${encodeURIComponent(event.detail)}`);

    setTimeout(() => {
      window.scrollTo({
        top: 460,
        behavior: 'smooth',
      });
    }, 50);
  });
  CERTIFICATE_DECODER_ELEMENT.addEventListener('clearCertificate', () => {
    HISTORY.replace('/');
  });

  // Default props.
  CERTIFICATE_DECODER_ELEMENT.certificateExamples = [
    {
      title: 'X.509 Certificate: Let\'s Encrypt X3',
      value: `-----BEGIN CERTIFICATE-----
      MIIEkjCCA3qgAwIBAgIQCgFBQgAAAVOFc2oLheynCDANBgkqhkiG9w0BAQsFADA/
      MSQwIgYDVQQKExtEaWdpdGFsIFNpZ25hdHVyZSBUcnVzdCBDby4xFzAVBgNVBAMT
      DkRTVCBSb290IENBIFgzMB4XDTE2MDMxNzE2NDA0NloXDTIxMDMxNzE2NDA0Nlow
      SjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxldCdzIEVuY3J5cHQxIzAhBgNVBAMT
      GkxldCdzIEVuY3J5cHQgQXV0aG9yaXR5IFgzMIIBIjANBgkqhkiG9w0BAQEFAAOC
      AQ8AMIIBCgKCAQEAnNMM8FrlLke3cl03g7NoYzDq1zUmGSXhvb418XCSL7e4S0EF
      q6meNQhY7LEqxGiHC6PjdeTm86dicbp5gWAf15Gan/PQeGdxyGkOlZHP/uaZ6WA8
      SMx+yk13EiSdRxta67nsHjcAHJyse6cF6s5K671B5TaYucv9bTyWaN8jKkKQDIZ0
      Z8h/pZq4UmEUEz9l6YKHy9v6Dlb2honzhT+Xhq+w3Brvaw2VFn3EK6BlspkENnWA
      a6xK8xuQSXgvopZPKiAlKQTGdMDQMc2PMTiVFrqoM7hD8bEfwzB/onkxEz0tNvjj
      /PIzark5McWvxI0NHWQWM6r6hCm21AvA2H3DkwIDAQABo4IBfTCCAXkwEgYDVR0T
      AQH/BAgwBgEB/wIBADAOBgNVHQ8BAf8EBAMCAYYwfwYIKwYBBQUHAQEEczBxMDIG
      CCsGAQUFBzABhiZodHRwOi8vaXNyZy50cnVzdGlkLm9jc3AuaWRlbnRydXN0LmNv
      bTA7BggrBgEFBQcwAoYvaHR0cDovL2FwcHMuaWRlbnRydXN0LmNvbS9yb290cy9k
      c3Ryb290Y2F4My5wN2MwHwYDVR0jBBgwFoAUxKexpHsscfrb4UuQdf/EFWCFiRAw
      VAYDVR0gBE0wSzAIBgZngQwBAgEwPwYLKwYBBAGC3xMBAQEwMDAuBggrBgEFBQcC
      ARYiaHR0cDovL2Nwcy5yb290LXgxLmxldHNlbmNyeXB0Lm9yZzA8BgNVHR8ENTAz
      MDGgL6AthitodHRwOi8vY3JsLmlkZW50cnVzdC5jb20vRFNUUk9PVENBWDNDUkwu
      Y3JsMB0GA1UdDgQWBBSoSmpjBH3duubRObemRWXv86jsoTANBgkqhkiG9w0BAQsF
      AAOCAQEA3TPXEfNjWDjdGBX7CVW+dla5cEilaUcne8IkCJLxWh9KEik3JHRRHGJo
      uM2VcGfl96S8TihRzZvoroed6ti6WqEBmtzw3Wodatg+VyOeph4EYpr/1wXKtx8/
      wApIvJSwtmVi4MFU5aMqrSDE6ea73Mj2tcMyo5jMd6jmeWUHK8so/joWUoHOUgwu
      X4Po1QYz+3dszkDqMp4fklxBwXRsW10KXzPMTZ+sOPAveyxindmjkW8lGy+QsRlG
      PfZ+G6Z6h7mjem0Y+iWlkYcV4PIWL1iwBi8saCbGS5jN2p8M+X+Q7UNKEkROb3N6
      KOqkqm57TH2H3eDJAkSnh6/DNFu0Qg==
      -----END CERTIFICATE-----`,
    },
    {
      title: 'X.509 Certificate: Ed25519 (RFC 8410)',
      value: `-----BEGIN CERTIFICATE-----
      MIIBfzCCATGgAwIBAgIUfI5kSdcO2S0+LkpdL3b2VUJG10YwBQYDK2VwMDUxCzAJ
      BgNVBAYTAklUMQ8wDQYDVQQHDAZNaWxhbm8xFTATBgNVBAMMDFRlc3QgZWQyNTUx
      OTAeFw0yMDA5MDIxMzI1MjZaFw0zMDA5MDIxMzI1MjZaMDUxCzAJBgNVBAYTAklU
      MQ8wDQYDVQQHDAZNaWxhbm8xFTATBgNVBAMMDFRlc3QgZWQyNTUxOTAqMAUGAytl
      cAMhADupL/3LF2beQKKS95PeMPgKI6gxIV3QB9hjJC7/aCGFo1MwUTAdBgNVHQ4E
      FgQUa6W9z536I1l4EmQXrh5y2JqASugwHwYDVR0jBBgwFoAUa6W9z536I1l4EmQX
      rh5y2JqASugwDwYDVR0TAQH/BAUwAwEB/zAFBgMrZXADQQBvc3e+KJZaMzbX5TT9
      kPP9QH8fAvkAV/IWDxZrBL9lhLaY0tDSv0zWbw624uidBKPgmVD5wm3ec60dNVeF
      ZYYG
      -----END CERTIFICATE-----`,
    },
    {
      title: 'X.509 Certificate Revocation List (RFC 5280)',
      value: `-----BEGIN X509 CRL-----
      MIIDFDCCAfwCAQEwDQYJKoZIhvcNAQEFBQAwXzEjMCEGA1UEChMaU2FtcGxlIFNp
      Z25lciBPcmdhbml6YXRpb24xGzAZBgNVBAsTElNhbXBsZSBTaWduZXIgVW5pdDEb
      MBkGA1UEAxMSU2FtcGxlIFNpZ25lciBDZXJ0Fw0xMzAyMTgxMDMyMDBaFw0xMzAy
      MTgxMDQyMDBaMIIBNjA8AgMUeUcXDTEzMDIxODEwMjIxMlowJjAKBgNVHRUEAwoB
      AzAYBgNVHRgEERgPMjAxMzAyMTgxMDIyMDBaMDwCAxR5SBcNMTMwMjE4MTAyMjIy
      WjAmMAoGA1UdFQQDCgEGMBgGA1UdGAQRGA8yMDEzMDIxODEwMjIwMFowPAIDFHlJ
      Fw0xMzAyMTgxMDIyMzJaMCYwCgYDVR0VBAMKAQQwGAYDVR0YBBEYDzIwMTMwMjE4
      MTAyMjAwWjA8AgMUeUoXDTEzMDIxODEwMjI0MlowJjAKBgNVHRUEAwoBATAYBgNV
      HRgEERgPMjAxMzAyMTgxMDIyMDBaMDwCAxR5SxcNMTMwMjE4MTAyMjUxWjAmMAoG
      A1UdFQQDCgEFMBgGA1UdGAQRGA8yMDEzMDIxODEwMjIwMFqgLzAtMB8GA1UdIwQY
      MBaAFL4SAcyq6hGA2i6tsurHtfuf+a00MAoGA1UdFAQDAgEDMA0GCSqGSIb3DQEB
      BQUAA4IBAQBCIb6B8cN5dmZbziETimiotDy+FsOvS93LeDWSkNjXTG/+bGgnrm3a
      QpgB7heT8L2o7s2QtjX2DaTOSYL3nZ/Ibn/R8S0g+EbNQxdk5/la6CERxiRp+E2T
      UG8LDb14YVMhRGKvCguSIyUG0MwGW6waqVtd6K71u7vhIU/Tidf6ZSdsTMhpPPFu
      PUid4j29U3q10SGFF6cCt1DzjvUcCwHGhHA02Men70EgZFADPLWmLg0HglKUh1iZ
      WcBGtev/8VsUijyjsM072C6Ut5TwNyrrthb952+eKlmxLNgT0o5hVYxjXhtwLQsL
      7QZhrypAM1DLYqQjkiDI7hlvt7QuDGTJ
      -----END X509 CRL-----`,
    },
    {
      title: 'PKCS#10 Certification Request (RFC 2986)',
      value: `-----BEGIN CERTIFICATE REQUEST-----
      MIHQMIGDAgEAMA8xDTALBgNVBAMMBHRlc3QwKjAFBgMrZXADIQD7Fua9ZF+wPXVd
      DCBwQr+Aqny6OFvs25wZ/P4LyVsYmKBBMD8GCSqGSIb3DQEJDjEyMDAwLgYDVR0R
      BCcwJaAjBgorBgEEAYI3FAIDoBUME2FkZHJlc3NAZG9tYWluLnRlc3QwBQYDK2Vw
      A0EAUp5FenHF1rZzRGU+7wiF+/D1bfyDRF0dzWz2sl44nltu8iLjHO3aIfOTYWpq
      ZlaDg1Bq3L7Fcb7If4yZAsE5Cw==
      -----END CERTIFICATE REQUEST-----`,
    },
    {
      title: 'An Internet Attribute Certificate Profile for Authorization (RFC 5755)',
      value: `-----BEGIN ATTRIBUTE CERTIFICATE-----
      MIIKTDCCCTQCAQEwgZugZDBOpEwwSjELMAkGA1UEBhMCVVMxFjAUBgNVBAoTDUxl
      dCdzIEVuY3J5cHQxIzAhBgNVBAMTGkxldCdzIEVuY3J5cHQgQXV0aG9yaXR5IFgz
      AhIEDTYV1GjKt2arSgJHEy989KmiMwoBATALBglghkgBZQMEAgEDIQCdN1lkspPo
      fQG2EscM1L/1rno+6zJgeJJbqy+7Wg0OtKCBoDCBnaSBmjCBlzELMAkGA1UEBhMC
      QkUxETAPBgNVBAgMCEJydXNzZWxzMREwDwYDVQQHDAhCcnVzc2VsczE4MDYGA1UE
      CgwvVGVzdCBRdWFsaWZpZWQgVHJ1c3QgU2VydmljZSBQcm92aWRlciBmb3IgUVdB
      Q3MxETAPBgNVBAsMCFRFU1QgVFNQMRUwEwYDVQQDDAxRV0FDIHNlcnZpY2UwDQYJ
      KoZIhvcNAQELBQACAQowIhgPMjAyMDA3MTUxNTUzMDhaGA8yMDIwMDkyNjEwNDgy
      OFowggaoMIH9BgUEAMoYATGB8zCB8DEPMA0GA1UEAwwGTm93aW5hMRkwFwYDVQQK
      DBBOb3dpbmEgU29sdXRpb25zMQswCQYDVQQGEwJMVTEPMA0GA1UEBwwGS2VobGVu
      MQ0wCwYDVQQRDAQ4Mjg3MR0wGwYDVQQJDBRab25lIGluZHVzdHJpZWxsZSAxNTEZ
      MBcGA1UEFBMQKzM1Mi02NjEtMjMxLTkxNDEdMBsGCSqGSIb3DQEJARYOaW5mb0Bu
      b3dpbmEubHUxFzAVBgNVBGEMDlZBVExVLTI2ODUwNjgyMSMwIQYDVQRhDBpMRUlY
      Ry0yMjIxMDAyUVFKNks4WVFZUUQwODBwBgUEAMoYAjFnMGUxEDAOBgNVBCoMB09s
      aXZpZXIxEDAOBgNVBAQMB0JhcmV0dGUxGTAXBgNVBAoMEE5vd2luYSBTb2x1dGlv
      bnMxCzAJBgNVBAYTAkJFMRcwFQYDVQQFEw5QQVNCRS1BQjEyMzQ1NjCB/QYFBADK
      GAMxgfMwgfAxDzANBgNVBAMMBk5vd2luYTEZMBcGA1UECgwQTm93aW5hIFNvbHV0
      aW9uczELMAkGA1UEBhMCTFUxDzANBgNVBAcMBktlaGxlbjENMAsGA1UEEQwEODI4
      NzEdMBsGA1UECQwUWm9uZSBpbmR1c3RyaWVsbGUgMTUxGTAXBgNVBBQTECszNTIt
      NjYxLTIzMS05MTQxHTAbBgkqhkiG9w0BCQEWDmluZm9Abm93aW5hLmx1MRcwFQYD
      VQRhDA5WQVRMVS0yNjg1MDY4MjEjMCEGA1UEYQwaTEVJWEctMjIyMTAwMlFRSjZL
      OFlRWVFEMDgwgf0GBQQAyhgEMYHzMIHwMQ8wDQYDVQQDDAZOb3dpbmExGTAXBgNV
      BAoMEE5vd2luYSBTb2x1dGlvbnMxCzAJBgNVBAYTAkxVMQ8wDQYDVQQHDAZLZWhs
      ZW4xDTALBgNVBBEMBDgyODcxHTAbBgNVBAkMFFpvbmUgaW5kdXN0cmllbGxlIDE1
      MRkwFwYDVQQUExArMzUyLTY2MS0yMzEtOTE0MR0wGwYJKoZIhvcNAQkBFg5pbmZv
      QG5vd2luYS5sdTEXMBUGA1UEYQwOVkFUTFUtMjY4NTA2ODIxIzAhBgNVBGEMGkxF
      SVhHLTIyMjEwMDJRUUo2SzhZUVlRRDA4MB0GBQQAyhgFMRQwEqAEAwIHgKEEAwIH
      gKIEAwIHgDCCAicGBQQAyhgGMYICHDCCAhigCYEHTkFDRUJFTKEIgQY2Ni4wMTCi
      IQwfQ29tcHV0ZXIgcHJvZ3JhbW1pbmcgYWN0aXZpdGllc6OCAdwMggHYTGEgc29j
      acOpdMOpIGEgcG91ciBvYmpldCBsZSBkw6l2ZWxvcHBlbWVudCwgbGEgdmVudGUg
      ZXQgbGEgbWlzZSBlbiBwbGFjZSBkZSBzb2x1dGlvbnMgaW5mb3JtYXRpcXVlcyAo
      c29mdHdhcmUgZXQgaGFyZHdhcmUpIGRlc3RpbsOpZXMgYXV4IGVudHJlcHJpc2Vz
      IHB1YmxpcXVlcyBldCBwcml2w6llcywgZW4gY2UgY29tcHJpcyBsYSBjb25zdWx0
      YW5jZSBkYW5zIGxlIGRvbWFpbmUgaW5mb3JtYXRpcXVlLCBsZSBkw6l2ZWxvcHBl
      bWVudCwgbGEgbWlzZSBlbiBwbGFjZSwgbGUgc3VwcG9ydCBldCBsYSBtYWludGVu
      YW5jZSBkZSBzeXN0w6htZXMgZCdpbmZvcm1hdGlvbiwgYWluc2kgcXVlIGxhIHZl
      bnRlIGRlIG1hdMOpcmllbCBldCBkZSBwcm9ncmFtbWVzLCBhaW5zaSBxdWUgdG91
      dGVzIGxlcyBvcMOpcmF0aW9ucyBzZSByYXBwb3J0YW50IGRpcmVjdGVtZW50IG91
      IGluZGlyZWN0ZW1lbnQgw6AgY2V0dGUgYWN0aXZpdMOpLjCBswYFBADKGAcxgakw
      gaagCoEIR0RQUiBDQUKhGIEWQ2VydGlmaWNhdGUgbrAxMjQvMjAyMKIbhhlodHRw
      czovL2dkcHJjYWIubHUvbm93aW5howQTAkxVpFsMWU5vd2luYSBTb2x1dGlvbnMg
      aGFzIGJlZW4gc2hvd24gdG8gYmUgR0RQUiBjb21wbGlhbnQgaW4gaXRzIHNpZ25h
      dHVyZSBjcmVhdGlvbiBhY3Rpdml0aWVzMBcGBQQAyhgIMQ4wDBMDRVVSAgID6AIB
      AjAbBgUEAMoYCTESMBACAgH0AgEoAgEeAgECAgEBMIIBCjAfBgNVHSMEGDAWgBQw
      19QUSCYtjphsSTNUQKSDjrVYWDBZBggrBgEFBQcBAQRNMEswSQYIKwYBBQUHMAKG
      PWh0dHA6Ly9udC1xd2FjLm5vd2luYS5zb2x1dGlvbnMvcmVzL3F3YWN0c3AvbnRx
      d2Fjc2VydmljZS5jcnQwTgYDVR0fBEcwRTBDoEGgP4Y9aHR0cDovL250LXF3YWMu
      bm93aW5hLnNvbHV0aW9ucy9yZXMvcXdhY3RzcC9udHF3YWNzZXJ2aWNlLmNybDAj
      BggrBgEFBQcBAwQXMBUwCAYGBACORgEBMAkGBwQAjkYBBgMwFwYDVR0gAQH/BA0w
      CzAJBgcEAIvsQAEEMA0GCSqGSIb3DQEBCwUAA4IBAQBunYtorOVlPDtpU9uLsul0
      OnZlfhO7nDGYzNIqIdXmfN/IxFQCERFXAzVzpMihSBkDwLPUa1M+wDoxB+9BQ7Ct
      ftUloLwMYKzUsAGKN/wc3sDhTrwSNDgIFR/oM063kHvUc/J7HOYrfhvmPj+QErw6
      Aujpl4yop4nU5LOu7o8YPT1Ev0xc0V1nG9QRxLhKuOPp0TtZtAW0O+QHJ/BcGouU
      KYBmNQ6OsBSZvHGoONCMI8tO+x2CGsBM6ZhB8cSe3AfQQQRSgY7tR7VUJQoaYKjy
      iBM/9lIWP5h9h0IIJwqXy0bwnvJ52yaVK82g/6t5ZokPk+O6KCFysPyWUfdejXhN
      -----END ATTRIBUTE CERTIFICATE-----`,
    },
  ];

  if (searchParams.get('certurl')) {
    window.fetch(searchParams.get('certurl'))
      .then((body) => {
        if (body.status >= 200 && body.status < 300) {
          return body.text();
        }

        return Promise.reject();
      })
      .then((response) => {
        CERTIFICATE_DECODER_ELEMENT.defaultCertificate = response;
      })
      .catch(() => {
        alert('Failed to load certificate. Please use another file or check CORS policy.');
      })
      .finally(() => {
        // Init.
        content.appendChild(CERTIFICATE_DECODER_ELEMENT);
      });
  } else {
    CERTIFICATE_DECODER_ELEMENT.defaultCertificate = searchParams.get('cert') || undefined;
    // Init.
    content.appendChild(CERTIFICATE_DECODER_ELEMENT);
  }
})();
