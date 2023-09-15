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
      title: 'X.509 certificate: Let\'s Encrypt X3',
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
      title: 'X.509 certificate: ed25519 (RFC 8410)',
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
      title: 'PKCS#10 certification request (RFC 2986)',
      value: `-----BEGIN CERTIFICATE REQUEST-----
      MIHQMIGDAgEAMA8xDTALBgNVBAMMBHRlc3QwKjAFBgMrZXADIQD7Fua9ZF+wPXVd
      DCBwQr+Aqny6OFvs25wZ/P4LyVsYmKBBMD8GCSqGSIb3DQEJDjEyMDAwLgYDVR0R
      BCcwJaAjBgorBgEEAYI3FAIDoBUME2FkZHJlc3NAZG9tYWluLnRlc3QwBQYDK2Vw
      A0EAUp5FenHF1rZzRGU+7wiF+/D1bfyDRF0dzWz2sl44nltu8iLjHO3aIfOTYWpq
      ZlaDg1Bq3L7Fcb7If4yZAsE5Cw==
      -----END CERTIFICATE REQUEST-----`,
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
